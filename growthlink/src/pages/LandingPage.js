import React from 'react'
import HeroSection from '../components/HeroSection'
import './LandingPage.css';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <div className='features'>
        <h1>What we offer: </h1>
        <div className = 'scrollable-img'>
          <img src='https://private-user-images.githubusercontent.com/156313861/351921934-7f4aadf2-ff3e-46a4-9a30-b68b64d3fce6.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjE4Njk2MTYsIm5iZiI6MTcyMTg2OTMxNiwicGF0aCI6Ii8xNTYzMTM4NjEvMzUxOTIxOTM0LTdmNGFhZGYyLWZmM2UtNDZhNC05YTMwLWI2OGI2NGQzZmNlNi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNzI1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDcyNVQwMTAxNTZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT03ODQ3ZDRkNTE5ZjNjMWQ2OTQwOTgyNTFkZjAwYWI2NDQ1ZDdhNmVkM2NhM2VmZDUyNzlkZmNjNDJlODA5YjdkJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.aWzwH7GqEfrFqWno1QhrYgJPf39sx-0C6o-D6UgJxXI' alt="Calendar page"></img>
          <img src ='#' alt ="test1"></img>
          <img src='https://private-user-images.githubusercontent.com/156313861/351921934-7f4aadf2-ff3e-46a4-9a30-b68b64d3fce6.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjE4Njk2MTYsIm5iZiI6MTcyMTg2OTMxNiwicGF0aCI6Ii8xNTYzMTM4NjEvMzUxOTIxOTM0LTdmNGFhZGYyLWZmM2UtNDZhNC05YTMwLWI2OGI2NGQzZmNlNi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNzI1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDcyNVQwMTAxNTZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT03ODQ3ZDRkNTE5ZjNjMWQ2OTQwOTgyNTFkZjAwYWI2NDQ1ZDdhNmVkM2NhM2VmZDUyNzlkZmNjNDJlODA5YjdkJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.aWzwH7GqEfrFqWno1QhrYgJPf39sx-0C6o-D6UgJxXI' alt="Calendar page"></img>
          <img src='https://private-user-images.githubusercontent.com/156313861/351921934-7f4aadf2-ff3e-46a4-9a30-b68b64d3fce6.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjE4Njk2MTYsIm5iZiI6MTcyMTg2OTMxNiwicGF0aCI6Ii8xNTYzMTM4NjEvMzUxOTIxOTM0LTdmNGFhZGYyLWZmM2UtNDZhNC05YTMwLWI2OGI2NGQzZmNlNi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNzI1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDcyNVQwMTAxNTZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT03ODQ3ZDRkNTE5ZjNjMWQ2OTQwOTgyNTFkZjAwYWI2NDQ1ZDdhNmVkM2NhM2VmZDUyNzlkZmNjNDJlODA5YjdkJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.aWzwH7GqEfrFqWno1QhrYgJPf39sx-0C6o-D6UgJxXI' alt="Calendar page"></img>
          <img src='https://private-user-images.githubusercontent.com/156313861/351921934-7f4aadf2-ff3e-46a4-9a30-b68b64d3fce6.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjE4Njk2MTYsIm5iZiI6MTcyMTg2OTMxNiwicGF0aCI6Ii8xNTYzMTM4NjEvMzUxOTIxOTM0LTdmNGFhZGYyLWZmM2UtNDZhNC05YTMwLWI2OGI2NGQzZmNlNi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNzI1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDcyNVQwMTAxNTZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT03ODQ3ZDRkNTE5ZjNjMWQ2OTQwOTgyNTFkZjAwYWI2NDQ1ZDdhNmVkM2NhM2VmZDUyNzlkZmNjNDJlODA5YjdkJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.aWzwH7GqEfrFqWno1QhrYgJPf39sx-0C6o-D6UgJxXI' alt="Calendar page"></img>
          <img src ='#' alt ="test2"></img> 
          <img src ='#' alt ="test3"></img> 
        </div>

        <div className='ind-features'>
          <div className='addToCalendar'>
            <img src='https://private-user-images.githubusercontent.com/156313861/351921934-7f4aadf2-ff3e-46a4-9a30-b68b64d3fce6.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjE4Njk2MTYsIm5iZiI6MTcyMTg2OTMxNiwicGF0aCI6Ii8xNTYzMTM4NjEvMzUxOTIxOTM0LTdmNGFhZGYyLWZmM2UtNDZhNC05YTMwLWI2OGI2NGQzZmNlNi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNzI1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDcyNVQwMTAxNTZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT03ODQ3ZDRkNTE5ZjNjMWQ2OTQwOTgyNTFkZjAwYWI2NDQ1ZDdhNmVkM2NhM2VmZDUyNzlkZmNjNDJlODA5YjdkJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.aWzwH7GqEfrFqWno1QhrYgJPf39sx-0C6o-D6UgJxXI' alt="Calendar page" width="400px" height="400px"></img>
            <p>A calendar page where you can easily track upcoming application deadlines.</p>
          </div>
          <div className='dashboard'>
            <img src='https://private-user-images.githubusercontent.com/156313861/351921961-b3dcce76-39de-42d0-af7a-a1135ffd810c.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjE4Njk2MTYsIm5iZiI6MTcyMTg2OTMxNiwicGF0aCI6Ii8xNTYzMTM4NjEvMzUxOTIxOTYxLWIzZGNjZTc2LTM5ZGUtNDJkMC1hZjdhLWExMTM1ZmZkODEwYy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNzI1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDcyNVQwMTAxNTZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT03YjFhZGQzMjBjODBjZWU0YWQzY2E2OGQzOGIwOGY1MmRmMDE1YTBmMzVkNzc5YTMyMzJjMzIwNTMyN2E5MDFlJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.VxbHfUA-vf6XclWP1DF2j2cwdU2Z85GIwdA3QrguxB0' alt="Dashboard page" width="400px" height="400px"></img>
            <p>A dashboard to display opportunities a USER has bookmarked, or posts made by an ADMIN. </p>
          </div>
          <div className='bookmarkpage'>
            <img src='#' alt="bookmark" width="400px" height="400px"></img>
            <p></p>
          </div>
          <div className='search'>
            <img src='#' alt="search" width="400px" height="400px"></img>
            <p></p>
          </div>
          <div className='filter'>
            <img src='#' alt="filter" width="400px" height="400px"></img>
            <p></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default LandingPage
