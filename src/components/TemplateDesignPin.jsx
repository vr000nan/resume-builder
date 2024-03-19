import React from 'react';
import { motion } from 'framer-motion';
import { scaleInOut } from '../animations';

const TemplateDesignPin = ({ data, index }) => {
  return (
    <motion.div 
    key={data?._id}
    {...scaleInOut(index)}
    >
        <div className="w-full h-[500px] rounded-md bg-gray-200 overflow-hidden relative">
            <img 
            src={data?.imageURL} 
            alt="image url" 
            className="w-full h-full object-cover"
            />
        </div>
    </motion.div>
  )
}

export default TemplateDesignPin;