import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../store/userApi';


const Register = () => {

    const [errorMsg, setErrorMsg] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeated, setRepeated] = useState('');

    const [register, { isLoading }] = useRegisterMutation();
    const navigate = useNavigate()



    const handleRegister = async (e) => {
        e.preventDefault();
        const info = {
            username,
            email,
            password
        }

        if (repeated != password) {
            setErrorMsg('Hasła różnią się');
            return;


        }

        try {
            await register(info).unwrap();
            alert("Rejestracja pomyślna")
            navigate("/login")

        }
        catch (error) {
            setErrorMsg('Błąd podczas rejestracji')
        }

    }




    return (<section className='h-screen flex items-center justify-center'>
        <div className='max-w-sm hover:border shadow bg-violet-100 mx-auto p-8'>

            <form onSubmit={handleRegister} className='space-y-5 max-w-sm mx-auto'>

                <input type="username" name="username" id="username"
                    placeholder="Nazwa użytkownika" required className='w-full bg-violet-200 px-2 py-2 mb-5'
                    onChange={(e) => setUsername(e.target.value)} />

                <input type="email" name="email" id="email"
                    placeholder="Adres E-mail" required className='w-full bg-violet-200 px-2 py-2'
                    onChange={(e) => setEmail(e.target.value)} />

                <input type="password" name="password" id="password"
                    placeholder="Hasło" required className='w-full bg-violet-200 px-2 py-2'
                    onChange={(e) => setPassword(e.target.value)} />

                <input type="password" name="repeated" id="repeated"
                    placeholder="Powtórz hasło" required className='w-full bg-violet-200 px-2 py-2'
                    onChange={(e) => setRepeated(e.target.value)} />


                <button type='submit' className='mt-5 bg-violet-300 text-white py-1 hover:text-violet-100 w-full rounded-full'
                    disabled={isLoading}>
                    {isLoading ? 'Rejestrowanie...' : 'Rejestracja'}
                </button>

                {
                    errorMsg && <p className='text-violet-500 mt-5'>{errorMsg}</p>
                }

            </form>


        </div>

    </section>
    )
}

export default Register