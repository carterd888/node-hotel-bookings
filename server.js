const express = require("express");
const cors = require("cors");

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");
const { allowedNodeEnvironmentFlags } = require("process");
const { response } = require("express");

app.get("/", function(request, response){
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});
// TODO add your routes and helper functions here:

//read all bookings
app.get("/bookings", function(request, response) {
  response.json(bookings);
})

//read booking by ID
app.get("/bookings/:id", (request, response) => {
  const { id } = request.params;
  const foundBooking = bookings.find((booking) => booking.id == id);
if(foundBooking) {
  response.json(foundBooking);
} response.sendStatus(404);
});


//deletes booking by ID
app.delete("/bookings/:id", function(request, response) {
  const { id } = request.params;
  const foundBooking = bookings.find((booking) => booking.id == id);
  if(foundBooking) {
    bookings.forEach(function(booking, index) {
      if (booking.id == id) {
        bookings.splice(index, 1);
      } 
    });
    response.json({ success: true });
  } response.sendStatus(404);
});


//creates booking
app.post("/bookings", function(request, response) {
  let booking = request.body;
if (
  booking.id &&
  booking.roomId &&
  booking.title &&
  booking.firstName &&
  booking.surname &&
  booking.email &&
  booking.checkInDate &&
  booking.checkOutDate
) {
  bookings.push(booking);
  response.json({ success: true }); 
} response.sendStatus(400);
});


const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
