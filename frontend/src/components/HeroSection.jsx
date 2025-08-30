import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '@/redux/jobSlice';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchQuery(query));
    navigate("/browse")
  }

  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10 px-4'>
        <span className='px-4 py-2 bg-gray-100 text-[#F83002] font-medium rounded-full mx-auto'>
          No. 1 job Hunt Website
        </span>

        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold'>
          Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
        </h1>

        <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
          Discover thousands of opportunities tailored to your skills.
          Connect with top recruiters, apply instantly, and take the next step
          toward building a successful career!
        </p>

        {/* Responsive search box */}
        <div className='flex w-full sm:w-[80%] md:w-[60%] lg:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-2 sm:gap-4 mx-auto'>
          <input
            type="text"
            placeholder='Find your dream job'
            onChange={(e) => setQuery(e.target.value)}
            className='outline-none border-none w-full px-2 py-2 text-sm sm:text-base'
          />
          <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] px-4 sm:px-6">
            <Search className='h-5 w-5' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
