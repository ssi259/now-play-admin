import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import UpdateSport from "./modals/UpdateSport";
import SportModal from "./modals/SportModal";
import axios from "axios";

function Sports(){
    const[Sports,setSports] = useState([]);
    const[openModal,setOpenModal] = useState(false);
    const[editModal,setEditModal] = useState(false);
    const[editData,setEditData] = useState({});

    useEffect(()=>{
        getSportsDetails();
    },[openModal,editModal])
    const getSportsDetails=async()=>{
        if(!openModal){
            let sports = await fetch('http://3.111.147.217:3000/sports');
            sports = await sports.json();
            setSports(sports);
            console.log(sports);
        }
    }
    const updateSportStatus = async (id,status)=>{
        console.log(id,status);
        axios.put(`http://localhost:3000/sports/${id}`,{
            status:status
            })
            .then(res => {
                alert(res.data.message);
                getSportsDetails();
            })
            .catch(err => {
                alert(err);
            })
    }
    return(
        <div className="batch-list">
            <h3 className="batch-heading">Sports<button i onClick={()=>{setOpenModal(true)}}>{<MdAdd/>}</button>{openModal && <SportModal closeModal= {setOpenModal}/>}
            {editModal && <UpdateSport closeEditModal={setEditModal} editData={editData}/>}
            </h3>
            <div class = "table-batch-list">
                <table className="table batch-list">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>id</th>
                            <th>Sport Name</th>
                            <th>Type</th>
                            <th>About</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    {
                        Sports.map((item, index) => {
                            {item.status}
                        return (
                                <tr>
                                    <th>{index+1}</th>
                                    <th>{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.type}</td>
                                    <td>{item.about}</td>
                                    <td>
                                        {item.status=='Inactive' && <button className="btn btn-success" onClick={()=>{updateSportStatus(item.id,'Active')}}>Inactive</button>}
                                        {item.status=='Active' && <button className="btn btn-danger" onClick={()=>{updateSportStatus(item.id,'Inactive')}}>Active</button>}
                                    </td>
                                    <td >
                                        <button onClick={()=>{setEditData(item),setEditModal(true)}}>{<FaEdit/>}</button>
                                        
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