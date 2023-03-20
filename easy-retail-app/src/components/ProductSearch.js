import React from 'react';
import {FaSearch} from 'react-icons/fa'
import './ProductSearch.css'
function ProductSearch() {

    const [productData, setProductData] =React.useState({
        search: ""
    })

    const [products, setProducts] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(()=> {
        setIsLoading(true)
        fetch("http://localhost:5000/products")
        .then(res => res.json())
        .then(data => setProducts(data))
        console.log(products)
        setIsLoading(false)
    }, [products])

    
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
        <div className='search--content__wrapper' >
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
            <hr/>
            <div>
                {isLoading ? 'LOADING...' :   
                products ? 
                products.map((product) => {
                    return(
                        <div key={product.id} className='products'>
                            <h4>{product.name}</h4>
                            <img src={product.icons} alt=''/>
                            <p><strong>${product.price}</strong></p>
                        </div>
                    )
                })
                : <p>No items found</p>} 
            </div>
            
        </div>
    </div>
  )
}

export default ProductSearch