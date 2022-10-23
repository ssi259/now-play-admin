import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Coaches from './components/Coaches';
import Batches from './components/Batches';
import Footer from './components/Footer';
import Academies from './components/Academies';
import Sports from './components/Sports';


function App() {
  return (
    <div className="App">
      <h1 className='admin-heading'>Admin Panel</h1>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/coaches" element={<h1><Coaches/></h1>}></Route>
          <Route path="/batches" element={<h1><Batches/></h1>}></Route>
          <Route path="/academies" element={<h1><Academies/></h1>}></Route>
          <Route path="/sports" element={<h1><Sports/></h1>}></Route>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
