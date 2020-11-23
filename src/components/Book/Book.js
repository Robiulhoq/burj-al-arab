import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import { UserContext } from '../../App';
import Bookinfo from '../Bookinfo/Bookinfo';


const Book = () => {
    const {bedType} = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedDate, setSelectedDate] = React.useState({
        chackIn: new Date(),
        chackOut: new Date()
    });
    console.log(selectedDate)

    const handleChackInDate = (date) => {
        const newDates = {...selectedDate};
        newDates.chackIn = date;
      setSelectedDate(newDates);
    };

    const handleChackOutDate = (date) => {
        const newDates = {...selectedDate};
        newDates.chackOut = date;
      setSelectedDate(newDates);
    };

    const hendleBooking = () => {
      const newBooking = {...loggedInUser, ...selectedDate};
      fetch('http://localhost:5000/addBooking', {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify(newBooking)
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
        })
      };

    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Chack In Date"
              value={selectedDate.chackIn}
              onChange={handleChackInDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Chack Out Date"
              format="dd/MM/yyyy"
              value={selectedDate.chackOut}
              onChange={handleChackOutDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
          <Button onClick={hendleBooking} variant="contained" color="primary">
                Booking now
            </Button>
        </MuiPickersUtilsProvider>
        <Bookinfo></Bookinfo>
        </div>
      
      );
      
            }


export default Book;