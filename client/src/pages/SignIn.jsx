import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';


const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { loading, error } = useSelector((state) => state.user); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        credentials: 'include', // include httpOnly cookie
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = data?.message || 'Sign in failed';
        dispatch(signInFailure(msg));
        return;
      }

      // success
      dispatch(signInSuccess(data?.user || data));
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/profile');
    } catch (err) {
      const msg = err.message || 'Sign in failed';
      dispatch(signInFailure(msg));
    } 
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder="Email" className='border p-3 rounded-lg' id='email' value={formData.email} onChange={handleChange} required />
        <input type="password" placeholder="Password" className='border p-3 rounded-lg' id='password' value={formData.password} onChange={handleChange} required />
        <button disabled={loading} type="submit" className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-50'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className='flex mt-5 gap-2'>
        <p>Don't have an account?</p>
        <Link to="/sign-up">
          <span className='text-blue-700 hover:underline'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-4'>{error}</p>}
    </div>
  )
}

export default SignIn
