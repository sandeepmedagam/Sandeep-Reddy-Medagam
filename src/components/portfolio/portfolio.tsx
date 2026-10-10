import { useEffect, useState, type CSSProperties, type PointerEvent } from "react";
import {
  ArrowUpRight,
  ChevronRight,
  ChevronsRight,
  Code as Code2,
  Flower2,
  Heart,
  Hop as Home,
  Layers,
  MapPin,
  Menu,
  MousePointer2,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import mechanic from "@/assets/instant-mechanic.jpg";
import check from "@/assets/true-check.jpg";
import wellness from "@/assets/sa-wellness.jpg";
import solar from "@/assets/solar-sea.jpg";

const projects = [
  {
    name: "Instant Mechanic",
    category: "MOBILITY / PRODUCT DESIGN",
    description: "Making vehicle service feel simpler.",
    tags: ["PRODUCT DESIGN", "UX / UI", "PROTOTYPING"],
    tone: "yellow",
    image: mechanic,
  },
  {
    name: "True Check",
    category: "FINTECH / USER EXPERIENCE",
    description: "Fintech. Trust, clarity, and thoughtful interactions.",
    tags: ["PRODUCT DESIGN", "UX / UI", "FINTECH"],
    tone: "cyan",
    image: check,
  },
  {
    name: "SA Wellness",
    category: "HEALTH / DIGITAL EXPERIENCE",
    description: "Health, brand, and digital experiences.",
    tags: ["BRAND", "WEB DESIGN", "UI / UX"],
    tone: "olive",
    image: wellness,
  },
  {
    name: "Solar Sea",
    category: "IoT / DATA VISUALIZATION",
    description: "Connected systems. Clearer perspectives.",
    tags: ["INTERACTION", "DATA VISUALIZATION", "IoT"],
    tone: "blue",
    image: solar,
  },
  {
    name: "SuccessWikis",
    category: "SAAS / PRODUCT / WEB",
    description: "Product thinking for knowledge and growth.",
    tags: ["SAAS", "PRODUCT DESIGN", "WEB"],
    tone: "yellow",
    image: undefined,
  },
  {
    name: "Cricket Scoring Platform",
    category: "SPORTS / PRODUCT / DATA",
    description: "Sport, scores, and every little detail.",
    tags: ["PRODUCT DESIGN", "DATA", "UI / UX"],
    tone: "mint",
    image: undefined,
  },
];
const nav = [
  { id: "home", label: "HOME", icon: Home },
  { id: "about", label: "ABOUT", icon: Flower2 },
  { id: "work", label: "WORK", icon: Layers },
];
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
function Handles() {
  return (
    <>
      <i className="handle" />
      <i className="handle" />
      <i className="handle" />
      <i className="handle" />
    </>
  );
}
function ContactButton({ onClick, label = "CONTACT ME" }: { onClick: () => void; label?: string }) {
  return (
    <Button variant="studio" onClick={onClick}>
      <span className="arrow-tile">
        <ChevronsRight />
      </span>
      {label}
    </Button>
  );
}
function Concept({ kind }: { kind: string }) {
  return (
    <div className="concept-ui">
      <div className="concept-bar">
        <strong>{kind === "SuccessWikis" ? "✳ SuccessWikis" : "◉ CricScore"}</strong>
        <span className="mono">OVERVIEW ↗</span>
      </div>
      {kind === "SuccessWikis" ? (
        <>
          <div className="wiki-title">
            Good ideas.
            <br />
            Shared knowledge.
          </div>
          <div className="wiki-search">⌕ Search your workspace</div>
          <div className="wiki-categories">
            <span>PRODUCT</span>
            <span>DESIGN</span>
            <span>ENGINEERING</span>
          </div>
        </>
      ) : (
        <>
          <div className="score-title">
            MATCH CENTER <span className="mono">● LIVE</span>
          </div>
          <div className="score-numbers">
            <div>
              <small>INDIA</small>
              <strong>186/4</strong>
            </div>
            <span className="mono">VS</span>
            <div>
              <small>AUSTRALIA</small>
              <strong>174/8</strong>
            </div>
          </div>
          <div className="score-divider" />
          <p className="mono">THIS OVER · 18.4</p>
          <div className="overs">
            <i>1</i>
            <i>4</i>
            <i>6</i>
            <i>0</i>
            <i>2</i>
            <i>W</i>
          </div>
        </>
      )}
    </div>
  );
}

interface HeroPinAvatarProps {
  className: string;
  message: string;
}

function HeroPinAvatar({ className, message }: HeroPinAvatarProps) {
  const [hovered, setHovered] = useState(false);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let timeoutId: number | null = null;
    let intervalId: number | null = null;

    if (hovered) {
      setTypedText("");
      // Medium speed: pill expands while typing effect runs smoothly
      timeoutId = window.setTimeout(() => {
        let i = 0;
        intervalId = window.setInterval(() => {
          if (i < message.length) {
            i++;
            setTypedText(message.slice(0, i));
          } else {
            if (intervalId) clearInterval(intervalId);
          }
        }, 38);
      }, 90);
    } else {
      setTypedText("");
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [hovered, message]);

  return (
    <div
      className={`hero-pin-avatar ${className} ${hovered ? "expanded" : ""}`}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      role="region"
      aria-label={message}
    >
      <div className="pin-avatar-inner">
        <img src="/sandy-avatar.jpg" alt="Sandy profile" width={38} height={38} />
      </div>
      <span className="pin-avatar-text" aria-hidden="true">
        {typedText}
      </span>
    </div>
  );
}

export function Portfolio() {
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState("home");
  const [menu, setMenu] = useState(false);
  const [clock, setClock] = useState("HYDERABAD / IN");
  const [dialog, setDialog] = useState<string | null>(null);
  const [reaction, setReaction] = useState(false);
  const [experiment, setExperiment] = useState("✳");
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorInteracting, setCursorInteracting] = useState(false);

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
          'button, a, input, textarea, [role="button"], .project, .sticker',
        );
        setCursorInteracting(isClickable);
      }
    };

    const handleMouseLeave = () => {
      setCursorVisible(false);
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  useEffect(() => {
    const update = () => {
      setCompact(window.scrollY > 120);
      const ids = ["home", "about", "work", "contact"];
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 180) current = id;
      }
      setActive(current);
    };
    const time = () =>
      setClock(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date()),
      );
    update();
    time();
    window.addEventListener("scroll", update, { passive: true });
    const interval = window.setInterval(time, 1000);
    return () => {
      window.removeEventListener("scroll", update);
      window.clearInterval(interval);
    };
  }, []);
  const selected = projects.find((p) => p.name === dialog);
  const contact = () => setDialog("contact");
  const handleHeroPointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    const scale = (1 + Math.min(Math.hypot(x, y), 1) * 0.035).toFixed(3);
    event.currentTarget.style.setProperty("--hero-scale-x", x.toFixed(3));
    event.currentTarget.style.setProperty("--hero-scale-y", y.toFixed(3));
    event.currentTarget.style.setProperty("--hero-scale", scale);
  };
  const resetHeroPointer = ({ currentTarget }: PointerEvent<HTMLElement>) => {
    currentTarget.style.setProperty("--hero-scale-x", "0");
    currentTarget.style.setProperty("--hero-scale-y", "0");
    currentTarget.style.setProperty("--hero-scale", "1");
  };
  return (
    <>
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
      <header className={`toolbar ${compact ? "compact" : ""}`}>
        <a className="brand" href="#home" aria-label="Sandy home">
          <Mark />
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          {nav.map(({ id, label, icon: Icon }) => (
            <Button key={id} variant="toolbar" className={active === id ? "active" : ""} asChild>
              <a href={`#${id}`}>
                <Icon />
                {label}
              </a>
            </Button>
          ))}
          <Button variant="toolbar" onClick={() => setDialog("playground")}>
            <Sparkles />
            PLAYGROUND
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
                <span>Download Resume</span>
              </div>
            </div>
          </div>

          <Button variant="toolbar" className="nav-contact" onClick={contact}>
            <Heart />
            LET'S TALK
          </Button>
          <Button
            variant="toolbar"
            className="mobile-menu"
            aria-label={menu ? "Close navigation" : "Open navigation"}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </Button>
        </div>
      </header>
      {menu && (
        <nav className="mobile-links" aria-label="Mobile navigation">
          {nav.map(({ id, label, icon: Icon }) => (
            <Button key={id} variant="toolbar" asChild>
              <a href={`#${id}`} onClick={() => setMenu(false)}>
                <Icon />
                {label}
              </a>
            </Button>
          ))}
          <Button
            variant="toolbar"
            onClick={() => {
              setMenu(false);
              setDialog("playground");
            }}
          >
            <Sparkles />
            PLAYGROUND
          </Button>
          <Button
            variant="toolbar"
            onClick={() => {
              setMenu(false);
              contact();
            }}
          >
            <Heart />
            LET'S TALK
          </Button>
        </nav>
      )}
      <main className="canvas">
        <div className="ruler" aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => (
            <span key={i}>{i * 100}</span>
          ))}
        </div>
        <section
          className="hero"
          id="home"
          onPointerMove={handleHeroPointerMove}
          onPointerLeave={resetHeroPointer}
        >
          <div className="hero-topline">
            <time className="hero-timer">{clock}</time>
          </div>
          <p className="hero-intro">hello, my name is</p>
          <div className="sticker note-mint">PRODUCT DESIGN × CODE</div>
          <div className="sticker note-yellow">A LITTLE HUMAN. A LITTLE AI.</div>
          <div className="name-selection">
            <h1 className="display">SANDY</h1>
            <Handles />
          </div>
          {/* Location-type profile image visual elements flanking hero */}
          <HeroPinAvatar className="pin-left" message="Hello my friends" />
          <HeroPinAvatar className="pin-right" message="have a nice day!" />
          <div className="hero-available mono">
            <i className="status-dot" />
            AVAILABLE FOR THOUGHTFUL PROJECTS
          </div>
          <div className="decor-spark" aria-hidden="true">
            ✳
          </div>
          <h2 className="hero-statement">
            I design <span className="inline-target">◎</span> digital products
            <br />
            that make complex things
            <br />
            feel simple <span className="inline-flower">✳</span>.
          </h2>
          <ContactButton onClick={contact} />
          <div className="sticker role-sticker">
            PRODUCT DESIGNER <span>↗</span>
          </div>
          <div className="sticker location-sticker">
            <MapPin /> HYDERABAD, IN
          </div>
        </section>
        <section className="about-intro" id="about">
          <span className="section-label">WHAT'S UP?</span>
          <p className="about-statement">
            I'm Sandy — a product designer
            <br className="hidden md:block" /> and frontend developer who gets
            <br className="hidden md:block" /> excited <span className="small-symbol">✳</span> about
            turning complicated
            <br className="hidden md:block" /> problems into clear, useful
            <br className="hidden md:block" /> digital experiences.
          </p>
          <span className="about-aside">
            a curious mind,
            <br />
            by design. ↗
          </span>
          <div className="skills">
            {[
              { label: "Product Design", tone: "yellow", icon: Layers },
              { label: "UI / UX", tone: "pink", icon: MousePointer2 },
              { label: "Interaction", tone: "green", icon: Flower2 },
              { label: "Prototyping", tone: "cyan", icon: Zap },
              { label: "Frontend", tone: "ink", icon: Code2 },
              { label: "GenAI", tone: "mint", icon: Sparkles },
            ].map(({ label, tone, icon: Icon }) => (
              <Button
                key={label}
                variant="sticker"
                className={`tone-${tone}`}
                onClick={() => {
                  setExperiment(label === "GenAI" ? "✧" : label === "Frontend" ? "</>" : "✳");
                  setDialog("playground");
                }}
              >
                {label}
                <Icon />
              </Button>
            ))}
          </div>
        </section>
        <section className="work-section" id="work">
          <span className="mono">A FEW THINGS I'VE BEEN WORKING ON ↘</span>
          <div className="work-heading">
            <h2 className="display">
              SELECTED
              <br />
              WORK <sup>(06)</sup>
            </h2>
            <p>
              A selection of products, interfaces and experiences across healthcare, fintech,
              mobility, SaaS and emerging technology.
            </p>
          </div>
          <div className="project-list">
            {projects.map((p, i) => (
              <article
                key={p.name}
                id={`project-${i + 1}`}
                className={`project project-${p.tone}`}
                style={{ "--stack-index": i } as CSSProperties}
              >
                <div className="project-copy">
                  <div className="project-number mono">
                    <span>PROJECT 0{i + 1}</span>
                    <ArrowUpRight size={17} />
                  </div>
                  <h3>{p.name}</h3>
                  <span className="mono">{p.category}</span>
                  <p>{p.description}</p>
                  <div className="project-tags">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <Button variant="studio" onClick={() => setDialog(p.name)}>
                    EXPLORE PROJECT
                    <ArrowUpRight />
                  </Button>
                </div>
                <div className="project-image">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={`${p.name} illustrative interface concept`}
                      width={1200}
                      height={1008}
                      loading="lazy"
                    />
                  ) : (
                    <Concept kind={p.name} />
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="talk-section">
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
              I'm most energized by complex problems, ambitious products and teams that care about
              the details. I like moving between strategy, interface, interaction and code — turning
              ideas into things people can actually use.
            </p>
          </div>
        </section>
        <section className="contact-section" id="contact">
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
          <h1
            className="contact-banner-btn"
            onClick={contact}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") contact();
            }}
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
          </h1>
        </section>
        <footer className="footer">
          <p className="display footer-name">SANDY</p>
          <span className="mono">PRODUCT DESIGN × CODE × AI</span>
          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#home">HOME</a>
            <a href="#about">ABOUT</a>
            <a href="#work">WORK</a>
            <a href="#contact">CONTACT ↗</a>
          </nav>
          <div className="footer-scale" aria-hidden="true">
            {Array.from({ length: 16 }, (_, i) => (
              <span key={i}>{i * 100}</span>
            ))}
          </div>
        </footer>
      </main>
      <Dialog
        open={dialog !== null}
        onOpenChange={(open) => {
          if (!open) setDialog(null);
        }}
      >
        <DialogContent className="dialog-content">
          <DialogHeader>
            <DialogTitle>
              {selected
                ? selected.name
                : dialog === "resume"
                  ? "Sandy — Product Designer"
                  : dialog === "playground"
                    ? "A little room to play."
                    : "Let's make something useful."}
            </DialogTitle>
            <DialogDescription className="dialog-description">
              {selected
                ? selected.category
                : dialog === "resume"
                  ? "PRODUCT DESIGN · FRONTEND · DESIGN SYSTEMS"
                  : dialog === "playground"
                    ? "DESIGN × CODE × A LITTLE CURIOSITY"
                    : "PRODUCT DESIGN · FRONTEND · GENAI"}
            </DialogDescription>
          </DialogHeader>
          {selected ? (
            <>
              {selected.image ? (
                <img
                  src={selected.image}
                  alt={`${selected.name} concept preview`}
                  width={1200}
                  height={1008}
                />
              ) : (
                <div className={`project-image project-${selected.tone}`}>
                  <Concept kind={selected.name} />
                </div>
              )}
              <p>{selected.description}</p>
              <p className="preview-note mono">
                ILLUSTRATIVE CONCEPT PREVIEW · FULL CASE STUDY COMING SOON
              </p>
            </>
          ) : dialog === "resume" ? (
            <div className="contact-pending">
              <p>
                <strong>Sandy</strong> is a Product Designer & Frontend Developer based in
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
                  <strong>WORK HISTORY:</strong> Mobility, Fintech, Healthcare & Enterprise SaaS
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
                        "<h1>Sandy — Product Designer</h1><p>Email: sandeep723ms@hmail.com | Phone: +91 9121675082</p><hr/><p>Product Designer & Frontend Engineer specializing in thoughtful digital products, systems design, and GenAI experiences.</p>",
                      );
                      printWin.document.close();
                      printWin.print();
                    }
                  }}
                >
                  <ArrowUpRight />
                  DOWNLOAD / PRINT RESUME
                </Button>
                <Button variant="toolbar" onClick={contact}>
                  <Heart />
                  LET'S TALK
                </Button>
              </div>
            </div>
          ) : dialog === "playground" ? (
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
          ) : (
            <div className="contact-pending">
              <strong>Good conversations start here.</strong>
              <p>Sandy's direct contact details will be added soon.</p>
              <Button
                variant="studio"
                onClick={() => {
                  setDialog(null);
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                EXPLORE THE WORK
                <ChevronRight />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
