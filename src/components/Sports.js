import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit } from "react-icons/fa";
import { MdAdd } from "react-icons/md";

import SportModal from "./modals/SportModal";

function Sports(){
    const[Sports,setSports] = useState([]);
    const[openModal,setOpenModal] = useState(false);

    useEffect(()=>{
        getSportsDetails();
    },[openModal])
    const getSportsDetails=async()=>{
        if(!openModal){
            let sports = await fetch('http://3.111.147.217:3000/sports');
            sports = await sports.json();
            setSports(sports);
        }
    }
    console.log("Sports",Sports)
    return(
        <div className="batch-list">
            <h3 className="batch-heading">Sports<button i onClick={()=>{setOpenModal(true)}}>{<MdAdd/>}</button>{openModal && <SportModal closeModal= {setOpenModal}/>}</h3>
            <div class = "table-batch-list">
                <table className="table batch-list">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Sport Name</th>
                            <th>Type</th>
                            <th>About</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    {
                        Sports.map((item, index) => {
                        return (
                                <tr>
                                    <th>{index+1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.type}</td>
                                    <td>{item.about}</td>
                                    <td >
                                        <button onClick={()=>{alert("Edit Coach")}}>{<FaEdit/>}</button>
                                        
                                    </td>

                                </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>  
    )
}
export default Sports