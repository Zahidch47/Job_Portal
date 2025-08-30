import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import { motion } from 'framer-motion'
import { Button } from './ui/button'

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [showFilter, setShowFilter] = useState(false); // mobile filter state

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        )
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4 sm:px-6 lg:px-8">
        
        {/* Mobile filter button */}
        <div className="lg:hidden mb-4 flex justify-start">
          <Button onClick={() => setShowFilter(true)} className="bg-[#7209b7] text-white">
            Filter Jobs
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Sidebar filter (desktop) */}
          <div className="hidden lg:block w-20%">
            <FilterCard />
          </div>

          {/* Job cards */}
          <div className="flex-1 h-[80vh] overflow-y-auto pb-5">
            {filterJobs.length <= 0 ? (
              <span>No Jobs Found</span>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {showFilter && (
        <div className="fixed inset-0 z-50 flex">
          {/* Dark overlay */}
          <div 
            className="fixed inset-0 bg-black/40" 
            onClick={() => setShowFilter(false)} 
          />

          {/* Slide-in filter panel */}
          <div className="relative bg-white w-72 h-full shadow-lg p-4 animate-slide-in">
            <button 
              className="absolute top-3 right-3 text-gray-500 font-bold"
              onClick={() => setShowFilter(false)}
            >
              ✕
            </button>
            <FilterCard />
          </div>
        </div>
      )}
    </div>
  )
}

export default Jobs
