import React from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { getTemplateDetails, saveToCollections, saveToFavorites } from '../api';
import { MainSpinner } from "../components"
import { FaHouse } from 'react-icons/fa6';
import { BiFolderPlus, BiHeart, BiSolidFolderPlus, BiSolidHeart } from 'react-icons/bi';
import useUser from '../hooks/useUser';
import useTemplates from '../hooks/useTemplates';

const TemplateDesignPinDetails = () => {
  const { templateID } = useParams();

  const { data, isError, isLoading, refetch } = useQuery(
    ["template", templateID],
    () => getTemplateDetails(templateID)
  );

  const { data:user, refetch: userRefetch } = useUser();

  const {data: template, refetch: temp_refetch, isLoading: temp_isLoading} = useTemplates();

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
      </div>


      {/* right section */}
      <div className="col-span-1 lg:col-span-4">2</div>
     </div>
  );
}

export default TemplateDesignPinDetails