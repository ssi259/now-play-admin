import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Coaches from './components/Coaches';
import Batches from './components/Batches';
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <h1 className='admin-heading'>Admin Panel</h1>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/coaches" element={<h1><Coaches/></h1>}></Route>
          <Route path="/batches" element={<h1><Batches/></h1>}></Route>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
