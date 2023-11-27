import React, { useState } from "react";
import defaultUserImg from "../assets/defaultUserImg.png";
import {FaSearch} from 'react-icons/fa'
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header() {
  const [user, setUser] = useState(false)
  return (
    <nav className="flex items-center px-2 md:px-4 xl:px-20 py-4 shadow-md justify-between overflow-x-hidden">
      <div className="hidden lg:flex items-center gap-8 min-w-max">
        <h1 className="text-blue-700 md:text-3xl lg:text-4xl font-extrabold cursor-pointer">
          Flashcards
        </h1>
        <ul className="flex gap-4 md:text-base cursor-pointer font-semibold text-black mr-2">
          <li className="transition-colors duration-300 hover:text-gray-700">Home</li>
          <li className="transition-colors duration-300 hover:text-gray-700">Your resources</li>
        </ul>
      </div>
      <div className="min-w-max">
      <GiHamburgerMenu className="w-10 h-10 mr-4 flex lg:hidden"/>
      </div>
      
            <form className='bg-slate-100 p-3 rounded-lg hidden sm:flex items-center w-full lg:w-[700px] relative mx-4'>
          <input
            type='text'
            placeholder='find your resources'
            className='bg-transparent focus:outline-none'
          />
          <button className="absolute top-[50%] translate-y-[-50%] right-4">
            <FaSearch className='text-slate-600' />
          </button>
        </form>
     {user ? 
      <div className="flex gap-4 justify-end">
        <button className="bg-blue-700 transition-colors duration-300 hover:bg-blue-600 p-4 w-10 xl:w-12 h-10 xl:h-12 flex items-center text-2xl justify-center rounded-full text-white">
          +
        </button>
        <div className="w-10 xl:w-12 h-10 xl:h-12 ml-2">
        <img
          src={defaultUserImg}
          alt=""
          className="w-full rounded-full overflow-hidden cursor-pointer object-contain"
        />
        </div>
      </div>
      : <div className="flex gap-4">
        <button className="px-4 py-2 bg-white transition-colors duration-300 hover:bg-slate-100 rounded-xl">Zaloguj się</button>
        <button className="px-4 py-2 bg-yellow-300 transition-colors duration-300 hover:bg-yellow-400 rounded-xl">Zarejestruj się</button>
        </div>}
    </nav>
  );
}
