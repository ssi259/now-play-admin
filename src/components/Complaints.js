import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import axios from 'axios';

function Complaints() {
    const [Complaints, setComplaints] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        getComplaintsDetails();
    }, [openModal, editModal]);
    const getComplaintsDetails = async () => {
        let complaints = await fetch(`${process.env.REACT_APP_API_PATH}/complaints`);
        complaints = await complaints.json();
        setComplaints(complaints.data);
    };
    const updateComplaintStatus = async (id, status) => {
        axios.put(`${process.env.REACT_APP_API_PATH}/complaints/${id}`, {
            status: status
        })
            .then(res => {
                alert(res.data.message);
                getComplaintsDetails();
            })
            .catch(err => {
                alert(err);
            })
    }
    return (
        <div className="batch-list">
            <h3 className="batch-heading">
                Complaints
            </h3>
            <div class="table-batch-list">
                <table className="table batch-list">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>id</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Type</th>
                            <th>Subject</th>
                            <th>Text</th>
                            <th>Call Requested</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Complaints.map((item, index) => {
                            return (
                                <tr>
                                    <th>{index + 1}</th>
                                    <th>{item.complainant_id}</th>
                                    <td>{item.complainant_name}</td>
                                    <td>{item.complainant_PhoneNumber}</td>
                                    <td>{item.complainant_type}</td>
                                    <td>{item.subject}</td>
                                    <td>{item.text}</td>
                                    <td>{item.is_call_request ? 'YES' : 'NO'}</td>
                                    <td>
                                        <b style={{ fontSize: '40px', verticalAlign: 'middle', color: item.status === 'open' ? 'green' : item.status=='closed' ? 'red' : 'orange' }} >•</b>
                                        <select value={item.status} onChange={(e) => updateComplaintStatus(item.id, e.target.value)}>
                                            <option value="open">Open</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="closed">Closed</option>
                                        </select>
                                    </td>
                                    <td>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Complaints;
