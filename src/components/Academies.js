import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import AcademiesModal from "./modals/AcademiesModal";
import UpdateAcademy from "./modals/UpdateAcademy";
import axios from "axios";

function Academies() {
  const [Academies, setAcademies] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    getAcademyDetails();
  }, [openModal, editModal]);
  const getAcademyDetails = async () => {
    let batches = await fetch(`${process.env.REACT_APP_API_PATH}
/academies`);
    batches = await batches.json();
    setAcademies(batches);
  };

  const updateAcademyStatus = async (id, status) => {
    axios.put(`http://3.111.147.217:3000/academies/${id}`, {
      status: status
    })
      .then(res => {
        alert(res.data.message);
        getAcademyDetails();
      })
      .catch(err => {
        alert(err);
      })
  }
  return (
    <div className="batch-list">
      <h3 className="batch-heading">
        Academies
        <button
          i
          onClick={() => {
            setOpenModal(true);
          }}
        >
          {<MdAdd />}
        </button>
        {openModal && <AcademiesModal closeModal={setOpenModal} />}
        {editModal && (
          <UpdateAcademy closeModal={setEditModal} editData={editData} />
        )}
      </h3>
      <div class="table-batch-list">
        <table className="table batch-list">
          <thead>
            <tr>
              <th>#</th>
              <th>id</th>
              <th>Academy Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Sport</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Academies.map((item, index) => {
              return (
                <tr>
                  <th>{index + 1}</th>
                  <th>{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone_number}</td>
                  <td>{item.sports_name}</td>
                  <td>
                    <b style={{ fontSize: '40px', verticalAlign: 'middle', color: item.status === 'active' ? 'green' : 'red', }} >•</b>
                      <select value={item.status} onChange={(e) => updateAcademyStatus(item.id, e.target.value)}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setEditModal(true), setEditData(item);
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
export default Academies;
