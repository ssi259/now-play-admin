import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import PlansModal from "./modals/PlansModal";
import UpdatePlan from "./modals/UpdatePlan";

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
      let plans = await fetch(`${process.env.REACT_APP_API_PATH}



/plans/all`);
      plans = await plans.json();
      setPlans(plans.data);
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
              <th>Status</th>
              <th>Price</th>
              <th>Tag</th>
              <th>Type</th>
              <th>Duration</th>
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
                          <td>{item.status}</td>
                          <td>{item.price}</td>
                          <td>{item.tag}</td>
                          <td>{item.type}</td>
                          <td>{item.duration}</td>
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
