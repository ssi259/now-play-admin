import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import PlansModal from "./modals/PlansModal";

function Plans() {
  const [plans, setPlans] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    getPlansDetails();
  }, []);
  const getPlansDetails = async () => {
    if (!openModal) {
      let plans = await fetch("http://3.111.147.217:3000/plans");
      plans = await plans.json();
      setPlans(plans);
    }
  };
  return (
    <div className="batch-list">
      <h3 className="batch-heading">
        Plans{" "}
        <button
          onClick={() => {
            setOpenModal(true);
          }}
        >
          {<MdAdd />}
        </button>
        {openModal && <PlansModal closeModal={setOpenModal} />}
      </h3>
      <div class="table-batch-list">
        <table className="table batch-list">
          <thead>
            <tr>
              <th>#</th>
              <th>Plan Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Price</th>
              <th>Tag</th>
              <th>Type</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {
              // plans?.map((item, index) => {
              //     return (
              //         <tr>
              //             <td>{index + 1}</td>
              //             <td>{item.name}</td>
              //             <td>{item.description}</td>
              //             <td>{item.status}</td>
              //             <td>{item.price}</td>
              //             <td>{item.tag}</td>
              //             <td>{item.type}</td>
              //             <td>{item.duration}</td>
              //             <td ><button onClick={() => { alert("Edit Coach") }}>{<FaEdit />}</button></td>
              //         </tr>
              //     )
              // })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Plans;
