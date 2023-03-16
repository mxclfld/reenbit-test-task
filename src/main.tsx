import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ErrorPage from './components/ErrorPage';
import './index.css';
import Character from './components/Character';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CLIENT_ID } from './config';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/characters/:characterId',
    element: <Character />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </GoogleOAuthProvider>
);
