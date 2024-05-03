import { ChangeEvent, SetStateAction, useState } from "react";
import { useParams } from "react-router-dom";
import resetPasswordApi from "../apis/reset-password.api";
import ResetPasswordComponent from "../components/reset-password-success.component";

function ResetPassword () {
  const { id } = useParams();

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setter: { (value: SetStateAction<string>): void; (value: SetStateAction<string>): void; (value: SetStateAction<string>): void; (value: SetStateAction<string>): void; (arg0: any): void; }) => {
    setter(e.target.value);
  };
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isFormValid()) {
      return;
    }
    if (!isPasswordMatch) {
      return;
    }
    try {
      await resetPasswordApi({
        id,
        password: newPassword,
      });
      setSuccess(true);
      return;
    } catch (error: any) {
      if (error.response.data.message) {
        window.alert(error.response.data.message);
      } else {
        window.alert('server error, try another time...');
      }
    }
  };
  const isFieldEmpty = (field: string) => {
    return field.trim() === '';
  };

  const isValidPassword = (password: string) => {
    return password.length >= 8 || !isFieldEmpty(password);
  }

  const isFormValid = () => {
    return (
        isValidPassword(password)
    );
  };

  const isPasswordMatch = () => {
    return (
      password == newPassword
    )
  }
  return(
    <>
      <div className="container">
        {!success ?
          <>
            <h2 style={{ textAlign: 'left' }}>パスワード再設定</h2>
              <h6 style={{ textAlign: 'left', textDecorationStyle: 'solid' }}>新しいパスワードを入力してください。</h6>
              <form onSubmit={handleSubmit}>
                {submitted && !isPasswordMatch() && <span style={{ color: '#C40000', textAlign: 'left' }}>パスワードが一致しませんでした</span>}
                <label htmlFor="password">新しいパスワード</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => handleInputChange(e, setPassword)}
                    placeholder='半角英数字'
                />
                {submitted && !isValidPassword(password) && <span style={{ color: '#C40000', textAlign: 'left' }}>パスワードは英数字8文字以上で入力してください</span>}
                <label style={{ marginTop: '20px' }} htmlFor="password">新しいパスワード（確認）</label>
                <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => handleInputChange(e, setNewPassword)}
                    placeholder='半角英数字'
                />
                {submitted && !isValidPassword(password) && <span style={{ color: '#C40000', textAlign: 'left' }}>パスワードは英数字8文字以上で入力してください</span>}
                <input type="submit" value="設定する" style={{ marginTop: '100px', cursor: 'pointer' }} />
              </form>
          </>
          :
          <>
            <ResetPasswordComponent />
          </>
        }
        
      </div>
    </>
  )
}

export default ResetPassword;
