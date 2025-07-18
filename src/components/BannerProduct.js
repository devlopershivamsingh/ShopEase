import React, { useEffect, useState } from 'react';
import image1 from '../assest/banner/banner1.jpg';
import image3 from '../assest/banner/banner4.jpg';

const offersDesktop = [
  image1,
  image3,
];

export const BannerProduct = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide effect
  useEffect(() => {
    // Only set interval if not hovered
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentBannerIndex(prev =>
          prev === offersDesktop.length - 1 ? 0 : prev + 1
        );
      }, 2000); // Slide every 3 seconds


      return () => clearInterval(interval);
    }
  }, [isHovered, offersDesktop.length]); // Add dependencies

  const handlePrevClick = () => {
    setCurrentBannerIndex(prev =>
      prev === 0 ? offersDesktop.length - 1 : prev - 1
    );
  };

  const handleNextClick = () => {
    setCurrentBannerIndex(prev =>
      prev === offersDesktop.length - 1 ? 0 : prev + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentBannerIndex(index);
  };

  return (
    <div
      className="relative w-full max-w-7xl mx-auto rounded-lg overflow-hidden shadow-lg mb-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-[250px] object-scale-down  sm:aspect-[16/5] md:aspect-[16/4] overflow-hidden">
        {offersDesktop.map((offer, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentBannerIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={offer}
              alt={`Promotional offer ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevClick}
          aria-label="Previous slide"
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNextClick}
          aria-label="Next slide"
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicators */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
          {offersDesktop.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                index === currentBannerIndex ? 'bg-white w-4 sm:w-5' : 'bg-gray-300 bg-opacity-50 hover:bg-opacity-100'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};