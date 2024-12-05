import React from 'react';
import { useParams } from 'react-router-dom';

import ItemCard from '../components/ItemCard';
import { useFetchItemsQuery } from '../store/itemApi';

const CategoryPage = () => {
  const { categoryName } = useParams();

  const { data: items = [], isLoading} = useFetchItemsQuery({
    category: categoryName.toLowerCase(),
    minPrice: '',
    maxPrice: ''
  });

  return (
    <>
      <section className='header_element bg-violet-300'>
        <h2>{categoryName}</h2>
      </section>

      <div className='standard_element'>
        {isLoading && <p>Ładowanie...</p>}
        {!isLoading && items.length === 0 && <p>Brak ogłoszeń w tej kategorii.</p>}
        {!isLoading && items.length > 0 && <ItemCard items={items} />}
      </div>
    </>
  );
};

export default CategoryPage;
