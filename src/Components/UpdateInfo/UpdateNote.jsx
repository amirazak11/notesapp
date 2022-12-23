import React, { useState ,useEffect,useContext } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {AiOutlineEdit} from "react-icons/ai"

export default function UpdateNote(props) {
    let{notes,index,getAllnotes}=props;
    let token =localStorage.getItem("token");
    let [Note,setNote]= useState({
        title:"",
        desc:""
    })
    function getDataNote(e) {
        let currentNote = { ...Note };
        currentNote[e.target.name] = e.target.value;
        setNote(currentNote)
      }

      function getnoteid(index){
        document.querySelector("#exampleModal1 input").value=notes[index].title;
        document.querySelector("#exampleModal1 textarea").value=notes[index].desc;
        setNote({...Note,"title":notes[index].title,"desc":notes[index].desc,"NoteID":Note[index]._id});

    }
        console.log(Note)

    async function updateNote(e){
        e.preventDefault();
        let  {data}  = await axios.put( `https://sticky-note-fe.vercel.app/updateNote` , 
              Note);
      
        console.log(data);
    }
    
  return (
    <>
       <a  onClick={()=>{getnoteid(index)}} className="float-end a" data-bs-toggle="modal" data-bs-target="#exampleModal1" >
        <AiOutlineEdit className='icon' />
        </a>
       <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <form id="edit-form" onSubmit={updateNote}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Your note</h1>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input onChange={getDataNote} placeholder="Type Title" name="title" className="form-control" type="text" />
                            <textarea onChange={getDataNote} className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div className="modal-footer">
                            <button data-bs-dismiss="modal" type="submit" className="btn login">Update</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>


    </>
  )
}
