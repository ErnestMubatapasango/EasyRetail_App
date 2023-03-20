import React from 'react'
import './HomePage.css'
import logo from '../easy-logo.png'
import { Link } from 'react-router-dom'
function HomePage() {

    const [homeData, setHomeData] = React.useState({
        email: "",
        password:""
    })

    function handleChange(event){
        const {name, value} = event.target
        setHomeData(prevHomeData => {
            return {
                ...prevHomeData,
                [name]:value
            }
        })
    }

  return (
    <div className='home--container'>
        <img src={logo} alt='' style={{width: '50%', height: '50%'}}/>
        <form>
            <input
                className='home--input'
                type='email'
                name='email'
                placeholder='Enter your email'
                value={homeData.email}
                onChange={handleChange}
            />
            <input 
                className='home--input'
                type='password'
                name='password'
                placeholder='Enter your password'
                value={homeData.password}
                onChange={handleChange}
            />
            <Link to='/pos'><button className='home--button' >Login</button></Link>
        </form>
    </div>
  )
}

export default HomePage