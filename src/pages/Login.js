import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {fetchAddToCartCount,userdetails} = useContext(Context);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Handler function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  // Handler function for input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setLoginData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  // Handler function for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(summaryApi.signIn.url, {
        credentials: "include", // Include cookies in request
        method: summaryApi.signIn.method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData),
      });

      const dataApi = await response.json();
      console.log("dataapi in login page of frontend",dataApi);
      if (dataApi.success) {
        toast.success(dataApi.message);
        // Store the token in localStorage
        // console.log("dataof login Api",dataApi.data);
        localStorage.setItem('token', dataApi.token); // Assuming the token is in data.token
        navigate('/');
        userdetails();
        fetchAddToCartCount();
        // console.log("generalContext contains", generalContext.userdetails());
      } else {
        toast.error(dataApi.message);
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
      console.error(err);
    }
  };
  // return (
  //   <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
  //     <div className="m-10 bg-white p-8 rounded-lg shadow-2xl w-full max-w-md transform transition-transform duration-500 hover:scale-105">
  //       <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center animate-fadeIn">Login</h1>
  //       <form className="space-y-4" onSubmit={handleSubmit}>
  //         <div>
  //           <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">Email</label>
  //           <input
  //             type="email"
  //             id="email"
  //             value={loginData.email}
  //             onChange={handleChange}
  //             placeholder="Enter your email"
  //             required
  //             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 hover:shadow-lg"
  //           />
  //         </div>
  //         <div className="relative">
  //           <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">Password</label>
  //           <input
  //             type={showPassword ? "text" : "password"}
  //             id="password"
  //             value={loginData.password}
  //             onChange={handleChange}
  //             placeholder="Enter your password"
  //             required
  //             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 hover:shadow-lg pr-12"
  //           />
  //           <button
  //             type="button"
  //             onClick={togglePasswordVisibility}
  //             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
  //           >
  //             {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
  //           </button>
  //           <Link to={'/forgot_password'} className='underline text-red-500 mt-4'>
  //             Forgot password?
  //           </Link>
  //         </div>

  //         <button
  //           type="submit"
  //           className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 transform hover:scale-105"
  //         >
  //           Login
  //         </button>
  //       </form>
  //       <p className="mt-4 text-center text-gray-600 text-sm">
  //         Don't have an account? <Link to="/sign-up" className="text-blue-500 hover:underline hover:text-blue-600 transition-colors duration-300">Sign Up</Link>
  //       </p>
  //     </div>
  //   </section>
  // );
  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 px-4 pt-32">
      <div className="w-full max-w-sm">
        {/* Main Card - Square Design */}
        <div className="bg-white/95 backdrop-blur-sm p-8 shadow-2xl border border-white/20 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl relative overflow-hidden">

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/10 transform rotate-45"></div>
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-blue-400/10 transform rotate-45"></div>

          {/* Header Section */}
          <div className="text-center mb-8 relative z-10">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 mb-4 shadow-lg relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-500 opacity-20"></div>
              <svg className="w-7 h-7 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-gray-600 text-sm font-medium">Sign in to your account</p>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mt-3"></div>
          </div>

          {/* Form Section */}
          <div className="space-y-6 relative z-10">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-gray-700 text-xs font-semibold tracking-wide uppercase">
                Email Address
              </label>
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  value={loginData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3 py-3 border-2 border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-gray-300 font-medium bg-white/80 backdrop-blur-sm"
                />
                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-gray-700 text-xs font-semibold tracking-wide uppercase">
                Password
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={loginData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full px-3 py-3 pr-10 border-2 border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-gray-300 font-medium bg-white/80 backdrop-blur-sm"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors duration-200 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="text-lg" /> : <Eye className="text-lg" />}
                </button>
                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 font-semibold text-base hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="flex items-center justify-center relative z-10">
                Sign In
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center relative z-10">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-4"></div>
            <p className="text-gray-600 text-xs font-medium">
              Don't have an account?{' '}
              <a
                href="/sign-up"
                className="text-blue-500 hover:text-blue-600 font-semibold transition-colors duration-200 hover:underline"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2">
            <div className="w-8 h-px bg-blue-400 opacity-60"></div>
            <div className="w-3 h-3 bg-blue-500 transform rotate-45"></div>
            <div className="w-8 h-px bg-blue-400 opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );

}

export default Login;













// import React, { useState } from 'react';


// const Login = () => {

//   const [showPassword, setShowPassword] = useState(false);
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });


