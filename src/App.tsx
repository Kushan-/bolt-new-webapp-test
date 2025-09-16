import React, { useEffect, useState } from 'react';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import { authHelpers } from './lib/supabase';

function App() {
  const [currentPage, setCurrentPage] = React.useState<'home' | 'login' | 'signup' | 'dashboard'>('home');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      try {
        const { data } = await authHelpers.getCurrentUser();
        if (data.user) {
          setUser(data.user);
          setCurrentPage('dashboard');
        }
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = authHelpers.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        setCurrentPage('dashboard');
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setCurrentPage('home');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLoginSuccess = () => {
    setCurrentPage('dashboard');
  };

  const handleSignupSuccess = () => {
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentPage('home');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-light-blue flex items-center justify-center">
        <div className="text-white text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (currentPage === 'login') {
    return (
      <LoginPage 
        onBack={() => setCurrentPage('home')} 
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  if (currentPage === 'signup') {
    return (
      <SignupPage 
        onBack={() => setCurrentPage('home')} 
        onSignupSuccess={handleSignupSuccess}
      />
    );
  }

  if (currentPage === 'dashboard') {
    return <Dashboard onBack={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-light-blue flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl mx-auto text-center">
        {/* Main Heading */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Welcome to My Task Manager
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed">
            Stay organized, boost productivity, and achieve your goals with our intuitive task management solution.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-3xl mx-auto">
          {user ? (
            <button 
              onClick={() => setCurrentPage('dashboard')}
              className="w-full sm:w-64 bg-gradient-button text-white font-semibold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-white/20"
            >
              Go to Dashboard
            </button>
          ) : (
            <>
          <button 
            onClick={() => setCurrentPage('login')}
            className="w-full sm:w-64 bg-white text-light-blue-600 font-semibold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-light-blue-200"
          >
            Login
          </button>
          
          <button 
            onClick={() => setCurrentPage('signup')}
            className="w-full sm:w-64 bg-gradient-button text-white font-semibold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-white/20"
          >
            Signup
          </button>
            </>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-white/80">
          <p className="text-sm md:text-base font-light">
            {user ? `Welcome back, ${user.user_metadata?.full_name || user.email}!` : 'Start managing your tasks efficiently today'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;