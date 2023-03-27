import React from 'react';
import {FaSearch} from 'react-icons/fa';
import {AiOutlineBarcode} from 'react-icons/ai';
import {MdDeleteForever} from 'react-icons/md';
import './ProductSearch.css';

import { toast } from 'react-toastify';

//print the items in our products state
import {useReactToPrint} from 'react-to-print';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button} from '@mui/material';
import { ComponentToPrint } from './ComponentToPrint';

function ProductSearch(){

    const [productData, setProductData] =React.useState({
        search: ""
    })

    const [products, setProducts] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [cart, setCart] =React.useState([])
    const [totalAmount,  setTotalAmount] =React.useState(0)

    let Subtotal = totalAmount;
    let taxRate = (0.07 * Subtotal).toFixed(2);
    let total = totalAmount + parseFloat(taxRate);

    const componentRef = React.useRef();

    React.useEffect(()=> {
        setIsLoading(true)
        fetch("http://localhost:5000/products")
        .then(res => res.json())
        .then(data => setProducts(data))
     
        setIsLoading(false)
    }, [])

    React.useEffect(()=> {
        let newTotalAmount = 0;
        cart.forEach( itemInCart => {
            newTotalAmount = newTotalAmount + parseInt(itemInCart.totalAmount);

        })
        setTotalAmount(newTotalAmount);

    }, [cart])

    function handleChange(event){
        const {name, value} = event.target
        setProductData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

  const addToCart = async (product) => {
    //check if product being added exists on cart
    let findProductInCart = cart.find( i => {
        return i.id === product.id
    })

    if(findProductInCart){
        let newCart = [];
        let newItem;

        cart.forEach(cartItem => {
             if(cartItem.id === product.id){
                newItem = {
                    ...cartItem,
                    quantity: cartItem.quantity + 1,
                    totalAmount: cartItem.price * (cartItem.quantity + 1)
                }
                newCart.push(newItem);
             }
             else{
                newCart.push(cartItem);
             }
        })
        setCart(newCart, toast(`added ${newItem.name} to cart`)); 
    }
    else{
        let addProductToCart = {
            ...product,
            'productDescription': product.name,
            'quantity': 1,
            'totalAmount': product.price
        }
        setCart(prevCart => ([
            ...prevCart,
            addProductToCart
           
        ]))
        toast(`added ${product.name} to cart`)
    }
  }

  const removeFromCart = async(product) => {
    const cartData = cart.filter(cartItem => cartItem.id !== product.id);
    setCart(cartData);
  }

  const cancelTransaction = ()=> {
    setCart(cart => []);
  }

const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
})

const handlePrint = () =>{  
handleReactToPrint()
};
  

  return (
    <div className='pos--container'>
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
                <div className='product--container'>
                    {isLoading ? 'LOADING...' :   
                    products ? 
                    products.map(product => {
                        return(
                            
                            <div key={product.id} className='product' onClick={() => addToCart(product)}>
                                <h5>{product.name}</h5>
                                <img src={product.icons} className='product--image' alt=''/>
                                <p><strong>${product.price}</strong></p>
                            </div>
                        
                        )
                    })
                    : <p>No items found</p>} 
                </div>
                
            </div>
        </div>

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
                    <div style={{display: 'none'}}>
                        <ComponentToPrint 
                            cart={cart} 
                            ref={componentRef}
                            Subtotal={Subtotal}
                            taxRate = {taxRate}
                            total={total}
                        />
                    </div>
                    <TableContainer>
                        <Table sx={{ minWidth: 550 }} aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left'>
                                        ID
                                    </TableCell>
                                    <TableCell align='left'>
                                        Product
                                    </TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Qty.</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>

                                <TableBody >
                                    {
                                        cart ? cart.map((cartProduct, key) => 
                                            <TableRow>
                                                <TableCell align='left'>{cartProduct.id}</TableCell>
                                                <TableCell align='left'>{cartProduct.name}</TableCell>
                                                <TableCell align="right">${cartProduct.price}.00</TableCell>
                                                <TableCell align="right">{cartProduct.quantity}</TableCell>
                                                <TableCell align="right">${cartProduct.totalAmount}.00</TableCell>
                                                <TableCell align="right">
                                                    <Button  onClick={() => removeFromCart(cartProduct)}><MdDeleteForever size={'25px'} /></Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                        : 'No items found'
                                    }
                                </TableBody>
                                
                                <TableRow>
                                    <TableCell colSpan={2}></TableCell>
                                    <TableCell><strong>Subtotal</strong></TableCell>
                                    <TableCell align='right' colSpan={1}></TableCell>
                                    <TableCell align='right'>${Subtotal.toFixed(2)}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell colSpan={2}></TableCell>
                                    <TableCell><strong>Tax</strong></TableCell>
                                    <TableCell align='right' colSpan={1}>7%</TableCell>
                                    <TableCell align='right'>${taxRate}</TableCell>
                                    <TableCell align='right'>
                                        <Button style={{color:'white', backgroundColor:'red'}} onClick={() => cancelTransaction()}>VOID</Button>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell colSpan={2}></TableCell>
                                    <TableCell><strong>Total Amount</strong></TableCell>
                                    <TableCell align='right' colSpan={1}></TableCell>
                                    <TableCell align='right'>${total.toFixed(2)}</TableCell>
                                    <TableCell align='right'>
                                        <Button 
                                            style={{color:'white', backgroundColor:'lightgreen'}}
                                            onClick={handlePrint}
                                        >
                                            PAY
                                        </Button>
                                    </TableCell>
                                </TableRow>
                        </Table>
                    </TableContainer>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default ProductSearch