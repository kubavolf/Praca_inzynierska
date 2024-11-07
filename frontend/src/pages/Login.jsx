import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')


  return (
    <section className='h-screen flex items-center justify-center'>
        <div className='max-w-sm hover:border shadow bg-violet-100 mx-auto p-8'>
            
            <form className='space-y-5 max-w-sm mx-auto'>
                <input type="email" name = "email" id = "email"
                placeholder = "Adres E-mail" required className='w-full bg-violet-200 px-2 py-2'/>

                <input type="password" name = "password" id = "password"
                placeholder = "Hasło" required className='w-full bg-violet-200 px-2 py-2'/>

                <button type='submit' className='mt-5 bg-violet-300 text-white py-1 hover:text-violet-100 w-full rounded-full'>
                  Zaloguj się
                </button>

            </form>
            <p className='mt-3 italic text-xs underline'><Link to ="/register">Nie posiadasz konta?</Link></p>

        </div>

    </section>
  )
}

export default Login