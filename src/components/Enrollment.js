import React, { useState, useEffect } from 'react'

const Enrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    useEffect(() => {
        getEnrollmentDetails();
    }, []);
    const getEnrollmentDetails = async () => {
            let Enrollments = await fetch(`${process.env.REACT_APP_API_PATH}/enrollments/details`);
            Enrollments = await Enrollments.json();
            setEnrollments(Enrollments.data);
    };
  return (
      <div className="batch-list">
          <h3 className="batch-heading">
              Enrollments{" "}
          </h3>
          <div class="table-batch-list">
              <table className="table batch-list">
                  <thead>
                      <tr>
                          <th>#</th>
                          <th>Player Name</th>
                          <th>Academy Name</th>
                          <th>Arena Name</th>
                          <th>Sports Name</th>
                          <th>Plan Name</th>
                          <th>Price</th>
                          <th>Coach Name</th>
                          <th>Type</th>
                          <th>Status</th>
                      </tr>
                  </thead>
                  <tbody>
                      {enrollments.map((item, index) => {
                          return (
                              <tr key={item.id}>
                                  <th>{index + 1}</th>
                                  <td>{item.player_name}</td>
                                   <td>{item.academy_name}</td>
                                   <td>{item.arena_name}</td>
                                   <td>{item.sports_name}</td>
                                   <td>{item.plan_name}</td>
                                   <td>{item.price}</td>
                                   <td>{item.coach_name}</td>
                                   <td>{item.type}</td>
                                   <td>{item.status}</td>
                              </tr>
                          );
                      })}
                  </tbody>
              </table>
          </div>
      </div>
  )
}

export default Enrollments