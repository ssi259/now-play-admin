import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateSport = ({ closeEditModal, editData }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(editData);
    console.log("data--> ", data);
  }, [editData]);
  const handle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://3.111.147.217:3000/sports/${data.id}`, data)
      .then((res) => {
        alert("Sport Updated Successfully");
      })
      .catch((err) => {
        alert("Error in Updating Sport");
      });
    closeEditModal(false);
  };
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              closeEditModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Update Sport</h1>
        </div>

        <form>
          <div class="form-group row">
            <label for="sportName" class="col-sm-2 label">
              Name
            </label>
            <div class="col-sm-10">
              <input
                onChange={(e) => handle(e)}
                id="name"
                class="form-control"
                value={data.name}
                name="name"
                placeholder="sport Name"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="sportType" class="col-sm-2 label">
              Type
            </label>
            <div class="col-sm-10">
              <input
                value={data.type}
                onChange={(e) => handle(e)}
                name="type"
                class="form-control"
                id="type"
                placeholder="sport Type"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="aboutSport" class="col-sm-2 label">
              About
            </label>
            <div class="col-sm-10">
              <textarea
                onChange={(e) => handle(e)}
                name="about"
                value={data.about}
                class="form-control"
                id="sportType"
                placeholder="About Sport"
              />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-10">
              <button
                type="submit"
                class="btn btn-primary"
                onClick={(e) => submit(e)}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSport;
