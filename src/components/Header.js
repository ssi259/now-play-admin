import Coaches from'./Coaches'
import React,{useState} from 'react';
import {Link} from 'react-router-dom'
function Header(){
    const [bgcolor, setBgcolor] = useState('black');
    const [textcolor, setTextcolor] = useState('blue'); 

    function handleHighlightTab() {
        console.log("inside highlight")
        setBgcolor('white');
        setTextcolor('black');
    } 
    return(
        <div>
            <ul className='nav-ul'>
                <li><Link to = "/coaches" >Coaches</Link></li>
                <li><Link to = "/arenas">Arenas</Link></li>
                <li><Link to = "/Batches">Batches</Link></li>
                <li><Link to = "/profile">Profile</Link></li>
                <li style= {{bgcolor:bgcolor}}><Link to = "/logout" onClick={handleHighlightTab}>Logout</Link></li>

            </ul>
        </div>
    )
}
export default Header