import hero from '../assets/hero.jpg';
import {
  Mail, Github, MapPin, Phone, Twitter, Facebook,
  ArrowUpRight, Moon, Sun, Menu, X,
  Box, ShoppingCart, Gamepad2, Globe, Folder, BarChart3,
  ChevronRight, Code2, Layers, Zap, Users, ChevronLeft,
  ExternalLink, Briefcase, Calendar, Download, Star, GitFork,
  Eye, BookOpen,
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

/* ─────────────── DATA ─────────────────────── */
const NAV_ITEMS = [
  { label: "Home",       icon: "🏠" },
  { label: "About",      icon: "👤" },
  { label: "Experience", icon: "💼" },
  { label: "Projects",   icon: "🗂️" },
  { label: "Skills",     icon: "⚡" },
  { label: "GitHub",     icon: "🐙" },
  { label: "Contact",    icon: "✉️"  },
];

/* ── GITHUB CONFIG ── */
const GITHUB_USERNAME = "muhajirpayao"; // ← update to your real username
const GITHUB_PROFILE  = `https://github.com/${GITHUB_USERNAME}`;

const PINNED_REPOS = [
  {
    name: "zharm-vault",
    desc: "Cloud-based file management platform with Google Drive integration and Supabase backend.",
    stars: 8,
    forks: 1,
    lang: "JavaScript",
    langColor: "#f7df1e",
    url: GITHUB_PROFILE,
  },
  {
    name: "inventory-pos",
    desc: "Scalable POS & inventory system with barcode scanning and real-time reporting.",
    stars: 6,
    forks: 2,
    lang: "JavaScript",
    langColor: "#f7df1e",
    url: GITHUB_PROFILE,
  },
  {
    name: "amorebella-mis",
    desc: "Cross-platform MIS for Amorebella Funeral Homes — Flutter + Firebase capstone project.",
    stars: 5,
    forks: 1,
    lang: "Dart",
    langColor: "#00B4AB",
    url: GITHUB_PROFILE,
  },
];

/* ── RESUME ── */
// Replace this with the actual public URL to your resume PDF
const RESUME_URL = "/resume.pdf";

/* ── EXPERIENCE ── */
const EXPERIENCE = [
  {
    id: "01",
    company: "KMC Solutions",
    role: "Software Developer",
    type: "Full-time",
    range: "August 2025 – March 2026",
    desc: "Developed and extended the core features of KMC Visitor Management System using the T3 Stack. Built scalable full-stack features across TypeScript, Next.js, TRPC, TailwindCSS and integrated Prisma ORM with PostgreSQL for robust data handling.",
    stack: ["TypeScript", "Next.js", "TRPC", "TailwindCSS", "Prisma"],
    accent: "#2dd4bf",
    logo: "🏢",
  },
  {
    id: "02",
    company: "Alorica",
    role: "Mobile App Developer",
    type: "Full-time",
    range: "March 2024 – December 2024",
    desc: "Maintained a strong CSAT rating and collaborated cross-functionally to improve service workflows. Alongside the support role, developed and maintained internal mobile applications to streamline team operations and reporting.",
    stack: ["CRM Tools", "Zendesk", "Flutter", "Mobile Dev", "Communication"],
    accent: "#34d399",
    logo: "🏢",
  },
];

/* ── PROJECTS ── */
const VMS_IMAGES = [
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", caption: "Visitor check-in dashboard — real-time visitor queue management and desk assignment flow." },
  { src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80", caption: "Host notification system — automated alerts via email and SMS when visitors arrive." },
  { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80", caption: "Admin panel — visitor logs, access control, and analytics built with TRPC + Prisma." },
  { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", caption: "Analytics view — visit trends, peak hours, and floor-level occupancy reporting." },
  { src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80", caption: "Mobile-responsive kiosk mode — self-service check-in for walk-in visitors." },
];

const AMOREBELLA_IMAGES = [
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", caption: "Client intake module — managing funeral service requests and family information." },
  { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80", caption: "Booking & scheduling system — calendar-driven service slot management for staff." },
  { src: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&q=80", caption: "Mobile view — Flutter cross-platform UI accessible on Android and iOS devices." },
  { src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80", caption: "Records management — centralized archive of service history and client documents." },
];

const ZHARM_IMAGES = [
  { src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80", caption: "File dashboard — organized folder tree with quick access to recently uploaded files." },
  { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", caption: "Google Drive integration — seamlessly extending storage capacity through the Drive API." },
  { src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", caption: "Upload & preview panel — drag-and-drop file uploading with instant inline preview." },
];

const POS_IMAGES = [
  { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80", caption: "POS checkout screen — fast transaction processing with product search and cart management." },
  { src: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80", caption: "Inventory management — real-time stock tracking with low-stock alerts and restock logs." },
  { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80", caption: "Sales reports — daily, weekly, and monthly transaction summaries with visual charts." },
  { src: "https://images.unsplash.com/photo-1573167243872-43c6433b9d40?w=800&q=80", caption: "Barcode scanner integration — camera and hardware scanner support for quick product lookup." },
];

const SCATTER_IMAGES = [
  { src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80", caption: "Virtual economy hub — the main interface where users manage their in-game currency and assets." },
  { src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80", caption: "Progression loop — earn, spend, and level up mechanics driving player engagement." },
  { src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80", caption: "Transaction ledger — full history of currency exchanges and economy events per user." },
];

const MOTOPARTS_IMAGES = [
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", caption: "Homepage — full landing page with featured motorcycle parts and promotional banners." },
  { src: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80", caption: "Product catalog — filterable parts listing with pricing, stock status, and descriptions." },
  { src: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80", caption: "Product detail page — individual part view with specs, images, and add-to-cart flow." },
  { src: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=800&q=80", caption: "Admin panel — PHP-powered backend for managing inventory, orders, and customer records." },
];

const PROJECTS = [
  {
    id: "01", title: "KMC Visitor Management", subtitle: "T3 Stack · Enterprise App",
    desc: "Extended the core features of KMC Visitor Management System using T3 Stack (TypeScript, TailwindCSS, TRPC, and Next.js). Built robust visitor workflows, host notifications, and real-time dashboards.",
    stack: ["TypeScript", "Next.js", "TRPC", "TailwindCSS", "Prisma"],
    icon: Users, accent: "#2dd4bf",
    link: "https://visitor-management.kmc.solutions/",
    featured: true,
    images: VMS_IMAGES,
  },
  {
    id: "02", title: "Zharm Vault", subtitle: "Cloud File Management",
    desc: "A modern cloud-based platform to securely store, organize, and access files across devices. Integrates Google Drive API for extended capacity with a fast, structured interface.",
    stack: ["React (Vite)", "Supabase", "Google Drive API"],
    icon: Box, accent: "#5eead4",  featured: true, images: ZHARM_IMAGES,
    link: "https://zharm-vault.vercel.app/",
  },
  {
    id: "03", title: "Inventory & POS", subtitle: "Management System",
    desc: "Scalable point-of-sale platform for retail ops. Real-time product management, order processing, and transaction tracking with camera-based barcode scanning and voice input.",
    stack: ["React", "Firebase", "Supabase", "JavaScript"],
    icon: ShoppingCart, accent: "#34d399",  featured: true, images: POS_IMAGES,
    link: "https://inah-store.vercel.app/",
  },
  {
    id: "04", title: "Scatter", subtitle: "Gamified Virtual Economy",
    desc: "A browser-based system simulating a virtual money system. Users earn, manage, and interact with in-game currency in a structured progression loop.",
    stack: ["JavaScript", "HTML", "CSS"],
    icon: Gamepad2, accent: "#22d3ee", featured: true, images: SCATTER_IMAGES,
    link: "https://mishrepo.vercel.app/",
  },
  {
    id: "05", title: "Portfolio Website", subtitle: "Personal Web Presence",
    desc: "Responsive personal website with smooth animations and a clean editorial design system built entirely in React.",
    stack: ["React", "Tailwind CSS", "Framer Motion"],
    icon: Globe, accent: "#99f6e4", featured: false, images: [],
  },
  {
    id: "06", title: "Amorebella Funeral Homes MIS", subtitle: "Thesis Project · Cross-platform App",
    desc: "Capstone thesis project — a full-featured Management Information System for Amorebella Funeral Homes. Handles client requests, service bookings, scheduling, and records management across web and mobile via Flutter and Firebase.",
    stack: ["Flutter", "Dart", "Firebase"],
    icon: Folder, accent: "#2dd4bf", featured: true, images: AMOREBELLA_IMAGES,
      link: "https://amorebella.services/",
  },
  {
    id: "07", title: "Store POS System", subtitle: "School Project · Desktop App",
    desc: "Developed during school — a desktop Point-of-Sale system for managing store inventory, product records, sales transactions, and reporting. Built with C# and MS SQL Server for robust local data management.",
    stack: ["C#", "MS SQL Server", ".NET"],
    icon: ShoppingCart, accent: "#a78bfa", link: "#", featured: false, images: [],
  },
  {
    id: "08", title: "Moto Parts PH", subtitle: "Motorcycle Parts E-Commerce Website",
    desc: "Full e-commerce website for a motorcycle parts business — complete with product catalog, part detail pages, shopping cart, order management, and a PHP-powered admin panel for inventory and customer records.",
    stack: ["HTML", "CSS", "PHP", "MySQL"],
    icon: BarChart3, accent: "#fb923c", link: "#", featured: false, images: MOTOPARTS_IMAGES,
  },
];

/* ── SKILLS ── */
const SKILLS = [
  { label: "React",       icon: "⚛️",  color: "#61dafb" },
  { label: "TypeScript",  icon: "𝗧𝗦",  color: "#3178c6", mono: true },
  { label: "JavaScript",  icon: "𝗝𝗦",  color: "#f7df1e", mono: true },
  { label: "Next.js",     icon: "▲",   color: "#e8fffe" },
  { label: "Flutter",     icon: "🐦",  color: "#54c5f8" },
  { label: "Tailwind",    icon: "🌊",  color: "#38bdf8" },
  { label: "Firebase",    icon: "🔥",  color: "#ffca28" },
  { label: "Supabase",    icon: "⚡",  color: "#3ecf8e" },
  { label: "TRPC",        icon: "🔗",  color: "#398ccb" },
  { label: "Prisma",      icon: "◭",   color: "#5a67d8" },
  { label: "PHP",         icon: "🐘",  color: "#8892be" },
  { label: "C#",          icon: "♯",   color: "#68217a" },
  { label: "HTML",        icon: "🅗",   color: "#e34c26" },
  { label: "CSS",         icon: "🎨",  color: "#264de4" },
];

const STATS = [
  { value: "16+",  label: "Projects" },
  { value: "1+",   label: "Yrs Exp"  },
  { value: "12",   label: "Stacks"   },
  { value: "100%", label: "Passion"  },
];

/* ─────────────── VARIANTS ──────────────────── */
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  hidden:   { opacity: 0, y: 28 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
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

/* ─────────────── INLINE PROJECT CAROUSEL ───── */
function ProjectCard({ proj, T, dark }) {
  const [idx, setIdx] = useState(0);
  const hasImages = proj.images && proj.images.length > 0;
  const Icon = proj.icon;

  const prev = useCallback((e) => {
    e.stopPropagation();
    setIdx(i => (i - 1 + proj.images.length) % proj.images.length);
  }, [proj.images.length]);

  const next = useCallback((e) => {
    e.stopPropagation();
    setIdx(i => (i + 1) % proj.images.length);
  }, [proj.images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      style={{
        background: T.card, border: `1px solid ${T.border}`,
        borderRadius: 18, overflow: "hidden",
        display: "flex", flexDirection: "column",
        position: "relative",
        transition: "background 0.2s, border-color 0.2s, box-shadow 0.3s",
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
      {/* ── CAROUSEL IMAGE ── */}
      {hasImages ? (
        <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", background: "#000", flexShrink: 0 }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={idx}
              src={proj.images[idx].src}
              alt={`${proj.title} screenshot ${idx + 1}`}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.28 }}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </AnimatePresence>

          {/* Gradient overlay at bottom for caption */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 72, background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)", pointerEvents: "none" }} />

          {/* Caption */}
          <AnimatePresence mode="wait">
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              style={{
                position: "absolute", bottom: 8, left: 10, right: 10,
                fontSize: "0.62rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.4,
                fontFamily: "'JetBrains Mono', monospace",
                pointerEvents: "none",
              }}
            >
              {proj.images[idx].caption}
            </motion.p>
          </AnimatePresence>

          {/* Prev / Next arrows */}
          {proj.images.length > 1 && (
            <>
              <button onClick={prev} style={{
                position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
                width: 28, height: 28, borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.25)", background: "rgba(0,0,0,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#fff", transition: "background 0.18s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.75)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.5)"}
              >
                <ChevronLeft size={13} />
              </button>
              <button onClick={next} style={{
                position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                width: 28, height: 28, borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.25)", background: "rgba(0,0,0,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#fff", transition: "background 0.18s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.75)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.5)"}
              >
                <ChevronRight size={13} />
              </button>
            </>
          )}

          {/* Counter + dot indicators */}
          <div style={{
            position: "absolute", top: 8, right: 8,
            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)",
            borderRadius: 99, padding: "0.18rem 0.55rem",
            fontSize: "0.58rem", fontFamily: "'JetBrains Mono', monospace", color: "#fff",
          }}>
            {idx + 1} / {proj.images.length}
          </div>

          {/* Featured badge */}
          {proj.featured && (
            <div style={{
              position: "absolute", top: 8, left: 8,
              fontSize: "0.52rem", fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.07em", textTransform: "uppercase",
              color: proj.accent, border: `1px solid ${proj.accent}50`,
              borderRadius: 99, padding: "0.12rem 0.5rem",
              background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)",
            }}>
              Featured
            </div>
          )}

          {/* Dot strip */}
          {proj.images.length > 1 && (
            <div style={{ position: "absolute", bottom: 8, right: 10, display: "flex", gap: 4, alignItems: "center" }}>
              {proj.images.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setIdx(i); }} style={{
                  width: i === idx ? 16 : 5, height: 5, borderRadius: 99,
                  background: i === idx ? proj.accent : "rgba(255,255,255,0.4)",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "all 0.22s",
                }} />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Fallback placeholder when no images */
        <div style={{
          aspectRatio: "16/9", flexShrink: 0,
          background: `${proj.accent}10`,
          display: "flex", alignItems: "center", justifyContent: "center",
          borderBottom: `1px solid ${T.border}`,
        }}>
          <Icon size={36} color={`${proj.accent}50`} />
        </div>
      )}

      {/* ── CARD BODY ── */}
      <div style={{ padding: "1.1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.7rem", flex: 1 }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9, flexShrink: 0,
              background: `${proj.accent}16`, border: `1px solid ${proj.accent}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon size={15} color={proj.accent} />
            </div>
            <div>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 800, letterSpacing: "-0.02em", color: T.text, lineHeight: 1.2 }}>{proj.title}</h3>
              <p style={{ fontSize: "0.62rem", fontFamily: "'JetBrains Mono', monospace", color: T.muted, letterSpacing: "0.04em", marginTop: 2 }}>{proj.subtitle}</p>
            </div>
          </div>
          <span style={{ fontSize: "0.55rem", fontFamily: "'JetBrains Mono', monospace", color: T.muted, flexShrink: 0, marginTop: 2 }}>{proj.id}</span>
        </div>

        {/* Description — always visible, no truncation */}
        <p style={{ fontSize: "0.82rem", color: T.sub, lineHeight: 1.68 }}>{proj.desc}</p>

        {/* Stack tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.28rem" }}>
          {proj.stack.map(s => (
            <span key={s} style={{
              fontSize: "0.58rem", fontFamily: "'JetBrains Mono', monospace",
              border: `1px solid ${T.border}`, color: T.muted,
              padding: "0.16rem 0.48rem", borderRadius: 99,
            }}>{s}</span>
          ))}
        </div>

        {/* Footer actions */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.45rem", marginTop: "auto", paddingTop: "0.35rem", borderTop: `1px solid ${T.border}` }}>
          <a
            href={GITHUB_PROFILE}
            target="_blank" rel="noreferrer"
            title="View on GitHub"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              fontSize: "0.62rem", fontFamily: "'JetBrains Mono', monospace",
              color: T.muted, border: `1px solid ${T.border}`,
              borderRadius: 99, padding: "0.28rem 0.65rem",
              textDecoration: "none", background: "transparent",
              transition: "all 0.18s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderH; e.currentTarget.style.color = T.accL; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border;  e.currentTarget.style.color = T.muted; }}
          >
            <Github size={11} /> GitHub
          </a>

          {proj.link && proj.link !== "#" ? (
            <a
              href={proj.link} target="_blank" rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.3rem",
                fontSize: "0.62rem", fontFamily: "'JetBrains Mono', monospace",
                color: proj.accent, border: `1px solid ${proj.accent}45`,
                borderRadius: 99, padding: "0.28rem 0.75rem",
                textDecoration: "none", background: `${proj.accent}10`,
                transition: "background 0.18s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = `${proj.accent}22`}
              onMouseLeave={e => e.currentTarget.style.background = `${proj.accent}10`}
            >
              <ExternalLink size={11} /> Live Site
            </a>
          ) : (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "0.3rem",
              fontSize: "0.62rem", fontFamily: "'JetBrains Mono', monospace",
              color: T.muted, border: `1px solid ${T.border}`,
              borderRadius: 99, padding: "0.28rem 0.75rem",
              background: "transparent", cursor: "default",
            }}>
              <ExternalLink size={11} /> Private
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────── GITHUB SECTION ────────────── */
function GitHubSection({ T, dark }) {
  return (
    <section id="github" style={{ padding: "clamp(4rem,10vw,8rem) clamp(1rem,6vw,4.5rem)", borderTop: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ marginBottom: "2.5rem" }}>
          <motion.p variants={fadeUp} style={{ fontSize: "0.65rem", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.14em", textTransform: "uppercase", color: T.accL, marginBottom: "0.75rem" }}>— Open Source</motion.p>
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{ fontSize: "clamp(1.9rem,4.5vw,3.2rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, color: T.text }}>
              GitHub<span style={{ color: T.muted }}>.</span>
            </h2>
            <a href={GITHUB_PROFILE} target="_blank" rel="noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              fontSize: "0.75rem", fontWeight: 700,
              color: T.accL, border: `1px solid ${T.border}`,
              borderRadius: 99, padding: "0.45rem 1.1rem",
              textDecoration: "none", background: T.card,
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderH; e.currentTarget.style.background = T.cardH; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border;  e.currentTarget.style.background = T.card; }}
            >
              <Github size={14} /> @{GITHUB_USERNAME}
            </a>
          </motion.div>
        </motion.div>

        {/* Profile banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{
            background: T.card, border: `1px solid ${T.border}`,
            borderRadius: 18, padding: "1.5rem 1.75rem",
            display: "flex", flexWrap: "wrap", gap: "1.5rem",
            alignItems: "center", justifyContent: "space-between",
            marginBottom: "1.5rem", position: "relative", overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: `radial-gradient(circle at top right, rgba(45,212,191,0.08), transparent 70%)`, pointerEvents: "none" }} />

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              background: "linear-gradient(135deg, #0d9488, #2dd4bf)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.3rem", flexShrink: 0,
              border: `2px solid rgba(45,212,191,0.35)`,
            }}>
              🐙
            </div>
            <div>
              <div style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: "-0.02em", color: T.text, marginBottom: 2 }}>Muhajir Payao</div>
              <div style={{ fontSize: "0.68rem", fontFamily: "'JetBrains Mono', monospace", color: T.muted }}>@{GITHUB_USERNAME}</div>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
            {[
              { label: "Repositories", value: "16+" },
              { label: "Contributions", value: "200+" },
              { label: "Followers",     value: "12"   },
            ].map(({ label, value }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.35rem", fontWeight: 800, letterSpacing: "-0.04em", color: T.accL }}>{value}</div>
                <div style={{ fontSize: "0.6rem", fontFamily: "'JetBrains Mono', monospace", color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>

          <a href={GITHUB_PROFILE} target="_blank" rel="noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: "0.4rem",
            background: `linear-gradient(135deg, ${T.acc}, ${T.accL})`,
            color: "#fff", borderRadius: 99, padding: "0.6rem 1.35rem",
            fontSize: "0.75rem", fontWeight: 700, textDecoration: "none",
            boxShadow: "0 4px 20px rgba(13,148,136,0.28)", transition: "opacity 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            <Github size={13} /> View Profile
          </a>
        </motion.div>

        {/* Contribution activity visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            background: T.card, border: `1px solid ${T.border}`,
            borderRadius: 18, padding: "1.5rem 1.75rem",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <p style={{ fontSize: "0.72rem", fontFamily: "'JetBrains Mono', monospace", color: T.sub, letterSpacing: "0.06em" }}>Contribution Activity · 2025–2026</p>
            <span style={{ fontSize: "0.62rem", fontFamily: "'JetBrains Mono', monospace", color: T.muted }}>200+ contributions</span>
          </div>
          <ContributionGrid T={T} />
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.75rem", justifyContent: "flex-end" }}>
            <span style={{ fontSize: "0.58rem", fontFamily: "'JetBrains Mono', monospace", color: T.muted }}>Less</span>
            {[0.1, 0.3, 0.55, 0.75, 1].map((op, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: 3, background: `rgba(45,212,191,${op})` }} />
            ))}
            <span style={{ fontSize: "0.58rem", fontFamily: "'JetBrains Mono', monospace", color: T.muted }}>More</span>
          </div>
        </motion.div>

        {/* Pinned repos */}
        <div>
          <p style={{ fontSize: "0.65rem", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase", color: T.muted, marginBottom: "0.85rem" }}>— Pinned Repositories</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,280px),1fr))", gap: "0.85rem" }}>
            {PINNED_REPOS.map((repo, i) => (
              <motion.a
                key={repo.name}
                href={repo.url} target="_blank" rel="noreferrer"
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.45 }}
                whileHover={{ y: -4, transition: { duration: 0.18 } }}
                style={{
                  display: "flex", flexDirection: "column", gap: "0.7rem",
                  background: T.card, border: `1px solid ${T.border}`,
                  borderRadius: 14, padding: "1.1rem 1.25rem",
                  textDecoration: "none", position: "relative", overflow: "hidden",
                  transition: "background 0.2s, border-color 0.2s, box-shadow 0.25s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = T.cardH;
                  e.currentTarget.style.borderColor = T.borderH;
                  e.currentTarget.style.boxShadow = dark ? "0 10px 32px rgba(0,0,0,0.45)" : "0 10px 32px rgba(0,0,0,0.06)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = T.card;
                  e.currentTarget.style.borderColor = T.border;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ position: "absolute", top: 0, right: 0, width: 100, height: 80, background: "radial-gradient(circle at top right, rgba(45,212,191,0.07), transparent 70%)", pointerEvents: "none" }} />
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <BookOpen size={13} color={T.accL} />
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: T.text, letterSpacing: "-0.01em" }}>{repo.name}</span>
                  </div>
                  <ArrowUpRight size={13} color={T.muted} />
                </div>
                <p style={{ fontSize: "0.76rem", color: T.sub, lineHeight: 1.6 }}>{repo.desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "auto" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.65rem", fontFamily: "'JetBrains Mono', monospace", color: T.muted }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: repo.langColor, flexShrink: 0 }} />
                    {repo.lang}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.28rem", fontSize: "0.65rem", fontFamily: "'JetBrains Mono', monospace", color: T.muted }}>
                    <Star size={11} /> {repo.stars}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.28rem", fontSize: "0.65rem", fontFamily: "'JetBrains Mono', monospace", color: T.muted }}>
                    <GitFork size={11} /> {repo.forks}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── CONTRIBUTION GRID ─────────── */
function ContributionGrid({ T }) {
  const weeks   = 26;
  const days    = 7;
  const cellSz  = 11;
  const gap     = 3;

  // Generate pseudo-random but consistent contribution data
  const grid = Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: days }, (_, d) => {
      const seed = (w * 7 + d + 13) * 37;
      const rand = ((seed % 97) / 97);
      if (rand < 0.35) return 0;
      if (rand < 0.6)  return 1;
      if (rand < 0.78) return 2;
      if (rand < 0.9)  return 3;
      return 4;
    })
  );

  const opacities = [0, 0.15, 0.38, 0.65, 1];

  return (
    <div style={{ overflowX: "auto", paddingBottom: 4 }}>
      <div style={{ display: "flex", gap: gap }}>
        {grid.map((week, w) => (
          <div key={w} style={{ display: "flex", flexDirection: "column", gap: gap }}>
            {week.map((level, d) => (
              <div
                key={d}
                title={`${level} contribution${level !== 1 ? "s" : ""}`}
                style={{
                  width: cellSz, height: cellSz, borderRadius: 3,
                  background: level === 0
                    ? T.border
                    : `rgba(45,212,191,${opacities[level]})`,
                  transition: "transform 0.15s",
                  cursor: "default",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.4)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────── MAIN ───────────────────────── */
export default function Home() {
  const [dark,       setDark]       = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [active,     setActive]     = useState("home");
  const [filter,     setFilter]     = useState("all");
  const [isMobile,   setIsMobile]   = useState(() => window.innerWidth < 640);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = ["home","about","experience","projects","skills","github","contact"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setDrawerOpen(false);
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const T = {
    bg:      dark ? "#030a0a"                       : "#f0fafa",
    bg2:     dark ? "#051212"                       : "#e0f5f5",
    border:  dark ? "rgba(45,212,191,0.12)"         : "rgba(13,148,136,0.14)",
    borderH: dark ? "rgba(45,212,191,0.35)"         : "rgba(13,148,136,0.4)",
    text:    dark ? "#e8fffe"                       : "#0a1f1f",
    muted:   dark ? "rgba(232,255,254,0.38)"        : "rgba(10,31,31,0.4)",
    sub:     dark ? "rgba(232,255,254,0.62)"        : "rgba(10,31,31,0.67)",
    card:    dark ? "rgba(45,212,191,0.035)"        : "rgba(13,148,136,0.04)",
    cardH:   dark ? "rgba(45,212,191,0.07)"         : "rgba(13,148,136,0.08)",
    glass:   dark ? "rgba(3,10,10,0.88)"            : "rgba(240,250,250,0.9)",
    acc:     "#0d9488",
    accL:    "#2dd4bf",
    accHov:  "#0f766e",
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
    .shimmer-text {
      background: linear-gradient(90deg, #2dd4bf 0%, #99f6e4 40%, #2dd4bf 80%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
    }
  `;

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
              overflowY:"auto",
            }}
          >
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1.25rem 1.25rem 1rem", borderBottom:`1px solid ${T.border}` }}>
              <span style={{ fontWeight:800, fontSize:"1.15rem", letterSpacing:"-0.04em", color:T.text }}>
                mj<span style={{ color:T.accL }}>dev</span><span style={{ color:T.muted }}>.</span>
              </span>
              <button onClick={() => setDrawerOpen(false)} style={{ background:"none", border:`1px solid ${T.border}`, borderRadius:"50%", width:32, height:32, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:T.muted }}>
                <X size={14} />
              </button>
            </div>
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
            <div style={{ padding:"1rem 1.25rem", borderTop:`1px solid ${T.border}` }}>
              {/* Resume download in drawer */}
              <a href={RESUME_URL} download="Muhajir_Payao_Resume.pdf" style={{
                display:"flex", alignItems:"center", justifyContent:"center", gap:"0.4rem",
                width:"100%", padding:"0.6rem",
                background:`linear-gradient(135deg, ${T.acc}, ${T.accL})`,
                color:"#fff", borderRadius:10,
                fontSize:"0.72rem", fontWeight:700, textDecoration:"none",
                marginBottom:"0.75rem",
                boxShadow:"0 3px 14px rgba(13,148,136,0.28)",
              }}>
                <Download size={12} /> Download Resume
              </a>
              <div style={{ display:"flex", gap:"0.5rem", marginBottom:"0.75rem" }}>
                {[
                  { icon: Github,   href: GITHUB_PROFILE },
                  { icon: Facebook, href:"https://www.facebook.com/muhajir.payao/" },
                  { icon: Mail,     href:"mailto:mhjrpy@gmail.com" },
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
        <motion.div initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.55 }}>
          <span style={{ fontWeight:800, fontSize:"1.15rem", letterSpacing:"-0.04em", color:T.text }}>
            mj<span style={{ color:T.accL }}>dev</span><span style={{ color:T.muted }}>.</span>
          </span>
        </motion.div>

        <nav style={{ gap:"2rem", alignItems:"center", display:"none" }} className="hidden md:flex">
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

        <div style={{ display:"flex", gap:"0.5rem", alignItems:"center" }}>
          {/* Resume button in navbar */}
          <a href={RESUME_URL} download="Muhajir_Payao_Resume.pdf" style={{
            display:"inline-flex", alignItems:"center", gap:"0.3rem",
            fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.04em",
            color: T.accL, border:`1px solid ${T.border}`,
            borderRadius:99, padding:"0.32rem 0.85rem",
            textDecoration:"none", background:T.card, transition:"all 0.2s",
            whiteSpace:"nowrap",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderH; e.currentTarget.style.background = T.cardH; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border;  e.currentTarget.style.background = T.card; }}
          >
            <Download size={11} /> Resume
          </a>

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
          <button onClick={() => setDrawerOpen(true)} style={{
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
        <div style={{ position:"absolute", top:"5%",  right:"-10%", width:"min(560px,60vw)", height:"min(560px,60vw)", borderRadius:"50%", background:"radial-gradient(circle, rgba(13,148,136,0.13) 0%, transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"8%", left:"-8%",  width:"min(320px,40vw)", height:"min(320px,40vw)", borderRadius:"50%", background:"radial-gradient(circle, rgba(45,212,191,0.07) 0%, transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${T.border} 1px,transparent 1px),linear-gradient(90deg,${T.border} 1px,transparent 1px)`, backgroundSize:"60px 60px", opacity:0.5, pointerEvents:"none" }} />

        <div style={{ maxWidth:1200, margin:"0 auto", width:"100%", display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr auto", gap:"2rem", alignItems:"center" }}>
          <motion.div variants={stagger} initial="hidden" animate="visible">
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

            <motion.h1 variants={fadeUp} style={{ fontSize:"clamp(2.6rem,8.5vw,6.8rem)", fontWeight:800, lineHeight:0.92, letterSpacing:"-0.05em", marginBottom:"1.5rem" }}>
              Muhajir<br/>
              <span className="shimmer-text">Payao</span>
            </motion.h1>

            <motion.div variants={fadeUp} style={{ display:"flex", alignItems:"center", gap:"0.8rem", marginBottom:"1.25rem" }}>
              <div style={{ width:28, height:1.5, background: `linear-gradient(90deg, ${T.accL}, transparent)`, borderRadius:2 }} />
              <span style={{ fontSize:"0.72rem", fontFamily:"'JetBrains Mono', monospace", color:T.muted, letterSpacing:"0.1em", textTransform:"uppercase" }}>
                Fullstack Web Developer
              </span>
            </motion.div>

            <motion.p variants={fadeUp} style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:"clamp(0.92rem,2vw,1.1rem)", color:T.sub, maxWidth:460, lineHeight:1.75, marginBottom:"1.25rem", fontWeight:400 }}>
              I craft responsive, high-performing web experiences through clean code and thoughtful, purposeful design.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display:"flex", flexWrap:"wrap", gap:"1rem", marginBottom:"2rem" }}>
              {["Taguig City, Philippines","0928 865 5443"].map((txt,i) => (
                <span key={i} style={{ display:"flex", alignItems:"center", gap:"0.35rem", fontSize:"0.7rem", fontFamily:"'JetBrains Mono', monospace", color:T.muted }}>
                  {i===0 ? <MapPin size={11}/> : <Phone size={11}/>} {txt}
                </span>
              ))}
            </motion.div>

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

              {/* Resume download in hero */}
              <a href={RESUME_URL} download="Muhajir_Payao_Resume.pdf" style={{
                display:"inline-flex", alignItems:"center", gap:"0.4rem",
                border:`1px solid ${T.border}`, color:T.sub, borderRadius:99,
                padding:"0.68rem 1.6rem", fontSize:"0.8rem", fontWeight:600,
                textDecoration:"none", background:"transparent", transition:"all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderH; e.currentTarget.style.color = T.accL; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border;  e.currentTarget.style.color = T.sub;  }}
              >
                <Download size={14}/> Download CV
              </a>

              <a href={GITHUB_PROFILE} target="_blank" rel="noreferrer" style={{
                display:"inline-flex", alignItems:"center", gap:"0.4rem",
                border:`1px solid ${T.border}`, color:T.sub, borderRadius:99,
                padding:"0.68rem 1.1rem", fontSize:"0.8rem", fontWeight:600,
                textDecoration:"none", background:"transparent", transition:"all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderH; e.currentTarget.style.color = T.accL; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border;  e.currentTarget.style.color = T.sub;  }}
              >
                <Github size={14}/>
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

          {!isMobile && (
          <motion.div
            initial={{ opacity:0, scale:0.82 }} animate={{ opacity:1, scale:1 }}
            transition={{ duration:0.95, ease:[0.22,1,0.36,1] }}
            style={{ position:"relative", flexShrink:0 }}
          >
            <div style={{ position:"absolute", inset:-28, borderRadius:"50%", border:"1px dashed rgba(45,212,191,0.2)" }} className="orbit" />
            <div style={{ position:"absolute", inset:-12, borderRadius:"50%", border:"1px solid rgba(45,212,191,0.1)" }} />
            <div style={{
              width:"clamp(145px,15vw,205px)", height:"clamp(145px,15vw,205px)",
              borderRadius:"50%", overflow:"hidden",
              border:`2px solid rgba(45,212,191,0.4)`,
              boxShadow:"0 0 50px rgba(13,148,136,0.22), 0 0 100px rgba(13,148,136,0.08)",
              position:"relative",
            }} className="float-y">
              <img src={hero} alt="Muhajir Payao" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
            </div>
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
          )}
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

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true }}>
            <motion.p variants={fadeUp} style={sectionLabel}>— About Me</motion.p>
            <motion.h2 variants={fadeUp} style={{ ...sectionTitle, marginBottom:"1.5rem" }}>
              Crafting digital<br/><span style={{ color:T.muted }}>experiences.</span>
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize:"0.97rem", color:T.sub, lineHeight:1.8, marginBottom:"1rem", maxWidth:420 }}>
              I'm a passionate web and mobile developer who enjoys building modern, elegant, and user-friendly experiences. I specialize in Flutter, React, Next.js, and TypeScript — always eager to learn and innovate.
            </motion.p>
            <motion.p variants={fadeUp} style={{ fontSize:"0.88rem", fontStyle:"italic", color:T.muted, lineHeight:1.7, maxWidth:420, marginBottom:"2rem", borderLeft:`2px solid ${T.accL}`, paddingLeft:"1rem" }}>
              "Good design is invisible. Great code makes it fast."
            </motion.p>
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
          EXPERIENCE
      ══════════════════════════════════════════ */}
      <section id="experience" style={{ padding:"clamp(4rem,10vw,8rem) clamp(1rem,6vw,4.5rem)", borderTop:`1px solid ${T.border}` }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once:true }} style={{ marginBottom:"3rem" }}>
            <motion.p variants={fadeUp} style={sectionLabel}>— Work History</motion.p>
            <motion.h2 variants={fadeUp} style={sectionTitle}>Experience<span style={{ color:T.muted }}>.</span></motion.h2>
          </motion.div>

          <div style={{ position:"relative" }}>
            <div style={{ position:"absolute", left: 19, top:0, bottom:0, width:1, background:`linear-gradient(to bottom, ${T.accL}, transparent)`, opacity:0.25 }} />
            <div style={{ display:"flex", flexDirection:"column", gap:"2rem" }}>
              {EXPERIENCE.map((exp, i) => (
                <motion.div key={exp.id}
                  initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }} transition={{ delay:i*0.12, duration:0.6, ease:[0.22,1,0.36,1] }}
                  style={{ display:"flex", gap:"1.5rem", alignItems:"flex-start" }}
                >
                  <div style={{ flexShrink:0, width:40, height:40, borderRadius:"50%", border:`1px solid ${exp.accent}40`, background:`${exp.accent}12`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem", position:"relative", zIndex:1 }}>
                    {exp.logo}
                  </div>
                  <motion.div
                    whileHover={{ y:-3 }}
                    style={{
                      flex:1,
                      background:T.card, border:`1px solid ${T.border}`,
                      borderRadius:16, padding:"1.4rem 1.6rem",
                      transition:"background 0.2s, border-color 0.2s, box-shadow 0.3s",
                      position:"relative", overflow:"hidden",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = T.cardH;
                      e.currentTarget.style.borderColor = `${exp.accent}40`;
                      e.currentTarget.style.boxShadow = dark ? "0 12px 40px rgba(0,0,0,0.4)" : "0 12px 40px rgba(0,0,0,0.06)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = T.card;
                      e.currentTarget.style.borderColor = T.border;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div style={{ position:"absolute", top:0, right:0, width:140, height:100, background:`radial-gradient(circle at top right, ${exp.accent}10, transparent 70%)`, pointerEvents:"none" }} />
                    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:"0.5rem", marginBottom:"0.75rem" }}>
                      <div>
                        <h3 style={{ fontSize:"1.05rem", fontWeight:800, letterSpacing:"-0.02em", color:T.text, marginBottom:"0.1rem" }}>{exp.company}</h3>
                        <p style={{ fontSize:"0.75rem", fontWeight:600, color:exp.accent }}>{exp.role}</p>
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"0.25rem" }}>
                        <span style={{ display:"inline-flex", alignItems:"center", gap:"0.3rem", fontSize:"0.6rem", fontFamily:"'JetBrains Mono', monospace", color:T.muted, border:`1px solid ${T.border}`, borderRadius:99, padding:"0.15rem 0.55rem" }}>
                          <Briefcase size={9}/> {exp.type}
                        </span>
                        <span style={{ display:"inline-flex", alignItems:"center", gap:"0.3rem", fontSize:"0.6rem", fontFamily:"'JetBrains Mono', monospace", color:T.accL }}>
                          <Calendar size={9}/> {exp.range}
                        </span>
                      </div>
                    </div>
                    <p style={{ fontSize:"0.85rem", color:T.sub, lineHeight:1.72, marginBottom:"1rem" }}>{exp.desc}</p>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:"0.28rem" }}>
                      {exp.stack.map(s => (
                        <span key={s} style={{ fontSize:"0.58rem", fontFamily:"'JetBrains Mono', monospace", border:`1px solid ${exp.accent}30`, color:exp.accent, padding:"0.16rem 0.55rem", borderRadius:99, background:`${exp.accent}08` }}>{s}</span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROJECTS  (inline carousel cards)
      ══════════════════════════════════════════ */}
      <section id="projects" style={{ padding:"clamp(4rem,10vw,8rem) clamp(1rem,6vw,4.5rem)", borderTop:`1px solid ${T.border}` }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
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
              style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(min(100%,320px),1fr))", gap:"1.1rem" }}
            >
              {filtered.map(proj => (
                <ProjectCard key={proj.id} proj={proj} T={T} dark={dark} />
              ))}
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
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: `${sk.color}18`,
                  border: `1px solid ${sk.color}30`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize: sk.mono ? "0.75rem" : "1.1rem",
                  fontWeight: 900,
                  fontFamily: sk.mono ? "'JetBrains Mono', monospace" : "inherit",
                  color: sk.color,
                  letterSpacing: sk.mono ? "-0.05em" : "normal",
                }}>
                  {sk.icon}
                </div>
                <span style={{ fontSize:"0.6rem", fontFamily:"'JetBrains Mono', monospace", color:T.muted, letterSpacing:"0.04em", textAlign:"center" }}>{sk.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GITHUB
      ══════════════════════════════════════════ */}
      <GitHubSection T={T} dark={dark} />

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
            <div style={{ position:"absolute", top:"-30%", right:"-10%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(45,212,191,0.07) 0%, transparent 65%)", pointerEvents:"none" }} />

            <span style={sectionLabel}>— Get in Touch</span>
            <h2 style={{ ...sectionTitle, maxWidth:560 }}>
              Let's build something <span style={{ color:T.muted }}>remarkable.</span>
            </h2>
            <p style={{ fontSize:"0.97rem", color:T.sub, maxWidth:400, lineHeight:1.75 }}>
              Interested in collaborating or want to discuss a project? I'd love to hear from you.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"0.75rem", justifyContent:"center" }}>
              <a href="mailto:mhjrpy@gmail.com" style={{
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
              <a href={RESUME_URL} download="Muhajir_Payao_Resume.pdf" style={{
                display:"inline-flex", alignItems:"center", gap:"0.45rem",
                border:`1px solid ${T.border}`, color:T.sub, borderRadius:99,
                padding:"0.65rem 1.6rem", fontSize:"0.8rem", fontWeight:600,
                textDecoration:"none", background:"transparent", transition:"all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderH; e.currentTarget.style.color = T.accL; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border;  e.currentTarget.style.color = T.sub; }}
              >
                <Download size={14}/> Resume
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
            <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"1.5rem", paddingTop:"1rem", borderTop:`1px solid ${T.border}`, width:"100%" }}>
              {[
                { icon:MapPin, text:"Taguig City, Philippines" },
                { icon:Phone,  text:"0928 865 5443"           },
                { icon:Mail,   text:"mhjrpy@gmail.com" },
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
              { icon:Mail,     href:"mailto:mhjrpy@gmail.com" },
              { icon:Github,   href: GITHUB_PROFILE           },
              { icon:Facebook, href:"https://www.facebook.com/muhajir.payao/" },
              { icon:Twitter,  href:"https://twitter.com"     },
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