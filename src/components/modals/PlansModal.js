import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

const PlansModal = ({ closeModal }) => {
  const [data, setData] = useState([]);
  const [batches, setBatches] = useState([]);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function handle(e) {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  }
  useEffect(() => {
    getBatchesDetails();
  }, []);

  const getBatchesDetails = async () => {
    let batches = await fetch(
      `${process.env.REACT_APP_API_PATH}/batches/search?lat=28.21&&lng=78.12`
    );
    batches = await batches.json();
    for (var i = 0; i < batches.batchList.length; i++) {
      var batch_days_in_week = [];
      if (batches.batchList[i]["days"]) {
        var batch_days = "";
        var resp_batch_days = batches.batchList[i]["days"]
          .replace(/[\[\]']+/g, "")
          .split(",");
        for (var day = 0; day < resp_batch_days.length; day++) {
          if (resp_batch_days[day] == 1) {
            batch_days = batch_days + "," + weekdays[day];
          }
        }
        batch_days_in_week.push(batch_days.substring(1, batch_days.length));
      }
      batches.batchList[i]["days"] = batch_days_in_week;
    }
    setBatches(batches.batchList);
  };

  async function submit(e) {
    e.preventDefault();
    await Axios.post(`${process.env.REACT_APP_API_PATH}/plans`, {
      batch_id: data.batch_id,
      plan_name: data.plan_name,
      description: data.description,
      price: data.price,
      status: data.status,
      tag: data.tag,
      type: data.type,
      duration: data.duration,
    }).then((res) => {
      alert("Plan Added Successfully");
    });
    {
      closeModal(false);
    }
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
          <h1>Create a new Plan</h1>
        </div>

        <form>
          <div className="overlay">
            <div
              class="form-group row">
              <label for="batch-id" class="col-sm-2 label">
                Batch ID
              </label>
              <div class="col-sm-10">
                <select
                  onChange={(e) => handle(e)}
                  id="batch-id"
                  class="form-control"
                  value={data.batch_id}
                  name="batch_id"
                  placeholder="Batch ID"
                >
                  <option class="form-control" name= "batch_id"> -- Select a Batch -- </option>
                  {batches.map((batch) => {
                    return <option value={batch.id}>{batch.id}</option>;
                  })}
                </select>
              </div>
            </div>

            <div
              class="form-group row">
              <label for="Plan-name" class="col-sm-2 label">
                Plan Name
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(e) => handle(e)}
                  id="name"
                  class="form-control"
                  value={data.name}
                  name="plan_name"
                  placeholder="Plan Name"
                />
              </div>
            </div>
            <div
              class="form-group row">
              <label for="description" class="col-sm-2 label">
                Description
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(e) => handle(e)}
                  id="description"
                  class="form-control"
                  value={data.description}
                  name="description"
                  placeholder="Description"
                />
              </div>
            </div>
            <div
              class="form-group row">
              <label for="status" class="col-sm-2 label">
                Status
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(e) => handle(e)}
                  id="status"
                  class="form-control"
                  value={data.status}
                  name="status"
                  placeholder="Status"
                />
              </div>
            </div>
            <div
              class="form-group row">
              <label for="price" class="col-sm-2 label">
                Price
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(e) => handle(e)}
                  id="price"
                  class="form-control"
                  value={data.price}
                  name="price"
                  placeholder="Price"
                />
              </div>
            </div>
            <div
              class="form-group row">
              <label for="duration" class="col-sm-2 label">
                Duration
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(e) => handle(e)}
                  id="duration"
                  class="form-control"
                  value={data.duration}
                  name="duration"
                  placeholder="Duration"
                />
              </div>
            </div>
            <div
              class="form-group row">
              <label for="tag" class="col-sm-2 label">
                Tag
              </label>
              <div class="col-sm-10">
                <input
                  onChange={(e) => handle(e)}
                  id="tag"
                  class="form-control"
                  value={data.tag}
                  name="tag"
                  placeholder="Tag"
                />
              </div>
            </div>
            <div
              class="form-group row">
              <label for="type" class="col-sm-2 label">
                Type
              </label>
              <div class="col-sm-10">
                <select
                  onChange={(e) => handle(e)}
                  id="type"
                  class="form-control"
                  value={data.type}
                  name="type"
                  placeholder="Type">
                  <option class="form-control" name= "type"> -- Select a Type -- </option>
                  <option value="demo">Demo</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                  <option value="private_session">Private Session</option>
                  <option value="half_yearly">Half Yearly</option>
                  </select>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-10">
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={(e) => submit(e)}>
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

export default PlansModal;
