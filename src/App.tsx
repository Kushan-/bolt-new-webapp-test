import React from 'react';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = React.useState<'home' | 'login' | 'signup' | 'dashboard'>('home');

  if (currentPage === 'login') {
    return <LoginPage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'signup') {
    return <SignupPage onBack={() => setCurrentPage('home')} />;
  }

  if (currentPage === 'dashboard') {
    return <Dashboard onBack={() => setCurrentPage('home')} />;
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
          
          <button 
            onClick={() => setCurrentPage('dashboard')}
            className="w-full sm:w-64 bg-white/10 backdrop-blur-sm text-white font-semibold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-white/30 hover:border-white/50 hover:bg-white/20"
          >
            Go to Dashboard
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-white/80">
          <p className="text-sm md:text-base font-light">
            Start managing your tasks efficiently today
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;