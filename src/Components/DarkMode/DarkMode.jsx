import React from 'react';
import Switch from 'react-switch';
import { useContext } from 'react';
import {ColorBox} from '../../Context/ColorboxContext';
export default function DarkMode() {
    let {theme,toggleTheme} = useContext(ColorBox);
  return (
  
      <Switch  className='switch'  onChange={toggleTheme} checked={theme === "light"}/>

  )
}
