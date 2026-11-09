/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Volume2,
  VolumeX,
  Heart,
  ChevronRight,
  ChevronLeft,
  X,
  Send,
  Navigation,
  Check,
  Share2,
  RotateCcw,
  Flower2,
  PhoneCall,
  Flame,
  UtensilsCrossed
} from 'lucide-react';

/* ==========================================================================
   CONFIG OBJECT - ALL TEXT, SENDER, VENUE & SCHEDULE EDITABLE HERE
   ========================================================================== */
export const ENGAGEMENT_CONFIG = {
  // Occasion Details
  occasionTitle: 'ENGAGEMENT CEREMONY',
  occasionHindi: 'शुभ सगाई',
  groom: 'Hemant',
  bride: 'Kritika',
  monogram: 'H&K',
  hashtag: '#HeManKiKriti',

  // Date and Time
  eventDate: 'Sunday, 22nd November 2026',
  eventDay: 'SUNDAY',
  eventDateNumber: '22',
  eventMonthYear: 'NOVEMBER 2026',
  eventTimeShort: '7:00 PM onwards',
  countdownTarget: '2026-11-22T19:00:00+05:30',

  // Blessings & Sacred Invocations
  blessing: '॥ श्री गणेशाय नमः ॥ / ॥ SHRI GANESHAYA NAMAH ॥',
  shlokaSanskrit: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',

  shlokaTranslation:
    'O Lord with the curved trunk and mighty body, Whose splendour is equal to millions of suns, Kindly bless all my endeavours and remove every obstacle.',

  // Hosts Line
  hostsLine:
    'With the divine blessings and infinite grace of the Almighty, Mrs. Triveni Mangla and Late Shri Nanak Chand cordially invite you to the engagement ceremony of their beloved grandson',
  lateElder: 'Late Shri Nanak Chand',
  grandmother: 'Mrs. Triveni Mangla',

  // Couple Cards
  groomCard: {
    title: 'HEMANT',
    parents: 'Son of Mrs. Poonam and Mr. Naresh Kumar',
    image: 'https://res.cloudinary.com/dqjlffxja/image/upload/v1791705044/Groom_in_Warm_Golden_Bokeh_wb3clb.png',
  },
  brideCard: {
    title: 'KRITIKA',
    parents: 'Daughter of Mrs. Sonam and Mr. Mukesh Kumar',
    residentOf: 'Pachpaddganj, Delhi',
    image: 'https://res.cloudinary.com/dqjlffxja/image/upload/v1791705034/Serene_Festive_Saree_Portrait_scyebv.png',
  },

  // Occasion & Request Statements
  occasionLine: 'TO CELEBRATE THE JOYOUS OCCASION OF THEIR ENGAGEMENT CEREMONY',
  requestLine:
    'Your gracious presence on this auspicious occasion will make the celebration even more special. We warmly request you to join us as per the programme and bless the couple with your love and good wishes.',

  // Programme Schedule
  programme: [
    {
      id: 'engagement',
      title: 'Engagement Ceremony (Ring Ceremony)',
      time: '7:00 PM',
      description: 'Auspicious ring exchange, family shagun, and traditional blessings.',
      calStart: '20261122T190000',
      calEnd: '20261122T200000',
    },
    {
      id: 'dinner',
      title: 'Dinner & Celebrations',
      time: '8:00 PM onwards',
      description: 'Sumptuous multi-cuisine royal banquet with music and celebrations.',
      calStart: '20261122T200000',
      calEnd: '20261122T235900',
    },
  ],

  // Venue & Navigation
  venue: {
    name: 'Grand Petal Banquet Hall',
    landmark: 'In front of Agrasen Bhawan, Near Old Bus Stand',
    locality: 'Loniya Nagar, Ghaziabad',
    fullAddress:
      'Grand Petal Banquet Hall, In front of Agrasen Bhawan, Near Old Bus Stand, Loniya Nagar, Ghaziabad, Uttar Pradesh 201001',
    mapsLink: 'https://www.google.com/maps/search/?api=1&query=Grand+Petal+Banquet+Hall+Old+Bus+Stand+Ghaziabad',
    // Embed iframe for Ghaziabad venue
    mapsEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14003.523098522306!2d77.4172815!3d28.6632483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1b1d1e4c76b%3A0x63351239851726a!2sOld%20Bus%20Stand%2C%20Ghaziabad!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  },

  // Family Honors & Sign-off
  invitedBy: 'CORDIALLY INVITED BY: Naresh Kumar',
  regards: 'WITH BEST REGARDS: The Entire Mangla Family & Friends',

  // Sender & Contacts
  sender: {
    name: 'Naresh Kumar',
    address: 'M. No. 29, Block-D, Urvashi Extension, Near Vardan Nursery, Specialist Hospital, Ghaziabad',
    phone1: '9810954538',
    phone2: '9818394887',
  },
  whatsappNumber: '919810954538',

  // Background Music
  musicUrl: '/Sona%20Sona.mp3',
  backupMusicUrl: '/Sona%20Sona.mp3',

  // Optional Sections (can be turned on anytime by setting enabled: true)
  optionalSections: {
    ourStory: {
      enabled: false,
      title: 'Our Story',
      milestones: [
        {
          year: 'October 2021',
          title: 'The First Hello',
          desc: 'A simple cup of coffee in Connaught Place that sparked an unbreakable bond.',
        },
        {
          year: 'November 2025',
          title: 'The Proposal',
          desc: 'Under the golden twilight sky, with blessings in our hearts, we decided on forever.',
        },
      ],
    },
    gallery: {
      enabled: false,
      title: 'Cherished Moments',
      photos: [
        {
          url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
          caption: 'Sweet moments of anticipation and joy',
        },
        {
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
          caption: 'A new journey blessed by our elders',
        },
      ],
    },
  },
};

/* ==========================================================================
   WEB AUDIO CHIME (Procedural fallback if audio files are firewalled)
   ========================================================================== */
function playAuspiciousSitarChime() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const notes = [293.66, 329.63, 369.99, 440.0, 554.37, 587.33]; // Raag Yaman frequencies
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + idx * 0.12 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 2.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 2.5);
    });
  } catch {
    // Graceful silent fallback
  }
}

/* ==========================================================================
   CANVAS PETALS & GOLD DUST PARTICLE SYSTEM (60fps Lightweight)
   ========================================================================== */
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotSpeed: number;
  type: 'petal' | 'gold_star' | 'confetti';
  color: string;
  opacity: number;
}

