"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BookOpen, Globe2, LampDesk, Laptop, MessageCircle, Volume2, Eye, FlaskConical, GraduationCap, ChevronRight } from "lucide-react";
import "./student.css";

const books = [
  { id: "bangla", title: "Bangla", bn: "বাংলা", tone: "cream" },
  { id: "english", title: "English", bn: "English", tone: "green" },
  { id: "math", title: "Mathematics", bn: "গণিত", tone: "red" },
  { id: "science", title: "Science", bn: "বিজ্ঞান", tone: "blue" },
  { id: "bgs", title: "Bangladesh & Global Studies", bn: "বাংলাদেশ ও বিশ্বপরিচয়", tone: "brown" },
  { id: "ict", title: "ICT", bn: "তথ্য ও যোগাযোগ প্রযুক্তি", tone: "olive" },
];

const chapters: Record<string, string[]> = {
  bangla: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"],
  english: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"],
  math: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"],
  science: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5", "Chapter 6"],
  bgs: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"],
  ict: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"],
};

const styles = [
  { id: "visual", label: "Show me visually", note: "Diagrams, illustrations and step-by-step visual explanations.", icon: Eye },
  { id: "simulation", label: "Let me explore", note: "Interactive simulations and small experiments.", icon: FlaskConical },
  { id: "read", label: "Read it to me", note: "Listen while the lesson is highlighted on screen.", icon: Volume2 },
  { id: "teacher", label: "Teach me like a teacher", note: "A guided explanation with questions along the way.", icon: GraduationCap },
];

export default function StudentDashboard() {
  const [subject, setSubject] = useState("science");
  const [chapter, setChapter] = useState("Chapter 4");
  const [laptopOpen, setLaptopOpen] = useState(true);
  const [learningStyle, setLearningStyle] = useState("visual");
  const [lamp, setLamp] = useState(true);
  const [fact, setFact] = useState(0);
  const selectedBook = useMemo(() => books.find((b) => b.id === subject)!, [subject]);
  const facts = ["A question is evidence that your brain is working, not that you are behind.", "Try explaining a concept in your own words to test whether you understand it.", "Short retrieval breaks can make a lesson easier to remember later."];

  function chooseBook(id: string) {
    setSubject(id);
    setChapter(chapters[id][0]);
    setLaptopOpen(true);
  }

  return (
    <main className={`student-dashboard ${lamp ? "desk-light" : "desk-dim"}`}>
      <header className="student-topbar">
        <Link className="student-brand" href="/"><img src="/bujhi-icon.png" alt="" />Bujhi</Link>
        <div className="student-identity"><span>Student workspace</span><strong>Class 8</strong></div>
      </header>

      <section className="study-room">
        <div className="room-copy">
          <p>YOUR STUDY DESK</p>
          <h1>What do you want to understand today?</h1>
          <span>Choose a book from your shelf. Your desk will prepare the lesson around you.</span>
        </div>

        <section className="book-shelf" aria-label="Class 8 books">
          <div className="shelf-label"><BookOpen size={18}/><span>Class 8 bookshelf</span></div>
          <div className="shelf-books">
            {books.map((book) => (
              <button key={book.id} className={`shelf-book ${book.tone} ${subject === book.id ? "selected" : ""}`} onClick={() => chooseBook(book.id)}>
                <small>{book.bn}</small><strong>{book.title}</strong>
              </button>
            ))}
          </div>
        </section>

        <section className="desk-surface">
          <button className="desk-object lamp-object" onClick={() => setLamp(!lamp)} aria-label="Toggle desk lamp"><LampDesk/><span>{lamp ? "Lamp on" : "Lamp off"}</span></button>
          <button className="desk-object globe-object" onClick={() => setFact((fact + 1) % facts.length)}><Globe2/><span>Desk thought</span><small>{facts[fact]}</small></button>

          <div className="lesson-card">
            <span>Selected book</span>
            <h2>{selectedBook.title}</h2>
            <label>Which chapter?</label>
            <select value={chapter} onChange={(e) => setChapter(e.target.value)}>{chapters[subject].map((c) => <option key={c}>{c}</option>)}</select>
            <button onClick={() => setLaptopOpen(true)}>Choose how to learn <ChevronRight size={17}/></button>
          </div>

          <button className={`laptop ${laptopOpen ? "open" : ""}`} onClick={() => setLaptopOpen(true)} aria-label="Open learning options">
            <span className="laptop-screen"><Laptop/><b>BUJHI</b><small>Tap to choose how you learn</small></span>
            <span className="laptop-base" />
          </button>

          <Link className="friend-corner" href="/student/friend"><MessageCircle/><span><small>STUDENT SPACE</small><strong>Talk to a friend</strong><em>A quiet mental-wellbeing corner.</em></span></Link>
        </section>
      </section>

      {laptopOpen && <div className="learning-overlay" onClick={() => setLaptopOpen(false)}>
        <section className="learning-screen" onClick={(e) => e.stopPropagation()}>
          <button className="screen-close" onClick={() => setLaptopOpen(false)}>×</button>
          <p>SCIENCE DESK / {chapter.toUpperCase()}</p>
          <h2>How do you want to learn?</h2>
          <span>Pick the way that feels most useful right now. You can switch at any time.</span>
          <div className="learning-options">
            {styles.map((item) => { const Icon = item.icon; return <button key={item.id} className={learningStyle === item.id ? "active" : ""} onClick={() => setLearningStyle(item.id)}><Icon/><span><strong>{item.label}</strong><small>{item.note}</small></span></button> })}
          </div>
          <button className="begin-lesson">Begin {selectedBook.title} · {chapter}</button>
        </section>
      </div>}
    </main>
  );
}
