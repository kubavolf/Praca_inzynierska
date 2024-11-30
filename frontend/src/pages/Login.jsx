import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../store/userApi';
import { setUser } from '../store/userSlice';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('')


  const dispatcher = useDispatch();
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()


  const handleLogin = async (e) => {
    e.preventDefault();
    const info = {
      email,
      password
    }

    try {

      const response = await login(info).unwrap();
      console.log(response)
      const {token, userData: user} = response;
      dispatcher(setUser({user}))
      alert("Zalogowano")
      navigate("/")

    }
    catch (error) {
      setErrorMsg('Błąd podczas logowania')

    }

  }


  return (
    <section className='h-screen flex items-center justify-center'>
      <div className='max-w-sm hover:border shadow bg-violet-100 mx-auto p-8'>

        <form onSubmit={handleLogin} className='space-y-5 max-w-sm mx-auto'>
          <input type="email" name="email" id="email"
            placeholder="Adres E-mail" required className='w-full bg-violet-200 px-2 py-2'
            onChange={(e) => setEmail(e.target.value)} />

          <input type="password" name="password" id="password"
            placeholder="Hasło" required className='w-full bg-violet-200 px-2 py-2'
            onChange={(e) => setPassword(e.target.value)} />

          <button type='submit' className='mt-5 bg-violet-300 text-white py-1 hover:text-violet-100 w-full rounded-full'
            disabled={isLoading}>
            {isLoading ? 'Logowanie...' : 'Zaloguj się'}
          </button>

        </form>
        <p className='mt-3 italic text-xs underline'><Link to="/register">Nie posiadasz konta?</Link></p>
        {
          errorMsg && <p className='text-violet-500 mt-5'>{errorMsg}</p>
        }

      </div>

    </section>
  )
}

export default Login