"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  Coffee,
  Eye,
  EyeOff,
  LampDesk,
  Volume2,
  VolumeX,
} from "lucide-react";

const facts = {
  World:
    "The world has more than 7,000 living languages—every one carries a different way of seeing life.",
  Bangladesh:
    "Bangladesh has the world’s largest river delta, shaped by the Ganges, Brahmaputra and Meghna.",
  Society:
    "Communities become stronger when people listen, cooperate and make room for different perspectives.",
};
const drinks = ["Coffee", "Tea", "Hot chocolate", "Lemon water"];

export default function Login() {
  const router = useRouter();
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [show, setShow] = useState(false);
  const [lamp, setLamp] = useState(true);
  const [sound, setSound] = useState(false);
  const [drink, setDrink] = useState("Coffee");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "");
    const password = String(data.get("password") || "");
    if (!email.includes("@") || password.length < 4) {
      setError("Use a valid email and at least 4 characters for this demo.");
      return;
    }
    localStorage.setItem(
      "bujhi-demo-user",
      JSON.stringify({ email, role, name: email.split("@")[0] }),
    );
    if (role === "student") router.push("/student/dashboard");
    else
      setError(
        "Teacher dashboard comes in the next frontend step. Choose Student to explore this demo.",
      );
  }
  return (
    <main className={`login-page ${lamp ? "lamp-bright" : "lamp-dim"}`}>
      <img
        className="login-scene"
        src="/login-study-scene.png"
        alt="A warm illustrated study desk with books, a lamp and a notebook"
      />
      <div className="scene-shade" />
      <Link className="auth-brand" href="/">
        <img src="/bujhi-icon.png" alt="" />
        Bujhi
      </Link>
      <div className="login-tools">
        <button onClick={() => setLamp(!lamp)} aria-pressed={lamp}>
          <LampDesk />
          {lamp ? "Turn lamp off" : "Turn lamp on"}
        </button>
        <button onClick={() => setSound(!sound)}>
          {sound ? <Volume2 /> : <VolumeX />}
          {sound ? "Sound on" : "Sound off"}
        </button>
      </div>
      <section className="login-card" aria-label="Sign in">
        <p className="auth-kicker">Welcome back</p>
        <h1>Ready to understand something new?</h1>
        <p>Sign in to continue your learning space.</p>
        <div className="role-switch">
          <button
            className={role === "student" ? "active" : ""}
            onClick={() => setRole("student")}
          >
            I’m a student
          </button>
          <button
            className={role === "teacher" ? "active" : ""}
            onClick={() => setRole("teacher")}
          >
            I’m a teacher
          </button>
        </div>
        <form onSubmit={submit}>
          <label>
            Email
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Password
            <span className="password-wrap">
              <input
                name="password"
                type={show ? "text" : "password"}
                placeholder="At least 4 characters"
                required
              />
              <button
                type="button"
                aria-label="Show password"
                onClick={() => setShow(!show)}
              >
                {show ? <EyeOff /> : <Eye />}
              </button>
            </span>
          </label>
          <div className="form-row">
            <label className="check">
              <input type="checkbox" /> Remember me
            </label>
            <button
              type="button"
              className="text-button"
              onClick={() =>
                setError(
                  "Password recovery will be connected when the backend is added.",
                )
              }
            >
              Forgot password?
            </button>
          </div>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button className="submit-button">Enter my study space</button>
        </form>
        <p className="auth-foot">
          New to Bujhi? <Link href="/register">Create an account</Link>
        </p>
        <small>Frontend demo: your details stay only in this browser.</small>
      </section>
      <div className="book-actions">
        <span>
          <BookOpen /> Tap a book for a tiny lesson
        </span>
        {Object.keys(facts).map((x) => (
          <button
            key={x}
            onClick={() => setMessage(facts[x as keyof typeof facts])}
          >
            {x}
          </button>
        ))}
      </div>
      <div className="mug-widget">
        <button
          onClick={() =>
            setMessage(
              "A good beverage can make focus time feel more inviting. What’s yours?",
            )
          }
        >
          <Coffee />
          Your mug: {drink}
        </button>
        <div>
          {drinks.map((x) => (
            <button
              className={drink === x ? "active" : ""}
              key={x}
              onClick={() => {
                setDrink(x);
                setMessage(
                  `${x} selected. Take a sip, then take the next small step.`,
                );
              }}
            >
              {x}
            </button>
          ))}
        </div>
      </div>
      {message && (
        <button className="fact-toast" onClick={() => setMessage("")}>
          {message}
          <span>Tap to close</span>
        </button>
      )}
    </main>
  );
}
