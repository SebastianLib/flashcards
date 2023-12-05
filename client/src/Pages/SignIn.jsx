import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signinUser } from '../redux/user/userSlice';
import { Navigate } from 'react-router-dom';
import { getFlashcards } from '../redux/flashcards/flashcardsSlice';

export default function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {currentUser, loading, error, status} = useSelector((state) => state.user)
  const {flashcards} = useSelector((state) => state.flashcards)
  const dispatch = useDispatch();

  if(currentUser) return <Navigate to="/home"/>

  const handleSubmit = (e) => { 
    e.preventDefault();
    dispatch(signinUser({ email, password }));
   }

  return (
    <div className="h-screen flex items-center">
      <form
        onSubmit={handleSubmit}
        className="md:min-w-[400px] mx-auto border py-8 px-12 rounded-xl"
      >
        <h1 className="text-center text-2xl mb-4">Sign In</h1>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-80"
          disabled={loading}
        >
          Submit
        </button>
        {status? <p className="mt-2">{status}</p> : null}
        {error? <p className="mt-2">{error}</p> : null}
      </form>
    </div>
  )
}
