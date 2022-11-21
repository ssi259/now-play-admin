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
<<<<<<< HEAD
    let sports = await fetch(`${process.env.REACT_APP_API_PATH}/sports`);
=======
    let sports = await fetch("http://3.111.147.217:3000/sports");
>>>>>>> a5e9955 (Implemented Coach update form (#19))
    sports = await sports.json();
    setSports(sports);
  };
  const handle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();
    await axios
<<<<<<< HEAD
      .put(`${process.env.REACT_APP_API_PATH}/coach/${editData.id}`, data)
=======
      .put(`http://3.111.147.217:3000/coach/${editData.id}`, data)
>>>>>>> a5e9955 (Implemented Coach update form (#19))
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
<<<<<<< HEAD
                  name="phone_number"
=======
                  name="phone"
>>>>>>> a5e9955 (Implemented Coach update form (#19))
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
<<<<<<< HEAD
                  value={data.experience}
=======
>>>>>>> a5e9955 (Implemented Coach update form (#19))
                  id="experience"
                  placeholder="Experience in months"
                />
              </div>
            </div>
<<<<<<< HEAD
            {/* <div class="form-group row">
              <label for="coach-verified" class="col-sm-2 label">
                Verified
              </label>
              <div class="col-sm-10">
                <input value={data.verified} type="checkbox" name="verified" />
              </div>
            </div>
            <div class="form-group row">
              <label for="coach-tier" class="col-sm-2 label">
                Tier
              </label>
              <div class="col-sm-10">
                <input
                  class="form-control"
                  name="tier"
                  value={data.tier}
                  onChange={(e) => handle(e)}
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="coach-awards" class="col-sm-2 label">
                Awards
              </label>
              <div class="col-sm-10">
                <input
                  class="form-control"
                  name="awards"
                  value={data.awards}
                  onChange={(e) => handle(e)}
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="coach-team_affiliations" class="col-sm-2 label">
                Team Affiliations
              </label>
              <div class="col-sm-10">
                <input
                  class="form-control" 
                  name="team_affiliations"
                  value={data.team_affiliations}
                  onChange={(e) => handle(e)}
                />
              </div>
            </div> */}
            <div class="form-group row">
              <label for="coach-about" class="col-sm-2 label">
=======
            <div class="form-group row">
              <label for="about-coach" class="col-sm-2 label">
>>>>>>> a5e9955 (Implemented Coach update form (#19))
                About
              </label>
              <div class="col-sm-10">
                <textarea
<<<<<<< HEAD
                  class="form-control"
                  name="about"
                  value={data.about}
                  onChange={(e) => handle(e)}
=======
                  onChange={(e) => handle(e)}
                  name="about"
                  class="form-control"
                  id="about-coach"
                  placeholder="About Coach"
>>>>>>> a5e9955 (Implemented Coach update form (#19))
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
<<<<<<< HEAD
                  value={data.locality}
=======
>>>>>>> a5e9955 (Implemented Coach update form (#19))
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
<<<<<<< HEAD
                  value={data.city}
=======
>>>>>>> a5e9955 (Implemented Coach update form (#19))
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
<<<<<<< HEAD
                  value={data.pincode}
=======
>>>>>>> a5e9955 (Implemented Coach update form (#19))
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
