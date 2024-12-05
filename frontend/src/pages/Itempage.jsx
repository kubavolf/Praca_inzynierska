import React from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { useFetchItemByIdQuery } from '../store/itemApi';

const Itempage = () => {

  const {id} = useParams();

  const dispatcher = useDispatch();
  const {data, error, isLoading} = useFetchItemByIdQuery(id);

  const itemInfo = data?.item || {};





  console.log(data);
  

  return (
    <section className='bg-violet-300'>
                <h2 className='header_element'>Szczegóły</h2>
                <div className='subheader_element'>{itemInfo.name}</div>
            </section>
  )
}

export default Itempage