import React, { useState } from 'react';
import { json, Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import { Eye, EyeOff, UserCircle, Trash2 } from 'lucide-react';


function SignUp() {

    // nevigation
    const nevigate=useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [signUpData, setSignUpData] = useState({
        uploadPic: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // State to handle the image preview

    const [imagePreview, setImagePreview] = useState("");


    const [formStatus, setFormStatus] = useState(null);


    const togglePasswordVisibility = (setter) => {
        setter((prev) => !prev);
    };


    const handleChange = (e) => {

        const { id, value, type, files } = e.target;

        if (type === 'file')
        {
            const file = files && files[0]; // Check if 'files' is defined and contains at least one file
            if (file) {
                // console.log("file data name", file.name); // Safely access file.name here
                const reader = new FileReader();

                reader.onloadend = () => {
                    setSignUpData(prev => ({
                        ...prev,
                        [id]: file.name, // Save the file name
                    }));
                    setImagePreview(reader.result); // Show image preview
                };
                reader.readAsDataURL(file); // Read the file as a Data URL
            } else {
                console.log("No file selected");
            }
        } else {
            setSignUpData(prev => ({
                ...prev,
                [id]: value // For non-file inputs, update the state as usual
            }));
        }
    };

    const handleDeleteImage = () => {
        setSignUpData( prev => ({
            ...prev,
            uploadPic: ""
        }));
        setImagePreview("");
        document.getElementById('uploadPic').value = "";

    };

    // Handle form submission



    const handleSubmit = async (e) =>
    {

        e.preventDefault();
        if(signUpData.password!==signUpData.confirmPassword){
            toast.error("password mismatch");
            return console.log("password and confirm password is different please enter same")
        }

        // Create a new FormData object

        const dataResponse =await fetch(summaryApi.signUp.url,{
         method:summaryApi.signUp.method,
         headers:{
            "content-type":"application/json"
         },
         body:JSON.stringify(signUpData)
       })

       const data= await dataResponse.json();
       console.log("data",data);
       if(data.success===true){
          toast.success(data.message);
          nevigate("/")
       }else{
        toast.error(data.message);
        nevigate("/login")
       }
       if(data.error){
        toast.error(data.message);
       }
    };


    // return (
    //     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
    //         <div className="m-10 w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
    //             {/* Profile Picture */}
    //             <div className="flex flex-col items-center mb-6">
    //                 {imagePreview ? (
    //                     <div className="relative">
    //                         <img src={imagePreview} alt="Profile Preview" className="w-24 h-24 rounded-full object-cover" />
    //                         <button
    //                             type="button"
    //                             onClick={handleDeleteImage}
    //                             className="absolute bottom-0 right-0 bg-red-500 text-white rounded-full p-1"
    //                         >
    //                             <FaTrash className="text-lg" />
    //                         </button>
    //                     </div>
    //                 ) : (
    //                     <FaUserCircle className="text-6xl text-gray-400" />
    //                 )}
    //             </div>

    //             <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Sign Up</h1>
    //             <form onSubmit={handleSubmit} className="space-y-4">
    //                 {/* Profile Picture Upload */}
    //                 <div>
    //                     <label htmlFor="uploadPic" className="block text-gray-700 text-sm font-medium mb-1">Upload Profile Picture</label>
    //                     <input
    //                         type="file"
    //                         id="uploadPic"
    //                         accept="image/*"
    //                         onChange={handleChange}
    //                         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 hover:shadow-lg"
    //                     />
    //                 </div>

    //                 {/* Name Field */}
    //                 <div>
    //                     <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">Name</label>
    //                     <input
    //                         type="text"
    //                         id="name"
    //                         placeholder="Enter your name"
    //                         value={signUpData.name}
    //                         onChange={handleChange}
    //                         required
    //                         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 hover:shadow-lg"
    //                     />
    //                 </div>

    //                 {/* Email Field */}
    //                 <div>
    //                     <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">Email</label>
    //                     <input
    //                         type="email"
    //                         id="email"
    //                         placeholder="Enter your email"
    //                         value={signUpData.email}
    //                         onChange={handleChange}
    //                         required
    //                         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 hover:shadow-lg"
    //                     />
    //                 </div>

    //                 {/* Password Field */}
    //                 <div className="relative">
    //                     <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">Password</label>
    //                     <input
    //                         type={showPassword ? 'text' : 'password'}
    //                         id="password"
    //                         placeholder="Enter your password"
    //                         value={signUpData.password}
    //                         onChange={handleChange}
    //                         required
    //                         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 hover:shadow-lg pr-12"
    //                     />
    //                     {/* Toggle Password Visibility Button */}
    //                     <button
    //                         type="button"
    //                         onClick={() => togglePasswordVisibility(setShowPassword)}
    //                         className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500"
    //                     >
    //                         {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
    //                     </button>
    //                 </div>

    //                 {/* Confirm Password Field */}
    //                 <div className="relative">
    //                     <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-1">Confirm Password</label>
    //                     <input
    //                         type={showConfirmPassword ? 'text' : 'password'}
    //                         id="confirmPassword"
    //                         placeholder="Confirm your password"
    //                         value={signUpData.confirmPassword}
    //                         onChange={handleChange}
    //                         required
    //                         className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 hover:shadow-lg pr-12"
    //                     />
    //                     {/* Toggle Confirm Password Visibility Button */}
    //                     <button
    //                         type="button"
    //                         onClick={() => togglePasswordVisibility(setShowConfirmPassword)}
    //                         className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500"
    //                     >
    //                         {showConfirmPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
    //                     </button>
    //                 </div>

    //                 {/* Submit Button */}
    //                 <button
    //                     type="submit"
    //                     className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 transform hover:scale-105"
    //                 >
    //                     Sign Up
    //                 </button>

    //                 {/* Form Status */}
    //                 {formStatus && (
    //                     <div className={`mt-4 p-4 ${formStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded-md`}>
    //                         {formStatus.message}
    //                     </div>
    //                 )}
    //             </form>

    //             {/* Login Link */}
    //             <p className="mt-4 text-center text-gray-600 text-sm">
    //                 Already have an account? <Link to="/login" className="text-blue-500 hover:underline hover:text-blue-600 transition-colors duration-300">Log In</Link>
    //             </p>
    //         </div>
    //     </div>
    // );

return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 px-4 pt-32">
            <div className="w-full max-w-sm">
                {/* Main Card - Square Design */}
                <div className="bg-white/95 backdrop-blur-sm p-6 shadow-2xl border border-white/20 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl relative overflow-hidden">

                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"></div>
                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-500/10 transform rotate-45"></div>
                    <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-blue-400/10 transform rotate-45"></div>

                    {/* Profile Picture Section */}
                    <div className="flex flex-col items-center mb-6 relative z-10">
                        {imagePreview ? (
                            <div className="relative">
                                <img src={imagePreview} alt="Profile Preview" className="w-20 h-20 object-cover shadow-lg" />
                                <button
                                    type="button"
                                    onClick={handleDeleteImage}
                                    className="absolute -bottom-1 -right-1 bg-red-500 text-white p-1 hover:bg-red-600 transition-colors duration-200"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </button>
                            </div>
                        ) : (
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                                <UserCircle className="w-12 h-12 text-white" />
                            </div>
                        )}
                    </div>

                    {/* Header Section */}
                    <div className="text-center mb-6 relative z-10">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">Create Account</h1>
                        <p className="text-gray-600 text-sm font-medium">Join us today</p>
                        <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mt-3"></div>
                    </div>

                    {/* Form Section */}
                    <div className="space-y-4 relative z-10">
                        {/* Profile Picture Upload */}
                        <div className="space-y-2">
                            <label htmlFor="uploadPic" className="block text-gray-700 text-xs font-semibold tracking-wide uppercase">
                                Profile Picture
                            </label>
                            <div className="relative group">
                                <input
                                    type="file"
                                    id="uploadPic"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border-2 border-gray-200 text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-gray-300 font-medium bg-white/80 backdrop-blur-sm text-sm"
                                />
                                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </div>
                        </div>

                        {/* Name Field */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-gray-700 text-xs font-semibold tracking-wide uppercase">
                                Full Name
                            </label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter your full name"
                                    value={signUpData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-3 border-2 border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-gray-300 font-medium bg-white/80 backdrop-blur-sm"
                                />
                                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-gray-700 text-xs font-semibold tracking-wide uppercase">
                                Email Address
                            </label>
                            <div className="relative group">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={signUpData.email}
                                    onChange={handleChange}
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
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="Enter your password"
                                    value={signUpData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-3 pr-10 border-2 border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-gray-300 font-medium bg-white/80 backdrop-blur-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility(setShowPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors duration-200 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff className="text-lg" /> : <Eye className="text-lg" />}
                                </button>
                                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="block text-gray-700 text-xs font-semibold tracking-wide uppercase">
                                Confirm Password
                            </label>
                            <div className="relative group">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={signUpData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-3 pr-10 border-2 border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:border-gray-300 font-medium bg-white/80 backdrop-blur-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility(setShowConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-colors duration-200 focus:outline-none"
                                >
                                    {showConfirmPassword ? <EyeOff className="text-lg" /> : <Eye className="text-lg" />}
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
                                Create Account
                                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        </button>

                        {/* Form Status */}
                        {formStatus && (
                            <div className={`mt-4 p-3 ${formStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} text-sm`}>
                                {formStatus.message}
                            </div>
                        )}
                    </div>

                    {/* Login Link */}
                    <div className="mt-6 text-center relative z-10">
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-4"></div>
                        <p className="text-gray-600 text-xs font-medium">
                            Already have an account?{' '}
                            <a
                                href="/login"
                                className="text-blue-500 hover:text-blue-600 font-semibold transition-colors duration-200 hover:underline"
                            >
                                Log In
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
        </div>
    );

}

export default SignUp;


