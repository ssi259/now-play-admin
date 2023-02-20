import './App.css';
import Header from './components/Header'
import {Link,BrowserRouter,Routes,Route} from 'react-router-dom'
import Coaches from './components/Coaches';
import Batches from './components/Batches';
import Footer from './components/Footer';
import Academies from './components/Academies';
import Sports from './components/Sports';
import Arenas from './components/Arenas';
import Plans from './components/Plans';
import Users from './components/Users';
import CheckOTP from './components/CheckOTP';
import Complaints from './components/Complaints';
import Enrollments from './components/Enrollment';
import Audits from './components/Audits';
import PaymentAudit from './components/PaymentAudit';
import Leads from './components/Leads';
import RescheduleCanceled from './components/RescheduleCanceled';
import {useEffect, useState } from 'react';
import {LoginForm} from './components/LoginComponent/LoginForm';
import NotificationForm from './components/NotificationForm';

const LogoutButton = ({ onLogout }) => {
  return   <button style= {{
    backgroundColor: 'white',
    color: 'black',
    padding: '14px 20px',
    margin: '8px 0',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    fontSize: '20px',
    fontWeight: 'bold',
    borderRadius: '10px',
    textAlign: 'center',
    display: 'inline-block',
    transitionDuration: '0.4s',
  }}onClick={onLogout}>
  <Link to="/signIn">Confirm to Logout</Link>
</button>

};
function App() {
  console.log("App is now running in "+process.env.REACT_APP_PROJECT_ENV+" mode")
  console.log("host:"+process.env.REACT_APP_API_PATH)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {}, [isLoggedIn]);
  const handleLogin = (credentials) => {
    if (credentials.username === 'admin' && credentials.password === 'password') {
      setIsLoggedIn(true);
    }else{
      alert("Invalid Credentials")
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  }
  return (
    <div className="App">
      <h1 className='admin-heading'>Admin Panel</h1>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/coaches" element={isLoggedIn? <h1><Coaches/></h1>: <LoginForm onLogin={handleLogin}/>}></Route>
          <Route path="/" element={isLoggedIn? <h1><Coaches/></h1>: <LoginForm onLogin={handleLogin}/>}></Route>
          <Route path="/batches" element={isLoggedIn? <h1><Batches/></h1>: <LoginForm onLogin={handleLogin}/>}></Route>
          <Route path="/academies" element={isLoggedIn? <h1><Academies/></h1>: <LoginForm onLogin={handleLogin}/>}></Route>
          <Route path="/sports" element={isLoggedIn? <h1><Sports/></h1>: <LoginForm onLogin={handleLogin}/>}></Route>
          <Route path="/arenas" element={isLoggedIn? <h1><Arenas/></h1>: <LoginForm onLogin={handleLogin}/>}></Route>
          <Route path="/plans" element={isLoggedIn? <h1><Plans/></h1>: <LoginForm onLogin={handleLogin}/>}></Route>
          <Route path="/users" element={isLoggedIn? <h1><Users/></h1>: <LoginForm onLogin={handleLogin}/>}></Route>
          <Route path="/getotp" element={isLoggedIn? <h1><CheckOTP/></h1>: <LoginForm onLogin={handleLogin}/>}></Route>
          <Route path="/complaints" element={isLoggedIn? <h1><Complaints/></h1>: <LoginForm onLogin={handleLogin}/>}></Route>
          <Route path="/enrollments" element={isLoggedIn? <h1><Enrollments/></h1>: <LoginForm onLogin={handleLogin}/>}></Route>
          <Route path="/audits" element={isLoggedIn? <h1><Audits/></h1>: <LoginForm onLogin={handleLogin}/>}></Route>
          <Route path="/audits/payments" element={isLoggedIn? <h1><PaymentAudit/></h1>: <LoginForm onLogin={handleLogin}/>}></Route>
          <Route path="/audits/reschedules" element={isLoggedIn? <h1><RescheduleCanceled/></h1>: <LoginForm onLogin={handleLogin}/>}></Route>
          <Route path="/leads" element={isLoggedIn? <h1><Leads/></h1>: <LoginForm onLogin={handleLogin}/>}></Route>
          <Route path="/signIn" element={ isLoggedIn? <h1><Coaches/></h1>:<LoginForm onLogin={handleLogin}/>}></Route>
          <Route path="/logout" element={<h1><LogoutButton onLogout={handleLogout}/></h1>} ></Route>
          <Route path="/notification" element={isLoggedIn? <h1><NotificationForm/></h1>: <LoginForm onLogin={handleLogin}/>}></Route>

          </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
