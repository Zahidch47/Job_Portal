import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { setSearchQuery } from '@/redux/jobSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const category = [
  "Software Developer", 
  "Frontend Developer",
  "Backend Developer",
  "FullStack Developer",
  "Data Science",
  "Python Developer",
  "AI/ML Developer",
  "Graphic Designer",
  "UI/UX Designer"
]

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browse")
  }

  return (
   <div className="relative w-full max-w-6xl mx-auto my-10 px-6">
      <Carousel>
        <CarouselContent className="flex gap-4">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full whitespace-nowrap w-full"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Center aligned arrows */}
        <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
