import { ChangeEvent, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResetEmailComponent from "../components/reset-email.component";
import requestResetPasswordApi from "../apis/request-reset-password.api";

function ForgotPasswordPage () {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const isFieldEmpty = (field: string) => {
    return field.trim() === '';
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isFormValid()) {
      return;
    }
    try {
      const response = await requestResetPasswordApi({
        email,
      });
      window.alert(response.message);
      setEmailSent(true);
      return;
    } catch (error: any) {
      if (error.response.data.message) {
        window.alert(error.response.data.message);
      } else {
        window.alert('server error, try another time...');
      }
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setter: { (value: SetStateAction<string>): void; (value: SetStateAction<string>): void; (value: SetStateAction<string>): void; (value: SetStateAction<string>): void; (arg0: any): void; }) => {
    setter(e.target.value);
  };

  const isFormValid = () => {
    return (
        !isFieldEmpty(email) &&
        isEmailValid(email)
    )
  };

  return(
    <>
      <div className="container">
        {emailSent}
        {!emailSent ?
          <>
            <h2 style={{ textAlign: 'left' }}>パスワードをお忘れの方</h2>
            <h6 style={{ textAlign: 'left' }}>会員登録時に登録されたメールアドレスを入力ください。パスワード再設定ページへのメールをお送りいたします。</h6>
            <form onSubmit={handleSubmit}>                
                <label htmlFor="email">メールアドレス</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => handleInputChange(e, setEmail)}
                    placeholder='例：welcome@jitera.com'
                />
                {submitted && isFieldEmpty(email) && !isEmailValid(email) && <span style={{ color: '#C40000', textAlign: 'left' }}>Email is required</span>}
                {submitted && !isEmailValid(email) && !isFieldEmpty(email) && <span style={{ color: '#C40000', textAlign: 'left' }}>Please enter a valid email</span>}
                <input type="submit" value="メールを送信" style={{ marginTop: '100px', cursor: 'pointer' }} />
            </form>
            <span onClick={() => navigate('/')} style={{ fontSize: '0.9rem', textDecoration: 'underline', fontFamily: 'sans-serif', cursor: 'pointer' }}>戻る</span>
          </>
          :
          <>
            <ResetEmailComponent />
          </>
        }
      </div>
    </>
  )
}

export default ForgotPasswordPage;