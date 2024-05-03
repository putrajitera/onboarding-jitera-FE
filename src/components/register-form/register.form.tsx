import registerApi from '../../apis/register.api';
import './register.css';
import { ChangeEvent, SetStateAction, useState } from 'react';

function RegisterForm() {
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
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
          console.log('failed...');
          return;
        }
        try {
          const register = await registerApi({
            firstName: name,
            lastName: surname,
            email,
            password,
          });
          window.alert(register);
          setAllToNull();
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
        return password.length >= 8 && !isFieldEmpty(password);
    };
    
    const isEmailValid = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) && !isFieldEmpty(email);
    };

    const setAllToNull = () => {
      setSurname('')
      setName('')
      setEmail('')
      setPassword('')
      setSubmitted(false)
    }

    const isFormValid = () => {
        return (
            !isFieldEmpty(surname) &&
            !isFieldEmpty(name) &&
            isEmailValid(email) &&
            isValidPassword(password)
        );
    };

    return (
        <>
            <div className="container">
                <h2 style={{ textAlign: 'left' }}>アカウント登録</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', marginBottom: '10px' }}>
                        <div style={{ width: '50%', marginRight: '10px', textAlign: 'left' }}>
                            <label htmlFor="surname">姓</label>
                            <input
                                type="text"
                                id="surname"
                                name="surname"
                                value={surname}
                                onChange={(e) => handleInputChange(e, setSurname)}
                                placeholder='例：山田'
                            />
                            {submitted && isFieldEmpty(surname) && <span style={{ color: '#C40000' }}>姓は必須です</span>}
                        </div>
                        <div style={{ width: '50%', textAlign: 'left' }}>
                            <label htmlFor="name">名</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => handleInputChange(e, setName)}
                                placeholder='例：太郎'
                            />
                            {submitted && isFieldEmpty(name) && <span style={{ color: '#C40000' }}>名は必須です</span>}
                        </div>
                    </div>
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

                    <input type="submit" value="はじめる" style={{ marginTop: '20px', cursor: 'pointer' }} />
                </form>
            </div>
        </>
    )
}

export default RegisterForm;
