import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit } from "react-icons/fa";
import { MdAdd } from "react-icons/md";

import CoachModal from "./modals/CoachModal";

function Coaches(){
    const[coaches,setCoaches] = useState([]);
    const[openModal,setOpenModal] = useState(false);

    useEffect(()=>{
        getCoachDetails();
    },[openModal])
    const getCoachDetails=async()=>{
        if(!openModal){
            let coaches = await fetch('http://3.111.147.217:3000/coach');
            coaches = await coaches.json();
            setCoaches(coaches.data);
        }
    }
    console.log("coaches",coaches)
    return(
        <div className="batch-list">
            <h3 className="batch-heading">Coach<button i onClick={()=>{setOpenModal(true)}}>{<MdAdd/>}</button>{openModal && <CoachModal closeModal= {setOpenModal}/>}</h3>
            <div class = "table-batch-list">
                <table className="table batch-list">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Coach Name</th>
                            <th>Phone</th>
                            <th>Sport</th>
                            <th>Experience(months)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    {
                        coaches.map((item, index) => {
                        return (
                                <tr>
                                    <th>{index+1}</th>
                                    <td>{item.name}</td>
                                    <th>{item.phone_number}</th>
                                    <td>{item.sports_id}</td>
                                    <td>{item.experience}</td>
                                    <td ><button  onClick={()=>{alert("Edit Coach")}}>{<FaEdit/>}</button></td>

                                </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>  
    )
}
export default Coaches