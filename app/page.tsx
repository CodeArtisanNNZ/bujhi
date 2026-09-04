"use client";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Lightbulb,
  Search,
  Sparkles,
  Target,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="about-page">
      <nav className="about-nav">
        <Link href="/" className="brand">
          <img src="/bujhi-icon.png" alt="Bujhi logo" />
          <span>Bujhi</span>
        </Link>

        <Link href="/">
          <ArrowLeft />
          Back home
        </Link>
      </nav>

      <section className="about-hero">
        <div className="about-hero-content">
          <div>
            <p className="chapter light">Our story</p>

            <h1>
              Bujhi began with a question:
              <br />
              Why does learning so often stop at memorizing?
            </h1>

            <p>
              I wanted to create a space where understanding matters more than
              repeating the “correct” words.
            </p>
          </div>

          <div className="hero-note">
            <Sparkles />
            <span>শুধু মুখস্থ নয়, বুঝে শিখি।</span>
          </div>
        </div>
      </section>

      <section className="founder-section">
        <div className="founder-photo-wrap">
          <div className="photo-paper photo-paper-one" />
          <div className="photo-paper photo-paper-two" />

          <img
            className="founder-photo"
            src="/nusaiba-founder.png"
            alt="Nusaiba Nusrat Zaman, founder of Bujhi"
          />

          <div className="founder-caption">
            <strong>Nusaiba Nusrat Zaman</strong>
            <span>Founder of Bujhi</span>
          </div>
        </div>

        <div className="founder-story">
          <p className="chapter">Where it started</p>

          <h2>I knew what it felt like to study without truly understanding.</h2>

          <p>
            Bujhi began with a frustration I had carried since my own school
            years. Too often, learning meant memorizing the “correct” words for
            an exam—even when the idea itself never became clear.
          </p>

          <p>
            I remember studying chapters repeatedly, remembering definitions
            and preparing answers, yet still feeling that I had not truly
            understood what I was learning.
          </p>

          <p className="handwritten">
            The problem was not always the subject or the student. Sometimes,
            the idea was simply being explained in only one way.
          </p>
        </div>
      </section>

      <section className="story-body">
        <article>
          <span>
            <Lightbulb />
          </span>

          <div>
            <p className="chapter">The idea</p>
            <h2>What if one lesson could be understood in different ways?</h2>

            <p>
              As a Computer Science student, I began thinking about how
              technology could make learning more visual, interactive and
              connected to real life.
            </p>

            <p>
              That question gradually became Bujhi—named after the Bangla words
              “আমি বুঝি,” meaning “I understand.”
            </p>
          </div>
        </article>

        <article>
          <span>
            <BookOpen />
          </span>

          <div>
            <p className="chapter">The approach</p>
            <h2>Multiple ways to understand. Multiple ways to explain.</h2>

            <p>
              Bujhi is being developed for Bangladesh’s school curriculum. It
              aims to give students different ways to approach the same lesson
              through reading, watching, exploring and practising.
            </p>

            <p>
              It also aims to help teachers explain the same concept in
              multiple ways, because one explanation will not work equally well
              for every learner.
            </p>

            <div className="method-row">
              <span>Read</span>
              <span>Watch</span>
              <span>Explore</span>
              <span>Practice</span>
            </div>
          </div>
        </article>

        <article>
          <span>
            <Search />
          </span>

          <div>
            <p className="chapter">The research</p>
            <h2>Listening before building.</h2>

            <p>
              Bujhi is still growing. The next step is not to assume what
              students and teachers need, but to listen to them, study real
              classroom challenges and build the platform around evidence from
              Bangladesh.
            </p>

            <p>
              This research will help identify where students struggle, what
              challenges teachers face and which approaches can make lessons
              clearer and more engaging.
            </p>
          </div>
        </article>

        <article>
          <span>
            <Target />
          </span>

          <div>
            <p className="chapter">The goal</p>
            <h2>To move from “I memorized it” to “I understand.”</h2>

            <p>
              My goal is simple: learning should not end with remembering an
              answer long enough to pass an exam. Students should be able to
              question an idea, explore it, apply it and explain it in their own
              words.
            </p>

            <p>
              Bujhi is my attempt to help make that kind of learning more
              accessible to students and teachers across Bangladesh.
            </p>
          </div>
        </article>
      </section>

      <section className="about-ending">
        <p className="chapter">The journey continues</p>

        <h2>
          Bujhi is not a finished answer.
          <br />
          It is a platform being built through research, testing and learning.
        </h2>

        <Link href="/">
          Explore Bujhi
          <ArrowRight />
        </Link>
      </section>

      <footer className="about-footer">
        <p>© 2026 Bujhi</p>
        <p>শুধু মুখস্থ নয়, বুঝে শিখি।</p>
      </footer>

      <style jsx global>{`
        .about-page {
          min-height: 100vh;
          overflow-x: hidden;
          background: #fffdf8;
        }

        .about-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          min-height: 72px;
          margin: auto;
          padding: 12px 5vw;
          background: #fffdf8;
        }

        .about-nav > a:last-child {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #990000;
          font-size: 0.85rem;
          font-weight: 800;
        }

        .about-nav > a:last-child svg {
          width: 18px;
        }

        .about-hero {
          padding: 70px max(5vw, calc((100vw - 1100px) / 2));
          background:
            radial-gradient(circle at 80% 25%, #c71919, #990000 48%, #720000);
          color: white;
        }

        .about-hero-content {
          display: grid;
          grid-template-columns: 1fr 190px;
          align-items: end;
          gap: 45px;
        }

        .about-hero h1 {
          max-width: 900px;
          margin: 14px 0 20px;
          font-family: Georgia, serif;
          font-size: clamp(2.7rem, 4.5vw, 4.5rem);
          font-weight: 700;
          line-height: 1.02;
          letter-spacing: -0.035em;
        }

        .about-hero-content > div:first-child > p:last-child {
          max-width: 680px;
          margin: 0;
          color: #f8dede;
          font-size: 1.05rem;
          line-height: 1.65;
        }

        .chapter {
          margin: 0;
          color: #990000;
          font-size: 0.7rem;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .chapter.light {
          color: #ffd4d1;
        }

        .hero-note {
          display: grid;
          gap: 10px;
          padding: 20px;
          border: 1px solid rgb(255 255 255 / 35%);
          border-radius: 10px;
          background: rgb(255 255 255 / 9%);
          font-family: Georgia, serif;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .hero-note svg {
          width: 23px;
          color: #ffd6cf;
        }

        .founder-section {
          display: grid;
          grid-template-columns: minmax(280px, 400px) 1fr;
          align-items: center;
          gap: clamp(45px, 7vw, 90px);
          max-width: 1080px;
          margin: auto;
          padding: 90px 5vw;
        }

        .founder-photo-wrap {
          position: relative;
          padding: 14px 14px 70px;
          background: white;
          box-shadow: 0 25px 60px rgb(70 21 12 / 18%);
          transform: rotate(-2deg);
        }

        .photo-paper {
          position: absolute;
          inset: 0;
          z-index: -1;
          background: #eee1d5;
          box-shadow: 0 15px 30px rgb(60 20 12 / 10%);
        }

        .photo-paper-one {
          transform: rotate(5deg);
        }

        .photo-paper-two {
          background: #fff8ee;
          transform: rotate(-3deg);
        }

        .founder-photo {
          display: block;
          width: 100%;
          aspect-ratio: 4 / 5;
          object-fit: cover;
          object-position: center 20%;
          filter: saturate(0.92);
        }

        .founder-caption {
          position: absolute;
          right: 20px;
          bottom: 17px;
          left: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .founder-caption strong {
          color: #990000;
          font-family: Georgia, serif;
          font-size: 1.05rem;
        }

        .founder-caption span {
          color: #706662;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .founder-story h2,
        .story-body h2 {
          margin: 10px 0 18px;
          font-family: Georgia, serif;
          font-size: clamp(1.8rem, 3vw, 2.45rem);
          line-height: 1.12;
        }

        .founder-story > p:not(.chapter),
        .story-body article div > p:not(.chapter) {
          color: #554c48;
          font-family: Georgia, serif;
          font-size: 1rem;
          line-height: 1.8;
        }

        .founder-story .handwritten {
          margin-top: 25px;
          padding: 18px 20px;
          border-left: 4px solid #990000;
          background: #f7eae1;
          color: #990000;
          font-family: cursive;
          font-size: 1rem;
          line-height: 1.6;
          transform: rotate(-1deg);
        }

        .story-body {
          max-width: 1000px;
          margin: auto;
          padding: 10px 5vw 80px;
        }

        .story-body article {
          display: grid;
          grid-template-columns: 82px 1fr;
          gap: 35px;
          padding: 48px 0;
          border-top: 1px solid #decfc3;
        }

        .story-body article > span {
          display: grid;
          width: 72px;
          height: 72px;
          place-items: center;
          border-radius: 50%;
          background: #f8e3e1;
          color: #990000;
        }

        .story-body article > span svg {
          width: 29px;
        }

        .story-body article div > p:not(.chapter) {
          max-width: 790px;
        }

        .method-row {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 23px;
        }

        .method-row span {
          padding: 9px 15px;
          border: 1px solid #d8bbb5;
          border-radius: 999px;
          background: white;
          color: #990000;
          font-size: 0.75rem;
          font-weight: 800;
        }

        .about-ending {
          padding: 65px 5vw;
          background: #211b19;
          color: white;
          text-align: center;
        }

        .about-ending .chapter {
          color: #eeb7b3;
        }

        .about-ending h2 {
          max-width: 850px;
          margin: 14px auto 27px;
          font-family: Georgia, serif;
          font-size: clamp(1.8rem, 3.5vw, 3rem);
          line-height: 1.12;
        }

        .about-ending a {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 20px;
          border-radius: 999px;
          background: #990000;
          color: white;
          font-size: 0.82rem;
          font-weight: 800;
        }

        .about-ending a svg {
          width: 17px;
        }

        .about-footer {
          display: flex;
          justify-content: space-between;
          padding: 25px 5vw;
          background: white;
          color: #706662;
          font-size: 0.75rem;
        }

        @media (max-width: 800px) {
          .about-hero-content {
            grid-template-columns: 1fr;
          }

          .hero-note {
            display: none;
          }

          .founder-section {
            grid-template-columns: 1fr;
          }

          .founder-photo-wrap {
            width: min(380px, 92%);
            margin: auto;
          }
        }

        @media (max-width: 600px) {
          .about-nav {
            min-height: 65px;
            padding: 10px 20px;
          }

          .about-nav > a:last-child {
            font-size: 0;
          }

          .about-nav > a:last-child svg {
            width: 22px;
          }

          .about-hero {
            padding: 48px 20px 52px;
          }

          .about-hero h1 {
            font-size: clamp(2.25rem, 10vw, 3rem);
            line-height: 1.04;
          }

          .about-hero-content > div:first-child > p:last-child {
            font-size: 0.95rem;
          }

          .founder-section {
            gap: 55px;
            padding: 65px 20px;
          }

          .founder-caption {
            align-items: flex-start;
            flex-direction: column;
            gap: 3px;
          }

          .founder-story h2,
          .story-body h2 {
            font-size: 1.65rem;
          }

          .founder-story > p:not(.chapter),
          .story-body article div > p:not(.chapter) {
            font-size: 0.96rem;
            line-height: 1.7;
          }

          .story-body {
            padding: 0 20px 55px;
          }

          .story-body article {
            grid-template-columns: 1fr;
            gap: 18px;
            padding: 38px 0;
          }

          .story-body article > span {
            width: 58px;
            height: 58px;
          }

          .story-body article > span svg {
            width: 24px;
          }

          .about-ending {
            padding: 50px 20px;
          }

          .about-footer {
            align-items: center;
            flex-direction: column;
            gap: 5px;
            padding: 22px 20px;
          }
        }
      `}</style>
    </main>
  );
}