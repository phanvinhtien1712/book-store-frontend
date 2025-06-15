import React, { useEffect, useRef } from 'react'
import Banner from './Banner.jsx'
import TopSellers from './TopSellers.jsx'
import Recommened from './Recommened.jsx'
import News from './News.jsx'
import gsap from 'gsap'

const Home = () => {
  const homeRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      homeRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={homeRef}>
      <Banner/>
      <TopSellers/>
      <Recommened/>
      <News/>
    </div>
  )
}

export default Home