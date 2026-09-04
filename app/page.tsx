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
  Universe: { title: "The Solar System", text: "Move the Sun and see how distance changes the planets' paths.", icon: "☀" },
  Energy: { title: "Energy Around Us", text: "See energy change from light to heat, motion and sound.", icon: "⚡" },
  Motion: { title: "Forces & Motion", text: "Push, pull and test how force changes an object's movement.", icon: "→" },
  Life: { title: "Living Systems", text: "Explore how cells work together to keep living things alive.", icon: "✤" },
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
  const [mode, setMode] = useState<Mode>("Read");
  const [page, setPage] = useState(1);
  const [lampOn, setLampOn] = useState(true);
  const [sunPosition, setSunPosition] = useState(50);
  const [menuOpen, setMenuOpen] = useState(false);
  const current = subjects[subject];

  return (
    <main>
      <header className="navbar">
        <Link href="/" className="brand"><img src="/bujhi-icon.png" alt="Bujhi" /><span>Bujhi</span></Link>
        <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? "open" : ""}>
          <Link className="active" href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <a href="#login">Login</a>
          <a className="signup" href="#join">Sign Up</a>
        </nav>
      </header>

      <section className="hero">
        <div className="heroCopy">
          <p className="scribble">Built for the<br />Bangladeshi curriculum ↘</p>
          <h1>Less memorizing.<br />More understanding.</h1>
          <p className="tagline">One curriculum. Multiple ways to understand it.</p>
          <div className="actions" id="join">
            <a className="primary" href="#login">Join as a Student <ArrowRight /></a>
            <a className="secondary" href="#login">Join as a Teacher <ArrowRight /></a>
          </div>
        </div>

        <div className={`studyDesk ${lampOn ? "lit" : ""}`}>
          <button className="lamp" onClick={() => setLampOn(!lampOn)} aria-label="Turn desk lamp on or off">
            <LampDesk /><span>{lampOn ? "On" : "Off"}</span>
          </button>
          <div className="sheet backSheet" />
          <div className="sheet middleSheet" />
          <article className="notebook">
            <div className="rings">{Array.from({ length: 10 }).map((_, i) => <i key={i} />)}</div>
            <header className="bookHeader">
              <div><h2>A peek inside Bujhi</h2><p>Lesson preview • Login to explore</p></div>
              <span>{page}/2</span>
            </header>

            <div className="modes">
              {modes.map(({ name, icon: Icon }) => (
                <button key={name} className={mode === name ? "selected" : ""} onClick={() => setMode(name)}><Icon />{name}</button>
              ))}
            </div>

            {page === 1 ? (
              <div className="lesson">
                <div className="lessonText"><small>{subject} · {mode}</small><h3>{current.title}</h3><p>{current.text}</p></div>
                <div className="solar" aria-label="Interactive solar system">
                  <div className="orbit o1" /><div className="orbit o2" /><div className="orbit o3" />
                  <div className="planet p1" /><div className="planet p2" /><div className="planet p3" />
                  <div className="sun" style={{ left: `${28 + sunPosition * 0.42}%` }}>{current.icon}</div>
                </div>
                <label className="slider">Move the idea
                  <input type="range" min="0" max="100" value={sunPosition} onChange={(e) => setSunPosition(Number(e.target.value))} />
                </label>
              </div>
            ) : (
              <div className="fourWays">
                <small>ONE TOPIC, FOUR APPROACHES</small>
                <h3>Choose what helps it click.</h3>
                <div>{modes.map(({ name, icon: Icon }) => <button key={name} onClick={() => setMode(name)} className={mode === name ? "chosen" : ""}><Icon /><span>{name}</span></button>)}</div>
              </div>
            )}

            <div className="pager">
              <button disabled={page === 1} onClick={() => setPage(1)}><ChevronLeft /></button>
              <span>Switch page</span>
              <button disabled={page === 2} onClick={() => setPage(2)}><ChevronRight /></button>
            </div>
            <p className="locked">▣ Preview only. Log in for the full lesson.</p>
          </article>

          <div className="subjectTabs">
            {(Object.keys(subjects) as Subject[]).map((name) => <button key={name} className={subject === name ? "active" : ""} onClick={() => { setSubject(name); setPage(1); }}>{name}</button>)}
          </div>
        </div>
      </section>

      <div className="manifesto"><span>SEE IT.</span><span>QUESTION IT.</span><span>TRY IT.</span><span>UNDERSTAND IT.</span></div>

      <section className="offers">
        <Offer kind="student" number="01" title="For curious students" items={["Clear visual explanations", "Ideas you can explore", "Quizzes with feedback"]} />
        <Offer kind="teacher" number="02" title="For inspiring teachers" items={["Flexible lesson plans", "Ready classroom activities", "Track understanding"]} />
      </section>

      <section className="story"><Link href="/about">Our story <ArrowRight /></Link></section>
      <section id="login" className="loginNote">Full lessons and resources are available after login.</section>
      <footer><span>© 2026 Bujhi</span><span>শুধু মুখস্থ নয়, বুঝে শিখি।</span></footer>

      <style jsx global>{`
        :root{--red:#990000;--deep:#720000;--cream:#fbf7ef;--ink:#1d1714}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--cream);color:var(--ink);font-family:Arial,sans-serif}button,a{font:inherit}.navbar{height:74px;padding:0 5%;display:flex;align-items:center;justify-content:space-between;background:white;position:relative;z-index:20}.brand{display:flex;align-items:center;gap:10px;color:var(--red);font:bold 30px Georgia,serif;text-decoration:none}.brand img{width:46px;height:46px;object-fit:contain}.navbar nav{display:flex;align-items:center;gap:38px}.navbar nav a{color:#111;text-decoration:none;font-size:14px;padding:26px 0 18px}.navbar nav .active{border-bottom:3px solid var(--red)}.navbar .signup{background:var(--red);color:white;padding:13px 22px;border-radius:6px}.menu{display:none;border:0;background:none;color:var(--red)}
        .hero{min-height:550px;padding:35px 4.5% 45px;display:grid;grid-template-columns:.88fr 1.12fr;gap:28px;align-items:center;background:radial-gradient(circle at 16% 45%,#c30000 0,var(--red) 38%,#760000 100%);color:white;overflow:hidden}.heroCopy{position:relative;z-index:2}.heroCopy h1{font:700 clamp(52px,5.5vw,88px)/.88 Georgia,serif;letter-spacing:-3px;margin:0 0 20px;max-width:650px}.tagline{font-size:18px;margin:0 0 28px}.scribble{position:absolute;right:1%;top:-22px;font:16px/1.2 cursive;transform:rotate(-5deg)}.actions{display:flex;gap:16px}.actions a{display:flex;align-items:center;gap:12px;padding:15px 24px;border-radius:999px;text-decoration:none;font-weight:700;font-size:15px}.actions svg{width:18px}.primary{background:white;color:var(--red)}.secondary{border:2px solid white;color:white}
        .studyDesk{min-height:455px;position:relative;display:flex;align-items:center;justify-content:center}.studyDesk:after{content:"";position:absolute;width:300px;height:260px;right:3%;top:8%;background:radial-gradient(circle,rgba(255,238,180,.3),transparent 70%);opacity:0;pointer-events:none}.studyDesk.lit:after{opacity:1}.lamp{position:absolute;z-index:8;right:-2%;top:-17px;color:#a40000;background:none;border:0;filter:drop-shadow(0 10px 7px rgba(0,0,0,.25));cursor:pointer}.lamp svg{width:145px;height:145px;stroke-width:1.25;fill:#b00000}.lamp span{position:absolute;right:11px;top:8px;background:white;color:var(--red);padding:4px 7px;border-radius:20px;font-size:10px}.sheet{position:absolute;width:78%;height:88%;background:#f5f0e7;box-shadow:0 12px 25px #4006}.backSheet{transform:rotate(5deg) translate(32px,5px)}.middleSheet{transform:rotate(-3deg) translate(-8px,9px);background-color:#fff;background-image:linear-gradient(#dce7ea 1px,transparent 1px),linear-gradient(90deg,#dce7ea 1px,transparent 1px);background-size:25px 25px}.notebook{position:relative;z-index:3;width:77%;min-height:400px;background:#fffdfa;color:var(--ink);padding:28px 34px 21px 45px;box-shadow:0 15px 25px #4307;transform:rotate(-1deg)}.rings{position:absolute;left:-12px;top:18px;height:90%;display:flex;flex-direction:column;justify-content:space-around}.rings i{display:block;width:31px;height:7px;border:2px solid #17120f;border-radius:99px;background:#ddd}.bookHeader{display:flex;justify-content:space-between;align-items:flex-start}.bookHeader h2{font:700 25px Georgia,serif;margin:0 0 5px}.bookHeader p{font-size:12px;margin:0}.bookHeader>span{font-size:11px;color:#777}.modes{display:grid;grid-template-columns:repeat(4,1fr);margin:18px 0 13px;border:1px solid #eadfd4;border-radius:9px;overflow:hidden}.modes button{padding:10px 6px;border:0;border-right:1px solid #eadfd4;background:#fff;display:flex;justify-content:center;gap:6px;align-items:center;font-size:11px;cursor:pointer}.modes button:last-child{border:0}.modes svg{width:15px}.modes .selected{color:var(--red);font-weight:700;background:#fff8f6}.lesson{display:grid;grid-template-columns:36% 64%;min-height:180px;position:relative}.lessonText{padding:10px 10px 0}.lessonText small,.fourWays small{color:var(--red);font-size:10px;font-weight:700}.lessonText h3,.fourWays h3{font:700 20px Georgia,serif;margin:8px 0}.lessonText p{font-size:12px;line-height:1.55;margin:0}.solar{position:relative;min-height:150px;overflow:hidden}.orbit{position:absolute;left:50%;top:50%;border:1px solid #cfbfb4;border-radius:50%;transform:translate(-50%,-50%) rotate(-8deg)}.o1{width:100px;height:45px}.o2{width:175px;height:80px}.o3{width:245px;height:115px}.sun{position:absolute;top:42%;transform:translate(-50%,-50%);width:68px;height:68px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle at 35% 30%,#ffd84f,#f29700 65%,#c94a00);font-size:25px;box-shadow:0 0 28px #ffbd4677;transition:left .15s}.planet{position:absolute;border-radius:50%;box-shadow:inset -3px -3px 4px #0004}.p1{width:12px;height:12px;background:#558fa2;left:18%;top:40%}.p2{width:16px;height:16px;background:#b88a68;right:14%;top:58%}.p3{width:10px;height:10px;background:#786957;right:29%;top:24%}.slider{position:absolute;left:40%;right:4%;bottom:0;font:12px cursive}.slider input{display:block;width:100%;accent-color:var(--red)}.fourWays{min-height:180px;padding:15px}.fourWays>div{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:22px}.fourWays button{padding:13px 5px;background:white;border:1px solid #e6d8cc;border-radius:8px;display:flex;flex-direction:column;align-items:center;gap:4px;font-size:11px}.fourWays button svg{width:20px}.fourWays .chosen{border-color:var(--red);color:var(--red);background:#fff5f3}.pager{display:flex;justify-content:center;align-items:center;gap:8px;margin-top:5px}.pager button{border:1px solid #dbc9bc;background:white;border-radius:50%;width:27px;height:27px;display:grid;place-items:center}.pager svg{width:14px}.pager span{font-size:10px;color:#777}.locked{font-size:9px;margin:2px 0 0}.subjectTabs{position:absolute;z-index:6;right:-1%;top:115px;display:flex;flex-direction:column;gap:7px}.subjectTabs button{width:96px;padding:12px 10px;border:0;border-radius:0 8px 8px 0;background:#f6efe7;box-shadow:0 5px 10px #4005;text-align:left;font-size:11px;cursor:pointer}.subjectTabs button.active{background:#fff;color:var(--red);font-weight:700;transform:translateX(8px)}
        .manifesto{margin:12px 4%;min-height:52px;border:1px solid var(--red);display:flex;align-items:center;justify-content:center;gap:34px;color:var(--red);font:700 15px monospace;letter-spacing:4px}.offers{display:grid;grid-template-columns:1fr 1fr;padding:18px 5% 28px;gap:0}.offer{display:grid;grid-template-columns:135px 1fr;gap:24px;padding:20px 7%}.offer+ .offer{border-left:1px solid #dfc8bd}.offerArt{position:relative;display:grid;place-items:center}.offerArt span{position:absolute;top:-5px;left:-5px;color:var(--red);font:700 34px Georgia,serif}.offerArt svg{width:105px;height:105px;stroke-width:1;color:#333}.offer h2{font:700 23px Georgia,serif;margin:5px 0 12px}.offer ul{list-style:none;padding:0;margin:0 0 14px}.offer li{display:flex;align-items:center;gap:8px;font-size:12px;margin:8px 0}.offer li svg{width:15px;color:var(--red);stroke-width:3}.offer a,.story a{color:var(--red);text-decoration:none;font-weight:700;font-size:12px;display:inline-flex;align-items:center;gap:8px}.offer a svg,.story a svg{width:16px}.story{border-top:1px solid #ead8cf;text-align:center;padding:18px}.loginNote{text-align:center;color:#777;font-size:11px;padding:0 10px 18px}footer{background:#740000;color:white;padding:18px 5%;display:flex;justify-content:space-between;font-size:12px}
        @media(max-width:900px){.navbar{height:64px}.brand{font-size:25px}.brand img{width:38px;height:38px}.menu{display:block}.navbar nav{display:none;position:absolute;top:64px;left:0;right:0;background:white;flex-direction:column;gap:0;box-shadow:0 8px 15px #0002}.navbar nav.open{display:flex}.navbar nav a{width:100%;padding:15px 6%;border-bottom:1px solid #eee}.navbar nav .active{border-bottom:1px solid #eee}.navbar .signup{border-radius:0}.hero{grid-template-columns:1fr;padding:46px 5% 55px;gap:35px}.heroCopy h1{font-size:clamp(46px,13vw,68px);letter-spacing:-2px}.scribble{display:none}.studyDesk{min-height:430px}.notebook{width:88%;padding-right:28px}.subjectTabs{right:-3%;}.offers{grid-template-columns:1fr}.offer+.offer{border-left:0;border-top:1px solid #dfc8bd}}
        @media(max-width:560px){.hero{padding-left:4%;padding-right:4%}.heroCopy h1{font-size:44px;line-height:.94}.tagline{font-size:15px}.actions{flex-direction:column;align-items:flex-start}.actions a{width:100%;justify-content:center}.studyDesk{min-height:410px}.lamp{right:-10px;top:-50px}.lamp svg{width:95px;height:95px}.notebook{width:91%;min-height:380px;padding:22px 17px 18px 32px}.bookHeader h2{font-size:20px}.modes button{font-size:0}.modes button svg{width:18px}.lesson{grid-template-columns:1fr}.lessonText p{display:none}.solar{min-height:165px}.slider{left:8%;right:5%}.subjectTabs{position:relative;top:auto;right:auto;z-index:7;display:grid;grid-template-columns:repeat(4,1fr);gap:4px;width:92%;margin:-5px auto 0}.subjectTabs button{width:auto;border-radius:5px;text-align:center;padding:10px 3px;font-size:9px}.subjectTabs button.active{transform:none}.manifesto{gap:8px;letter-spacing:1px;font-size:9px;margin-top:18px}.offer{grid-template-columns:78px 1fr;padding:22px 2%;gap:15px}.offerArt svg{width:65px;height:65px}.offerArt span{font-size:24px}.offer h2{font-size:20px}.offers{padding-left:3%;padding-right:3%}footer{flex-direction:column;align-items:center;gap:8px}.fourWays>div{grid-template-columns:repeat(2,1fr)}}
      `}</style>
    </main>
  );
}

function Offer({ kind, number, title, items }: { kind: "student" | "teacher"; number: string; title: string; items: string[] }) {
  const Icon = kind === "student" ? GraduationCap : MonitorPlay;
  return <article className="offer"><div className="offerArt"><span>{number}</span><Icon /></div><div><h2>{title}</h2><ul>{items.map(item => <li key={item}><Check />{item}</li>)}</ul><a href="#login">Explore as a {kind} <ArrowRight /></a></div></article>;
}
