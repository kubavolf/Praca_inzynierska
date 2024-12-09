import React, { useState } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useAddItemMutation } from "../store/itemApi";

const categories = [
    'smd',
    'projekty',
    'urządzenia przenośne',
    'urządzenia stołowe',
];


const CreatePost = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    const navigate = useNavigate();
    const [addItem, { isLoading, error }] = useAddItemMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('category', category);
            formData.append('description', description);
            formData.append('price', price);
            if (image) {
                formData.append('image', image); //dodanie pliku do FormData
            }

            await addItem(formData);
            alert('Dodano ogłoszenie');

            setTimeout(() => {
                navigate('/shop');
            }, 1000); //po 1 s przekieruj na ogłoszenia
        }

        catch (err) {
            console.error('Error adding item:', err);
        }
    };

    return (
        <div className="standard_element mx-auto bg-violet-50 shadow-lg rounded-lg p-8">
            <h1 className="header_element font-bold mb-8">Dodaj Ogłoszenie</h1>
            <form onSubmit={handleSubmit} className="space-y-6 mx-auto max-w-lg">

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nazwa przedmiotu:</label>
                    <input

                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nazwa przedmiotu"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg  bg-violet-200"

                    />
                </div>

                <div>
                    <p className="block text-sm font-semibold text-gray-700 mb-2">Kategoria:</p>
                    {categories.map((cat, index) => (
                        <label key={index} className="flex items-center space-x-2 mb-2">
                            <input

                                type="radio"
                                name="category"
                                value={cat}
                                checked={category === cat}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                                className="form-radio"

                            />
                            <span>{cat}</span>
                        </label>
                    ))}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Opis:</label>
                    <textarea

                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Opis przedmiotu"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg  bg-violet-200"

                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Cena:</label>
                    <input

                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Cena"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg bg-violet-200"

                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Zdjęcie:</label>
                    <input

                        type="file"
                        id="image"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-violet-200"

                    />
                </div>

                <button

                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-purple hover:bg-purple-bright rounded-lg transition focus:outline-none focus:ring-4 focus:ring-purple-bright disabled:opacity-50 bg-violet-200"

                >
                    {isLoading ? "Dodawanie..." : "Dodaj przedmiot"}
                </button>

                {error && <p className="text-red-600 mt-4">Wystąpił błąd: {error.message}</p>}
            </form>
        </div>
    );
};

export default CreatePost;