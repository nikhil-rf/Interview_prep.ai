import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Instrument+Serif:ital@1&family=JetBrains+Mono:wght@400;500;700&display=swap');

.hireo {
  --bg: #05070a; --fg: #f4f6f8; --muted: #9aa1ad; --dim: #6b7280;
  --card: linear-gradient(180deg, #252932 0%, #181b22 100%);
  --card-b: rgba(255,255,255,.09);
  --inner: #12151b; --inner-b: rgba(255,255,255,.07); --sub: #1b1e26;
  --serif: #8fd6f5; --mono-accent: #38bdf8;
  --btn-bg: #fff; --btn-fg: #0b0f1a; --ghost-b: rgba(255,255,255,.14);
  --pill: rgba(255,255,255,.04); --pill-active: rgba(255,255,255,.12);
  --green: #34d399; --amber: #f59e0b; --track: rgba(255,255,255,.12);
  --yc: #eab308; --yb: rgba(234,179,8,.55); --ybg: transparent;
  --rc: #f43f5e; --rb: rgba(244,63,94,.55); --rbg: rgba(244,63,94,.06);
  --dl: linear-gradient(90deg, #ec4899, #e11d48); --dl-fg: #fff;
  --cta: linear-gradient(180deg, #1c1f27 0%, #0c2231 100%); --cta-b: rgba(255,255,255,.09); --cta-fg: #f4f6f8;
  --bar: linear-gradient(90deg, #d4d4d8, #f4f4f5);
  --divider: rgba(255,255,255,.08);
  --glow: radial-gradient(60% 40% at 50% 0%, rgba(56,189,248,.07), transparent 70%);
  --shadow: none;

  &[data-theme='light'] {
    --bg: #fbfcfd; --fg: #0a0d14; --muted: #5b6270; --dim: #9aa1ad;
    --card: #fff; --card-b: #e6e8ec; --inner: #fff; --inner-b: #eceef2; --sub: #fff;
    --serif: #0a0d14; --mono-accent: #4b5563;
    --btn-bg: #0b0f1a; --btn-fg: #fff; --ghost-b: #e2e5ea;
    --pill: #fff; --pill-active: #0b0f1a;
    --green: #059669; --amber: #f59e0b; --track: #e5e7eb;
    --ybg: #fefce8; --yc: #a16207; --yb: #fde68a;
    --rbg: #fff1f2; --rc: #be123c; --rb: #fecdd3;
    --dl: #0b0f1a;
    --cta: #0b0f1a; --cta-b: #0b0f1a; --cta-fg: #fff;
    --bar: #0b0f1a; --divider: #eceef2; --glow: none;
    --shadow: 0 1px 2px rgba(10,13,20,.04);
  }

  min-height: 100vh; background: var(--bg); background-image: var(--glow);
  color: var(--fg); font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased; line-height: 1.5;
  * { box-sizing: border-box; margin: 0; }
  button { font: inherit; color: inherit; background: none; border: 0; cursor: default; }
  button.is-live { cursor: pointer; }
  .mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
  .serif { font-family: 'Instrument Serif', serif; font-style: italic; font-weight: 400; color: var(--serif); }
}

.hireo .wrap { max-width: 940px; margin: 0 auto; padding: 0 0; }

/* nav */
.hireo .nav { display: flex; align-items: center; justify-content: space-between; height: 78px; margin-top: 22px; position: relative; }
.hireo[data-theme='light'] .nav { border-bottom: 1px solid var(--divider); margin-top: 0; height: 78px; padding-top: 0; }
.hireo .logo { display: flex; align-items: center; gap: 8px; font-family: 'JetBrains Mono', monospace; font-weight: 700; letter-spacing: .06em; font-size: 15px; }
.hireo .logo .tag { font-size: 8.5px; letter-spacing: .1em; padding: 6px 7px; border-radius: 4px; border: 1px solid rgba(56,189,248,.35); background: rgba(56,189,248,.12); color: var(--mono-accent); }
.hireo[data-theme='light'] .logo .tag { border-color: #e2e5ea; background: #f3f4f6; color: #6b7280; }
.hireo .menu { position: absolute; left: 50%; transform: translateX(-50%); display: flex; gap: 2px; padding: 4px; border-radius: 999px; border: 1px solid var(--ghost-b); background: var(--pill); }
.hireo .menu span { font-size: 13px; padding: 6px 13px; border-radius: 999px; color: var(--muted); white-space: nowrap; }
.hireo .menu span.on { background: var(--pill-active); color: var(--fg); }
.hireo[data-theme='light'] .menu span.on { background: #f1f3f6; color: #0a0d14; font-weight: 500; }
.hireo .nav-r { display: flex; align-items: center; gap: 12px; }
.hireo .btn { display: inline-flex; align-items: center; gap: 8px; height: 44px; padding: 0 22px; border-radius: 999px; font-size: 14px; font-weight: 500; background: var(--btn-bg); color: var(--btn-fg); transition: transform .2s; }
.hireo .btn.is-live:hover { transform: translateY(-1px); }
.hireo .btn.sm { height: 34px; padding: 0 16px; font-size: 13px; }
.hireo .btn.ghost { background: transparent; color: var(--fg); border: 1px solid var(--ghost-b); }
.hireo .btn svg { width: 14px; height: 14px; opacity: .7; }
.hireo .avatar { width: 34px; height: 34px; border-radius: 50%; font-size: 10px; font-weight: 600; display: grid; place-items: center; background: #1e2a3d; border: 1px solid rgba(255,255,255,.18); color: #cbd5e1; }
.hireo[data-theme='light'] .avatar { background: #f3f4f6; border-color: #e2e5ea; color: #0a0d14; }
.hireo .avatar.is-live:hover { box-shadow: 0 0 0 3px rgba(56,189,248,.25); }

/* hero */
.hireo .hero { text-align: center; padding-top: 62px; }
.hireo .badge { display: inline-flex; align-items: center; gap: 8px; padding: 7px 14px; border-radius: 999px; border: 1px solid var(--ghost-b); font-size: 10px; letter-spacing: .08em; color: var(--muted); background: var(--pill); }
.hireo .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--dim); display: inline-block; }
.hireo[data-theme='light'] .dot, .hireo .dot.g { background: var(--green); }
.hireo h1 { font-size: 58px; line-height: 1.08; letter-spacing: -.035em; font-weight: 500; margin-top: 34px; }
.hireo h1 .serif { font-size: 62px; letter-spacing: -.02em; display: block; line-height: 1; margin-top: 4px; }
.hireo .lead { max-width: 640px; margin: 28px auto 0; font-size: 16px; line-height: 1.7; color: var(--muted); }
.hireo .cta-row { display: flex; gap: 10px; justify-content: center; margin-top: 28px; }
.hireo .stats { display: flex; gap: 14px; justify-content: center; margin-top: 30px; font-size: 10.5px; color: var(--muted); }
.hireo .stats span { display: inline-flex; align-items: center; gap: 6px; }
.hireo[data-theme='light'] .stats span { padding: 6px 12px; border: 1px solid var(--ghost-b); border-radius: 999px; background: #fff; }
.hireo .stats svg { width: 9px; height: 9px; }

/* tabs */
.hireo .tabs { display: flex; width: fit-content; margin: 62px auto 36px; padding: 4px; border-radius: 999px; border: 1px solid var(--ghost-b); background: var(--pill); }
.hireo .tabs button { font-size: 12.5px; padding: 7px 16px; border-radius: 999px; color: var(--muted); display: inline-flex; align-items: center; gap: 8px; cursor: pointer; }
.hireo .tabs button.on { background: rgba(56,189,248,.1); color: var(--fg); box-shadow: inset 0 0 0 1px rgba(56,189,248,.35); }
.hireo[data-theme='light'] .tabs button.on { background: #0b0f1a; color: #fff; box-shadow: none; }

/* cards */
.hireo .card { background: var(--card); border: 1px solid var(--card-b); border-radius: 18px; box-shadow: var(--shadow); }
.hireo .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.hireo .step { padding: 22px 24px 18px; display: flex; flex-direction: column; min-height: 362px; }
.hireo .eyebrow { font-size: 10px; letter-spacing: .08em; color: var(--mono-accent); }
.hireo[data-theme='light'] .eyebrow { color: #4b5563; }
.hireo .step-h { display: flex; justify-content: space-between; align-items: flex-start; }
.hireo .step-h svg { width: 14px; height: 14px; color: var(--dim); margin-top: 2px; }
.hireo .step h3 { font-size: 19px; font-weight: 500; letter-spacing: -.015em; margin-top: 14px; }
.hireo .step p { font-size: 12.5px; line-height: 1.65; color: var(--muted); margin-top: 8px; }
.hireo .panel { margin-top: 14px; padding: 14px; border-radius: 12px; background: var(--inner); border: 1px solid var(--inner-b); }
.hireo .panel-h { display: flex; justify-content: space-between; align-items: center; font-size: 12.5px; padding-bottom: 12px; }
.hireo .panel-h b { font-weight: 500; display: flex; align-items: center; gap: 10px; }
.hireo .panel-h.mono b { font-size: 11px; font-weight: 700; }
.hireo .panel-h.line { border-bottom: 1px solid var(--inner-b); padding-bottom: 12px; margin-bottom: 14px; }
.hireo .chip { font-size: 9.5px; padding: 4px 9px; border-radius: 4px; background: rgba(255,255,255,.07); color: var(--muted); }
.hireo[data-theme='light'] .chip { background: #f3f4f6; border: 1px solid #e5e7eb; }
.hireo .chip.b { background: rgba(56,189,248,.12); color: var(--mono-accent); border: 1px solid rgba(56,189,248,.3); }
.hireo[data-theme='light'] .chip.b { background: #f3f4f6; color: #4b5563; border-color: #e5e7eb; }
.hireo .chip.gr { background: rgba(52,211,153,.1); color: var(--green); border: 1px solid rgba(52,211,153,.25); display: inline-flex; gap: 6px; align-items: center; }
.hireo[data-theme='light'] .chip.gr { background: #fff; border-color: #e5e7eb; }
.hireo .two { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.hireo .sub { padding: 11px 12px; border-radius: 8px; background: var(--sub); border: 1px solid var(--inner-b); }
.hireo .sub .l { display: flex; justify-content: space-between; font-size: 8.5px; letter-spacing: .06em; color: var(--dim); }
.hireo .sub .l em { font-style: normal; font-weight: 700; color: var(--green); }
.hireo .sub .l em.a { color: var(--amber); }
.hireo .sub b { display: block; font-size: 12.5px; font-weight: 500; margin: 7px 0 3px; }
.hireo .sub small { font-size: 10.5px; color: var(--dim); }
.hireo .bar-box { padding: 12px; border: 1px solid var(--inner-b); border-radius: 8px; background: var(--sub); }
.hireo .bar-row, .hireo .bar-meta { display: flex; justify-content: space-between; font-size: 10.5px; color: var(--muted); }
.hireo .bar-meta { color: var(--dim); font-size: 9.5px; margin-top: 12px; }
.hireo .bar-meta .g { color: var(--green); }
.hireo .bar { height: 5px; border-radius: 99px; background: var(--track); margin-top: 12px; overflow: hidden; }
.hireo .bar i { display: block; height: 100%; width: 0; border-radius: 99px; background: var(--bar); }
.hireo .foot { margin-top: auto; padding-top: 14px; display: flex; justify-content: space-between; font-size: 12px; border-top: 1px solid transparent; }
.hireo[data-theme='light'] .foot { border-top-color: var(--divider); }
.hireo .foot span:last-child { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--dim); }
.hireo .foot span:first-child { color: var(--fg); }

/* engine */
.hireo .engine { margin-top: 18px; padding: 24px 28px 28px; }
.hireo .engine-h { display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 20px; border-bottom: 1px solid transparent; }
.hireo[data-theme='light'] .engine-h { border-bottom-color: var(--divider); }
.hireo .tagbox { display: inline-block; font-size: 9px; letter-spacing: .06em; padding: 4px 8px; border-radius: 3px; background: rgba(255,255,255,.07); color: var(--dim); border: 1px solid var(--inner-b); }
.hireo .engine h2 { font-size: 23px; font-weight: 500; letter-spacing: -.02em; margin-top: 10px; }
.hireo .engine-btns { display: flex; gap: 8px; }
.hireo .engine-btns .btn { height: 32px; font-size: 12px; padding: 0 14px; border-radius: 6px; }
.hireo .engine-btns .btn.ghost { background: rgba(255,255,255,.05); }
.hireo[data-theme='light'] .engine-btns .btn.ghost { background: #fff; }
.hireo .win { margin-top: 22px; padding: 22px 22px 0; border-radius: 14px; background: var(--inner); border: 1px solid var(--inner-b); }
.hireo .win-bar { display: flex; justify-content: space-between; align-items: center; font-size: 10.5px; color: var(--dim); padding-bottom: 24px; }
.hireo .win-bar .dots { display: flex; gap: 6px; margin-right: 14px; }
.hireo .win-bar .dots i { width: 9px; height: 9px; border-radius: 50%; }
.hireo .win-bar > div:first-child { display: flex; align-items: center; }
.hireo .win-bar > div:last-child { display: flex; align-items: center; gap: 8px; }
.hireo .win-body { display: grid; grid-template-columns: 200px 1fr 200px; min-height: 480px; }
.hireo .side { padding: 6px 16px 20px 0; border-right: 1px solid var(--inner-b); display: flex; flex-direction: column; }
.hireo .side .t, .hireo .gaps-t { font-size: 9.5px; letter-spacing: .08em; color: var(--dim); }
.hireo .side .t { margin: 4px 0 14px 8px; }
.hireo .nav-i { display: flex; align-items: center; gap: 10px; padding: 11px 12px; border-radius: 8px; font-size: 12.5px; color: var(--muted); margin-bottom: 4px; border: 1px solid transparent; }
.hireo .nav-i svg { width: 14px; height: 14px; }
.hireo .nav-i.on { color: #fb7185; border-color: rgba(244,63,94,.4); background: rgba(244,63,94,.1); }
.hireo[data-theme='light'] .nav-i.on { color: #be123c; background: #fff1f2; border-color: #fecdd3; }
.hireo .dl { margin-top: auto; height: 36px; border-radius: 8px; background: var(--dl); color: var(--dl-fg); font-size: 12px; font-weight: 500; display: flex; align-items: center; justify-content: center; gap: 8px; }
.hireo[data-theme='light'] .dl svg { color: #facc15; }
.hireo .main { padding: 0 18px 20px; }
.hireo .main h4 { font-size: 18px; font-weight: 500; letter-spacing: -.01em; display: flex; align-items: center; gap: 12px; margin: 2px 0 18px; }
.hireo .main h4 .chip { padding: 5px 10px; border-radius: 99px; border: 1px solid var(--inner-b); }
.hireo .q { display: flex; gap: 14px; padding: 18px 18px; border-radius: 10px; border: 1px solid var(--inner-b); background: var(--sub); margin-bottom: 14px; font-size: 13px; line-height: 1.5; position: relative; }
.hireo .q .n { flex: none; height: 22px; padding: 0 7px; display: grid; place-items: center; font-size: 9.5px; font-weight: 700; color: #fb7185; background: rgba(244,63,94,.12); border: 1px solid rgba(244,63,94,.4); border-radius: 5px; margin-top: 1px; }
.hireo[data-theme='light'] .q .n { color: #be123c; background: #fff1f2; border-color: #fecdd3; }
.hireo .q p { flex: 1; padding-right: 26px; }
.hireo .q svg { position: absolute; right: 18px; top: 22px; width: 14px; height: 14px; color: var(--dim); }
.hireo .score-col { padding: 0 0 20px 18px; border-left: 1px solid var(--inner-b); }
.hireo .score-col .gaps-t { margin: 4px 0 14px 0; display: block; }
.hireo .score { border: 1px solid var(--inner-b); border-radius: 10px; padding: 16px 0 14px; text-align: center; background: var(--sub); margin-bottom: 26px; }
.hireo .ring { position: relative; width: 84px; height: 84px; margin: 0 auto 10px; }
.hireo .ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.hireo .ring b { position: absolute; inset: 0; display: grid; place-items: center; font-size: 20px; font-weight: 600; }
.hireo .score small { font-size: 12px; font-weight: 500; color: var(--green); }
.hireo .gap { display: block; font-size: 10.5px; padding: 8px 10px; border-radius: 4px; margin-bottom: 8px; border: 1px solid var(--yb); color: var(--yc); background: var(--ybg); line-height: 1.4; }
.hireo .gap.r { border-color: var(--rb); color: var(--rc); background: var(--rbg); }

/* features */
.hireo .grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 18px; }
.hireo .feat { padding: 22px 24px 16px; border-radius: 14px; min-height: 206px; display: flex; flex-direction: column; }
.hireo .ico { width: 32px; height: 32px; border-radius: 8px; display: grid; place-items: center; background: rgba(255,255,255,.06); border: 1px solid var(--inner-b); color: var(--mono-accent); }
.hireo[data-theme='light'] .ico { background: #f9fafb; color: #4b5563; }
.hireo .ico svg { width: 13px; height: 13px; }
.hireo .feat h5 { font-size: 14px; font-weight: 500; margin-top: 18px; }
.hireo .feat p { font-size: 12px; line-height: 1.6; color: var(--muted); margin-top: 8px; }
.hireo .feat .foot { padding-top: 14px; border-top: 1px solid var(--inner-b); font-size: 10px; color: var(--dim); display: flex; gap: 8px; align-items: center; justify-content: flex-start; }
.hireo .feat .foot span:last-child { font-size: 10px; }

/* cta */
.hireo .final { margin-top: 18px; padding: 44px 0 40px; text-align: center; border-radius: 22px; background: var(--cta); border: 1px solid var(--cta-b); color: var(--cta-fg); box-shadow: ${'0 20px 40px -20px rgba(0,0,0,.25)'}; }
.hireo .final .tagbox { background: rgba(56,189,248,.08); color: var(--mono-accent); border: 1px solid rgba(56,189,248,.3); border-radius: 99px; padding: 5px 12px; }
.hireo[data-theme='light'] .final .tagbox { background: transparent; color: #94a3b8; border-color: rgba(255,255,255,.14); }
.hireo .final h2 { font-size: 36px; font-weight: 500; letter-spacing: -.03em; line-height: 1.2; margin-top: 28px; }
.hireo .final h2 .serif { color: ${'#cbd5e1'}; font-size: 38px; }
.hireo[data-theme='dark'] .final h2 .serif { color: #e5e7eb; }
.hireo .final p { max-width: 520px; margin: 18px auto 0; font-size: 14.5px; line-height: 1.6; color: #9aa1ad; }
.hireo .final .cta-row { margin-top: 28px; }
.hireo .final .btn { background: #fff; color: #0b0f1a; }
.hireo .final .btn.ghost { background: transparent; color: #fff; border-color: rgba(255,255,255,.14); }
.hireo[data-theme='light'] .final .btn.ghost { background: rgba(255,255,255,.04); }

.hireo footer { display: flex; justify-content: space-between; align-items: center; margin-top: 36px; padding: 24px 0 48px; border-top: 1px solid var(--divider); font-size: 10.5px; color: var(--dim); }
.hireo footer nav { display: flex; gap: 20px; font-size: 12px; color: var(--muted); }
.hireo footer .serif { color: var(--dim); font-size: 12px; }

@media (max-width: 960px) {
  .hireo .wrap { padding: 0 20px; }
  .hireo .menu { display: none; }
  .hireo h1 { font-size: 40px; } .hireo h1 .serif { font-size: 44px; }
  .hireo .grid2, .hireo .grid3 { grid-template-columns: 1fr; }
  .hireo .win-body { grid-template-columns: 1fr; }
  .hireo .side, .hireo .score-col { border: 0; padding: 0; }
  .hireo .side .dl { margin-top: 16px; }
  .hireo .stats, .hireo .tabs { flex-wrap: wrap; justify-content: center; }
  .hireo .engine-h { flex-direction: column; align-items: flex-start; gap: 16px; }
  .hireo .final { padding: 40px 20px; } .hireo .final h2 { font-size: 28px; }
}
@media (prefers-reduced-motion: reduce) { .hireo * { transition: none !important; } }
`;

/* ---------- tiny icons ---------- */
const I = {
  doc: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M4 1.5h5l3 3V14H4z" /><path d="M9 1.5v3h3M6 8h4M6 10.5h4" /></svg>,
  swap: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M3 5.5h10M10.5 3 13 5.5 10.5 8M13 10.5H3M5.5 8 3 10.5 5.5 13" /></svg>,
  bolt: <svg viewBox="0 0 16 16" fill="currentColor"><path d="M9 1 3 9h4l-1 6 6-8H8z" /></svg>,
  lock: <svg viewBox="0 0 16 16" fill="currentColor"><path d="M4 7V5a4 4 0 0 1 8 0v2h1v7H3V7zm2 0h4V5a2 2 0 0 0-4 0z" /></svg>,
  code: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="m5.5 4.5-4 3.5 4 3.5M10.5 4.5l4 3.5-4 3.5" /></svg>,
  chat: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M2 8a6 5 0 1 1 2.5 4L2 13.5z" /></svg>,
  warn: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M8 2 1.5 13.5h13zM8 6.5v3.5M8 11.7v.1" /></svg>,
  chev: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="m4 6 4 4 4-4" /></svg>,
  star: <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 1 9.6 6.4 15 8 9.6 9.6 8 15 6.4 9.6 1 8 6.4 6.4z" /></svg>,
  asterisk: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M8 2v12M2.8 5l10.4 6M2.8 11l10.4-6" /></svg>,
  history: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M2.5 8a5.5 5.5 0 1 0 1.8-4M2.5 2.5v3h3M8 5v3.2l2 1.3" /></svg>,
};

const QUESTIONS = [
  'Since you are learning TypeScript, can you explain the primary advantages of using Interfaces over Types in a large-scale React application?',
  'The job description requires experience with PostgreSQL and MongoDB. How do you decide which database to use for a SaaS analytics feature?',
  'Explain how you would containerize a Node.js microservice and what the benefits of using Kubernetes would be for scaling it.',
];
const GAPS = [['TypeScript', 'y'], ['AWS (Production Experience)', 'r'], ['Kubernetes', 'r'], ['System Design / Microservices', 'y']];
const TABS = ['Live Simulation', 'Skill Gap Matrix', 'STAR Behavioral', 'Roadmap Sync'];
const CIRC = 2 * Math.PI * 38;

export default function HireoLanding({
  onRegister = () => { window.location.href = '/register'; },
  onLogin = () => { window.location.href = '/login'; },
  theme, // 'dark' | 'light' — defaults to the OS setting
}) {
  const root = useRef(null);
  const [tab, setTab] = useState(0);
  const [auto] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  );
  const mode = theme || auto;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) {
        gsap.set('.bar i', { width: '94%' });
        gsap.set('.ring-arc', { strokeDashoffset: CIRC * 0.32 });
        return;
      }
      // one orchestrated hero entrance
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.nav', { y: -16, opacity: 0, duration: 0.6 })
        .from('.hero > *', { y: 22, opacity: 0, duration: 0.7, stagger: 0.09 }, '-=0.3');

      // panels reveal on scroll
      gsap.utils.toArray('.card, .final').forEach((el) =>
        gsap.from(el, { y: 28, opacity: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
      );
      // live rubric bar
      gsap.to('.bar i', { width: '94%', duration: 1.4, ease: 'power2.out', scrollTrigger: { trigger: '.bar', start: 'top 90%', once: true } });
      // score ring + counter
      const n = { v: 0 };
      const num = root.current.querySelector('.score-num');
      gsap.fromTo('.ring-arc', { strokeDashoffset: CIRC }, {
        strokeDashoffset: CIRC * 0.32, duration: 1.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.ring', start: 'top 90%', once: true },
      });
      gsap.to(n, {
        v: 68, duration: 1.6, ease: 'power3.out', onUpdate: () => { num.textContent = Math.round(n.v); },
        scrollTrigger: { trigger: '.ring', start: 'top 90%', once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const Register = ({ className = '', children = 'Get Started Free', arrow }) => (
    <button className={`btn is-live ${className}`} onClick={onRegister}>{children}{arrow && <span>→</span>}</button>
  );

  return (
    <div className="hireo" data-theme={mode} ref={root}>
      <style>{styles}</style>
      <div className="wrap">
        {/* NAV */}
        <header className="nav">
          <div className="logo">HIREO <span className="tag">PRO</span></div>
          <div className="menu">
            {['Overview', 'Live Prep', 'Question Bank', 'Skill Matrix', 'Roadmap'].map((m, i) => <span key={m} className={i === 0 ? 'on' : ''}>{m}</span>)}
          </div>
          <div className="nav-r">
            <Register className="sm" />
            <button className="avatar is-live" onClick={onLogin} aria-label="Log in" title="Log in">JS</button>
          </div>
        </header>

        {/* HERO */}
        <section className="hero">
          <div className="badge mono"><i className="dot g" />START PREP // AI INTERVIEW READINESS ENGINE</div>
          <h1>Walk into every interview.<span className="serif">Ship your career.</span></h1>
          <p className="lead">Hireo is a real-time AI interview preparation workspace designed for engineering candidates to analyze job descriptions, practice realistic technical and behavioral loops, and close skill gaps with instant scoring.</p>
          <div className="cta-row">
            <Register arrow />
            <button className="btn ghost">{I.doc} View sample report</button>
          </div>
          <div className="stats mono">
            <span><i className="dot g" />99.8% Question Accuracy</span>
            <span style={{ color: 'inherit' }}><b style={{ color: '#facc15', display: 'inline-flex' }}>{I.bolt}</b>&lt;1.2s Real-time Scoring</span>
            <span>{I.lock}SOC-2 &amp; AES-256 Private</span>
          </div>
        </section>

        <div className="tabs">
          {TABS.map((t, i) => (
            <button key={t} className={tab === i ? 'on' : ''} onClick={() => setTab(i)}>
              {i === 0 && <i className="dot" style={{ background: 'currentColor', opacity: .8 }} />}{t}
            </button>
          ))}
        </div>

        {/* STEP CARDS */}
        <div className="grid2">
          <article className="card step">
            <div className="step-h"><span className="eyebrow mono">STEP 01 // ORCHESTRATION</span>{I.doc}</div>
            <h3>Instant Resume &amp; JD Analysis</h3>
            <p>Spin up zero-friction interview pipelines. Parse competencies, map tech-stack rubrics, and cluster high-impact gaps with deterministic scoring.</p>
            <div className="panel">
              <div className="panel-h"><b><i className="dot" />Parsed Candidate Profile</b><span className="chip mono">Target: Senior Full Stack</span></div>
              <div className="two">
                <div className="sub"><div className="l mono"><span>STRONG MATCH</span><em>88%</em></div><b>Distributed Architecture</b><small>Kafka, PostgreSQL, Node</small></div>
                <div className="sub"><div className="l mono"><span>IDENTIFIED GAP</span><em className="a">Priority 1</em></div><b>Raft Consensus &amp; CDC</b><small>3 probe questions queued</small></div>
              </div>
            </div>
            <div className="foot"><span>Open sample report →</span><span>Zero setup required</span></div>
          </article>

          <article className="card step">
            <div className="step-h"><span className="eyebrow mono">STEP 02 // REAL-TIME COHESION</span>{I.swap}</div>
            <h3>Zero-Latency Feedback &amp; Rubrics</h3>
            <p>Powered by deterministic rubric engines. Even during nuanced edge-case responses, your live session evaluates technical rigor, trade-offs, and communication.</p>
            <div className="panel">
              <div className="panel-h mono line"><b>Live Operational Rubric</b><span className="chip gr mono"><i className="dot g" />Evaluation Active</span></div>
              <div className="bar-box mono">
                <div className="bar-row"><span>Inference Latency: 18ms</span><span className="chip b">BERT v4.2</span></div>
                <div className="bar"><i /></div>
                <div className="bar-meta"><span>Depth Score: 9.4/10</span><span>Clarity: High</span><span className="g">STAR Verified</span></div>
              </div>
            </div>
            <div className="foot"><span>Explore rubric architecture →</span><span>Deterministic scoring</span></div>
          </article>
        </div>

        {/* ENGINE */}
        <section className="card engine">
          <div className="engine-h">
            <div><span className="tagbox mono">CENTRAL COMMAND</span><h2>Intelligent Technical &amp; Behavioral Prep Engine</h2></div>
            <div className="engine-btns"><button className="btn ghost">Filter by Topic</button><Register className="" >+ New Prep Session</Register></div>
          </div>
          <div className="win">
            <div className="win-bar mono">
              <div><span className="dots"><i style={{ background: '#ef4444' }} /><i style={{ background: '#eab308' }} /><i style={{ background: '#22c55e' }} /></span>hireo.app / candidate / analysis-report</div>
              <div>Report Status: <span className="chip gr mono"><i className="dot g" />Ready</span></div>
            </div>
            <div className="win-body">
              <aside className="side">
                <span className="t mono">SECTIONS</span>
                <div className="nav-i on">{I.code}Technical Questions</div>
                <div className="nav-i">{I.chat}Behavioral Questions</div>
                <div className="nav-i">{I.warn}Road Map</div>
                <div className="dl"><span style={{ width: 12, display: 'inline-flex' }}>{I.star}</span>Download Resume</div>
              </aside>
              <div className="main">
                <h4>Technical Questions <span className="chip mono">3 questions</span></h4>
                {QUESTIONS.map((q, i) => (<div className="q" key={i}><span className="n mono">Q{i + 1}</span><p>{q}</p>{I.chev}</div>))}
              </div>
              <aside className="score-col">
                <span className="gaps-t mono">MATCH SCORE</span>
                <div className="score">
                  <div className="ring">
                    <svg viewBox="0 0 84 84">
                      <circle cx="42" cy="42" r="38" fill="none" stroke="var(--track)" strokeWidth="4" />
                      <circle className="ring-arc" cx="42" cy="42" r="38" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={CIRC * 0.32} />
                    </svg>
                    <b><span className="score-num">68</span></b>
                  </div>
                  <small>Strong match for this role</small>
                </div>
                <span className="gaps-t mono" style={{ display: 'block', marginBottom: 12 }}>SKILL GAPS</span>
                {GAPS.map(([g, c]) => <span key={g} className={`gap mono ${c}`}>{g}</span>)}
              </aside>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <div className="grid3">
          {[
            [I.bolt, 'Sub-second AI Rubrics', 'Optimized lightweight payloads deliver real-time evaluation and rubric suggestions with sub-second feedback during practice.', '18ms event loop', true],
            [I.asterisk, 'Role-Specific Taxonomies', 'Strictly tailored question curves calibrated for Senior, Staff, and Principal engineering ladders across FAANG & tier-one startups.', 'L4 – L7 Calibrated'],
            [I.history, 'Export ATS Resume & Roadmap', 'Generate tailored 14-day study sprint plans. Synchronize directly to Notion, Google Calendar, or clean Markdown files.', 'REST & Notion Sync'],
          ].map(([ic, t, d, f, dot]) => (
            <article key={t} className="card feat">
              <div className="ico">{ic}</div><h5>{t}</h5><p>{d}</p>
              <div className="foot mono" style={{ marginTop: 'auto' }}>{dot && <i className="dot" />}<span>{f}</span></div>
            </article>
          ))}
        </div>

        {/* FINAL CTA */}
        <section className="final">
          <span className="tagbox mono">ELEVATE YOUR INTERVIEW STANDARD</span>
          <h2>Build with poise. <span className="serif">Interview in steady<br />cadence.</span></h2>
          <p>Join over 24,000 software engineers landing offers at top technology companies without bloated enterprise prep.</p>
          <div className="cta-row"><Register /><button className="btn ghost">Explore interactive demo</button></div>
        </section>

        <footer>
          <span className="mono">© 2026 Hireo Technologies Inc. • <span className="serif">Poise &amp; Focus.</span></span>
          <nav><span>Docs</span><span>Status</span><span>API</span><span>Privacy</span></nav>
        </footer>
      </div>
    </div>
  );
}