import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import PlansModal from "./modals/PlansModal";
import UpdatePlan from "./modals/UpdatePlan";
import axios from "axios";

function Plans() {
  const [plans, setPlans] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  useEffect(() => {
    getPlansDetails();
  }, [openModal, openEditModal]);
  const getPlansDetails = async () => {
    if (!openModal) {
      let plans = await fetch(`${process.env.REACT_APP_API_PATH}/plans/all?type=admin`);
      plans = await plans.json();
      setPlans(plans.data);
    }
  };
  const updatePlanStatus = async (id, status) => {
    axios.put(`${process.env.REACT_APP_API_PATH}/plans/${id}`, {
      status: status
    })
      .then(res => {
        alert(res.data.message);
        getPlansDetails();
      })
      .catch(err => {
        alert(err);
      })
  }
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
        {openEditModal && <UpdatePlan closeEditModal={setOpenEditModal} editData={editData} />}
      </h3>
      <div className="table-batch-list">
        <table className="table batch-list">
          <thead>
            <tr>
              <th>#</th>
              <th>Plan Name</th>
              <th>Batch ID</th>
              <th>Description</th>
              <th>Price</th>
              <th>Tag</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              plans?.map((item, index) => {
                  return (
                      <tr key={`${index}`}>
                          <td>{index + 1}</td>
                          <td>{item.plan_name}</td>
                          <td>{item.batch_id}</td>
                          <td>{item.description}</td>
                          <td>{item.price}</td>
                          <td>{item.tag}</td>
                          <td>{item.type}</td>
                          <td>{item.duration}</td>
                          <td>
                            <b style={{ fontSize: '40px', verticalAlign: 'middle', color: item.status === 'active' ? 'green' : 'red', }} >•</b>
                            <select value={item.status} onChange={(e) => updatePlanStatus(item.id, e.target.value)}>
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </td>
                          <td ><button onClick={() => {setOpenEditModal(true),setEditData(item) }}>{<FaEdit />}</button></td>
                      </tr>
                  )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Plans;
