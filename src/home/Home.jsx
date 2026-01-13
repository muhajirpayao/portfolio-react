import react from '../assets/react.svg';
import { Mail, Github, MapPin, Phone, Twitter, Facebook } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Home = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="flex-col m-0 overflow-x-hidden scroll-smooth relative text-white">
          
            <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-purple-900 via-slate-900 to-black animate-gradientMove"></div>

            {/* Navbar */}
            <header
                className={`fixed top-0 z-50 w-full px-10 flex items-center justify-between h-16 backdrop-blur-md transition-all duration-500 ${isScrolled ? "bg-black/70 shadow-md" : "bg-transparent"
                    }`}
            >
                <h1 className="text-white font-bold text-2xl tracking-wide">
                    KrazyDev.
                </h1>
          
                <nav>
                    <ul className="flex space-x-10 text-white cursor-pointer">
                        <li className="hover:text-yellow-400 transition-colors duration-300">
                            <a href="#home">Home</a>
                        </li>
                        <li className="hover:text-yellow-400 transition-colors duration-300">
                            <a href="#about">About</a>
                        </li>
                        <li className="hover:text-yellow-400 transition-colors duration-300">
                            <a href="#projects">Projects</a>
                        </li>
                        <li className="hover:text-yellow-400 transition-colors duration-300">
                            <a href="#contact">Contact</a>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* Hero Section */}
            <motion.section
                id="home"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="min-h-screen flex flex-col items-center justify-center text-center px-4"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="w-48 h-48 rounded-full overflow-hidden shadow-lg border-4 border-yellow-500"
                >
                    <img
                        src="/src/assets/hero.jpg"
                        alt="hero"
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="mt-6"
                >
                    <p className="text-gray-300 tracking-widest">Hello I'm</p>
                    <h1 className="text-5xl font-extrabold text-yellow-400 mt-4 mb-3">
                        Muhajir Payao
                    </h1>
                    <h3 className="text-gray-400 text-lg mb-4">
                        Web Developer | Full Stack Developer
                    </h3>

                    {/* Location and Phone Info */}
                    <div className="flex flex-col items-center gap-2 mb-4 text-gray-300 text-sm sm:text-base">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-500">Taguig City, Philippines</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-500">0928 865 5443</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed max-w-xl mx-auto text-base sm:text-lg">
                        I specialize in creating responsive, high-performing websites using
                        modern frameworks. I love designing smooth user interfaces that tell
                        stories and solve problems through clean and elegant code.
                    </p>

                    {/* Buttons */}
                    <div className="flex items-center justify-center mt-6 gap-4">
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-xl shadow-md transition-transform transform hover:scale-105">
                            View my work
                        </button>
                        <button className="border border-yellow-400 py-2 px-6 rounded-xl font-bold text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300">
                            Get in touch
                        </button>
                    </div>
                </motion.div>
            </motion.section>

            {/* About Section */}
            <motion.section
                id="about"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="min-h-screen flex items-center justify-center px-6 sm:px-10 py-20"
            >
                <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-16">
                    {/* Left Text Content */}
                    <motion.div
                        className="flex-1 space-y-6 text-center md:text-left"
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h4 className="text-yellow-400 font-semibold">Hello, Welcome</h4>
                        <h1 className="text-3xl sm:text-5xl font-bold">
                            I’m <span className="text-yellow-400">Muhajir Payao</span>
                        </h1>
                        <p className="text-gray-300 leading-relaxed max-w-md mx-auto md:mx-0 text-sm sm:text-base">
                            I'm a passionate web and mobile developer who enjoys building
                            modern, elegant, and user-friendly experiences. I specialize in
                            Flutter, React, and Python — always eager to learn and innovate.
                        </p>
                        <button className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg shadow-md transition-all">
                            Contact Me
                        </button>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        className="hidden md:flex flex-1 justify-center"
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src="/src/assets/hero.jpg"
                            alt="About"
                            className="w-80 h-80 object-cover rounded-2xl shadow-lg border-4 border-yellow-500"
                        />
                    </motion.div>
                </div>
            </motion.section>

            {/* Projects Section */}
            <motion.section
                id="projects"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="min-h-screen flex flex-col justify-center items-center px-8 py-20"
            >
                <h1 className="text-4xl font-bold text-yellow-400 mb-12 tracking-wide">
                    My Projects
                </h1>

                <div className="flex flex-wrap justify-center gap-10">
                    {[
                        {
                            title: "Portfolio Website",
                            desc: "A responsive personal website built with React and Tailwind showcasing my works and skills.",
                            img: react,
                        },
                        {
                            title: "Funeral Management System",
                            desc: "A full-featured cross-platform web app built with Flutter, dart and Firebase for handling client requests and bookings.",
                            img: "funeralapp.png",
                        },
                        {
                            title: "E-Commerce Dashboard",
                            desc: "Admin dashboard built with React and Firebase for managing inventory, users, and orders.",
                            img: "dashboard.png",
                        },
                    ].map((proj, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 120 }}
                            className="bg-white/10 backdrop-blur-md border border-yellow-500/30 h-[420px] w-80 rounded-2xl shadow-lg hover:shadow-yellow-500/40 flex flex-col items-center justify-start overflow-hidden"
                        >
                            <img
                                src={`/src/assets/${proj.img}`}
                                alt={proj.title}
                                className="h-48 w-full object-cover opacity-90 hover:opacity-100 transition-all"
                            />
                            <div className="p-5 text-center flex flex-col justify-between flex-grow">
                                <h2 className="text-xl font-semibold text-yellow-400 mb-2">
                                    {proj.title}
                                </h2>
                                <p className="text-gray-300 text-sm mb-4 flex-grow">
                                    {proj.desc}
                                </p>
                                <button className="text-sm font-medium text-black bg-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-500 transition-all">
                                    View Project
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section
                id="contact"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="min-h-screen flex flex-col items-center justify-center py-20 px-10"
            >
                <div className="text-center text-gray-300 mb-10">
                    <h1 className="text-3xl text-yellow-400 mb-2">What I Do</h1>
                    <p className="max-w-md mx-auto">
                        Interested in collaborating or learning more about my work? Let’s
                        build something amazing together.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {[
                        { img: "javascript.png", label: "JavaScript" },
                        { img: "flutter.jpg", label: "Flutter" },
                        { img: "react.svg", label: "React" },
                        { img: "tailwind.png", label: "Tailwind" },
                        { img: "fireabase.jpg", label: "Firebase" },
                        { img: "sharp.png", label: "C#" },
                        { img: "html.png", label: "HTML" },
                        { img: "css.png", label: "CSS" },
                    ].map((skill, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.3 }}
                            className="border border-yellow-600 rounded-xl flex flex-col justify-center items-center h-28 w-32 bg-white/10 shadow-md hover:shadow-yellow-400/30 transition-all"
                        >
                            <img
                                src={`/src/assets/${skill.img}`}
                                alt={skill.label}
                                className="h-12 w-12 mb-2"
                            />
                            <span className="text-white text-sm">{skill.label}</span>
                        </motion.div>
                    ))}
                  
                </div>
         <motion.div
         className='flex justify-center mt-20 border border-solid h-130 w-full border-yellow-900'>
         </motion.div>

                {/* FOOTER  */}
                <footer className="w-full border-t border-gray-700 mt-20 pt-12 pb-8 text-gray-400">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 pb-10">
                            <div>
                                <h2 className="text-white text-2xl font-bold">KrazyDev.</h2>
                                <p className="text-sm mt-1 tracking-wide">
                                    Creative Web Developer passionate about modern design and
                                    clean code.
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-yellow-400 mb-2">
                                    Weebly Themes
                                </p>
                                <ul className="space-y-1 text-sm">
                                    <li className="hover:text-yellow-400 cursor-pointer">
                                        Pre-sale FAQs
                                    </li>
                                    <li className="hover:text-yellow-400 cursor-pointer">
                                        Submit a Ticket
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-yellow-400 mb-2">
                                    Services
                                </p>
                                <ul className="space-y-1 text-sm">
                                    <li className="hover:text-yellow-400 cursor-pointer">
                                        Theme Tweak
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-yellow-400 mb-2">
                                    Showcase
                                </p>
                                <ul className="space-y-1 text-sm">
                                    <li className="hover:text-yellow-400 cursor-pointer">
                                        Widgetkit
                                    </li>
                                    <li className="hover:text-yellow-400 cursor-pointer">
                                        Support
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-yellow-400 mb-2">
                                    About
                                </p>
                                <ul className="space-y-1 text-sm">
                                    <li className="hover:text-yellow-400 cursor-pointer">
                                        Contact Us
                                    </li>
                                    <li className="hover:text-yellow-400 cursor-pointer">
                                        Affiliates
                                    </li>
                                    <li className="hover:text-yellow-400 cursor-pointer">
                                        Resources
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* Socials + Copyright */}
                        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                            <div className="flex items-center space-x-4">
                                <a
                                    href="https://mail.google.com/mail/u/0/#search/payao.118253%40globalcity.sti.edu.ph?compose=new"
                                    className="p-2 border border-gray-600 rounded-full hover:bg-yellow-400 hover:text-black transition"
                                >
                                    <Mail size={16} />
                                </a>
                                <a
                                    href="https://github.com/"
                                    className="p-2 border border-gray-600 rounded-full hover:bg-yellow-400 hover:text-black transition"
                                >
                                    <Github size={16} />
                                </a>
                                <a
                                    href="https://www.facebook.com/muhajir.payao/"
                                    className="p-2 border border-gray-600 rounded-full hover:bg-yellow-400 hover:text-black transition"
                                >
                                    <Facebook size={16} />
                                </a>
                                <a
                                    href="twitter.com"
                                    className="p-2 border border-gray-600 rounded-full hover:bg-yellow-400 hover:text-black transition"
                                >
                                    <Twitter size={16} />
                                </a>

                            </div>

                            <p className="text-sm text-gray-500 text-center md:text-right">
                                © 2026 Muhajir Payao. All Rights Reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </motion.section>

           
        </div>
    );
};
export default Home;
