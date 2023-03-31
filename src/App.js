import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin';
import Dashboard from './components/Dashboard';
import FormField from './components/FormField';
import SignUp from './components/SignUp';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <FormField />
    },
    {
      path: 'signup',
      element: <SignUp />
    },
    {
      path: '/dashboard',
      element: <Dashboard />
    },
    {
      path: '/admin',
      element: <Admin />
    },
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
