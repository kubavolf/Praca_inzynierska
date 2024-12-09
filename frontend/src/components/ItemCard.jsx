import React from 'react'
import { Link } from 'react-router-dom'

const ItemCard = ({ items }) => {
    return (
        <div className='gap-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {
                items.map((item, index) => (
                    <div key={index} className='item__card'>
                        <div>
                            <Link to={`/shop/${item._id}`}>

                                <img src={`http://localhost:3000${item.image}`} alt="item image" //ścieżka do backenduu
                                className='w-full h-auto max-h-72 object-cover rounded-lg hover:scale-95 duration-500' />

                                <div>
                                    <h4 className='text-lg mt-2'>{item.name}</h4>
                                    <p className='font-bold mt-1'>{item.price + "zł"}</p>

                                    
                                </div>
                            </Link>
                        </div>

                    </div>

                )
                )
            }

        </div>
    )
}

export default ItemCard