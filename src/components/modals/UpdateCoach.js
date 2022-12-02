import axios from "axios";
import React, { useState, useEffect } from "react";

const UpdateCoach = ({ closeEditModal, editData }) => {
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
    await axios
      .put(`http://3.111.147.217:3000/coach/${editData.id}`, data)
      .then((res) => {
        alert("Coach Updated Successfully");
      });
    {
      closeEditModal(false);
    }
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
        <div>
          <h1>Update Coach</h1>
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
                  placeholder="coach Name"
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
                  placeholder="coach Email"
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
                  name="phone"
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
                  value={data.sports_id}
                  onChange={(e) => handle(e)}
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
              <label for="experience" class="col-sm-2 label">
                Exp
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(e) => handle(e)}
                  name="experience"
                  class="form-control"
                  value={data.experience}
                  id="experience"
                  placeholder="Experience in months"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="about-coach" class="col-sm-2 label">
                About
              </label>
              <div class="col-sm-10">
                <textarea
                  onChange={(e) => handle(e)}
                  name="about"
                  class="form-control"
                  id="about-coach"
                  placeholder="About Coach"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="locality" class="col-sm-2 label">
                Locality
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(e) => handle(e)}
                  name="locality"
                  class="form-control"
                  id="locality"
                  placeholder="Locality"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="city" class="col-sm-2 label">
                City
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(e) => handle(e)}
                  name="city"
                  class="form-control"
                  id="city"
                  placeholder="city"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="city" class="col-sm-2 label">
                Pincode
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(e) => handle(e)}
                  name="pincode"
                  class="form-control"
                  id="pincode"
                  placeholder="pincode"
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCoach;
