import React, { useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { authHelpers } from '../lib/supabase';

interface SignupPageProps {
  onBack: () => void;
  onSignupSuccess: () => void;
}

function SignupPage({ onBack, onSignupSuccess }: SignupPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await authHelpers.signUp(email, password, name);
      
      if (error) {
        setError(error.message);
      } else if (data.user) {
        setSuccess(true);
        // Auto-login after successful signup
        setTimeout(() => {
          onSignupSuccess();
        }, 2000);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
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
            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
                <p className="text-sm font-medium">Account created successfully! Redirecting to dashboard...</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

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
                disabled={loading || success}
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
                disabled={loading || success}
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
                disabled={loading || success}
                required
              />
            </div>

            {/* Signup Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || success}
                className="w-full bg-gradient-button text-white font-semibold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : success ? (
                  'Account created!'
                ) : (
                  'Create Account'
                )}
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