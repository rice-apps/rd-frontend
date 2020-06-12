import React from "react";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import OtherH1 from "./Other.styles";

const SUB_USERNAME = gql`
    {
        profileUpdated {
            username
        }
    }
`;

function Other() {
    const { loading, error, data } = useSubscription(SUB_USERNAME);

    console.log(data);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Something went wrong...</h1>;

    return <OtherH1>{data.profileUpdated.username}</OtherH1>;
}

export default Other;
