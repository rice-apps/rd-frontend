import React, { useState, useCallback, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useMutation, useLazyQuery } from "@apollo/client";
import { SET_INFO } from "../graphql/Mutations";
import { GET_USER_DATA, USER_EXISTS } from "../graphql/Queries";
import { TOKEN_NAME } from "../utils/config";
import DropDownItem from "./DropDownItem";
import major_minor_json from "../utils/MajorMinor.json";
import {
    DDWrapper,
    DDHeader,
    DDHeaderTitle,
    DDList,
    DDListItem,
    ArrowI,
    FieldSetStyle,
    TextField,
} from "./MoreInfo.styles";

import { PostingButton } from "./WritePost.styles";

const ProfilePage = () => {
    const history = useHistory();
    const [userStatement, setStatement] = useState("Valid!");
    const [originalUsername, setOriginal] = useState("");
    const [username, setUsername] = useState("");
    const [major, setMajor] = useState([]);
    const [minor, setMinor] = useState([]);
    const [college, setCollege] = useState("");
    const [isMajorOpen, setMajorOpen] = useState(false);
    const [isMinorOpen, setMinorOpen] = useState(false);
    const [isCollegeOpen, setCollegeOpen] = useState(false);

    const { netID } = JSON.parse(localStorage.getItem(TOKEN_NAME));
    const [addInfo] = useMutation(SET_INFO);
    const [getUser, { data, loading: userInfoLoading }] = useLazyQuery(
        GET_USER_DATA,
    );
    const [
        checkUser,
        { data: userExists, loading: userExistLoading },
    ] = useLazyQuery(USER_EXISTS);

    const fill_state = () => {
        getUser({
            variables: {
                netID,
            },
        });
    };

    useEffect(() => {
        fill_state();
        if (data) {
            if (username.length === 0) setOriginal(data.userOne.username);
            setUsername(data.userOne.username);
            setMajor(data.userOne.major);
            setMinor(data.userOne.minor);
            setCollege(data.userOne.college);
        }
    }, [data]);

    useEffect(() => {
        checkUser({
            variables: {
                username,
            },
        });
    }, [username]);

    useEffect(() => {
        const isMyUsernameTaken = userExists?.doesUsernameExist.usernameExists;
        setStatement("valid username!");
        if (isMyUsernameTaken) {
            setStatement("somebody already took username that lol");
        }
        if (originalUsername === username) {
            setStatement("this is your current username");
        }
    }, [userExists?.doesUsernameExist.usernameExists]);

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

    const handleUserChange = useCallback((e) => {
        setUsername(e.target.value);
    }, []);

    const handleBack = () => {
        history.push("/feed");
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

    const saveData = async () => {
        if (userExistLoading || userExists?.doesUsernameExist.usernameExists) {
            return;
        }

        try {
            await addInfo({
                variables: {
                    username,
                    college,
                    major,
                    minor,
                    netID,
                    isNewUser: false,
                },
            });
        } catch (error) {}
    };

    if (!localStorage.getItem(TOKEN_NAME)) {
        return <Redirect to="/login" />;
    }

    if (userInfoLoading) return <p>Loading...</p>;

    return (
        <>
            <form onSubmit={saveData}>
                <p>{userStatement}</p>
                <FieldSetStyle>
                    <TextField
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={handleUserChange}
                    />
                </FieldSetStyle>
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

                <PostingButton
                    type="submit"
                    disabled={userExists?.doesUsernameExist.usernameExists}
                >
                    Save
                </PostingButton>
            </form>

            <PostingButton onClick={handleBack}>Back to feed</PostingButton>
        </>
    );
};

export default ProfilePage;
