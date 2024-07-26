import React from 'react';
import HeroSection from '../components/HeroSection';
import './LandingPage.css';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <>
      <HeroSection data-testid="hero-section" />
      <div className='features'>
        <h1>What we offer: </h1>
        <div className='scrollable-container'>
          <div className='scrollable-img'>
            <img src={`${process.env.PUBLIC_URL}/images/Filter.png`} alt="Filter feature"></img>
            <div className="bottomleft">Filter feature</div>
          </div>
          <div className='scrollable-img'>
            <img src={`${process.env.PUBLIC_URL}/images/Admindashboard.png`} alt="Admin dashboard page"></img>
            <div className="bottomleft">Admin dashboard page</div>
          </div>
          <div className='scrollable-img'>
            <img src={`${process.env.PUBLIC_URL}/images/Bookmark.png`} alt="Bookmark feature"></img>
            <div className="bottomleft">Bookmark feature</div>
          </div>
          <div className='scrollable-img'>
            <img src={`${process.env.PUBLIC_URL}/images/Search.png`} alt="Search feature"></img>
            <div className="bottomleft">Search feature</div>
          </div>
        </div>
      </div>
      <Footer data-testid="footer" />
    </>
  )
}

export default LandingPage;
