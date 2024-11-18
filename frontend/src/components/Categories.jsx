import React from 'react'
import projekty from "../assets/projekty.png"
import smd from "../assets/smd.png"
import urzadzenia_przenosne from "../assets/urzadzenia_przenosne.png"
import urzadzenia_stolowe from "../assets/urzadzenia_stolowe.png"
import { Link } from 'react-router-dom'

const Categories = () => {

    const categories = [
        { name: 'ELEMENTY SMD&THT', path: 'SMD', image: smd },
        { name: 'PROJEKTY', path: 'Projekty', image: projekty},
        { name: 'URZĄDZENIA PRZENOŚNE', path: 'Urządzenia Przenośne', image: urzadzenia_przenosne},
        { name: 'URZĄDZENIA STOŁOWE', path: 'Urządzenia Stołowe', image: urzadzenia_stolowe} 
    ]



    return (
        <>
            <div className='categories_grid_element'>
                {
                    categories.map((category) => (
                        <Link key ={category.name}  to={`/categories/${category.path}`} className='categories_element hover:bg-violet-400 rounded-xl'>
                            <img src={category.image} alt={category.name} />
                            <h4>{category.name}</h4>
                        </Link>
                    ))


                }

            </div>
        </>
    )
}

export default Categories