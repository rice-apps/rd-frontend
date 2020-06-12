import React from "react";
import { useSubscription } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import OtherH1 from "./Discussions.styles";

const SUB_USERNAME = gql`
    subscription {
        profileUpdated {
            username
        }
    }
`;

function Discussions() {
    const { data, loading, error } = useSubscription(SUB_USERNAME);

    if (loading) return <h1>Loading...</h1>;
    console.log(error);
    if (error) return <h1>Something is wrong...</h1>

    return <OtherH1>{!loading && data.profileUpdated.username}</OtherH1>;
}

export default Discussions;
