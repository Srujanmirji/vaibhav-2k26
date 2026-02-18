import React from 'react';
import { motion } from 'framer-motion';
import { Code, Cpu, Gamepad2, Users, Rocket, Sparkles, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-darker overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-secondary/10 to-transparent blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 font-mono tracking-tighter">
              BEHIND THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">CODE</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
              <span className="text-secondary font-bold">Vaibhav 2K26</span> isn't just an event. It's a glimpse into the future. A crucible where the brightest minds forge the technologies of tomorrow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-gradient-to-br from-card/80 to-darker border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden backdrop-blur-sm shadow-[0_0_50px_rgba(255,0,85,0.15)] group"
          >
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-colors duration-500"></div>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-rose-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform">
                  <Target className="w-10 h-10 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-4 font-mono">OUR VISION</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  To dismantle the barriers between imagination and reality. We provide the platform, the resources, and the network. You provide the brilliance. Together, we build what comes next.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats / Highlights */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: Code, title: "HACKATHONS", desc: "7-hour intense coding marathons.", color: "text-primary" },
              { icon: Cpu, title: "WORKSHOPS", desc: "Deep dives into AI & Computing.", color: "text-secondary" },
              { icon: Gamepad2, title: "GAMING", desc: "High-stakes e-sports arenas.", color: "text-tertiary" },
              { icon: Users, title: "COMMUNITY", desc: "Connect with 1000+ innovators.", color: "text-emerald-400" }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card/40 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:bg-card/60 transition-colors group hover:-translate-y-2 duration-300"
              >
                <item.icon className={`w-12 h-12 ${item.color} mb-6 group-hover:scale-110 transition-transform`} />
                <h3 className="text-xl font-bold text-white mb-3 font-mono">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to <span className="text-secondary">Innovate?</span></h2>
            <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
              Join us at Vaibhav 2K26 and be part of the most exhilarating tech fest of the year.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-rose-600 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,0,85,0.4)]"
              >
                <Rocket className="w-5 h-5 mr-2" />
                REGISTER NOW
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold rounded-xl transition-all hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2 text-secondary" />
                EXPLORE EVENTS
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;