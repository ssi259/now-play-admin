import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import BatchesModal from "./modals/BatchesModal";

function Batches() {
  const [Batches, setBatches] = useState([]);
  const plans = useRef([]);
  const [openModal, setOpenModal] = useState(false);

  const weekdays = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  useEffect(() => {
    getBatchDetails();
    getPlansDetails();
  }, [openModal]);

  const getPlansDetails = async () => {
    let batchPlans = await fetch(
      "http://3.111.147.217:3000/plans"
    )
    
    plans.current = await batchPlans.json();
    

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
        {openModal && <BatchesModal closeModal={setOpenModal} />}{" "}
      </h3>
      <div className="table-batch-list">
        <table className="table batch-list">
          <thead>
            <tr>
              <th>#</th>
              <th>Batch ID</th>
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
            </tr>
          </thead>
          <tbody>
            {Batches.map((item, index) => {
              return (
                <tr key={`${item.id}-${item.price}-${index + 1}`}>
                  <th>{index + 1}</th>
                  <th>{item.id}</th>
                  <td>{item.sport_name}</td>
                  <td>{item.academy_name}</td>
                  <td>{item.arena_name}</td>
                  <td>{item.coach_name}</td>
                  <td>{plans.current.filter(plan => plan.batch_id === item.id).map((item, index) => item.plan_name).join(", ")}</td>
                  <td>{item.price}</td>
                  <td>{item.start_time.slice(0, 5)}</td>
                  <td>{item.end_time.slice(0, 5)}</td>
                  <td>{item.days}</td>
                  <td>
                    <button
                      onClick={() => {
                        alert("Edit Batch");
                      }}
                    >
                      {<FaEdit />}
                    </button>
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
