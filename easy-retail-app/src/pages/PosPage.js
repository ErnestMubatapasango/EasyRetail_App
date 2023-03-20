import React from 'react'
import ProductSales from '../components/ProductSales'
import ProductSearch from '../components/ProductSearch'
import './PosPage.css'

function PosPage() {
  return (
    <div className='pos--container'>
      <div className='pos--content__wrapper'>
        <ProductSearch />
        <ProductSales /> 
      </div> 
    </div>
  )
}

export default PosPage