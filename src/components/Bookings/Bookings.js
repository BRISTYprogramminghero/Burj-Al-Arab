import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookingsCollection, setBookingsCollection] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:5000/bookings?email='+ loggedInUser.email, {
            method : 'GET',
            headers : {
                'Content-Type': 'application/json',
                authorization : `Bearer ${ sessionStorage.getItem('token')} ` 
            }

        })
        .then(res => res.json())
        .then(data => setBookingsCollection(data))
    }, [])
    return (
        <div>
            <h3>You have : {bookingsCollection.length} bookings</h3>
            {
                bookingsCollection.map(book => <li key={book._id}>{book.name} from{(new Date(book.checkIn)).toDateString('dd/MM/yyyy')} to: {book.checkOut}</li>)
            }
        </div>
    );
};

export default Bookings;