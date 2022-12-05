import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
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

function App() {
  return (
    <div className="App">
      <h1 className='admin-heading'>Admin Panel</h1>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/coaches" element={<h1><Coaches/></h1>}></Route>
          <Route path="/" element={<h1><Coaches/></h1>}></Route>
          <Route path="/batches" element={<h1><Batches/></h1>}></Route>
          <Route path="/academies" element={<h1><Academies/></h1>}></Route>
          <Route path="/sports" element={<h1><Sports/></h1>}></Route>
          <Route path="/arenas" element={<h1><Arenas/></h1>}></Route>
          <Route path="/plans" element={<h1><Plans/> </h1>}></Route>
          <Route path="/users" element={<h1><Users/></h1>}></Route>
          <Route path="/getotp" element={<h1><CheckOTP/></h1>}></Route>
          <Route path="/complaints" element={<h1><Complaints/></h1>}></Route>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
