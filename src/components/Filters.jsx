import React, { useState } from 'react';
import { MdLayersClear } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { slideUpDownWithScale } from '../animations';
import { FiltersData } from '../utils/helpers';

const Filters = () => {
  const [isClearHovered, setIsClearHovered] = useState(false);

  return (
    <div className="w-full flex items-center justify-start py-4">
      <div 
      className="border border-gray-300 rounded-md px-3 py-2 mr-2 cursor-pointer group hover:shadow-md bg-gray-200 relative"
      onMouseEnter={() => setIsClearHovered(true)}
      onMouseLeave={() => setIsClearHovered(false)}
      >
        <MdLayersClear className="text-xl" />

        <AnimatePresence>
         {isClearHovered && (
           <motion.div 
           {...slideUpDownWithScale}
           className="absolute -top-8 -left-2 bg-white shadow-md rounded-md px-2 py-1"
           >
             <p className="whitespace-nowrap text-xs">Clear All</p>
           </motion.div>
         )}
        </AnimatePresence>
      </div>

      <div className="w-full flex items-center justify-start overflow-x-scroll gap-6 scrollbar-none">
          {FiltersData && FiltersData.map((item) => (
            <div key={item.id} className={`border border-gray-300 rounded-md px-6 py-2 cursor-pointer group hover:shadow-md`}>
              <p className="text-sm text-txtPrimary group-hover:text-txtDark whitespace-nowrap">{item.label}</p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Filters