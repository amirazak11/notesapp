import React, {  useState  } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {RiHeartAddFill} from 'react-icons/ri'
export default function Model({getAllnotes}) {
    let token =localStorage.getItem("token")
    let decoded = jwt_decode(token);
    let citizenID = decoded._id;
    let [Note,setNote]= useState({
        title:"",
        desc:""
    })

    function getDataNote(e) {
        let currentNote = { ...Note };
        currentNote[e.target.name] = e.target.value;
        setNote(currentNote)
      }
      console.log(Note)

  async function addNote(e){
    e.preventDefault();
    let {data} = await axios.post(
      `https://sticky-note-fe.vercel.app/addNote` ,{
        
title:Note.title,
desc:Note.desc,
        token, 
        citizenID}); 
        if (data.message == "success") {
          document.getElementById("add-form").reset();
                  getAllnotes();

        }
     

  }
  return (
    <>
    <button type="button" className="btn btn-light  blockquote d-block ms-auto mt-3 my-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
    <RiHeartAddFill className='addicon'/>
   Add Note  
     </button>

    
    <div className="modal fade modal-dialog modal-dialog-scrollable " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Add note</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
 <form onSubmit={addNote} id="add-form">

          <div className="mb-3">
  <input type="text" className="form-control" name='title' id="exampleFormControlInput1"
       onChange={(e) => getDataNote(e)}
  placeholder="Type Title"/>
</div>
<div className="mb-3">
  <textarea className="form-control" name='desc' 
  onChange={(e) => getDataNote(e)}
  placeholder="Type Title" id="exampleFormControlTextarea1" rows="8"></textarea>
</div>    

<div className="modal-footer">
            <button  className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type='submit'  className="btn login" data-bs-dismiss="modal" >Add</button>
          </div>
    </form>
      </div>

        </div>
      </div>
    </div>

    </>
  )
}
