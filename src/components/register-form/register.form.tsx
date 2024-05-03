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

    const isValidPassword = (field: string) => {
      return field.length < 8;
    }

    const isEmailValid = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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
            !isFieldEmpty(email) &&
            isEmailValid(email) &&
            !isFieldEmpty(password) &&
            !isValidPassword(password)
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
                            {submitted && isFieldEmpty(surname) && <span style={{ color: '#C40000' }}>Last name is required</span>}
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
                            {submitted && isFieldEmpty(name) && <span style={{ color: '#C40000' }}>First name is required</span>}
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
                    {submitted && isFieldEmpty(email) && !isEmailValid(email) && <span style={{ color: '#C40000', textAlign: 'left' }}>Email is required</span>}
                    {submitted && !isEmailValid(email) && !isFieldEmpty(email) && <span style={{ color: '#C40000', textAlign: 'left' }}>Please enter a valid email</span>}

                    <label htmlFor="password">パスワード</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => handleInputChange(e, setPassword)}
                        placeholder='半角英数字'
                    />
                    {submitted && isFieldEmpty(password) && isValidPassword(password) && <span style={{ color: '#C40000', textAlign: 'left' }}>Password is required</span>}
                    {submitted && !isFieldEmpty(password) && isValidPassword(password) && <span style={{ color: '#C40000', textAlign: 'left' }}>Please enter a password with at least 8 alphanumeric character</span>}

                    <input type="submit" value="Begin" style={{ marginTop: '20px' }} />
                </form>
            </div>
        </>
    )
}

export default RegisterForm;
