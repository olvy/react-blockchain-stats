import { setContext } from '@apollo/client/link/context';
import './index.css'
import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client'

// TODO: move to .env
const Token = 'ory_at_QqAyEppGcG3JTTg1CIwTNJBKMV-hr8YSKzLyXulAZuw.cWCw_zyhJcMjFpdTFztlTOYF1GxGIM3FCXn0xP0QUf8'
const Authorization = `Bearer ${Token}`
const ApiUrl = 'https://streaming.bitquery.io'

const fetchParams = {
  uri: `${ApiUrl}/graphql`,
  credentials: 'same-origin',
};

const httpLink = createHttpLink(fetchParams);

const authLink = () =>
  setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization,
      },
    };
  });

export const getApolloClient = () => new ApolloClient({
  uri: ApiUrl,
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    authLink(),
    httpLink
  ]),
});