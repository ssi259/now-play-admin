import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit } from "react-icons/fa";


function Batches(){
    const[Batches,setBatches] = useState([]);
    useEffect(()=>{
        getBatchDetails();
    },[])
    const getBatchDetails=async()=>{
        let batches = await fetch('http://localhost:3000/batches/search?lat=28.21&&lng=78.12');
        batches = await batches.json();
        setBatches(batches.batchList);
    }
    const getDays = async()=>{
        console.log("days"+Batches.batchList["days"])
    }
    console.log("Batches",Batches)
    return(
        <div className="batch-list">
            <h3 className="batch-heading">Batch List</h3>
            <div class = "table-batch-list">
                <table className="table batch-list">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Sport</th>
                            <th>Start time</th>
                            <th>End time</th>
                            <th>Days</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    {
                        Batches.map((item, index) => {
                        return (
                                <tr>
                                    <th>{index+1}</th>
                                    <td>{item.sport_name}</td>
                                    <td>{item.start_time}</td>
                                    <td>{item.end_time}</td>
                                    <td>{item.days}</td>
                                    <td ><button onClick={()=>{alert("Edit Batch")}}>{<FaEdit/>}</button></td>

                                </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>           
        )
}
export default Batches