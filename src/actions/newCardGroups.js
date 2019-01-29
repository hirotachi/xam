import ApolloClient from "apollo-boost";
import gql from "graphql-tag";


const client = new ApolloClient({
    uri: process.env.HOST || "/graphql"
});



client.mutate({
    mutation: gql`
    mutation
        {
            createGroup(
                data: {
                    owner: "cjreve9yt001y0759om5p6gsc",
                    name: "does this work now?",
                    color: "fdsqfd"
                }
            ){
                name, id, color
            }
        }
    `
}).then(res => console.log(res))
    .catch(err => console.log(err))






