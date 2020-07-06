import React, {useState, useCallback} from 'react';
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { TOKEN_NAME } from "../utils/config";
import { SET_INFO} from "../graphql/Mutations";
import laptop_girl from "../images/Page 2.svg"
import './MoreInfo.styles.css';

const MoreInfo = () => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");

    const [major, setMajor] = useState("");
    const [minor, setMinor] = useState("")
    const [college, setCollege] = useState("");
    const [grad, setGrad] = useState("");
    const [addInfo, {response}] = useMutation(SET_INFO);
    const data = JSON.parse(localStorage.getItem(TOKEN_NAME))

    const handleUserChange = useCallback(
        (e) => setUsername(e.target.value), []
    )

    const handleMajorChange = useCallback(
        (e) => setMajor(e.target.value), []
    )

    const handleMinorChange = useCallback(
      (e) => setMinor(e.target.value), []
  )

    const handleCollegeChange = useCallback(
        (e) => setCollege(e.target.value), []
    )

    if (!data?.isNewUser){
      console.log("Redirecting....")
      return ( <Redirect to={"/discussions"} />);
    }

    //we have to post stuff to backend.  We're not doing a handle submit until all
    //forms get activated, testing for now...
    //we mutate our data with a custom mutation to the backend using graphql
    //Add in SVG later
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const majorArray = [major];
        const minorArray = [minor];
        try{
          console.log({
            "major": majorArray,
            "minor": minorArray,
            "college": college,
            "netID": data.netID,
            "username": username,
          })

          await addInfo({
          variables: {
              username: username,
              college: college,
              major: major,
              minor: minor,
              netID: data.netID,
              isNewUser: false,
          },
          });

          window.location.assign("/discussions");
          
        } catch (error){
            console.log(error)
        }
        finally{
            setLoading(false);
        }
    };

    //have to manually push newUser
    return(
    <div className="stable">
    <div className = "full_grid">
      <div className = "pink_shape">
        <div >
          <p className = "about_myself">A little about myself...</p>
          <img src={laptop_girl} className = "laptop_girl" />
        </div>

        <form onSubmit={handleSubmit} className = "margins">
        <fieldset className ="totalform">
          <fieldset className="textfield">
            <label for="uname">Username</label> <br/>
            <input
              className="textfield"
              type="text"
              placeholder="username"
              value={username}
              onChange={handleUserChange}
            />
          </fieldset>

          <fieldset className="textfield">
            <label for="major">Major</label> <br/>
            <input
              className="textfield"
              type="text"
              placeholder="major"
              value={major}
              onChange={handleMajorChange}
            />
          </fieldset>

          <fieldset className="textfield">
            <label for="major">Minor</label> <br/>
            <input
              className="textfield"
              type="text"
              placeholder="minor"
              value={minor}
              onChange={handleMinorChange}
            />
          </fieldset>

          <fieldset className="textfield">
            <label for="college">College</label> <br/>
            <input
              className="textfield"
              type="text"
              placeholder="college"
              value={college}
              onChange={handleCollegeChange}
            />
          </fieldset>
          <button
            className="submitbutton"
            type="submit"
            disabled={loading}
          >
            &rarr;
          </button>
        </fieldset>
        </form>
        
      </div>
    </div>
 
    </div>);
}

export default MoreInfo