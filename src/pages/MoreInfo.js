import React, {useState, useCallback} from 'react';
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { TOKEN_NAME } from "../utils/config";
import { SET_INFO, REMOVE_USER } from "../graphql/Mutations";
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

    const handleGradChange = useCallback(
        (e) => setGrad(e.target.value), []
    )

    if (!data.isNewUser){
      console.log("Redirecting....")
      return ( <Redirect to={"/discussions"} />
      );
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
            "netID": data.user.netID,
            "username": username,
          })

          // await addInfo({
          // variables: {
          //     netID: data.user.netID,
          //     college: college,
          //     major: major,
          //     minor: minor,
          //     username: username,
          //     isNewUser: false,
          // },
          // });

           // Router.push("/");
          
        } catch (error){
            console.log(error)
        }
        finally{
            setLoading(false);
        }
    };

    //have to manually push newUser

    // mutation {
    //   userUpdateOne(record: {college: Sid_Richardson}, filter: {netID: "vms2"}) {
    //     record {
    //       username
    //       netID
    //       college
    //       major
    //       minor
    //     }
    //   }
    // }
    

    return(
    <>

    <ul className="hex-grid__list">
        <li className="hex-grid__item">
            <div class="hex-grid__content">
                1
            </div>
        </li>
        <li class="hex-grid__item">
            <div class="hex-grid__content">
                2
            </div>
        </li>
        <li class="hex-grid__item">
            <div class="hex-grid__content">
                3
            </div>
        </li>
        <li class="hex-grid__item">
            <div class="hex-grid__content">
                4
            </div>
        </li>
        <li class="hex-grid__item">
            <div class="hex-grid__content">
                5
            </div>
        </li>
        <li class="hex-grid__item">
            <div class="hex-grid__content">
                6
            </div>
        </li>
        <li class="hex-grid__item">
            <div class="hex-grid__content">
                7
            </div>
        </li>
        <li class="hex-grid__item">
            <div class="hex-grid__content">
                8
            </div>
        </li>
        <li class="hex-grid__item">
            <div class="hex-grid__content">
                9
            </div>
        </li>
    </ul>

    <img src={laptop_girl} />
    <p>You honestly can go fuck yourself</p>
    <form onSubmit={handleSubmit}>
        <fieldset>
          <fieldset className="">
            <label for="uname">Username</label> <br/>
            <input
              className=""
              type="text"
              placeholder="username"
              value={username}
              onChange={handleUserChange}
            />
          </fieldset>

          <fieldset className="">
            <label for="major">Major</label> <br/>
            <input
              className=""
              type="text"
              placeholder="major"
              value={major}
              onChange={handleMajorChange}
            />
          </fieldset>

          <fieldset className="">
            <label for="major">Minor</label> <br/>
            <input
              className=""
              type="text"
              placeholder="minor"
              value={minor}
              onChange={handleMinorChange}
            />
          </fieldset>


          <fieldset className="">
            <label for="college">College</label> <br/>
            <input
              className=""
              type="text"
              placeholder="college"
              value={college}
              onChange={handleCollegeChange}
            />
          </fieldset>

          {/* <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Dropdown Button
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" onclick = "">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}

          {/* <fieldset className="">
            <label for="gradyr">Grad</label> <br/>
            <input
              className=""
              type="text"
              placeholder="graduation year"
              value={grad}
              onChange={handleGradChange}
            />
          </fieldset> */}

          <button
            className=""
            type="submit"
            disabled={loading}
          >
            Send me to discussions
          </button>
        </fieldset>
      </form>
    </>);
}

export default MoreInfo