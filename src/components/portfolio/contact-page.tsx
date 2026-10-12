import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  FileText,
  Github,
  Heart,
  Hop as Home,
  Linkedin,
  Mail,
  Sparkles,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function Mark() {
  return (
    <svg className="mark" viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="6" />
      <path
        d="M26 44C30 34 40 28 52 28C64 28 72 35 72 45C72 56 61 62 50 67C40 71 31 76 31 86"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="50" cy="85" r="4" fill="currentColor" />
    </svg>
  );
}

export function ContactPage() {
  const [noteText, setNoteText] = useState("");
  const [noteContact, setNoteContact] = useState("");
  const [noteSent, setNoteSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText("sandeep723ms@hmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <div className="contact-page-wrapper">
      {/* Navigation Toolbar */}
      <header className="toolbar">
        <Link className="brand" to="/" aria-label="Sandy home">
          <Mark />
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <Button variant="toolbar" asChild>
            <Link to="/">
              <Home />
              HOME
            </Link>
          </Button>
          <Button variant="toolbar" asChild>
            <a href="/#about">ABOUT</a>
          </Button>
          <Button variant="toolbar" asChild>
            <a href="/#work">WORK</a>
          </Button>
          <Button variant="toolbar" className="active" asChild>
            <Link to="/contact">
              <Heart />
              CONTACT
            </Link>
          </Button>
        </nav>
        <div className="nav-right">
          <Button variant="toolbar" asChild>
            <Link to="/">
              <ArrowLeft />
              BACK TO HOME
            </Link>
          </Button>
        </div>
      </header>

      {/* Top Ruler Track */}
      <div className="ruler" aria-hidden="true">
        <div className="ruler-track" style={{ transform: "translate3d(0px, 0, 0)" }}>
          {Array.from({ length: 36 }, (_, i) => (
            <span key={i} className="ruler-step">
              {i * 100}
            </span>
          ))}
        </div>
      </div>

      <main className="canvas">
        <section className="contact-canvas-section" id="contact-canvas">
          {/* Flanking polaroid photos */}
          <div className="contact-polaroid polaroid-left" aria-hidden="true">
            <div className="polaroid-frame">
              <img
                src="/polaroid-random-shot.jpg"
                alt="Random shot"
                className="polaroid-photo"
                width={222}
                height={222}
                loading="lazy"
              />
              <p className="polaroid-caption">Random shot.</p>
            </div>
          </div>
          <div className="contact-polaroid polaroid-right" aria-hidden="true">
            <div className="polaroid-frame">
              <img
                src="/polaroid-bird-moment.jpg"
                alt="Bird moment"
                className="polaroid-photo"
                width={222}
                height={222}
                loading="lazy"
              />
              <p className="polaroid-caption">Bird moment.</p>
            </div>
          </div>

          <div className="contact-center-stage">
            {/* Top Annotation: leave me a note */}
            <div className="contact-annotation-top" aria-hidden="true">
              <span className="annotation-text">leave me a note</span>
              <svg
                className="annotation-double-line"
                width="156"
                height="14"
                viewBox="0 0 156 14"
                fill="none"
              >
                <path
                  d="M2 4.5C28 1.5 82 2.5 154 3.5"
                  stroke="#111111"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M8 10C36 7.5 95 8.5 148 9"
                  stroke="#111111"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Selection Bounding Box */}
            <div className="contact-selection-box">
              <span className="sel-handle handle-tl" aria-hidden="true" />
              <span className="sel-handle handle-tr" aria-hidden="true" />
              <span className="sel-handle handle-bl" aria-hidden="true" />
              <span className="sel-handle handle-br" aria-hidden="true" />
              <div className="selection-user-tag" aria-hidden="true">
                <span className="user-dot" />
                <span className="user-pill">Sandy</span>
              </div>
              <svg
                className="contact-modular-title"
                viewBox="0 0 460 76"
                fill="currentColor"
                aria-label="CONTACT"
              >
                <text
                  x="50%"
                  y="72%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  fontFamily="'Flux Variable', var(--font-display), sans-serif"
                  fontWeight="900"
                  fontSize="74"
                  letterSpacing="-0.03em"
                >
                  CONTACT
                </text>
              </svg>
            </div>

            {/* Yellow Sticky Note Form */}
            <div className="contact-sticky-note" role="region" aria-label="Leave a note for Sandy">
              {!noteSent ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (noteText.trim()) {
                      setNoteSent(true);
                    }
                  }}
                >
                  <span className="sticky-header-label">LEAVE A NOTE</span>
                  <textarea
                    className="sticky-textarea"
                    rows={3}
                    placeholder="Say hello, ask a question, or leave feedback..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    aria-label="Your note"
                    required
                  />
                  <input
                    type="text"
                    className="sticky-input"
                    placeholder="Your email or name (optional)..."
                    value={noteContact}
                    onChange={(e) => setNoteContact(e.target.value)}
                    aria-label="Your contact info"
                  />
                  <div className="sticky-footer-row">
                    <div className="sticky-btn-group">
                      <button type="submit" className="sticky-action-btn">
                        SEND NOTE ↵
                      </button>
                    </div>
                    <span className="sticky-resize-grip" aria-hidden="true">
                      ///
                    </span>
                  </div>
                </form>
              ) : (
                <div className="sticky-success-state">
                  <span className="sticky-header-label">NOTE RECEIVED!</span>
                  <p className="sticky-success-desc">
                    Thanks for reaching out! Sandy has received your note and will get back to you
                    soon.
                  </p>
                  <div className="sticky-btn-group">
                    <button
                      type="button"
                      className="sticky-action-btn"
                      onClick={() => {
                        setNoteText("");
                        setNoteContact("");
                        setNoteSent(false);
                      }}
                    >
                      SEND ANOTHER
                    </button>
                  </div>
                  <span className="sticky-resize-grip" aria-hidden="true">
                    ///
                  </span>
                </div>
              )}
            </div>

            {/* Availability Callout */}
            <div className="contact-availability-callout">
              <svg
                className="curved-callout-arrow"
                width="44"
                height="36"
                viewBox="0 0 44 36"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 30C12 20 22 10 38 6M38 6L30 5M38 6L36 14"
                  stroke="#111"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="availability-label">Available for Q2 projects</span>
            </div>

            {/* Floating Social Dock */}
            <div
              className="contact-social-dock"
              role="navigation"
              aria-label="Social and contact links"
            >
              <a
                href="mailto:sandeep723ms@hmail.com"
                className="social-dock-btn"
                aria-label="Email Sandy"
                onClick={handleCopyEmail}
              >
                {copiedEmail ? (
                  <Check className="social-dock-icon" size={20} />
                ) : (
                  <Mail className="social-dock-icon" size={20} />
                )}
                <span className="social-dock-text">{copiedEmail ? "COPIED!" : "EMAIL"}</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer noopener"
                className="social-dock-btn"
                aria-label="Twitter / X"
              >
                <Twitter className="social-dock-icon" size={20} />
                <span className="social-dock-text">TWITTER</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer noopener"
                className="social-dock-btn"
                aria-label="LinkedIn"
              >
                <Linkedin className="social-dock-icon" size={20} />
                <span className="social-dock-text">LINKEDIN</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer noopener"
                className="social-dock-btn"
                aria-label="GitHub"
              >
                <Github className="social-dock-icon" size={20} />
                <span className="social-dock-text">GITHUB</span>
              </a>
              <a
                href="https://read.cv"
                target="_blank"
                rel="noreferrer noopener"
                className="social-dock-btn"
                aria-label="Read.cv"
              >
                <FileText className="social-dock-icon" size={20} />
                <span className="social-dock-text">READ.CV</span>
              </a>
            </div>
          </div>

          {/* Buy Nudge / Action Button */}
          <button
            type="button"
            className="contact-buy-nudge-btn"
            onClick={() => {
              navigator.clipboard?.writeText("sandeep723ms@hmail.com");
              window.location.href = "mailto:sandeep723ms@hmail.com?subject=Coffee%20Chat";
            }}
            aria-label="Buy me a coffee or schedule a chat"
          >
            BUY ME A COFFEE ↗
          </button>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p className="display footer-name">SANDY</p>
          <span className="mono">PRODUCT DESIGN × CODE × AI</span>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link to="/">HOME</Link>
            <a href="/#about">ABOUT</a>
            <a href="/#work">WORK</a>
            <Link to="/contact">CONTACT ↗</Link>
          </nav>
          <div className="footer-scale" aria-hidden="true">
            <div className="footer-scale-track" style={{ transform: "translate3d(0px, 0, 0)" }}>
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
    </div>
  );
}
