import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Briefcase,
  ChevronsRight,
  Code2,
  Flower2,
  Heart,
  Layers,
  MousePointer2,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import {
  NavHomeIcon,
  NavAboutIcon,
  NavCaseStudyIcon,
  NavServicesIcon,
  NavJournalIcon,
  NavPlaygroundIcon,
} from "@/components/contact/contact-page";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function Mark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

// Bounding box corner handles
function Handles({ color = "#f59e0b" }: { color?: string }) {
  return (
    <>
      <span
        className="about-box-handle handle-tl"
        style={{ borderColor: color }}
        aria-hidden="true"
      />
      <span
        className="about-box-handle handle-tr"
        style={{ borderColor: color }}
        aria-hidden="true"
      />
      <span
        className="about-box-handle handle-bl"
        style={{ borderColor: color }}
        aria-hidden="true"
      />
      <span
        className="about-box-handle handle-br"
        style={{ borderColor: color }}
        aria-hidden="true"
      />
    </>
  );
}

// Hand-drawn sketch arrows for the story section
function ArrowSketchRight() {
  return (
    <svg
      width="48"
      height="28"
      viewBox="0 0 48 28"
      fill="none"
      className="sketch-arrow"
      aria-hidden="true"
    >
      <path
        d="M2 14C14 8 32 6 44 14M44 14L34 7M44 14L36 22"
        stroke="#111111"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowSketchLeft() {
  return (
    <svg
      width="48"
      height="28"
      viewBox="0 0 48 28"
      fill="none"
      className="sketch-arrow"
      aria-hidden="true"
    >
      <path
        d="M46 14C34 8 16 6 4 14M4 14L14 7M4 14L12 22"
        stroke="#111111"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AboutPage() {
  const navigate = useNavigate();

  // Active section for sticky left dock
  const [activeSection, setActiveSection] = useState<"bio" | "story" | "work">("bio");

  // Cursor state
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorInteracting, setCursorInteracting] = useState(false);

  // Dialog states for playground and resume
  const [dialog, setDialog] = useState<string | null>(null);
  const [experiment, setExperiment] = useState("✳");
  const [reaction, setReaction] = useState(false);

  // Ruler motion refs
  const topRulerTrackRef = useRef<HTMLDivElement>(null);
  const footerScaleTrackRef = useRef<HTMLDivElement>(null);
  const rulerOffsetRef = useRef(-200);
  const rulerVelocityRef = useRef(0);
  const lastXRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);

  // Handle ruler motion on pointer movement
  const handleScaleMotion = (clientX: number) => {
    const now = performance.now();
    if (lastXRef.current !== null) {
      const dt = now - lastTimeRef.current;
      if (dt >= 4 && dt < 160) {
        const dx = clientX - lastXRef.current;
        rulerOffsetRef.current += dx * 0.16;
        const instantV = Math.max(-8, Math.min(8, (dx / dt) * 2.8));
        rulerVelocityRef.current = rulerVelocityRef.current * 0.78 + instantV * 0.22;
      }
    }
    lastXRef.current = clientX;
    lastTimeRef.current = now;
  };

  // Continuous ruler damping loop
  useEffect(() => {
    let animId: number;
    const DAMPING = 0.958;
    const MIN_OFFSET = -1200;
    const MAX_OFFSET = 600;

    const tick = () => {
      const now = performance.now();
      if (now - lastTimeRef.current > 75) {
        lastXRef.current = null;
      }

      if (Math.abs(rulerVelocityRef.current) > 0.01) {
        rulerOffsetRef.current += rulerVelocityRef.current;
        rulerVelocityRef.current *= DAMPING;
      } else {
        rulerVelocityRef.current = 0;
      }

      if (rulerOffsetRef.current < MIN_OFFSET) {
        const over = MIN_OFFSET - rulerOffsetRef.current;
        rulerVelocityRef.current += over * 0.05;
        rulerVelocityRef.current *= 0.8;
      } else if (rulerOffsetRef.current > MAX_OFFSET) {
        const over = MAX_OFFSET - rulerOffsetRef.current;
        rulerVelocityRef.current += over * 0.05;
        rulerVelocityRef.current *= 0.8;
      }

      const offsetPx = `${rulerOffsetRef.current.toFixed(2)}px`;
      if (topRulerTrackRef.current) {
        topRulerTrackRef.current.style.transform = `translate3d(${offsetPx}, 0, 0)`;
      }
      if (footerScaleTrackRef.current) {
        footerScaleTrackRef.current.style.transform = `translate3d(${offsetPx}, 0, 0)`;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  // Pointer movement tracking for custom cursor and ruler
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    const handlePointerMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest(
          'button, a, input, textarea, [role="button"], .about-sticky-btn, .about-card',
        );
        setCursorInteracting(isClickable);
      }
      handleScaleMotion(e.clientX);
    };

    const handleMouseLeave = () => {
      setCursorVisible(false);
      lastXRef.current = null;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Scroll spy to update active section in left sticky dock
  useEffect(() => {
    const handleScroll = () => {
      const sections: Array<"bio" | "story" | "work"> = ["bio", "story", "work"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240 && rect.bottom >= 140) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: "bio" | "story" | "work") => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActiveSection(id);
  };

  return (
    <div className="about-page-root">
      {/* Live App Cursor */}
      {cursorVisible && cursorPos && (
        <div
          className={`live-app-cursor ${cursorInteracting ? "interacting" : ""}`}
          style={{
            transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`,
          }}
          aria-hidden="true"
        >
          <MousePointer2 />
          <span>{cursorInteracting ? "CLICK" : "YOU"}</span>
        </div>
      )}

      {/* Top Header Toolbar */}
      <header className="toolbar">
        <Link to="/" className="brand" aria-label="Sandy home">
          <Mark />
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <Button variant="toolbar" asChild>
            <Link to="/" activeOptions={{ exact: true }}>
              <NavHomeIcon />
              HOME
            </Link>
          </Button>
          <Button variant="toolbar" className="active" asChild>
            <Link to="/about">
              <NavAboutIcon />
              ABOUT
            </Link>
          </Button>
          <Button variant="toolbar" asChild>
            <Link to="/case-study">
              <NavCaseStudyIcon />
              CASE STUDY
            </Link>
          </Button>
          <Button variant="toolbar" asChild>
            <a href="/#services">
              <NavServicesIcon />
              SERVICES
            </a>
          </Button>
          <Button variant="toolbar" asChild>
            <Link to="/journal">
              <NavJournalIcon />
              JOURNAL
            </Link>
          </Button>
          <Button variant="toolbar" asChild>
            <Link to="/playground">
              <NavPlaygroundIcon />
              PLAYGROUND
            </Link>
          </Button>
        </nav>
        <div className="nav-right">
          <div className="nav-contacts-group" aria-label="Quick contact links">
            <div className="nav-contact-item">
              <button
                type="button"
                className="nav-circle-btn"
                aria-label="Email sandeep723ms@hmail.com"
                onClick={() => {
                  navigator.clipboard?.writeText("sandeep723ms@hmail.com");
                  window.location.href = "mailto:sandeep723ms@hmail.com";
                }}
              >
                EM
              </button>
              <div className="nav-contact-bubble" role="tooltip">
                <span className="bubble-notch" aria-hidden="true" />
                <span>sandeep723ms@hmail.com</span>
              </div>
            </div>

            <div className="nav-contact-item">
              <button
                type="button"
                className="nav-circle-btn"
                aria-label="Phone +91 9121675082"
                onClick={() => {
                  navigator.clipboard?.writeText("+91 9121675082");
                  window.location.href = "tel:+919121675082";
                }}
              >
                PH
              </button>
              <div className="nav-contact-bubble" role="tooltip">
                <span className="bubble-notch" aria-hidden="true" />
                <span>+91 9121675082</span>
              </div>
            </div>

            <div className="nav-contact-item">
              <button
                type="button"
                className="nav-avatar-btn"
                aria-label="Download Resume"
                onClick={() => setDialog("resume")}
              >
                <img src="/sandy-avatar.jpg" alt="Profile avatar" width={34} height={34} />
              </button>
              <div className="nav-contact-bubble" role="tooltip">
                <span className="bubble-notch" aria-hidden="true" />
                <span>Download Resume</span>
              </div>
            </div>
          </div>

          <Button variant="toolbar" className="nav-contact" asChild>
            <Link to="/contact">
              <Heart />
              CONTACT
            </Link>
          </Button>
        </div>
      </header>

      {/* Top Ruler Track */}
      <div className="ruler" aria-hidden="true">
        <div
          className="ruler-track"
          ref={topRulerTrackRef}
          style={{ transform: "translate3d(0px, 0, 0)" }}
        >
          {Array.from({ length: 36 }, (_, i) => (
            <span key={i} className="ruler-step">
              {i * 100}
            </span>
          ))}
        </div>
      </div>

      {/* Left Vertical Sticky Dock (Bio, Story, Work) */}
      <aside className="about-sticky-dock" aria-label="Page section navigation">
        <button
          type="button"
          className={`about-sticky-btn ${activeSection === "bio" ? "active" : ""}`}
          onClick={() => scrollToSection("bio")}
          aria-label="Scroll to Bio"
        >
          <span className="dock-icon-wrapper">
            <Target size={16} strokeWidth={2.4} />
          </span>
          <span className="dock-label mono">BIO</span>
        </button>

        <button
          type="button"
          className={`about-sticky-btn ${activeSection === "story" ? "active" : ""}`}
          onClick={() => scrollToSection("story")}
          aria-label="Scroll to Story"
        >
          <span className="dock-icon-wrapper">
            <Layers size={16} strokeWidth={2.4} />
          </span>
          <span className="dock-label mono">STORY</span>
        </button>

        <button
          type="button"
          className={`about-sticky-btn ${activeSection === "work" ? "active" : ""}`}
          onClick={() => scrollToSection("work")}
          aria-label="Scroll to Work"
        >
          <span className="dock-icon-wrapper">
            <Briefcase size={16} strokeWidth={2.4} />
          </span>
          <span className="dock-label mono">WORK</span>
        </button>
      </aside>

      {/* Main Canvas Area */}
      <main className="canvas about-canvas-main">
        {/* Big Wordmark Title: ABOUT */}
        <div className="about-title-wrapper" aria-label="ABOUT">
          <h1 className="display about-page-title">ABOUT</h1>
        </div>

        {/* SECTION 1: MAIN BIO */}
        <section id="bio" className="about-section bio-section" aria-label="Main Bio">
          <div className="about-bounding-box bio-bounding-box">
            <Handles color="#F59E0B" />
            <div className="about-box-tag bio-tag mono">
              <span>MAIN BIO</span>
            </div>

            {/* Headline with inline icons */}
            <h2 className="bio-headline">
              I'm Sandeep (Sandy){" "}
              <span className="bio-inline-avatar" aria-label="Sandeep headshot">
                <img src="/sandy-avatar.jpg" alt="Sandeep (Sandy)" width={28} height={28} />
              </span>{" "}
              a product designer & engineer who gets excited{" "}
              <span className="bio-inline-icon sparkle-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#F59E0B">
                  <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
                </svg>
              </span>{" "}
              about making complicated things simple{" "}
              <span className="bio-inline-icon modular-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#E11D48">
                  <rect x="4" y="4" width="16" height="4" rx="1" />
                  <path d="M6 8L8 16H16L18 8H6Z" />
                  <rect x="5" y="16" width="14" height="4" rx="1" />
                </svg>
              </span>
              .
            </h2>

            {/* Paragraphs */}
            <div className="bio-body-copy">
              <p>
                I spend my days designing for healthcare platforms, booking systems, and other
                products where 'just figure it out' isn't an option. The people using these tools
                are busy, stressed, and have actual work to do. My job is to get out of their way.
              </p>
              <p>
                I've worked on teams of two and teams of twenty. I've had access to endless user
                research and I've had to make educated guesses with limited data. I've worked within
                strict component libraries and I've built design systems from scratch. What stays
                consistent is asking good questions, collaborating with people who know more than
                me, and shipping things that actually help.
              </p>
            </div>

            {/* Lower row: yellow sticky card + polaroid card */}
            <div className="bio-cards-row">
              <div className="bio-sticky-card yellow-card-1">
                <p>
                  Currently, I'm working across healthcare workflow platforms, enterprise SaaS, and
                  design systems. Before that, I spent time building salon management OS and booking
                  flows (and discovering that stylists and practitioners have very strong opinions
                  about scheduling interfaces, which I deeply respect).
                </p>
              </div>

              <div className="bio-polaroid-frame" aria-label="Sandy polaroid photo">
                <div className="polaroid-photo-inner">
                  <img src="/sandy-avatar.jpg" alt="Sandy" width={170} height={170} />
                </div>
                <span className="polaroid-caption-script">Sandy</span>
              </div>
            </div>

            {/* Bottom overlapping sticky note */}
            <div className="bio-sticky-card yellow-card-bottom">
              <p>
                When I'm not designing, you'll find me thinking about why some interfaces feel
                intuitive and others make you want to throw your laptop out a window. Usually with
                coffee.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: WHAT DIVE INTO MY WORK (STORY) */}
        <section
          id="story"
          className="about-section story-section"
          aria-label="Story and Principles"
        >
          <div className="about-bounding-box story-bounding-box">
            <Handles color="#E11D48" />
            <div className="about-box-tag story-tag mono">
              <span>WHAT DIVE INTO MY WORK</span>
            </div>

            <div className="story-cards-grid">
              {/* Card 1: Sky Blue */}
              <div className="story-card-wrapper left-card">
                <article className="story-card tone-sky">
                  <h3 className="story-card-title">Starting with why, not what</h3>
                  <p className="story-card-body">
                    Before jumping into wireframes, I want to understand what problem we're actually
                    solving. Sometimes the thing people ask for isn't the thing they need. My
                    favorite projects start with good questions and end with solutions that feel
                    obvious in hindsight.
                  </p>
                </article>
                <div className="story-annotation right-annotation" aria-hidden="true">
                  <ArrowSketchLeft />
                  <span className="annotation-handwritten">think first, draw later.</span>
                </div>
              </div>

              {/* Card 2: Warm Yellow */}
              <div className="story-card-wrapper right-card">
                <div className="story-annotation left-annotation" aria-hidden="true">
                  <span className="annotation-handwritten">no perfect world here!</span>
                  <ArrowSketchRight />
                </div>
                <article className="story-card tone-yellow">
                  <h3 className="story-card-title">Designing for real constraints</h3>
                  <p className="story-card-body">
                    Perfect conditions don't exist. Budgets are tight, timelines are aggressive,
                    legacy systems are messy, and sometimes you just can't talk to users directly.
                    I'm comfortable making smart decisions with imperfect information and finding
                    creative solutions within real limitations.
                  </p>
                </article>
              </div>

              {/* Card 3: Mint Green */}
              <div className="story-card-wrapper left-card">
                <article className="story-card tone-mint">
                  <h3 className="story-card-title">Collaboration over hero design</h3>
                  <p className="story-card-body">
                    The best work happens when designers, engineers, and product folks are actually
                    talking to each other—not throwing things over the wall. I genuinely enjoy the
                    back-and-forth of figuring out what's possible, what's practical, and what's
                    going to create the most value.
                  </p>
                </article>
                <div className="story-annotation right-annotation" aria-hidden="true">
                  <ArrowSketchLeft />
                  <span className="annotation-handwritten">we, not me.</span>
                </div>
              </div>

              {/* Card 4: Soft Pink */}
              <div className="story-card-wrapper right-card">
                <div className="story-annotation left-annotation" aria-hidden="true">
                  <span className="annotation-handwritten">details build trust.</span>
                  <ArrowSketchRight />
                </div>
                <article className="story-card tone-pink">
                  <h3 className="story-card-title">Making the invisible visible</h3>
                  <p className="story-card-body">
                    Some of the most impactful design work isn't flashy—it's the progress indicator
                    that keeps people oriented, the auto-save that prevents panic, the validation
                    message that actually helps instead of just saying 'error'. These details build
                    trust.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: WORK / TIMELINE */}
        <section
          id="work"
          className="about-section work-section"
          aria-label="Work Experience Timeline"
        >
          <div className="about-bounding-box work-bounding-box">
            <Handles color="#0EA5E9" />
            <div className="about-box-tag work-tag mono">
              <span>WHAT DIVE INTO MY WORK</span>
            </div>

            <div className="timeline-container">
              <div className="timeline-header">
                <h3 className="timeline-title">Timeline</h3>
                <div className="timeline-rule" />
              </div>

              <div className="timeline-items-list">
                {/* Item 1: Meridian Health */}
                <article className="timeline-item">
                  <div className="timeline-badge-icon icon-stripes" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M4 19L11 5" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
                      <path d="M9 19L16 5" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
                      <path
                        d="M14 19L21 5"
                        stroke="#F97316"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="timeline-content">
                    <h4 className="timeline-company-title">Meridian Health</h4>
                    <p className="timeline-description">
                      Designing across scheduling, case management, treatment planning, and clinical
                      documentation for mental health practices. The challenge is balancing what
                      clinicians need with what administrators need—often very different
                      things—while keeping everything HIPAA-compliant and actually usable.
                    </p>
                    <div className="timeline-date-pill pill-cyan mono">
                      <Zap size={11} className="pill-icon" />
                      <span>SEP 2025 - CURRENT</span>
                    </div>
                  </div>
                </article>

                {/* Item 2: StyleBook */}
                <article className="timeline-item">
                  <div className="timeline-badge-icon icon-diamond" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M4 14L14 4H20L10 14H4Z" fill="#3B82F6" />
                      <path d="M10 20L20 10H14L4 20H10Z" fill="#2563EB" />
                    </svg>
                  </div>
                  <div className="timeline-content">
                    <h4 className="timeline-company-title">StyleBook</h4>
                    <p className="timeline-description">
                      Redesigned everything from appointment booking to inventory management for a
                      salon management platform. Worked directly with salon owners and stylists to
                      understand their workflows, then rebuilt features to match how they actually
                      work instead of how we thought they worked.
                    </p>
                    <div className="timeline-date-pill pill-gray mono">
                      <span className="pill-grid-icon">⚏</span>
                      <span>MAR 2024 - AUG 2025</span>
                    </div>
                  </div>
                </article>

                {/* Item 3: Northlight Consulting */}
                <article className="timeline-item">
                  <div className="timeline-badge-icon icon-maze" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="#4B5563" strokeWidth="2" />
                      <path
                        d="M12 7V12L15 15"
                        stroke="#4B5563"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="timeline-content">
                    <h4 className="timeline-company-title">Northlight Consulting</h4>
                    <p className="timeline-description">
                      Led UX strategy and discovery for enterprise clients. Facilitated workshops
                      with stakeholders who had very different ideas about what they were building,
                      then helped everyone land on the same page. Also mentored junior designers,
                      which taught me how to articulate my process instead of just doing it.
                    </p>
                    <div className="timeline-date-pill pill-gray mono">
                      <span className="pill-grid-icon">⚏</span>
                      <span>FEB 2024 - DEC 2024</span>
                    </div>
                  </div>
                </article>

                {/* Item 4: Homestead */}
                <article className="timeline-item">
                  <div className="timeline-badge-icon icon-loops" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16"
                        stroke="#8B5CF6"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      />
                      <circle cx="9" cy="12" r="4" stroke="#A78BFA" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="timeline-content">
                    <h4 className="timeline-company-title">Homestead</h4>
                    <p className="timeline-description">
                      Joined when the product was technically functional but deeply confusing.
                      Talked to users who were struggling, mapped out where the interface was
                      failing them, and redesigned the core experience to actually make sense. Also
                      helped establish initial brand direction.
                    </p>
                    <div className="timeline-date-pill pill-gray mono">
                      <span className="pill-grid-icon">⚏</span>
                      <span>JAN 2022 - DEC 2023</span>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* CONTINUOUS: LET'S TALK SECTION */}
        <section className="talk-section" aria-label="Let's talk">
          <div className="sandy-organic" aria-hidden="true">
            <i className="lobe" />
            <i className="lobe" />
            <i className="lobe" />
            <i className="lobe" />
            <div className="organic-center" />
            <span className="organic-eyes">
              <i />
              <i />
            </span>
          </div>
          <div className="talk-copy">
            <h2 className="display">LET'S TALK</h2>
            <p>
              I'm most energized by projects where I can dig into complex problems, collaborate with
              smart people, and ship things that genuinely improve someone's day.
            </p>
          </div>
        </section>

        {/* CONTINUOUS: CONTACT SECTION (EXACT SAME SIZING & STRUCTURE AS HOMEPAGE) */}
        <section className="contact-section" id="contact" aria-label="Contact Sandy">
          <div className="comment-card">
            <div className="comment-header mono">
              <span>Comment</span>
              <span>···</span>
            </div>
            <div className="comment-body">
              <span className="avatar-s">S</span>
              <div>
                <strong>Sandy</strong>
                <p>
                  Open to product design roles, thoughtful projects, and conversations about making
                  things better.
                </p>
                <Button
                  variant="toolbar"
                  className="reaction"
                  aria-label="React to Sandy’s comment"
                  aria-pressed={reaction}
                  onClick={() => setReaction(!reaction)}
                >
                  <Zap size={12} />
                  {reaction ? 2 : 1}
                </Button>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="contact-banner-btn"
            onClick={() => navigate({ to: "/contact" })}
            aria-label="Contact Sandy"
          >
            <span className="banner-badge" aria-hidden="true">
              <span className="badge-diamond">
                <ChevronsRight className="badge-chevrons" />
              </span>
            </span>
            <span className="banner-label">CONTACT</span>
            <span className="banner-badge" aria-hidden="true">
              <span className="badge-diamond">
                <ChevronsRight className="badge-chevrons" />
              </span>
            </span>
          </button>
        </section>

        {/* FOOTER & BOTTOM SCALE (EXACT SAME AS HOMEPAGE) */}
        <footer className="footer" onPointerMove={(e) => handleScaleMotion(e.clientX)}>
          <p className="display footer-name">SANDY</p>
          <span className="mono">PRODUCT DESIGN × CODE × AI</span>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link to="/">HOME</Link>
            <Link to="/about">ABOUT</Link>
            <Link to="/case-study">CASE STUDY</Link>
            <Link to="/journal">JOURNAL</Link>
            <Link to="/playground">PLAYGROUND</Link>
            <Link to="/contact">CONTACT ↗</Link>
          </nav>
          <div
            className="footer-scale"
            aria-hidden="true"
            onPointerMove={(e) => handleScaleMotion(e.clientX)}
          >
            <div
              className="footer-scale-track"
              ref={footerScaleTrackRef}
              style={{ transform: "translate3d(0px, 0, 0)" }}
            >
              {Array.from({ length: 36 }, (_, i) => (
                <span key={i} className="footer-scale-segment">
                  <span className="scale-line scale-line-sub start" />
                  <span className="scale-line scale-line-major" />
                  <span className="scale-line scale-line-sub end" />
                  <span className="scale-value">{i * 100}</span>
                  <span className="scale-line scale-line-bottom" />
                </span>
              ))}
            </div>
          </div>
        </footer>
      </main>

      {/* Dialog for Resume & Playground */}
      <Dialog
        open={dialog !== null}
        onOpenChange={(open) => {
          if (!open) setDialog(null);
        }}
      >
        <DialogContent className="dialog-content">
          <DialogHeader>
            <DialogTitle>
              {dialog === "resume" ? "Sandy — Product Designer" : "A little room to play."}
            </DialogTitle>
            <DialogDescription className="dialog-description">
              {dialog === "resume"
                ? "PRODUCT DESIGN · FRONTEND · DESIGN SYSTEMS"
                : "DESIGN × CODE × A LITTLE CURIOSITY"}
            </DialogDescription>
          </DialogHeader>

          {dialog === "resume" ? (
            <div className="contact-pending">
              <p>
                <strong>Sandeep (Sandy)</strong> is a Product Designer & Frontend Developer based in
                Hyderabad, India. Focused on creating useful, human-centric software, design
                systems, and GenAI experiences.
              </p>
              <div
                className="resume-grid mono"
                style={{ margin: "20px 0", display: "grid", gap: "10px" }}
              >
                <div>
                  <strong>CORE EXPERTISE:</strong> Product Architecture, UI/UX, Design Systems,
                  React/TypeScript
                </div>
                <div>
                  <strong>WORK HISTORY:</strong> Healthcare SaaS, Fintech, Salon Platforms,
                  Enterprise
                </div>
                <div>
                  <strong>CONTACT:</strong> sandeep723ms@hmail.com · +91 9121675082
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
                <Button
                  variant="studio"
                  onClick={() => {
                    const printWin = window.open("", "_blank");
                    if (printWin) {
                      printWin.document.write(
                        "<h1>Sandeep (Sandy) — Product Designer</h1><p>Email: sandeep723ms@hmail.com | Phone: +91 9121675082</p><hr/><p>Product Designer & Frontend Engineer specializing in complex workflow interfaces, systems design, and GenAI experiences.</p>",
                      );
                      printWin.document.close();
                      printWin.print();
                    }
                  }}
                >
                  <ArrowUpRight />
                  DOWNLOAD / PRINT RESUME
                </Button>
                <Button variant="toolbar" onClick={() => navigate({ to: "/contact" })}>
                  <Heart />
                  LET'S TALK
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="playground-grid">
                <Button
                  variant="sticker"
                  className="tone-yellow"
                  onClick={() => setExperiment("✳")}
                  aria-label="Show flower shape"
                >
                  <Flower2 />
                </Button>
                <Button
                  variant="sticker"
                  className="tone-cyan"
                  onClick={() => setExperiment("</>")}
                  aria-label="Show code shape"
                >
                  <Code2 />
                </Button>
                <Button
                  variant="sticker"
                  className="tone-pink"
                  onClick={() => setExperiment("✧")}
                  aria-label="Show AI sparkle"
                >
                  <Sparkles />
                </Button>
              </div>
              <div className="playground-result" aria-live="polite">
                {experiment}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
