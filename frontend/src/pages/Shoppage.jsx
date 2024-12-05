import React, { useEffect, useState } from 'react'


import ItemCard from '../components/ItemCard';
import Itemfilter from '../components/Itemfilter';
import { useFetchItemsQuery } from '../store/itemApi';



const filtering = {
    categories: ['wszystkie', 'smd', 'projekty', 'urządzenia przenośne', 'urządzenia stołowe'],
    priceRanges: []
};


const Shoppage = () => {

    const [filtState, setFiltState] = useState({
        category: 'wszystkie',
        customMinPrice: '',
        customMaxPrice: ''
    });



  

    const { data: items = [], isLoading, isError } = useFetchItemsQuery({
        category: filtState.category,
        minPrice: filtState.customMinPrice || '',
        maxPrice: filtState.customMaxPrice || ''
    });





    //usun filtr

    const resetFilt = () => {
        setFiltState({
            category: 'wszystkie',
            customMinPrice: '',
            customMaxPrice: ''
        })
    };

    console.log('Filtry wysyłane do API:', {
        category: filtState.category,
        minPrice: filtState.customMinPrice,
        maxPrice: filtState.customMaxPrice,
    });

    console.log('Pobrane przedmioty:', items);


    return (
        <>
            <section className='header_element bg-violet-300'>
                <h2>Ogłoszenia</h2>
            </section>

            <section className='standard_element'>
                <div className='flex flex-col md:gap-12 gap-8'>

                    <div className=''>
                        <Itemfilter
                            filtering={filtering}
                            filtState={filtState}
                            setFiltState={setFiltState}
                            resetFilt={resetFilt} />

                    </div>

                    <div>
                        <h3 className='mt-10 mb-10 font-bold text-2xl'>
                            Aktualne Ogłoszenia: {items.length}
                        </h3>
                        {isLoading && <p>Ładowanie...</p>}
                        {isError && <p>Wystąpił błąd podczas pobierania danych.</p>}
                        {!isLoading && items.length === 0 && <p>Brak ogłoszeń pasujących do filtrów.</p>}
                        {!isLoading && items.length > 0 && <ItemCard items={items} />}



                    </div>



                </div>
            </section>

        </>
    )
}

export default Shoppage