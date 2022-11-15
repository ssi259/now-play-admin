import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import ArenaModal from "./modals/ArenaModal";
import UpdateArena from "./modals/UpdateArena";

function Arenas() {
  const [arenas, setArenas] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [updateOpenModal, setUpdateOpenModal] = useState(false);
  const [selectedArena, setSelectedArena] = useState({});
  useEffect(() => {
    getBatchDetails();
  }, [openModal, updateOpenModal]);
  const getBatchDetails = async () => {
    if (!openModal) {
      let Arenas = await fetch("http://3.111.147.217:3000/arenas");
      Arenas = await Arenas.json();
      setArenas(Arenas);
    }
  };
  console.log("Arenas", arenas);
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
