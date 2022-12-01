import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import BatchesModal from "./modals/BatchesModal";
import UpdateBatches from "./modals/UpdateBatches";


function Batches() {
  const [Batches, setBatches] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const plans = useRef([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [batchData,setBatchData] = useState({});

  const weekdays = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  useEffect(() => {
    getBatchDetails();
    getPlansDetails();
  }, [openModal, updateModal]);

  const getPlansDetails = async () => {
    let batchPlans = await fetch("http://3.111.147.217:3000/plans/all");
    batchPlans= await batchPlans.json();
    plans.current = batchPlans.data;
  };
  const [files, setFiles] = useState([]);

  function handleChange(event) {
    setFiles(event.target.files);
  }

  function handleSubmit(event, id) {
    event.preventDefault();
    const url = `http://3.111.147.217:3000/batches/upload_file?batch_id=${id}`;
    var formdata = new FormData();
    for (var i = 0; i < files.length; i++) {
      formdata.append("files_name", files[i], files[i].name);
    }
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    fetch(url, requestOptions)
      .then((result) => alert("File Uploaded Successfully"))
      .catch((error) => alert("File Upload Failed"));
  }
  const getBatchDetails = async () => {
    let batches = await fetch(
      "http://3.111.147.217:3000/batches/search?lat=28.21&&lng=78.12"
    );
    batches = await batches.json();
    for (var i = 0; i < batches.batchList.length; i++) {
      var batch_days_in_week = [];
      if (batches.batchList[i]["days"]) {
        var batch_days = "";
        var resp_batch_days = batches.batchList[i]["days"]
          .replace(/[\[\]']+/g, "")
          .split(",");
        for (var day = 0; day < resp_batch_days.length; day++) {
          if (resp_batch_days[day] == 1) {
            batch_days = batch_days + "," + weekdays[day];
          }
        }
        batch_days_in_week.push(batch_days.substring(1, batch_days.length));
      }
      batches.batchList[i]["days"] = batch_days_in_week;
    }
    setBatches(batches.batchList);
  };
  return (
    <div className="batch-list">
      <h3 className="batch-heading">
        Batches
        <button
          onClick={() => {
            setOpenModal(true);
          }}
        >
          {<IoMdAdd />}
        </button>
        {openModal && <BatchesModal closeModal={setOpenModal} />}{" "}{updateModal && <UpdateBatches closeModal={setUpdateModal} batchData={batchData}/>}
      </h3>
      <div className="table-batch-list">
        <table className="table batch-list">
          <thead>
            <tr>
              <th>#</th>
              <th>Sport</th>
              <th>Academy</th>
              <th>Arena</th>
              <th>Coach</th>
              <th>Plans</th>
              <th>Price</th>
              <th>Start time</th>
              <th>End time</th>
              <th>Days</th>
              <th>Actions</th>
              <th>Upload Image</th>
            </tr>
          </thead>
          <tbody>
            {Batches.map((item, index) => {
              return (
                <tr>
                  <th>{index + 1}</th>
                  <td>{item.sport_name}</td>
                  <td>{item.academy_name}</td>
                  <td>{item.arena_name}</td>
                  <td>{item.coach_name}</td>
                  <td>
                    {plans.current.data
                      .filter((plan) => plan.batch_id === item.id)
                      .map((item, index) => item.plan_name)
                      .join(", ")}
                  </td>
                  <td>{item.price}</td>
                  <td>{item.start_time}</td>
                  <td>{item.end_time}</td>
                  <td>{item.days}</td>
                  <td>
                    <button
                      onClick={() => {
                        setBatchData(item);
                        setUpdateModal(true);
                      }}
                    >
                      {<FaEdit />}
                    </button>
                    
                  </td>
                  <td>
                    <form onSubmit={(e) => handleSubmit(e, item.id)}>
                      <input multiple name="" type="file" onChange={handleChange} />
                      <button type="submit">Upload</button>
                    </form>
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
export default Batches;

