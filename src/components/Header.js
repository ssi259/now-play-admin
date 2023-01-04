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
                <li><Link to = "/users">Users</Link></li>
                <li><Link to = "/coaches" >Coaches</Link></li>
                <li><Link to = "/arenas">Arenas</Link></li>
                <li><Link to = "/Batches">Batches</Link></li>
                <li><Link to = "/sports">sports</Link></li>
                <li><Link to = "/academies">Academies</Link></li>
                <li><Link to = "/plans">Plans</Link></li>
                <li><Link to = "/profile">Profile</Link></li>
                <li><Link to = "/getotp">Check OTP</Link></li>
                <li><Link to = "/complaints">Complaints</Link></li>
                <li><Link to = "/enrollments">Enrollment</Link></li>
                <li><Link to = "/audits">Audits</Link></li>
                <li style= {{bgcolor:bgcolor}}><Link to = "/logout" onClick={handleHighlightTab}>Logout</Link></li>

            </ul>
        </div>
    )
}
export default Header