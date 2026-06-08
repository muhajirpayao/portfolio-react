import hero from '../assets/hero.jpg';
import {
  Mail, Github, MapPin, Phone, Twitter, Facebook,
  ArrowUpRight, Moon, Sun, Menu, X,
  Box, ShoppingCart, Gamepad2, Globe, Folder, BarChart3,
  ChevronRight, Code2, Layers, Zap
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/* ─────────────── DATA ─────────────────────── */
const NAV_ITEMS = [
  { label: "Home",     icon: "🏠" },
  { label: "About",    icon: "👤" },
  { label: "Projects", icon: "💼" },
  { label: "Skills",   icon: "⚡" },
  { label: "Contact",  icon: "✉️"  },
];

const PROJECTS = [
  {
    id: "01", title: "Zharm Vault", subtitle: "Cloud File Management",
    desc: "A modern cloud-based platform to securely store, organize, and access files across devices. Integrates Google Drive API for extended capacity with a fast, structured interface.",
    stack: ["React (Vite)", "Supabase", "Google Drive API"],
    icon: Box, accent: "#2dd4bf", link: "#", featured: true,
  },
  {
    id: "02", title: "Inventory & POS", subtitle: "Management System",
    desc: "Scalable point-of-sale platform for retail ops. Real-time product management, order processing, and transaction tracking with camera-based barcode scanning and voice input.",
    stack: ["React", "Firebase", "Supabase", "JavaScript"],
    icon: ShoppingCart, accent: "#34d399", link: "#", featured: true,
  },
  {
    id: "03", title: "Scatter", subtitle: "Gamified Virtual Economy",
    desc: "A browser-based system simulating a virtual Money system. Users earn, manage, and interact with in-game currency in a structured progression loop.",
    stack: ["JavaScript", "HTML", "CSS"],
    icon: Gamepad2, accent: "#22d3ee", link: "#", featured: true,
  },
  {
    id: "04", title: "Portfolio Website", subtitle: "Personal Web Presence",
    desc: "Responsive personal website with smooth animations and a clean editorial design system built entirely in React.",
    stack: ["React", "Tailwind CSS", "Framer Motion"],
    icon: Globe, accent: "#5eead4", link: "#", featured: false,
  },
  {
    id: "05", title: "Funeral Management", subtitle: "Cross-platform Web App",
    desc: "Full-featured platform for managing funeral service client requests, bookings, and scheduling via Flutter and Firebase.",
    stack: ["Flutter", "Dart", "Firebase"],
    icon: Folder, accent: "#99f6e4", link: "#", featured: false,
  },
  {
    id: "06", title: "E-Commerce Dashboard", subtitle: "Admin Panel",
    desc: "Admin dashboard for managing inventory, users, and orders with real-time data visualization and role-based access.",
    stack: ["React", "Firebase", "CSS"],
    icon: BarChart3, accent: "#2dd4bf", link: "#", featured: false,
  },
];

const SKILLS = [
  { label: "React",      img: "react.svg"       },
  { label: "JavaScript", img: "javascript.png"  },
  { label: "Flutter",    img: "flutter.jpg"     },
  { label: "Tailwind",   img: "tailwind.png"    },
  { label: "Firebase",   img: "fireabase.jpg"   },
  { label: "C#",         img: "sharp.png"       },
  { label: "HTML",       img: "html.png"        },
  { label: "CSS",        img: "css.png"         },
];

const STATS = [
  { value: "16+",   label: "Projects" },
  { value: "1+",   label: "Yrs Exp"  },
  { value: "8",    label: "Stacks"   },
  { value: "100%", label: "Passion"  },
];

/* ─────────────── VARIANTS ──────────────────── */
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden:   { opacity: 0, y: 28 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const slideRight = {
  hidden:   { opacity: 0, x: -30 },
  visible:  { opacity: 1, x: 0,  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ─────────────── SCROLL BAR ────────────────── */
function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left", position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 200, background: "linear-gradient(90deg,#0d9488,#2dd4bf,#99f6e4)" }}
    />
  );
}

/* ─────────────── MAIN ───────────────────────── */
export default function Home() {
  const [dark,       setDark]       = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [active,     setActive]     = useState("home");
  const [filter,     setFilter]     = useState("all");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = ["home","about","projects","skills","contact"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close drawer on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setDrawerOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Theme tokens */
  const T = {
    bg:       dark ? "#030a0a"                       : "#f0fafa",
    bg2:      dark ? "#051212"                       : "#e0f5f5",
    border:   dark ? "rgba(45,212,191,0.12)"         : "rgba(13,148,136,0.14)",
    borderH:  dark ? "rgba(45,212,191,0.35)"         : "rgba(13,148,136,0.4)",
    text:     dark ? "#e8fffe"                       : "#0a1f1f",
    muted:    dark ? "rgba(232,255,254,0.38)"        : "rgba(10,31,31,0.4)",
    sub:      dark ? "rgba(232,255,254,0.62)"        : "rgba(10,31,31,0.67)",
    card:     dark ? "rgba(45,212,191,0.035)"        : "rgba(13,148,136,0.04)",
    cardH:    dark ? "rgba(45,212,191,0.07)"         : "rgba(13,148,136,0.08)",
    glass:    dark ? "rgba(3,10,10,0.88)"            : "rgba(240,250,250,0.9)",
    acc:      "#0d9488",
    accL:     "#2dd4bf",
    accHov:   "#0f766e",
  };

  const filtered = filter === "featured" ? PROJECTS.filter(p => p.featured) : PROJECTS;

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
    html { scroll-behavior:smooth; }
    ::-webkit-scrollbar { width:3px; }
    ::-webkit-scrollbar-track { background:transparent; }
    ::-webkit-scrollbar-thumb { background:rgba(13,148,136,0.4); border-radius:99px; }
    @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes orbitSpin { to{transform:rotate(360deg)} }
    @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.85)} }
    @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
    .float-y  { animation:floatY 5s ease-in-out infinite; }
    .orbit    { animation:orbitSpin 22s linear infinite; }
    .pdot     { animation:pulseDot 2.2s ease-in-out infinite; }
    .lc3 { display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
    .shimmer-text {
      background: linear-gradient(90deg, #2dd4bf 0%, #99f6e4 40%, #2dd4bf 80%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
    }
  `;

  /* Shared section label style */
  const sectionLabel = { fontSize:"0.65rem", fontFamily:"'JetBrains Mono', monospace", letterSpacing:"0.14em", textTransform:"uppercase", color: T.accL, marginBottom:"0.75rem" };
  const sectionTitle = { fontSize:"clamp(1.9rem,4.5vw,3.2rem)", fontWeight:800, letterSpacing:"-0.04em", lineHeight:1.05, color: T.text };

  return (
    <div style={{ background:T.bg, color:T.text, fontFamily:"'Plus Jakarta Sans', sans-serif", transition:"background 0.35s, color 0.35s", overflowX:"hidden", minHeight:"100svh" }}>
      <style>{css}</style>
      <ScrollBar />

      {/* ── DRAWER OVERLAY ── */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            style={{ position:"fixed", inset:0, zIndex:80, background:"rgba(0,0,0,0.55)", backdropFilter:"blur(4px)" }}
          />
        )}
      </AnimatePresence>

      {/* ── LEFT DRAWER ── */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.aside
            key="drawer"
            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
            transition={{ type:"spring", stiffness:320, damping:35 }}
            style={{
              position:"fixed", top:0, left:0, bottom:0, zIndex:90,
              width: 260,
              background: T.glass,
              backdropFilter:"blur(24px)",
              borderRight:`1px solid ${T.border}`,
              display:"flex", flexDirection:"column",
              padding:"0",
              overflowY:"auto",
            }}
          >
            {/* Drawer header */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1.25rem 1.25rem 1rem", borderBottom:`1px solid ${T.border}` }}>
              <span style={{ fontWeight:800, fontSize:"1.15rem", letterSpacing:"-0.04em", color:T.text }}>
                mj<span style={{ color:T.accL }}>dev</span><span style={{ color:T.muted }}>.</span>
              </span>
              <button onClick={() => setDrawerOpen(false)} style={{ background:"none", border:`1px solid ${T.border}`, borderRadius:"50%", width:32, height:32, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:T.muted }}>
                <X size={14} />
              </button>
            </div>

            {/* Drawer nav */}
            <nav style={{ flex:1, padding:"1rem 0.75rem", display:"flex", flexDirection:"column", gap:"0.25rem" }}>
              {NAV_ITEMS.map(({ label, icon }) => {
                const id = label.toLowerCase();
                const isAct = active === id;
                return (
                  <a key={label} href={`#${id}`} onClick={() => setDrawerOpen(false)} style={{
                    display:"flex", alignItems:"center", gap:"0.8rem",
                    padding:"0.7rem 0.9rem", borderRadius:10,
                    textDecoration:"none",
                    background: isAct ? `rgba(13,148,136,0.14)` : "transparent",
                    border: `1px solid ${isAct ? T.borderH : "transparent"}`,
                    color: isAct ? T.accL : T.sub,
                    fontSize:"0.9rem", fontWeight: isAct ? 700 : 500,
                    transition:"all 0.2s",
                  }}>
                    <span style={{ fontSize:"1rem" }}>{icon}</span>
                    {label}
                    {isAct && <span style={{ marginLeft:"auto", width:6, height:6, borderRadius:"50%", background:T.accL }} />}
                  </a>
                );
              })}
            </nav>

            {/* Drawer footer */}
            <div style={{ padding:"1rem 1.25rem", borderTop:`1px solid ${T.border}` }}>
              <div style={{ display:"flex", gap:"0.5rem", marginBottom:"0.75rem" }}>
                {[
                  { icon: Github,   href:"https://github.com/" },
                  { icon: Facebook, href:"https://www.facebook.com/muhajir.payao/" },
                  { icon: Mail,     href:"mailto:payao.118253@globalcity.sti.edu.ph" },
                ].map(({ icon:Icon, href }, i) => (
                  <a key={i} href={href} target="_blank" rel="noreferrer" style={{
                    width:34, height:34, borderRadius:"50%", border:`1px solid ${T.border}`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    color:T.muted, textDecoration:"none", transition:"all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderH; e.currentTarget.style.color = T.accL; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = T.border;  e.currentTarget.style.color = T.muted; }}
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
              <p style={{ fontSize:"0.62rem", fontFamily:"'JetBrains Mono', monospace", color:T.muted }}>© 2026 Muhajir Payao</p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── NAVBAR ── */}
      <header style={{
        position:"fixed", top:0, left:0, right:0, zIndex:50, height:60,
        background: scrolled ? T.glass : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${T.border}` : "none",
        transition:"all 0.35s",
        display:"flex", alignItems:"center",
        padding:"0 clamp(1rem,5vw,3rem)",
        justifyContent:"space-between",
      }}>
        {/* Logo */}
        <motion.div initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.55 }}>
          <span style={{ fontWeight:800, fontSize:"1.15rem", letterSpacing:"-0.04em", color:T.text }}>
            mj<span style={{ color:T.accL }}>dev</span><span style={{ color:T.muted }}>.</span>
          </span>
        </motion.div>

        {/* Desktop nav — hidden on mobile */}
        <nav className="hidden md:flex" style={{ gap:"2rem", alignItems:"center" }}>
          {NAV_ITEMS.map(({ label }) => {
            const id = label.toLowerCase();
            const isAct = active === id;
            return (
              <a key={label} href={`#${id}`} style={{
                fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.07em",
                textTransform:"uppercase", textDecoration:"none",
                color: isAct ? T.accL : T.muted,
                transition:"color 0.2s", position:"relative",
              }}>
                {label}
                {isAct && (
                  <motion.span layoutId="dot" style={{
                    position:"absolute", bottom:-6, left:"50%", transform:"translateX(-50%)",
                    width:4, height:4, borderRadius:"50%", background:T.accL, display:"block",
                  }} />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right controls */}
        <div style={{ display:"flex", gap:"0.5rem", alignItems:"center" }}>
          <button onClick={() => setDark(!dark)} style={{
            width:36, height:36, borderRadius:"50%", border:`1px solid ${T.border}`,
            background:T.card, display:"flex", alignItems:"center", justifyContent:"center",
            cursor:"pointer", color:T.muted, transition:"all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderH; e.currentTarget.style.color = T.accL; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border;  e.currentTarget.style.color = T.muted; }}
          >
            {dark ? <Sun size={14}/> : <Moon size={14}/>}
          </button>

          {/* Hamburger — mobile only */}
          <button onClick={() => setDrawerOpen(true)} className="flex md:hidden" style={{
            width:36, height:36, borderRadius:"50%", border:`1px solid ${T.border}`,
            background:T.card, display:"flex", alignItems:"center", justifyContent:"center",
            cursor:"pointer", color:T.muted,
          }}>
            <Menu size={14}/>
          </button>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section id="home" style={{
        minHeight:"100svh", display:"flex", alignItems:"center",
        padding:"80px clamp(1rem,6vw,4.5rem) 60px",
        position:"relative", overflow:"hidden",
      }}>
        {/* Ambient blobs */}
        <div style={{ position:"absolute", top:"5%",  right:"-10%", width:"min(560px,60vw)", height:"min(560px,60vw)", borderRadius:"50%", background:"radial-gradient(circle, rgba(13,148,136,0.13) 0%, transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"8%", left:"-8%",  width:"min(320px,40vw)", height:"min(320px,40vw)", borderRadius:"50%", background:"radial-gradient(circle, rgba(45,212,191,0.07) 0%, transparent 70%)", pointerEvents:"none" }} />
        {/* Grid pattern */}
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${T.border} 1px,transparent 1px),linear-gradient(90deg,${T.border} 1px,transparent 1px)`, backgroundSize:"60px 60px", opacity:0.5, pointerEvents:"none" }} />

        <div style={{ maxWidth:1200, margin:"0 auto", width:"100%", display:"grid", gridTemplateColumns:"1fr auto", gap:"2rem", alignItems:"center" }}>
          <motion.div variants={stagger} initial="hidden" animate="visible">
            {/* Badge */}
            <motion.div variants={fadeUp} style={{ marginBottom:"1.5rem" }}>
              <span style={{
                display:"inline-flex", alignItems:"center", gap:"0.45rem",
                fontSize:"0.65rem", fontFamily:"'JetBrains Mono', monospace", letterSpacing:"0.12em",
                textTransform:"uppercase", color:T.accL,
                border:`1px solid rgba(45,212,191,0.25)`, borderRadius:99,
                padding:"0.28rem 0.9rem",
                background: dark ? "rgba(13,148,136,0.08)" : "rgba(13,148,136,0.06)",
              }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"#2dd4bf", display:"inline-block" }} className="pdot" />
                Available for work
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1 variants={fadeUp} style={{ fontSize:"clamp(2.6rem,8.5vw,6.8rem)", fontWeight:800, lineHeight:0.92, letterSpacing:"-0.05em", marginBottom:"1.5rem" }}>
              Muhajir<br/>
              <span className="shimmer-text">Payao</span>
            </motion.h1>

            {/* Role line */}
            <motion.div variants={fadeUp} style={{ display:"flex", alignItems:"center", gap:"0.8rem", marginBottom:"1.25rem" }}>
              <div style={{ width:28, height:1.5, background: `linear-gradient(90deg, ${T.accL}, transparent)`, borderRadius:2 }} />
              <span style={{ fontSize:"0.72rem", fontFamily:"'JetBrains Mono', monospace", color:T.muted, letterSpacing:"0.1em", textTransform:"uppercase" }}>
                Fullstack Web Developer
              </span>
            </motion.div>

            <motion.p variants={fadeUp} style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:"clamp(0.92rem,2vw,1.1rem)", color:T.sub, maxWidth:460, lineHeight:1.75, marginBottom:"1.25rem", fontWeight:400 }}>
              I craft responsive, high-performing web experiences through clean code and thoughtful, purposeful design.
            </motion.p>

            {/* Meta */}
            <motion.div variants={fadeUp} style={{ display:"flex", flexWrap:"wrap", gap:"1rem", marginBottom:"2rem" }}>
              {["Taguig City, Philippines","0928 865 5443"].map((txt,i) => (
                <span key={i} style={{ display:"flex", alignItems:"center", gap:"0.35rem", fontSize:"0.7rem", fontFamily:"'JetBrains Mono', monospace", color:T.muted }}>
                  {i===0 ? <MapPin size={11}/> : <Phone size={11}/>} {txt}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} style={{ display:"flex", flexWrap:"wrap", gap:"0.75rem" }}>
              <a href="#projects" style={{
                display:"inline-flex", alignItems:"center", gap:"0.4rem",
                background:`linear-gradient(135deg, ${T.acc}, ${T.accL})`,
                color:"#fff", borderRadius:99, padding:"0.68rem 1.6rem",
                fontSize:"0.8rem", fontWeight:700, textDecoration:"none",
                letterSpacing:"0.03em", transition:"opacity 0.2s",
                boxShadow:"0 4px 24px rgba(13,148,136,0.3)",
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                View Projects <ArrowUpRight size={14}/>
              </a>
              <a href="#contact" style={{
                display:"inline-flex", alignItems:"center", gap:"0.4rem",
                border:`1px solid ${T.border}`, color:T.sub, borderRadius:99,
                padding:"0.68rem 1.6rem", fontSize:"0.8rem", fontWeight:600,
                textDecoration:"none", background:"transparent", transition:"all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderH; e.currentTarget.style.color = T.accL; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border;  e.currentTarget.style.color = T.sub;  }}
              >
                Get in touch
              </a>
            </motion.div>
          </motion.div>

          {/* Photo — hidden on xs, shown from sm */}
          <motion.div
            initial={{ opacity:0, scale:0.82 }} animate={{ opacity:1, scale:1 }}
            transition={{ duration:0.95, ease:[0.22,1,0.36,1] }}
            className="hidden sm:block"
            style={{ position:"relative", flexShrink:0 }}
          >
            {/* Outer ring */}
            <div style={{ position:"absolute", inset:-28, borderRadius:"50%", border:"1px dashed rgba(45,212,191,0.2)" }} className="orbit" />
            {/* Inner ring */}
            <div style={{ position:"absolute", inset:-12, borderRadius:"50%", border:"1px solid rgba(45,212,191,0.1)" }} />
            {/* Photo */}
            <div style={{
              width:"clamp(145px,15vw,205px)", height:"clamp(145px,15vw,205px)",
              borderRadius:"50%", overflow:"hidden",
              border:`2px solid rgba(45,212,191,0.4)`,
              boxShadow:"0 0 50px rgba(13,148,136,0.22), 0 0 100px rgba(13,148,136,0.08)",
              position:"relative",
            }} className="float-y">
              <img src={hero} alt="Muhajir Payao" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
            </div>
            {/* Tag */}
            <motion.div
              initial={{ opacity:0, x:18 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.95 }}
              style={{
                position:"absolute", bottom:-6, right:-18,
                background:T.glass, border:`1px solid ${T.border}`,
                borderRadius:10, padding:"0.5rem 0.85rem",
                backdropFilter:"blur(14px)",
                fontSize:"0.66rem", fontFamily:"'JetBrains Mono', monospace",
                color:T.accL, whiteSpace:"nowrap",
              }}>
              Fullstack Dev 🚀
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`, padding:"1.75rem clamp(1rem,6vw,4.5rem)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(90px,1fr))", gap:"1rem" }}>
          {STATS.map((s,i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay:i*0.07 }}
              style={{ textAlign:"center", padding:"0.5rem" }}
            >
              <div style={{ fontSize:"clamp(1.7rem,3.5vw,2.4rem)", fontWeight:800, letterSpacing:"-0.05em", color:T.accL }}>{s.value}</div>
              <div style={{ fontSize:"0.62rem", fontFamily:"'JetBrains Mono', monospace", color:T.muted, textTransform:"uppercase", letterSpacing:"0.1em", marginTop:3 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════ */}
      <section id="about" style={{ padding:"clamp(4rem,10vw,8rem) clamp(1rem,6vw,4.5rem)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"clamp(2rem,6vw,5rem)", alignItems:"center" }}>
          {/* Photo card */}
          <motion.div
            initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
            style={{ position:"relative" }}
          >
            <div style={{ position:"absolute", inset:0, borderRadius:20, border:`1px solid ${T.border}`, transform:"translate(10px,10px)" }} />
            <div style={{ position:"absolute", inset:0, borderRadius:20, border:`1px solid ${T.border}`, transform:"translate(20px,20px)", opacity:0.5 }} />
            <img src={hero} alt="About" style={{ width:"100%", maxWidth:360, aspectRatio:"3/4", objectFit:"cover", borderRadius:20, position:"relative", border:`1px solid ${T.border}` }} />
            <div style={{ position:"absolute", bottom:14, left:14, background:T.glass, backdropFilter:"blur(12px)", borderRadius:10, border:`1px solid ${T.border}`, padding:"0.6rem 0.9rem" }}>
              <div style={{ fontSize:"0.58rem", fontFamily:"'JetBrains Mono', monospace", color:T.muted, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:2 }}>Based in</div>
              <div style={{ fontSize:"0.85rem", fontWeight:700, color:T.text }}>Taguig City 🇵🇭</div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true }}>
            <motion.p variants={fadeUp} style={sectionLabel}>— About Me</motion.p>
            <motion.h2 variants={fadeUp} style={{ ...sectionTitle, marginBottom:"1.5rem" }}>
              Crafting digital<br/><span style={{ color:T.muted }}>experiences.</span>
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize:"0.97rem", color:T.sub, lineHeight:1.8, marginBottom:"1rem", maxWidth:420 }}>
              I'm a passionate web and mobile developer who enjoys building modern, elegant, and user-friendly experiences. I specialize in Flutter, React, and Python — always eager to learn and innovate.
            </motion.p>
            <motion.p variants={fadeUp} style={{ fontSize:"0.88rem", fontStyle:"italic", color:T.muted, lineHeight:1.7, maxWidth:420, marginBottom:"2rem", borderLeft:`2px solid ${T.accL}`, paddingLeft:"1rem" }}>
              "Good design is invisible. Great code makes it fast."
            </motion.p>
            {/* Feature chips */}
            <motion.div variants={fadeUp} style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem", marginBottom:"2rem" }}>
              {[
                { icon:Code2,  label:"Clean Code"    },
                { icon:Layers, label:"Responsive UI" },
                { icon:Zap,    label:"Fast Delivery"  },
              ].map(({ icon:Icon, label }) => (
                <span key={label} style={{
                  display:"inline-flex", alignItems:"center", gap:"0.4rem",
                  fontSize:"0.7rem", fontFamily:"'JetBrains Mono', monospace",
                  color:T.accL, border:`1px solid ${T.border}`,
                  borderRadius:99, padding:"0.3rem 0.8rem",
                  background:T.card,
                }}>
                  <Icon size={11}/> {label}
                </span>
              ))}
            </motion.div>
            <motion.a variants={fadeUp} href="#contact" style={{ display:"inline-flex", alignItems:"center", gap:"0.35rem", fontSize:"0.78rem", fontWeight:700, color:T.accL, textDecoration:"none" }}>
              Let's talk <ChevronRight size={14}/>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROJECTS
      ══════════════════════════════════════════ */}
      <section id="projects" style={{ padding:"clamp(4rem,10vw,8rem) clamp(1rem,6vw,4.5rem)", borderTop:`1px solid ${T.border}` }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          {/* Header */}
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true }}
            style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:"1.5rem", marginBottom:"2.5rem" }}>
            <div>
              <motion.p variants={fadeUp} style={sectionLabel}>— Selected Work</motion.p>
              <motion.h2 variants={fadeUp} style={sectionTitle}>Projects<span style={{ color:T.muted }}>.</span></motion.h2>
            </div>
            <motion.div variants={fadeUp} style={{ display:"flex", gap:"0.4rem" }}>
              {["all","featured"].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{
                  fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.08em",
                  textTransform:"uppercase", padding:"0.36rem 0.95rem", borderRadius:99,
                  border:`1px solid ${filter===f ? T.borderH : T.border}`,
                  background: filter===f ? `rgba(13,148,136,0.15)` : "transparent",
                  color: filter===f ? T.accL : T.muted,
                  cursor:"pointer", transition:"all 0.2s",
                }}>
                  {f}
                </button>
              ))}
            </motion.div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div key={filter}
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(min(100%,310px),1fr))", gap:"1rem" }}
            >
              {filtered.map((proj,i) => {
                const Icon = proj.icon;
                return (
                  <motion.div key={proj.id}
                    initial={{ opacity:0, y:26 }} whileInView={{ opacity:1, y:0 }}
                    viewport={{ once:true }} transition={{ delay:i*0.06, duration:0.55, ease:[0.22,1,0.36,1] }}
                    whileHover={{ y:-5, transition:{ duration:0.22 } }}
                    style={{
                      background:T.card, border:`1px solid ${T.border}`,
                      borderRadius:18, padding:"1.4rem",
                      display:"flex", flexDirection:"column", gap:"1rem",
                      position:"relative", overflow:"hidden",
                      transition:"background 0.2s, border-color 0.2s, box-shadow 0.3s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background   = T.cardH;
                      e.currentTarget.style.borderColor  = `${proj.accent}50`;
                      e.currentTarget.style.boxShadow    = dark ? "0 16px 48px rgba(0,0,0,0.5)" : "0 16px 48px rgba(0,0,0,0.07)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background   = T.card;
                      e.currentTarget.style.borderColor  = T.border;
                      e.currentTarget.style.boxShadow    = "none";
                    }}
                  >
                    {/* Accent splash */}
                    <div style={{ position:"absolute", top:0, right:0, width:120, height:120, background:`radial-gradient(circle at top right, ${proj.accent}18, transparent 70%)`, pointerEvents:"none" }} />

                    {/* Top row */}
                    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
                      <div style={{ width:40, height:40, borderRadius:10, background:`${proj.accent}16`, border:`1px solid ${proj.accent}30`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <Icon size={17} color={proj.accent}/>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:"0.4rem" }}>
                        <span style={{ fontSize:"0.58rem", fontFamily:"'JetBrains Mono', monospace", color:T.muted }}>{proj.id}</span>
                        {proj.featured && (
                          <span style={{ fontSize:"0.52rem", fontFamily:"'JetBrains Mono', monospace", letterSpacing:"0.07em", textTransform:"uppercase", color:proj.accent, border:`1px solid ${proj.accent}35`, borderRadius:99, padding:"0.1rem 0.42rem" }}>
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 style={{ fontSize:"0.98rem", fontWeight:800, letterSpacing:"-0.02em", marginBottom:"0.18rem", color:T.text }}>{proj.title}</h3>
                      <p style={{ fontSize:"0.65rem", fontFamily:"'JetBrains Mono', monospace", color:T.muted, letterSpacing:"0.05em", marginBottom:"0.6rem" }}>{proj.subtitle}</p>
                      <p style={{ fontSize:"0.82rem", color:T.sub, lineHeight:1.65 }} className="lc3">{proj.desc}</p>
                    </div>

                    {/* Stack + link */}
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"0.4rem", marginTop:"auto" }}>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:"0.28rem" }}>
                        {proj.stack.map(s => (
                          <span key={s} style={{ fontSize:"0.58rem", fontFamily:"'JetBrains Mono', monospace", border:`1px solid ${T.border}`, color:T.muted, padding:"0.16rem 0.48rem", borderRadius:99 }}>{s}</span>
                        ))}
                      </div>
                      <a href={proj.link} style={{
                        width:28, height:28, borderRadius:"50%",
                        border:`1px solid ${proj.accent}40`, background:`${proj.accent}12`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        color:proj.accent, textDecoration:"none", transition:"background 0.2s", flexShrink:0,
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = `${proj.accent}28`}
                        onMouseLeave={e => e.currentTarget.style.background = `${proj.accent}12`}
                      >
                        <ArrowUpRight size={12}/>
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SKILLS
      ══════════════════════════════════════════ */}
      <section id="skills" style={{ padding:"clamp(4rem,10vw,8rem) clamp(1rem,6vw,4.5rem)", borderTop:`1px solid ${T.border}` }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true }} style={{ marginBottom:"2.5rem" }}>
            <motion.p variants={fadeUp} style={sectionLabel}>— Tech Stack</motion.p>
            <motion.h2 variants={fadeUp} style={sectionTitle}>What I use<span style={{ color:T.muted }}>.</span></motion.h2>
          </motion.div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(88px,1fr))", gap:"0.8rem" }}>
            {SKILLS.map((sk,i) => (
              <motion.div key={sk.label}
                initial={{ opacity:0, scale:0.82 }} whileInView={{ opacity:1, scale:1 }}
                viewport={{ once:true }} transition={{ delay:i*0.04, duration:0.38 }}
                whileHover={{ scale:1.08, y:-4 }}
                style={{
                  background:T.card, border:`1px solid ${T.border}`,
                  borderRadius:14, padding:"1rem 0.5rem",
                  display:"flex", flexDirection:"column", alignItems:"center", gap:"0.5rem",
                  transition:"background 0.2s, border-color 0.2s", cursor:"default",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = T.cardH; e.currentTarget.style.borderColor = T.borderH; }}
                onMouseLeave={e => { e.currentTarget.style.background = T.card;  e.currentTarget.style.borderColor = T.border;  }}
              >
                <img src={`/src/assets/${sk.img}`} alt={sk.label} style={{ width:30, height:30, objectFit:"contain" }}/>
                <span style={{ fontSize:"0.6rem", fontFamily:"'JetBrains Mono', monospace", color:T.muted, letterSpacing:"0.04em", textAlign:"center" }}>{sk.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════ */}
      <section id="contact" style={{ padding:"clamp(4rem,10vw,8rem) clamp(1rem,6vw,4.5rem)", borderTop:`1px solid ${T.border}` }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div
            initial={{ opacity:0, y:36 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
            style={{
              background: dark
                ? "linear-gradient(135deg, rgba(13,148,136,0.1) 0%, rgba(45,212,191,0.04) 100%)"
                : "linear-gradient(135deg, rgba(13,148,136,0.07) 0%, rgba(45,212,191,0.03) 100%)",
              border:`1px solid ${T.border}`,
              borderRadius:24, padding:"clamp(2rem,6vw,5rem)",
              display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", gap:"1.5rem",
              position:"relative", overflow:"hidden",
            }}
          >
            {/* BG decoration */}
            <div style={{ position:"absolute", top:"-30%", right:"-10%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(45,212,191,0.07) 0%, transparent 65%)", pointerEvents:"none" }} />

            <span style={sectionLabel}>— Get in Touch</span>
            <h2 style={{ ...sectionTitle, maxWidth:560 }}>
              Let's build something <span style={{ color:T.muted }}>remarkable.</span>
            </h2>
            <p style={{ fontSize:"0.97rem", color:T.sub, maxWidth:400, lineHeight:1.75 }}>
              Interested in collaborating or want to discuss a project? I'd love to hear from you.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"0.75rem", justifyContent:"center" }}>
              <a href="mailto:payao.118253@globalcity.sti.edu.ph" style={{
                display:"inline-flex", alignItems:"center", gap:"0.45rem",
                background:`linear-gradient(135deg, ${T.acc}, ${T.accL})`,
                color:"#fff", borderRadius:99, padding:"0.65rem 1.6rem",
                fontSize:"0.8rem", fontWeight:700, textDecoration:"none",
                boxShadow:"0 4px 20px rgba(13,148,136,0.3)", transition:"opacity 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                <Mail size={14}/> Send Email
              </a>
              <a href="https://www.facebook.com/muhajir.payao/" target="_blank" rel="noreferrer" style={{
                display:"inline-flex", alignItems:"center", gap:"0.45rem",
                border:`1px solid ${T.border}`, color:T.sub, borderRadius:99,
                padding:"0.65rem 1.6rem", fontSize:"0.8rem", fontWeight:600,
                textDecoration:"none", background:"transparent", transition:"all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderH; e.currentTarget.style.color = T.accL; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border;  e.currentTarget.style.color = T.sub; }}
              >
                <Facebook size={14}/> Facebook
              </a>
            </div>
            {/* Info row */}
            <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"1.5rem", paddingTop:"1rem", borderTop:`1px solid ${T.border}`, width:"100%" }}>
              {[
                { icon:MapPin, text:"Taguig City, Philippines" },
                { icon:Phone,  text:"0928 865 5443"           },
                { icon:Mail,   text:"payao.118253@globalcity.sti.edu.ph" },
              ].map(({ icon:Icon, text },i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:"0.4rem", fontSize:"0.68rem", fontFamily:"'JetBrains Mono', monospace", color:T.muted }}>
                  <Icon size={11}/> {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:`1px solid ${T.border}`, padding:"1.6rem clamp(1rem,6vw,4.5rem)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", flexWrap:"wrap", gap:"1rem", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontWeight:800, fontSize:"0.95rem", letterSpacing:"-0.04em" }}>
            mj<span style={{ color:T.accL }}>dev</span><span style={{ color:T.muted }}>.</span>
          </span>
          <div style={{ display:"flex", gap:"0.45rem" }}>
            {[
              { icon:Mail,     href:"mailto:payao.118253@globalcity.sti.edu.ph" },
              { icon:Github,   href:"https://github.com/"                       },
              { icon:Facebook, href:"https://www.facebook.com/muhajir.payao/"   },
              { icon:Twitter,  href:"https://twitter.com"                       },
            ].map(({ icon:Icon, href },i) => (
              <a key={i} href={href} target="_blank" rel="noreferrer" style={{
                width:30, height:30, borderRadius:"50%", border:`1px solid ${T.border}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                color:T.muted, textDecoration:"none", transition:"all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderH; e.currentTarget.style.color = T.accL; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border;  e.currentTarget.style.color = T.muted; }}
              >
                <Icon size={12}/>
              </a>
            ))}
          </div>
          <p style={{ fontSize:"0.6rem", fontFamily:"'JetBrains Mono', monospace", color:T.muted }}>© 2026 Muhajir Payao. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}