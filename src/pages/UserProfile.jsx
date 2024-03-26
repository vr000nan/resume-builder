import React from 'react';
import BannerImg from "../assets/img/bannerImg.jpeg"; 
import useUser from '../hooks/useUser';
import AnonIcon from "../assets/img/anonIcon.png";

const UserProfile = () => {
  const {data: user} = useUser();

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
      </div>
    </div>
  );
}

export default UserProfile;