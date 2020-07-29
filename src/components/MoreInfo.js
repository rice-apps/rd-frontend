import React, { useState, useCallback, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useMutation, useLazyQuery } from "@apollo/client";
import { TOKEN_NAME } from "../utils/config";
import { SET_INFO } from "../graphql/Mutations";
import { USER_EXISTS, GET_USER_DATA } from "../graphql/Queries";
import laptop_girl from "../images/Page 2.svg";
import major_minor_json from "../utils/MajorMinor.json";
import DropDownItem from "./DropDownItem.js";
import {
    FullGrid,
    PinkShape,
    LaptopGirl,
    AboutMyself,
    TextField,
    FieldSetStyle,
    TotalForm,
    MarginsForm,
    SubmitButton,
    DDWrapper,
    DDHeader,
    DDHeaderTitle,
    DDList,
    DDListItem,
    ArrowI,
} from "./MoreInfo.styles";
import { Helmet } from "react-helmet";

const MoreInfo = () => {
    let history = useHistory();

    const [userStatement, setStatement] = useState("Valid!");
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [major, setMajor] = useState([]);
    const [minor, setMinor] = useState([]);
    const [college, setCollege] = useState("");
    const [isMajorOpen, setMajorOpen] = useState(false);
    const [isMinorOpen, setMinorOpen] = useState(false);
    const [isCollegeOpen, setCollegeOpen] = useState(false);

    const [addInfo] = useMutation(SET_INFO);
    const [checkUser, { data : userExists, loading : userExistLoading, error }] = useLazyQuery(USER_EXISTS);
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

    useEffect(() => {
        checkUser({
            variables: {
                username: username,
            },  
        })  
    }, [username])

    useEffect(()=> {
        const isMyUsernameTaken = userExists?.doesUsernameExist.usernameExists;
        setStatement("valid username!")
        if(isMyUsernameTaken){
            setStatement("somebody already took that username lol");
        }
    }, [userExists?.doesUsernameExist.usernameExists])

    const handleUserChange = useCallback(
        (e) => {
            setUsername(e.target.value)
        },
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

    if (!localStorage.getItem(TOKEN_NAME)) {
        return <Redirect to="/login" />;
    }

    if (!data?.isNewUser) {
        console.log("Redirecting....");
        return <Redirect to={"/feed"} />;
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

            if (userExistLoading || userExists?.doesUsernameExist.usernameExists){ 
                return; 
            }

            //manually set local storage cause for some reason it's not doing it anymore
            let local_storage = JSON.parse(localStorage.getItem(TOKEN_NAME));
            local_storage.isNewUser = false;
            localStorage.setItem(TOKEN_NAME, JSON.stringify(local_storage))

            try{
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
            } catch (error){
                return ;
            }
            history.push("/feed");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    //have to manually push newUser
    return (
        <>
            <Helmet>
                <title>RiceDiscuss &middot; More Info</title>
            </Helmet>
            <FullGrid>
                <PinkShape>
                    <>
                        <AboutMyself>A little about myself...</AboutMyself>
                        <LaptopGirl src={laptop_girl} alt="Girl with laptop" />
                    </>

                    <MarginsForm onSubmit={handleSubmit}>
                        <TotalForm>
                            <p>{userStatement}</p>
                            <FieldSetStyle>
                                <TextField
                                    type="text"
                                    placeholder="username"
                                    value={username}
                                    onChange={handleUserChange}
                                />
                            </FieldSetStyle>

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
                                                    setInfo={
                                                        handleCollegeChange
                                                    }
                                                    selectedItems={college}
                                                />
                                            </DDListItem>
                                        ))}
                                    </DDList>
                                )}
                            </DDWrapper>
                            <SubmitButton type="submit" disabled={userExists?.doesUsernameExist.usernameExists}>
                                &rarr;
                            </SubmitButton>
                        </TotalForm>
                    </MarginsForm>
                </PinkShape>
            </FullGrid>
        </>
    );
};

export default MoreInfo;