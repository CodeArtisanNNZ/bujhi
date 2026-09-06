"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Rotate3D, X } from "lucide-react";
type Role = "student" | "teacher";

export default function Register() {
  const router = useRouter();
  const [view, setView] = useState(0);
  const [role, setRole] = useState<Role | null>(null);
  const [seat, setSeat] = useState("");
  const [gender, setGender] = useState("No preference");
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("role");
    if (value === "student" || value === "teacher") setRole(value);
  }, []);
  function close() {
    setRole(null);
    setDone(false);
    setStep(1);
  }
  function chooseStudent(value: string) {
    setSeat(value);
    setRole("student");
    setStep(1);
  }
  function finish(event: React.FormEvent) {
    event.preventDefault();
    if (step === 1) setStep(2);
    else setDone(true);
  }
  return (
    <main className={`register-page view-${view}`}>
      <img
        className="classroom-scene"
        src="/classroom-registration.png"
        alt="A warm Bangladeshi classroom viewed from the back"
      />
      <div className="classroom-tint" />
      <Link className="auth-brand" href="/">
        <img src="/bujhi-icon.png" alt="" />
        Bujhi
      </Link>
      <div className="register-intro">
        <p className="auth-kicker">Choose your place</p>
        <h1>Every learner belongs in the room.</h1>
        <p>
          Rotate the classroom, choose a student seat, or meet the teacher to
          begin.
        </p>
      </div>
      <div className="rotate-control">
        <button
          onClick={() => setView(Math.max(-1, view - 1))}
          disabled={view === -1}
        >
          <ArrowLeft />
        </button>
        <span>
          <Rotate3D />
          {view === 0 ? "Centre view" : view < 0 ? "Left view" : "Right view"}
        </span>
        <button
          onClick={() => setView(Math.min(1, view + 1))}
          disabled={view === 1}
        >
          <ArrowRight />
        </button>
      </div>
      {[5, 8, 9, 10].map((number, index) => (
        <button
          key={number}
          className={`seat-hotspot seat-${index + 1}`}
          onClick={() => chooseStudent(String(number))}
        >
          <span>Seat {number}</span>
        </button>
      ))}
      <button
        className="teacher-hotspot"
        onClick={() => {
          setRole("teacher");
          setStep(1);
        }}
      >
        <span>Choose teacher</span>
      </button>
      <div className="classroom-help">
        Tap a glowing person or seat. These hotspots work with touch, keyboard
        and mouse.
      </div>
      {role && (
        <div
          className="auth-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <section className="register-card">
            <button className="modal-close" onClick={close} aria-label="Close">
              <X />
            </button>
            {done ? (
              <div className="success-state">
                <span>
                  <Check />
                </span>
                <h2>Your demo space is ready.</h2>
                <p>
                  {role === "student"
                    ? `Seat ${seat || "selected"} is yours.`
                    : `Your ${gender.toLowerCase()} teacher guide is ready.`}{" "}
                  Real accounts will be activated with the backend.
                </p>
                <button
                  onClick={() =>
                    role === "student"
                      ? router.push("/student/dashboard")
                      : router.push("/login")
                  }
                >
                  Continue
                </button>
              </div>
            ) : (
              <>
                <p className="auth-kicker">
                  {role === "student"
                    ? `Student registration · Seat ${seat || "selected"}`
                    : "Teacher registration"}
                </p>
                <h2>
                  {step === 1 ? "Tell us who you are" : "Shape your experience"}
                </h2>
                <div className="step-dots">
                  <i className="active" />
                  <i className={step === 2 ? "active" : ""} />
                </div>
                <form onSubmit={finish}>
                  {step === 1 ? (
                    <>
                      <label>
                        Full name
                        <input required placeholder="Your name" />
                      </label>
                      <label>
                        Email
                        <input
                          required
                          type="email"
                          placeholder="you@example.com"
                        />
                      </label>
                      <label>
                        Create password
                        <input
                          required
                          type="password"
                          minLength={4}
                          placeholder="At least 4 characters"
                        />
                      </label>
                    </>
                  ) : role === "student" ? (
                    <>
                      <label>
                        Class
                        <select defaultValue="8">
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                        </select>
                      </label>
                      <fieldset>
                        <legend>What would you like help with first?</legend>
                        <div className="choice-grid">
                          {[
                            "Bangla",
                            "English",
                            "Mathematics",
                            "Science",
                            "Social Studies",
                            "Not sure yet",
                          ].map((item) => (
                            <label key={item}>
                              <input type="checkbox" /> {item}
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    </>
                  ) : (
                    <>
                      <fieldset>
                        <legend>Choose the gender of your teacher guide</legend>
                        <div className="gender-options">
                          {["Woman", "Man", "No preference"].map((item) => (
                            <button
                              type="button"
                              className={gender === item ? "active" : ""}
                              onClick={() => setGender(item)}
                              key={item}
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      </fieldset>
                      <label>
                        Subjects you teach
                        <input placeholder="e.g. Mathematics and Science" />
                      </label>
                    </>
                  )}
                  <button className="submit-button">
                    {step === 1 ? "Next step" : "Create demo account"}
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
