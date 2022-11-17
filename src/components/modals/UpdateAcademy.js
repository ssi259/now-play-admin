import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

const UpdateAcademy = ({ closeModal, editData }) => {
  const [data, setData] = useState([]);
  const [sports, setSports] = useState([]);
  useEffect(() => {
    setData(editData);
    getSportsDetails();
  }, [editData]);
  const getSportsDetails = async () => {
    let sports = await fetch("http://3.111.147.217:3000/sports");
    sports = await sports.json();
    setSports(sports);
  };
  const handle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();
    await axios.put(`http://3.111.147.217:3000/academies/${data.id}`, data);
    closeModal(false);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              closeModal(false);
            }}
          >
            X
          </button>
        </div>
        <div>
          <h1>Update Academy</h1>
        </div>

        <form>
          <div className="overlay">
            <div class="form-group row">
              <label for="coach-name" class="col-sm-2 label">
                Name
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(e) => handle(e)}
                  id="name"
                  class="form-control"
                  value={data.name}
                  name="name"
                  placeholder="Academy Name"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="coach-email" class="col-sm-2 label">
                Email
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(e) => handle(e)}
                  id="email"
                  class="form-control"
                  value={data.email}
                  name="email"
                  placeholder="Academy Email"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="coach-phn" class="col-sm-2 label">
                Phone
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(e) => handle(e)}
                  id="phone"
                  class="form-control"
                  value={data.phone_number}
                  name="phone_number"
                  placeholder="Phone Number"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="coach-name" class="col-sm-2 label">
                Sport
              </label>
              <div class="col-sm-10">
                <select
                  class="form-control"
                  name="sport_id"
                  onChange={(e) => handle(e)}
                  value={data.sports_id}
                >
                  <option class="form-control" name="sport_id">
                    {" "}
                    -- Select a sport --{" "}
                  </option>
                  {sports.map((sport) => (
                    <option
                      class="form-control"
                      value={sport.id}
                      name="sport_id"
                    >
                      {sport.name}
                    </option>
                  ))}
                </select>
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAcademy;
