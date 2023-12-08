import { useDispatch, useSelector } from 'react-redux';
import defaultUser from '../assets/defaultUser.png';
import { useEffect, useState } from 'react';
import { resetToDefault, updateUser } from '../redux/user/userSlice';
import Status from '../components/Status';

export default function Profile() {
  const {currentUser, message, error} = useSelector(state => state.user);
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  const handleUser = ({id, value}) => {
    setUser(prev =>({
      ...prev,
      [id]: value
    }))
  }

  const addPassword = async (password) => {
    setUser(prev =>({
      ...prev,
      password: password
    }))
  }

  const handleUpdate = async() => {
    event.preventDefault();
    await addPassword();
    // setUser(prev =>({
    //   ...prev,
    //   password: password
    // }))
    dispatch(updateUser(user))
  }

  useEffect(()=>{
    dispatch(resetToDefault())
    setUser(currentUser)
  },[])

  return (
    <div className='min-h-screen bg-slate-100'>
      <div className='max-w-2xl mx-auto pt-32'>
        <h1 className='text-center font-bold text-4xl'>Profile</h1>
      <form onSubmit={handleUpdate} className='flex flex-col w-full'>
      <img src={defaultUser} className='rounded-full overflow-hidden object-cover h-24 w-24 mx-auto my-4' alt="user image" />
      <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 text-lg font-bold text-gray-900 dark:text-white"
          >
            Your Name
          </label>
          <input
            type="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            required
            value={user?.username || ''}
            onChange={(e) => handleUser({ id:"username", value: e.target.value })}
          />
        </div>
      <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-bold text-gray-900 dark:text-white"
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            required
            value={user?.email || ''}
            onChange={(e) => handleUser({ id:"email", value: e.target.value })}
          />
        </div>
      <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-bold text-gray-900 dark:text-white"
          >
            Your Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            value={user?.password || ""}
            onChange={(e) => addPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='py-4 rounded-xl text-white mt-2 bg-blue-700 hover:bg-blue-600 transition-all duration-300'>Update</button>
    <Status/>
      </form>
      </div>
    </div>
  )
}
