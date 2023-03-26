import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import FormField from './components/FormField';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <FormField />
    },
    {
      path: '/dashboard',
      element: <Dashboard />
    },
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
