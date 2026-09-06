"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Award,
  Backpack,
  BookOpen,
  CalendarDays,
  Clock3,
  Coffee,
  Globe2,
  LampDesk,
  Leaf,
  Map,
  Menu,
  PenLine,
  Search,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
const panels = {
  subjects: ["Bangla", "English", "Mathematics", "Science", "Social Studies"],
  world: [
    "Why do seasons change?",
    "How many languages are spoken?",
    "Why are maps never perfectly accurate?",
  ],
  bangladesh: [
    "Explore the Sundarbans",
    "Follow the Padma River",
    "Meet the people behind Language Day",
  ],
  practice: [
    "5-minute science check",
    "Mathematics warm-up",
    "Write it in your own words",
  ],
  calendar: [
    "Today · Science lesson",
    "Tomorrow · Maths practice",
    "Friday · Curiosity review",
  ],
  saved: [
    "Photosynthesis visual",
    "Fractions with paper folding",
    "A map of Bengal’s rivers",
  ],
  awards: ["First question asked", "Three ways explored", "Kind classmate"],
  profile: [
    "Class 8 learner",
    "4 topics explored this week",
    "Preferred mode: Visual",
  ],
  timer: ["10-minute focus", "20-minute study", "5-minute break"],
  journal: [
    "Why is the sky blue?",
    "How do bridges carry weight?",
    "What makes a story memorable?",
  ],
};
type Panel = keyof typeof panels | null;
const hotspotData = [
  { id: "subjects", label: "Subject shelf", icon: BookOpen, cls: "hot-books" },
  { id: "world", label: "World facts", icon: Globe2, cls: "hot-globe" },
  { id: "bangladesh", label: "Bangladesh facts", icon: Map, cls: "hot-map" },
  { id: "practice", label: "Practice", icon: PenLine, cls: "hot-pencil" },
  {
    id: "calendar",
    label: "Study plan",
    icon: CalendarDays,
    cls: "hot-calendar",
  },
  { id: "saved", label: "Saved lessons", icon: Backpack, cls: "hot-bag" },
  { id: "awards", label: "Achievements", icon: Award, cls: "hot-trophy" },
  { id: "profile", label: "Your growth", icon: Leaf, cls: "hot-plant" },
  { id: "timer", label: "Focus timer", icon: Clock3, cls: "hot-clock" },
] as const;
export default function StudentDashboard() {
  const [panel, setPanel] = useState<Panel>(null);
  const [lamp, setLamp] = useState(true);
  const [sound, setSound] = useState(false);
  const [drink, setDrink] = useState("Tea");
  const [clarity, setClarity] = useState(1);
  const [toast, setToast] = useState("");
  const [menu, setMenu] = useState(false);
  const [name, setName] = useState("Curious learner");
  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("bujhi-demo-user") || "{}");
      if (u.name) setName(u.name);
    } catch {}
  }, []);
  function celebrate(text: string) {
    setToast(text);
    setTimeout(() => setToast(""), 2600);
  }
  return (
    <main className={`dashboard ${lamp ? "desk-lit" : "desk-dim"}`}>
      <header className="dash-nav">
        <Link className="brand" href="/">
          <img src="/bujhi-icon.png" alt="" />
          Bujhi
        </Link>
        <button className="dash-menu" onClick={() => setMenu(!menu)}>
          <Menu />
        </button>
        <nav className={menu ? "open" : ""}>
          {["Dashboard", "Subjects", "Explore", "Practice", "Progress"].map(
            (x, i) => (
              <button
                key={x}
                className={i === 0 ? "active" : ""}
                onClick={() =>
                  setPanel(
                    i === 1
                      ? "subjects"
                      : i === 2
                        ? "world"
                        : i === 3
                          ? "practice"
                          : i === 4
                            ? "profile"
                            : null,
                  )
                }
              >
                {x}
              </button>
            ),
          )}
        </nav>
        <div className="dash-actions">
          <button
            onClick={() =>
              celebrate(
                "Search will connect to every lesson when the content library is added.",
              )
            }
          >
            <Search />
          </button>
          <button onClick={() => setSound(!sound)}>
            {sound ? <Volume2 /> : <VolumeX />}
          </button>
          <button className="avatar" onClick={() => setPanel("profile")}>
            {name[0]?.toUpperCase()}
          </button>
        </div>
      </header>
      <section className="dash-welcome">
        <div>
          <p>Good to see you, {name}.</p>
          <h1>What will you understand today?</h1>
        </div>
        <div className="streak-kind">
          <span>✦</span>
          <p>
            <b>Learning rhythm</b>
            <br />
            Come back because you’re curious—not because a streak demands it.
          </p>
        </div>
      </section>
      <section className="interactive-desk">
        <img
          src="/student-desk.png"
          alt="Interactive illustrated study desk with books, globe, lamp and learning objects"
        />
        <div className="desk-vignette" />
        <button
          className="current-lesson"
          onClick={() =>
            celebrate(
              "Lesson opened! In the backend phase, this will resume exactly where you stopped.",
            )
          }
        >
          <span>Continue learning</span>
          <b>Class 8 Science</b>
          <strong>Chapter 1 · Cells and life</strong>
          <i>
            <em style={{ width: "62%" }} />
          </i>
          <small>62% complete · tap to continue</small>
        </button>
        {hotspotData.map(({ id, label, icon: Icon, cls }) => (
          <button
            key={id}
            className={`desk-hotspot ${cls}`}
            onClick={() => setPanel(id)}
            aria-label={label}
          >
            <Icon />
            <span>{label}</span>
          </button>
        ))}
        <button
          className="desk-hotspot hot-lamp"
          onClick={() => setLamp(!lamp)}
        >
          <LampDesk />
          <span>{lamp ? "Focus light on" : "Turn focus light on"}</span>
        </button>
        <div className="drink-control">
          <button
            onClick={() =>
              celebrate(
                `Your ${drink.toLowerCase()} is ready. Sip, breathe, begin.`,
              )
            }
          >
            <Coffee />
            <span>{drink}</span>
          </button>
          <select
            value={drink}
            onChange={(e) => setDrink(e.target.value)}
            aria-label="Choose your focus drink"
          >
            <option>Tea</option>
            <option>Coffee</option>
            <option>Hot chocolate</option>
            <option>Lemon water</option>
          </select>
        </div>
      </section>
      <section className="dashboard-grid">
        <article className="curiosity-card">
          <p className="auth-kicker">Daily curiosity</p>
          <h2>
            If plants need sunlight, how do seeds begin growing underground?
          </h2>
          <div>
            <button
              onClick={() =>
                celebrate(
                  "Lovely thought. Questions are the beginning of understanding.",
                )
              }
            >
              I have an idea
            </button>
            <button onClick={() => setPanel("journal")}>
              Save to curiosity journal
            </button>
          </div>
        </article>
        <article className="clarity-card">
          <p className="auth-kicker">Understanding meter</p>
          <h2>How did today’s idea feel?</h2>
          <div>
            {["Still confused", "Getting there", "I understand"].map((x, i) => (
              <button
                className={clarity === i ? "active" : ""}
                onClick={() => {
                  setClarity(i);
                  celebrate(
                    i === 0
                      ? "Let’s try a visual explanation next."
                      : i === 1
                        ? "Good progress—we’ll show one more example."
                        : "That clicked! Ready to explore further?",
                  );
                }}
                key={x}
              >
                {x}
              </button>
            ))}
          </div>
          <p>
            {clarity === 0
              ? "Next recommendation: watch an animation."
              : clarity === 1
                ? "Next recommendation: try a practical example."
                : "Next recommendation: explain it in your own words."}
          </p>
        </article>
      </section>
      {panel && (
        <div
          className="dash-modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setPanel(null);
          }}
        >
          <section className="dash-panel">
            <button onClick={() => setPanel(null)} className="modal-close">
              <X />
            </button>
            <p className="auth-kicker">Interactive desk</p>
            <h2>
              {hotspotData.find((x) => x.id === panel)?.label ||
                "Curiosity journal"}
            </h2>
            <div className="panel-list">
              {panels[panel].map((x, i) => (
                <button
                  key={x}
                  onClick={() =>
                    celebrate(
                      `${x} selected. Full content will be connected after login services are built.`,
                    )
                  }
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {x}
                </button>
              ))}
            </div>
            <small>
              Preview interaction only. Lessons, quizzes and saved progress
              require the future backend.
            </small>
          </section>
        </div>
      )}
      {toast && <div className="dash-toast">✦ {toast}</div>}
    </main>
  );
}
