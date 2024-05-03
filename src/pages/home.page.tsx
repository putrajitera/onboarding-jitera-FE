import { useState } from "react";
import LoginPage from "../components/login-form/login.form";
import RegisterPage from "../components/register-form/register.form";
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate();
  const [isLog, setIsLog] = useState(false);

  const handleChange = () => {
    setIsLog(prev => !prev);
  }
  return(
    <>
      {isLog ? <LoginPage /> : <RegisterPage />}
      {
        isLog ?
        <span onClick={() => navigate('/forgot-password')} style={{ fontSize: '0.9rem', textDecoration: 'underline', fontFamily: 'sans-serif', cursor: 'pointer' }}>パスワードをお忘れの方</span> :
        <span onClick={() => handleChange()} style={{ fontSize: '0.9rem', textDecoration: 'underline', fontFamily: 'sans-serif', cursor: 'pointer' }}>ログインはこちら</span>
      }
    </>
  )
}

export default HomePage;