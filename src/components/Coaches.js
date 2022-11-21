import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import UpdateCoach from "./modals/UpdateCoach";
import CoachModal from "./modals/CoachModal";

function Coaches() {
  const [coaches, setCoaches] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  const Sports = useRef([]);

  useEffect(() => {
    getCoachDetails();
    getSportsDetails();
  }, [openModal, editModal]);

  const getCoachDetails = async () => {
    if (!openModal) {
      let coaches = await fetch("http://3.111.147.217:3000/coach");
      coaches = await coaches.json();
      setCoaches(coaches.data);
    }
}

    const getSportsDetails = async () => {
      let sports = await fetch("http://3.111.147.217:3000/sports");
      sports = await sports.json();
      Sports.current = sports;
    };

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
                    <td>
                      {
                        Sports.current.filter(
                          (sport) => sport.id === item.sports_id
                        )[0]["name"]
                      }
                    </td>
                    <td>{item.experience}</td>
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

