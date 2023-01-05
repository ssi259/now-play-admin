import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const Leads = () => {
    const [Leads, setLeads] = useState([]);
 

    useEffect(() => {
        getLeadsDetails();
    }, []);
    const getLeadsDetails = async () => {
        let leads = await fetch(`${process.env.REACT_APP_API_PATH}/leads/all`);
        leads = await leads.json();
        setLeads(leads.data);
    };
    // id | first_name | last_name | email_id | mobile_number | description
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'first_name',
            headerName: 'First Name',
            width: 150,
        },
        {
            field: 'last_name',
            headerName: 'Last Name',
            width: 150,
        },
        {
            field: 'email_id',
            headerName: 'Email ID',
            width: 200,
        },
        {
            field: 'mobile_number',
            headerName: 'Mobile No.',
            width: 150,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 150,
        },

    ];

    const rows = Leads.map((item, index) => {
        return {
            id: item.id,
            first_name: item.first_name,
            last_name: item.last_name,
            email_id: item.email_id,
            mobile_number: item.mobile_number,
            description: item.description,
        }
    });

    return (
        <>
        <div className="batch-list">
            
            <h3 className="batch-heading">
            Leads
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

export default Leads