import { useContext } from 'react';
import {ColorBox} from '../../Context/ColorboxContext';
import { useNavigate } from 'react-router-dom';
import {GiNotebook} from 'react-icons/gi'
import {GoPerson} from 'react-icons/go'
import { Link } from 'react-router-dom';
import DarkMode from '../DarkMode/DarkMode';

function CollapsibleExample() {
  let Navigate = useNavigate()
  let {userData,setuserData} = useContext(ColorBox);
  function logOut(){
    localStorage.removeItem("token");
    setuserData(null);
    Navigate("/");
  }
  return (
<nav className="navbar navbar-expand-lg navbar-dark black p-3">
  <div className="container-fluid">
    <div className="navbar-brand" >Note
    <GiNotebook className='gitnote'/>
    </div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarSupportedContent">

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
    
     {userData?  
     <>

     <li className="nav-item">
       <Link className="nav-link ineerNav colorName" to="home"> 
     {userData.first_name}  
<GoPerson className='hearticon'/>
  
     </Link>
     </li>
     <li className="nav-item">
       <a className="nav-link  ineerNav" onClick={logOut} >
       Logout
        </a>
     </li>
     </>
     :<>
      <li className="nav-item">
       <Link className="nav-link register ineerNav " to='register'>Register</Link>
     </li> 
      <li className="nav-item">

      <Link className="nav-link ineerNav" to=''>Login</Link>
    </li>
     </>}

     <li className="nav-item d-flex align-self-center dark ">
      
      <DarkMode  />
    
</li>
 
   </ul>
    </div>
  </div>
</nav>
  );
     }

export default CollapsibleExample;