const PetalsCanvas: React.FC<{ triggerBurst?: boolean }> = ({ triggerBurst }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const petalColors = ['#F4B6C2', '#FDA4AF', '#FB7185', '#F6D5C0', '#FDE047', '#E5BE72', '#C9A24B'];
    const particles: Particle[] = [];
    const count = 35;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speedX: Math.random() * 1.4 - 0.7,
        speedY: Math.random() * 1.1 + 0.6,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 2,
        type: Math.random() > 0.35 ? 'petal' : 'gold_star',
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        opacity: Math.random() * 0.6 + 0.3,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.5;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;

        if (p.type === 'petal') {
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, p.size / 4, 0, p.size);
          ctx.bezierCurveTo(-p.size, p.size / 4, -p.size / 2, -p.size / 2, 0, 0);
          ctx.fill();
        } else {
          ctx.fillStyle = '#C9A24B';
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.28, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Confetti burst on card opening or bless button
  useEffect(() => {
    if (!triggerBurst) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const burstParticles: Particle[] = [];
    const colors = ['#C9A24B', '#F4B6C2', '#E11D48', '#F59E0B', '#FFFBEB', '#991B1B'];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < 65; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 11 + 3.5;
      burstParticles.push({
        x: centerX,
        y: centerY,
        size: Math.random() * 9 + 4,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed - 4,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8,
        type: Math.random() > 0.5 ? 'petal' : 'confetti',
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 1,
      });
    }

    let burstFrame: number;
    const animateBurst = () => {
      ctx.save();
      burstParticles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.24;
        p.rotation += p.rotSpeed;
        p.opacity -= 0.013;

        if (p.opacity > 0) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;

          if (p.type === 'petal') {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(p.size, -p.size / 2, p.size, p.size, 0, p.size);
            ctx.bezierCurveTo(-p.size, p.size, -p.size, -p.size / 2, 0, 0);
            ctx.fill();
          } else {
            ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          }
          ctx.restore();
        }
      });
      ctx.restore();

      if (burstParticles.some((p) => p.opacity > 0)) {
        burstFrame = requestAnimationFrame(animateBurst);
      }
    };

    animateBurst();
    return () => cancelAnimationFrame(burstFrame);
  }, [triggerBurst]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-40" />;
};

/* ==========================================================================
   ORNAMENTAL SVGS (Ganesh, Lotus, Detailed Floral Corners & Hanging Vines)
   ========================================================================== */
const GaneshLotusIcon: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" stroke="#C9A24B" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.8" />
    <circle cx="50" cy="50" r="41" stroke="#AA771C" strokeWidth="0.8" />
    <path
      d="M30 68C36 62 44 64 50 72C56 64 64 62 70 68C64 74 56 75 50 78C44 75 36 74 30 68Z"
      fill="url(#goldGrad)"
      opacity="0.85"
    />
    <path
      d="M50 24C44 24 40 28 40 33C40 38 45 40 45 46C45 52 42 56 38 56C36 56 35 54 35 53"
      stroke="#7A1F2B"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path
      d="M50 24C56 24 60 28 60 33C60 38 55 42 55 48C55 56 59 58 64 56C65 55.6 66 54 66 54"
      stroke="#7A1F2B"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    <path d="M47 34C48 32 52 32 53 34C53 37 47 39 50 43" stroke="#C9A24B" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="50" cy="28" r="2.2" fill="#7A1F2B" />
    <path d="M46 22H54M47 19H53M49 16H51" stroke="#C9A24B" strokeWidth="1.5" strokeLinecap="round" />
    <defs>
      <linearGradient id="goldGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5DE98" />
        <stop offset="0.5" stopColor="#C9A24B" />
        <stop offset="1" stopColor="#8B6508" />
      </linearGradient>
    </defs>
  </svg>
);

const GatefoldFloralCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}> = ({ position }) => {
  const isTop = position.includes('top');
  const isLeft = position.includes('left');
  const transform = `${!isLeft ? 'scaleX(-1)' : ''} ${!isTop ? 'scaleY(-1)' : ''}`.trim();

  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute w-20 h-20 sm:w-24 sm:h-24 pointer-events-none z-10"
      style={{
        top: isTop ? '14px' : undefined,
        bottom: !isTop ? '14px' : undefined,
        left: isLeft ? '14px' : undefined,
        right: !isLeft ? '14px' : undefined,
        transform: transform || undefined,
      }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 12 Q 35 15, 52 4" stroke="#C9A24B" strokeWidth="1" strokeLinecap="round" />
      <path d="M12 12 Q 15 35, 4 52" stroke="#C9A24B" strokeWidth="1" strokeLinecap="round" />
      <path d="M18 18 Q 36 22, 42 42 Q 22 36, 18 18 Z" fill="#6C8A73" />
      <path d="M48 16 Q 58 14, 62 24 Q 52 26, 48 16 Z" fill="#4E6B56" />
      <path d="M16 48 Q 14 58, 24 62 Q 26 52, 16 48 Z" fill="#4E6B56" />
      <circle cx="32" cy="32" r="13" fill="#F4B6C2" />
      <path
        d="M26 32 C26 27, 30 24, 35 26 C38 28, 39 32, 37 36 C34 39, 28 38, 26 32 Z"
        fill="#E11D48"
        opacity="0.85"
      />
      <path d="M30 29 C32 26, 37 27, 38 30 C39 33, 35 36, 32 35 Z" fill="#FDA4AF" />
      <circle cx="33" cy="31" r="3.2" fill="#C9A24B" />
      <circle cx="54" cy="20" r="4" fill="#FFFDF9" stroke="#E5BE72" strokeWidth="0.8" />
      <circle cx="54" cy="20" r="1.8" fill="#FDE047" />
      <circle cx="20" cy="54" r="4" fill="#FFFDF9" stroke="#E5BE72" strokeWidth="0.8" />
      <circle cx="20" cy="54" r="1.8" fill="#FDE047" />
      <circle cx="68" cy="12" r="1.5" fill="#C9A24B" />
      <circle cx="76" cy="15" r="1.2" fill="#C9A24B" />
      <circle cx="12" cy="68" r="1.5" fill="#C9A24B" />
      <circle cx="15" cy="76" r="1.2" fill="#C9A24B" />
    </svg>
  );
};

