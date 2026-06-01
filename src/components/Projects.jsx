import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiExternalLink, FiGithub, FiArrowRight, FiUsers, FiCamera, FiActivity, FiDatabase, FiServer, FiLayers, FiCode, FiLayout, FiMaximize2, FiPlay, FiChevronRight } from 'react-icons/fi';
import { SiCplusplus, SiArduino, SiPython, SiTensorflow, SiReact, SiNodedotjs, SiExpress, SiMongodb, SiTailwindcss, SiMysql, SiPhp, SiBootstrap, SiJavascript, SiFigma, SiHtml5 } from 'react-icons/si';
import { FaCss3Alt } from 'react-icons/fa';

const projects = [
  {
    id: 1,
    title: "Intercollege Meet Management System",
    subtitle: "End-to-end Event Coordination Platform",
    image: "/inter_college_dashboard.png",
    shortDesc: "A comprehensive digital platform designed to handle registrations, scheduling, scoring, and live leaderboards for large-scale intercollege technical and cultural meets.",
    tags: ["Completed", "Full-Stack Web"],
    tech: [
      { name: "PHP", icon: SiPhp, color: "#777BB4" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    ],
    stats: [
      { label: "Registered Students", value: "50+", icon: FiUsers },
      { label: "Events Managed", value: "12", icon: FiLayers },
      { label: "QR Scans", value: "150+", icon: FiCamera }
    ],
    links: {
      live: "https://intercollege-meet-management-app-3o.vercel.app/index.php",
      github: "https://github.com/NaveenNandhu/inter-college-app-management.git"
    },
    details: {
      description: "A comprehensive Inter-College Meet Management Application built using PHP and MySQL. It manages the entire lifecycle of large-scale academic or cultural events involving multiple colleges. Designed with a serverless architecture deployed on Vercel, it features distinct dashboards for Users (Students), Event Coordinators, and System Admins, complete with digital QR code ticketing and live result publishing.",
      features: [
        "Serverless deployment on Vercel using the vercel-php runtime with custom routing via api/index.php.",
        "Role-based access control with distinct dashboards for Students, Coordinators, and Admins.",
        "Automated QR code generation serving as digital entry passes for registered students.",
        "On-site QR code scanning by coordinators to instantly verify attendance and track participants.",
        "Dynamic admin controls to create meets, manage events, assign coordinators, and generate PDF certificates."
      ],
      workflow: "1. Admin creates a Meet and associated events, then assigns Coordinators.\n2. Students browse events online and register, receiving a unique QR Code ticket.\n3. Coordinators use the scanning module at the venue to verify student QR codes.\n4. Coordinators submit event results to the system.\n5. Admins review and officially publish the results, making them visible on the Student dashboard.",
      architecture: "Serverless MVC Architecture hosted on Vercel. Instead of a traditional Apache server, requests are intercepted by api/index.php (configured via vercel.json) which acts as a custom router to serve PHP files and static assets efficiently.",
      database: "MySQL database (hosted on TiDB Cloud). Managed via environment variables (.env) and config/db_connect.php for secure credentials management. Relational tables linking Meets, Events, Users, Registrations, and Results.",
      api: "Custom PHP routing API (api/index.php) handles all incoming requests. Integrated QR code generation libraries and secure PDF generation for certificates.",
      challenges: "Deploying a legacy PHP/MySQL application on a modern serverless environment (Vercel). Solved by creating a custom index.php router and reconfiguring vercel.json to handle dynamic route matching without an Apache server.",
      future: "Migrating the frontend to React/Next.js and separating the PHP backend into a standalone REST API. Implementing real-time WebSocket leaderboards."
    }
  },
  {
    id: 2,
    title: "FoodShare (FoodRescueConnect)",
    subtitle: "Food Donation & Distribution Platform",
    image: "/foodshare_dashboard.png",
    shortDesc: "A web application developed to reduce food waste by efficiently connecting surplus food donors with charitable organizations.",
    tags: ["Completed", "Full-Stack Web"],
    tech: [
      { name: "PHP", icon: SiPhp, color: "#777BB4" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" }
    ],
    stats: [
      { label: "User Roles", value: "3", icon: FiUsers },
      { label: "Platform", value: "Web", icon: FiLayout },
      { label: "Database", value: "MySQL", icon: FiDatabase }
    ],
    links: {
      live: "https://food-donation-amber.vercel.app/",
      github: "https://github.com/NaveenNandhu/food_donation.git"
    },
    details: {
      description: "FoodShare acts as a bridge between food donors (like restaurants and grocery stores) and charitable organizations. The goal is to ensure usable surplus food reaches those in need rather than going to waste. I developed the entire application, including the UI, authentication, request workflows, and backend logic.",
      features: [
        "Role-based dashboards for Donors, Charities, and Administrators.",
        "Donors can easily list surplus food with quantity and pickup location.",
        "Verified charities can browse nearby donations and request pickups.",
        "Charity verification module controlled by the Admin to prevent misuse.",
        "Fully responsive design working seamlessly on mobile and desktop."
      ],
      workflow: "1. Donors (e.g., restaurants) list available surplus food.\n2. The system makes the listing visible only to admin-verified charities.\n3. A charity requests the food; the donor reviews and accepts.\n4. Charity collects the food, and the system logs the completed donation.",
      architecture: "Monolithic MVC web application. Frontend designed with HTML/CSS/JS for responsive views, backed by a PHP server handling business logic and routing.",
      database: "Relational MySQL database managing Users, Roles, Donations, Requests, and Charity Verification statuses.",
      api: "PHP form handling and session management for secure authentication and data submission.",
      challenges: "Designing an intuitive multi-role system where donors and charities interact securely without direct contact until a request is approved. Overcame this by building a robust request-approval state machine in PHP.",
      future: "Implementing a real-time notification system and integrating Maps API for location-based searching."
    }
  },
  {
    id: 3,
    title: "AI Smart Classroom Face Recognition",
    subtitle: "Attendance System using ESP32-CAM",
    image: "/attendance_system_dashboard.png",
    shortDesc: "A complete hardware-software ecosystem utilizing ESP32-CAM and AI for automated student attendance tracking in smart classrooms.",
    tags: ["Active", "Hardware + AI"],
    tech: [
      { name: "ESP32", icon: SiArduino, color: "#00979D" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    ],
    stats: [],
    links: {
      hardwareOnly: true,
      github: "https://github.com/NaveenNandhu/Smart-Classroom-System.git"
    },
    details: {
      description: "An advanced, fully integrated AI Smart Classroom Attendance System designed to eliminate manual roll calls. It uses ESP32-CAM modules strategically placed in classrooms to capture faces, stream them to a localized server, and utilize a deep learning Python backend (TensorFlow/OpenCV) for high-accuracy facial recognition.",
      features: [
        "Real-time face detection and multi-face recognition.",
        "Automated attendance logging directly to a centralized database.",
        "Secure teacher dashboard for analytics and manual overrides.",
        "Anti-spoofing algorithms to prevent photo-based fake attendance.",
        "Low-latency local network streaming."
      ],
      workflow: "1. ESP32-CAM captures video stream over WiFi.\n2. Server receives frames via WebSocket.\n3. Python backend processes frames through MTCNN & FaceNet.\n4. Recognized IDs are matched with student database.\n5. Attendance record is inserted into MySQL/MongoDB.\n6. React Dashboard updates in real-time.",
      architecture: "Distributed Edge-to-Cloud architecture. Edge nodes (ESP32) handle image acquisition. Local Edge Server (Node.js/Python) handles AI processing. Cloud Dashboard (React) handles UI and reporting.",
      database: "Relational mapping for Students, Classes, Subjects, and Attendance Logs. Optimized indexing on timestamp and student_id for rapid analytics query performance.",
      api: "RESTful JSON API with endpoints for /api/attendance/log, /api/students/register, /api/analytics/daily. WebSocket integration for live camera feeds.",
      challenges: "Handling multiple face detections simultaneously with low processing power. Overcame by offloading inference from the ESP32 to a dedicated local backend server.",
      future: "Integration with institution ERP systems. Adding emotion/attentiveness tracking during lectures."
    }
  },
  {
    id: 4,
    title: "FarmFresh – Organic Grocery Landing Page",
    subtitle: "Premium UI/UX Design",
    image: "/FarmFresh.png",
    shortDesc: "A clean, modern, and highly convertible landing page designed in Figma for an organic grocery brand, focusing on fresh aesthetics and user-friendly navigation.",
    tags: ["Design", "Figma"],
    tech: [
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    ],
    stats: [],
    links: { live: "https://www.figma.com/community/file/1640780628327125549", github: "#" },
    details: {
      description: "A comprehensive UI/UX design project for an organic grocery e-commerce landing page. The design emphasizes freshness, trust, and ease of use, utilizing a vibrant color palette, high-quality imagery, and clear calls to action to drive conversions.",
      features: ["High-conversion hero section", "Component-based product cards", "Auto-layout responsive frames"],
      workflow: "1. Wireframing\n2. Visual Design\n3. Prototyping",
      architecture: "Figma design system with global tokens for brand colors, typography, and spacing.",
      database: "N/A",
      api: "N/A",
      challenges: "Balancing vibrant imagery with clean typography to ensure the products stand out without overwhelming the user.",
      future: "Exporting components to React and Tailwind CSS for actual frontend implementation."
    }
  },
  {
    id: 5,
    title: "Lovable Fur – Pet Care Landing Page UI",
    subtitle: "Pet Grooming & Care Interface",
    image: "/Lovable Fur.png",
    shortDesc: "A playful, modern, and engaging UI/UX design for a pet care and grooming service, featuring friendly typography and soft aesthetic choices.",
    tags: ["Design", "Figma"],
    tech: [
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    ],
    stats: [],
    links: { live: "https://www.figma.com/community/file/1641021211894743311", github: "#" },
    details: {
      description: "A UI/UX design project for a pet care and grooming platform named 'Lovable Fur'. The goal was to create an interface that feels friendly, trustworthy, and joyful for pet owners. The design uses rounded corners, soft pastel accents, and playful typography to achieve a welcoming digital environment.",
      features: ["Hero section with playful aesthetic", "Service booking layout mockups", "Responsive mobile-first considerations"],
      workflow: "1. Moodboarding\n2. Component Library Creation\n3. High-fidelity UI Layouts",
      architecture: "Figma component system focusing on reusable, friendly UI elements.",
      database: "N/A",
      api: "N/A",
      challenges: "Creating a design that is playful and cute while maintaining high accessibility and clear visual hierarchy for booking services.",
      future: "Building out the full booking portal prototype with micro-interactions."
    }
  }
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [figmaZoom, setFigmaZoom] = useState(1);
  const [resetKey, setResetKey] = useState(0);
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -window.innerWidth * 0.5, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: window.innerWidth * 0.5, behavior: 'smooth' });
    }
  };

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      setFigmaZoom(1);
      setResetKey(prev => prev + 1);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  return (
    <section id="projects" className="py-12 md:py-24 bg-[#030303] relative border-t border-white/5">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-red-900/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <span className="text-[10px] font-bold tracking-[0.3em] text-red-500 uppercase mb-4">Portfolio</span>
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl mb-6 text-center">
            Featured <span className="text-red-600">Projects.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-center text-sm md:text-base leading-relaxed">
            A showcase of my technical expertise, from hardware-integrated AI systems to highly scalable full-stack web platforms and premium UI/UX Figma designs.
          </p>
        </div>
      </div>

      {/* Projects Carousel - Wider container to fit 3 large boxes + arrows comfortably */}
      <div className="relative w-full max-w-[95rem] mx-auto group/carousel px-4 md:px-20 lg:px-28 z-10">
          {/* Navigation Buttons (Always visible on desktop with animation) */}
          <motion.button 
            onClick={scrollLeft}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            animate={{ 
              boxShadow: ["0px 0px 0px rgba(220,38,38,0)", "0px 0px 20px rgba(220,38,38,0.4)", "0px 0px 0px rgba(220,38,38,0)"] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute left-2 md:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 bg-[#0a0a0a] border border-white/20 hover:border-red-500 rounded-full flex items-center justify-center text-white hover:text-red-500 transition-colors backdrop-blur-xl"
          >
            <FiChevronRight className="rotate-180 w-6 h-6 md:w-8 md:h-8" />
          </motion.button>
          
          <motion.button 
            onClick={scrollRight}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            animate={{ 
              boxShadow: ["0px 0px 0px rgba(220,38,38,0)", "0px 0px 20px rgba(220,38,38,0.4)", "0px 0px 0px rgba(220,38,38,0)"] 
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="absolute right-2 md:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 bg-[#0a0a0a] border border-white/20 hover:border-red-500 rounded-full flex items-center justify-center text-white hover:text-red-500 transition-colors backdrop-blur-xl"
          >
            <FiChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </motion.button>

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 md:gap-8 pb-10 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mx-auto max-w-[1204px]"
          >
            {projects.map((project) => (
            <motion.div 
              key={project.id}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group cursor-pointer rounded-2xl bg-[#0a0a0a] border border-white/10 overflow-hidden flex flex-col h-full hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.1)] transition-all duration-500 w-[85vw] md:w-[340px] lg:w-[380px] flex-none snap-center"
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image/Banner Mockup */}
              <div className="h-56 w-full bg-[#111] relative overflow-hidden flex items-center justify-center border-b border-white/5">
                {project.image ? (
                  <>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80 z-10"></div>
                  </>
                ) : (
                  <motion.div 
                    className="w-32 h-32 rounded-2xl border border-red-500/30 flex items-center justify-center bg-red-500/5 group-hover:scale-110 transition-transform duration-700 z-20 relative"
                  >
                    {project.id === 1 ? <FiCamera className="w-12 h-12 text-red-500" /> : <FiLayers className="w-12 h-12 text-red-500" />}
                  </motion.div>
                )}

                {/* Status Tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold tracking-widest uppercase text-white">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold font-heading text-white mb-2 group-hover:text-red-500 transition-colors line-clamp-1">{project.title}</h3>
                <p className="text-red-500 text-xs font-semibold mb-4 tracking-wide uppercase">{project.subtitle}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1 line-clamp-3">
                  {project.shortDesc}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {project.tech.slice(0, 4).map((t, i) => (
                    <div key={i} className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center tooltip-trigger" title={t.name}>
                      <t.icon style={{ color: t.color }} className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                  {project.tech.length > 4 && (
                    <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-xs text-gray-400 font-bold">
                      +{project.tech.length - 4}
                    </div>
                  )}
                </div>

                {/* Action */}
                <div className="flex items-center gap-3 text-sm font-bold text-white tracking-widest uppercase mt-auto group-hover:text-red-500 transition-colors">
                  <span>{project.tags.includes("Figma") ? "View Preview" : "View Project"}</span>
                  <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-10">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            ></motion.div>

            {/* Modal Container */}
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-7xl h-[90vh] bg-[#050505] border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Close Button Header (Common) */}
              <div className="absolute top-0 w-full h-16 md:h-24 bg-gradient-to-b from-black/90 via-black/40 to-transparent z-[60] flex items-center justify-between px-6 pointer-events-none">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 drop-shadow-md">
                  {selectedProject.tags.includes("Figma") ? "Figma Design Showcase" : "Project Case Study"}
                </span>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md hover:bg-red-500/80 border border-white/10 hover:border-red-500 flex items-center justify-center text-white transition-all group pointer-events-auto shadow-lg"
                >
                  <FiX className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {selectedProject.tags.includes("Figma") ? (
                // FIGMA DESIGN SPECIAL MODAL
                <div className="relative w-full h-full flex flex-col bg-[#050505] overflow-hidden">
                  <div 
                    className="relative w-full h-full flex items-center justify-center overflow-hidden px-4 md:px-12 pt-16 pb-20"
                    onWheel={(e) => {
                      const direction = e.deltaY < 0 ? 1 : -1;
                      setFigmaZoom(prev => Math.min(Math.max(1, prev + (direction * 0.15)), 5));
                    }}
                  >
                    {selectedProject.image ? (
                      <>
                        <motion.img 
                          key={resetKey}
                          src={selectedProject.image} 
                          alt={selectedProject.title} 
                          drag={figmaZoom > 1}
                          dragConstraints={{ left: -1500, right: 1500, top: -1500, bottom: 1500 }}
                          dragElastic={0.1}
                          animate={{ scale: figmaZoom }}
                          transition={{ type: "spring", stiffness: 400, damping: 40 }}
                          className={`w-full h-full object-contain rounded-lg drop-shadow-2xl ${figmaZoom > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`} 
                        />
                        
                        {/* Floating Zoom Controls */}
                        <div className="absolute top-24 right-4 md:right-12 bg-black/60 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-2 p-1.5 z-50 shadow-2xl">
                          <button onClick={() => setFigmaZoom(prev => Math.max(1, prev - 0.5))} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/20 text-white flex items-center justify-center font-bold transition-colors">-</button>
                          <button 
                            onClick={() => {
                              setFigmaZoom(1);
                              setResetKey(prev => prev + 1);
                            }} 
                            className="px-3 text-[10px] text-gray-300 font-bold uppercase tracking-widest hover:text-white transition-colors"
                          >
                            Reset
                          </button>
                          <button onClick={() => setFigmaZoom(prev => Math.min(5, prev + 0.5))} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/20 text-white flex items-center justify-center font-bold transition-colors">+</button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <SiFigma className="w-24 h-24 text-white/10 mb-4" />
                        <p className="text-gray-500">No high-res image available</p>
                      </div>
                    )}
                    
                    {/* Zoom Hint */}
                    {figmaZoom === 1 && (
                      <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur px-4 py-2 rounded-full text-gray-400 text-[10px] md:text-xs pointer-events-none flex items-center gap-2 border border-white/5 animate-pulse z-40 shadow-xl">
                        <span>Scroll to Zoom</span> • <span>Drag to Move</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Bottom Action Bar with Shadow */}
                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 px-6 md:px-12 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-row items-end justify-between z-[50] pointer-events-none gap-4">
                    <h2 className="text-lg md:text-2xl font-black text-white drop-shadow-lg font-heading line-clamp-1">{selectedProject.title}</h2>
                    <a 
                      href={selectedProject.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pointer-events-auto px-5 md:px-6 py-2.5 md:py-3 bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest uppercase rounded-full shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 text-[10px] md:text-xs whitespace-nowrap shrink-0"
                    >
                      <SiFigma className="w-3 h-3 md:w-4 md:h-4" />
                      View Design
                    </a>
                  </div>
                </div>
              ) : (
                // EXISTING PROJECT CASE STUDY MODAL
                <div 
                  id="modal-scroll-container"
                  className="flex-1 overflow-y-auto no-scrollbar scroll-smooth"
                  onScroll={(e) => {
                    const container = e.target;
                    const sections = ['overview', 'features', 'architecture', 'challenges'];
                    let currentTab = activeTab;
                    
                    for (const section of sections) {
                      const el = document.getElementById(section);
                      if (el) {
                        const rect = el.getBoundingClientRect();
                        const containerRect = container.getBoundingClientRect();
                        const offset = 150; // offset to trigger active tab earlier
                        
                        if (rect.top <= containerRect.top + offset && rect.bottom >= containerRect.top + offset) {
                          currentTab = section;
                          break;
                        }
                      }
                    }
                    
                    if (currentTab !== activeTab) {
                      setActiveTab(currentTab);
                    }
                  }}
                >
                  {/* Hero Banner */}
                  <div className="w-full h-[40vh] md:h-[50vh] bg-[#111] relative flex items-center justify-center overflow-hidden">
                     {selectedProject.image && (
                     <img 
                       src={selectedProject.image} 
                       alt={selectedProject.title} 
                       className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen scale-105"
                     />
                   )}
                   
                   <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-10"></div>
                   
                   <motion.div 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.2 }}
                     className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10"
                   >
                     <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-white mb-4 leading-tight">
                       {selectedProject.title}
                     </h1>
                     <p className="text-red-500 font-bold tracking-widest uppercase md:text-lg">
                       {selectedProject.subtitle}
                     </p>
                   </motion.div>
                </div>

                <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 flex flex-col lg:flex-row gap-16 relative">
                  
                  {/* Sticky Sidebar Navigation (Desktop only) */}
                  <div className="hidden lg:block w-64 shrink-0">
                    <div className="sticky top-24 space-y-2">
                      {['overview', 'features', 'architecture', 'challenges'].map((tab) => (
                        <button 
                          key={tab}
                          onClick={() => {
                            setActiveTab(tab);
                            const element = document.getElementById(tab);
                            const container = document.getElementById('modal-scroll-container');
                            if (element && container) {
                              const elementRect = element.getBoundingClientRect();
                              const containerRect = container.getBoundingClientRect();
                              const relativeTop = elementRect.top - containerRect.top + container.scrollTop;
                              
                              container.scrollTo({
                                top: relativeTop - 80, // Offset for sticky header
                                behavior: 'smooth'
                              });
                            }
                          }}
                          className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold tracking-widest uppercase transition-all ${activeTab === tab ? 'bg-red-500/10 text-red-500 border-l-2 border-red-500' : 'text-gray-500 hover:text-white hover:bg-white/5 border-l-2 border-transparent'}`}
                        >
                          {tab}
                        </button>
                      ))}

                      {/* Modal Action Buttons */}
                      <div className="mt-12 space-y-4">
                        {selectedProject.links?.live && selectedProject.links.live !== "#" && (
                          <a href={selectedProject.links.live} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest uppercase rounded-xl transition-colors text-xs">
                            <FiExternalLink /> Live Demo
                          </a>
                        )}
                        {selectedProject.links?.hardwareOnly && (
                          <div className="w-full relative group flex justify-center">
                            <button disabled className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white/5 text-gray-500 cursor-not-allowed border border-white/10 font-bold tracking-widest uppercase rounded-xl transition-colors text-xs">
                              <FiExternalLink /> Live Demo
                            </button>
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#111] text-white text-[10px] tracking-wider py-2 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 pointer-events-none whitespace-nowrap shadow-xl z-50">
                              Requires ESP32-CAM Hardware
                            </div>
                          </div>
                        )}
                        <a href={selectedProject.links?.github || '#'} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold tracking-widest uppercase rounded-xl transition-colors text-xs">
                          <FiGithub /> GitHub Repo
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="flex-1">
                    
                    {/* Stats Widget Row */}
                    {selectedProject.stats && selectedProject.stats.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                        {selectedProject.stats.map((stat, idx) => (
                          <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-center">
                            <stat.icon className="w-6 h-6 text-red-500 mb-3" />
                            <h4 className="text-3xl font-black text-white mb-1 font-heading">{stat.value}</h4>
                            <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Section Content based on scroll or tab (Simplified for mock) */}
                    <div className="space-y-16">
                      
                      {/* Overview */}
                      <section id="overview">
                        <h3 className="text-2xl font-heading font-bold text-white mb-6 border-b border-white/10 pb-4">Project Overview</h3>
                        <p className="text-gray-300 leading-relaxed md:text-lg mb-8">
                          {selectedProject.details.description}
                        </p>
                        
                        <h4 className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-4">Technology Stack</h4>
                        <div className="flex flex-wrap gap-4">
                          {selectedProject.tech.map((t, i) => (
                            <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                              <t.icon style={{ color: t.color }} className="w-4 h-4" />
                              <span className="text-sm font-semibold text-gray-200">{t.name}</span>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Features & Workflow */}
                      <section id="features">
                        <h3 className="text-2xl font-heading font-bold text-white mb-6 border-b border-white/10 pb-4">Key Features & Workflow</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <ul className="space-y-4">
                              {selectedProject.details.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                  </div>
                                  <span className="text-gray-300">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                            <h4 className="text-red-500 text-xs font-bold tracking-widest uppercase mb-4">Process Workflow</h4>
                            <p className="text-gray-400 text-sm leading-loose whitespace-pre-line">
                              {selectedProject.details.workflow}
                            </p>
                          </div>
                        </div>
                      </section>

                      {/* Architecture & Database */}
                      <section id="architecture">
                        <h3 className="text-2xl font-heading font-bold text-white mb-6 border-b border-white/10 pb-4">Architecture & Integration</h3>
                        <div className="space-y-8">
                          <div>
                            <h4 className="text-white font-bold mb-2 flex items-center gap-2"><FiLayout className="text-red-500" /> System Architecture</h4>
                            <p className="text-gray-400 leading-relaxed">{selectedProject.details.architecture}</p>
                          </div>
                          <div>
                            <h4 className="text-white font-bold mb-2 flex items-center gap-2"><FiDatabase className="text-red-500" /> Database Structure</h4>
                            <p className="text-gray-400 leading-relaxed">{selectedProject.details.database}</p>
                          </div>
                          <div>
                            <h4 className="text-white font-bold mb-2 flex items-center gap-2"><FiCode className="text-red-500" /> API Integration</h4>
                            <p className="text-gray-400 leading-relaxed">{selectedProject.details.api}</p>
                          </div>
                        </div>
                      </section>

                      {/* Challenges & Future */}
                      <section id="challenges">
                        <h3 className="text-2xl font-heading font-bold text-white mb-6 border-b border-white/10 pb-4">Challenges & Future Roadmap</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
                            <h4 className="text-red-400 text-xs font-bold tracking-widest uppercase mb-3">Challenges Faced</h4>
                            <p className="text-gray-300 text-sm leading-relaxed">{selectedProject.details.challenges}</p>
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h4 className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-3">Future Improvements</h4>
                            <p className="text-gray-300 text-sm leading-relaxed">{selectedProject.details.future}</p>
                          </div>
                        </div>
                      </section>

                    </div>

                    {/* Mobile Action Buttons */}
                    <div className="mt-16 lg:hidden space-y-4">
                      {selectedProject.links?.live && selectedProject.links.live !== "#" && (
                        <a href={selectedProject.links.live} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest uppercase rounded-xl transition-colors text-xs">
                          <FiExternalLink /> Live Demo
                        </a>
                      )}
                      {selectedProject.links?.hardwareOnly && (
                        <div className="w-full relative group flex justify-center">
                          <button disabled className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white/5 text-gray-500 cursor-not-allowed border border-white/10 font-bold tracking-widest uppercase rounded-xl transition-colors text-xs">
                            <FiExternalLink /> Live Demo
                          </button>
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#111] text-white text-[10px] tracking-wider py-2 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 pointer-events-none whitespace-nowrap shadow-xl z-50">
                            Requires ESP32-CAM Hardware
                          </div>
                        </div>
                      )}
                      <a href={selectedProject.links?.github || '#'} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold tracking-widest uppercase rounded-xl transition-colors text-xs">
                        <FiGithub /> GitHub Repo
                      </a>
                    </div>

                  </div>
                </div>
              </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
