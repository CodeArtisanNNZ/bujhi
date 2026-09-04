"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  GraduationCap,
  LampDesk,
  Menu,
  MonitorPlay,
  PenLine,
  PlayCircle,
  X,
} from "lucide-react";

const subjects = {
  Universe: {
    title: "The Solar System",
    text: "Watch the planets orbit the Sun and explore how our solar system works.",
    icon: "☀",
  },
  Energy: {
    title: "Energy Around Us",
    text: "Explore how energy changes into light, heat, sound and motion.",
    icon: "⚡",
  },
  Motion: {
    title: "Forces and Motion",
    text: "See how force affects the movement of everyday objects.",
    icon: "→",
  },
  Life: {
    title: "Living Systems",
    text: "Explore how cells and organs work together inside living things.",
    icon: "✤",
  },
} as const;

const modes = [
  { name: "Read", icon: BookOpen },
  { name: "Watch", icon: PlayCircle },
  { name: "Explore", icon: Compass },
  { name: "Practice", icon: PenLine },
] as const;

type Subject = keyof typeof subjects;
type Mode = (typeof modes)[number]["name"];

export default function Home() {
  const [subject, setSubject] = useState<Subject>("Universe");
  const [mode, setMode] = useState<Mode>("Explore");
  const [page, setPage] = useState(1);
  const [lampOn, setLampOn] = useState(true);
  const [solarRunning, setSolarRunning] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const current = subjects[subject];

  return (
    <main>
      <header className="nav-wrap">
        <nav className="nav">
          <Link href="/" className="brand">
            <img src="/bujhi-icon.png" alt="Bujhi logo" />
            <span>Bujhi</span>
          </Link>

          <button
            type="button"
            className="menu-button"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <Link className="active" href="/">
              Home
            </Link>

            <Link href="/about">About Us</Link>

            <a href="#login">Login</a>

            <a className="nav-signup" href="#join">
              Sign Up
            </a>
          </div>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              Built for the Bangladeshi curriculum
            </p>

            <h1>
              Less memorizing.
              <br />
              More understanding.
            </h1>

            <p className="lead">
              One curriculum. Multiple ways to understand it.
            </p>

            <div className="hero-actions" id="join">
              <a className="button button-light" href="#login">
                Join as a Student
                <ArrowRight />
              </a>

              <a className="button button-outline" href="#login">
                Join as a Teacher
                <ArrowRight />
              </a>
            </div>
          </div>

          <div className={`desk ${lampOn ? "lit" : ""}`}>
            <button
              type="button"
              className="lamp"
              aria-label={lampOn ? "Turn lamp off" : "Turn lamp on"}
              onClick={() => setLampOn((on) => !on)}
            >
              <LampDesk />
              <span>{lampOn ? "Lamp on" : "Lamp off"}</span>
            </button>

            <div className="paper paper-one" />
            <div className="paper paper-two" />

            <article className="notebook">
              <div className="spiral">
                {Array.from({ length: 9 }).map((_, index) => (
                  <i key={index} />
                ))}
              </div>

              <div className="notebook-topline">
                <span>Interactive preview</span>
                <span className="preview-lock">
                  Login to explore
                </span>
              </div>

              <h2>A peek inside Bujhi</h2>

              <div className="mode-tabs">
                {modes.map(({ name, icon: Icon }) => (
                  <button
                    type="button"
                    key={name}
                    className={mode === name ? "selected" : ""}
                    onClick={() => setMode(name)}
                  >
                    <Icon />
                    <span>{name}</span>
                  </button>
                ))}
              </div>

              {page === 1 ? (
                <div className="lesson-preview">
                  <div className="lesson-copy">
                    <p className="subject-name">
                      {subject} · {mode}
                    </p>

                    <h3>{current.title}</h3>
                    <p>{current.text}</p>
                  </div>

                  {subject === "Universe" ? (
                    <button
                      type="button"
                      className={`solar-system ${
                        solarRunning ? "" : "paused"
                      }`}
                      aria-label={
                        solarRunning
                          ? "Pause solar-system rotation"
                          : "Start solar-system rotation"
                      }
                      onClick={() =>
                        setSolarRunning((running) => !running)
                      }
                    >
                      <span className="fixed-sun">☀</span>

                      <span className="orbit orbit-one">
                        <span className="planet mercury" />
                      </span>

                      <span className="orbit orbit-two">
                        <span className="planet earth" />
                      </span>

                      <span className="orbit orbit-three">
                        <span className="planet mars" />
                      </span>

                      <span className="orbit orbit-four">
                        <span className="planet saturn" />
                      </span>

                      <span className="rotation-label">
                        {solarRunning
                          ? "Tap to pause"
                          : "Tap to rotate"}
                      </span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="subject-visual"
                      onClick={() => setPage(2)}
                    >
                      <span>{current.icon}</span>
                      <small>Tap to explore</small>
                    </button>
                  )}
                </div>
              ) : (
                <div className="approach-preview">
                  <p className="subject-name">
                    One topic, four approaches
                  </p>

                  <h3>Choose what helps it click.</h3>

                  <div className="approach-grid">
                    {modes.map(({ name, icon: Icon }) => (
                      <button
                        type="button"
                        key={name}
                        className={mode === name ? "focus" : ""}
                        onClick={() => setMode(name)}
                      >
                        <Icon />
                        <span>{name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="page-controls">
                <button
                  type="button"
                  aria-label="Previous notebook page"
                  disabled={page === 1}
                  onClick={() => setPage(1)}
                >
                  <ChevronLeft />
                </button>

                <span>{page} / 2</span>

                <button
                  type="button"
                  aria-label="Next notebook page"
                  disabled={page === 2}
                  onClick={() => setPage(2)}
                >
                  <ChevronRight />
                </button>
              </div>

              <p className="locked-message">
                Preview only. Log in for the complete lesson.
              </p>
            </article>

            <div className="subject-tabs">
              {(Object.keys(subjects) as Subject[]).map((name) => (
                <button
                  type="button"
                  key={name}
                  className={subject === name ? "active" : ""}
                  onClick={() => {
                    setSubject(name);
                    setPage(1);
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="manifesto">
        <span>See it.</span>
        <span>Question it.</span>
        <span>Try it.</span>
        <span>Understand it.</span>
      </section>

      <section className="offerings">
        <Offer
          type="student"
          number="01"
          title="For curious students"
          items={[
            "Clear visual explanations",
            "Interactive examples",
            "Quizzes with feedback",
          ]}
        />

        <Offer
          type="teacher"
          number="02"
          title="For inspiring teachers"
          items={[
            "Flexible lesson plans",
            "Classroom activities",
            "Curriculum resources",
          ]}
        />
      </section>

      <section className="story-strip">
        <div>
          <p>Why Bujhi began</p>
          <h2>Learning should feel like understanding.</h2>
        </div>

        <Link href="/about">
          Read our story
          <ArrowRight />
        </Link>
      </section>

      <section className="login-note" id="login">
        <p>Full lessons and teaching resources require login.</p>
        <button type="button">Login coming next</button>
      </section>

      <footer>
        <Link href="/" className="brand">
          <img src="/bujhi-icon.png" alt="Bujhi logo" />
          <span>Bujhi</span>
        </Link>

        <p>শুধু মুখস্থ নয়, বুঝে শিখি।</p>
        <p>© 2026 Bujhi</p>
      </footer>
    </main>
  );
}

function Offer({
  type,
  number,
  title,
  items,
}: {
  type: "student" | "teacher";
  number: string;
  title: string;
  items: string[];
}) {
  const Icon =
    type === "student" ? GraduationCap : MonitorPlay;

  return (
    <article className="offering">
      <div className="offering-art">
        <span>{number}</span>
        <Icon />
      </div>

      <div>
        <p className="kicker">
          {type === "student"
            ? "Learn your way"
            : "Teach your way"}
        </p>

        <h2>{title}</h2>

        <ul>
          {items.map((item) => (
            <li key={item}>
              <Check />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <a href="#login">
          Explore as a {type}
          <ArrowRight />
        </a>
      </div>
    </article>
  );
}