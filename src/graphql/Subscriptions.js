import { gql } from "apollo-boost";

const DISCUSSION_SUBSCRIPTION = gql`
    subscription {
        discussionCreated {
            _id
            title
            body
            creator {
                username
            }
            date_created
            __typename
        }
    }
`;

export { DISCUSSION_SUBSCRIPTION };
