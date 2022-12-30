import React, { useState ,useEffect,useContext } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Model from '../Model/Model';
import { RiDeleteBinLine } from "react-icons/ri";
import UpdateNote from '../UpdateInfo/UpdateNote';
export default function Home() {
    let token =localStorage.getItem("token")
    let decoded = jwt_decode(token);
    let userID = decoded._id;
    let [notes,setnotes]= useState([])
  async function getAllnotes(){
    let {data} = await axios.post(
      `https://sticky-note-fe.vercel.app/getUserNotes` ,{token, userID}); 
    setnotes(data.Notes)
  }
  useEffect(() => {
    getAllnotes()
  }, []);
  
  const baseURL = "https://sticky-note-fe.vercel.app/";

  const deleteNote = async (NoteID) => {
    const { data } = await axios.delete(baseURL + "deleteNote", {
      data: {
        NoteID,
        token,
      },
    });
  
    if (data.message === "deleted") {
      getAllnotes()
    }
  };
  


  return (

<div className="container">
<Model/>
        <div className="row"> 
          {notes&& notes.map((note,index) =>
          <div key={note._id} className="col-md-4 col-lg-4 col-sm-12 ">
      
<div className="card" id="card"> 

  <div className="card-header">
  <div className="float-start"> {note.title}</div>
  <UpdateNote note={note} userID={userID} getAllnotes={getAllnotes}/>

  
  <a onClick={()=>deleteNote(note._id)}
   className="float-end "> 
   <RiDeleteBinLine className='icon' />
   </a>

  </div>
  <div className="card-body">
  <p className="card-text">{note.desc}</p>
  </div>
  
  </div>



          </div>)
          }
          </div></div>

  )
}
