import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <div
        className="w-[95%] min-h-[400px] h-[75%] flex items-center justify-end rounded-2xl shadow-xl md:p-10"
        style={{
          backgroundImage: "url('/assets/bg1.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="text-right md:w-2/5 space-y-6 text-white  p-8  bg-black rounded-xl"  style={{ opacity: 0.7 }}>
          <h1 className="text-4xl font-extrabold leading-tight">Welcome to HonorPay</h1>
          <p className="text-xl leading-relaxed">
            HonorPay is a secure platform for managing pension payments for individuals,
            company managers, and admin supervisors. We streamline access, tracking, and reporting
            of retirement contributions and disbursements.
          </p>
          <div>
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
