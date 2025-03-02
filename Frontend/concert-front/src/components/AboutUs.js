import React from 'react';
import Navbar from './Navbar';

const AboutUs = () => {
  return (<div>
    <Navbar/>
    <div className="about-us-container" style={{ padding: '20px', textAlign: 'center' }}>
      <h1>About Us</h1>
      <p>
        Welcome to our Concert Ticket Booking platform, where music lovers and concert enthusiasts can easily discover and book tickets for their favorite upcoming events! 
        Our mission is to make the concert-going experience seamless, allowing you to quickly find and secure your tickets for unforgettable performances.
      </p>
      <p>
        For Users: Our platform offers a smooth, user-friendly experience. You can browse through a wide range of upcoming concerts, check event details, and book tickets instantly.
        Whether you're into rock, pop, jazz, or classical music, we've got you covered with all the latest shows. Simply create an account, browse through the concerts, and book your tickets in a few clicks.
      </p>
      <p>
        For Admins: As an administrator, you have the power to add upcoming events to our platform, ensuring that your concerts are available to music fans worldwide. 
        Our intuitive admin panel allows you to manage events, view bookings, and keep track of ticket sales with ease.
      </p>
      <p>
        Join us today and never miss out on the next big concert in town!
      </p>
    </div></div>
  );
};

export default AboutUs;
