import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import axios from 'axios';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { MenuItem, Select } from "@mui/material";

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

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'complainant_id',
            headerName: 'Complainant ID',
            width: 150,
        },
        {
            field: 'complainant_name',
            headerName: 'Complainant Name',
            width: 150,
        },
        {
            field: 'complainant_PhoneNumber',
            headerName: 'Complainant Phone Number',
            width: 200,
        },
        {
            field: 'complainant_type',
            headerName: 'Complainant Type',
            width: 150,
        },
        {
            field: 'subject',
            headerName: 'Subject',
            width: 150,
            renderCell: (params) => {
                console.log(params);
                return (
                    <textarea 
                    style={{width:'100%',height:'100%',scrollbarWidth:'none', textDecoration:'none'}}
                    >
                        {params.value}
                    </textarea>
                )
            }
        },
        {
            field: 'text',
            headerName: 'Text',
            width: 250,
            renderCell: (params) => {
                return (
                    <textarea style={{width:'100%',height:'100%',scrollbarWidth:'none', textDecoration:'none'}}>
                        {params.value}
                    </textarea>
                )
            }
        },
        {
            field: 'is_call_request',
            headerName: 'Call Requested',
            width: 150,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 200,
            editable: true,
            renderCell: (params) => {
                return (
                    <>
                    <b style={{ fontSize: '40px', verticalAlign: 'middle', color: params.value === 'closed' ? 'green' : params.value == 'open' ? 'red': 'orange'  }} >•</b>
                    <Select value={params.value} onChange={(e) => updateComplaintStatus(params.id, e.target.value)}>
                        <MenuItem value="open">Open</MenuItem>
                        <MenuItem value="closed">Closed</MenuItem>
                    </Select>
                    </>
                )
            }
        },
    ];

    const rows = Complaints.map((item, index) => {
        return {
            id: index + 1,
            complainant_id: item.complainant_id,
            complainant_name: item.complainant_name,
            complainant_PhoneNumber: item.complainant_PhoneNumber,
            complainant_type: item.complainant_type,
            subject: item.subject,
            text: item.text,
            is_call_request: item.is_call_request ? 'YES' : 'NO',
            status: item.status
        }
    });

    return (
        <div className="batch-list">
            <h3 className="batch-heading">
                Complaints
            </h3>
            <div class="table-batch-list">
                <Box sx={{ height: 700, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        rowHeight={100}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                    />
                </Box>
            </div>
        </div>
    );
}
export default Complaints;
