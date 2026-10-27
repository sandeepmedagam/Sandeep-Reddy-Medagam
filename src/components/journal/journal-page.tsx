import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  ChevronsRight,
  Clock,
  Code2,
  Feather,
  Flower2,
  Heart,
  Leaf,
  Lightbulb,
  MousePointer2,
  PenTool,
  Sparkles,
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

import journalIdeasSilence from "@/assets/images/journal_ideas_silence.jpg";
import journalGeometryTrust from "@/assets/images/journal_geometry_trust.jpg";
import journalEverydayBeauty from "@/assets/images/journal_everyday_beauty.jpg";
import journalPowerFocus from "@/assets/images/journal_power_focus.jpg";
import journalGreenerWorkspace from "@/assets/images/journal_greener_workspace.jpg";
import journalCreativeDesk from "@/assets/images/journal_creative_desk.jpg";
import journalMaterialsMemory from "@/assets/images/journal_materials_memory.jpg";
import journalBeyondScreen from "@/assets/images/journal_beyond_screen.jpg";

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

export interface JournalArticle {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  badgeType: "emerald" | "amber" | "orange" | "pink";
  icon: "lightbulb" | "pen" | "leaf" | "flower";
  image: string;
  summary: string;
  tags: string[];
  content: string[];
}

const journalArticlesList: JournalArticle[] = [
  {
    id: "ideas-need-silence",
    title: "Ideas Need Silence",
    date: "Jan 14, 2026",
    readTime: "4 min read",
    category: "CREATIVE PROCESS",
    badgeType: "emerald",
    icon: "lightbulb",
    image: journalIdeasSilence,
    summary:
      "Why real product clarity and durable architectural concepts emerge only when digital notifications are silenced and the studio is still.",
    tags: ["DEEP WORK", "PRODUCT DESIGN", "FOCUS", "ROUTINES"],
    content: [
      "In a culture obsessed with synchronous availability, uninterrupted silence has become the rarest studio material. Real insight rarely strikes between back-to-back design reviews or ping notifications.",
      "When sketching early workflows for Meridian Health, the breakthrough didn't arrive in a high-tempo design sprint. It happened at 6 AM over black coffee, with mechanical pencil and drafting paper, observing how morning daylight illuminated blank margins.",
      "Protecting unstructured silence isn't procrastination—it is the essential incubation period where disparate signals, user interviews, and technical constraints settle into cohesive structure.",
      "The best interfaces are conceived in quiet rooms and tested against noisy realities.",
    ],
  },
  {
    id: "geometry-builds-trust",
    title: "Geometry Builds Trust",
    date: "Mar 9, 2026",
    readTime: "5 min read",
    category: "DESIGN SYSTEMS",
    badgeType: "amber",
    icon: "pen",
    image: journalGeometryTrust,
    summary:
      "How proportional spatial grids, 8pt rhythm, and rigorous typographic baselines communicate stability to enterprise teams.",
    tags: ["TYPOGRAPHY", "DESIGN SYSTEMS", "ENTERPRISE UX", "GRID SYSTEMS"],
    content: [
      "People feel architectural balance long before they consciously analyze it. The human eye instinctively identifies uneven padding, discordant line-heights, and unanchored layout elements.",
      "In enterprise environments where user decisions trigger clinical charting or high-value financial movements, visual ambiguity breeds anxiety. Strict geometric discipline creates an unconscious sense of safety and operational mastery.",
      "By establishing a non-negotiable 8-point spatial continuum and matching typographic baselines to metric rulers, we remove arbitrary decision-making from the product surface.",
      "Clean geometry is the silent foundation upon which intuitive interactions rest.",
    ],
  },
  {
    id: "everyday-beauty",
    title: "Everyday Beauty",
    date: "Apr 22, 2026",
    readTime: "3 min read",
    category: "TACTILE CRAFT",
    badgeType: "orange",
    icon: "pen",
    image: journalEverydayBeauty,
    summary:
      "Transforming utilitarian internal tools and everyday workspaces into objects of craft through deliberate micro-interactions.",
    tags: ["CRAFT", "MICRO-INTERACTIONS", "INTERNAL TOOLS", "DELIGHT"],
    content: [
      "Why should consumer applications monopolize visual delight? Internal business tools and operational dashboards are inhabited for eight continuous hours every weekday by skilled human beings.",
      "Injecting everyday beauty—such as realistic inertia coasting on a ruler, responsive cursor tracking, and warm paper-toned canvases—elevates routine utility into an enjoyable craft experience.",
      "Beauty in software does not mean decorative bloat; it means precision, tactile feedback, and care invested in the micro-moments users encounter hundreds of times a day.",
    ],
  },
  {
    id: "power-of-focus",
    title: "The Power of Focus",
    date: "Jun 5, 2026",
    readTime: "4 min read",
    category: "COGNITIVE ERGONOMICS",
    badgeType: "pink",
    icon: "flower",
    image: journalPowerFocus,
    summary:
      "Eliminating cognitive friction and visual noise so practitioners can maintain unfragmented flow states.",
    tags: ["FLOW STATE", "ACCESSIBILITY", "PRODUCTIVITY", "ERGONOMICS"],
    content: [
      "Every auxiliary badge, pulsing banner, and unrequested tooltip taxes finite working memory. Designing for true focus requires ruthless editing—stripping away visual vanity so core intent shines through.",
      "When redesigning StyleBook's salon calendar, our greatest achievement was not what we added, but the forty-seven obsolete icons and redundant dropdowns we removed. Stylists immediately regained the mental presence to connect with the client in their chair.",
      "Software serves people best when it steps back and lets their judgment take center stage.",
    ],
  },
  {
    id: "greener-workspace",
    title: "A Greener Workspace",
    date: "Aug 17, 2026",
    readTime: "3 min read",
    category: "STUDIO CULTURE",
    badgeType: "pink",
    icon: "leaf",
    image: journalGreenerWorkspace,
    summary:
      "The biophilic impact of living plants, natural light, and organic textures on sustained creative stamina.",
    tags: ["STUDIO", "WELLNESS", "BIOPHILIC DESIGN", "ENVIRONMENT"],
    content: [
      "Surrounding the design workstation with fiddle-leaf figs, potted philodendrons, and natural cross-ventilation is far more than an aesthetic trend. Environmental psychology confirms that natural textures dramatically lower mental fatigue.",
      "Taking three minutes away from Figma to water a plant or observe natural light shifts resets visual perception significantly better than scrolling through social timelines.",
      "Our work environment mirrors our output: bring life, air, and organic rhythm into the workspace, and the software will feel natural rather than robotic.",
    ],
  },
  {
    id: "creative-desk",
    title: "The Creative Desk",
    date: "Sep 2, 2026",
    readTime: "5 min read",
    category: "TOOLS & SETUP",
    badgeType: "emerald",
    icon: "lightbulb",
    image: journalCreativeDesk,
    summary:
      "An anatomy of the physical tools, tactile artifacts, and rapid code sandboxes that power modern product design.",
    tags: ["STUDIO SETUP", "HARDWARE", "PROTOTYPING", "DEV WORKFLOW"],
    content: [
      "A designer's desk is part laboratory, part library, and part construction workshop. It hosts mechanical calipers, printed design proofs, and vintage type specimens side-by-side with high-refresh monitors and hot-reloading Vite dev servers.",
      "Writing production React code directly at the design desk closes the disconnect between static canvas mockups and real-world browser physics.",
      "When designers understand the DOM and engineers participate in typographic tuning, products gain an undeniable sense of cohesion.",
    ],
  },
  {
    id: "materials-and-memory",
    title: "Materials and Memory",
    date: "Jul 28, 2026",
    readTime: "4 min read",
    category: "ANALOG LESSONS",
    badgeType: "amber",
    icon: "pen",
    image: journalMaterialsMemory,
    summary:
      "What traditional Japanese timber joinery and museum exhibition architecture teach us about digital longevity.",
    tags: ["ARCHITECTURE", "LONGEVITY", "WOODCRAFT", "TIMELESS DESIGN"],
    content: [
      "Observing wooden pavilion architecture reveals structural joinery engineered to endure centuries through interlocking tension rather than temporary adhesives.",
      "In digital product design, we too often rely on fleeting framework trends and disposable design fads. What would it mean to build digital systems with genuine architectural longevity?",
      "By studying tactile analog materials—natural timber, heavy cotton stock, and brushed brass—we discover timeless principles of hierarchy, proportion, and dignity that translate directly into digital experiences.",
    ],
  },
  {
    id: "beyond-the-screen",
    title: "Beyond the Screen",
    date: "May 19, 2026",
    readTime: "4 min read",
    category: "ANALOG CULTURE",
    badgeType: "amber",
    icon: "pen",
    image: journalBeyondScreen,
    summary:
      "Analog listening rituals, vinyl grooves, and physical objects as grounding antidotes to ephemeral pixel fatigue.",
    tags: ["ANALOG", "MUSIC", "TACTILE SENSES", "CULTURE"],
    content: [
      "Placing a stylus into the microgrooves of a vinyl record enforces an intentional listening discipline. You cannot recklessly skip tracks; you commit to experiencing an artist's vision in chronological sequence.",
      "Engaging with physical books, mechanical watches, and vinyl records reminds us that humans are sensory, physical beings.",
      "The most compelling digital software is crafted by people who maintain vibrant, hands-on lives outside the screen.",
    ],
  },
];

