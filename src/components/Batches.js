import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import BatchesModal from "./modals/BatchesModal";
import UpdateBatches from "./modals/UpdateBatches";
import axios from "axios";


function Batches() {
  const [Batches, setBatches] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const plans = useRef([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [batchData,setBatchData] = useState({});
  const [batchImages,setBatchImages] = useState([]);
  const [files, setFiles] = useState([]);

  const weekdays = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  useEffect(() => {
    getBatchDetails();
    getPlansDetails();
    getBatchImages();
  }, [openModal, updateModal]);
  
  const getBatchImages = async () => {
    let batchImages = await fetch(`${process.env.REACT_APP_API_PATH}/batches/images`);
    batchImages = await batchImages.json();
    setBatchImages(batchImages.data);
  }
  const getPlansDetails = async () => {
    let batchPlans = await fetch(`${process.env.REACT_APP_API_PATH}/plans/all`);
    plans.current = await batchPlans.json();
  };

  function handleChange(event) {
    setFiles(event.target.files);
  }

  function handleSubmit(event, id) {
    event.preventDefault();
    const url = `${process.env.REACT_APP_API_PATH}/batches/upload_file?batch_id=${id}`;
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
      .then((result) => alert("File Uploaded Successfully"), getBatchImages())
      .catch((error) => alert("File Upload Failed"));
    
  }
  const getBatchDetails = async () => {
    let batches = await fetch(
      `${process.env.REACT_APP_API_PATH}/batches/search?lat=28.21&&lng=78.12`
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
  const updateBatchStatus = async (id, status) => {
    console.log(id, status);
    axios.put(`${process.env.REACT_APP_API_PATH}/batches/${id}`, {
      status: status
    })
      .then(res => {
        alert(res.data.message);
        getBatchDetails();
        getPlansDetails();
      })
        .then(res => {
          alert(res.data.message);
          getBatchDetails();
          getPlansDetails();
        })
        .catch(err => {
          console.log(err);
        })
    }
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
              <th>Status</th>
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
                    {plans.current
                      .data
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
                    {
                      batchImages && batchImages.map((image, index) => {
                        if(image.batchId === item.id)
                        return (
                          <div>
                            <p>{image.img_url.split('_')[1]}</p>
                          </div>
                        )
                      })
                    }
                  </td>
                  <td>
                    <b style={{ fontSize: '40px', verticalAlign: 'middle', color: item.status === 'active' ? 'green' : 'red', }} >•</b>
                    <select value={item.status} onChange={(e) => { updateBatchStatus(item.id, e.target.value) }}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
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

