import React from 'react'
import './Events.css'

const Events = () => {
  return (
    <>
    <div className='cards'>
      <h1>Check out these Recruitment Opportunities!</h1>
    </div>
    <div className="container" id="postings">
      <div className="postings">
        <div class = "posting">
          <h3>FOW OGL</h3>
          <p>Application period: 06.06.2024 - 16.06.2024</p>
          <p>Freshmen Orientation Week (FOW) is an orientation camp under SOC. </p>
          <p>Contact: @abcdef (Telegram)</p>
          <button>Add to calendar</button>
          <button>Sign up</button>
        </div>
        <div className = "posting">
          <h3>NUSSU Life Cell</h3>
          <p>Application period: 01.07.2024 - 10.07.2024</p>
          <p>NUSSU Life Cell is... </p>
          <p>Contact: @higjkl (Telegram)</p>
          <button>Add to calendar</button>
          <button>Sign up</button>
        </div>
        <div className = "posting">
          <h3>Central Library student assistant</h3>
          <p>Application period: 18.08.2024 - 25.08.2024</p>
          <p>Central Library is recruiting students for... </p>
          <p>Contact: @mnskdp (Telegram)</p>
          <button>Add to calendar</button>
          <button>Sign up</button>
        </div>
        <div className = "posting">
          <h3>SOC Computing Club</h3>
          <p>Application period: 18.08.2024 - 25.08.2024</p>
          <p>SOC Computing Club is... </p>
          <p>Contact: @sadjasio (Telegram)</p>
          <button>Add to calendar</button>
          <button>Sign up</button>
        </div>
      </div>  
    </div>
    </>
  )
}

export default Events
