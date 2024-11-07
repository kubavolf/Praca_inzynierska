import React, { useEffect, useState } from 'react'

import itemsData from "../data/items.json";
import ItemCard from '../components/ItemCard';

const Searchpage = () => {
    const [keyWord, setKeyWord] = useState('');
    const [filtProd, setFiltProd] = useState(itemsData);
    
    const handleSearch = () => {
        const word = keyWord.toLowerCase();
        const filtered = itemsData.filter(item => item.name.toLowerCase().includes(word));
        setFiltProd(filtered)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          handleSearch()
        }
      }


    return (
        <>
            <section className='header_element bg-violet-300'>
                <h2>

                    Wyszukiwanie

                </h2>
            </section>

            <section className='standard_element'>
                <div className='w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4'>
                    <input type='text'
                        value={keyWord}
                        onChange={(e) => setKeyWord(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className='search-bar w-full max-w-4xl p-2 border rounded'
                        placeholder='Czego szukasz?'
                    />

                    <button onClick={handleSearch}
                        className='search-button w-full md:w-auto py-2 px-8 bg-violet-500 text-white rounded-full'>

                        Szukaj

                    </button>

                </div>

                <ItemCard items={filtProd} />


            </section>


        </>
    )
}

export default Searchpage