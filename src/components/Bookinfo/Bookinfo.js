import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookinfo = () => {
    const [booking, setBooking] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);


    useEffect(() =>{
        fetch('http://localhost:5000/getBooking?email='+loggedInUser.email,{
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data =>
            setBooking(data));
    }, [])
    return (
        <div>
            <h1>booking information</h1>
            {
                booking.map(booking => <h3>name:{booking.name} from: {booking.chackIn} To: {booking.chackOut}</h3>)
            }
    
        </div>
    );
};

export default Bookinfo;