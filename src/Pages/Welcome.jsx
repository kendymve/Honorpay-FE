import React from 'react';
import { Link } from 'react-router-dom';


export default function Welcome() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 ">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-xl rounded-2xl w-[95%]  md:p-10 gap-10 h-[75%] min-h-[400px]">
        {/* Left: GIF */}
        <div className="flex-shrink-0 w-full md:w-3/5">
          <img
            src="/assets/pension.gif"
            alt="Welcome animation"
            className="w-full h-auto rounded-xl"
          />
        </div>

        {/* Right: Text */}
        <div className="text-center md:text-left md:w-2/5">
          <h1 className="text-5xl font-bold mb-4 text-blue-800">Welcome to HonorPay</h1>
          <p className="text-gray-700 text-lg">
            HonorPay is a secure platform for managing pension payments for individuals,
            company managers, and admin supervisors. We streamline access, tracking, and reporting
            of retirement contributions and disbursements.
          </p>
           <div className="mt-6">
    <Link
      to="/contactus"
      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
    >
      Contact Us
    </Link>
  </div>
        </div>
        
      </div>
    </div>
  );
}
