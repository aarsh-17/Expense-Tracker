import React from "react";
import budgetImg from "../assets/image.png"; // update path if needed
import { useNavigate } from "react-router-dom";

const Home = ({openLogin}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-purple-300 font-sans px-[100px]">
      <div className="border-b border-gray-200 rounded-3xl border-[3px] mt-10 h-[800px] bg-white">
      <nav className="flex justify-end items-center gap-10 p-6 text-lg font-medium text-gray-800 pr-[100px] pt-[50px]">
        <a href="/" className="hover:text-blue-600">Home</a>
        <a href="#" className="hover:text-blue-600">Service</a>
        <a href="#" className="hover:text-blue-600">About</a>
        <a href="#" className="hover:text-blue-600">Contact</a>
        <button
        onClick={()=>navigate("/login")}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Login
      </button>
      </nav>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-10 gap-[50px]">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
          <img
            src={budgetImg}
            alt="Budget Illustration"
            className="w-[800px] h-[500px]"
          />
        </div>

        {/* Right: Text + Button */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            BUDGET <span className="text-blue-600">TRACKING</span>
          </h1>
          <p className="text-gray-600 mb-6 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel mattis velit.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded shadow"
          >
            READ MORE
          </button>
        </div>
      </div>
      </div>
      {/* Navigation */}
      
    </div>
  );
};

export default Home;
