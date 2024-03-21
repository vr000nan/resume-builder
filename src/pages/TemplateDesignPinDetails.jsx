import React from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { getTemplateDetails } from '../api';
import { MainSpinner } from "../components"
import { FaHouse } from 'react-icons/fa6';

const TemplateDesignPinDetails = () => {
  const { templateID } = useParams();

  const { data, isError, isLoading, refetch } = useQuery(
    ["template", templateID],
    () => getTemplateDetails(templateID)
  );

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
      <div className="col-span-1 lg:col-span-8">1</div>
      {/* right section */}
      <div className="col-span-1 lg:col-span-4">2</div>
     </div>
    </div>
  );
}

export default TemplateDesignPinDetails