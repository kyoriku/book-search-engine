import './App.css'; // Importing the App.css file
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'; // Importing the necessary modules from the apollo/client module
import { setContext } from '@apollo/client/link/context'; // Importing the setContext function from the apollo/client/link/context module
import { Outlet } from 'react-router-dom'; // Importing the Outlet component from the react-router-dom module
import Navbar from './components/Navbar'; // Importing the Navbar component from the components folder

// Define custom merge function for User.savedBooks field to prevent duplicates in the cache
const cache = new InMemoryCache({
  typePolicies: {
    User: {
      fields: {
        savedBooks: {
          merge(existing = [], incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

// Create a new instance of the createHttpLink function with the uri option set to /graphql
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Create a new instance of the setContext function with a callback function as the first parameter and an object as the second parameter
const authLink = setContext((_, { headers }) => {
  // Get the token from localStorage
  const token = localStorage.getItem('id_token');
  // Return the headers to the context so httpLink can read them and add the token to the authorization header
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create a new instance of the ApolloClient
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
});

// Define the App function component that returns the ApolloProvider component with the client prop set to the client instance and the Navbar and Outlet components as children
function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

// Export the App function component
export default App;