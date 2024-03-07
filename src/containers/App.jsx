import { React, Suspense } from 'react';
import { Route, Routes } from "react-router-dom";
import { HomeScreen, Authentication } from "../pages";

import {  QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools, ReactQueryDevtoolsPanel } from "react-query/devtools";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from "react-toastify";

const App = () => {
  const queryClient = new QueryClient();

  // Suspense helps with issues with routing
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/*" element={<HomeScreen />} />
          <Route path="/auth" element={<Authentication/>} />
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" theme="dark"/>
      <ReactQueryDevtoolsPanel initialIsOpen={false}/>
    </QueryClientProvider>
  )
}

export default App;