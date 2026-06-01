import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { FiArrowUpRight, FiLayers, FiCode, FiMonitor, FiCpu, FiGithub, FiLinkedin, FiInstagram, FiMail, FiDownload } from 'react-icons/fi';
import { SiHtml5, SiJavascript, SiPhp, SiMysql, SiTailwindcss, SiFigma, SiBlender, SiCanva, SiGit, SiGithub } from 'react-icons/si';
import { FaCss3Alt, FaGoogle } from 'react-icons/fa';
import { TbBrandVscode, TbBrandAdobe } from 'react-icons/tb';
import ProjectsSection from './components/Projects';
import CreativePursuits from './components/CreativePursuits';
import Contact from './components/Contact';

const XIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

export default function App() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState('Web Development');
  const glowIntensity = isHovered ? 0.3 : 0; // Light glow when hovered

  const skillCategories = ['Web Development', 'Design & UI/UX', 'Tools & Version Control'];

  const skillsData = {
    'Web Development': [
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'PHP', icon: SiPhp, color: '#777BB4' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' }
    ],
    'Design & UI/UX': [
      { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
      { name: 'Blender', icon: SiBlender, color: '#F5792A' },
      { name: 'Canva', icon: SiCanva, color: '#00C4CC' },
      { name: 'Adobe CC', icon: TbBrandAdobe, color: '#DA1F26' }
    ],
    'Tools & Version Control': [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#ffffff' },
      { name: 'VS Code', icon: TbBrandVscode, color: '#007ACC' },
      { name: 'Google AI Studio', icon: FaGoogle, color: '#4285F4' }
    ]
  };

  const allSkills = Object.values(skillsData).flat();
  const row1Skills = allSkills.slice(0, Math.ceil(allSkills.length / 2));
  const row2Skills = allSkills.slice(Math.ceil(allSkills.length / 2));

  // Generate flying particles originating from center
  const particles = useMemo(() => {
    return [...Array(40)].map(() => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 800 + 200;
      return {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 5 + 4,
        delay: Math.random() * 5,
        color: Math.random() > 0.5 ? 'bg-red-500' : 'bg-white'
      };
    });
  }, []);

  // Generate random twinkling stars for the background
  const stars = useMemo(() => {
    return [...Array(40)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 1.5 + 0.5, // 0.5px to 2px
      duration: Math.random() * 3 + 2, // 2s to 5s
      delay: Math.random() * 5,
    }));
  }, []);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize coordinates (-1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#030303] text-white font-body overflow-x-hidden selection:bg-red-600 selection:text-white">

      {/* 1. BACKGROUND ENVIRONMENT */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="hidden md:block noise-overlay opacity-[0.03]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      </div>

      {/* 2. FLOATING NAVBAR */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl bg-[#0a0a0a]/80 backdrop-blur-xl rounded-full px-6 py-3 flex justify-between items-center z-50 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
      >
        <a href="#home" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-red-600/10 flex items-center justify-center border border-red-500/20 group-hover:bg-red-600/20 transition-colors">
            <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_15px_red]"></div>
          </div>
          <span className="font-heading font-black tracking-widest text-xs">
            <span className="uppercase">Nandha</span><span className="text-red-500 lowercase">.dev</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {[
            { name: 'Home', id: 'home' },
            { name: 'Services', id: 'services' },
            { name: 'Skills', id: 'skills' },
            { name: 'Education', id: 'education' },
            { name: 'Projects', id: 'projects' },
            { name: 'Contact', id: 'contact' }
          ].map((item) => (
            <a key={item.name} href={`#${item.id}`} className="relative text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase group">
              <span className="group-hover:text-red-500 transition-colors duration-300">{item.name}</span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-red-500 transition-all duration-300 group-hover:w-full shadow-[0_0_10px_red]"></span>
            </a>
          ))}
        </div>
      </motion.nav>

      {/* 3. HERO SECTION */}
      <section id="home" className="relative min-h-[100vh] md:h-[100vh] overflow-hidden flex flex-col items-center pt-28 lg:pt-40 z-10 px-6 pb-24 md:pb-0">

        {/* Twinkling Background Stars */}
        <div className="hidden md:block absolute inset-0 pointer-events-none -z-20">
          {stars.map((star, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute bg-white rounded-full opacity-60"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
              }}
              animate={{
                opacity: [0.1, 0.8, 0.1],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: star.delay,
              }}
            />
          ))}
        </div>

        {/* Top Text Content (Centered) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center text-center z-10 mb-2 md:mb-8 relative flex-1 w-full"
        >
          <h1 className="font-heading font-black text-5xl md:text-6xl lg:text-[5.5rem] leading-[1] mb-2 tracking-tight -translate-y-[4px]">
            I'm <span className="text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.4)]">Nandhakumar,</span>
          </h1>
          <h2 className="font-heading font-bold text-2xl md:text-5xl lg:text-6xl leading-[1.1] text-gray-300 tracking-tight">
            Full Stack Developer
          </h2>

          {/* MOBILE ONLY: About Me & Button (Hidden on Desktop) */}
          <div className="flex xl:hidden flex-col items-center mt-6 max-w-[95%] md:max-w-[600px] pointer-events-auto relative z-50">
            <p className="text-[11px] md:text-sm text-gray-300 mb-6 leading-relaxed font-medium bg-black/40 backdrop-blur-sm px-4 md:px-8 py-2 md:py-4 rounded-xl border border-white/5 shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
              Enthusiastic IT student building creative, web-based projects that solve real-world problems.
            </p>
            <a
              href="/resume.pdf"
              download="NaveenNandhu_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 text-white text-[9px] font-bold tracking-[0.2em] uppercase rounded-full shadow-[0_0_15px_rgba(220,38,38,0.3)] border border-red-500/50"
            >
              <FiDownload className="w-3.5 h-3.5" /> Download Resume
            </a>
          </div>
        </motion.div>

        {/* Center Character Layout with Side Blocks */}
        <div className="relative w-full max-w-5xl flex justify-center items-end mt-2 md:mt-6 xl:mt-10 h-[50vh] md:h-[55vh] xl:h-[60vh] z-20 pointer-events-none translate-y-0 xl:translate-y-[83px]">

          {/* --- ROTATING RINGS WRAPPERS (Prevents eccentric wobbling) --- */}
          {/* Background Shapes */}
          <div className="hidden md:flex absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center pointer-events-none -z-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              className={`absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-[40px] transition-colors duration-1000 ${isHovered ? 'bg-gradient-to-tr from-red-600/30 to-orange-500/10' : 'bg-white/20'}`}
            />
            <div className={`absolute w-[400px] h-[400px] md:w-[550px] md:h-[550px] rounded-full border border-dashed animate-[spin_30s_linear_infinite_reverse] transition-colors duration-1000 ${isHovered ? 'border-red-500/30' : 'border-white'}`}></div>
          </div>


          {/* Flying Particles */}
          <div className="hidden md:block absolute top-1/2 left-1/2 pointer-events-none -z-10">
            {particles.map((p, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full opacity-80 ${p.color}`}
                style={{ width: p.size, height: p.size, marginLeft: -p.size / 2, marginTop: -p.size / 2 }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: [0, p.x],
                  y: [0, p.y],
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0.5]
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: p.delay
                }}
              />
            ))}
          </div>

          {/* Subtle Atmospheric Smoke */}
          <div className="hidden md:block absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[120%] h-[300px] pointer-events-none -z-10 opacity-60 mix-blend-screen">
            {[...Array(1)].map((_, i) => (
              <motion.div
                key={`smoke-${i}`}
                className={`absolute w-[400px] h-[200px] rounded-[100%] blur-[40px] transition-colors duration-1000 ${isHovered ? 'bg-red-600/20' : 'bg-white/10'}`}
                style={{
                  left: `${5 + i * 25}%`,
                  bottom: `${-10 + i * 10}%`
                }}
                animate={{
                  x: [0, 60, -40, 0],
                  y: [0, -40, 0],
                  scale: [1, 1.3, 0.9, 1],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 15 + i * 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* LEFT SIDE BLOCK - ABOUT ME */}
          <motion.div
            style={{ y: useTransform(smoothMouseY, [-1, 1], [-15, 15]) }}
            className="absolute left-4 xl:-left-40 top-[-55%] lg:top-[-45%] xl:top-[-20%] hidden xl:flex flex-col z-30 pointer-events-auto max-w-[300px]"
          >
            <span className="text-7xl font-serif text-white mb-0 leading-none">“</span>
            <p className="text-base text-gray-400 leading-loose font-medium mb-6 -mt-6">
              Enthusiastic IT student building creative, web-based projects that solve real-world problems. Driven by continuous learning and a passion for developing technology that positively impacts everyday lives.
            </p>
            <a
              href="/resume.pdf"
              download="NaveenNandhu_Resume.pdf"
              className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-red-600 text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-full hover:bg-red-500 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all w-fit group border border-red-500/50"
            >
              <FiDownload className="w-4 h-4 group-hover:-translate-y-1 transition-transform" /> Download Resume
            </a>
          </motion.div>

          {/* RIGHT SIDE BLOCK - SOCIALS (Desktop) */}
          <div className="absolute -right-10 lg:-right-20 xl:-right-32 top-[30%] hidden xl:flex flex-row bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-30 pointer-events-auto items-center gap-4">
            <span className="text-[9px] font-bold text-gray-500 tracking-[0.2em] uppercase">Connect</span>
            <div className="w-8 h-[1px] bg-white/10"></div>
            <a href="https://github.com/NaveenNandhu" target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-[#333] transition-all duration-300">
              <FiGithub className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/naveen-nandha-kumar-930975322/" target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-[#0077b5] transition-all duration-300">
              <FiLinkedin className="w-5 h-5" />
            </a>
            <a href="https://x.com/Nandhu_verse" target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-full text-gray-400 hover:bg-white hover:text-black transition-all duration-300">
              <XIcon className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/the_nandhu.verse/" target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-500 transition-all duration-300">
              <FiInstagram className="w-5 h-5" />
            </a>
            <a href="mailto:nandhanaveengasc41@gmail.com" className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-red-600 transition-all duration-300">
              <FiMail className="w-5 h-5" />
            </a>
          </div>

          {/* MOBILE ONLY: Floating Socials Bar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex xl:hidden flex-row bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 px-6 md:px-8 py-3 md:py-4 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-40 pointer-events-auto items-center gap-4 md:gap-6 w-max">
            <a href="https://github.com/NaveenNandhu" target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-full text-gray-400">
              <FiGithub className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/naveen-nandha-kumar-930975322/" target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-full text-gray-400">
              <FiLinkedin className="w-4 h-4" />
            </a>
            <a href="https://x.com/Nandhu_verse" target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-full text-gray-400">
              <XIcon className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/the_nandhu.verse/" target="_blank" rel="noreferrer" className="p-2 bg-white/5 rounded-full text-gray-400">
              <FiInstagram className="w-4 h-4" />
            </a>
          </div>

          {/* The Character with Red Edge Glow */}
          <motion.div
            ref={imageRef}
            className="relative h-full flex justify-center items-end"
          >
            {/* Mobile Static Image (Zero Lag) */}
            <div className="relative h-[110%] flex md:hidden justify-center items-end">
              <img
                src="/developer-nobg.png"
                alt="Cinematic Character Portrait"
                className="relative z-20 w-full h-full object-contain object-bottom pointer-events-auto"
              />
            </div>

            {/* Desktop Breathing Animation Wrapper */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-[110%] hidden md:flex justify-center items-end"
            >
              {/* CSS Drop Shadow Glow Mask */}
              <div
                className="hidden md:block absolute bottom-0 pointer-events-none"
                style={{
                  filter: `drop-shadow(0 0 ${20 + glowIntensity * 30}px rgba(220,38,38,${0.4 + glowIntensity * 0.6})) 
                              drop-shadow(0 0 ${40 + glowIntensity * 50}px rgba(255,0,0,${glowIntensity}))`,
                  transition: 'filter 0.2s ease-out'
                }}
              >
                <img
                  src="/developer-nobg.png"
                  alt="Glow Aura"
                  className="w-full h-full xl:h-auto max-w-[450px] md:max-w-[550px] xl:max-w-[650px] object-contain object-bottom brightness-0 sepia-[100%] hue-rotate-[-50deg] saturate-[600%] opacity-[0.85] blur-[3px] mix-blend-screen"
                  style={{ opacity: 0.2 + glowIntensity * 0.8 }}
                />
              </div>

              {/* Inner edge rim light layer */}
              <div
                className="hidden md:block absolute bottom-0 pointer-events-none"
                style={{ filter: `drop-shadow(0 0 5px rgba(255,100,100,${0.5 + glowIntensity}))` }}
              >
                <img
                  src="/developer-nobg.png"
                  alt="Rim Light Mask"
                  className="w-full h-full xl:h-auto max-w-[450px] md:max-w-[550px] xl:max-w-[650px] object-contain object-bottom brightness-[2] contrast-[2] mix-blend-overlay"
                  style={{ opacity: glowIntensity }}
                />
              </div>

              {/* Foreground Image */}
              <img
                src="/developer-nobg.png"
                alt="Cinematic Character Portrait"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`relative z-20 w-full h-full xl:h-auto max-w-[450px] md:max-w-[550px] xl:max-w-[650px] object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] contrast-[1.1] transition-all duration-700 pointer-events-auto cursor-pointer ${isHovered ? 'grayscale-0' : 'grayscale'}`}
              />

              {/* Floating Aura Particles */}
              <div className="hidden md:block absolute inset-0 pointer-events-none z-30" style={{ opacity: glowIntensity }}>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-red-400 rounded-full blur-[1px]"
                    initial={{ x: '50%', y: '80%' }}
                    animate={{
                      x: `${30 + Math.random() * 40}%`,
                      y: `${20 + Math.random() * 60}%`,
                      opacity: [0, 1, 0]
                    }}
                    transition={{ duration: Math.random() * 2 + 1.5, repeat: Infinity, ease: "easeOut" }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Ground Shadow */}
            <div className="absolute bottom-[-10px] w-[70%] h-6 bg-black blur-[15px] rounded-full z-0"></div>
          </motion.div>
        </div>

        {/* Primary CTAs are now handled in the Side Blocks */}

      </section>

      {/* 4. SERVICES SECTION */}
      <section id="services" className="relative px-6 md:px-16 min-h-[100vh] md:h-[100vh] h-auto flex flex-col justify-center py-12 md:py-24 z-10 overflow-hidden">

        {/* Effective Background Fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505] to-[#050505] -z-10"></div>

        {/* Fading Horizontal Divider Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* Cinematic Ambient Orbs specifically for Services */}
        <div className="absolute top-0 left-[-10%] w-96 h-96 bg-red-600/10 rounded-full blur-[80px] pointer-events-none z-0"></div>
        <div className="absolute bottom-10 right-[-5%] w-80 h-80 bg-white/5 rounded-full blur-[60px] pointer-events-none z-0"></div>



        <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
          <span className="text-[10px] font-bold tracking-[0.3em] text-red-500 uppercase mb-4">My Services</span>
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-16">
            What I Do <span className="text-red-600">Best.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
            {[
              { icon: FiMonitor, title: 'UI/UX Design', desc: 'Crafting pixel-perfect, intuitive interfaces that users love.' },
              { icon: FiCode, title: 'Web Development', desc: 'Building high-performance applications with modern stacks.' },
              { icon: FiCpu, title: 'Creative Tech & Hardware Integration', desc: 'Bridging software and physical devices for innovative solutions.' }
            ].map((service, i) => (
              <motion.div
                initial={{ opacity: 0, rotateX: -180, rotateY: 45, y: 150, scale: 0.5 }}
                whileInView={{ opacity: 1, rotateX: 0, rotateY: 0, y: 0, scale: 1 }}
                whileHover={{ scale: 1.05, y: -10, rotateX: 5, rotateY: -5 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ type: "spring", stiffness: 50, damping: 10, delay: i * 0.2 }}
                key={i}
                style={{ transformPerspective: 1200, transformStyle: "preserve-3d" }}
                className="relative p-[2px] rounded-[2rem] overflow-hidden group cursor-pointer"
              >
                {/* Glowing border mask */}
                <div className="absolute inset-0 bg-white/5 group-hover:bg-red-600 transition-colors duration-500"></div>

                {/* Inner Card Content */}
                <div className="relative h-full bg-black p-6 md:p-8 rounded-[2rem] flex flex-col items-start transition-all duration-500 overflow-hidden">

                  {/* Abstract Vector Animation Background */}
                  <div className="absolute -right-12 -bottom-12 w-56 h-56 opacity-[0.03] group-hover:opacity-20 transition-all duration-700 pointer-events-none group-hover:scale-125 z-0">
                    <motion.svg
                      viewBox="0 0 100 100"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full text-white group-hover:text-red-500 transition-colors duration-700"
                    >
                      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 6" />
                      <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 5" />
                      <polygon points="50,15 85,75 15,75" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <polygon points="50,85 15,25 85,25" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </motion.svg>
                  </div>

                  <div className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-white/5 text-gray-400 group-hover:bg-red-600 group-hover:text-white group-hover:shadow-[0_0_40px_rgba(220,38,38,0.8)] transition-all duration-500 group-hover:-translate-y-2">
                    <service.icon className="w-5 h-5" />
                  </div>

                  <h3 className="relative z-10 font-heading font-bold text-xl mb-3 text-white group-hover:text-red-500 transition-colors duration-300">{service.title}</h3>
                  <p className="relative z-10 text-gray-400 text-sm leading-relaxed mb-2 font-light group-hover:text-gray-300 transition-colors duration-300">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* 5. SKILLS SECTION */}
      <section id="skills" className="relative px-0 min-h-[100vh] md:h-[100vh] h-auto flex flex-col justify-center py-12 md:py-24 z-10 overflow-hidden">

        {/* Effective Background Fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505] to-[#050505] -z-10"></div>

        {/* Fading Horizontal Divider Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>

        {/* Cinematic Ambient Orbs */}
        <div className="absolute top-0 left-[-10%] w-96 h-96 bg-red-600/10 rounded-full blur-[80px] pointer-events-none z-0"></div>
        <div className="absolute bottom-10 right-[-5%] w-80 h-80 bg-white/5 rounded-full blur-[60px] pointer-events-none z-0"></div>



        <div className="max-w-7xl mx-auto w-full flex flex-col items-center z-10 mb-20 px-6 md:px-16">
          <span className="text-[10px] font-bold tracking-[0.3em] text-red-500 uppercase mb-4">Capabilities</span>
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-center leading-tight">
            Technical <span className="text-red-600">Arsenal.</span>
          </h2>
        </div>

        {/* Marquee Wrapper */}
        <div className="relative w-full flex flex-col gap-6 md:gap-8 overflow-hidden py-10 z-10">
          {/* Edge Fades for smooth entry/exit blending with the #050505 background */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#050505] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none"></div>

          {/* Row 1: Scroll Left */}
          <div className="flex w-max relative group">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity }}
              className="flex gap-6 md:gap-8 px-3 md:px-4 group-hover:[animation-play-state:paused] will-change-transform"
            >
              {/* Duplicate the array twice to ensure seamless scrolling of -50% */}
              {[...Array(2)].map((_, index) => (
                <React.Fragment key={index}>
                  {row1Skills.map(skill => (
                    <div key={`${index}-${skill.name}`} className="flex items-center gap-4 bg-[#0a0a0a] border border-white/5 rounded-full px-8 py-5 hover:bg-white/10 hover:border-red-500/50 transition-all duration-300 cursor-crosshair group/pill shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[200%] group-hover/pill:translate-x-[200%] transition-transform duration-1000"></div>
                      <skill.icon className="w-8 h-8 opacity-70 group-hover/pill:opacity-100 group-hover/pill:scale-110 transition-all duration-500 relative z-10" style={{ color: skill.color }} />
                      <span className="font-heading font-bold text-sm tracking-widest text-gray-500 group-hover/pill:text-white uppercase transition-colors relative z-10">{skill.name}</span>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </motion.div>
          </div>

          {/* Row 2: Scroll Left (Offset speed) */}
          <div className="flex w-max relative group">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 35, ease: "linear", repeat: Infinity }}
              className="flex gap-6 md:gap-8 px-3 md:px-4 group-hover:[animation-play-state:paused] will-change-transform"
            >
              {[...Array(2)].map((_, index) => (
                <React.Fragment key={index}>
                  {row2Skills.map(skill => (
                    <div key={`${index}-${skill.name}`} className="flex items-center gap-4 bg-[#0a0a0a] border border-white/5 rounded-full px-8 py-5 hover:bg-white/10 hover:border-red-500/50 transition-all duration-300 cursor-crosshair group/pill shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[200%] group-hover/pill:translate-x-[200%] transition-transform duration-1000"></div>
                      <skill.icon className="w-8 h-8 opacity-70 group-hover/pill:opacity-100 group-hover/pill:scale-110 transition-all duration-500 relative z-10" style={{ color: skill.color }} />
                      <span className="font-heading font-bold text-sm tracking-widest text-gray-500 group-hover/pill:text-white uppercase transition-colors relative z-10">{skill.name}</span>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

      {/* 6. EDUCATION SECTION */}
      <section id="education" className="relative px-4 md:px-8 min-h-screen flex flex-col justify-center py-12 md:py-24 z-10 overflow-hidden">

        {/* Effective Background Fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505] to-[#050505] -z-10"></div>

        {/* Fading Horizontal Divider Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>

        {/* Cinematic Ambient Orbs */}
        <div className="absolute top-0 left-[-10%] w-96 h-96 bg-red-600/10 rounded-full blur-[80px] pointer-events-none z-0"></div>
        <div className="absolute bottom-10 right-[-5%] w-80 h-80 bg-white/5 rounded-full blur-[60px] pointer-events-none z-0"></div>



        <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10 mt-8 md:mt-10">
          <span className="text-[10px] font-bold tracking-[0.3em] text-red-500 uppercase mb-4">Background</span>
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-12 text-center">
            Academic <span className="text-red-600">Journey.</span>
          </h2>

          <div className="w-full flex flex-col gap-10 md:gap-14 relative before:absolute before:left-[19px] md:before:left-1/2 md:before:-translate-x-1/2 before:top-0 before:h-full before:w-[1px] before:bg-white/10">
            {[
              {
                year: '2023 — 2026',
                degree: (
                  <>
                    Bachelor of Science in <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Information Technology</span>
                  </>
                ),
                institution: 'Gobi Arts & Science College',
                performance: '80%',
                focus: 'Full-Stack Web Development, UI/UX Design, and Software Engineering.',
                side: 'left'
              },
              {
                year: '2022 — 2023',
                degree: (
                  <>
                    Higher Secondary Certificate <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">(HSC)</span>
                  </>
                ),
                institution: 'Kamban Kalvi Nilaiyam',
                performance: '82.5%',
                focus: 'Computer Maths group including Physics, Chemistry, and Computer Science.',
                side: 'right'
              },
            ].map((edu, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row items-start justify-between w-full ${edu.side === 'left' ? 'md:flex-row-reverse' : ''}`}>
                {/* Red Dot */}
                <div className="absolute top-[42px] md:top-[50px] left-[13.5px] md:left-1/2 md:-translate-x-1/2 w-[12px] h-[12px] bg-red-600 rounded-full shadow-[0_0_10px_red] z-10 border-2 border-[#0a0a0a]"></div>

                {/* Empty Space for the other side on desktop */}
                <div className="hidden md:block w-1/2 shrink-0"></div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`w-full md:w-max pl-14 md:pl-0 ${edu.side === 'left' ? 'md:ml-auto md:mr-8' : 'md:ml-8'}`}
                >
                  <div className={`p-6 md:p-8 rounded-2xl bg-[#0a0a0a] border-2 border-white/20 flex flex-col text-left items-start w-full`}>
                    <span className="text-xs font-bold text-red-500 tracking-widest uppercase block mb-2">{edu.year}</span>
                    <h3 className="font-heading font-bold text-base md:text-lg lg:text-xl text-white mb-1 leading-snug md:whitespace-nowrap tracking-tight">{edu.degree}</h3>
                    <span className="text-sm text-gray-400 font-medium block mb-4">{edu.institution}</span>

                    <div className="flex flex-col gap-2 items-start">
                      <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-gray-300">
                        Performance: <strong className="text-white">{edu.performance}</strong>
                      </span>
                      {edu.focus && (
                        <p className="text-xs text-gray-500 leading-relaxed font-light mt-2 max-w-lg">
                          <strong className="text-gray-400">Focus:</strong> {edu.focus}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <div id="projects">
        <ProjectsSection />
      </div>

      {/* CREATIVE PURSUITS (PHOTOGRAPHY) */}
      <div id="creative">
        <CreativePursuits />
      </div>

      {/* CONTACT SECTION */}
      <div id="contact">
        <Contact />
      </div>

      {/* FOOTER */}
      <footer className="w-full py-10 border-t border-white/5 bg-[#030303] flex flex-col items-center z-10 relative">
        <div className="flex gap-4 mb-6">
          {[
            { Icon: FiGithub, url: "https://github.com/NaveenNandhu" },
            { Icon: FiLinkedin, url: "https://www.linkedin.com/in/naveen-nandha-kumar-930975322/" },
            { Icon: FiInstagram, url: "https://www.instagram.com/the_nandhu.verse/" },
            { Icon: XIcon, url: "https://x.com/Nandhu_verse" }
          ].map((social, idx) => (
            <a key={idx} href={social.url} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-red-500 hover:bg-red-600/10 transition-all duration-300">
              <social.Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
        <span className="text-[9px] font-bold text-gray-600 tracking-[0.2em] uppercase">© 2026 Nandha. All Rights Reserved.</span>
      </footer>

    </div>
  );
}
