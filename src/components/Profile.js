import React, { useState, useCallback, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useMutation, useLazyQuery } from "@apollo/client";
import { SET_INFO } from "../graphql/Mutations";
import { GET_USER_DATA } from "../graphql/Queries";
import { TOKEN_NAME } from "../utils/config";
import DropDownItem from "./DropDownItem.js";
import major_minor_json from "../utils/MajorMinor.json";
import {
    DDWrapper,
    DDHeader,
    DDHeaderTitle,
    DDList,
    DDListItem,
    ArrowI,
} from "./MoreInfo.styles";

import {
    TitleDescriptor,
    TitleWrapper,
    TitleBox,
    PostingButton,
} from "./WritePost.styles";

const ProfilePage = () => {
    const [username, setUsername] = useState("");
    const [major, setMajor] = useState([]);
    const [minor, setMinor] = useState([]);
    const [college, setCollege] = useState("");
    const [isMajorOpen, setMajorOpen] = useState(false);
    const [isMinorOpen, setMinorOpen] = useState(false);
    const [isCollegeOpen, setCollegeOpen] = useState(false);

    const netID = JSON.parse(localStorage.getItem(TOKEN_NAME)).netID;
    const [addInfo] = useMutation(SET_INFO);
    // const { data, loading, error } = useQuery(GET_USER_DATA, {
    //     variables: { netID: netID },
    // });

    const [getUser, { data }] = useLazyQuery(GET_USER_DATA);

    const fill_state = () => {
        console.log("using await...");
        getUser({
            variables: {
                netID: netID,
            },
        });
    };
    console.log("data", data);
    console.log("major", major);
    console.log("username", username);

    useEffect(() => {
        console.log("fired");
        fill_state();
        if (data) {
            setUsername(data.userOne.username);
            setMajor(data.userOne.major);
            setMinor(data.userOne.minor);
            setCollege(data.userOne.college);
        }
    }, [data]);

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

    const toggleMajor = () => {
        setMajorOpen(!isMajorOpen);
        setMinorOpen(false);
        setCollegeOpen(false);
    };

    const toggleMinor = () => {
        setMinorOpen(!isMinorOpen);
        setMajorOpen(false);
        setCollegeOpen(false);
    };

    const toggleCollege = () => {
        setCollegeOpen(!isCollegeOpen);
        setMajorOpen(false);
        setMinorOpen(false);
    };

    // if I wrap this in useCallback, it breaks
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

    const handleCollegeChange = useCallback((newValue) => {
        const index_of_college = college.indexOf(newValue);
        setCollege(index_of_college >= 0 ? "" : newValue);
    }, []);

    const saveData = () => {
        addInfo({
            variables: {
                username: document.getElementById("username").innerHTML,
                college: college,
                major: major,
                minor: minor,
                isNewUser: false,
            },
        });
    };

    if (!localStorage.getItem(TOKEN_NAME)) {
        return <Redirect to="/login" />;
    }

    return (
        <>
            <TitleWrapper>
                <TitleDescriptor>Username</TitleDescriptor>
                <TitleBox id="username" contentEditable={true} />
            </TitleWrapper>
            <p>Current Majors: {major.toString()}</p>
            <DDWrapper>
                <DDHeader onClick={toggleMajor}>
                    <DDHeaderTitle>
                        Majors
                        <ArrowI open={isMajorOpen} />
                    </DDHeaderTitle>
                </DDHeader>
                {isMajorOpen && (
                    <DDList>
                        {majors.map((item) => (
                            <DDListItem key={item.name}>
                                <DropDownItem
                                    name={item.name}
                                    setInfo={handleMajorChange}
                                    selectedItems={major}
                                />
                            </DDListItem>
                        ))}
                    </DDList>
                )}
            </DDWrapper>

            <p>Current Minors: {minor.toString()}</p>
            <DDWrapper>
                <DDHeader onClick={toggleMinor}>
                    <DDHeaderTitle>
                        Minors
                        <ArrowI open={isMinorOpen} />
                    </DDHeaderTitle>
                </DDHeader>
                {isMinorOpen && (
                    <DDList>
                        {minors.map((item) => (
                            <DDListItem key={item.name}>
                                <DropDownItem
                                    name={item.name}
                                    setInfo={handleMinorChange}
                                    selectedItems={minor}
                                />
                            </DDListItem>
                        ))}
                    </DDList>
                )}
            </DDWrapper>

            <DDWrapper>
                <DDHeader onClick={toggleCollege}>
                    <DDHeaderTitle>
                        {college === "" ? "College" : college}
                        <ArrowI open={isCollegeOpen} />
                    </DDHeaderTitle>
                </DDHeader>
                {isCollegeOpen && (
                    <DDList>
                        {colleges.map((item) => (
                            <DDListItem key={item}>
                                <DropDownItem
                                    name={item}
                                    setInfo={handleCollegeChange}
                                    selectedItems={college}
                                />
                            </DDListItem>
                        ))}
                    </DDList>
                )}
            </DDWrapper>

            <PostingButton onClick={saveData}>Post</PostingButton>
        </>
    );
};

export default ProfilePage;
