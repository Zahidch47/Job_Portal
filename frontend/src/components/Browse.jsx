import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { setSearchQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const { savedJobs } = useSelector(state => state.bookmark); // saved jobs from redux
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    }
  }, []);

  const sortedJobs = [
    ...savedJobs,
    ...allJobs.filter((job) => !savedJobs.some((j) => j._id === job._id)),
  ];

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8'>
        <h1 className='font-bold text-xl my-10'>
          Search Results ({allJobs.length})
        </h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {sortedJobs.map((job) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.3 }}
            >
              <Job job={job} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Browse
