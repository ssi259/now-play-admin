import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";

const BatchesModal = ({ closeModal }) => {
  const [Sports, setSports] = useState([]); //state to bring in FK sports_id
  const [Arenas, setArenas] = useState([]); //state to bring in FK arena_id
  const [Coaches, setCoaches] = useState([]); //state to bring in FK coach_id
  const [Academies, setAcademies] = useState([]); //state to bring in FK academies_id

  const [data, setData] = useState({}); // state to store form data

  const [bannerImg, setBannerImg] = useState(null);
  const [thumbnailImg, setThumbnailImg] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const daysOfWeek = useRef(null);

  function onChangeCheckbox(e) {
    var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    let array = [0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].value === "mon") {
        array[0] = 1;
      } else if (checkboxes[i].value === "tue") {
        array[1] = 1;
      } else if (checkboxes[i].value === "wed") {
        array[2] = 1;
      } else if (checkboxes[i].value === "thu") {
        array[3] = 1;
      } else if (checkboxes[i].value === "fri") {
        array[4] = 1;
      } else if (checkboxes[i].value === "sat") {
        array[5] = 1;
      } else if (checkboxes[i].value === "sun") {
        array[6] = 1;
      }
    }

    daysOfWeek.current = array;
  }

  useEffect(() => {
    getAcademyDetails();
    getSportsDetails();
    getArenaDetails();
    getCoachDetails();
  }, [formErrors]);

  // Get all sports Details
  const getSportsDetails = async () => {
    let sports = await fetch(`${process.env.REACT_APP_API_PATH}/sports`);
    sports = await sports.json();

    setSports(sports);
  };

  //Get all coach details
  const getCoachDetails = async () => {
    let coaches = await fetch(`${process.env.REACT_APP_API_PATH}/coach`);
    coaches = await coaches.json();
    setCoaches(coaches.data);
  };
  // Get all arena details
  const getArenaDetails = async () => {
    let arenas = await fetch(`${process.env.REACT_APP_API_PATH}/arenas`);
    arenas = await arenas.json();
    setArenas(arenas);
  };

  //get academy Details
  const getAcademyDetails = async () => {
    let academies = await fetch(`${process.env.REACT_APP_API_PATH}/academies`);
    academies = await academies.json();

    setAcademies(academies);
  };

  // update the data object
  function handle(e) {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  }

  // post request for batchest to create new batch
  async function submit(e) {
    e.preventDefault();
    onChangeCheckbox();
    // await setFormErrors(validate(data));
    // setIsSubmit(true);
    // if (Object.keys(formErrors).length === 0 && isSubmit) {

    const formData = new FormData();

    const bodyData = JSON.stringify({
      sports_id: data.sport_id,
      arena_id: data.arena_id,
      academy_id: data.academy_id,
      coach_id: data.coach_id,
      start_time: data.start_time,
      end_time: data.end_time,
      start_date: data.start_date,
      end_date: data.end_date,
      price: data.price,
      days: daysOfWeek.current,
    });

    formData.append("banner_img", bannerImg, bannerImg.name);
    formData.append("thumbnail_img", thumbnailImg, thumbnailImg.name);

    formData.append("data", bodyData);

    await Axios.post(`${process.env.REACT_APP_API_PATH}/batches`, formData).then(
      (res) => {
        console.log(res.data);
      }
    );

    closeModal(false);
    // }
  }

  const validate = (values) => {
    const errors = {};
    if (!thumbnailImg) {
      errors.thumbnailImg = "Thumbnail Image is required!";
    }
    if (!bannerImg) {
      errors.bannerImg = "Banner Image is required!";
    }
    if (!values.sport_id) {
        errors.sport_id = "Sports is required!";
    }
    if (!values.arena_id) {
        errors.arena_id = "Arena is required!";
    }
    if (!values.coach_id)  {
        errors.coach_id = "Coach is required!";
    }
    if (!values.academy_id) {
        errors.academy_id = "Academy is required!";
    }
    if (!values.start_date) {
        errors.start_date = "Start Date is required!";
    }
    if (!values.end_date) {
        errors.end_date = "End Date is required!";
    }
    if (!values.start_time) {
        errors.start_time = "Start Time is required!";
    }
    if (!values.end_time) {
      errors.end_time = "End Time is required!";
  } 
  if (daysOfWeek.current == [0, 0, 0, 0, 0, 0, 0]) {
    errors.weeks = "Please select days!";
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
          <h3>Add Batch</h3>
        </div>

        <form>
          <div className="overlay">
            <div>
              <input
                style={{ visibility: "hidden" }}
                className="col-sm-2 label"
                type="file"
                name="thumbnail_img"
                id="thumbnail_img"
                onChange={(e) => setThumbnailImg(e.target.files[0])}
              />
              <label
                style={{ border: "1px solid" }}
                htmlFor="thumbnail_img"
                className="col-sm-2 label"
              >
                Select thumbnail
              </label>
              <label style={{ color: "green" }} className="col-sm-2 label">
                {thumbnailImg && thumbnailImg.name}
                <span>{formErrors.thumbnailImg}</span>
              </label>
              <input
                style={{ visibility: "hidden" }}
                className="col-sm-2 label"
                type="file"
                name="banner_img"
                id="banner_img"
                onChange={(e) => setBannerImg(e.target.files[0])}
              />
              <label
                style={{ border: "1px solid" }}
                htmlFor="banner_img"
                className="col-sm-2 label"
              >
                Select Banner
              </label>
              <label style={{ color: "green" }} className="col-sm-2 label">
                {bannerImg && bannerImg.name}
                <span>{formErrors.bannerImg}</span>
              </label>
            </div>
            <div className="form-group row">
              <label htmlFor="coach-name" className="col-sm-2 label">
                Sport
              </label>
              <div className="col-sm-10">
                <select
                  className="form-control"
                  name="sport_id"
                  onChange={(e) => handle(e)}
                >
                  <option className="form-control" value={null} name="sport_id">
                    {" "}
                    -- Select a sport --{" "}
                  </option>
                  {Sports.map((sport) => (
                    <option
                      className="form-control"
                      value={sport.id}
                      key={`sport-${sport.id}`}
                      name="sport_id"
                    >
                      {sport.name}
                    </option>
                  ))}
                </select>
                <span>{formErrors.sport_id}</span>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="coach-name" className="col-sm-2 label">
                Arena
              </label>
              <div className="col-sm-10">
                <select
                  className="form-control"
                  name="arena_id"
                  onChange={(e) => handle(e)}
                >
                  <option className="form-control" value={null} name="arena_id">
                    {" "}
                    -- Select a arena --{" "}
                  </option>
                  {Arenas.map((arena) => (
                    <option
                      className="form-control"
                      value={arena.id}
                      key={`arena-${arena.id}`}
                      name="arena_id"
                    >
                      {arena.name}
                    </option>
                  ))}
                </select>
                <span>{formErrors.arena_id}</span>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="coach-name" className="col-sm-2 label">
                Coach
              </label>
              <div className="col-sm-10">
                <select
                  className="form-control"
                  name="coach_id"
                  onChange={(e) => handle(e)}
                >
                  <option className="form-control" value={null} name="coach_id">
                    {" "}
                    -- Select a coach --{" "}
                  </option>
                  {Coaches.map((coach) => (
                    <option
                      className="form-control"
                      value={coach.id}
                      key={`coach-${coach.id}`}
                      name="coach_id"
                    >
                      {`${coach.name} (${Sports.filter((sport) => (sport.id === coach.sports_id))[0].name})`}
                    </option>
                  ))}
                </select>
                <span>{formErrors.coach_id}</span>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="academy-name" className="col-sm-2 label">
                Academy
              </label>
              <div className="col-sm-10">
                <select
                  className="form-control"
                  name="academy_id"
                  onChange={(e) => handle(e)}
                >
                  <option className="form-control" value={null} name="academy_id">
                    {" "}
                    -- Select a Academy --{" "}
                  </option>
                  {Academies.map((academy) => (
                    <option
                      className="form-control"
                      value={academy.id}
                      key={`academy-${academy.id}`}
                      name="academy_id"
                    >
                      {academy.name}
                    </option>
                  ))}
                </select>
                <span>{formErrors.academy_id}</span>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="coach-name" className="col-sm-2 label">
                Price
              </label>
              <div className="col-sm-6">
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  onChange={(e) => handle(e)}
                />
                <span>{formErrors.price}</span>
              </div>
            </div>

            <div className="custom-flex">
              <label htmlFor="coach-name" className="col-sm-2">
                Timings
              </label>
              <div className="input-group">
                <input
                  type="time"
                  id="start_time_id"
                  className="form-control"
                  name="start_time"
                  onChange={(e) => handle(e)}
                  required
                />
                <span>{formErrors.start_time}</span>
                <label className="col-sm-2">to</label>
                <input
                  type="time"
                  id="end_time_id"
                  className="form-control"
                  name="end_time"
                  onChange={(e) => handle(e)}
                  required
                />
                <span>{formErrors.end_time}</span>
              </div>
            </div>

            <div className="custom-flex mt-4">
              <label htmlFor="coach-name" className="col-sm-2">
                Start
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  id="start_date"
                  className="form-control"
                  name="start_date"
                  onChange={(e) => handle(e)}
                  required
                />
                <span>{formErrors.start_date}</span>
              </div>
              <label htmlFor="coach-name" className="col-sm-2">
                End
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  id="end_date"
                  className="form-control"
                  name="end_date"
                  onChange={(e) => handle(e)}
                  required
                />
                <span>{formErrors.end_date}</span>
              </div>
            </div>

            <div className="custom-flex mt-4">
              <label htmlFor="coach-name" className="col-sm-2 ">
                Days
              </label>
              <div className="sm" id="week-selection">
                <input type="checkbox" id="mon" name="mon" value="mon" />
                <label htmlFor="mon"> Mon &nbsp;</label>
                <input type="checkbox" id="tue" name="tue" value="tue" />
                <label htmlFor="tue"> Tue &nbsp;</label>
                <input type="checkbox" id="wed" name="wed" value="wed" />
                <label htmlFor="wed"> Wed &nbsp;</label>
                <input type="checkbox" id="thu" name="thu" value="thu" />
                <label htmlFor="thu"> Thu &nbsp;</label>
                <input type="checkbox" id="fri" name="fri" value="fri" />
                <label htmlFor="fri"> Fri &nbsp;</label>
                <input type="checkbox" id="sat" name="sat" value="sat" />
                <label htmlFor="sat"> Sat &nbsp;</label>
                <input type="checkbox" id="sun" name="sun" value="sun" />
                <label htmlFor="sun"> Sun &nbsp;</label>
              </div>
              <span>{formErrors.weeks}</span>
            </div>

            <div className="form-group row">
              <div className="col-sm-10">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => {
                    submit(e);
                  }}
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

export default BatchesModal;

