import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCamera, FiMaximize2, FiX } from 'react-icons/fi';

// An individual image component that calculates its own span based on aspect ratio
const AutoMasonryImage = ({ id, index, onClick }) => {
  // Default to a 1x1 square while loading
  const [spanClass, setSpanClass] = useState('col-span-1 row-span-1');
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    const ratio = naturalWidth / naturalHeight;

    // Automatically determine grid span based on the actual image aspect ratio
    if (ratio > 1.3) {
      // Landscape / Wide
      setSpanClass('col-span-2 row-span-1 md:col-span-2 md:row-span-1');
    } else if (ratio < 0.75) {
      // Portrait / Tall
      setSpanClass('col-span-1 row-span-2 md:col-span-1 md:row-span-2');
    } else {
      // Square / Roughly Square
      setSpanClass('col-span-1 row-span-1 md:col-span-1 md:row-span-1');
    }

    setIsLoaded(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onClick={() => onClick(id)}
      className={`relative group overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/10 cursor-pointer ${spanClass} ${!isLoaded ? 'animate-pulse bg-white/5' : ''}`}
    >
      <img 
        src={`/${id}.png`} 
        alt={`Nature Photography ${id}`}
        onLoad={handleImageLoad}
        className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 ${isLoaded ? 'opacity-60 group-hover:opacity-100' : 'opacity-0'}`}
      />
      
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-80 pointer-events-none"></div>
      
      {/* Title Text that appears on hover */}
      <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
        <span className="text-xs font-bold text-red-500 tracking-widest uppercase block mb-1">Photography</span>
        <h3 className="font-heading font-bold text-lg md:text-xl text-white">Capture #{id}</h3>
      </div>
      
      {/* Little hover icon top right */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
        <FiMaximize2 className="text-white w-4 h-4" />
      </div>
    </motion.div>
  );
};

export default function CreativePursuits() {
  const [selectedImage, setSelectedImage] = useState(null);
  
  // We have exactly 7 images: 1.png through 7.png
  const imageIds = [1, 2, 3, 4, 5, 6, 7];

  return (
    <section id="hobbies" className="relative py-12 md:py-24 bg-[#030303] border-t border-white/5 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-red-900/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-2 mb-4">
            <FiCamera className="text-red-500 w-4 h-4" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-red-500 uppercase">Beyond The Screen</span>
          </div>
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-6 text-center">
            Through My <span className="text-red-600">Lens.</span>
          </h2>
          <p className="text-gray-400 max-w-3xl text-center text-sm md:text-base leading-relaxed">
            While I spend my days crafting pixel-perfect UI/UX designs, building high-performance web applications, and integrating creative hardware tech, I spend my free time capturing the raw, unfiltered beauty of nature. Photography trains my eye for composition, lighting, and detail—skills that directly translate into my design work.
          </p>
        </div>

        {/* Masonry-Style Grid using CSS Grid + Auto-spans */}
        {/* 'grid-flow-dense' is the magic that fills in empty gaps created by varying sizes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[200px] grid-flow-dense">
          {imageIds.map((id, index) => (
            <AutoMasonryImage key={id} id={id} index={index} onClick={setSelectedImage} />
          ))}
        </div>
        

      </div>

      {/* Fullscreen Image Modal Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            {/* Dark blur background that closes modal when clicked */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-pointer"
              onClick={() => setSelectedImage(null)}
            ></motion.div>
            
            {/* The Image itself popping up */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 flex items-center justify-center"
            >
              {/* Photography Exhibition Frame / Polaroid Effect */}
              <div className="bg-[#f8f9fa] p-3 pb-10 md:p-5 md:pb-14 rounded-sm shadow-[0_30px_60px_rgba(0,0,0,0.9)] relative flex flex-col items-center">
                <div className="border border-gray-200/50 shadow-[inset_0_0_10px_rgba(0,0,0,0.05)] bg-[#111] p-[2px]">
                  <img 
                    src={`/${selectedImage}.png`} 
                    alt={`Full Screen ${selectedImage}`} 
                    className="w-auto h-auto max-w-[90vw] max-h-[75vh] object-contain pointer-events-none"
                  />
                </div>
                
                {/* Subtle Gallery Plaque Text */}
                <div className="absolute bottom-3 md:bottom-5 text-center w-full">
                  <span className="text-[10px] md:text-xs font-serif italic text-gray-500 tracking-wider">
                    Capture #{selectedImage} — Through My Lens
                  </span>
                </div>
              </div>
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 md:-right-16 md:-top-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-red-600 border border-white/20 hover:border-red-600 flex items-center justify-center text-white transition-all backdrop-blur-sm"
              >
                <FiX className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