function RenderBadgeIcon({ icon }: { icon: JournalArticle["icon"] }) {
  switch (icon) {
    case "lightbulb":
      return <Lightbulb aria-hidden="true" />;
    case "pen":
      return <PenTool aria-hidden="true" />;
    case "leaf":
      return <Leaf aria-hidden="true" />;
    case "flower":
      return <Flower2 aria-hidden="true" />;
    default:
      return <Feather aria-hidden="true" />;
  }
}

export function JournalPage() {
  const navigate = useNavigate();

  // Active reading modal article
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  // Playground & Resume modal states
  const [dialog, setDialog] = useState<"resume" | "playground" | null>(null);
  const [experiment, setExperiment] = useState("✳");
  const [reaction, setReaction] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  // Live cursor state
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorInteracting, setCursorInteracting] = useState(false);

  // Smooth Ruler Inertia Tracking (Top & Footer)
  const topRulerTrackRef = useRef<HTMLDivElement>(null);
  const footerScaleTrackRef = useRef<HTMLDivElement>(null);
  const topCurrentOffsetRef = useRef(0);
  const topVelocityRef = useRef(0);
  const footerCurrentOffsetRef = useRef(0);
  const footerVelocityRef = useRef(0);
  const lastPointerXRef = useRef<number | null>(null);
  const lastPointerTimeRef = useRef(0);

  const handleScaleMotion = (clientX: number) => {
    const now = performance.now();
    if (lastPointerXRef.current !== null) {
      const dt = now - lastPointerTimeRef.current;
      if (dt >= 4 && dt < 160) {
        const dx = clientX - lastPointerXRef.current;
        topCurrentOffsetRef.current += dx * 0.16;
        footerCurrentOffsetRef.current += dx * 0.16;

        const instantV = Math.max(-8, Math.min(8, (dx / dt) * 2.8));
        topVelocityRef.current = topVelocityRef.current * 0.78 + instantV * 0.22;
        footerVelocityRef.current = footerVelocityRef.current * 0.78 + instantV * 0.22;
      }
    }
    lastPointerXRef.current = clientX;
    lastPointerTimeRef.current = now;
  };

  useEffect(() => {
    let animId: number;
    const DAMPING = 0.958;
    const MIN_OFFSET = -2800;
    const MAX_OFFSET = 400;

    const tick = () => {
      const now = performance.now();
      if (now - lastPointerTimeRef.current > 75) {
        lastPointerXRef.current = null;
      }

      if (Math.abs(topVelocityRef.current) > 0.01) {
        topCurrentOffsetRef.current += topVelocityRef.current;
        topVelocityRef.current *= DAMPING;
      } else {
        topVelocityRef.current = 0;
      }

      if (topCurrentOffsetRef.current < MIN_OFFSET) {
        const over = MIN_OFFSET - topCurrentOffsetRef.current;
        topVelocityRef.current += over * 0.05;
        topVelocityRef.current *= 0.8;
      } else if (topCurrentOffsetRef.current > MAX_OFFSET) {
        const over = MAX_OFFSET - topCurrentOffsetRef.current;
        topVelocityRef.current += over * 0.05;
        topVelocityRef.current *= 0.8;
      }

      if (topRulerTrackRef.current) {
        topRulerTrackRef.current.style.transform = `translate3d(${topCurrentOffsetRef.current.toFixed(2)}px, 0, 0)`;
      }

      if (Math.abs(footerVelocityRef.current) > 0.01) {
        footerCurrentOffsetRef.current += footerVelocityRef.current;
        footerVelocityRef.current *= DAMPING;
      } else {
        footerVelocityRef.current = 0;
      }

      if (footerCurrentOffsetRef.current < MIN_OFFSET) {
        const over = MIN_OFFSET - footerCurrentOffsetRef.current;
        footerVelocityRef.current += over * 0.05;
        footerVelocityRef.current *= 0.8;
      } else if (footerCurrentOffsetRef.current > MAX_OFFSET) {
        const over = MAX_OFFSET - footerCurrentOffsetRef.current;
        footerVelocityRef.current += over * 0.05;
        footerVelocityRef.current *= 0.8;
      }

      if (footerScaleTrackRef.current) {
        footerScaleTrackRef.current.style.transform = `translate3d(${footerCurrentOffsetRef.current.toFixed(2)}px, 0, 0)`;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target?.closest("button") ||
        target?.closest("a") ||
        target?.closest(".journal-card") ||
        target?.closest(".contact-banner-btn")
      ) {
        setCursorInteracting(true);
      } else {
        setCursorInteracting(false);
      }

      handleScaleMotion(e.clientX);
    };

    const handleMouseLeave = () => {
      setCursorVisible(false);
      lastPointerXRef.current = null;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="case-study-page-root">
      {/* Live App Custom Cursor */}
      {cursorVisible && cursorPos && (
        <div
          className={`live-app-cursor ${cursorInteracting ? "interacting" : ""}`}
          style={{
            transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`,
          }}
          aria-hidden="true"
        >
          <MousePointer2 />
          <span>{cursorInteracting ? "READ" : "YOU"}</span>
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
          <Button variant="toolbar" asChild>
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
          <Button variant="toolbar" className="active" asChild>
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
                <img src="/sandy-avatar.jpg" alt="Sandy profile avatar" width={34} height={34} />
              </button>
              <div className="nav-contact-bubble" role="tooltip">
                <span className="bubble-notch" aria-hidden="true" />
                <span>Sandy — Resume</span>
              </div>
            </div>
          </div>

          <Button
            variant="studio"
            className="contact-nav-btn"
            onClick={() => navigate({ to: "/contact" })}
          >
            <Heart />
            CONTACT
          </Button>
        </div>
      </header>

      {/* Top Scale Metric Ruler (matching reference screenshot) */}
      <div
        className="top-scale"
        aria-hidden="true"
        onPointerMove={(e) => handleScaleMotion(e.clientX)}
      >
        <div
          className="top-scale-track"
          ref={topRulerTrackRef}
          style={{ transform: "translate3d(0px, 0, 0)" }}
        >
          {Array.from({ length: 48 }, (_, i) => (
            <span key={i} className="top-scale-segment">
              <span className="scale-line scale-line-sub start" />
              <span className="scale-line scale-line-major" />
              <span className="scale-line scale-line-sub end" />
              <span className="scale-value">{(i + 1) * 100}</span>
              <span className="scale-line scale-line-bottom" />
            </span>
          ))}
        </div>
      </div>

      <main className="canvas">
        {/* GIANT DISPLAY TITLE: JOURNAL */}
        <section className="case-study-hero" aria-label="Journal Heading">
          <h1 className="case-study-main-title">JOURNAL</h1>
        </section>

        {/* 8 JOURNAL CARDS IN 3-COLUMN GRID (Matching attached design layout) */}
        <section className="journal-grid-section" aria-label="Journal Essays Gallery">
          {/* Subtle Category Chips for instant filtering */}
          <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
            {(["ALL", "PROCESS", "SYSTEMS", "CRAFT", "WELLNESS"] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-xs px-3.5 py-1.5 uppercase tracking-wider transition-all border ${
                  activeCategory === cat
                    ? "bg-[#28bcf6] text-black border-black font-bold shadow-[2px_2px_0px_0px_#000]"
                    : "bg-white text-neutral-600 border-neutral-300 hover:border-black hover:text-black"
                }`}
              >
                {cat === "ALL" ? "ALL (8)" : cat}
              </button>
            ))}
          </div>

          <div className="journal-grid">
            {journalArticlesList
              .filter((article) => {
                if (activeCategory === "ALL") return true;
                if (activeCategory === "PROCESS") {
                  return (
                    article.category.includes("PROCESS") || article.id === "ideas-need-silence"
                  );
                }
                if (activeCategory === "SYSTEMS") {
                  return (
                    article.category.includes("SYSTEMS") || article.id === "geometry-builds-trust"
                  );
                }
                if (activeCategory === "CRAFT") {
                  return (
                    article.category.includes("CRAFT") ||
                    article.id === "creative-desk" ||
                    article.id === "beyond-the-screen"
                  );
                }
                if (activeCategory === "WELLNESS") {
                  return (
                    article.category.includes("ERGONOMICS") ||
                    article.category.includes("CULTURE") ||
                    article.category.includes("LESSONS")
                  );
                }
                return true;
              })
              .map((article) => (
                <article
                  key={article.id}
                  className="journal-card"
                  onClick={() => setSelectedArticle(article)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedArticle(article);
                    }
                  }}
                  aria-label={`Read ${article.title}`}
                >
                  <div className="journal-image-frame">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="journal-card-image"
                    />
                  </div>

                  <div className="journal-card-footer">
                    <div
                      className={`journal-badge-icon badge-${article.badgeType}`}
                      aria-hidden="true"
                    >
                      <RenderBadgeIcon icon={article.icon} />
                    </div>
                    <div className="journal-card-info">
                      <h2 className="journal-card-title">{article.title}</h2>
                      <span className="journal-card-date">{article.date}</span>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </section>

        {/* CONTINUOUS: LET'S TALK SECTION (STANDARDIZED WITH HOMEPAGE, ABOUT, CASE STUDY) */}
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
              <span className="avatar-s">
                <img
                  src="/sandy-avatar.jpg"
                  alt="Sandy"
                  className="w-full h-full object-cover rounded-full"
                />
              </span>
              <div>
                <strong>Sandy</strong>
                <p>
                  Open to contract work, full-time roles, and interesting conversations about hard
                  design problems.
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
            <Link to="/" activeOptions={{ exact: true }}>
              HOME
            </Link>
            <Link to="/about">ABOUT</Link>
            <Link to="/case-study">CASE STUDY</Link>
            <a href="/#services">SERVICES</a>
            <Link to="/journal" className="font-bold underline underline-offset-4">
              JOURNAL
            </Link>
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
              {Array.from({ length: 48 }, (_, i) => (
                <span key={i} className="footer-scale-segment">
                  <span className="scale-line scale-line-sub start" />
                  <span className="scale-line scale-line-major" />
                  <span className="scale-line scale-line-sub end" />
                  <span className="scale-value">{(i + 1) * 100}</span>
                  <span className="scale-line scale-line-bottom" />
                </span>
              ))}
            </div>
          </div>
        </footer>
      </main>

      {/* Journal Article Reading Modal */}
      <Dialog
        open={selectedArticle !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedArticle(null);
        }}
      >
        <DialogContent className="dialog-content max-w-2xl">
          {selectedArticle && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-sm badge-${selectedArticle.badgeType}`}
                  />
                  <span className="font-mono text-xs tracking-wider uppercase text-muted-foreground">
                    {selectedArticle.category}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="font-mono text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3 inline" />
                    {selectedArticle.date}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="font-mono text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3 inline" />
                    {selectedArticle.readTime}
                  </span>
                </div>
                <DialogTitle className="text-2xl font-bold font-sans">
                  {selectedArticle.title}
                </DialogTitle>
                <DialogDescription className="text-sm font-sans text-muted-foreground mt-1">
                  {selectedArticle.summary}
                </DialogDescription>
              </DialogHeader>

              <div className="dialog-study-body space-y-4 pt-2">
                <div className="rounded-md overflow-hidden border border-border shadow-sm max-h-[300px]">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-3 pt-2 text-foreground/90 font-sans leading-relaxed text-sm">
                  {selectedArticle.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="border-t border-border pt-4 mt-4">
                  <span className="font-mono text-xs font-bold uppercase text-muted-foreground tracking-wider block mb-2">
                    Key Themes
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedArticle.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] px-2.5 py-1 bg-secondary text-secondary-foreground rounded border border-border"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-secondary/50 rounded border border-border/60 flex items-center justify-between text-xs font-mono">
                  <span>Written by Sandy • Product Designer & Developer</span>
                  <Button
                    variant="studio"
                    size="sm"
                    onClick={() => {
                      setSelectedArticle(null);
                      navigate({ to: "/contact" });
                    }}
                  >
                    DISCUSS ESSAY
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Resume & Playground Dialogs */}
      <Dialog
        open={dialog !== null}
        onOpenChange={(open) => {
          if (!open) setDialog(null);
        }}
      >
        <DialogContent className="dialog-content">
          <DialogHeader>
            <DialogTitle>
              {dialog === "playground"
                ? "Sandy's Interactive Playground"
                : "Sandeep (Sandy) — Resume"}
            </DialogTitle>
            <DialogDescription className="dialog-description">
              {dialog === "playground"
                ? "Micro-interactions, physics dampeners & fluid scale experiments."
                : "Lead Product Designer & Prototyper based in Hyderabad, India."}
            </DialogDescription>
          </DialogHeader>

          {dialog === "playground" ? (
            <div className="playground-dialog-inner space-y-4">
              <p className="text-sm text-muted-foreground font-sans">
                Explore reactive motion dynamics and live component state.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="sticker"
                  className="tone-yellow"
                  onClick={() => setExperiment("✳")}
                  aria-label="Sparkle experiment"
                >
                  <Sparkles />
                </Button>
                <Button
                  variant="sticker"
                  className="tone-mint"
                  onClick={() => setExperiment("🌿")}
                  aria-label="Leaf experiment"
                >
                  <Flower2 />
                </Button>
                <Button
                  variant="sticker"
                  className="tone-cyan"
                  onClick={() => setExperiment("</>")}
                  aria-label="Code experiment"
                >
                  <Code2 />
                </Button>
              </div>
              <div className="playground-result p-6 border rounded font-mono text-center text-3xl">
                {experiment}
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-sm font-sans">
              <div className="p-3 bg-secondary rounded border">
                <strong>Sandeep (Sandy)</strong>
                <p className="text-muted-foreground text-xs mt-1">
                  Product Designer & Frontend Engineer with 6+ years shipping healthcare SaaS,
                  fintech, and design systems.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="studio"
                  className="flex-1"
                  onClick={() => {
                    navigator.clipboard?.writeText("sandeep723ms@hmail.com");
                    window.location.href =
                      "mailto:sandeep723ms@hmail.com?subject=Resume%20Request%20for%20Sandy";
                  }}
                >
                  REQUEST FULL CV
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
                <Button variant="outline" onClick={() => setDialog(null)}>
                  CLOSE
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
