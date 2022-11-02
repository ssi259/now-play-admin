import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import SportModal from "./modals/SportModal";

function Sports(){
    const[Sports,setSports] = useState([]);
    const[openModal,setOpenModal] = useState(false);

    useEffect(()=>{
        getSportsDetails();
    },[])
    const getSportsDetails=async()=>{
        let sports = await fetch('http://localhost:3000/sports');
        sports = await sports.json();
        setSports(sports);
    }
    console.log("Sports",Sports)
    return(
        <div className="batch-list">
            <h3 className="batch-heading">Sports<button i onClick={()=>{setOpenModal(true)}}>{}</button>{openModal && <SportModal closeModal= {setOpenModal}/>}</h3>
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
                                        <button onClick={()=>{alert("Edit Coach")}}>{}</button>
                                        
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