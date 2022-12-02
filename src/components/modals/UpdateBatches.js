import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";

const UpdateBatches = ({ closeModal, batchData }) => {
  const [Sports, setSports] = useState([]); //state to bring in FK sports_id
  const [Arenas, setArenas] = useState([]); //state to bring in FK arena_id
  const [Coaches, setCoaches] = useState([]); //state to bring in FK coach_id
  const [Academies, setAcademies] = useState([]); //state to bring in FK academies_id

  const [data, setData] = useState({}); // state to store form data

  const [bannerImg, setBannerImg] = useState(null);
  const [thumbnailImg, setThumbnailImg] = useState(null);
  const daysOfWeek = useRef(null);
  const init_arry = useRef([]);
  const start_date = useRef([]);
  const end_date = useRef([]);

  function setISOtotext() {
    start_date.current = batchData.start_date
    end_date.current = batchData.end_date
    start_date.current = start_date.current.substring(0, 10);
    end_date.current = end_date.current.substring(0, 10);
  }

  setISOtotext()

  function onUpdateCheckbox(e) {
    init_arry.current = batchData.days[0].split(",");
    for (var i = 0; i < init_arry.current .length; i++) {
      if (init_arry.current [i] === "Mon") {
        document.getElementById("mon").checked = true;
      } else if (init_arry.current [i] === "Tues") {
        document.getElementById("tue").checked = true;
      } else if (init_arry.current [i] === "Wed") {
        document.getElementById("wed").checked = true;
      } else if (init_arry.current [i] === "Thurs") {
        document.getElementById("thu").checked = true;
      } else if (init_arry.current [i] === "Fri") {
        document.getElementById("fri").checked = true;
      } else if (init_arry.current [i] === "Sat") {
        document.getElementById("sat").checked = true;
      } else if (init_arry.current [i] === "Sun") {
        document.getElementById("sun").checked = true;
      }
    }
  }

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
    setData(batchData);
    onUpdateCheckbox();
    getAcademyDetails();
    getSportsDetails();
    getArenaDetails();
    getCoachDetails();
  }, [closeModal]);

  // Get all sports Details
  const getSportsDetails = async () => {
    let sports = await fetch("http://3.111.147.217:3000/sports");
    sports = await sports.json();
    setSports(sports);
  };

  //Get all coach details
  const getCoachDetails = async () => {
    let coaches = await fetch("http://3.111.147.217:3000/coach");
    coaches = await coaches.json();
    setCoaches(coaches.data);
  };
  // Get all arena details
  const getArenaDetails = async () => {
    let arenas = await fetch("http://3.111.147.217:3000/arenas");
    arenas = await arenas.json();
    setArenas(arenas);
  };

  //get academy Details
  const getAcademyDetails = async () => {
    let academies = await fetch("http://3.111.147.217:3000/academies");
    academies = await academies.json();
    setAcademies(academies);
  };

  // update the data object
  function handle(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  // post request for batchest to create new batch
  async function submit(e) {
    e.preventDefault();
    onChangeCheckbox();


    // const formData = new FormData();

    const bodyData = {
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
    };

    // formData.append("data", bodyData);

    await Axios.put(`http://3.111.147.217:3000/batches/${batchData.id}`, bodyData).then(
      (res) => {
        console.log(res.data);
      }
    );

    closeModal(false);
  }

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
          <h3>Update Batch</h3>
        </div>

        <form>
          <div className="overlay">
            {/* <div>
              <label className="col-sm-2 label">Thumbnail Image</label>
              <input
                className="col-sm-2 label"
                type="file"
                name="thumbnail_img"
                onChange={(e) => setThumbnailImg(e.target.files[0])}
              />
              <label className="col-sm-2 label">Banner Image</label>
              <input
                className="col-sm-2 label"
                type="file"
                name="banner_img"
                onChange={(e) => setBannerImg(e.target.files[0])}
              />
            </div> */}
            <div className="form-group row">
              <label htmlFor="coach-name" className="col-sm-2 label">
                Sport
              </label>
              <div className="col-sm-10">
                <select
                  className="form-control"
                  value={data.sport_id}
                  name="sport_id"
                  onChange={(e) => handle(e)}
                >
                  <option className="form-control" name="sport_id">
                    {" "}
                    {data.sport_name}{" "}
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
                  value={data.arena_id}
                  onChange={(e) => handle(e)}
                >
                  <option className="form-control" name="arena_id">
                    {" "}
                    {data.arena_name}{" "}
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
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="coach-name" className="col-sm-2 label">
                Coach
              </label>
              <div className="col-sm-10">
                <select
                  className="form-control"
                  value={data.coach_id}
                  name="coach_id"
                  onChange={(e) => handle(e)}
                >
                  <option className="form-control" name="coach_id">
                    {" "}
                    {data.coach_name}{" "}
                  </option>
                  {Coaches.map((coach) => (
                    <option
                      className="form-control"
                      value={coach.id}
                      key={`coach-${coach.id}`}
                      name="coach_id"
                    >
                      {coach.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="academy-name" className="col-sm-2 label">
                Academy
              </label>
              <div className="col-sm-10">
                <select
                  className="form-control"
                  value={data.academy_id}
                  name="academy_id"
                  onChange={(e) => handle(e)}
                >
                  <option className="form-control" name="academy_id">
                    {" "}
                    {data.academy_name}{" "}
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
                  value={data.price}
                  name="price"
                  onChange={(e) => handle(e)}
                />
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
                  value={data.start_time}
                  onChange={(e) => handle(e)}
                  required
                />
                <label className="col-sm-2">to</label>
                <input
                  type="time"
                  id="end_time_id"
                  className="form-control"
                  name="end_time"
                  value={data.end_time}
                  onChange={(e) => handle(e)}
                  required
                />
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
                  value={start_date.current}
                  onChange={(e) => handle(e)}
                  required
                />
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
                  value={end_date.current}
                  onChange={(e) => handle(e)}
                  required
                />
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

export default UpdateBatches;

