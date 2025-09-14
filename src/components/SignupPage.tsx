import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface SignupPageProps {
  onBack: () => void;
}

function SignupPage({ onBack }: SignupPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup attempt:', { name, email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-light-blue flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center text-white/80 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        {/* Signup Form Container */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-light-blue-600 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600 font-medium">
              Join us today! Create your account to get started.
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-light-blue-500 focus:outline-none transition-colors duration-200 text-gray-700 font-medium placeholder-gray-400"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-light-blue-500 focus:outline-none transition-colors duration-200 text-gray-700 font-medium placeholder-gray-400"
                placeholder="Enter your email address"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-light-blue-500 focus:outline-none transition-colors duration-200 text-gray-700 font-medium placeholder-gray-400"
                placeholder="Create a secure password"
                required
              />
            </div>

            {/* Signup Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-button text-white font-semibold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-white/20"
              >
                Create Account
              </button>
            </div>
          </form>

          {/* Additional Links */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <button className="text-light-blue-600 font-semibold hover:text-light-blue-700 transition-colors duration-200">
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;