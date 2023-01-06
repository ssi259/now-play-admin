import axios from "axios";
import React, { useState, useEffect } from "react";
import TagsInput from "../TagsInput"

const UpdateCoach = ({ closeEditModal, editData }) => {
  const [data, setData] = useState(editData);
  const [sports, setSports] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const[Awards,setAwards] = useState(editData.awards);
  const[teamAffiliations,setTeamAffiliations] = useState(editData.team_affiliations);
  useEffect(() => {
    getSportsDetails();
  }, [formErrors, ]);
  const getSportsDetails = async () => {
    let sports = await fetch(`${process.env.REACT_APP_API_PATH}/sports`);
    sports = await sports.json();
    setSports(sports);
  };
  const handle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();
    await setFormErrors(validate(data));
    setIsSubmit(true);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
    await axios
      .put(`${process.env.REACT_APP_API_PATH}/coach/${editData.id}`, {
        sports_id:data.sports_id,
        name: data.name,
        phone_number: data.phone_number,
        about: data.about,
        experience: data.experience,
        email: data.email,
        city: data.city,
        state: data.state,
        locality: data.locality,
        pincode: data.pincode,
        awards: Awards,
        team_affiliations: teamAffiliations
    })
      .then((res) => {
        alert("Coach Updated Successfully");
      });
    {
      closeEditModal(false);
    }
  }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const name_regex =  /^[a-z ,.'-]+$/i;
    if (!values.sports_id) {
      errors.sports_id = "Sports is required!";
    }
    if (!values.name) {
      errors.name = "Name is required!";
    } else if (!name_regex.test(values.name)) {
        errors.name = "This is not a valid character !";
    }
    if (!values.email) {
        errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
        errors.email = "This is not a valid email format!";
    }
    if (!values.phone_number) {
        errors.phone_number = "Phone Number is required!";
    }
    if (!values.experience) {
        errors.experience = "Experience is required!";
    }
    if (!values.city) {
        errors.city = "City is required!";
    }
    if (!values.state) {
        errors.state = "State is required!";
    }
    if (!values.locality) {
        errors.locality = "Locality is required!";
    }
    if (!values.pincode) {
        errors.pincode = "Pincode is required!";
    }
    return errors;
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
                <span>{formErrors.name}</span>
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
                <span>{formErrors.email}</span>
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
                <span>{formErrors.phone_number}</span>
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
                <span>{formErrors.sports_id}</span>
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
                <span>{formErrors.experience}</span>
              </div>
            </div>
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
                About
              </label>
              <div class="col-sm-10">
                <textarea
                  class="form-control"
                  name="about"
                  value={data.about}
                  onChange={(e) => handle(e)}
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
                  value={data.locality}
                  placeholder="Locality"
                />
                <span>{formErrors.locality}</span>
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
                  value={data.city}
                  placeholder="city"
                />
                <span>{formErrors.city}</span>
              </div>
            </div>
            <div class="form-group row">
              <label for="city" class="col-sm-2 label">
                State
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(e) => handle(e)}
                  name="state"
                  class="form-control"
                  id="state"
                  value={data.state}
                  placeholder="city"
                />
                <span>{formErrors.state}</span>
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
                  value={data.pincode}
                  placeholder="pincode"
                />
                <span>{formErrors.pincode}</span>
              </div>
            </div>
            <TagsInput selectedTags={setAwards}  tags={Awards? Awards : []} text_placeholder = {"Add Awards (Press comma to add)"}/>
            <TagsInput selectedTags={setTeamAffiliations} tags={teamAffiliations? teamAffiliations: []} text_placeholder = {"Add Team Affiliations (Press comma to add)"}/>

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
