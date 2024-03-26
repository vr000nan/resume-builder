import React, { Suspense } from 'react';
import { Header, MainSpinner } from '../components';
import { Routes, Route } from 'react-router-dom';
import { Footer, HomeContainer } from '../containers';
import { CreateResume, CreateTemplate, TemplateDesignPinDetails, UserProfile } from '../pages';

const HomeScreen = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">

     {/* header */}
     <Header />
    <main className="w-full">
      <Suspense fallback={<MainSpinner/>}>
        <Routes>
          <Route path="/" element={<HomeContainer/>} />
          <Route path="/template/create" element={<CreateTemplate/>} />
          <Route path="/profile/:uid" element={<UserProfile/>} />
          <Route path="/resume/*" element={<CreateResume/>} />
          <Route path="/resumeDetail/:templateID" element={<TemplateDesignPinDetails/>} />
        </Routes>

        {/* <Footer /> */}
      </Suspense>
    </main>
    </div>
  )
}

export default HomeScreen