import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import axios from 'axios';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { MenuItem, Select } from "@mui/material";
import Audits from "./Audits";

function PaymentAudit() {
    const [Payments, setPayments] = useState([]);

    useEffect(() => {
        getPayments();
    }, []);

    const getPayments= async () => {
        let payment = await fetch(`${process.env.REACT_APP_API_PATH}/payments/entries`);
        payment = await payment.json();
        setPayments(payment.data);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'payment_id',
            headerName: 'Payment ID',
            width: 100,
        },
        {
            field: 'user_name',
            headerName: 'User Name',
            width: 200,
        },
        {
            field: 'coach_name',
            headerName: 'Coach Name',
            width: 200,
        },
        {
            field: 'plan_name',
            headerName: 'Plan Name',
            width: 250,
        },
        {
            field: 'pay_mode',
            headerName: 'Pay Mode',
            width: 150
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 150,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 200
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 200
        },
    ];

    const rows = Payments.map((item, index) => {
        return {
            id: index + 1,
            payment_id: item.id,
            user_name: item.user_name,
            coach_name: item.coach_name,
            plan_name: item.plan_name,
            pay_mode: item.payment_mode,
            price: item.price,
            status: item.status,
            date: item.createdAt
        }
    });

    return (
        <>
        <Audits/>
        <h3 className="text-center" >Payment Audit</h3>
        <Box sx={{ height: 650, width: '100%' }}>
            <DataGrid
                pagination
                rows={rows}
                rowHeight={50}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
            />
        </Box>
        </>
    );
}
export default PaymentAudit;