const HangingFloralCanopy: React.FC = () => (
  <div className="absolute top-0 left-0 right-0 h-28 sm:h-36 pointer-events-none overflow-hidden z-20">
    <svg viewBox="0 0 1200 160" preserveAspectRatio="none" className="w-full h-full opacity-90 drop-shadow-md">
      <defs>
        <linearGradient id="vineGrad" x1="0" y1="0" x2="0" y2="100%">
          <stop stopColor="#3E5C46" />
          <stop offset="100%" stopColor="#6C8A73" />
        </linearGradient>
        <radialGradient id="roseGrad" cx="50%" cy="50%" r="50%">
          <stop stopColor="#FDA4AF" />
          <stop offset="70%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#9F1239" />
        </radialGradient>
        <radialGradient id="marigoldGrad" cx="50%" cy="50%" r="50%">
          <stop stopColor="#FEF08A" />
          <stop offset="70%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </radialGradient>
      </defs>
      <path
        d="M-50 0 Q 150 70, 300 10 Q 450 80, 600 15 Q 750 80, 900 10 Q 1050 70, 1250 0 L 1250 -20 L -50 -20 Z"
        fill="url(#vineGrad)"
        opacity="0.85"
      />
      <path
        d="M0 0 Q 200 95, 400 20 Q 600 110, 800 20 Q 1000 95, 1200 0"
        stroke="#4E6B56"
        strokeWidth="3.5"
        fill="none"
      />
      {[80, 180, 280, 380, 500, 600, 700, 820, 920, 1020, 1120].map((cx, idx) => {
        const height = 45 + (idx % 3) * 22;
        return (
          <g key={idx}>
            <line x1={cx} y1="15" x2={cx} y2={height} stroke="#C9A24B" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx={cx} cy={height} r="6" fill={idx % 2 === 0 ? 'url(#roseGrad)' : 'url(#marigoldGrad)'} />
            <circle cx={cx} cy={height - 12} r="3" fill="#FFFBEB" />
            <circle cx={cx} cy={height - 24} r="3" fill="#FFFBEB" />
          </g>
        );
      })}
      {[100, 250, 450, 600, 750, 950, 1100].map((x, i) => (
        <g key={`rose-${i}`} transform={`translate(${x}, ${25 + (i % 2) * 15})`}>
          <circle cx="0" cy="0" r="11" fill="url(#roseGrad)" />
          <circle cx="9" cy="4" r="8" fill="url(#marigoldGrad)" />
          <circle cx="-8" cy="4" r="8" fill="#FCE7F3" opacity="0.9" />
          <path d="M-15 0 Q -25 -10, -18 -20 Q -5 -15, -8 0" fill="#4E6B56" />
          <path d="M15 0 Q 25 -10, 18 -20 Q 5 -15, 8 0" fill="#4E6B56" />
        </g>
      ))}
    </svg>
  </div>
);

/* ==========================================================================
   MAIN COMPONENT: APP
   ========================================================================== */
