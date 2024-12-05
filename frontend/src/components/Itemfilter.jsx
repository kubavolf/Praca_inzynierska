import React from 'react';

const Itemfilter = ({ filtering, filtState, setFiltState, resetFilt }) => {
    return (
        <div className='space-y-5'>
            <b className='text-xl'>Filtrowanie</b>
            <button 
                onClick={resetFilt} 
                className='w-full ml-5 max-w-20 px-4 bg-violet-500 text-white rounded-full'> 
                Reset 
            </button>

            <div className='justify-center flex space-x-2'>

                {/* Kategorie */}
                <div className='hover:border-double border-4 border-violet-300 flex flex-col space-x-2 space-y-2 max-w-80'>
                    <h4 className='font-medium text-lg ml-2'>Kategorie</h4>

                    {filtering.categories.map((category) => (
                        <label key={category} className='uppercase cursor-pointer'>
                            <input 
                                type="radio" 
                                name="category" 
                                value={category}
                                checked={filtState.category === category}
                                onChange={(e) => 
                                    setFiltState(prev => ({ 
                                        ...prev, 
                                        category: e.target.value 
                                    }))
                                }
                            />
                            <span className='ml-1 mr-1'>{category}</span>
                        </label>
                    ))}
                </div>

                {/* Ceny */}
                <div className='hover:border-double border-4 border-violet-300 flex flex-col space-x-2 space-y-2 max-w-80'>
                    <h4 className='font-medium text-lg ml-2'>Ceny</h4>

                    {filtering.priceRanges.map((range) => (
                        <label key={range.label} className='capitalize cursor-pointer'>
                            <input 
                                type="radio" 
                                name="priceRange" 
                                value={`${range.min}-${range.max}`}
                                checked={filtState.priceRange === `${range.min}-${range.max}`}
                                onChange={(e) => 
                                    setFiltState(prev => ({ 
                                        ...prev, 
                                        priceRange: e.target.value 
                                    }))
                                }
                            />
                            <span className='ml-1'>{range.label}</span>
                        </label>
                    ))}

                    {/* Niestandardowy zakres cen */}
                    <div className='flex flex-col mt-4'>
                        <label>Cena od:</label>
                        <input 
                            type="number" 
                            className='border-2 border-gray-300 p-1 mt-1 mr-2'
                            placeholder='Min.'
                            value={filtState.customMinPrice || ''}
                            onChange={(e) => 
                                setFiltState(prev => ({ 
                                    ...prev, 
                                    customMinPrice: e.target.value ? parseFloat(e.target.value) : ''
                                }))
                            }
                        />

                        <label className='mt-2'>Cena do:</label>
                        <input 
                            type="number" 
                            className='border-2 border-gray-300 p-1 mt-1 mb-2 mr-2'
                            placeholder='Max.'
                            value={filtState.customMaxPrice || ''}
                            onChange={(e) => 
                                setFiltState(prev => ({ 
                                    ...prev, 
                                    customMaxPrice: e.target.value ? parseFloat(e.target.value) : ''
                                }))
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Itemfilter;
