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
  }, []);
  const getBatchDetails = async () => {
    if (!openModal) {
      let Arenas = await fetch("http://3.111.147.217:3000/arenas");
      Arenas = await Arenas.json();
      setArenas(Arenas);
    }
  };
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
              <th>Coach Name</th>
              <th>Sport</th>
              <th>Experience</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {arenas.map((item, index) => {
              return (
                <tr key={item.id}>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.sports_id}</td>
                  <td>{item.experience}</td>
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
