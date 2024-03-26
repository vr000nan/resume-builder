import React, { useEffect, useState } from 'react';
import BannerImg from "../assets/img/bannerImg.jpeg"; 
import useUser from '../hooks/useUser';
import AnonIcon from "../assets/img/anonIcon.png";
import { AnimatePresence } from 'framer-motion';
import { TemplateDesignPin } from '../components';
import useTemplates from '../hooks/useTemplates';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const {data: user} = useUser();
  const [activeTab, setActiveTab] = useState("collections");
  const navigate = useNavigate();

  const {
    data: templates,
    isLoading: temp_isLoading,
    isError: temp_isError,
  } = useTemplates();

  useEffect(() => {
    if(!user){
      navigate("/auth", {replace: true})
    }
  })

  return (
    <div className="w-full flex flex-col items justify-start py-12">
      <div className="w-full h-72 bg-blue-50">
        <img 
          src={BannerImg} 
          alt=""
          className="w-full h-full object-cover"
        />

        <div className="flex items-center justify-center flex-col gap-4">
          {user?.photoURL ? (
            <React.Fragment>
              <img
                src={user?.photoURL}
                className="w-24 h-24 rounded-full border-2 border-white -mt-12 shadow-md"
                alt="user icon image"
                referrerPolicy='no-referrer'
                loading="lazy"
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <img
                src={AnonIcon}
                className="w-24 h-24 rounded-full border-2 border-white -mt-12 shadow-md"
                alt="user icon image"
                referrerPolicy='no-referrer'
                loading="lazy"
              />
            </React.Fragment>
          )}
          
          <p className="text-2xl text-txtDark">{user?.displayName}</p>
        </div>

        {/* tabs */}
        <div className="flex items-center justify-center mt-12">
            <div 
            className={`px-4 py-2 rounded-md flex items-center justify-center gap-2 group cursor-pointer`}
            onClick={() => setActiveTab("collections")}
            >
              <p 
              className={`text-base text-txtPrimary group-hover:text-blue-600 px-4 py-1 rounded-full 
              ${activeTab === 'collections' && 'bg-white shadow-md text-blue-600'}
              `
              }>
                Collections
              </p>
            </div>

            <div 
            className={`px-4 py-2 rounded-md flex items-center justify-center gap-2 group cursor-pointer`}
            onClick={() => setActiveTab("resumes")}
            >
              <p 
              className={`text-base text-txtPrimary group-hover:text-blue-600 px-4 py-1 rounded-full 
              ${activeTab === 'resumes' && 'bg-white shadow-md text-blue-600'}
              `
              }>
                My Resumes
              </p>
            </div>
        </div>

        {/* tab content */}
        <div className="w-full grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 px-4 py-6">
            <AnimatePresence>
              {activeTab === "collections" && (
                <React.Fragment>
                  {user?.collections.length > 0 && user?.collections ? 
                  <RenderATemplate templates={templates?.filter(temp => 
                    user?.collections?.includes(temp?._id)
                    )}/> 
                  : <div></div>
                  }
                </React.Fragment>
              )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const RenderATemplate = ({templates}) => {
  return (
    <React.Fragment>
      {templates && templates.length && (
        <React.Fragment>
          <AnimatePresence>
            {templates && templates.map((template, index) => (
              <TemplateDesignPin 
              key={template?._id} 
              data={template} 
              index={index}
              />
            ))}
          </AnimatePresence>
        </React.Fragment>
      )}
    </React.Fragment>
  )
};

export default UserProfile;