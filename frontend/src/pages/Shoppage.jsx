import React, { useEffect, useState } from 'react'

import itemsData from "../data/items.json";
import ItemCard from '../components/ItemCard';
import Itemfilter from '../components/Itemfilter';



const filtering = {
    categories: ['wszystkie', 'smd', 'projekty', 'urządzenia przenośne', 'urządzenia stołowe'],
    priceRanges: []
};



const Shoppage = () => {

    const [items, setItems] = useState(itemsData);
    const [filtState, setFiltState] = useState({
        category: 'wszystkie',
        priceRange: ''
    });

    const startFilt = () => {
        let filtItems = itemsData;

        //KATEGORIE

        if (filtState.category && filtState.category !== 'wszystkie') {

            filtItems = filtItems.filter(item => item.category === filtState.category)

        }

        //CENA

        const { priceRange, customMinPrice, customMaxPrice } = filtState;

        // Czy wpisal ceny?
        let minPrice = customMinPrice ? parseFloat(customMinPrice) : 0;
        let maxPrice = customMaxPrice ? parseFloat(customMaxPrice) : Infinity;

        // nadpisz jesli tak
        if (priceRange) {
            const [rangeMin, rangeMax] = priceRange.split('-').map(Number);
            minPrice = rangeMin;
            maxPrice = rangeMax;
        }

        // Filtrowanie według cen
        filtItems = filtItems.filter(item => item.price >= minPrice && item.price <= maxPrice);

        // Zaktualizowanie przefiltrowanej listy
        setItems(filtItems);
    };

    useEffect(() => { startFilt() }, [filtState])

    //usun filtr

    const resetFilt = () => {
        setFiltState({
            category: 'wszystkie',
            priceRange: ''
        })
    }



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
                        <ItemCard items={items} />



                    </div>



                </div>
            </section>

        </>
    )
}

export default Shoppage