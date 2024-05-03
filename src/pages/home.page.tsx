import { useState } from "react";
import LoginPage from "../components/login-form/login.form";
import RegisterPage from "../components/register-form/register.form";

function HomePage() {
  const [isLog, setIsLog] = useState(false);

  const handleChange = () => {
    setIsLog(prev => !prev);
  }
  return(
    <>
      {isLog ? <LoginPage /> : <RegisterPage />}
      {
        isLog ?
        <span onClick={() => handleChange()} style={{ fontSize: '0.9rem', textDecoration: 'underline', fontFamily: 'sans-serif'}}>パスワードをお忘れの方</span> :
        <span onClick={() => handleChange()} style={{ fontSize: '0.9rem', textDecoration: 'underline', fontFamily: 'sans-serif'}}>ログインはこちら</span>
      }
    </>
  )
}

export default HomePage;