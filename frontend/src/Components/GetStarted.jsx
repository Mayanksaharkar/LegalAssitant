/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";
function GetStarted() {
  return (
    <div
      className=' py-12 lg:py-24 h-screen items-center w-screen flex justify-center align-middle '
      style={{
        backgroundImage: 'url("../public/img1.jpg")',
        backgroundSize: "cover",
        backgroundBlendMode: "hard-light",
        backgroundColor: "black",
      }}
    >
      <div className='container backdrop-blur-xl shadow-2xl border border-base-100 max-w-[60%] py-7 rounded-xl flex flex-col items-center justify-center gap-4   md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-2 text-center'>
          <div className='space-y-2  text-center flex flex-col justify-center'>
            <h1 className='text-4xl font-bold tracking-tighte text-gray-950 sm:text-6xl w-full'>
              AI Powered Legal Document Assistant
            </h1>
            <p className='w-full text-gray-950 text-2xl font-semibold  max-w-[60%]  self-center'>
              Welcome to our AI-powered legal documentation assistant! Whether
              you're a seasoned legal professional or someone without any legal
              background, our platform is designed to simplify the often complex
              world of legal documents. Our goal is to empower you to create,
              understand, and manage legal documents effortlessly.
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-2 min-[400px]:flex-row'>
          <Link
            className='inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 py-6  font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50  text-xl dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
            to={"/home"}
          >
            Gets Started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GetStarted;
