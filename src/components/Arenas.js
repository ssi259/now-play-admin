import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import ArenaModal from "./modals/ArenaModal";
import UpdateArena from "./modals/UpdateArena";
import axios from "axios";

function Arenas() {
  const [arenas, setArenas] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [updateOpenModal, setUpdateOpenModal] = useState(false);
  const [selectedArena, setSelectedArena] = useState({});
  useEffect(() => {
    getArenaDetails();
  }, [openModal, updateOpenModal]);
  const getArenaDetails = async () => {
    if (!openModal) {
      let Arenas = await fetch("http://localhost:3000/arenas");
      Arenas = await Arenas.json();
      setArenas(Arenas);
    }
  };
  const updateArenaStatus = async (id, status) => {
    console.log(id, status);
    axios.put(`http://localhost:3000/arenas/${id}`, {
      status: status
    })
      .then(res => {
        alert(res.data.message);
        getArenaDetails();
      })
      .catch(err => {
        alert(err);
      })
  }
  return (
    <div className="batch-list">
      <h3 className="batch-heading">
        Arenas{" "}
        <button
          onClick={() => {
            setOpenModal(true);
          }}
        >
          {<MdAdd />}
        </button>
        {openModal && <ArenaModal closeModal={setOpenModal} />}
        {updateOpenModal && (
          <UpdateArena
            closeModal={setUpdateOpenModal}
            ArenaItem={selectedArena}
          />
        )}
      </h3>
      <div class="table-batch-list">
        <table className="table batch-list">
          <thead>
            <tr>
              <th>#</th>
              <th>Arena Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>City</th>
              <th>Locality</th>
              <th>State</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {arenas.map((item, index) => {
              return (
                <tr key={item.id}>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.phone_number}</td>
                  <td>{item.email}</td>
                  <td>{item.city}</td>
                  <td>{item.locality}</td>
                  <td>{item.state}</td>
                  <td>{item.lat}</td>
                  <td>{item.lng}</td>
                  <td>
                    <b style={{ fontSize: '40px', verticalAlign: 'middle', color: item.status === 'Active' ? 'green' : 'red', }} >•</b>
                      <select value={item.status} onChange={(e) => updateArenaStatus(item.id, e.target.value)}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setUpdateOpenModal(true), setSelectedArena(item);
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
export default Arenas;
