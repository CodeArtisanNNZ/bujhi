"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Lightbulb,
  Search,
  Target,
} from "lucide-react";

const storySections = [
  {
    number: "01",
    label: "The beginning",
    title: "I studied to remember, but I wanted to understand.",
    icon: BookOpen,
    paragraphs: [
      "Bujhi began from a frustration I carried from my own school years. I often found myself memorizing definitions, textbook lines and prepared answers for examinations without truly understanding the ideas behind them.",
      "I could reproduce the expected answer, but that did not always mean the concept had become clear. Learning often felt more focused on surviving the next exam than developing curiosity.",
    ],
  },
  {
    number: "02",
    label: "The realization",
    title: "Sometimes the learner is not the problem.",
    icon: Lightbulb,
    paragraphs: [
      "When a student does not understand one explanation, we often assume that the student is weak or inattentive. But the real problem may be that the idea was presented in only one way.",
      "One student may understand through a diagram, another through a story, an experiment, a practical example or an interactive activity. The lesson can remain the same while the path to understanding changes.",
    ],
  },
  {
    number: "03",
    label: "The research",
    title: "Bujhi must be shaped by real classrooms.",
    icon: Search,
    paragraphs: [
      "As a Computer Science student, I began exploring how technology could make learning more visual, interactive and connected to real life. That question gradually became Bujhi—named after the Bangla words “আমি বুঝি,” meaning “I understand.”",
      "The platform will not be built only from assumptions. I want to listen to Bangladeshi students and teachers, study their classroom challenges and use that evidence to decide what Bujhi should become.",
    ],
  },
  {
    number: "04",
    label: "The vision",
    title: "Multiple ways to understand. Multiple ways to explain.",
    icon: Target,
    paragraphs: [
      "Bujhi aims to give students different ways to approach the same curriculum through reading, watching, exploring and practising.",
      "It also aims to help teachers explain the same concept through visual examples, stories, demonstrations, classroom activities and practical applications.",
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="new-about-page">
      <nav className="new-about-nav">
        <Link href="/" className="new-about-brand">
          <img src="/bujhi-icon.png" alt="Bujhi logo" />
          <span>Bujhi</span>
        </Link>

        <Link href="/" className="new-back-button">
          <ArrowLeft />
          <span>Back home</span>
        </Link>
      </nav>

      <header className="new-about-hero">
        <div className="new-about-hero-inner">
          <div className="new-about-heading">
            <p className="new-eyebrow">The story behind Bujhi</p>

            <h1>
              I did not want students to only remember.
              <br />
              I wanted them to understand.
            </h1>

            <p className="new-hero-description">
              Bujhi grew from my own experience with rote learning and a
              question that stayed with me: what if the same lesson could be
              explained in more than one way?
            </p>
          </div>

          <div className="new-bangla-card">
            <span>আমি বুঝি</span>
            <p>Not just “I memorized it.”</p>
          </div>
        </div>
      </header>

      <section className="new-founder-section">
        <div className="new-founder-image-column">
          <div className="new-photo-back new-photo-back-one" />
          <div className="new-photo-back new-photo-back-two" />

          <figure className="new-founder-photo-card">
            <img
              src="/nusaiba-founder.png"
              alt="Nusaiba Nusrat Zaman, founder of Bujhi"
            />

            <figcaption>
              <div>
                <strong>Nusaiba Nusrat Zaman</strong>
                <span>Founder of Bujhi</span>
              </div>

              <small>Dhaka, Bangladesh</small>
            </figcaption>
          </figure>
        </div>

        <div className="new-founder-writing">
          <p className="new-section-label">A note from the founder</p>

          <h2>
            Bujhi began with a frustration I knew personally.
          </h2>

          <p>
            During my school years, I often studied by memorizing the exact
            language expected in examinations. I learned how to prepare an
            answer, but preparing an answer and understanding an idea were not
            always the same thing.
          </p>

          <p>
            I started thinking about students who want to learn but cannot
            connect with the only explanation available to them. They may not
            need easier content. They may need a different path into the same
            concept.
          </p>

          <blockquote>
            “The problem is not always that a student cannot learn. Sometimes,
            the lesson has not yet been explained in the way that helps that
            student understand.”
          </blockquote>

          <p>
            That belief became the foundation of Bujhi.
          </p>
        </div>
      </section>

      <section className="new-story-section">
        <div className="new-story-introduction">
          <p className="new-section-label">The journey</p>
          <h2>From a personal experience to an educational initiative.</h2>
        </div>

        <div className="new-story-list">
          {storySections.map(
            ({
              number,
              label,
              title,
              icon: Icon,
              paragraphs,
            }) => (
              <article className="new-story-card" key={number}>
                <div className="new-story-number">{number}</div>

                <div className="new-story-icon">
                  <Icon />
                </div>

                <div className="new-story-content">
                  <p className="new-story-label">{label}</p>
                  <h3>{title}</h3>

                  {paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ),
          )}
        </div>
      </section>

      <section className="new-method-section">
        <div>
          <p className="new-section-label">One lesson, different paths</p>
          <h2>Understanding does not have only one doorway.</h2>
        </div>

        <div className="new-method-list">
          <span>Read</span>
          <span>Watch</span>
          <span>Explore</span>
          <span>Practice</span>
        </div>
      </section>

      <section className="new-final-section">
        <p className="new-section-label">The goal</p>

        <h2>
          Learning should not end with
          <br />
          “I memorized it.”
        </h2>

        <p>
          It should reach the moment when a student can finally say:
        </p>

        <strong>“I understand.”</strong>

        <Link href="/">
          Explore Bujhi
          <ArrowRight />
        </Link>
      </section>

      <footer className="new-about-footer">
        <p>© 2026 Bujhi</p>
        <p>শুধু মুখস্থ নয়, বুঝে শিখি।</p>
      </footer>

      <style jsx global>{`
        .new-about-page {
          min-height: 100vh;
          overflow-x: hidden;
          background: #fbf7f0;
          color: #211b19;
        }

        .new-about-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          min-height: 72px;
          margin: 0 auto;
          padding: 12px 5vw;
          background: #fffdf8;
        }

        .new-about-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #990000;
          font-family: Georgia, serif;
          font-size: 1.8rem;
          font-weight: 800;
          text-decoration: none;
        }

        .new-about-brand img {
          width: 40px;
          height: 40px;
          object-fit: contain;
          border-radius: 8px;
        }

        .new-back-button {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #990000;
          font-size: 0.85rem;
          font-weight: 800;
          text-decoration: none;
        }

        .new-back-button svg {
          width: 19px;
        }

        .new-about-hero {
          background:
            radial-gradient(
              circle at 85% 20%,
              #c51a1a,
              #990000 45%,
              #6c0000
            );
          color: white;
        }

        .new-about-hero-inner {
          display: grid;
          grid-template-columns: 1fr 190px;
          align-items: end;
          gap: 50px;
          max-width: 1100px;
          margin: 0 auto;
          padding: 70px 5vw 76px;
        }

        .new-eyebrow,
        .new-section-label,
        .new-story-label {
          margin: 0;
          font-size: 0.7rem;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .new-eyebrow {
          color: #ffd3cf;
        }

        .new-section-label,
        .new-story-label {
          color: #990000;
        }

        .new-about-heading h1 {
          max-width: 850px;
          margin: 15px 0 22px;
          font-family: Georgia, serif;
          font-size: clamp(2.5rem, 4.2vw, 4.2rem);
          font-weight: 700;
          line-height: 1.03;
          letter-spacing: -0.035em;
        }

        .new-hero-description {
          max-width: 700px;
          margin: 0;
          color: #f8dedd;
          font-size: 1rem;
          line-height: 1.65;
        }

        .new-bangla-card {
          padding: 22px 18px;
          border: 1px solid rgb(255 255 255 / 30%);
          border-radius: 12px;
          background: rgb(255 255 255 / 9%);
        }

        .new-bangla-card span {
          font-family: Georgia, serif;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .new-bangla-card p {
          margin: 7px 0 0;
          color: #f7cfcc;
          font-size: 0.75rem;
          line-height: 1.5;
        }

        .new-founder-section {
          display: grid;
          grid-template-columns: minmax(290px, 390px) 1fr;
          align-items: center;
          gap: clamp(50px, 7vw, 90px);
          max-width: 1080px;
          margin: 0 auto;
          padding: 90px 5vw;
        }

        .new-founder-image-column {
          position: relative;
        }

        .new-photo-back {
          position: absolute;
          inset: 0;
          background: #e8d7ca;
          box-shadow: 0 16px 35px rgb(65 10 5 / 12%);
        }

        .new-photo-back-one {
          transform: rotate(5deg);
        }

        .new-photo-back-two {
          background: #fff1e4;
          transform: rotate(-4deg);
        }

        .new-founder-photo-card {
          position: relative;
          margin: 0;
          padding: 13px 13px 67px;
          background: white;
          box-shadow: 0 25px 60px rgb(65 10 5 / 18%);
          transform: rotate(-1.5deg);
        }

        .new-founder-photo-card img {
          display: block;
          width: 100%;
          aspect-ratio: 4 / 5;
          object-fit: cover;
          object-position: center 18%;
        }

        .new-founder-photo-card figcaption {
          position: absolute;
          right: 18px;
          bottom: 15px;
          left: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .new-founder-photo-card figcaption div {
          display: grid;
          gap: 3px;
        }

        .new-founder-photo-card strong {
          color: #990000;
          font-family: Georgia, serif;
          font-size: 0.98rem;
        }

        .new-founder-photo-card span,
        .new-founder-photo-card small {
          color: #706662;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }

        .new-founder-writing h2,
        .new-story-introduction h2,
        .new-method-section h2 {
          margin: 10px 0 20px;
          font-family: Georgia, serif;
          font-size: clamp(1.75rem, 2.8vw, 2.4rem);
          line-height: 1.13;
        }

        .new-founder-writing > p:not(.new-section-label),
        .new-story-content > p:not(.new-story-label) {
          color: #554c48;
          font-family: Georgia, serif;
          font-size: 1rem;
          line-height: 1.8;
        }

        .new-founder-writing blockquote {
          margin: 25px 0;
          padding: 18px 20px;
          border-left: 4px solid #990000;
          background: #f6e7df;
          color: #7b0000;
          font-family: Georgia, serif;
          font-size: 1rem;
          font-style: italic;
          line-height: 1.65;
        }

        .new-story-section {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px 5vw 80px;
        }

        .new-story-introduction {
          max-width: 700px;
          margin-bottom: 35px;
        }

        .new-story-card {
          display: grid;
          grid-template-columns: 45px 68px 1fr;
          gap: 24px;
          padding: 45px 0;
          border-top: 1px solid #dccbc0;
        }

        .new-story-number {
          padding-top: 18px;
          color: #990000;
          font-family: Georgia, serif;
          font-size: 1rem;
          font-weight: 700;
        }

        .new-story-icon {
          display: grid;
          width: 62px;
          height: 62px;
          place-items: center;
          border-radius: 50%;
          background: #f4deda;
          color: #990000;
        }

        .new-story-icon svg {
          width: 25px;
        }

        .new-story-content h3 {
          margin: 8px 0 16px;
          font-family: Georgia, serif;
          font-size: clamp(1.55rem, 2.6vw, 2.1rem);
          line-height: 1.15;
        }

        .new-method-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 50px;
          padding: 60px max(5vw, calc((100vw - 1000px) / 2));
          background: #f1e4da;
        }

        .new-method-section > div:first-child {
          max-width: 600px;
        }

        .new-method-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 9px;
        }

        .new-method-list span {
          min-width: 105px;
          padding: 11px 15px;
          border: 1px solid #d3b4ad;
          border-radius: 999px;
          background: #fffdf8;
          color: #990000;
          font-size: 0.75rem;
          font-weight: 800;
          text-align: center;
        }

        .new-final-section {
          padding: 70px 20px;
          background: #211b19;
          color: white;
          text-align: center;
        }

        .new-final-section .new-section-label {
          color: #eeb7b3;
        }

        .new-final-section h2 {
          margin: 15px 0;
          font-family: Georgia, serif;
          font-size: clamp(2rem, 3.8vw, 3.2rem);
          line-height: 1.1;
        }

        .new-final-section > p:not(.new-section-label) {
          margin: 0 0 10px;
          color: #d8cbc4;
        }

        .new-final-section > strong {
          display: block;
          margin-bottom: 28px;
          color: #ffd1cd;
          font-family: Georgia, serif;
          font-size: 1.55rem;
        }

        .new-final-section a {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 21px;
          border-radius: 999px;
          background: #990000;
          color: white;
          font-size: 0.82rem;
          font-weight: 800;
          text-decoration: none;
        }

        .new-final-section a svg {
          width: 17px;
        }

        .new-about-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 5vw;
          background: white;
          color: #706662;
          font-size: 0.75rem;
        }

        @media (max-width: 800px) {
          .new-about-hero-inner {
            grid-template-columns: 1fr;
          }

          .new-bangla-card {
            display: none;
          }

          .new-founder-section {
            grid-template-columns: 1fr;
          }

          .new-founder-image-column {
            width: min(380px, 92%);
            margin: 0 auto;
          }

          .new-method-section {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 600px) {
          .new-about-nav {
            min-height: 64px;
            padding: 10px 20px;
          }

          .new-about-brand {
            font-size: 1.5rem;
          }

          .new-about-brand img {
            width: 35px;
            height: 35px;
          }

          .new-back-button span {
            display: none;
          }

          .new-about-hero-inner {
            padding: 48px 20px 52px;
          }

          .new-about-heading h1 {
            font-size: clamp(2.1rem, 9.5vw, 2.85rem);
          }

          .new-hero-description {
            font-size: 0.94rem;
          }

          .new-founder-section {
            gap: 55px;
            padding: 65px 20px;
          }

          .new-founder-photo-card figcaption {
            align-items: flex-start;
            flex-direction: column;
            gap: 4px;
          }

          .new-founder-writing h2,
          .new-story-introduction h2,
          .new-method-section h2 {
            font-size: 1.6rem;
          }

          .new-founder-writing > p:not(.new-section-label),
          .new-story-content > p:not(.new-story-label) {
            font-size: 0.95rem;
            line-height: 1.7;
          }

          .new-story-section {
            padding: 10px 20px 55px;
          }

          .new-story-card {
            grid-template-columns: 40px 1fr;
            gap: 17px;
            padding: 38px 0;
          }

          .new-story-number {
            grid-row: 1 / 3;
          }

          .new-story-icon {
            width: 55px;
            height: 55px;
          }

          .new-story-content {
            grid-column: 2;
          }

          .new-story-content h3 {
            font-size: 1.45rem;
          }

          .new-method-section {
            padding: 48px 20px;
          }

          .new-method-list {
            width: 100%;
          }

          .new-method-list span {
            min-width: 0;
          }

          .new-final-section {
            padding: 55px 20px;
          }

          .new-about-footer {
            flex-direction: column;
            gap: 5px;
            padding: 22px 20px;
          }
        }
      `}</style>
    </main>
  );
}
