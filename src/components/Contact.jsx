import React, { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { FiMail, FiMapPin, FiSend } from 'react-icons/fi';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Spotlight Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append("access_key", "c5476c01-5e07-4b83-b49e-94fc6ff5b7df");
    formData.append("name", formState.name);
    formData.append("email", formState.email);
    formData.append("message", formState.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      
      if (data.success) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        console.error("Form submission failed:", data.message);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-12 md:py-24 bg-[#030303] border-t border-white/5 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Text & Info */}
          <div className="flex-1 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold tracking-[0.3em] text-red-500 uppercase">Available For Work</span>
              </div>
              <h2 className="font-heading font-black text-5xl md:text-7xl text-white mb-6 leading-tight">
                Let's create something <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">epic.</span>
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md mb-12">
                Whether you have a groundbreaking idea, a startup that needs scaling, or a design that needs to come to life—my inbox is always open. Let's make it happen.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0)] group-hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Email</span>
                    <a href="mailto:nandhanaveengasc41@gmail.com" className="text-white font-bold hover:text-red-500 transition-colors text-sm">nandhanaveengasc41@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0)] group-hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Location</span>
                    <span className="text-white font-bold">Erode, Tamil Nadu</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: The Form */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/10 p-8 md:p-10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              onMouseMove={handleMouseMove}
            >
              {/* Magic Spotlight Hover Effect */}
              <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                  background: useMotionTemplate`
                    radial-gradient(
                      600px circle at ${mouseX}px ${mouseY}px,
                      rgba(220, 38, 38, 0.1),
                      transparent 80%
                    )
                  `,
                }}
              />

              <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-8">
                <div className="relative group/input z-10">
                  <input 
                    type="text" 
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    className="block w-full px-5 pt-7 pb-3 text-white bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-red-500 focus:bg-red-500/10 peer transition-all duration-300 hover:border-white/20 hover:bg-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] relative z-20"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-2 scale-75 top-4 left-5 z-30 origin-[0] peer-focus:text-red-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2 pointer-events-none"
                  >
                    Your Name
                  </label>
                  <div className="absolute inset-0 -z-10 rounded-xl bg-red-500/0 peer-focus:bg-red-500/20 blur-xl transition-all duration-500 pointer-events-none"></div>
                </div>

                <div className="relative group/input z-10">
                  <input 
                    type="email" 
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    className="block w-full px-5 pt-7 pb-3 text-white bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-red-500 focus:bg-red-500/10 peer transition-all duration-300 hover:border-white/20 hover:bg-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] relative z-20"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-2 scale-75 top-4 left-5 z-30 origin-[0] peer-focus:text-red-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2 pointer-events-none"
                  >
                    Email Address
                  </label>
                  <div className="absolute inset-0 -z-10 rounded-xl bg-red-500/0 peer-focus:bg-red-500/20 blur-xl transition-all duration-500 pointer-events-none"></div>
                </div>

                <div className="relative group/input z-10">
                  <textarea 
                    id="message"
                    required
                    rows="4"
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    className="block w-full px-5 pt-7 pb-3 text-white bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-red-500 focus:bg-red-500/10 peer transition-all duration-300 hover:border-white/20 hover:bg-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] relative z-20 resize-none"
                    placeholder=" "
                  ></textarea>
                  <label 
                    htmlFor="message" 
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-2 scale-75 top-4 left-5 z-30 origin-[0] peer-focus:text-red-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-2 pointer-events-none"
                  >
                    Your Message
                  </label>
                  <div className="absolute inset-0 -z-10 rounded-xl bg-red-500/0 peer-focus:bg-red-500/20 blur-xl transition-all duration-500 pointer-events-none"></div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full py-4 rounded-xl font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden relative group/btn ${isSubmitted ? 'bg-green-600 text-white' : 'bg-white text-black hover:bg-red-600 hover:text-white hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]'}`}
                >
                  <span className={`transition-transform duration-300 ${isSubmitting ? '-translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`}>
                    {isSubmitted ? 'Message Sent!' : 'Send Message'}
                  </span>
                  
                  {!isSubmitted && (
                    <FiSend className={`w-4 h-4 transition-all duration-300 ${isSubmitting ? 'absolute translate-x-10 opacity-0' : 'group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1'}`} />
                  )}
                  
                  {isSubmitting && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </button>

                {isSubmitted && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-500 text-xs text-center font-bold tracking-widest uppercase mt-[-10px]"
                  >
                    I'll get back to you shortly!
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
