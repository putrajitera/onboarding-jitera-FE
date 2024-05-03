import './App.css'
import jiteraIcon from './assets/jitera.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home.page';

function App() {
  return (
    <Router>
      <img src={jiteraIcon} alt="Jitera Logo" className="icon" style={{ marginBottom: '50px', display: 'flex', alignItems: 'flex-start' }} />
      <Routes>
        <Route path='/' Component={HomePage}/>
      </Routes>
    </Router>
  )
}

export default App
