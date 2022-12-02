import axios from "axios";
import React, { useState, useEffect } from "react";

const UpdatePlan = ({ closeEditModal, editData }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(editData);
    }, [editData]);
    const handle = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const submit = async (e) => {
        e.preventDefault();
        await axios
            .put(`http://3.111.147.217:3000/plans/${editData.id}`, data)
            .then((res) => {
                alert("Coach Updated Successfully");
            })
            .catch((err) => {
                alert("Error in Updating Coach");
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
                    <h1>Update Plan</h1>
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
                                    value={data.plan_name}
                                    name="name"
                                    placeholder="Plan Name"
                                />
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
