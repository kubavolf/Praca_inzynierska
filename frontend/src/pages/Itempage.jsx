import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchItemByIdQuery } from '../store/itemApi';

const Itempage = () => {
  const { id } = useParams(); // pobieranie ID
  const { data: item, isLoading, isError } = useFetchItemByIdQuery(id); // pobieranie danych produktu

  if (isLoading) {
    return <p>Ładowanie szczegółów przedmiotu...</p>;
  }

  if (isError || !item) {
    return <p>Nie udało się załadować szczegółów przedmiotu.</p>;
  }

  // wyświetlenie szczegółów przedmiotu
  return (

    <section>

      <div className="item_element max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-auto">
        {/* Nagłówek */}
        <div className="bg-violet-300 text-black text-center py-4 shadow-md">
          <h1 className="text-2xl font-bold">{item.name}</h1>
        </div>

        {/* główna sekcja */}
        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Obrazek */}
          <div className="flex justify-center">
            <img
              src={`http://localhost:3000${item.image}`} //backendddd
              alt={item.name || 'Brak zdjęcia'}
              className="w-full max-h-96 object-contain"
            />
          </div>


          {/* informacje o przedmiocie */}
          <div className="space-y-4">
            {/* Cena */}
            <p className="text-3xl font-bold text-green-600">{item.price} zł</p>


            {/* data dodania */}
            <div>
              <p className="text-gray-500 text-sm mb-3">
                <span className="font-semibold">Ostatnia aktualizacja: </span>
                {new Date(item.createdAt).toLocaleDateString('pl-PL')}
              </p>


              {/* Kategoria */}
              <p className="text-gray-700">
                <span className="font-bold text-lg">Kategoria: </span>
                <i className="capitalize text-lg">{item.category}</i>
              </p>
            </div>

            {/* Informacje o autorze */}
            <div>

              <h3 className="font-bold text-lg">Informacje o sprzedającym:</h3>
              <p>
                <span className="font-semibold">Nick: </span>
                {item.author?.username}
              </p>

              <p>
                <span className="font-semibold">Email: </span>
                {item.author?.email}
              </p>

              <p>
                <span className="font-semibold">Telefon: </span>
                {item.author?.phoneNumb || 'Brak numeru telefonu'}
              </p>

            </div>

          </div>
        </div>

        {/* Opis produktu */}
        <div className="bg-gray-50 p-4 border">

          <h3 className="font-bold text-lg mb-4">Opis produktu:</h3>

          <p className="text-gray-700">
            {item.description || 'Brak opisu dla tego przedmiotu.'}
          </p>

        </div>
      </div>
    </section>
  );
};

export default Itempage;