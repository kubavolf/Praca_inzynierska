import React from 'react'
import { Link } from 'react-router-dom'

const ItemCard = ({ items }) => {
    return (
        <div className='gap-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {
                items.map((item, index) => (
                    <div key={index} className='item__card'>
                        <div>
                            <Link to={`/shop/${item.id}`}>
                                <img src={item.image} alt="item image" className='max-h-96 md:h-64 w-full object-cover hover:scale-95 duration-500' />
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