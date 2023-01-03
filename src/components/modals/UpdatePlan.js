import axios from "axios";
import React, { useState, useEffect } from "react";

const UpdatePlan = ({ closeEditModal, editData }) => {
    const [data, setData] = useState(editData);
    const [batches, setBatches] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const weekdays = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

    useEffect(() => {
        getBatchesDetails();
    }, [formErrors, editData]);
    const handle = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const submit = async (e) => {
        e.preventDefault();
        await setFormErrors(validate(data));
        setIsSubmit(true);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
        await axios
            .put(`${process.env.REACT_APP_API_PATH}/plans/${editData.id}`, data)
            .then((res) => {
                alert("Coach Updated Successfully");
            })
            .catch((err) => {
                alert("Error in Updating Coach");
            });
        {
            closeEditModal(false);
        }
    }
    };
    const getBatchesDetails = async () => {
        let batches = await fetch(
            "${process.env.REACT_APP_API_PATH}/batches/search?lat=28.21&&lng=78.12&&type=admin"
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
    const validate = (values) => {
        const errors = {};
        if (!values.batch_id) {
          errors.batch_id = "Batch is required!";
        }
        if (!values.name) {
          errors.name = "Plan Name is required!";
        }
        if (!values.description) {
            errors.description = "description is required!";
        }
        if (!values.status) {
            errors.status = "Status is required!";
        }
        if (!values.price) {
            errors.price = "Price is required!";
        }
        if (!values.duration) {
            errors.duration = "Duration is required!";
        }
        if (!values.tag) {
            errors.tag = "tag is required!";
        }
        if (!values.type) {
            errors.type = "type is required!";
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
                    <h1>Update Plan</h1>
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
                                    <option class="form-control" name="batch_id"> -- Select a Batch -- </option>
                                    {batches.map((batch) => {
                                        return <option value={batch.id}>{batch.id}</option>;
                                    })}
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="coach-name" class="col-sm-2 label">
                                Name
                            </label>
                            <div class="col-sm-10">
                                <input
                                    onChange={(e) => handle(e)}
                                    id="name"
                                    class="form-control"
                                    value={data.plan_name}
                                    name="name"
                                    placeholder="Plan Name"
                                />
                                <span>{formErrors.name}</span>
                            </div>
                        </div>
                        <div class="form-group row"> 
                            <label for="coach-name" class="col-sm-2 label">
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
                                <span>{formErrors.description}</span>
                            </div>
                        </div>
                        <div class="form-group
                            row">
                            <label for="coach-name" class="col-sm-2 label">
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
                                <span>{formErrors.status}</span>
                            </div>
                        </div>
                        <div class="form-group
                            row">
                            <label for="coach-name" class="col-sm-2 label">
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
                                <span>{formErrors.price}</span>
                            </div>
                        </div>
                        <div class="form-group
                            row">
                            <label for="coach-tag" class="col-sm-2 label">
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
                                <span>{formErrors.tag}</span>
                            </div>
                        </div>
                        <div class="form-group
                            row">
                            <label for="coach-type" class="col-sm-2 label">
                                Type
                            </label>
                            <div class="col-sm-10">
                                <input
                                    onChange={(e) => handle(e)}
                                    id="type"
                                    class="form-control"
                                    value={data.type}
                                    name="type"
                                    placeholder="Type"
                                />
                                <span>{formErrors.type}</span>
                            </div>
                        </div>
                        <div class="form-group
                            row">
                            <label for="coach-name" class="col-sm-2 label">
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
                                <span>{formErrors.duration}</span>
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

export default UpdatePlan;
