import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ChevronsRight,
  Code2,
  Flower2,
  Heart,
  MousePointer2,
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

import projectMeridianTrack from "@/assets/images/project_meridian_track_1791804688314.jpg";
import projectStylebookPortrait from "@/assets/images/project_stylebook_portrait_1791804704703.jpg";
import projectHomesteadCorgis from "@/assets/images/project_homestead_corgis.jpg";
import projectNorthlightDesert from "@/assets/images/project_northlight_desert_1791804719011.jpg";

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

interface CaseStudyItem {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  category: string;
  role: string;
  impact: string;
  summary: string;
  tags: string[];
}

const caseStudiesList: CaseStudyItem[] = [
  {
    id: "meridian-health",
    date: "MAR 19, 2026",
    title: "Meridian Health",
    description: "When therapists spend less time clicking, they have more time for patients.",
    image: projectMeridianTrack,
    category: "HEALTHCARE SAAS / CLINICAL EHR",
    role: "Lead Product Designer & Prototyper",
    impact: "Streamlined clinical session logging by 42%, reduced charting fatigue.",
    summary:
      "Designed and prototyped responsive charting workflows for mental health practitioners. Conducted clinician shadowing, mapped out high-friction micro-interactions, and established an ergonomic design system that cut administrative time in half.",
    tags: ["CLINICAL UX", "DESIGN SYSTEM", "REACT / TS", "ACCESSIBILITY"],
  },
  {
    id: "stylebook",
    date: "MAR 2, 2026",
    title: "StyleBook",
    description: "From 'I hate this system' to 'Can we show other salons?'",
    image: projectStylebookPortrait,
    category: "BOOKING PLATFORM / TABLET APP",
    role: "Founding Product Designer",
    impact: "Adopted by 85+ premier salons, reduced booking errors to zero.",
    summary:
      "Re-architected the legacy appointment calendar into an intuitive drag-and-drop workspace tailored for high-energy salon floors. Tested in real salon environments with zero downtime.",
    tags: ["TABLET UI", "DRAG & DROP", "APPOINTMENTS", "WORKFLOW"],
  },
  {
    id: "homestead",
    date: "JAN 2, 2025",
    title: "Homestead",
    description: "Helping first-time homebuyers actually understand what they're looking at.",
    image: projectHomesteadCorgis,
    category: "FINTECH / REAL ESTATE PLATFORM",
    role: "Senior Product Designer",
    impact: "3.2x increase in mortgage pre-qualification completion, rated 4.9/5 satisfaction.",
    summary:
      "Demystified complex lending jargon and hidden fees through visual step-by-step disclosures, interactive escrow projections, and friendly contextual guidance.",
    tags: ["FINTECH", "MORTGAGE TOOLS", "DATA VISUALIZATION", "USER RESEARCH"],
  },
  {
    id: "north-light",
    date: "MAR 19, 2026",
    title: "North Light",
    description: "Getting seven stakeholders to agree on what they're actually building.",
    image: projectNorthlightDesert,
    category: "ENTERPRISE / PRODUCT STRATEGY",
    role: "Design Lead & Facilitator",
    impact: "Unified 3 fragmented product lines into 1 cohesive design architecture.",
    summary:
      "Led collaborative cross-functional design sprints bringing engineering, legal, marketing, and executive leadership together to align on core product vision and design governance.",
    tags: ["ENTERPRISE", "STRATEGY", "DESIGN SYSTEMS", "GOVERNANCE"],
  },
];

export function CaseStudyPage() {
  const navigate = useNavigate();

  // Dialog state
  const [selectedStudy, setSelectedStudy] = useState<CaseStudyItem | null>(null);
  const [dialog, setDialog] = useState<"resume" | "playground" | null>(null);
  const [experiment, setExperiment] = useState("✳");
  const [reaction, setReaction] = useState(false);

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
        target?.closest(".case-study-card") ||
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
          <Button variant="toolbar" asChild>
            <Link to="/about">
              <NavAboutIcon />
              ABOUT
            </Link>
          </Button>
          <Button variant="toolbar" className="active" asChild>
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
        {/* GIANT DISPLAY TITLE: CASE STUDIES */}
        <section className="case-study-hero" aria-label="Case Studies Heading">
          <h1 className="case-study-main-title">CASE STUDIES</h1>
        </section>

        {/* 4 CASE STUDY CARDS IN 2X2 GRID */}
        <section className="case-study-grid-section" aria-label="Case Studies Gallery">
          <div className="case-study-grid">
            {caseStudiesList.map((study) => (
              <article
                key={study.id}
                className="case-study-card"
                onClick={() => setSelectedStudy(study)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedStudy(study);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View case study: ${study.title}`}
              >
                {/* Folder-tab styled container */}
                <div className="case-study-folder-box">
                  {/* Tab header on left with black dot and date */}
                  <div className="case-study-tab-badge">
                    <span className="tab-bullet" aria-hidden="true" />
                    <span className="tab-date mono">{study.date}</span>
                  </div>

                  {/* Framed image box with white border */}
                  <div className="case-study-image-frame">
                    <img src={study.image} alt={`${study.title} preview`} loading="lazy" />
                  </div>
                </div>

                {/* Title & Subtitle centered beneath */}
                <div className="case-study-card-meta">
                  <h2 className="case-study-card-title">{study.title}</h2>
                  <p className="case-study-card-desc">{study.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CONTINUOUS: LET'S TALK SECTION (EXACT SAME AS HOMEPAGE) */}
        <section className="talk-section" aria-label="Let's Talk Section">
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

      {/* Case Study Detail Modal */}
      <Dialog
        open={selectedStudy !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedStudy(null);
        }}
      >
        <DialogContent className="dialog-content max-w-2xl">
          {selectedStudy && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary" />
                  <span className="font-mono text-xs tracking-wider uppercase text-muted-foreground">
                    {selectedStudy.date} · {selectedStudy.category}
                  </span>
                </div>
                <DialogTitle className="text-2xl font-bold font-sans">
                  {selectedStudy.title}
                </DialogTitle>
                <DialogDescription className="text-base text-foreground/80 mt-1">
                  {selectedStudy.description}
                </DialogDescription>
              </DialogHeader>

              <div className="my-4 overflow-hidden rounded-md border border-border">
                <img
                  src={selectedStudy.image}
                  alt={selectedStudy.title}
                  className="w-full aspect-video object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 p-3 bg-muted/60 rounded border border-border/60 text-xs font-mono">
                  <div>
                    <span className="text-muted-foreground block">ROLE</span>
                    <strong className="text-foreground">{selectedStudy.role}</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">KEY OUTCOME</span>
                    <strong className="text-foreground">{selectedStudy.impact}</strong>
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                    About the Project
                  </h4>
                  <p className="text-sm leading-relaxed text-foreground/90">
                    {selectedStudy.summary}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-xs text-muted-foreground mb-2 uppercase tracking-wide">
                    Areas of Focus
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudy.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[11px] font-mono bg-background border border-foreground/20 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <Button
                    variant="studio"
                    onClick={() => {
                      setSelectedStudy(null);
                      navigate({ to: "/contact" });
                    }}
                  >
                    DISCUSS THIS PROJECT
                    <ArrowUpRight size={14} />
                  </Button>
                  <Button variant="toolbar" onClick={() => setSelectedStudy(null)}>
                    CLOSE
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

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
