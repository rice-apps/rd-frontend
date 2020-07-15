import React, { useState, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { TOKEN_NAME } from "../utils/config";
import { SET_INFO } from "../graphql/Mutations";
import laptop_girl from "../images/Page 2.svg";
import major_minor_json from "./MajorMinor.json";
import DropDownItem from "../components/DropDownItem.js";
import "./MoreInfo.styles.css";

const MoreInfo = () => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [major, setMajor] = useState([]);
    const [minor, setMinor] = useState([]);
    const [college, setCollege] = useState("");
    const [isMajorOpen, setMajorOpen] = useState(false);
    const [isMinorOpen, setMinorOpen] = useState(false);
    const [isCollegeOpen, setCollegeOpen] = useState(false);

    const [addInfo] = useMutation(SET_INFO);
    const data = JSON.parse(localStorage.getItem(TOKEN_NAME));

    const majors = major_minor_json.majors.split(";").map((major) => {
        const major_obj = {
            name: major,
        };
        return major_obj;
    });

    const minors = major_minor_json.minors.split(";").map((minor) => {
        const minor_obj = {
            name: minor,
        };
        return minor_obj;
    });

    const colleges = major_minor_json.colleges.split(";");

    const handleUserChange = useCallback(
        (e) => setUsername(e.target.value),
        [],
    );

    const handleMajorChange = (newValue) => {
        const index_of_major = major.indexOf(newValue);
        setMajor(
            index_of_major >= 0
                ? major.filter((maj) => newValue !== maj)
                : [...major, newValue],
        );
    };

    const handleMinorChange = (newValue) => {
        const index_of_minor = minor.indexOf(newValue);
        setMinor(
            index_of_minor >= 0
                ? minor.filter((maj) => newValue !== maj)
                : [...minor, newValue],
        );
    };

    const handleCollegeChange = (newValue) => {
        const index_of_college = college.indexOf(newValue);
        setCollege(index_of_college >= 0 ? "" : newValue);
    };

    const toggleMajor = () => setMajorOpen(!isMajorOpen);
    const toggleMinor = () => setMinorOpen(!isMinorOpen);
    const toggleCollege = () => setCollegeOpen(!isCollegeOpen);
    const majorArrow = isMajorOpen ? "arrow up" : "arrow down";
    const minorArrow = isMinorOpen ? "arrow up" : "arrow down";
    const collegeArrow = isCollegeOpen ? "arrow up" : "arrow down";

    if (!data?.isNewUser) {
        console.log("Redirecting....");
        return <Redirect to={"/discussions"} />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log({
                major: major.toString(),
                minor: minor.toString(),
                college: college,
                netID: data.netID,
                username: username,
            });

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
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    //have to manually push newUser
    return (
        <div className="stable">
            <div className="full_grid">
                <div className="pink_shape">
                    <div>
                        <p className="about_myself">A little about myself...</p>
                        <img
                            src={laptop_girl}
                            className="laptop_girl"
                            alt="Girl with laptop"
                        />
                    </div>

                    <form onSubmit={handleSubmit} className="margins">
                        <fieldset className="totalform">
                            <fieldset className="fieldsetstyle">
                                <input
                                    className="textfield"
                                    type="text"
                                    placeholder="username"
                                    value={username}
                                    onChange={handleUserChange}
                                />
                            </fieldset>

                            <div className="dd-wrapper">
                                <div
                                    className="dd-header"
                                    onClick={toggleMajor}
                                >
                                    <div className="dd-header-title">
                                        Majors
                                        <i className={majorArrow} />
                                    </div>
                                </div>
                                {isMajorOpen && (
                                    <ul className="dd-list">
                                        {majors.map((item) => (
                                            <li
                                                className="dd-list-item"
                                                key={item.name}
                                            >
                                                <DropDownItem
                                                    name={item.name}
                                                    setInfo={handleMajorChange}
                                                    selectedItems={major}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="dd-wrapper">
                                <div
                                    className="dd-header"
                                    onClick={toggleMinor}
                                >
                                    <div className="dd-header-title">
                                        Minors
                                        <i className={minorArrow} />
                                    </div>
                                </div>
                                {isMinorOpen && (
                                    <ul className="dd-list">
                                        {minors.map((item) => (
                                            <li
                                                className="dd-list-item"
                                                key={item.name}
                                            >
                                                <DropDownItem
                                                    name={item.name}
                                                    setInfo={handleMinorChange}
                                                    selectedItems={minor}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="dd-wrapper">
                                <div
                                    className="dd-header"
                                    onClick={toggleCollege}
                                >
                                    <div className="dd-header-title">
                                        {college === "" ? "College" : college}
                                        <i className={collegeArrow} />
                                    </div>
                                </div>
                                {isCollegeOpen && (
                                    <ul className="dd-list">
                                        {colleges.map((item) => (
                                            <li
                                                className="dd-list-item"
                                                key={item}
                                            >
                                                <DropDownItem
                                                    name={item}
                                                    setInfo={
                                                        handleCollegeChange
                                                    }
                                                    selectedItems={college}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
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
        </div>
    );
};

export default MoreInfo;
