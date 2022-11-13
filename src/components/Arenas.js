import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

function Arenas(){
    const[arenas,setArenas] = useState([]);
    useEffect(()=>{
        getBatchDetails();
    },[])
    const getBatchDetails=async()=>{
        let Arenas = await fetch('http://3.111.147.217:3000/arenas');
        Arenas = await Arenas.json();
        setArenas(Arenas);
    }
    console.log("Arenas",arenas)
    return(
        <div className="batch-list">
            <h3 className="batch-heading">Arenas <button onClick={()=>{alert("Edit Batch")}}>{<IoMdAdd/>}</button></h3>
            <div class = "table-batch-list">
                <table className="table batch-list">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>id</th>
                            <th>Coach Name</th>
                            <th>Sport</th>
                            <th>Experience</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    {
                        arenas.map((item, index) => {
                        return (
                                <tr>
                                    <th>{index+1}</th>
                                    <th>{item.id}</th>
                                    <td>{item.name}</td>
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
export default Arenas