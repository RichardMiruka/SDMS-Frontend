import React from 'react';
import { Link } from 'react-router-dom';
import EventList from '../components/EventList';

const Home = () => {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
        <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
          <h1 className="text-3xl md:text-5xl p-2 text-yellow-300 tracking-loose">SDMS</h1>
          <h2 className="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2">Sports: The Endless Infinity</h2>
          <p className="text-sm md:text-base text-gray-50 mb-4">Create and Explore your favorite tournaments. register now to showcase talent to the World</p>
          <Link to="#" className="bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent">
            Explore Now
          </Link>
        </div>
        <div className="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3 justify-center">
          <div className="h-48 flex flex-wrap content-center">
            <div>
              <img className="inline-block mt-28 h-{12} w- hidden xl:block" src="https://plus.unsplash.com/premium_photo-1683749805319-2c481ae54bc1?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image 1" />
            </div>
            <div>
              <img className="inline-block mt-24 md:mt-0 p-8 md:p-0" src="https://user-images.githubusercontent.com/54521023/116969931-bedb0100-acd4-11eb-99a9-ff5e0ee9f31f.png" alt="Image 2" />
            </div>
            <div>
              <img className="inline-block mt-28 hidden lg:block" src="https://user-images.githubusercontent.com/54521023/116969939-c1d5f180-acd4-11eb-8ad4-9ab9143bdb50.png" alt="Image 3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;