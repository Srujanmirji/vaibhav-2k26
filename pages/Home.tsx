import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-darker">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-darker">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[100px] animate-pulse-slow mix-blend-screen"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-[100px] animate-pulse-slow mix-blend-screen" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(18,0,36,0)_0%,rgba(5,0,10,1)_100%)]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">

          {/* Animated Logo */}
          <div className="mb-8 relative group">
            <div className="absolute inset-0 bg-tertiary/10 blur-[50px] rounded-full animate-pulse-slow"></div>
            <img
              src="/logo.png.bak"
              alt="Vaibhav 2K26 official logo"
              className="relative w-48 md:w-72 h-auto animate-float drop-shadow-[0_0_25px_rgba(255,215,0,0.5)] transition-transform duration-500 hover:scale-105"
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <div className="inline-block mb-8 px-4 py-1.5 rounded-full border border-secondary/50 bg-secondary/10 text-secondary text-sm font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(0,255,255,0.3)] backdrop-blur-sm">
            March 27-28, 2026
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 font-mono tracking-tight uppercase">
            Vaibhav <span className="text-primary">2K26</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light border-l-2 border-primary pl-4 text-left md:text-center md:border-none md:pl-0 bg-black/20 md:bg-transparent p-2 md:p-0 rounded-r-lg">
            The ultimate convergence of code, creativity, and chaos.
            <br className="hidden md:block" /> Join the revolution at Vaibhav 2K26.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto px-4 sm:px-0">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-white hover:text-primary text-white font-bold text-lg rounded-none skew-x-[-10deg] transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(255,0,85,0.4)] hover:shadow-[0_0_30px_rgba(255,0,85,0.6)]"
            >
              <span className="skew-x-[10deg] flex items-center gap-2">
                Register Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/events"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-darker font-bold text-lg rounded-none skew-x-[-10deg] transition-all duration-300 flex items-center justify-center shadow-[0_0_10px_rgba(0,255,255,0.2)] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]"
            >
              <span className="skew-x-[10deg]">Explore Events</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats/Highlights */}
      <section className="py-20 bg-dark border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 bg-card/50 backdrop-blur-sm border border-white/5 hover:border-primary/50 transition-all duration-500 group hover:-translate-y-2 rounded-xl">
              <Calendar className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(255,0,85,0.8)]" />
              <h3 className="text-3xl font-bold text-white mb-2 font-mono">2 Days</h3>
              <p className="text-gray-400">Non-stop technical action</p>
            </div>
            <div className="p-8 bg-card/50 backdrop-blur-sm border border-white/5 hover:border-secondary/50 transition-all duration-500 group hover:-translate-y-2 rounded-xl">
              <Users className="w-12 h-12 text-secondary mx-auto mb-4 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
              <h3 className="text-3xl font-bold text-white mb-2 font-mono">1000+ Students</h3>
              <p className="text-gray-400">Elite participants only</p>
            </div>
            <div className="p-8 bg-card/50 backdrop-blur-sm border border-white/5 hover:border-tertiary/50 transition-all duration-500 group hover:-translate-y-2 rounded-xl">
              <MapPin className="w-12 h-12 text-tertiary mx-auto mb-4 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(255,211,0,0.8)]" />
              <h3 className="text-3xl font-bold text-white mb-2 font-mono">10+ Venues</h3>
              <p className="text-gray-400">State of the art labs</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
