import React from 'react'
import { useState, useEffect } from 'react';
import Axios from 'axios';
const ArenaModal = ({ closeModal }) => {

    const [data, setData] = useState([])

    function handle(e) {
        const newData = { ...data }
        newData[e.target.name] = e.target.value
        setData(newData)
    }

    async function submit(e) {
        e.preventDefault();

        await Axios.post('http://3.111.147.217:3000/arenas', {
            name: data.name,
            phone_number: data.phone,
            email: data.email,
            lat: data.lat,
            long: data.long,
            city: data.city,
            locality: data.locality,
            state: data.state,

        }).then(res => {
            console.log(res.data)
        })
        { closeModal(false) }
    }
  return (
      <div className="modalBackground">
          <div className="modalContainer">
              <div className="titleCloseBtn">
                  <button onClick={() => { closeModal(false) }}>X</button>
              </div>
              <div><h1>Create Arena</h1>
              </div>

              <form>
                    <div className="overlay">
                      <div class="form-group row">
                          <label for="Arena-name" class="col-sm-2 label">Name</label>
                          <div class="col-sm-10">
                              <input onChange={(e) => handle(e)} id="name" class="form-control" value={data.name} name="name" placeholder="Arena Name" />
                          </div>
                      </div>
                      <div class="form-group row">
                          <label for="Arena-email" class="col-sm-2 label">Email</label>
                          <div class="col-sm-10">
                              <input onChange={(e) => handle(e)} id="email" class="form-control" value={data.email} name="email" placeholder="Arena Email" />
                          </div>
                      </div>
                      <div class="form-group row">
                          <label for="Arena-phn" class="col-sm-2 label">Phone</label>
                          <div class="col-sm-10">
                              <input onChange={(e) => handle(e)} id="phone" class="form-control" value={data.phone} name="phone" placeholder="Phone Number" />
                          </div>
                      </div>
                      <div class="form-group
                        row">
                            <label for="latitude" class="col-sm-2 label">Latitude</label>
                            <div class="col-sm-10">
                                <input onChange={(e) => handle(e)} id="lat" class="form-control" value={data.lat} name="lat" placeholder="Latitude" />
                            </div>
                      </div>
                      <div class="form-group row">
                        <label for="longitude" class="col-sm-2 label">Longitude</label>
                        <div class="col-sm-10">
                            <input onChange={(e) => handle(e)} id="long" class="form-control" value={data.long} name="long" placeholder="Longitude" />
                      </div>
                      </div>
                      <div class="form-group row">
                        <label for="city" class="col-sm-2 label">City</label>
                        <div class="col-sm-10">
                            <input onChange={(e) => handle(e)} id="city" class="form-control" value={data.city} name="city" placeholder="City" />
                        </div>
                      </div>
                      <div class="form-group
                        row">
                            <label for="locality" class="col-sm-2 label">Locality</label>
                            <div class="col-sm-10">
                                <input onChange={(e) => handle(e)} id="locality" class="form-control" value={data.locality} name="locality" placeholder="Locality" />
                            </div>
                        </div>
                        <div class="form-group
                        row">
                            <label for="state" class="col-sm-2 label">State</label>
                            <div class="col-sm-10">
                                <input onChange={(e) => handle(e)} id="state" class="form-control" value={data.state} name="state" placeholder="State" />
                                </div>
                                </div>
                      <div class="form-group row">
                          <div class="col-sm-10">
                              <button type="submit" class="btn btn-primary" onClick={(e) => submit(e)}>Submit</button>
                          </div>
                      </div>

                            




                    </div>
              </form>
          </div>
      </div>
    )
}
export default ArenaModal