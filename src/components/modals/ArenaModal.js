import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
const ArenaModal = ({ closeModal }) => {
  const [data, setData] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(()=>{

},[formErrors])

  function handle(e) {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  }

  async function submit(e) {
    e.preventDefault();
    // await setFormErrors(validate(data));
    //     setIsSubmit(true);
    //     if (Object.keys(formErrors).length === 0 && isSubmit) {
    await Axios.post(`${process.env.REACT_APP_API_PATH}/arenas`, {
      name: data.name,
      phone_number: data.phone_number,
      email: data.email,
      lat: data.lat,
      lng: data.lng,
      city: data.city,
      locality: data.locality,
      state: data.state,
    }).then((res) => {
      console.log(res.data);
    });
    {
      closeModal(false);
    }
  }
  // }
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.sports_id) {
      errors.sports_id = "Sports is required!";
    }
    if (!values.name) {
      errors.name = "Arena Name is required!";
    }
    if (!values.email) {
        errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
        errors.email = "This is not a valid email format!";
    }
    if (!values.phone_number) {
        errors.phone_number = "Phone Number is required!";
    }
    if (!values.lat) {
        errors.lat = "Latitude is required!";
    }
    if (!values.lng) {
        errors.lng = "longitude is required!";
    }
    if (!values.state) {
        errors.state = "State is required!";
    }
    if (!values.locality) {
        errors.locality = "Locality is required!";
    }
    if (!values.city) {
      errors.city = "City is required!";
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
              closeModal(false);
            }}
          >
            X
          </button>
        </div>
        <div>
          <h1>Create Arena</h1>
        </div>

        <form>
          <div className="overlay">
            <div class="form-group row">
              <label for="Arena-name" class="col-sm-2 label">
                Name
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(e) => handle(e)}
                  id="name"
                  class="form-control"
                  value={data.name}
                  name="name"
                  placeholder="Arena Name"
                />
                <span>{formErrors.name}</span>
              </div>
            </div>
            <div class="form-group row">
              <label for="Arena-email" class="col-sm-2 label">
                Email
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(e) => handle(e)}
                  id="email"
                  class="form-control"
                  value={data.email}
                  name="email"
                  placeholder="Arena Email"
                />
                <span>{formErrors.email}</span>
              </div>
            </div>
            <div class="form-group row">
              <label for="Arena-phn" class="col-sm-2 label">
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
            <div
              class="form-group
                        row"
            >
              <label for="latitude" class="col-sm-2 label">
                Latitude
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(e) => handle(e)}
                  id="lat"
                  class="form-control"
                  value={data.lat}
                  name="lat"
                  placeholder="Latitude"
                />
                <span>{formErrors.lat}</span>
              </div>
            </div>
            <div class="form-group row">
              <label for="longitude" class="col-sm-2 label">
                Longitude
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(e) => handle(e)}
                  id="long"
                  class="form-control"
                  value={data.lng}
                  name="lng"
                  placeholder="Longitude"
                />
                <span>{formErrors.lng}</span>
              </div>
            </div>
            <div class="form-group row">
              <label for="city" class="col-sm-2 label">
                City
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(e) => handle(e)}
                  id="city"
                  class="form-control"
                  value={data.city}
                  name="city"
                  placeholder="City"
                />
                <span>{formErrors.city}</span>
              </div>
            </div>
            <div
              class="form-group
                        row"
            >
              <label for="locality" class="col-sm-2 label">
                Locality
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(e) => handle(e)}
                  id="locality"
                  class="form-control"
                  value={data.locality}
                  name="locality"
                  placeholder="Locality"
                />
                <span>{formErrors.locality}</span>
              </div>
            </div>
            <div
              class="form-group
                        row"
            >
              <label for="state" class="col-sm-2 label">
                State
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(e) => handle(e)}
                  id="state"
                  class="form-control"
                  value={data.state}
                  name="state"
                  placeholder="State"
                />
                <span>{formErrors.state}</span>
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
export default ArenaModal;
