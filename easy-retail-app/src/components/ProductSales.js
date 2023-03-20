import React from 'react'
import {AiOutlineBarcode} from 'react-icons/ai'
import './ProductSearch.css'
function ProductSales() {
  
  return (
    <div className='scan--container'>
    <div className='scan--content__wrapper' >
        <div className='scan--wrapper'>
            <input 
                className='scan--input'
                type='text'
                placeholder='Scan barcode...'
                name='search'
            
            />
            <button className='scan--button'><AiOutlineBarcode/></button>
        </div>
        <hr/>
        <div>
            <p>No items found</p>
        </div>
        
    </div>
</div>
  )
}

export default ProductSales