//   const togglePasswordVisibility = () => {
//     setShowPassword(prev => !prev);
//   };

//   const handleChange = (e) => {

//     const { id, value } = e.target;
//     setLoginData(prevData => ({
//       ...prevData,
//       [id]: value
//     }));

//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Login data:", loginData);
//   };


//   return (
//     <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 px-4 pt-32">
//       <div className="w-full max-w-sm">
//         {/* Main Card - Square Design */}
//         <div className="bg-white/95 backdrop-blur-sm p-8 shadow-2xl border border-white/20 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl relative overflow-hidden">

//           {/* Decorative Elements */}
//           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>
//           <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/10 transform rotate-45"></div>
//           <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-blue-400/10 transform rotate-45"></div>

//           {/* Header Section */}
//           <div className="text-center mb-8 relative z-10">
//             <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 mb-4 shadow-lg relative">
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-500 opacity-20"></div>
//               <svg className="w-7 h-7 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//               </svg>
//             </div>
//             <h1 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">Welcome Back</h1>
//             <p className="text-gray-600 text-sm font-medium">Sign in to your account</p>
//             <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mt-3"></div>
//           </div>

//           {/* Form Section */}
//           <div className="space-y-6 relative z-10">
//             {/* Email Field */}
//             <div className="space-y-2">
//               <label htmlFor="email" className="block text-gray-700 text-xs font-semibold tracking-wide uppercase">
//                 Email Address
//               </label>
//               <div className="relative group">
//                 <input
//                   type="email"
//                   id="email"
//                   value={loginData.email}
//                   onChange={handleChange}
//                   placeholder="Enter your email"
//                   required
//                   className="w-full px-3 py-3 border-2 border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-gray-300 font-medium bg-white/80 backdrop-blur-sm"
//                 />
//                 <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left"></div>
//               </div>
//             </div>

//             {/* Password Field */}
//             <div className="space-y-2">
//               <label htmlFor="password" className="block text-gray-700 text-xs font-semibold tracking-wide uppercase">
//                 Password
//               </label>
//               <div className="relative group">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   value={loginData.password}
//                   onChange={handleChange}
//                   placeholder="Enter your password"
//                   required
//                   className="w-full px-3 py-3 pr-10 border-2 border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-gray-300 font-medium bg-white/80 backdrop-blur-sm"
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors duration-200 focus:outline-none"
//                 >
//                   {showPassword ? <EyeOff className="text-lg" /> : <Eye className="text-lg" />}
//                 </button>
//                 <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left"></div>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               onClick={handleSubmit}
//               className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 font-semibold text-base hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl relative overflow-hidden group"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
//               <span className="flex items-center justify-center relative z-10">
//                 Sign In
//                 <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                 </svg>
//               </span>
//             </button>
//           </div>

//           {/* Sign Up Link */}
//           <div className="mt-6 text-center relative z-10">
//             <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-4"></div>
//             <p className="text-gray-600 text-xs font-medium">
//               Don't have an account?{' '}
//               <a
//                 href="/sign-up"
//                 className="text-blue-500 hover:text-blue-600 font-semibold transition-colors duration-200 hover:underline"
//               >
//                 Sign Up
//               </a>
//             </p>
//           </div>
//         </div>

//         {/* Bottom Accent */}
//         <div className="mt-6 text-center">
//           <div className="inline-flex items-center space-x-2">
//             <div className="w-8 h-px bg-blue-400 opacity-60"></div>
//             <div className="w-3 h-3 bg-blue-500 transform rotate-45"></div>
//             <div className="w-8 h-px bg-blue-400 opacity-60"></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;