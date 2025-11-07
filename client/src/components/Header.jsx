import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to="/">
          <h1 className='text-sm sm:text-3xl font-bold flex flex-wrap'>
            <span className='text-amber-700'>🏘️265</span>
            <span className='text-black-400'>Homes</span>
          </h1>
        </Link>

        <form className='bg-slate-100 p-1 rounded-lg flex items-center'>
          <input type="text" placeholder="Search..." className='bg-transparent focus:outline-none w-24 sm:w-64' />
          <FaSearch className='text-slate-500' />
        </form>

        <ul className='flex space-x-4 font-bold'>
          <Link to="/" className='hidden sm:inline text-slate-900 hover:underline'>Home</Link>
          <Link to="/about" className='hidden sm:inline text-slate-900 hover:underline'>About</Link>
          <Link to="/sign-in" className='text-slate-900 hover:underline'>Sign In</Link>
        </ul>
      </div>


    </header>
      
   
  )
}

export default Header
