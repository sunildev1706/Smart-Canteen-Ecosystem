import React from "react";
import { useNavigate } from "react-router-dom";
import {  FaUtensils,FaArrowRight} from "react-icons/fa";

function Welcome() {
  const navigate = useNavigate();

  return (
    <>
      <header>
      </header>
      <main>
        <div className="font-serif  py-2 min-h-screen flex flex-col text-6xl items-center justify-center bg-gray-200 ">
          <div className="flex   items-center gap-3">
            <div className="bg-black p-3 rounded-full shadow-lg">
              <FaUtensils className="text-violet-600 text-4xl" />
            </div>
            
            <h1 className="text-4xl font-serif text-black animate-bounce">
                Canteen<span className="text-violet-500">OS</span>
            </h1>
            </div>
              <p className="mt-4 text-violet-600 text-xl animate-pulse">
                Making Food Ordering Smarter
              </p>
            <div className="flex py-8 gap-4 text-lg">

              <button
                onClick={() => navigate("/user/login")}
                className="flex items-center  bg-white text-black px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition duration-200"
              >
                Login <FaArrowRight />
              </button>

              <button
                onClick={() => navigate("/user/signup")}
                className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition duration-200"
              >
                Signup <FaArrowRight />
              </button>
            </div>
        </div>
      </main>
      <footer>
        <div className="flex justify-center items-center p-5 bg-white dark:bg-gray-800 shadow-inner">
          <div className="text-sm font-light pb-5 text-blue-600 text-center">
            <p>© 2026 Kryon Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Welcome;