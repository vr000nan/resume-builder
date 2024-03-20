import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeInOutWithOpacity, scaleInOut } from '../animations';
import { BiFolderPlus, BiHeart, BiSolidFolderPlus, BiSolidHeart } from "react-icons/bi";
import useUser from "../hooks/useUser";
import useTemplates from "../hooks/useTemplates"
import { saveToCollections, saveToFavorites } from '../api';

const TemplateDesignPin = ({ data, index }) => {
    const {data: user, refetch : userRefetch} = useUser();
    const { refetch: temp_Refetch } = useTemplates();
    const [isHovered, setIsHovered] = useState();

    const addToCollection = async(e) => {
        e.stopPropagation();
        await saveToCollections(user, data);
        userRefetch();
    };

    const addToFavorites = async(e) => {
        e.stopPropagation();
        await saveToFavorites(user, data);
        temp_Refetch();
    };

  return (
    <motion.div 
    key={data?._id}
    {...scaleInOut(index)}
    >
        <div 
        className="w-full h-[500px] rounded-md bg-gray-200 overflow-hidden relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
            <img 
            src={data?.imageURL} 
            alt="template thumbnail" 
            className="w-full h-full object-cover"
            />

            <AnimatePresence>
                {isHovered && (
                                   <motion.div 
                                   {...fadeInOutWithOpacity}
                                   className="absolute inset-0 bg-[rgba(0,0,0,0.4)] flex flex-col items-center justify-start px-4 py-3 z-50 cursor-pointer"
                                   >
                                       <div className="flex flex-col items-end justify-start w-full gap-8">
                                           <InnerBoxCard 
                                           label={
                                               user?.collections?.includes(data?._id)
                                                ? "Added to Collections" 
                                                : "Add to Collections"
                                               } 
                                           Icon={
                                               user?.collections?.includes(data?._id)
                                               ? BiSolidFolderPlus : BiFolderPlus
                                           } 
                                           onHandle={addToCollection}
                                           />
                   
                                           <InnerBoxCard 
                                           label={
                                               data?.favorites?.includes(user?.uid)
                                                ? "Added to Favoritess" 
                                                : "Add to Favoritess"
                                               } 
                                           Icon={
                                               data?.favorites?.includes(user?.uid)
                                               ? BiSolidHeart : BiHeart
                                           } 
                                           onHandle={addToFavorites}
                                           />
                                       </div>
                                   </motion.div>
                )}
            </AnimatePresence>

        </div>
    </motion.div>
  )
};

const InnerBoxCard = ({ label, Icon, onHandle }) => {
    const [isHovered, setIsHovered] = useState(false);

    return(
        <div onClick={onHandle} 
        className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center hover:shadow-md relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
            <Icon className="text-txtPrimary text-base" />
            <AnimatePresence>
               {isHovered && (
                 <motion.div 
                 initial={{opacity: 0, scale: 0.6, x: 50}}
                 animate={{opacity: 1, scale: 1, x: 0}}
                 exit={{opacity: 0, scale: 0.6, x: 50}}
                 className="px-3 py-2 rounded-md bg-gray-200 absolute -left-44 after:w-2 after:h-2 after:bg-gray-200 after:absolute after:-right-1 after:top-[14px] after:rotate-45"
                 >
                     <p className="text-sm text-txtPrimary whitespace-nowrap">{label}</p>
                 </motion.div>
               )}
            </AnimatePresence>
        </div>
    )
};

export default TemplateDesignPin;