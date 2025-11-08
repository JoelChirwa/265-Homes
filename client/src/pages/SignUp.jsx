import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        setErrors(data?.message || 'Signup failed');
        return;
      }
      setErrors(null);
      navigate('/sign-in');
    } catch (error) {
      setErrors(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
       <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input type="text" placeholder="Username" className='border p-3 rounded-lg' id='username' onChange={handleChange} />
          <input type="email" placeholder="Email" className='border p-3 rounded-lg' id='email' onChange={handleChange} />
          <input type="password" placeholder="Password" className='border p-3 rounded-lg' id='password' onChange={handleChange} />
          <button disabled={loading} type="submit" className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-50'>
            {loading ? 'Loading...' : 'Sign Up'}
            </button>
       </form>
       <div className='flex mt-5 gap-2'>
        <p>Already have an account?</p>
        <Link to="/sign-in">
          <span className='text-blue-700 hover:underline'>Sign In</span>
        </Link>
       </div>
       {errors && <p className='text-red-500 mt-4'>{errors}</p>}
    </div>
  )
}

export default SignUp
