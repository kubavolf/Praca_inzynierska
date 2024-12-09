import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateProfileMutation } from '../store/userApi';
import { setUser } from '../store/userSlice';
import { useDeleteItemMutation, useFetchUserItemsQuery } from '../store/itemApi';
import ItemCard from '../components/ItemCard';

const ProfileSettings = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.logging);

    const { data: userItems = [], isLoading: isUserItemsLoading, isError: isUserItemsError } = useFetchUserItemsQuery(user?._id); //pobranie tylko tych od zalogowanego
    const [deleteItem, { isLoading: isDeleting }] = useDeleteItemMutation(); //usuniecie


    const handleDelete = async (itemId) => {
        if (window.confirm('Czy na pewno chcesz usunąć to ogłoszenie?')) {

            try {
                await deleteItem(itemId).unwrap();
                alert('Usunięto');
            }
            
            catch (err) {
                console.error('Błąd podczas usuwania:', err);
                alert('Nie udało się usunąć ogłoszenia.');
            }
        }
    };

    // Lokalne dane formularza
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneNumb: '',
        picture: '',
    });

    const [file, setFile] = useState(null); //plik do przesłania

    const [updateProfile, { isLoading, isSuccess, isError }] = useUpdateProfileMutation();

    //załaduj dane użytkownika z bazy danych do formularza
    useEffect(() => {

        if (user) {
            
            setFormData({
                username: user.username || '',
                email: user.email || '',
                phoneNumb: user.phoneNumb || '',
                picture: user.picture || '',
            });

        }
    }, [user]);

    const handleChange = (e) => { //zmiana danych
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {  //zmiana pliku (fota)
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Obiekt FormData do przesyłania pliku i innych
            const data = new FormData();
            data.append('userId', user._id);
            data.append('username', formData.username);
            data.append('email', formData.email);
            data.append('phoneNumb', formData.phoneNumb);

            if (file) {
                data.append('picture', file); // Dodaj plik, jeśli jest wybrany
            }

            // Wywołanie z FormData
            const updatedUser = await updateProfile(data).unwrap();

            // Aktualizacja stanu Redux
            dispatch(setUser({ user: updatedUser.updatedUser }));

            alert('Dane zostały zaktualizowane');
        }
        
        catch (err) {
            console.error('Nie udało się zaktualizować danych:', err);
            alert('Wystąpił błąd podczas aktualizacji');
        }
    };

    return (

        <div className="standard_element mx-auto bg-violet-50 shadow-lg rounded-lg p-8">

            <h1 className="header_element text-3xl font-extrabold text-purple-dark mb-8">Ustawienia profilu</h1>

            <form onSubmit={handleSubmit} className="space-y-6 mx-auto max-w-lg">
                
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nazwa użytkownika</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg  bg-violet-200"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg  bg-violet-200"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Numer telefonu</label>
                    <input
                        type="text"
                        name="phoneNumb"
                        value={formData.phoneNumb}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg  bg-violet-200"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1 ">Zdjęcie profilowe</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-violet-200"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-purple bg-violet-200"
                    disabled={isLoading}
                >
                    {isLoading ? 'Aktualizowanie...' : 'Zapisz zmiany'}
                </button>

                {isSuccess && <p className="text-green-600 mt-4">Dane zaktualizowano pomyślnie!</p>}
                {isError && <p className="text-red-600 mt-4">Nie udało się zaktualizować danych.</p>}

            </form>
    
            <section className="mt-10">

                <h2 className="header_element text-xl font-bold text-purple-dark mb-6">Twoje ogłoszenia</h2>

                {isUserItemsLoading && <p className="text-gray-600">Ładowanie ogłoszeń...</p>}
                {isUserItemsError && <p className="text-red-600">Wystąpił błąd podczas ładowania ogłoszeń.</p>}

                {!isUserItemsLoading && userItems.length === 0 && (
                    <p className="text-gray-500">Brak dodanych ogłoszeń.</p> //jakby nie było to...
                )}

                {!isUserItemsLoading && userItems.length > 0 && (

                    //jak są to wyświetlaj
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">

                        {userItems.map((item) => (

                            <div key={item._id} className="space-y-4">
                                <ItemCard items={[item]} />
                                
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="w-auto bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                                    disabled={isDeleting}
                                >

                                    {isDeleting ? 'Usuwanie...' : 'Usuń'}
                                </button>

                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
    
    
};



export default ProfileSettings;
