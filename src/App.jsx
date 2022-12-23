import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home';
import MainLayout from './Components/MainLayout/MainLayout';
import Register from './Components/Register/Register';
import ColorBoxProvider from './Context/ColorboxContext';
import { useContext } from 'react';
import {ColorBox} from './Context/ColorboxContext';
export default function App() {
  let {theme} = useContext(ColorBox);

let routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout  />,
      children: [
        { path: "home", element: <Home/> },
        { index: true , element: <Login /> }, 
        { path: "register", element: <Register/>   }
      ],
    },
  ]);

  return (
    
    <>
   
    <ColorBoxProvider >
<RouterProvider router={routes}></RouterProvider>
</ColorBoxProvider>
</>
  )
}
