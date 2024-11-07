import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import items from "../data/items.json";
import ItemCard from '../components/ItemCard';


const Categorypage = () => {
  const { categoryName } = useParams();
  const [filtProd, setFilt] = useState([]);

  useEffect(() => {
    const filtered = items.filter((item) => item.category === categoryName.toLowerCase());

    setFilt(filtered);
  }, [categoryName]
  )


  return (
    <>
      <section className='header_element bg-violet-300'>
        <h2>{categoryName}</h2>
      </section>


      <div className='standard_element'>
        <ItemCard items={filtProd} />

      </div>

    </>
  )
}

export default Categorypage