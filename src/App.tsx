import './App.css'
import jiteraIcon from './assets/jitera.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home.page';
import ForgotPasswordPage from './pages/forgot-password.page';
import RequestResetPassword from './pages/reset-password.page';

function App() {
  return (
    <Router>
      <img src={jiteraIcon} alt="Jitera Logo" className="icon" style={{ marginBottom: '50px', display: 'flex', alignItems: 'flex-start' }} />
      <Routes>
        <Route path='/' Component={HomePage}/>
        <Route path='/forgot-password' Component={ForgotPasswordPage} />
        <Route path='/reset-password/:id' Component={RequestResetPassword} />
      </Routes>
    </Router>
  )
}

export default App
