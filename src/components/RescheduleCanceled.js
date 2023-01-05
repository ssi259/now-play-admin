import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import axios from 'axios';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { MenuItem, Select } from "@mui/material";
import Audits from "./Audits";

function RescheduleCanceled() {
    const [Reschedule, setReschedule] = useState([]);
    const [Coaches, setCoaches] = useState([]);
    const [Batches, setBatches] = useState([]);
 

    useEffect(() => {
        getRescheduleDetails();
    }, []);
    const getRescheduleDetails = async () => {
        let reschedule = await fetch(`${process.env.REACT_APP_API_PATH}/reschedule`);
        reschedule = await reschedule.json();
        setReschedule(reschedule.data);
    };
    const setBatchesDetails = async () => {
        let batch = await fetch(`${process.env.REACT_APP_API_PATH}/batches/search?lat=28.21&&lng=78.12`);
        batch = await batch.json();
        setBatches(batch.data);
      };
      const getCoachDetails = async () => {
        let coaches = await fetch(`${process.env.REACT_APP_API_PATH}/coach`);
        coaches = await coaches.json();
        setCoaches(coaches.data);
      };
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'batch_id',
            headerName: 'Batch ID',
            width: 150,
        },
        {
            field: 'updated_date',
            headerName: 'Updated Date',
            width: 150,
        },
        {
            field: 'updated_start_time',
            headerName: 'Updated Start Time',
            width: 200,
        },
        {
            field: 'updated_end_time',
            headerName: 'Updated End Time',
            width: 150,
        },
        {
            field: 'previous_start_date',
            headerName: 'Previous Start Date',
            width: 150,
        },
        {
            field: 'previous_start_time',
            headerName: 'Previous Start Time',
            width: 150,
        },
        {
            field: 'type',
            headerName: 'Type',
            width: 150,
        },
        {
            field: 'previous_end_time',
            headerName: 'Previous End Time',
            width: 150,
        },
    ];

    const rows = Reschedule.map((item, index) => {
        return {
            id: item.id,
            batch_id: item.batch_id,
            updated_date: item.updated_date,
            updated_start_time: item.updated_start_time,
            updated_end_time: item.updated_end_time,
            previous_start_date: item.previous_start_date,
            previous_start_time: item.previous_start_time,
            type: item.type,
            previous_end_time: item.previous_end_time,
        }
    });

    return (
        <>
        <Audits/>
        <div className="batch-list">
            
            <h3 className="batch-heading">
            Reschedule / Canceled
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
        </>
    );
}
export default RescheduleCanceled;
