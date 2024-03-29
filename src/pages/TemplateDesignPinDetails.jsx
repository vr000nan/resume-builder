import React from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { getTemplateDetails, saveToCollections, saveToFavorites } from '../api';
import { MainSpinner, TemplateDesignPin } from "../components"
import { FaHouse } from 'react-icons/fa6';
import { BiFolderPlus, BiHeart, BiSolidFolderPlus, BiSolidHeart } from 'react-icons/bi';
import useUser from '../hooks/useUser';
import useTemplates from '../hooks/useTemplates';
import { DiscoverBg } from '../assets';
import { AnimatePresence } from 'framer-motion';

const TemplateDesignPinDetails = () => {
  const { templateID } = useParams();

  const { data, isError, isLoading, refetch } = useQuery(
    ["template", templateID],
    () => getTemplateDetails(templateID)
  );

  const { data:user, refetch: userRefetch } = useUser();

  const {data: templates, refetch: temp_refetch, isLoading: temp_isLoading} = useTemplates();

  const addToCollection = async (e) => {
    e.stopPropagation();
    await saveToCollections(user, data);
    userRefetch();
  };

  const addToFavorites = async (e) => {
    e.stopPropagation();
    await saveToFavorites(user, data);
    temp_refetch();
    refetch();
  }

  if(isLoading) return <MainSpinner />

  if(isError){
    return (
      <div className="w-full h-[60vh] flex fex-col items-center justify-center">
        <p className="text-lg text-txtPrimary font-semibold">Error while fetching the data... Please try again later!</p>
      </div>
    );
  };

  return(
    <div className="w-full flex items-center justify-start flex-col px-4 py-12">
      {/* bread crumb */}
      <div className="w-full flex items-center pb-8 gap-2">
        <Link
        to={"/"}
        className="flex items-center justify-center gap-2 text-txtPrimary"
        >
          <FaHouse /> Home
        </Link>
        <p>/</p>
        <p>{data.name}</p>
      </div>

     {/* design main section layout */}
     <div className="w-full grid grid-cols-1 lg:grid-cols-12">
      {/* left section */}
      <div className="col-span-1 lg:col-span-8 flex-col items-start justify-start gap-4">
        {/* load */}
        <img 
        className="w-full h-auto object-contain rounded-md"
        src={data?.imageURL} 
        alt="Template Image"
        />

        {/* title and other options */}
        <div className="w-full flex flex-col items-start justify-start gap-2">
          {/* title section */}
          <div className="w-full flex items-center justify-between">
            {/* title */}
            <p className="text-base text-txtPrimary font-semibold">
              {data?.title}
            </p>

            {/* likes */}
            {data?.favorites?.length > 0 && (
            <div className="flex items-center justify-center gap-1">
              <BiHeart className="text-base text-red-500" />
              <p className="text-base text-txtPrimary font-semibold">{data?.favorites?.length} likes</p>
            </div>
            )}



            {/* collection favorite options */}
            {user && (
              <div className="flex items-center justify-center gap-3">
                {user?.collections?.includes(data?._id) ? 
                <React.Fragment>
                  <div 
                  onClick={addToCollection}
                  className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-200 cursor-pointer"
                  >
                    <BiSolidFolderPlus className="text-base text-txtPrimary" />
                    <p 
                    className="text-sm text-txtPrimary whitespace-nowrap"
                    >
                      Remove From Collections
                    </p>
                  </div>
                </React.Fragment>
                :
                <React.Fragment>
                <div 
                onClick={addToCollection}
                className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-200 cursor-pointer"
                >
                  <BiFolderPlus className="text-base text-txtPrimary" />
                  <p 
                  className="text-sm text-txtPrimary whitespace-nowrap"
                  >
                    Add To Collections
                  </p>
                </div>
                </React.Fragment>
                }
              </div>
            )}

            {data?.favorites?.includes(user?.uid) ? 
                <React.Fragment>
                  <div 
                  onClick={addToFavorites}
                  className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-200 cursor-pointer"
                  >
                    <BiSolidHeart className="text-base text-txtPrimary" />
                    <p 
                    className="text-sm text-txtPrimary whitespace-nowrap"
                    >
                      Remove From Favorites
                    </p>
                  </div>
                </React.Fragment>
                :
                <React.Fragment>
                <div 
                onClick={addToFavorites}
                className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-200 cursor-pointer"
                >
                  <BiHeart className="text-base text-txtPrimary" />
                  <p 
                  className="text-sm text-txtPrimary whitespace-nowrap"
                  >
                    Add To Favorites
                  </p>
                </div>
                </React.Fragment>
                }
              </div>
            
          </div>

          
        </div>


      {/* right section */}
      <div className="col-span-1 lg:col-span-4 w-full flex flex-col items-center justify-start px-3 gap-6">
        {/* discover more */}
        <div 
        className="w-full h-72 bg-blue-200 rounded-md overflow-hidden relative"
        style={{
          background: `url(${DiscoverBg})`,
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
            <Link 
            to={"/"}
            className="px-4 py-2 rounded-md border-2 border-gray-50 text-white"
            >
              Discover More
            </Link>
          </div>
        </div>

        {/* edit the template */}
        {user && (
          <Link
          className="w-full px-4 py-3 rounded-md flex items-center justify-center bg-emerald-500 cursor-pointer"
          to={`/resume/${data?.name}?templateId=${templateID}`}
          >
            <p className="text-white font-semibold text-lg">Edit This Template</p>
          </Link>
        )}

        {/* tags */}
        {/* come back and fix when he scrolls down */}
        <div className="w-full flex items-center justify-start flex-wrap gap-2">
          {data?.tags?.map((tag, index) => {
            return(
            <p
            className="text-xs border border-gray-300 px-2 py-1 rounded-md whitespace-nowrap"
            key={index}
            >
              {tag}
            </p>
          )})}
        </div>

         
      </div>
      </div>

     {/* similar templates */}
      {templates?.filter((temp) => temp._id !== data?._id).length > 0 && (
        <div className="w-full py-8 flex flex-col items-start justify-start gap-4">
          <p className="text-lg font-semibold text-txtDark">You might also like</p>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
            <React.Fragment>
                <AnimatePresence>
                  {templates
                  ?.filter((temp) => temp._id !== data?._id)
                  .map((template, index) => (
                    <TemplateDesignPin 
                    key={template?._id} 
                    data={template} 
                    index={index}
                    />
                  ))}
              </AnimatePresence>
            </React.Fragment>
          </div>
        </div>
      )}


     </div>
  );
}

export default TemplateDesignPinDetails