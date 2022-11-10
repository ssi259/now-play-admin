import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit } from "react-icons/fa";
import { MdAdd } from "react-icons/md";

import AcademiesModal from "./modals/AcademiesModal";


function Academies(){
    const[Academies,setAcademies] = useState([]);
    const[openModal,setOpenModal] = useState(false);

    useEffect(()=>{
        getAcademyDetails();
    },[openModal])
    const getAcademyDetails=async()=>{
        let batches = await fetch('http://3.111.147.217:3000/academies');
        batches = await batches.json();
        setAcademies(batches);
    }
    console.log("Academies",Academies)
    return(
        <div className="batch-list">
             <h3 className="batch-heading">Academies<button i onClick={()=>{setOpenModal(true)}}>{<MdAdd/>}</button>{openModal && <AcademiesModal closeModal= {setOpenModal}/>}</h3>
            <div class = "table-batch-list">
                <table className="table batch-list">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Academy Name</th>
                            <th>Sport</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    {
                        Academies.map((item, index) => {
                        return (
                                <tr>
                                    <th>{index+1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.sports_name}</td>
                                    <td ><button onClick={()=>{alert("Edit Academy")}}>{<FaEdit/>}</button></td>

                                </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>  
    )
}
export default Academies