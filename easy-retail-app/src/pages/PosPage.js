import React from 'react';
import ProductSearch from '../components/ProductSearch';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PosPage.css'

function PosPage() {


  return (
    <div className='pos--container'>
      <div className='pos--content__wrapper'>
        <ProductSearch />
        <ToastContainer />
      </div> 
    </div>
  )
}

export default PosPage