export default function App() {
  // Gatefold state: starts closed, taps to open
  const [isOpen, setIsOpen] = useState(false);
  const [animStep, setAnimStep] = useState<'idle' | 'pulse' | 'cracking' | 'opening'>('idle');
  const [triggerBurst, setTriggerBurst] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Audio control state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Personalized Guest Name from URL query parameter ?guest=Name
  const [guestName, setGuestName] = useState<string>('');

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const guest = params.get('guest');
      if (guest && guest.trim()) {
        setGuestName(guest.trim());
      }
    } catch {
      // Graceful fallback
    }
  }, []);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Lock body scroll during intro screen
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Live Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  // Lightbox modal state for optional gallery
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // RSVP Form State
  const [rsvpState, setRsvpState] = useState({
    name: '',
    guestsCount: '2',
    attendance: 'attending', // 'attending' | 'regretful'
    message: '',
    submitted: false,
  });

  // Calculate live countdown timer to target date
  useEffect(() => {
    const targetDate = new Date(ENGAGEMENT_CONFIG.countdownTarget).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle Invitation Opening (2.8s choreographed sequence)
  const handleOpenCard = () => {
    if (isOpen || animStep !== 'idle') return;

    // 0.0s: Music starts (fade in)
    if (audioRef.current) {
      audioRef.current.volume = 0.55;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          playAuspiciousSitarChime();
          setIsPlaying(false);
        });
    } else {
      playAuspiciousSitarChime();
    }

    if (prefersReducedMotion) {
      setAnimStep('opening');
      setTimeout(() => {
        setIsOpen(true);
        setAnimStep('idle');
      }, 700);
      return;
    }

    // 0.0s: Seal press-pulse (scale 0.92 to 1.05)
    setAnimStep('pulse');

    // 0.2s: Seal cracks apart into two halves sliding left & right + sparkles
    setTimeout(() => {
      setAnimStep('cracking');
    }, 200);

    // 0.4s: Doors rotate open (left door to -115deg, right door to +115deg)
    setTimeout(() => {
      setAnimStep('opening');
    }, 400);

    // 1.0s: Rose petals & gold confetti burst outward
    setTimeout(() => {
      setTriggerBurst(true);
    }, 1000);

    // 2.8s: Remove intro layer from DOM and unlock scroll
    setTimeout(() => {
      setIsOpen(true);
      setAnimStep('idle');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2800);
  };

  // Toggle Music Play / Pause
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          playAuspiciousSitarChime();
          setIsPlaying(true);
        });
    }
  };

  // Generate WhatsApp Message & Open
  const handleSendWhatsAppRsvp = () => {
    const { name, guestsCount, attendance, message } = rsvpState;

    if (!name.trim()) {
      alert('Please enter your full name to confirm RSVP.');
      return;
    }

    const waText =
      `*Engagement Ceremony RSVP - ${ENGAGEMENT_CONFIG.monogram}*\n` +
      `--------------------------------\n` +
      `*Guest Name:* ${name}\n` +
      `*Status:* ${attendance === 'attending' ? '✅ Joyfully Attending!' : '❌ Sending warm blessings from afar'}\n` +
      `*Number of Guests:* ${guestsCount}\n` +
      (message.trim() ? `*Wishes for Couple:* "${message}"\n` : '') +
      `--------------------------------\n` +
      `Eagerly looking forward to celebrating with the Mangal Family on 22nd Nov! ✨`;

    const encoded = encodeURIComponent(waText);
    window.open(`https://wa.me/${ENGAGEMENT_CONFIG.whatsappNumber}?text=${encoded}`, '_blank');
    setRsvpState((prev) => ({ ...prev, submitted: true }));
  };

  // Shower Extra Blessings (Confetti & Petals)
  const triggerBlessingsShower = () => {
    setTriggerBurst(false);
    setTimeout(() => {
      setTriggerBurst(true);
      playAuspiciousSitarChime();
    }, 50);
  };

  // Share invitation link on WhatsApp
  const handleShareWhatsApp = () => {
    const url = window.location.href;
    const text = `🌸 *Engagement Ceremony Invitation* 🌸\n\nTogether with their families, you are warmly invited to the Engagement Ceremony of *Hemant & Kritika* on *Sunday, 22nd November 2026* at Grand Petal Banquet Hall, Ghaziabad.\n\nTap to open your personalized royal digital invite:\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Helper to generate Google Calendar link
  const createGoogleCalendarUrl = (progItem: (typeof ENGAGEMENT_CONFIG.programme)[0]) => {
    const title = encodeURIComponent(`${ENGAGEMENT_CONFIG.monogram} Engagement: ${progItem.title}`);
    const details = encodeURIComponent(
      `${progItem.description}\nHosts: ${ENGAGEMENT_CONFIG.hostsLine}\nVenue: ${ENGAGEMENT_CONFIG.venue.name}, ${ENGAGEMENT_CONFIG.venue.locality}`
    );
    const location = encodeURIComponent(ENGAGEMENT_CONFIG.venue.fullAddress);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${progItem.calStart}/${progItem.calEnd}&details=${details}&location=${location}&sf=true&output=xml`;
  };

  // Display Guest Greeting
  const guestDisplayTitle = guestName ? `To, Mr./Mrs. ${guestName}` : 'Dear Guest';

  return (
    <div className="relative min-h-screen bg-[#FDF8F2] text-[#4A2E2B] font-body selection:bg-[#E5BE72]/30 selection:text-[#4A2E2B] overflow-x-hidden">
      {/* Background Audio Element */}
      <audio ref={audioRef} loop preload="auto" src={ENGAGEMENT_CONFIG.musicUrl}>
        <source src={ENGAGEMENT_CONFIG.musicUrl} type="audio/mpeg" />
        <source src={ENGAGEMENT_CONFIG.backupMusicUrl} type="audio/mpeg" />
      </audio>

      {/* Floating Canvas Particles (Rose Petals & Golden Sequins) */}
      <PetalsCanvas triggerBurst={triggerBurst} />

      {/* ====================================================================
          GATEFOLD COVER EXPERIENCE (When Closed)
          ==================================================================== */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="gatefold-container"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-3 sm:p-4 overflow-hidden bg-gradient-to-br from-[#F8D9C4] via-[#FBEBDD] to-[#F5DECE] select-none"
          >
            {/* Subtle vintage texture in page background - no blur */}
            <div className="absolute inset-0 paper-texture opacity-40 pointer-events-none" />

            {/* 3D Gatefold Card Container - Exact Match for Reference Image Aspect Ratio (512x1024 = 1:2) */}
            <div
              onClick={handleOpenCard}
              className="relative w-[min(88vw,390px)] aspect-[1/2] max-h-[calc(100vh-60px)] rounded-3xl gatefold-perspective select-none shadow-[0_24px_60px_rgba(74,46,43,0.38)] cursor-pointer"
            >
              {/* Underlying Inner Invitation Page (Grows & scales 0.92 to 1.0 behind swinging doors) */}
              <div className="absolute inset-0 rounded-2xl bg-[#FFFDF9] border border-[#C9A24B]/40 overflow-hidden flex flex-col items-center justify-center p-6 text-center shadow-inner">
                {/* Radial Golden Light expanding from center (0.5s to 1.8s) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{
                    opacity: animStep === 'opening' ? [0, 1, 0.9] : 0,
                    scale: animStep === 'opening' ? [0.7, 1.4] : 0.7,
                  }}
                  transition={{ duration: 1.3, delay: 0.1, ease: 'easeOut' }}
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#FFE7B8_0%,_#FDF5EC_50%,_transparent_75%)] pointer-events-none"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{
                    opacity: animStep === 'opening' ? 1 : 0,
                    scale: animStep === 'opening' ? 1 : 0.92,
                  }}
                  transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 flex flex-col items-center"
                >
                  <img src="/Ganesh-logo.png" alt="Ganesh" className="w-14 h-14 mb-2 object-contain" />
                  <h2 className="font-script text-4xl text-[#7A1F2B] my-2">
                    {ENGAGEMENT_CONFIG.groom} &amp; {ENGAGEMENT_CONFIG.bride}
                  </h2>
                  <p className="text-xs text-[#AA771C] tracking-widest font-serif font-semibold">
                    {ENGAGEMENT_CONFIG.eventDate}
                  </p>
                </motion.div>
              </div>

              {/* LEFT GATEFOLD DOOR PANEL (50% wide, rotates on left edge) */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{
                  rotateY: animStep === 'opening' ? -115 : 0,
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.65, 0, 0.35, 1],
                }}
                style={{
                  transformOrigin: 'left center',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }}
                className="absolute top-0 bottom-0 left-0 w-1/2 rounded-l-2xl overflow-visible z-20 shadow-xl"
              >
                {/* FRONT FACE OF LEFT DOOR - High Quality Floral Reference Image */}
                <div
                  style={{ backfaceVisibility: 'hidden' }}
                  className="absolute inset-0 rounded-l-3xl overflow-hidden bg-[#FAF0E6] border-r-0 shadow-inner"
                >
                  <img
                    src="/door-left.jpg"
                    alt="Door Left"
                    className="w-full h-full object-cover object-left select-none pointer-events-none"
                    draggable={false}
                  />

                  {/* Door edge shadow that darkens slightly on opening */}
                  <motion.div
                    animate={{ opacity: animStep === 'opening' ? 0.35 : 0 }}
                    transition={{ duration: 1.1 }}
                    className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/30 to-transparent pointer-events-none"
                  />
                </div>

                {/* INSIDE FACE OF LEFT DOOR (Visible when swinging) */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                  className="absolute inset-0 rounded-r-2xl overflow-hidden bg-[#FFFDF9] border border-[#C9A24B]/40 flex items-center justify-center"
                >
                  <div className="absolute inset-2 border border-[#C9A24B]/30 rounded-r-xl pointer-events-none" />
                  <svg viewBox="0 0 100 150" fill="none" className="w-28 h-40 opacity-25">
                    <path d="M50 20 C 30 40, 20 70, 50 100 C 80 70, 70 40, 50 20 Z" stroke="#C9A24B" strokeWidth="1" />
                    <circle cx="50" cy="60" r="10" stroke="#AA771C" strokeWidth="0.8" />
                    <path d="M50 40 L 50 80 M 30 60 L 70 60" stroke="#C9A24B" strokeWidth="0.8" />
                  </svg>
                </div>
              </motion.div>

              {/* RIGHT GATEFOLD DOOR PANEL (50% wide, rotates on right edge) */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{
                  rotateY: animStep === 'opening' ? 115 : 0,
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.65, 0, 0.35, 1],
                }}
                style={{
                  transformOrigin: 'right center',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }}
                className="absolute top-0 bottom-0 right-0 w-1/2 rounded-r-2xl overflow-visible z-20 shadow-xl"
              >
                {/* FRONT FACE OF RIGHT DOOR - High Quality Floral Reference Image */}
                <div
                  style={{ backfaceVisibility: 'hidden' }}
                  className="absolute inset-0 rounded-r-3xl overflow-hidden bg-[#FAF0E6] border-l-0 shadow-inner"
                >
                  <img
                    src="/door-right.jpg"
                    alt="Door Right"
                    className="w-full h-full object-cover object-right select-none pointer-events-none"
                    draggable={false}
                  />

                  {/* Door edge shadow that darkens slightly on opening */}
                  <motion.div
                    animate={{ opacity: animStep === 'opening' ? 0.35 : 0 }}
                    transition={{ duration: 1.1 }}
                    className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/30 to-transparent pointer-events-none"
                  />
                </div>

                {/* INSIDE FACE OF RIGHT DOOR (Visible when swinging) */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                  className="absolute inset-0 rounded-l-2xl overflow-hidden bg-[#FFFDF9] border border-[#C9A24B]/40 flex items-center justify-center"
                >
                  <div className="absolute inset-2 border border-[#C9A24B]/30 rounded-l-xl pointer-events-none" />
                  <svg viewBox="0 0 100 150" fill="none" className="w-28 h-40 opacity-25">
                    <path d="M50 20 C 30 40, 20 70, 50 100 C 80 70, 70 40, 50 20 Z" stroke="#C9A24B" strokeWidth="1" />
                    <circle cx="50" cy="60" r="10" stroke="#AA771C" strokeWidth="0.8" />
                    <path d="M50 40 L 50 80 M 30 60 L 70 60" stroke="#C9A24B" strokeWidth="0.8" />
                  </svg>
                </div>
              </motion.div>

              {/* CARD PANELS OVERLAY TEXT - Cleanly integrated with the art */}
              {/* Note: Front typography, flowers, balloons and decorations are embedded seamlessly in the reference art */}

              {/* SEAL IN EXACT CENTER - Hidden because the image already has the royal H&K seal embedded */}
              {/* Note: Clicking anywhere on the card triggers handleOpenCard */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================================
          FLOATING PERSISTENT CONTROLS - REMOVED
          ==================================================================== */}

      {/* ====================================================================
          MAIN INVITATION SCROLL CONTAINER
          ==================================================================== */}
      <main className="relative max-w-xl mx-auto px-4 sm:px-6 pt-6 pb-24 shadow-2xl bg-[#FFFDF9] min-h-screen border-x border-[#EAD5C5]/60">
        {/* Hanging Floral Vines Canopy at Header */}
        <HangingFloralCanopy />

        {/* ==================================================================
            1. HERO SECTION (Classic Indian Royal Engagement Card)
            ================================================================== */}
        <header className="relative pt-24 sm:pt-28 pb-8 text-center">
          {/* Traditional Auspicious Invocation */}
          <div className="flex flex-col items-center justify-center mb-2">
            <img src="/Ganesh-logo.png" alt="Ganesh" className="w-14 h-14 sm:w-16 sm:h-16 mb-2 drop-shadow-sm object-contain" />
            <span className="text-xs sm:text-sm font-devanagari tracking-[0.2em] text-[#7A1F2B] font-bold">
              ॥ श्री गणेशाय नमः ॥
            </span>
          </div>

          <p className="font-script text-2xl sm:text-3xl text-[#AA771C] tracking-wide mb-1">
            You Are Cordially Invited
          </p>

          <h2 className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#7A1F2B] font-semibold font-sans mb-3">
            {ENGAGEMENT_CONFIG.occasionTitle}
          </h2>

          {/* Couple Calligraphy Names */}
          <div className="my-2">
            <h1 className="font-script text-5xl sm:text-7xl gold-text-gradient font-normal leading-tight drop-shadow-sm">
              {ENGAGEMENT_CONFIG.groom}
            </h1>
            <div className="flex items-center justify-center gap-3 my-1">
              <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#C9A24B] to-transparent" />
              <span className="font-allura text-3xl sm:text-4xl text-[#7A1F2B]">&amp;</span>
              <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#C9A24B] to-transparent" />
            </div>
            <h1 className="font-script text-5xl sm:text-7xl gold-text-gradient font-normal leading-tight drop-shadow-sm">
              {ENGAGEMENT_CONFIG.bride}
            </h1>
          </div>

          {/* DATE BLOCK - Exactly matching classic luxury card layout */}
          <div className="my-6 max-w-sm mx-auto p-4 rounded-xl bg-gradient-to-b from-[#FDF6ED] to-[#FAF0E3] border border-[#C9A24B]/40 shadow-sm">
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              {/* Day Number */}
              <div className="text-5xl sm:text-6xl font-serif-royal font-bold text-[#7A1F2B] tracking-tight">
                {ENGAGEMENT_CONFIG.eventDateNumber}
              </div>

              {/* Vertical Gold Divider */}
              <div className="w-[1.5px] h-14 bg-gradient-to-b from-[#C9A24B] via-[#7A1F2B] to-[#C9A24B]" />

              {/* Stacked Day & Month */}
              <div className="text-left font-serif leading-tight">
                <div className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#7A1F2B] uppercase">
                  {ENGAGEMENT_CONFIG.eventDay}
                </div>
                <div className="text-xs sm:text-sm tracking-[0.15em] text-[#8C6D68] uppercase font-light">
                  {ENGAGEMENT_CONFIG.eventMonthYear}
                </div>
                <div className="text-[11px] text-[#AA771C] font-sans font-medium mt-0.5">
                  {ENGAGEMENT_CONFIG.eventTimeShort}
                </div>
              </div>
            </div>

            {/* Venue Line */}
            <div className="mt-3 pt-3 border-t border-[#C9A24B]/25 flex items-center justify-center gap-1.5 text-xs text-[#7A1F2B] font-serif">
              <MapPin className="w-3.5 h-3.5 text-[#AA771C] shrink-0" />
              <span>{ENGAGEMENT_CONFIG.venue.name} · Ghaziabad</span>
            </div>
          </div>


        </header>

        {/* ORNAMENTAL SECTION DIVIDER */}
        <div className="flex items-center justify-center gap-3 my-8">
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A24B]/40 to-transparent" />
          <Flower2 className="w-4 h-4 text-[#C9A24B]" />
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A24B]/40 to-transparent" />
        </div>

        {/* ==================================================================
            2. SACRED BLESSING & SHLOKA SECTION
            ================================================================== */}
        <section className="text-center py-4 px-2">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FFF8EE] via-[#FDF3E7] to-[#FAF0E3] border border-[#C9A24B]/30 shadow-sm relative overflow-hidden">
            <div className="absolute top-2 right-2 text-[#C9A24B]/20">
              <Sparkles className="w-8 h-8" />
            </div>

            <h3 className="font-devanagari text-base sm:text-lg text-[#7A1F2B] font-bold tracking-wide">
              ॥ श्री गणेशाय नमः ॥
            </h3>
            <p className="text-[11px] tracking-[0.25em] uppercase font-serif text-[#AA771C] font-semibold mt-0.5">
              ॥ SHRI GANESHAYA NAMAH ॥
            </p>


            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C9A24B] to-transparent mx-auto my-2" />

            <p className="text-xs text-[#73504A] font-serif italic mt-2 leading-relaxed max-w-md mx-auto">
              &ldquo;{ENGAGEMENT_CONFIG.shlokaTranslation}&rdquo;
            </p>
          </div>
        </section>

        {/* ==================================================================
            3. HOSTS, COUPLE CARDS & INVITATION TEXT
            ================================================================== */}
        <section className="py-6">
          {/* Grandparents & Divine Grace Hosts Line */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF9F3] border border-[#C9A24B]/35 shadow-sm text-center mb-6">
            <div className="flex items-center justify-center gap-1.5 text-xs text-[#AA771C] font-semibold uppercase tracking-wider mb-2 font-serif">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>With the Blessings of Our Elders</span>
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            </div>

            <p className="text-xs sm:text-sm text-[#5C3E3A] leading-relaxed font-serif max-w-lg mx-auto">
              With the divine blessings and infinite grace of the Almighty,
              <br />
              <strong className="text-[#7A1F2B] font-semibold">{ENGAGEMENT_CONFIG.grandmother}</strong> and{' '}
              <span className="inline-flex items-center gap-1 text-[#7A1F2B] font-semibold">

                {ENGAGEMENT_CONFIG.lateElder}
              </span>
              <br />
              cordially invite you to the engagement ceremony of their beloved grandson
            </p>
          </div>

          {/* Groom & Bride Two-Card Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-6">
            {/* Groom Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-[#FFFDF9] to-[#FAF2E8] border border-[#C9A24B]/40 shadow-sm text-center flex flex-col items-center">
              {/* Arch Photo Frame matching reference */}
              <div className="relative mb-4 group">
                {/* Decorative Floral Accent on Arch */}
                <span className="absolute -top-2 left-2 text-sm select-none pointer-events-none z-10">🌸</span>
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs text-[#AA771C] select-none pointer-events-none z-10">▼</span>

                <div className="w-36 h-48 sm:w-40 sm:h-52 rounded-t-full rounded-b-lg border-2 border-[#C9A24B] p-1 bg-gradient-to-b from-[#F5DE98]/40 to-transparent shadow-md overflow-hidden">
                  <div className="w-full h-full rounded-t-full rounded-b-md overflow-hidden bg-[#FAF0E6]">
                    <img
                      src={ENGAGEMENT_CONFIG.groomCard.image}
                      alt="Hemant - Groom"
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              <div className="w-10 h-1 bg-[#7A1F2B] mx-auto rounded-full mb-2" />
              <span className="text-[10px] uppercase tracking-widest text-[#AA771C] font-semibold">
                Groom
              </span>
              <h3 className="font-serif-royal text-2xl font-bold text-[#7A1F2B] mt-1 mb-2">
                {ENGAGEMENT_CONFIG.groomCard.title}
              </h3>
              <div className="w-8 h-[1px] bg-[#C9A24B]/30 mx-auto my-2" />
              <p className="text-xs text-[#5C3E3A] font-serif leading-relaxed">
                {ENGAGEMENT_CONFIG.groomCard.parents}
              </p>
            </div>

            {/* Bride Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-[#FFFDF9] to-[#FAF2E8] border border-[#C9A24B]/40 shadow-sm text-center flex flex-col items-center">
              {/* Arch Photo Frame matching reference */}
              <div className="relative mb-4 group">
                {/* Decorative Floral Accent on Arch */}
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs text-[#AA771C] select-none pointer-events-none z-10">▼</span>
                <span className="absolute -top-2 right-2 text-sm select-none pointer-events-none z-10">🌸</span>

                <div className="w-36 h-48 sm:w-40 sm:h-52 rounded-t-full rounded-b-lg border-2 border-[#C9A24B] p-1 bg-gradient-to-b from-[#F5DE98]/40 to-transparent shadow-md overflow-hidden">
                  <div className="w-full h-full rounded-t-full rounded-b-md overflow-hidden bg-[#FAF0E6]">
                    <img
                      src={ENGAGEMENT_CONFIG.brideCard.image}
                      alt="Kritika - Bride"
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              <div className="w-10 h-1 bg-[#AA771C] mx-auto rounded-full mb-2" />
              <span className="text-[10px] uppercase tracking-widest text-[#AA771C] font-semibold">
                Bride
              </span>
              <h3 className="font-serif-royal text-2xl font-bold text-[#7A1F2B] mt-1 mb-2">
                {ENGAGEMENT_CONFIG.brideCard.title}
              </h3>
              <div className="w-8 h-[1px] bg-[#C9A24B]/30 mx-auto my-2" />
              <p className="text-xs text-[#5C3E3A] font-serif leading-relaxed">
                {ENGAGEMENT_CONFIG.brideCard.parents}
              </p>
            </div>
          </div>

          {/* Occasion Statement & Warm Request */}
          <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#FAF1E4] to-[#F8EBE0] border border-[#C9A24B]/35 shadow-sm text-center">
            <h4 className="text-xs sm:text-sm font-serif-royal font-bold text-[#7A1F2B] tracking-wider uppercase mb-2">
              {ENGAGEMENT_CONFIG.occasionLine}
            </h4>
            <div className="w-10 h-[1px] bg-[#C9A24B] mx-auto my-2" />
            <p className="text-xs sm:text-sm text-[#5C3E3A] font-serif leading-relaxed max-w-md mx-auto">
              {ENGAGEMENT_CONFIG.requestLine}
            </p>
          </div>
        </section>

        {/* ORNAMENTAL SECTION DIVIDER */}
        <div className="flex items-center justify-center gap-3 my-8">
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A24B]/40 to-transparent" />
          <Calendar className="w-4 h-4 text-[#7A1F2B]" />
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A24B]/40 to-transparent" />
        </div>

        {/* ==================================================================
            4. PROGRAMME SCHEDULE (Ceremony & Dinner)
            ================================================================== */}
        <section className="py-6">
          <div className="text-center mb-6">
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#AA771C] font-sans">
              Order of Events
            </span>
            <h2 className="font-serif-royal text-2xl sm:text-3xl text-[#7A1F2B] font-bold mt-1">
              Ceremony Programme
            </h2>
            <p className="text-xs text-[#8C6D68] italic font-serif mt-1">
              Sunday, 22nd November 2026
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Event 1: Engagement Ceremony */}
            <div className="p-5 rounded-2xl bg-[#FFF9F3] border border-[#C9A24B]/35 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF08A]/70 text-[#854D0E]">
                    <Clock className="w-3.5 h-3.5" />
                    7:00 PM
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#FAF1E4] border border-[#C9A24B]/30 flex items-center justify-center text-[#7A1F2B]">
                    <Heart className="w-4 h-4 fill-[#7A1F2B]/20" />
                  </div>
                </div>

                <h3 className="font-serif-royal text-xl font-bold text-[#7A1F2B] mt-2 mb-1">
                  Engagement Ceremony
                </h3>
                <p className="text-xs text-[#5C3E3A] font-serif leading-relaxed mb-4">
                  The auspicious exchange of rings, blessings of elders, and celebratory shagun rituals.
                </p>
              </div>


            </div>

            {/* Event 2: Dinner */}
            <div className="p-5 rounded-2xl bg-[#FFF9F3] border border-[#C9A24B]/35 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#DCFCE7]/70 text-[#166534]">
                    <Clock className="w-3.5 h-3.5" />
                    8:00 PM onwards
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#FAF1E4] border border-[#C9A24B]/30 flex items-center justify-center text-[#7A1F2B]">
                    <UtensilsCrossed className="w-4 h-4 text-[#AA771C]" />
                  </div>
                </div>

                <h3 className="font-serif-royal text-xl font-bold text-[#7A1F2B] mt-2 mb-1">
                  Dinner &amp; Banquet
                </h3>
                <p className="text-xs text-[#5C3E3A] font-serif leading-relaxed mb-4">
                  Sumptuous royal dinner feast, desserts, and festive celebrations with family &amp; friends.
                </p>
              </div>


            </div>
          </div>
        </section>

        {/* ORNAMENTAL SECTION DIVIDER */}
        <div className="flex items-center justify-center gap-3 my-8">
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A24B]/40 to-transparent" />
          <Sparkles className="w-4 h-4 text-[#AA771C]" />
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A24B]/40 to-transparent" />
        </div>

        {/* ==================================================================
            5. LIVE COUNTDOWN TO ENGAGEMENT
            ================================================================== */}
        <section className="py-6 text-center">
          <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#AA771C] font-sans">
            Auspicious Muhurat
          </span>
          <h2 className="font-serif-royal text-2xl sm:text-3xl text-[#7A1F2B] font-bold mt-1 mb-4">
            Counting Down To The Celebration
          </h2>

          {timeLeft.isExpired ? (
            <div className="p-4 rounded-xl bg-[#DCFCE7] border border-[#22C55E]/40 text-[#166534] font-serif font-semibold text-sm max-w-sm mx-auto shadow-sm">
              Today is the day! Auspicious Day Has Arrived ✨
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md mx-auto">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 sm:p-4 rounded-xl bg-gradient-to-b from-[#FFFDF9] to-[#FAF2E8] border border-[#C9A24B]/40 shadow-sm"
                >
                  <div className="text-2xl sm:text-3xl font-serif-royal font-bold text-[#7A1F2B] tabular-nums">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs tracking-wider text-[#8C6D68] uppercase font-sans mt-0.5">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-[#73504A] font-serif mt-3">
            {ENGAGEMENT_CONFIG.eventDate} · 7:00 PM onwards
          </p>
        </section>

        {/* ORNAMENTAL SECTION DIVIDER */}
        <div className="flex items-center justify-center gap-3 my-8">
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A24B]/40 to-transparent" />
          <MapPin className="w-4 h-4 text-[#7A1F2B]" />
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A24B]/40 to-transparent" />
        </div>

        {/* ==================================================================
            6. VENUE, DIRECTIONS & MAP
            ================================================================== */}
        <section className="py-6">
          <div className="text-center mb-6">
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#AA771C] font-sans">
              Ceremony Location
            </span>
            <h2 className="font-serif-royal text-2xl sm:text-3xl text-[#7A1F2B] font-bold mt-1">
              Venue &amp; Directions
            </h2>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFF9F3] border border-[#C9A24B]/35 shadow-sm space-y-4">
            <div>
              <h3 className="font-serif-royal text-xl sm:text-2xl font-bold text-[#7A1F2B]">
                {ENGAGEMENT_CONFIG.venue.name}
              </h3>
              <p className="text-xs text-[#AA771C] font-semibold mt-0.5">
                {ENGAGEMENT_CONFIG.venue.landmark}
              </p>
              <p className="text-xs text-[#5C3E3A] mt-1 leading-relaxed">
                {ENGAGEMENT_CONFIG.venue.fullAddress}
              </p>
            </div>

            {/* Embedded Google Maps View */}
            <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden border border-[#C9A24B]/30 shadow-inner">
              <iframe
                title="Grand Petal Banquet Hall Venue Map"
                src={ENGAGEMENT_CONFIG.venue.mapsEmbed}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Get Directions CTA */}
            <a
              href={ENGAGEMENT_CONFIG.venue.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#7A1F2B] to-[#982B3B] text-[#FFF6EC] text-xs font-serif font-semibold tracking-wider hover:opacity-95 transition-opacity shadow-sm"
            >
              <Navigation className="w-4 h-4 text-[#FDE047]" />
              <span>Get Directions on Google Maps</span>
            </a>
          </div>
        </section>

        {/* ORNAMENTAL SECTION DIVIDER */}
        <div className="flex items-center justify-center gap-3 my-8">
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A24B]/40 to-transparent" />
          <Send className="w-4 h-4 text-[#7A1F2B]" />
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A24B]/40 to-transparent" />
        </div>



        {/* ==================================================================
            OPTIONAL SECTIONS: OUR STORY & GALLERY (if enabled in CONFIG)
            ================================================================== */}
        {ENGAGEMENT_CONFIG.optionalSections.ourStory.enabled && (
          <section className="py-6">
            <div className="text-center mb-6">
              <h2 className="font-serif-royal text-2xl sm:text-3xl text-[#7A1F2B] font-bold">
                {ENGAGEMENT_CONFIG.optionalSections.ourStory.title}
              </h2>
            </div>
            <div className="space-y-4">
              {ENGAGEMENT_CONFIG.optionalSections.ourStory.milestones.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FFF9F3] border border-[#C9A24B]/30">
                  <span className="text-xs font-semibold text-[#AA771C]">{m.year}</span>
                  <h4 className="font-serif-royal text-lg font-bold text-[#7A1F2B] mt-0.5">{m.title}</h4>
                  <p className="text-xs text-[#5C3E3A] mt-1">{m.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {ENGAGEMENT_CONFIG.optionalSections.gallery.enabled && (
          <section className="py-6">
            <div className="text-center mb-6">
              <h2 className="font-serif-royal text-2xl sm:text-3xl text-[#7A1F2B] font-bold">
                {ENGAGEMENT_CONFIG.optionalSections.gallery.title}
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {ENGAGEMENT_CONFIG.optionalSections.gallery.photos.map((p, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePhotoIndex(idx)}
                  className="cursor-pointer rounded-xl overflow-hidden aspect-[4/5] bg-[#FBEBDD] border border-[#C9A24B]/30"
                >
                  <img src={p.url} alt={p.caption} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
              {activePhotoIndex !== null && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                  onClick={() => setActivePhotoIndex(null)}
                >
                  <div className="relative max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setActivePhotoIndex(null)}
                      className="absolute -top-10 right-0 p-2 text-white"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <img
                      src={ENGAGEMENT_CONFIG.optionalSections.gallery.photos[activePhotoIndex].url}
                      alt="Gallery"
                      className="w-full rounded-xl"
                    />
                    <p className="text-center text-white text-xs mt-2 font-serif">
                      {ENGAGEMENT_CONFIG.optionalSections.gallery.photos[activePhotoIndex].caption}
                    </p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </section>
        )}

        {/* ORNAMENTAL SECTION DIVIDER */}
        <div className="flex items-center justify-center gap-3 my-8">
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A24B]/40 to-transparent" />
          <Flower2 className="w-4 h-4 text-[#C9A24B]" />
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A24B]/40 to-transparent" />
        </div>

        {/* ==================================================================
            8. CLOSING, INVITEE HONOR & SENDER ADDRESS FOOTER
            ================================================================== */}
        <footer className="text-center py-6 space-y-6">
          {/* Couple Monogram Crest */}
          <div className="inline-block p-1 rounded-full bg-gradient-to-tr from-[#C9A24B] to-[#F5DE98]">
            <div className="w-14 h-14 rounded-full bg-[#7A1F2B] flex items-center justify-center text-[#FBF5B7] font-serif-royal font-bold text-xl shadow-md">
              {ENGAGEMENT_CONFIG.monogram}
            </div>
          </div>

          <div>
            <h3 className="font-script text-3xl sm:text-4xl text-[#7A1F2B]">
              {ENGAGEMENT_CONFIG.groom} &amp; {ENGAGEMENT_CONFIG.bride}
            </h3>
            <p className="font-serif italic text-xs text-[#8C6D68] my-1">
              &ldquo;Aapki upasthiti hamare liye sabse bada aashirwaad hai&rdquo;
            </p>
          </div>

          {/* Invited By & Regards Box */}
          <div className="p-5 rounded-2xl bg-[#FFF9F3] border border-[#C9A24B]/35 shadow-sm text-center max-w-md mx-auto space-y-3">
            <div>
              <p className="text-[11px] font-serif font-bold text-[#7A1F2B] tracking-wider uppercase">
                {ENGAGEMENT_CONFIG.invitedBy}
              </p>
            </div>

            <div className="w-12 h-[1px] bg-[#C9A24B]/30 mx-auto" />

            <div>
              <p className="text-[11px] font-serif font-semibold text-[#8C6D68] tracking-wider uppercase">
                {ENGAGEMENT_CONFIG.regards}
              </p>
            </div>
          </div>

          {/* Sender Details Card */}
          <div className="p-4 rounded-xl bg-[#FAF1E4] border border-[#C9A24B]/25 text-xs text-center max-w-md mx-auto">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#AA771C]">
              From the Desk of
            </span>
            <p className="font-serif font-bold text-sm text-[#7A1F2B] mt-0.5">
              {ENGAGEMENT_CONFIG.sender.name}
            </p>
            <p className="text-[11px] text-[#5C3E3A] mt-0.5 leading-relaxed">
              {ENGAGEMENT_CONFIG.sender.address}
            </p>
            <p className="text-[11px] font-medium text-[#7A1F2B] mt-1">
              Contact: {ENGAGEMENT_CONFIG.sender.phone1}, {ENGAGEMENT_CONFIG.sender.phone2}
            </p>
          </div>




        </footer>
      </main>
    </div>
  );
}
