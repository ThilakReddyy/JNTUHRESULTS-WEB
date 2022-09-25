import Hr from '../Hr/Hr'
import HomeSingle from './HomeSingle'
import HomeInfo from './HomeInfo'
import HomeFooter from './HomeFooter'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Homemulti from './Homemulti'
import React,{useState} from 'react';

const Home=({homepage})=>{
  
  return (
    <>
          <br/>
          <div className="w-[75%] mx-[12.5%]">
            <Carousel showThumbs={false}>  
              <HomeSingle homepage={homepage} />
              <Homemulti homepage={homepage}/>
            </Carousel>
            
          </div>
          <HomeInfo/>
          <Hr />
          <Hr />
          <HomeFooter />
        </>
  )
}
const HomePage = () => {
  const homepage=(value )=>
  {
    console.log(value)
    setHome(value)
  }
  const [home,setHome]=useState(<Home homepage={homepage}/>)
    return (
       <> {home}</>
    )
  }
export default HomePage;