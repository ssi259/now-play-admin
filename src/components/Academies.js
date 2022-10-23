import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

function Academies(){
    const[Academies,setAcademies] = useState([]);
    useEffect(()=>{
        getBatchDetails();
    },[])
    const getBatchDetails=async()=>{
        let batches = await fetch('http://localhost:3000/batches/search?lat=28.21&&lng=78.12');
        batches = await batches.json();
        setAcademies(batches.batchList);
    }
    console.log("Academies",Academies)
    return(
        <div className="batch-list">
            <h3 className="batch-heading">Academy List  <button onClick={()=>{alert("Edit Batch")}}>{<IoMdAdd/>}</button></h3>
            <div class = "table-batch-list">
                <table className="table batch-list">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Academy Name</th>
                            <th>Sport</th>
                            <th>Experience</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    {
                        Academies.map((item, index) => {
                        return (
                                <tr>
                                    <th>{index+1}</th>
                                    <td>{"Ravi"}</td>
                                    <td>{"Cricket"}</td>
                                    <td>{5}</td>
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