const fetch = require("cross-fetch");
const fs = require("fs");

const API_HOST = "http://localhost:3001";

fetch(`${API_HOST}/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        variables: {},
        query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
    }),
})
    .then((result) => result.json())
    .then((result) => {
        const possibleTypes = {};

        result.data.__schema.types.forEach((supertype) => {
            if (supertype.possibleTypes) {
                possibleTypes[supertype.name] = supertype.possibleTypes.map(
                    (subtype) => subtype.name,
                );
            }
        });

        fs.writeFile(
            "./src/utils/possibleTypes.json",
            JSON.stringify(possibleTypes),
            (err) => {
                if (err) {
                    console.error("Error writing possibleTypes.json", err);
                } else {
                    console.log("Fragment types successfully extracted!");
                }
            },
        );
    });
