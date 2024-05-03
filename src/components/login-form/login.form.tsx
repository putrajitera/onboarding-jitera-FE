import loginApi from '../../apis/login.api';
import './login.css';
import { ChangeEvent, SetStateAction, useState } from 'react';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setter: { (value: SetStateAction<string>): void; (value: SetStateAction<string>): void; (value: SetStateAction<string>): void; (value: SetStateAction<string>): void; (arg0: any): void; }) => {
        setter(e.target.value);
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setSubmitted(true);
        if (!isFormValid()) {
          return;
        }
        try {
          const login = await loginApi({
            email,
            password,
          });
          window.alert(login.message);
          return;
        } catch (error: any) {
          if (error.response.data.message) {
            window.alert(error.response.data.message);
          } else {
            window.alert('server error, try another time...');
          }
          setAllToNull();
        }
    };

    const isFieldEmpty = (field: string) => {
        return field.trim() === '';
    };

    const isValidPassword = (password: string) => {
      return password.length >= 8 || !isFieldEmpty(password);
    }

    const isEmailValid = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) || !isFieldEmpty(email);
    };

    const setAllToNull = () => {
      setEmail('')
      setPassword('')
      setSubmitted(false)
    }

    const isFormValid = () => {
        return (
            !isFieldEmpty(email) &&
            isEmailValid(email) &&
            !isFieldEmpty(password) &&
            !isValidPassword(password)
        );
    };

    return (
        <>
            <div className="container">
                <h2 style={{ textAlign: 'left' }}>ログイン</h2>
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
                    {submitted && !isEmailValid(email) && <span style={{ color: '#C40000', textAlign: 'left' }}>有効なメールアドレスを入力してください</span>}
                    
                    <label htmlFor="password">パスワード</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => handleInputChange(e, setPassword)}
                        placeholder='半角英数字'
                    />
                    {submitted && !isValidPassword(password) && <span style={{ color: '#C40000', textAlign: 'left' }}>パスワードは英数字8文字以上で入力してください</span>}
                    
                    <input type="submit" value="ログイン" style={{ marginTop: '6.5rem', cursor: 'pointer' }} />
                </form>
            </div>
        </>
    )
}

export default LoginForm;
