import React from 'react'
import Categories from '../components/Categories';
import HeroSlider from '../components/HeroSlider';
import NewestProducts from '../components/NewestProducts';

const Home = () => {
  return (
    <>
    <HeroSlider />
    <Categories />
    <NewestProducts bgcolor={"#f7f7f7"} />
    </>
  )
}

export default Home