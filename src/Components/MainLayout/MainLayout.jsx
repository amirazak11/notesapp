import React from 'react'
import { Outlet } from 'react-router-dom'
import DarkMode from '../DarkMode/DarkMode';
import { Offline } from "react-detect-offline";
import DetectOffline from "../OffLine/OffLine"
import { useContext } from 'react';
import {ColorBox} from '../../Context/ColorboxContext';
import CollapsibleExample from '../Navbar/Navbar'
export default function MainLayout() {
  let {theme} = useContext(ColorBox);
  return (
    <>

      <div className='darkMode' id={theme} >
      <CollapsibleExample />
      <Offline>
  <DetectOffline/>
</Offline>
     <Outlet/>
     </div>
    </>
  )
}
