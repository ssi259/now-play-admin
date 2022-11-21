import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import UpdateCoach from "./modals/UpdateCoach";
import CoachModal from "./modals/CoachModal";
import axios from "axios";

function Coaches() {
  const [coaches, setCoaches] = useState([]);
<<<<<<< HEAD
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  const Sports = useRef([]);
=======
  const Sports = useRef([]);
  const [openModal, setOpenModal] = useState(false);
>>>>>>> d3d3608 (formatted_coaches)

  useEffect(() => {
    getCoachDetails();
    // getSportsDetails();
  }, [openModal, editModal]);

  const getCoachDetails = async () => {
    if (!openModal) {
      let coaches = await fetch(`${process.env.REACT_APP_API_PATH}/coach`);
      coaches = await coaches.json();
      setCoaches(coaches.data);
    }
  };
  const updateCoachStatus = async (id, status) => {
    console.log(id, status);
    axios.put(`${process.env.REACT_APP_API_PATH}/coach/${id}`, {
      status: status
    })
      .then(res => {
        alert(res.data.message);
        getCoachDetails();
      })
        .catch(err => {
          alert(err);
        })
    }

    return (
      <div className="batch-list">
        <h3 className="batch-heading">
          Coach
          <button
            onClick={() => {
              setOpenModal(true);
            }}
          >
            {<MdAdd />}
          </button>
          {openModal && <CoachModal closeModal={setOpenModal} />}
        {editModal && (
          <UpdateCoach closeEditModal={setEditModal} editData={editData} />
        )}
        </h3>
        <div className="table-batch-list">
          <table className="table batch-list">
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Coach Name</th>
                <th>Phone</th>
                <th>Sport</th>
                <th>Experience(months)</th>
                {/* <th>Verified</th>
                <th>Tier</th>
                <th>Award</th>
                <th>Team Affiliation</th> */}
                <th>locality</th>
                <th>City</th>
                <th>State</th>
                <th>Pincode</th>
                <th>About</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coaches.map((item, index) => {
                return (
                  <tr key={`coach-${item.id}`}>
                    <th>{index + 1}</th>
                    <th>{item.id}</th>
                    <td>{item.name}</td>
                    <th>{item.phone_number}</th>
                    <th>{item.sports_id}</th>
                    {/* <th>
                      {
                        Sports.current.filter(
                          (sport) => sport.id === item.sports_id
                        )[0]["name"]
                      }
                    </th> */}
                    <td>{item.experience}</td>
                    {/* <td>{item.verified}</td>
                    <td>{item.tier}</td>
                    <td>{item.award}</td>
                    <td>{item.team_affiliation}</td> */}
                    <td>{item.locality}</td>
                    <td>{item.city}</td>
                    <td>{item.state}</td>
                    <td>{item.pincode}</td>
                    <td>{item.about}</td>
                    <td>
                    <b style={{ fontSize: '40px', verticalAlign: 'middle', color: item.status === 'active' ? 'green' : 'red', }} >•</b>
                    <select value={item.status} onChange={(e) => { updateCoachStatus(item.id, e.target.value) }}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </td>
                    <td>
                      <button
                        onClick={() => {
                            setEditModal(true);
                            setEditData(item);
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
  };
  
export default Coaches;

