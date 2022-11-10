import React, { useState,useEffect } from "react";
import Axios from 'axios';

const BatchesModal = ({closeModal}) => {
    useEffect(()=>{
        getSportsDetails();
        getArenaDetails();
        getCoachDetails();
        getAcademyDetails();
    },[])


    const[Sports,setSports] = useState([]); //state to bring in FK sports_id
    const[Arenas,setArenas] = useState([]); //state to bring in FK arena_id
    const[Coaches,setCoaches] = useState([]); //state to bring in FK coach_id
    const[Academies,setAcademies] = useState([]); //state to bring in FK academies_id
 
    const [data,setData] = useState([]) // state to store form data

// Get all sports Details
    const getSportsDetails=async()=>{ 
        let sports = await fetch('http://3.111.147.217:3000/sports');
        sports = await sports.json();
        console.log("sports"+sports[0])
        setSports(sports);
    }

    //Get all coach details
    const getCoachDetails=async()=>{
            let coaches = await fetch('http://3.111.147.217:3000/coach');
            coaches = await coaches.json();
            setCoaches(coaches.data);
        }
// Get all arena details
    const getArenaDetails=async()=>{
        let Arenas = await fetch('http://3.111.147.217:3000/arenas');
        Arenas = await Arenas.json();
        setArenas(Arenas);
    }

    //get academy Details
    const getAcademyDetails=async()=>{
        let Academies = await fetch('http://3.111.147.217:3000/academies');
        Academies = await Academies.json();
        setAcademies(Academies);
    }

    // update the data object
    function handle(e){
        const newData = {...data}
        newData[e.target.name] = e.target.value
        setData(newData)
    }

    // post request for batchest to create new batch
    async function submit(e){
        e.preventDefault();
    

        await Axios.post('http://3.111.147.217:3000/batches',{
            sports_id:data.sport_id,
            arena_id:data.arena_id,
            academy_id:data.academy_id,
            coach_id:data.coach_id,
            start_time: data.start_time,
            end_time: data.end_time,
            price: data.price

        }).then(res =>{
            console.log(res.data)
        })
        {closeModal(false)}
    }
    return(
        
        <div  className = "modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={()=>{closeModal(false)}}>X</button>
                </div>
                <div><h1>Add Batch</h1>
                </div>
                    
                <form>
                    <div className="overlay">
                        <div className="form-group row">
                            <label for="coach-name" className="col-sm-2 label">Sport</label>
                            <div className="col-sm-10">
                                <select className="form-control" name= "sport_id" onChange={(e)=>handle(e)}>
                                    <option className="form-control" name= "sport_id"> -- Select a sport -- </option>
                                    {Sports.map((sport) => <option className="form-control" value={sport.id} name= "sport_id">{sport.name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="coach-name" className="col-sm-2 label">Arena</label>
                            <div className="col-sm-10">
                                <select className="form-control" name= "arena_id" onChange={(e)=>handle(e)}>
                                    <option className="form-control" name= "arena_id"> -- Select a arena -- </option>
                                    {Arenas.map((arena) => <option className="form-control" value={arena.id} name= "arena_id">{arena.name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="coach-name" className="col-sm-2 label">Coach</label>
                            <div className="col-sm-10">
                                <select className="form-control" name= "coach_id" onChange={(e)=>handle(e)}>
                                    <option className="form-control" name= "coach_id"> -- Select a coach -- </option>
                                    {Coaches.map((coach) => <option className="form-control" value={coach.id} name= "coach_id">{coach.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label for="coach-name" className="col-sm-2 label">Academy</label>
                            <div className="col-sm-10">
                                <select className="form-control" name= "academy_id" onChange={(e)=>handle(e)}>
                                    <option className="form-control" name= "academy_id"> -- Select a Academy -- </option>
                                    {Academies.map((academy) => <option className="form-control" value={academy.id} name= "academy_id">{academy.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label for="coach-name" className="col-sm-2 label">Price</label>
                            <div className="col-sm-6">
                            <input type="number" className="form-control" name="price"/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label for="coach-name" className="col-sm-2 label">Timings</label>
                            <div className="col-sm-10">
                            <input type="time" id="start_time_id" className="form-control" name="start_time" required /><small> to </small>
                            <input type="time" id="end_time_id"  className="form-control" name="end_time" required />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-10">
                                <button type="submit" className="btn btn-primary"  onClick={ (e)=> submit(e)}>Submit</button>
                            </div>
                        </div>
                        
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BatchesModal