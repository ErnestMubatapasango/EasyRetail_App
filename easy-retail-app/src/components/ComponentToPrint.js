
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

export const ComponentToPrint = React.forwardRef((props, ref) => {
    const {cart, Subtotal,taxRate,total} = props
    return (
      <div ref={ref}>
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

                                <TableBody>
                                    {
                                        cart ? cart.map((cartProduct, key) => 
                                            <TableRow>
                                                <TableCell align='left'>{cartProduct.id}</TableCell>
                                                <TableCell align='left'>{cartProduct.name}</TableCell>
                                                <TableCell align="right">${cartProduct.price}.00</TableCell>
                                                <TableCell align="right">{cartProduct.quantity}</TableCell>
                                                <TableCell align="right">${cartProduct.totalAmount}.00</TableCell>
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
                                </TableRow>

                                <TableRow>
                                    <TableCell colSpan={2}></TableCell>
                                    <TableCell><strong>Total Amount</strong></TableCell>
                                    <TableCell align='right' colSpan={1}></TableCell>
                                    <TableCell align='right'>${total.toFixed(2)}</TableCell>
                                    <TableCell align='right'>
                                    </TableCell>
                                </TableRow>
                        </Table>
                    </TableContainer>
      </div>
    );
  });