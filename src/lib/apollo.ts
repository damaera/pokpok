import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "https://graphql-pokeapi.graphcdn.app/",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemons: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,
            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing = {}, incoming) {
              return {
                ...incoming,
                results: [...(existing?.results || []), ...incoming?.results],
              };
            },
          },
        },
      },
    },
  }),
});

export { apolloClient }