import React, { useState,useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';



function Batches(){
    const[Batches,setBatches] = useState([]);
    const weekdays = ["Mon","Tues","Wed","Thurs","Fri","Sat","Sun"]
    useEffect(()=>{
        getBatchDetails();
    },[])
    const getBatchDetails=async()=>{
        let batches = await fetch('http://3.111.147.217:3000/batches/search?lat=28.21&&lng=78.12');
        batches = await batches.json();
        console.log("length"+batches.batchList.length)
        for(var i = 0 ;i < batches.batchList.length;i++){
            var batch_days_in_week = [];
            if(batches.batchList[i]["days"]){
                var batch_days ="";
                var resp_batch_days = batches.batchList[i]["days"].replace(/[\[\]']+/g,'').split(',')
                for(var day = 0; day< resp_batch_days.length;day++){
                    if (resp_batch_days[day] == 1){
                        batch_days = batch_days+","+weekdays[day]
                    }
                }
                batch_days_in_week.push(batch_days.substring(1,batch_days.length))

            }
            batches.batchList[i]["days"]=batch_days_in_week
            
        }
        setBatches(batches.batchList);
    }
    console.log("Batches",Batches)
    return(
        <div className="batch-list">
            <h3 className="batch-heading">Batches</h3>
            <div class = "table-batch-list">
                <table className="table batch-list">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Sport</th>
                            <th>Price</th>
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
                                    <td>{item.price}</td>
                                    <td>{item.start_time}</td>
                                    <td>{item.end_time}</td>
                                    <td>{item.days}</td>
                                    <td><button onClick={()=>{alert("Edit Batch")}}>{}</button></td>

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