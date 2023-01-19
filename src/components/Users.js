import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [Users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    await fetch(`${process.env.REACT_APP_API_PATH}/users/all?type=admin`)
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.data);
      });
      console.log(Users)
  };

  const updateUserStatus = async (id, status) => {
    console.log(id, status);
    axios
      .put(`${process.env.REACT_APP_API_PATH}/users/${id}`, {
        status: status,
      })
      .then((res) => {
        alert(res.data.message);
        getUsers();
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="batch-list">
      <h3 className="batch-heading">Users</h3>
      <div class="table-batch-list">
        <table className="table batch-list">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Phone Verified</th>
              <th>Email Verified</th>
              <th>Gender</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Users.map((item, index) => {
              return (
                <tr>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.isPhoneVerified ? "Yes" : "No"}</td>
                  <td>{item.isEmailVerified ? "Yes" : "No"}</td>
                  <td>{item.gender}</td>
                  <td>
                    <b
                      style={{
                        fontSize: "40px",
                        verticalAlign: "middle",
                        color: item.status === "active" ? "green" : "red",
                      }}
                    >
                      •
                    </b>
                    <select
                      value={item.status}
                      onChange={(e) => {
                        updateUserStatus(item.id, e.target.value);
                      }}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
