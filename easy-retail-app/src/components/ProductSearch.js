import React from 'react';
import {FaSearch} from 'react-icons/fa'
import './ProductSearch.css'
function ProductSearch() {

    const [productData, setProductData] =React.useState({
        search: ""
    })

    function handleChange(event){
        const {name, value} = event.target
        setProductData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }
  return (
    <div className='search--container'>
        <div className='search--wrapper'>
            <input 
                className='search--input'
                type='text'
                placeholder='Search for the product name...'
                name='search'
                value={productData.search}
                onChange={handleChange}   
            />
            <button className='search--button'><FaSearch/></button>
        </div>
    </div>
  )
}

export default ProductSearch