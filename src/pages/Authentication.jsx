import React, { useEffect } from 'react';
import { Logo } from "../assets";
import { Footer } from '../containers';
import { AuthButtonWithProvider, MainSpinner } from '../components';

import { FaGoogle, FaGithub } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

const Authentication = () => {
  const { data, isLoading, isError } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if(!isLoading && data) {
      navigate("/", { replace: true });
    }
  }, [isLoading, data])

  if(isLoading){
    // make sure this is working, 1.55.00
    return <MainSpinner />
  }

  return (
    <div className="auth-section">
      {/* top section */}
      <img src={ Logo } className="w-12 h-auto object-contain" alt="Logo" />

      {/* main section */}
      <div className="w-full flex flex-1 flex-col items-center justify-center gap-6">
        <h1 className="text-3xl lg:tect-4xl text-blue-700">Welcome to Vrésumé</h1>
        <p className="text-base text-gray-600">The Very Best Venue for Making Résumés!</p>
        <h2 className="text-2xl text-gray-600">Please Sign In.</h2>
        <div className="w-full lg:w-96 rounded-md p-2 flex flex-col items-center justify-start gap-6">
          <AuthButtonWithProvider Icon={FaGoogle} label={"Sign In With Google"} provider={"GoogleAuthProvider"}/>
          <AuthButtonWithProvider Icon={FaGithub} label={"Sign In With Github"} provider={"GithubAuthProvider"}/>
        </div>
      </div>

      {/* footer section */}
      <Footer/>
    </div>
  )
}

export default Authentication;