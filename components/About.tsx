import React from 'react';
import { Terminal, Code2, Cpu, Zap, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
    return (
        <section id="about" className="py-20 bg-dark relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/50 bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(255,0,85,0.3)] backdrop-blur-sm">
                        About The Event
                    </div>
                    <h2 className="text-fluid-h2 font-black text-white font-mono uppercase tracking-tight">
                        What is <span className="text-primary">Vaibhav?</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        className="space-y-6 text-gray-300 text-fluid-p leading-relaxed"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        <p>
                            Vaibhav 2K26 is the premier flagship cultural and tech symposium of Jain College of Engineering and Technology, Hubballi. It's not just a fest; it's an emotion, a battleground for logic, and a canvas for innovation.
                        </p>
                        <p>
                            Born from the desire to push boundaries, Vaibhav brings together the brightest minds to compete, collaborate, and create. Whether you're a seasoned coder or a curious beginner, there's a challenge waiting to test your mettle.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="flex items-center gap-2 text-white bg-card/50 px-4 py-2 rounded-lg border border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                                <Terminal className="w-5 h-5 text-primary" />
                                <span className="font-mono font-bold">Hackathons</span>
                            </div>
                            <div className="flex items-center gap-2 text-white bg-card/50 px-4 py-2 rounded-lg border border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                                <Cpu className="w-5 h-5 text-secondary" />
                                <span className="font-mono font-bold">Robotics</span>
                            </div>
                            <div className="flex items-center gap-2 text-white bg-card/50 px-4 py-2 rounded-lg border border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                                <Code2 className="w-5 h-5 text-tertiary" />
                                <span className="font-mono font-bold">Coding</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="relative group"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-tertiary rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-black/80 ring-1 ring-white/10 rounded-2xl p-8 backdrop-blur-xl h-full flex flex-col justify-center transform transition-all duration-500 group-hover:-translate-y-2">
                            <Zap className="w-16 h-16 text-primary mb-6 animate-pulse drop-shadow-[0_0_15px_rgba(255,0,85,0.6)]" />
                            <h3 className="text-fluid-h3 font-black text-white font-mono mb-4">Innovation Unleashed</h3>
                            <p className="text-gray-400">
                                Experience 48 hours of uninterrupted creativity, networking, and adrenaline-pumping competitions. Prepare to redefine your limits and forge unforgettable memories.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* College Section */}
                <div className="mt-20 pt-20 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        className="order-2 md:order-1 relative group"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-tertiary via-secondary to-primary rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-black/80 ring-1 ring-white/10 rounded-2xl p-2 backdrop-blur-xl h-full flex flex-col justify-center transform transition-all duration-500 group-hover:-translate-y-2 overflow-hidden">
                            <img
                                src="/clg.png"
                                alt="Jain College of Engineering and Technology, Hubballi Campus"
                                className="w-full h-auto object-cover rounded-xl"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        className="order-1 md:order-2 space-y-6 text-gray-300 text-fluid-p leading-relaxed"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                    >
                        <div className="inline-block mb-2 px-4 py-1.5 rounded-full border border-secondary/50 bg-secondary/10 text-secondary text-sm font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(0,255,255,0.3)] backdrop-blur-sm">
                            About The College
                        </div>
                        <h2 className="text-fluid-h2 font-black text-white font-mono uppercase tracking-tight">
                            JCET <span className="text-secondary">Hubballi</span>
                        </h2>
                        <p>
                            Jain College of Engineering and Technology (JCET), Hubballi, established under the aegis of the JGI Group, is a premier institution known for fostering innovation, research, and technical excellence.
                        </p>
                        <p>
                            Our campus provides a vibrant ecosystem where theoretical knowledge meets practical application. We believe in nurturing holistic development, preparing our students not just for careers, but to be leaders and problem-solvers in a rapidly evolving technological landscape.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
