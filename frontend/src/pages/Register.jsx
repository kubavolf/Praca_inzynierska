import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Register = () => {
    return (<section className='h-screen flex items-center justify-center'>
        <div className='max-w-sm hover:border shadow bg-violet-100 mx-auto p-8'>

            <form className='space-y-5 max-w-sm mx-auto'>
                <input type="email" name="email" id="email"
                    placeholder="Adres E-mail" required className='w-full bg-violet-200 px-2 py-2 mb-5' />

                <input type="password" name="password" id="password"
                    placeholder="Hasło" required className='w-full bg-violet-200 px-2 py-2' />

                <input type="password" name="password" id="password"
                    placeholder="Powtórz hasło" required className='w-full bg-violet-200 px-2 py-2' />


                <button type='submit' className='mt-5 bg-violet-300 text-white py-1 hover:text-violet-100 w-full rounded-full'>
                    Rejestracja
                </button>

            </form>


        </div>

    </section>
    )
}

export default Register