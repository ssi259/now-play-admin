import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import { MdAdd } from "react-icons/md";

import CoachModal from "./modals/CoachModal";

function Coaches() {
  const [coaches, setCoaches] = useState([]);
  const Sports = useRef([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getCoachDetails();
    getSportsDetails();
  }, [openModal]);
  const getCoachDetails = async () => {
    if (!openModal) {
      let coaches = await fetch("http://3.111.147.217:3000/coach");
      coaches = await coaches.json();
      setCoaches(coaches.data);
    }
  };

  const getSportsDetails = async () => {
    let sports = await fetch("http://3.111.147.217:3000/sports");
    sports = await sports.json();
    Sports.current = sports;
  };
  console.log("coaches", coaches);
  console.log("Sports", Sports);
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
                        alert("Edit Coach");
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
export default Coaches;

