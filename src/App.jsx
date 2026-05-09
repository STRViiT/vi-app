import { useState, useRef, useEffect } from "react";
import { supabase } from "./supabase";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";

const TOPICS = [
  { id: 1, label: "Democracy vs Authoritarianism", category: "Politics" },
  { id: 2, label: "Universal Basic Income", category: "Politics" },
  { id: 3, label: "Immigration Policy", category: "Politics" },
  { id: 4, label: "Gun Control", category: "Politics" },
  { id: 5, label: "Electoral College", category: "Politics" },
  { id: 6, label: "Free Speech Limits", category: "Politics" },
  { id: 7, label: "Capital Punishment", category: "Politics" },
  { id: 8, label: "Affirmative Action", category: "Politics" },
  { id: 9, label: "Welfare State", category: "Politics" },
  { id: 10, label: "Taxation & Redistribution", category: "Politics" },
  { id: 11, label: "Existence of God", category: "Religion" },
  { id: 12, label: "Creationism vs Evolution", category: "Religion" },
  { id: 13, label: "Morality Without Religion", category: "Religion" },
  { id: 14, label: "Afterlife", category: "Religion" },
  { id: 15, label: "Prayer in Schools", category: "Religion" },
  { id: 16, label: "Religious Freedom vs Civil Rights", category: "Religion" },
  { id: 17, label: "Atheism vs Agnosticism", category: "Religion" },
  { id: 18, label: "Free Will vs Determinism", category: "Philosophy" },
  { id: 19, label: "Meaning of Life", category: "Philosophy" },
  { id: 20, label: "Moral Relativism", category: "Philosophy" },
  { id: 21, label: "AI Will Replace Jobs", category: "Technology" },
  { id: 22, label: "Social Media Is Harmful", category: "Technology" },
  { id: 23, label: "Nuclear Energy", category: "Technology" },
  { id: 24, label: "GMO Foods Are Safe", category: "Technology" },
  { id: 25, label: "Space Exploration Priority", category: "Technology" },
  { id: 26, label: "Crypto & Blockchain Future", category: "Technology" },
  { id: 27, label: "Surveillance Capitalism", category: "Technology" },
  { id: 28, label: "Electric Vehicles Mandate", category: "Technology" },
  { id: 29, label: "Gene Editing Ethics", category: "Technology" },
  { id: 30, label: "Internet Regulation", category: "Technology" },
  { id: 31, label: "Alcohol Is Harmful", category: "Health" },
  { id: 32, label: "Veganism Is Healthier", category: "Health" },
  { id: 33, label: "Mandatory Vaccination", category: "Health" },
  { id: 34, label: "Marijuana Legalization", category: "Health" },
  { id: 35, label: "Universal Healthcare", category: "Health" },
  { id: 36, label: "Mental Health Stigma", category: "Health" },
  { id: 37, label: "Fast Food Should Be Taxed", category: "Health" },
  { id: 38, label: "Intermittent Fasting Works", category: "Health" },
  { id: 39, label: "Coffee Is Good For You", category: "Health" },
  { id: 40, label: "Alternative Medicine", category: "Health" },
  { id: 41, label: "Cancel Culture", category: "Society" },
  { id: 42, label: "Gender Is a Social Construct", category: "Society" },
  { id: 43, label: "Feminism Today", category: "Society" },
  { id: 44, label: "Social Media & Mental Health", category: "Society" },
  { id: 45, label: "Patriotism vs Globalism", category: "Society" },
  { id: 46, label: "Traditional Family Values", category: "Society" },
  { id: 47, label: "Meritocracy Is a Myth", category: "Society" },
  { id: 48, label: "Art Has No Objective Value", category: "Society" },
  { id: 49, label: "Animal Rights vs Human Rights", category: "Society" },
  { id: 50, label: "Privilege & Systemic Racism", category: "Society" },
  { id: 51, label: "Capitalism vs Socialism", category: "Economy" },
  { id: 52, label: "Minimum Wage Increase", category: "Economy" },
  { id: 53, label: "Globalization Is Good", category: "Economy" },
  { id: 54, label: "Billionaires Should Exist", category: "Economy" },
  { id: 55, label: "Gig Economy Workers Rights", category: "Economy" },
  { id: 56, label: "Rent Control", category: "Economy" },
  { id: 57, label: "Student Loan Forgiveness", category: "Economy" },
  { id: 58, label: "Outsourcing Jobs", category: "Economy" },
  { id: 59, label: "Unions Are Necessary", category: "Economy" },
  { id: 60, label: "Open Borders Economics", category: "Economy" },
  { id: 61, label: "Climate Change Is Urgent", category: "Environment" },
  { id: 62, label: "Veganism Saves the Planet", category: "Environment" },
  { id: 63, label: "Nuclear Over Renewables", category: "Environment" },
  { id: 64, label: "Carbon Tax", category: "Environment" },
  { id: 65, label: "Fast Fashion Ban", category: "Environment" },
  { id: 66, label: "Deforestation Policy", category: "Environment" },
  { id: 67, label: "Overpopulation Crisis", category: "Environment" },
  { id: 68, label: "Animal Agriculture Impact", category: "Environment" },
  { id: 69, label: "Plastic Bans Effectiveness", category: "Environment" },
  { id: 70, label: "Geoengineering Solutions", category: "Environment" },
  { id: 71, label: "Homework Should Be Banned", category: "Education" },
  { id: 72, label: "University Degrees Worth It", category: "Education" },
  { id: 73, label: "Sex Ed in Schools", category: "Education" },
  { id: 74, label: "Standardized Tests Are Fair", category: "Education" },
  { id: 75, label: "Private vs Public Schools", category: "Education" },
  { id: 76, label: "Critical Race Theory in Schools", category: "Education" },
  { id: 77, label: "Religious Schools Public Funding", category: "Education" },
  { id: 78, label: "Phones Banned in Class", category: "Education" },
  { id: 79, label: "School Uniforms", category: "Education" },
  { id: 80, label: "Homeschooling Effectiveness", category: "Education" },
  { id: 81, label: "Video Games Cause Violence", category: "Entertainment" },
  { id: 82, label: "Streaming Killed Cinema", category: "Entertainment" },
  { id: 83, label: "Sports Stars Are Overpaid", category: "Entertainment" },
  { id: 84, label: "Reality TV Is Harmful", category: "Entertainment" },
  { id: 85, label: "AI-Generated Art Is Real Art", category: "Entertainment" },
  { id: 86, label: "Music Today Is Worse", category: "Entertainment" },
  { id: 87, label: "Censorship in Movies", category: "Entertainment" },
  { id: 88, label: "Celebrity Influence on Youth", category: "Entertainment" },
  { id: 89, label: "Books vs Audiobooks", category: "Entertainment" },
  { id: 90, label: "Esports Are Real Sports", category: "Entertainment" },
  { id: 91, label: "Pineapple on Pizza", category: "Everyday" },
  { id: 92, label: "Morning vs Night People", category: "Everyday" },
  { id: 93, label: "Cats vs Dogs", category: "Everyday" },
  { id: 94, label: "Working from Home", category: "Everyday" },
  { id: 95, label: "4-Day Work Week", category: "Everyday" },
  { id: 96, label: "Paper Books vs E-Readers", category: "Everyday" },
  { id: 97, label: "Tipping Culture", category: "Everyday" },
  { id: 98, label: "Open Relationships", category: "Everyday" },
  { id: 99, label: "Minimalism as a Lifestyle", category: "Everyday" },
  { id: 100, label: "Social Media Detox Necessity", category: "Everyday" },
];

const LANGUAGES = [
  { code: "en", label: "English", flag: "GB" },
  { code: "de", label: "Deutsch", flag: "DE" },
  { code: "fr", label: "Français", flag: "FR" },
  { code: "ru", label: "Русский", flag: "RU" },
  { code: "pt", label: "Português", flag: "BR" },
  { code: "es", label: "Español", flag: "ES" },
  { code: "ar", label: "العربية", flag: "SA" },
];

const CATEGORIES = [...new Set(TOPICS.map((t) => t.category))];
const FORMATS = [{ id: "1v1", label: "1 vs 1" }, { id: "3v3", label: "3 vs 3" }];
const DURATIONS = [
  { id: 10, label: "Blitz", desc: "10 min" },
  { id: 40, label: "Standard", desc: "40 min" },
  { id: 180, label: "Long", desc: "3 hrs" },
];

const SHOP = {
  sigs: [
    { id: "boost_1h", name: "Room Boost", price: 200, desc: "Top of list for 1hr" },
    { id: "color_red", name: "Red Chat", price: 300, desc: "Red message color" },
    { id: "emoji_pack", name: "Emoji Pack", price: 200, desc: "Chat reactions" },
  ],
  deps: [
    { id: "tag_debater", name: "Debater Tag", price: 100, desc: "Tag next to name" },
    { id: "frame_gold", name: "Gold Frame", price: 500, desc: "Golden avatar frame" },
    { id: "tag_custom", name: "Custom Tag", price: 1000, desc: "Your own tag text" },
  ]
};

// ---- SVG ICONS ----
const Icons = {
  Trophy: () => (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path d="M8 11c-2.76 0-5-2.24-5-5V2h10v4c0 2.76-2.24 5-5 5z" stroke="#e63946" strokeWidth="1.4" fill="none"/>
      <path d="M3 4H1.5C1.5 6.5 3 7.5 3 7.5M13 4h1.5c0 2.5-1.5 3.5-1.5 3.5M8 11v2M5 13h6" stroke="#e63946" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  Skull: () => (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <ellipse cx="8" cy="7" rx="5" ry="5.5" stroke="#555" strokeWidth="1.4"/>
      <circle cx="6" cy="7" r="1.2" fill="#555"/>
      <circle cx="10" cy="7" r="1.2" fill="#555"/>
      <path d="M6 13h4M8 11v2M6 13l-.5 1.5M10 13l.5 1.5" stroke="#555" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Star: () => (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path d="M8 2l1.5 4h4l-3.3 2.4 1.3 4L8 10.3 4.5 12.4l1.3-4L2.5 6h4L8 2z" stroke="#888" strokeWidth="1.3" fill="none" strokeLinejoin="round"/>
    </svg>
  ),
  Coin: () => (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path d="M10.5 5.5C10.5 4.1 9.4 3 8 3c-1.4 0-2.5 1-2.5 2.2 0 1.3 1 1.8 2.5 2.3 1.5.5 2.5 1.1 2.5 2.3C10.5 11 9.4 12 8 12c-1.4 0-2.5-1-2.5-2.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <line x1="8" y1="1.5" x2="8" y2="14.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="6" y1="4" x2="10" y2="4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="6" y1="11.5" x2="10" y2="11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Diamond: () => (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path d="M5 2.5h4.5C11.4 2.5 13 4 13 7.5S11.4 13 9.5 13H5V2.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none"/>
      <line x1="7" y1="1" x2="7" y2="15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="4.5" y1="5" x2="9.5" y2="5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="4.5" y1="10.5" x2="10" y2="10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Home: () => (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M2 7.5L8 2l6 5.5V14H10.5V10h-5v4H2V7.5z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
    </svg>
  ),
  Plus: () => (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  Lounge: () => (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M2 10.5C2 9.1 3.1 8 4.5 8h7c1.4 0 2.5 1.1 2.5 2.5V12H2v-1.5z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <circle cx="5" cy="5" r="2" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <circle cx="11" cy="5" r="2" stroke="currentColor" strokeWidth="1.4" fill="none"/>
    </svg>
  ),
  Shop: () => (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M2 2.5h12l-1.5 8H3.5L2 2.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none"/>
      <path d="M5.5 2.5C5.5 1.1 6.6 0 8 0s2.5 1.1 2.5 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <circle cx="6" cy="12.5" r="1" fill="currentColor"/>
      <circle cx="10" cy="12.5" r="1" fill="currentColor"/>
    </svg>
  ),
  Settings: () => (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M8 10.5A2.5 2.5 0 108 5.5a2.5 2.5 0 000 5z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <path d="M9.3 1.2l.5 1.6c.3.1.7.3 1 .5l1.6-.5 1.3 2.2-1.2 1.1c0 .3.1.6.1.9s0 .6-.1.9l1.2 1.1-1.3 2.2-1.6-.5c-.3.2-.6.4-1 .5l-.5 1.6H6.7l-.5-1.6a4 4 0 01-1-.5l-1.6.5-1.3-2.2 1.2-1.1c0-.3-.1-.6-.1-.9s0-.6.1-.9L2.3 5.5l1.3-2.2 1.6.5c.3-.2.6-.4 1-.5l.5-1.6h2.6z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  Mic: (p) => (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <rect x="5.5" y="1.5" width="5" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      {p?.off && <path d="M2 2l12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>}
      <path d="M3 8c0 2.76 2.24 5 5 5s5-2.24 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <path d="M8 13v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  Camera: (p) => (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      {p?.off
        ? <><path d="M2 2l12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><rect x="1" y="4" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="none"/><path d="M11 6l4-2v8l-4-2" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none"/></>
        : <><rect x="1" y="4" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="none"/><path d="M11 6l4-2v8l-4-2" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none"/></>
      }
    </svg>
  ),
  Users: () => (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <path d="M1 14c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <path d="M12 10c1.66 0 3 1.34 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  Eye: () => (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M1 8C2.5 4.5 5 3 8 3s5.5 1.5 7 5c-1.5 3.5-4 5-7 5S2.5 11.5 1 8z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" fill="none"/>
    </svg>
  ),
  Send: () => (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M14 2L1 7.5 6 8.5M14 2L9 15 6 8.5M14 2L6 8.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  ),
  Play: () => (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path d="M4 2l10 6-10 6V2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  Scale: () => (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path d="M8 2v12M2 2h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M2 2l3 6-3 .5M14 2l-3 6 3 .5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 8.5c0 1.38 1.34 2.5 3 2.5s3-1.12 3-2.5M8 8.5c0 1.38 1.34 2.5 3 2.5s3-1.12 3-2.5" stroke="currentColor" strokeWidth="1.3" fill="none"/>
    </svg>
  ),
  Flag: () => (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path d="M3 2v12M3 2h9l-2 4 2 4H3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  Hash: () => (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <path d="M4 2l-2 12M14 2l-2 12M1 6h14M1 10h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Search: () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 10l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Sparkle: () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M8 1v3M8 12v3M1 8h3M12 8h3M3.5 3.5l2 2M10.5 10.5l2 2M10.5 3.5l-2 2M5.5 10.5l-2 2" stroke="#e63946" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="8" r="2" stroke="#e63946" strokeWidth="1.3" fill="none"/>
    </svg>
  ),
  Back: () => (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Close: () => (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Edit: () => (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path d="M11 2l3 3-9 9H2v-3L11 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  Lock: () => (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <rect x="3" y="7" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.4" fill="none"/>
    </svg>
  ),
  Kick: () => (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <circle cx="6" cy="5" r="3" stroke="currentColor" strokeWidth="1.4" fill="none"/>
      <path d="M1 14c0-2.76 2.24-5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <path d="M11 10l4-2M11 10l4 2M11 10h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  ExternalLink: () => (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <path d="M7 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <path d="M10 2h4v4M9 7l5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

// ---- PLAYER PROFILE POPUP ----
function PlayerProfilePopup({ userId, onClose }) {
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    supabase.from("profiles").select("*").eq("id", userId).single().then(({ data }) => { if (data) setData(data); });
    supabase.from("debate_history").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(10).then(({ data }) => { if (data) setHistory(data); });
    function handleClick(e) { if (ref.current && !ref.current.contains(e.target)) onClose(); }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [userId]);

  const winRate = data && (data.wins || data.losses)
    ? Math.round((data.wins || 0) / ((data.wins || 0) + (data.losses || 0)) * 100)
    : 0;

  return (
    <div ref={ref} style={{
      position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
      background: "#0a0a0a", border: "1px solid #222", borderRadius: 12, padding: 0,
      zIndex: 1000, width: 340, boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
      overflow: "hidden", fontFamily: "'Inter',sans-serif"
    }}>
      {/* Steam-style banner */}
      <div style={{ background: "linear-gradient(135deg,#111,#1a1a1a)", padding: "20px 20px 0", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 12, right: 12, color: "#888", background: "none", cursor: "pointer" }}>
          <Icons.Close />
        </button>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-end", paddingBottom: 0 }}>
          {data?.avatar_url
            ? <img src={data.avatar_url} style={{ width: 64, height: 64, borderRadius: 4, border: "3px solid #e63946", flexShrink: 0 }} alt="" />
            : <div style={{ width: 64, height: 64, borderRadius: 4, background: "#222", border: "3px solid #e63946", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>?</div>
          }
          <div style={{ paddingBottom: 14 }}>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "0.5px" }}>{data?.username || "Anonymous"}</p>
            <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
              <span style={{ fontSize: 11, background: "#e6394611", color: "#e63946", padding: "2px 8px", borderRadius: 3, border: "1px solid #e6394633" }}>
                {winRate > 60 ? "Expert" : winRate > 40 ? "Regular" : "Newcomer"}
              </span>
              {winRate > 0 && <span style={{ fontSize: 11, color: "#888" }}>{winRate}% WR</span>}
            </div>
          </div>
        </div>
      </div>
      {/* Stats bar */}
      <div style={{ background: "#111", padding: "12px 20px", borderBottom: "1px solid #222", display: "flex", gap: 0 }}>
        {[
          { icon: <Icons.Trophy />, val: data?.wins || 0, label: "Wins", color: "#e63946" },
          { icon: <Icons.Skull />, val: data?.losses || 0, label: "Losses", color: "#888" },
          { icon: <Icons.Coin />, val: data?.sigs || 0, label: "Sigs", color: "#f5a623" },
          { icon: <Icons.Diamond />, val: data?.deps || 0, label: "Deps", color: "#9b59b6" },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", padding: "6px 0", borderRight: i < 3 ? "1px solid #222" : "none" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 3 }}>{s.icon}</div>
            <p style={{ fontSize: 16, fontWeight: 700, color: s.color, fontFamily: "'Inter',sans-serif" }}>{s.val}</p>
            <p style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
          </div>
        ))}
      </div>
      {/* Recent debates */}
      <div style={{ background: "#0a0a0a", padding: "12px 20px", maxHeight: 180, overflowY: "auto" }}>
        <p style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Recent Debates</p>
        {history.length === 0
          ? <p style={{ fontSize: 12, color: "#555" }}>No debates yet.</p>
          : history.slice(0, 6).map(h => (
            <div key={h.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: "1px solid #1e2d3d" }}>
              <span style={{ fontSize: 12, color: "#ccc", flex: 1, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", maxWidth: 200 }}>{h.topic || "Open Debate"}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: h.result === "win" ? "#4caf50" : "#666", marginLeft: 10 }}>{h.result === "win" ? "W" : "L"}</span>
            </div>
          ))
        }
      </div>
      {/* Open on new page */}
      <div style={{ background: "#111", padding: "12px 20px", display: "flex", justifyContent: "flex-end" }}>
        <button onClick={() => window.open(`/profile/${userId}`, "_blank")} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#e63946", background: "none", cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>
          <Icons.ExternalLink /> Open full profile
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedLang, setSelectedLang] = useState("en");
  const [selectedFormat, setSelectedFormat] = useState("1v1");
  const [selectedDuration, setSelectedDuration] = useState(40);
  const [settingsLang, setSettingsLang] = useState("en");
  const [camEnabled, setCamEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [roomTopic, setRoomTopic] = useState("");
  const [isAdultOnly, setIsAdultOnly] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [myRole, setMyRole] = useState("debater");
  const [rooms, setRooms] = useState([]);
  const [hashtagFilter, setHashtagFilter] = useState(null);
  const [profilePopupId, setProfilePopupId] = useState(null);

  async function loadProfile(userId) {
    const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
    if (data) setProfile(data);
  }

  async function loadRooms() {
    const thirtyMinsAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();
    await supabase.from("rooms").update({ status: "closed" }).eq("status", "waiting").lt("created_at", thirtyMinsAgo);
    const { data } = await supabase.from("rooms").select("*").in("status", ["waiting", "active"]).order("created_at", { ascending: false }).limit(20);
    if (data) setRooms(data);
    await supabase.from("rooms").update({ status: "closed" }).eq("status", "active").not("started_at", "is", null).lt("started_at", new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString());
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) loadProfile(session.user.id);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) loadProfile(session.user.id);
    });
    loadRooms();
    return () => subscription.unsubscribe();
  }, []);

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: window.location.origin } });
  }

  async function signOut() {
    await supabase.auth.signOut();
    setProfile(null);
    setScreen("home");
  }

  function findDebate() {
    if (!user) { alert("Please sign in first!"); return; }
  }

  async function joinRoom(room, role = "debater") {
    if (!user) { alert("Please sign in first!"); return; }
    await supabase.from("room_members").upsert({ room_id: room.id, user_id: user.id, role }, { onConflict: "room_id,user_id" });
    setMyRole(role); setCurrentRoom(room); setScreen("room");
  }

  const filteredTopics = TOPICS.filter((t) => {
    const matchCat = selectedCategory === "All" || t.category === selectedCategory;
    return matchCat && t.label.toLowerCase().includes(search.toLowerCase());
  });

  // Nav order: Home, Create Room, Lounge, Shop, Settings
  const NAV_ITEMS = [
    { id: "home", label: "Home", Icon: Icons.Home },
    { id: "create", label: "Create Room", Icon: Icons.Plus },
    { id: "lounge", label: "Lounge", Icon: Icons.Lounge },
    { id: "shop", label: "Shop", Icon: Icons.Shop },
    { id: "settings", label: "Settings", Icon: Icons.Settings },
  ];

  return (
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 4px; }
        input:focus { outline: none; }
        button { cursor: pointer; border: none; background: none; font-family: inherit; }

        .chip:hover { background: #fff !important; color: #0a0a0a !important; }
        .chip-sel { background: #fff !important; color: #0a0a0a !important; }
        .topic-row:hover { background: #1a1a1a !important; }
        .topic-row-sel { background: #1c1c1c !important; border-left: 2px solid #e63946 !important; }
        .fmt-btn:hover { background: #1a1a1a !important; border-color: #555 !important; }
        .fmt-sel { background: #fff !important; color: #0a0a0a !important; border-color: #fff !important; }
        .dur-btn:hover { background: #1a1a1a !important; border-color: #555 !important; }
        .dur-sel { background: #e63946 !important; color: #fff !important; border-color: #e63946 !important; }
        .lang-btn:hover { border-color: #555 !important; background: #1a1a1a !important; }
        .lang-sel { border-color: #e63946 !important; background: #1a0a0b !important; color: #e63946 !important; }
        .connect-btn:hover { background: #e63946 !important; transform: translateY(-1px); }
        .hashtag-pill:hover { border-color: #e63946 !important; color: #e63946 !important; cursor: pointer; }
        .hashtag-pill-active { border-color: #e63946 !important; color: #e63946 !important; background: #1a0a0b !important; }
        .nav-item { transition: all 0.15s; position: relative; }
        .nav-item:hover .nav-label { color: #fff !important; }
        .nav-item:hover .nav-icon { color: #fff !important; }
        .nav-sel .nav-label { color: #fff !important; }
        .nav-sel .nav-icon { color: #e63946 !important; }
        .nav-sel::after { content: ''; position: absolute; bottom: -16px; left: 50%; transform: translateX(-50%); width: 20px; height: 2px; background: #e63946; border-radius: 2px; }
        .signin-btn:hover { background: #f0f0f0 !important; }
        .signout-btn:hover { color: #ff6b6b !important; }
        .profile-avatar { border-radius: 50%; width: 32px; height: 32px; object-fit: cover; border: 2px solid #333; cursor: pointer; transition: border-color 0.15s; }
        .profile-avatar:hover { border-color: #e63946 !important; }
        .room-card:hover { border-color: #333 !important; background: #161616 !important; }
        .join-btn:hover { background: #e63946 !important; color: #fff !important; border-color: #e63946 !important; }
        .judge-btn:hover { background: #f5a623 !important; color: #000 !important; border-color: #f5a623 !important; }
        .send-btn:hover { background: #c0303a !important; }
        .kick-btn:hover { background: #e63946 !important; color: #fff !important; }
        .start-debate-btn:hover { background: #4caf50 !important; }
        .vote-btn:hover { opacity: 0.85; }
        .timer-urgent { animation: pulse 1s infinite; }
        .save-btn:hover { background: #c0303a !important; }
        .player-name-btn:hover { color: #e63946 !important; text-decoration: underline; cursor: pointer; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes msgIn { from { opacity: 0; transform: translateY(8px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .msg-animate { animation: msgIn 0.18s ease-out; }
        @keyframes coinPop { 0% { transform: scale(0) rotate(-20deg); opacity: 0; } 50% { transform: scale(1.3) rotate(5deg); opacity: 1; } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
        .coin-animate { animation: coinPop 0.6s ease-out; }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeSlideUp 0.4s ease-out; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .slide-down { animation: slideDown 0.2s ease-out; }
        @media (max-width: 768px) {
          .mobile-grid { grid-template-columns: 1fr !important; }
          .mobile-hide { display: none !important; }
          header { padding: 0 10px !important; }
          header nav { gap: 6px !important; }
          .nav-label { display: none !important; }
          header nav button { padding: 6px 8px !important; min-width: 32px; justify-content: center; }
          header nav::-webkit-scrollbar { display: none; }
          .user-stats { display: none !important; }
          .signin-mobile { display: inline !important; }
          main { padding: 12px 10px !important; }
        }
      `}</style>

      {/* HEADER — Discord/gaming style */}
      <header style={S.header}>
        {/* Logo */}
        <div style={S.logo}>
          <span style={S.logoVi}>Vi</span>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e63946", marginLeft: 4, alignSelf: "flex-start", marginTop: 4 }} />
        </div>

        {/* Nav */}
        <nav style={S.nav}>
          {screen === "room" ? (
            <button className="nav-item" style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#888", fontFamily: "'Inter',sans-serif", padding: "6px 10px", background: "#111", borderRadius: 6, border: "1px solid #222" }}
              onClick={async () => {
                if (currentRoom && user) {
                  await supabase.from("room_members").delete().eq("room_id", currentRoom.id).eq("user_id", user.id);
                  await new Promise(r => setTimeout(r, 300));
                  const { data: remaining } = await supabase.from("room_members").select("user_id").eq("room_id", currentRoom.id);
                  if (!remaining || remaining.length === 0) {
                    await supabase.from("rooms").update({ status: "closed" }).eq("id", currentRoom.id);
                  }
                }
                setScreen("home"); setCurrentRoom(null); setMyRole("debater"); loadRooms();
              }}>
              <Icons.Back /> <span>Back</span>
            </button>
          ) : (
            NAV_ITEMS.map(({ id, label, Icon }) => (
              <button key={id} className={`nav-item ${screen === id ? "nav-sel" : ""}`}
                style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 2px", background: "none", fontFamily: "'Inter',sans-serif" }}
                onClick={() => setScreen(id)}>
                <span className="nav-icon" style={{ color: screen === id ? "#e63946" : "#888", display: "flex", transition: "color 0.15s" }}>
                  <Icon />
                </span>
                <span className="nav-label" style={{ fontSize: 13, fontWeight: 500, color: screen === id ? "#fff" : "#888", transition: "color 0.15s" }}>
                  {label}
                </span>
              </button>
            ))
          )}
        </nav>

        {/* User area */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        {user ? (
          <>
            {profile?.avatar_url && (
              <img src={profile.avatar_url} className="profile-avatar" alt="avatar" onClick={() => setScreen("profile")} />
            )}
            <div className="user-stats" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", cursor: "pointer" }} onClick={() => setScreen("profile")}>
              <span style={{ fontSize: 12, color: "#fff", fontWeight: 600, fontFamily: "'Inter',sans-serif", maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {profile?.username || user.email?.split("@")[0]}
              </span>
              <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 1 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 10, color: "#e63946", fontFamily: "'Inter',sans-serif" }}>
                  <Icons.Trophy /> {profile?.wins || 0}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 10, color: "#555", fontFamily: "'Inter',sans-serif" }}>
                  <Icons.Skull /> {profile?.losses || 0}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 10, color: "#f5a623", fontFamily: "'Inter',sans-serif" }}>
                  <Icons.Coin /> {profile?.sigs || 0}
                </span>
              </div>
            </div>
            <button className="signout-btn" onClick={signOut} style={{ fontSize: 11, color: "#555", fontFamily: "'Inter',sans-serif", transition: "color 0.15s", flexShrink: 0 }}>
              <span className="user-stats">Sign out</span>
            </button>
          </>
        ) : (
          <button className="signin-btn" onClick={signInWithGoogle} style={{ padding: "7px 14px", background: "#fff", color: "#0a0a0a", borderRadius: 8, fontSize: 12, fontWeight: 600, fontFamily: "'Inter',sans-serif", whiteSpace: "nowrap", flexShrink: 0 }}>
            <span className="user-stats">Sign in with Google</span>
            <span className="signin-mobile" style={{ display: "none" }}>Sign in</span>
          </button>
        )}
        </div>
      </header>

      <main style={S.main}>
        {screen === "home" && <HomeScreen search={search} setSearch={setSearch} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} filteredTopics={filteredTopics} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} selectedLang={selectedLang} setSelectedLang={setSelectedLang} selectedFormat={selectedFormat} setSelectedFormat={setSelectedFormat} selectedDuration={selectedDuration} setSelectedDuration={setSelectedDuration} isAdultOnly={isAdultOnly} setIsAdultOnly={setIsAdultOnly} findDebate={findDebate} rooms={rooms} joinRoom={joinRoom} hashtagFilter={hashtagFilter} setHashtagFilter={setHashtagFilter} />}
        {screen === "settings" && <SettingsScreen settingsLang={settingsLang} setSettingsLang={setSettingsLang} camEnabled={camEnabled} setCamEnabled={setCamEnabled} micEnabled={micEnabled} setMicEnabled={setMicEnabled} />}
        {screen === "create" && <CreateScreen roomTopic={roomTopic} setRoomTopic={setRoomTopic} user={user} onCreated={(room) => { setMyRole("debater"); setCurrentRoom(room); setScreen("room"); }} />}
        {screen === "room" && currentRoom && <RoomScreen room={currentRoom} user={user} profile={profile} myRole={myRole} setProfile={setProfile} onViewProfile={(uid) => setProfilePopupId(uid)} />}
        {screen === "profile" && user && <ProfileScreen user={user} profile={profile} setProfile={setProfile} />}
        {screen === "lounge" && <LoungeScreen user={user} profile={profile} />}
        {screen === "shop" && user && <ShopScreen user={user} profile={profile} setProfile={setProfile} />}
      </main>

      {/* Player profile popup overlay */}
      {profilePopupId && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 999 }}>
          <PlayerProfilePopup userId={profilePopupId} onClose={() => setProfilePopupId(null)} />
        </div>
      )}
    </div>
  );
}

// ===================== STEAM-STYLE PROFILE SCREEN =====================
function ProfileScreen({ user, profile, setProfile }) {
  const [username, setUsername] = useState(profile?.username || "");
  const [saving, setSaving] = useState(false);
  const [history, setHistory] = useState([]);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    supabase.from("debate_history").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20).then(({ data }) => { if (data) setHistory(data); });
  }, [user.id]);

  async function saveUsername() {
    if (!username.trim()) return;
    if (username.trim().length > 15) { alert("Username must be 15 characters or less!"); return; }
    setSaving(true);
    const { data: existing } = await supabase.from("profiles").select("id").eq("username", username.trim()).neq("id", user.id).single();
    if (existing) { alert("This username is already taken!"); setSaving(false); return; }
    const { data } = await supabase.from("profiles").update({ username: username.trim() }).eq("id", user.id).select().single();
    if (data) { setProfile(data); setSaved(true); setTimeout(() => setSaved(false), 2000); }
    setSaving(false);
  }

  const winRate = (profile?.wins || profile?.losses)
    ? Math.round(((profile?.wins || 0) / ((profile?.wins || 0) + (profile?.losses || 0))) * 100)
    : 0;

  const totalDebates = (profile?.wins || 0) + (profile?.losses || 0);
  const level = Math.floor(totalDebates / 5) + 1;
  const levelProgress = (totalDebates % 5) / 5 * 100;
  const rankLabel = winRate >= 70 ? "Grandmaster" : winRate >= 55 ? "Diamond" : winRate >= 45 ? "Gold" : winRate >= 35 ? "Silver" : "Bronze";
  const rankColor = winRate >= 70 ? "#f5a623" : winRate >= 55 ? "#e63946" : winRate >= 45 ? "#f5a623" : winRate >= 35 ? "#aaa" : "#cd7f32";

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", width: "100%", fontFamily: "'Inter',sans-serif" }}>
      {/* Steam-style profile banner */}
      <div style={{ background: "linear-gradient(160deg, #111 0%, #1a1a1a 50%, #111 100%)", borderRadius: "12px 12px 0 0", padding: "32px 32px 0", border: "1px solid #222", borderBottom: "none", position: "relative", overflow: "hidden" }}>
        {/* Decorative grid lines */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 40px,#ffffff08 40px,#ffffff08 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,#ffffff08 40px,#ffffff08 41px)", pointerEvents: "none" }} />
        <div style={{ display: "flex", gap: 24, alignItems: "flex-end", position: "relative" }}>
          {/* Avatar */}
          <div style={{ flexShrink: 0 }}>
            {profile?.avatar_url
              ? <img src={profile.avatar_url} style={{ width: 96, height: 96, borderRadius: 6, border: "3px solid #e63946", display: "block" }} alt="avatar" />
              : <div style={{ width: 96, height: 96, borderRadius: 6, background: "#222", border: "3px solid #e63946", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>?</div>
            }
            {/* Online indicator */}
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#4caf50", border: "2px solid #111", marginTop: -6, marginLeft: 82 }} />
          </div>
          <div style={{ paddingBottom: 20, flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <h1 style={{ fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>{profile?.username || "Anonymous"}</h1>
              <span style={{ fontSize: 11, background: rankColor + "22", color: rankColor, padding: "3px 10px", borderRadius: 4, border: `1px solid ${rankColor}55`, fontWeight: 600, letterSpacing: "0.06em" }}>{rankLabel}</span>
            </div>
            <p style={{ fontSize: 12, color: "#888", marginTop: 4 }}>{user.email}</p>
            {/* Level bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
              <span style={{ fontSize: 11, color: "#e63946", fontWeight: 600 }}>Lvl {level}</span>
              <div style={{ flex: 1, height: 6, background: "#222", borderRadius: 3, maxWidth: 180 }}>
                <div style={{ height: "100%", width: `${levelProgress}%`, background: "linear-gradient(90deg,#e63946,#f5a623)", borderRadius: 3, transition: "width 0.5s" }} />
              </div>
              <span style={{ fontSize: 10, color: "#555" }}>{totalDebates % 5}/5 to Lvl {level + 1}</span>
            </div>
          </div>
        </div>
        {/* Tab bar */}
        <div style={{ display: "flex", gap: 0, marginTop: 16, position: "relative" }}>
          {["overview", "history", "settings"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "10px 20px", fontSize: 13, fontWeight: 500, color: activeTab === tab ? "#fff" : "#888", background: activeTab === tab ? "#0a0a0a" : "transparent", borderBottom: activeTab === tab ? "2px solid #e63946" : "2px solid transparent", fontFamily: "'Inter',sans-serif", transition: "all 0.15s", textTransform: "capitalize" }}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ background: "#0a0a0a", border: "1px solid #222", borderTop: "none", borderRadius: "0 0 16px 16px", padding: 28 }}>
        {activeTab === "overview" && (
          <div>
            {/* Stats grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
              {[
                { icon: <Icons.Trophy />, val: profile?.wins || 0, label: "Wins", color: "#e63946", bg: "#2a1520" },
                { icon: <Icons.Skull />, val: profile?.losses || 0, label: "Losses", color: "#888", bg: "#111" },
                { icon: <Icons.Coin />, val: profile?.sigs || 0, label: "Sigs", color: "#f5a623", bg: "#241f0f" },
                { icon: <Icons.Diamond />, val: profile?.deps || 0, label: "Deps", color: "#9b59b6", bg: "#1e1228" },
              ].map(stat => (
                <div key={stat.label} style={{ background: stat.bg, borderRadius: 8, padding: "16px 12px", textAlign: "center", border: "1px solid #222" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>{stat.icon}</div>
                  <p style={{ fontSize: 24, fontWeight: 700, color: stat.color, fontFamily: "'Inter',sans-serif" }}>{stat.val}</p>
                  <p style={{ fontSize: 10, color: "#555", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>{stat.label}</p>
                </div>
              ))}
            </div>
            {/* Win rate bar */}
            {totalDebates > 0 && (
              <div style={{ background: "#111", borderRadius: 8, padding: "16px 20px", border: "1px solid #222", marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 12, color: "#888", fontWeight: 600 }}>Win Rate</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: winRate >= 50 ? "#4caf50" : "#e63946", fontFamily: "'Inter',sans-serif" }}>{winRate}%</span>
                </div>
                <div style={{ height: 8, background: "#222", borderRadius: 4 }}>
                  <div style={{ height: "100%", width: `${winRate}%`, background: winRate >= 50 ? "linear-gradient(90deg,#4caf50,#66bb6a)" : "linear-gradient(90deg,#e63946,#ef5350)", borderRadius: 4, transition: "width 0.5s" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  <span style={{ fontSize: 10, color: "#555" }}>{profile?.wins || 0} wins</span>
                  <span style={{ fontSize: 10, color: "#555" }}>{totalDebates} total</span>
                  <span style={{ fontSize: 10, color: "#555" }}>{profile?.losses || 0} losses</span>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === "history" && (
          <div>
            <p style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Debate History ({history.length})</p>
            {history.length === 0
              ? <p style={{ fontSize: 13, color: "#555", padding: "12px 0" }}>No debates yet.</p>
              : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {history.map(h => (
                    <div key={h.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#111", borderRadius: 8, border: "1px solid #222" }}>
                      <span style={{ fontSize: 13, color: "#ccc" }}>{h.topic || "Open Debate"}</span>
                      <span style={{ fontSize: 12, color: h.result === "win" ? "#4caf50" : "#e63946", fontWeight: 600, background: h.result === "win" ? "#0d2a0d" : "#2a0d0d", padding: "2px 10px", borderRadius: 4 }}>
                        {h.result === "win" ? "WIN" : "LOSS"}
                      </span>
                    </div>
                  ))}
                </div>
              )
            }
          </div>
        )}
        {activeTab === "settings" && (
          <div>
            <p style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Username</p>
            <div style={{ display: "flex", gap: 10 }}>
              <input style={{ ...S.textInput, flex: 1 }} value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username (max 15)" maxLength={15} onKeyDown={e => e.key === "Enter" && saveUsername()} />
              <button className="save-btn" onClick={saveUsername} disabled={saving} style={{ padding: "10px 20px", background: saved ? "#4caf50" : "#e63946", color: "#fff", borderRadius: 8, fontSize: 13, fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: "pointer", transition: "background 0.2s", minWidth: 70 }}>
                {saving ? "…" : saved ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Timer({ duration, startedAt }) {
  const [timeLeft, setTimeLeft] = useState(null);
  useEffect(() => {
    if (!startedAt) return;
    const totalSeconds = duration * 60;
    function update() {
      const now = Date.now();
      const start = new Date(startedAt).getTime();
      const elapsed = Math.floor((now - start) / 1000);
      setTimeLeft(Math.max(0, totalSeconds - elapsed));
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [duration, startedAt]);

  if (!startedAt || timeLeft === null) return null;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const isUrgent = timeLeft < 60;
  return (
    <span className={isUrgent ? "timer-urgent" : ""} style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700, color: isUrgent ? "#e63946" : "#ccc", letterSpacing: "2px" }}>
      {timeLeft === 0 ? "TIME'S UP" : `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`}
    </span>
  );
}

/* ===================== END SCREEN ===================== */
function EndScreen({ room, debaters, votes, user, onBack }) {
  const [coinAnim, setCoinAnim] = useState(false);
  const voteCount = {};
  votes.forEach(v => { voteCount[v.voted_for] = (voteCount[v.voted_for] || 0) + 1; });
  const sorted = [...debaters].sort((a, b) => (voteCount[b.user_id] || 0) - (voteCount[a.user_id] || 0));
  const winner = sorted[0];
  const myVotes = voteCount[user?.id] || 0;
  const mysigs = myVotes * 100;
  useEffect(() => { setTimeout(() => setCoinAnim(true), 600); }, []);

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", width: "100%", padding: "40px 20px" }}>
      <div className="fade-up" style={{ ...S.card, textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 32, fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: "1px" }}>DEBATE OVER</h2>
        <p style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>{room.title}</p>
        {votes.length > 0 && winner && (
          <div className="fade-up" style={{ marginBottom: 28 }}>
            <p style={{ fontSize: 11, color: "#f5a623", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>Winner</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
              {winner.profiles?.avatar_url ? <img src={winner.profiles.avatar_url} style={{ width: 52, height: 52, borderRadius: 4, border: "3px solid #f5a623" }} alt="" /> : <div style={{ width: 52, height: 52, borderRadius: 4, background: "#222", border: "3px solid #f5a623", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>?</div>}
              <div>
                <p style={{ fontSize: 22, fontWeight: 700, color: "#fff", fontFamily: "'Syne',sans-serif", letterSpacing: "0.5px" }}>{winner.profiles?.username || "Anonymous"}</p>
                <p style={{ fontSize: 13, color: "#f5a623", display: "flex", alignItems: "center", gap: 4 }}><Icons.Scale /> {voteCount[winner.user_id] || 0} votes</p>
              </div>
            </div>
          </div>
        )}
        {votes.length === 0 && <p style={{ fontSize: 14, color: "#888", marginBottom: 28 }}>No judges voted in this debate.</p>}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {sorted.map((m, i) => (
            <div key={m.user_id} className="fade-up" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: m.user_id === user?.id ? "#111" : "#0a0a0a", borderRadius: 8, border: `1px solid ${i === 0 && votes.length > 0 ? "#f5a623" : "#222"}`, animationDelay: `${i * 0.15}s` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {m.profiles?.avatar_url ? <img src={m.profiles.avatar_url} style={{ width: 32, height: 32, borderRadius: 4 }} alt="" /> : <div style={{ width: 32, height: 32, borderRadius: 4, background: "#222", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>?</div>}
                <div>
                  <p style={{ fontSize: 14, color: "#ccc", fontWeight: 600 }}>{m.profiles?.username || "Anonymous"} {m.user_id === user?.id && <span style={{ fontSize: 10, color: "#555" }}>(you)</span>}</p>
                  <p style={{ fontSize: 11, color: "#888" }}>{m.is_host ? "HOST" : "Debater"}</p>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 22, fontWeight: 700, color: i === 0 && votes.length > 0 ? "#f5a623" : "#555", fontFamily: "'Syne',sans-serif" }}>{voteCount[m.user_id] || 0}</p>
                <p style={{ fontSize: 10, color: "#555" }}>votes</p>
              </div>
            </div>
          ))}
        </div>
        {mysigs > 0 && coinAnim && (
          <div className="coin-animate" style={{ marginBottom: 24, padding: "16px 20px", background: "#241f0f", borderRadius: 8, border: "1px solid #f5a623" }}>
            <p style={{ fontSize: 32, fontWeight: 700, color: "#f5a623", fontFamily: "'Syne',sans-serif", letterSpacing: "1px" }}>+{mysigs} SIGS</p>
          </div>
        )}
        <button onClick={onBack} style={{ width: "100%", padding: "14px 0", background: "#e63946", color: "#fff", borderRadius: 8, fontSize: 15, fontWeight: 700, fontFamily: "'Syne',sans-serif", cursor: "pointer", letterSpacing: "1px" }}>
          BACK TO HOME
        </button>
      </div>
    </div>
  );
}

/* ===================== ROOM SCREEN ===================== */
function RoomScreen({ room, user, profile, myRole, setProfile, onViewProfile }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [members, setMembers] = useState([]);
  const [votes, setVotes] = useState([]);
  const [myVote, setMyVote] = useState(null);
  const [livekitToken, setLivekitToken] = useState(null);
  const [livekitUrl, setLivekitUrl] = useState(null);
  const [callActive, setCallActive] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const [timerStarted, setTimerStarted] = useState(room.started_at);
  const [debateStarted, setDebateStarted] = useState(room.started || false);
  const [sigsAwarded, setsigsAwarded] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [wantsEnd, setWantsEnd] = useState(false);
  const [debateEnded, setDebateEnded] = useState(false);
  const bottomRef = useRef(null);

  const isCreator = user?.id === room.created_by;
  const isJudge = myRole === "judge";
  const debaters = members.filter(m => m.role === "debater");
  const judges = members.filter(m => m.role === "judge");

  useEffect(() => {
    loadMessages(); loadMembers(); loadVotes();
    const channel = supabase.channel(`room-${room.id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `room_id=eq.${room.id}` }, (payload) => setMessages(prev => [...prev, payload.new]))
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "rooms", filter: `id=eq.${room.id}` }, (payload) => {
        if (payload.new.started_at) { const sa = payload.new.started_at; setTimerStarted(sa.endsWith('Z') ? sa : sa + 'Z'); }
        if (payload.new.started) setDebateStarted(true);
        if (payload.new.status === "closed") setDebateEnded(true);
      })
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "votes", filter: `room_id=eq.${room.id}` }, () => loadVotes())
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "room_members", filter: `room_id=eq.${room.id}` }, () => loadMembers())
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "room_members", filter: `room_id=eq.${room.id}` }, (payload) => {
        if (payload.old?.user_id === user?.id) { alert("You have been removed from this room."); window.location.reload(); return; }
        loadMembers();
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "room_members", filter: `room_id=eq.${room.id}` }, () => loadMembers())
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [room.id]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  useEffect(() => {
    if (members.length === 0 || debateEnded) return;
    const meInRoom = members.find(m => m.user_id === user?.id);
    if (!meInRoom) { alert("You have been removed from this room."); window.location.reload(); }
  }, [members]);

  useEffect(() => {
    if (!timerStarted || sigsAwarded || votes.length === 0) return;
    const totalSeconds = room.duration * 60;
    const elapsed = Math.floor((Date.now() - new Date(timerStarted).getTime()) / 1000);
    if (elapsed >= totalSeconds) awardSigs();
  }, [timerStarted, votes, sigsAwarded]);

  useEffect(() => {
    const debaterMembers = members.filter(m => m.role === "debater");
    const allWantEnd = debaterMembers.length >= 2 && debaterMembers.every(m => m.wants_end);
    if (allWantEnd && debateStarted) endDebate();
  }, [members]);

  async function awardSigs() {
    if (sigsAwarded) return;
    setsigsAwarded(true);
    const vc = {};
    votes.forEach(v => { vc[v.voted_for] = (vc[v.voted_for] || 0) + 1; });
    const maxVotes = Math.max(...debaters.map(d => vc[d.user_id] || 0));
    for (const debater of debaters) {
      const votesCast = vc[debater.user_id] || 0;
      const isWinner = votesCast === maxVotes && votesCast > 0;
      const { data: prof } = await supabase.from("profiles").select("sigs, deps, win_streak, last_debate_date").eq("id", debater.user_id).single();
      const today = new Date().toISOString().split("T")[0];
      const isFirstToday = prof?.last_debate_date !== today;
      const dailyBonus = isFirstToday ? 50 : 0;
      let newStreak = isWinner ? (prof?.win_streak || 0) + 1 : 0;
      let streakMultiplier = 1;
      if (isWinner && newStreak >= 3) streakMultiplier = 2;
      else if (isWinner && newStreak >= 2) streakMultiplier = 1.5;
      let sigs = isWinner ? Math.floor(votesCast * 100 * streakMultiplier) : 25;
      sigs += dailyBonus;
      let deps = 0;
      if (isWinner && Math.random() < 0.08) deps = Math.floor(Math.random() * 11) + 5;
      await supabase.from("profiles").update({ sigs: (prof?.sigs || 0) + sigs, deps: (prof?.deps || 0) + deps, win_streak: newStreak, last_debate_date: today }).eq("id", debater.user_id);
      if (debater.user_id === user?.id) setProfile(prev => ({ ...prev, sigs: (prev?.sigs || 0) + sigs, deps: (prev?.deps || 0) + deps, win_streak: newStreak }));
    }
  }

  async function loadMessages() {
    const { data } = await supabase.from("messages").select("*, profiles(username, avatar_url)").eq("room_id", room.id).order("created_at", { ascending: true });
    if (data) setMessages(data);
  }
  async function loadMembers() {
    const { data } = await supabase.from("room_members").select("*, profiles(username, avatar_url)").eq("room_id", room.id);
    if (data) setMembers(data);
  }
  async function loadVotes() {
    const { data } = await supabase.from("votes").select("*").eq("room_id", room.id);
    if (data) { setVotes(data); const mine = data.find(v => v.judge_id === user?.id); if (mine) setMyVote(mine.voted_for); }
  }
  async function sendMessage() {
    if (!input.trim() || !user || isJudge) return;
    await supabase.from("messages").insert({ room_id: room.id, user_id: user.id, content: input.trim() });
    setInput("");
  }
  async function castVote(debaterId) {
    if (!user || !isJudge || myVote) return;
    await supabase.from("votes").insert({ room_id: room.id, judge_id: user.id, voted_for: debaterId });
    setMyVote(debaterId);
  }
  async function toggleCall() {
    if (callActive) { setCallActive(false); setLivekitToken(null); return; }
    try {
      const res = await fetch("/api/create-room", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ roomName: `vi-${room.id}`, participantName: profile?.username || user?.email || "user" }) });
      const data = await res.json();
      setLivekitToken(data.token); setLivekitUrl(data.url); setCallActive(true);
    } catch (e) { alert("Failed to start call."); }
  }
  async function startDebate() {
    const now = new Date().toISOString();
    await supabase.from("rooms").update({ started: true, status: "active", started_at: now }).eq("id", room.id);
    setDebateStarted(true); setTimerStarted(now);
  }
  async function kickMember(memberId) {
    if (!isCreator) return;
    if (!room.host_mode && debateStarted) return;
    await supabase.from("room_members").delete().eq("room_id", room.id).eq("user_id", memberId);
    loadMembers();
  }
  async function endDebate() {
    await supabase.from("rooms").update({ status: "closed" }).eq("id", room.id);
    setDebateEnded(true);
  }
  async function voteEnd() {
    await supabase.from("room_members").update({ wants_end: true }).eq("room_id", room.id).eq("user_id", user.id);
    setWantsEnd(true);
  }

  if (debateEnded) return <EndScreen room={room} debaters={debaters} votes={votes} user={user} onBack={() => window.location.reload()} />;

  const durationLabel = DURATIONS.find(d => d.id === room.duration)?.label || "Standard";
  const voteCount = {};
  votes.forEach(v => { voteCount[v.voted_for] = (voteCount[v.voted_for] || 0) + 1; });

  return (
    <div style={S.roomContainer}>
      <div style={S.roomHeader}>
        <div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700, color: "#ccc", letterSpacing: "0.5px", display: "flex", alignItems: "center", gap: 10 }}>
            {room.title}
            {room.is_adult_only && <span style={{ fontSize: 10, background: "#e63946", color: "#fff", padding: "2px 8px", borderRadius: 4, fontFamily: "'Inter',sans-serif", letterSpacing: "0.05em" }}>18+</span>}
            {room.host_mode && <span style={{ fontSize: 10, background: "#e63946", color: "#fff", padding: "2px 8px", borderRadius: 4, fontFamily: "'Inter',sans-serif" }}>HOST</span>}
            {isJudge && <span style={{ fontSize: 10, background: "#f5a623", color: "#000", padding: "2px 8px", borderRadius: 4, fontFamily: "'Inter',sans-serif", display: "flex", alignItems: "center", gap: 4 }}><Icons.Scale /> Judge</span>}
          </h2>
          <p style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{room.format} · {durationLabel} · {debaters.length} debaters · {judges.length} judges</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => setShowMembers(!showMembers)} style={{ ...S.iconBtn, background: showMembers ? "#222" : "#111" }}>
            <Icons.Users /> <span style={{ fontSize: 12, marginLeft: 4 }}>{members.length}</span>
          </button>
          {timerStarted && <Timer duration={room.duration} startedAt={timerStarted} />}
          {!isJudge && (
            <button onClick={() => setMicOn(!micOn)} style={{ ...S.iconBtn, background: micOn ? "#e63946" : "#111", color: micOn ? "#fff" : "#888" }}>
              <Icons.Mic off={!micOn} />
            </button>
          )}
          {!isJudge && (
            <button onClick={() => { setCamOn(!camOn); if (!callActive) toggleCall(); }} style={{ ...S.iconBtn, background: camOn ? "#e63946" : "#111", color: camOn ? "#fff" : "#888" }}>
              <Icons.Camera off={!camOn} />
            </button>
          )}
          {isJudge && (
            <button onClick={toggleCall} style={{ ...S.iconBtn, background: callActive ? "#222" : "#111", gap: 6 }}>
              <Icons.Eye /> <span style={{ fontSize: 12 }}>{callActive ? "Watching" : "Watch"}</span>
            </button>
          )}
          {isCreator && !debateStarted && (
            <button className="start-debate-btn" onClick={startDebate} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", background: debaters.length >= 2 ? "#1a3a1a" : "#111", color: debaters.length >= 2 ? "#4caf50" : "#555", borderRadius: 6, fontSize: 12, fontWeight: 600, border: `1px solid ${debaters.length >= 2 ? "#4caf50" : "#222"}`, cursor: debaters.length >= 2 ? "pointer" : "default", fontFamily: "'Inter',sans-serif", transition: "background 0.15s" }}>
              <Icons.Play /> {debaters.length >= 2 ? "Start" : `Start (${debaters.length}/2)`}
            </button>
          )}
          {!isJudge && debateStarted && (
            <button onClick={voteEnd} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", background: wantsEnd ? "#222" : "#2a1520", color: wantsEnd ? "#555" : "#e63946", borderRadius: 6, fontSize: 12, fontWeight: 600, border: "1px solid #e63946", cursor: wantsEnd ? "default" : "pointer", fontFamily: "'Inter',sans-serif" }}>
              <Icons.Flag /> {wantsEnd ? "Waiting…" : "End"}
            </button>
          )}
        </div>
      </div>

      {/* Players popup */}
      {showMembers && (
        <div className="slide-down" style={{ position: "absolute", top: 64, right: 16, background: "#0a0a0a", border: "1px solid #222", borderRadius: 10, padding: 16, zIndex: 20, minWidth: 220, boxShadow: "0 12px 40px rgba(0,0,0,0.7)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#ccc", textTransform: "uppercase", letterSpacing: "0.08em" }}>Players</span>
            <button onClick={() => setShowMembers(false)} style={{ color: "#555" }}><Icons.Close /></button>
          </div>
          {members.map(m => (
            <div key={m.user_id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: "1px solid #1a1a1a" }}>
              {m.profiles?.avatar_url ? <img src={m.profiles.avatar_url} style={{ width: 28, height: 28, borderRadius: 4, flexShrink: 0 }} alt="" /> : <div style={{ width: 28, height: 28, borderRadius: 4, background: "#222", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>?</div>}
              <div style={{ flex: 1, minWidth: 0 }}>
                <button className="player-name-btn" onClick={() => onViewProfile && onViewProfile(m.user_id)} style={{ fontSize: 13, color: "#ccc", fontWeight: 500, fontFamily: "'Inter',sans-serif", textAlign: "left", transition: "color 0.15s", display: "block", maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {m.profiles?.username || "Anonymous"}
                </button>
                <p style={{ fontSize: 10, color: m.role === "judge" ? "#f5a623" : "#555" }}>
                  {m.role}{m.is_host && <span style={{ marginLeft: 6, fontSize: 9, background: "#e63946", color: "#fff", padding: "1px 5px", borderRadius: 3 }}>HOST</span>}
                </p>
              </div>
              {m.user_id === user?.id && <span style={{ fontSize: 10, color: "#555" }}>you</span>}
            </div>
          ))}
        </div>
      )}

      {/* Judge voting panel */}
      {isJudge && debaters.length > 0 && (
        <div style={{ padding: "10px 20px", borderBottom: "1px solid #1a1a1a", background: "#0a0a0a", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: "#f5a623", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}><Icons.Scale /> Vote for winner:</span>
          {debaters.map(m => (
            <button key={m.user_id} className="vote-btn" onClick={() => castVote(m.user_id)} disabled={!!myVote}
              style={{ padding: "5px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, background: myVote === m.user_id ? "#f5a623" : myVote ? "#111" : "#222", color: myVote === m.user_id ? "#000" : myVote ? "#555" : "#ccc", border: `1px solid ${myVote === m.user_id ? "#f5a623" : "#222"}`, cursor: myVote ? "default" : "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 6, fontFamily: "'Inter',sans-serif" }}>
              {m.profiles?.avatar_url && <img src={m.profiles.avatar_url} style={{ width: 18, height: 18, borderRadius: 3 }} alt="" />}
              <button className="player-name-btn" onClick={(e) => { e.stopPropagation(); onViewProfile && onViewProfile(m.user_id); }} style={{ color: "inherit", fontSize: 12, fontFamily: "'Inter',sans-serif" }}>
                {m.profiles?.username || "Debater"}
              </button>
              <span style={{ fontSize: 10, opacity: 0.7 }}>({voteCount[m.user_id] || 0})</span>
            </button>
          ))}
          {myVote && <span style={{ fontSize: 11, color: "#f5a623" }}>Voted!</span>}
        </div>
      )}

      {/* Waiting room with kick */}
      {isCreator && (!debateStarted || room.host_mode) && (
        <div style={{ padding: "8px 20px", borderBottom: "1px solid #1a1a1a", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: "#555" }}>Waiting room:</span>
          {members.filter(m => m.user_id !== user.id).map(m => (
            <div key={m.user_id} style={{ display: "flex", alignItems: "center", gap: 6, background: "#111", borderRadius: 6, padding: "3px 10px 3px 6px", border: "1px solid #222" }}>
              {m.profiles?.avatar_url && <img src={m.profiles.avatar_url} style={{ width: 18, height: 18, borderRadius: 3 }} alt="" />}
              <button className="player-name-btn" onClick={() => onViewProfile && onViewProfile(m.user_id)} style={{ fontSize: 12, color: "#ccc", fontFamily: "'Inter',sans-serif", transition: "color 0.15s" }}>
                {m.profiles?.username || "User"}
              </button>
              <span style={{ fontSize: 10, color: "#555" }}>{m.role}</span>
              <button className="kick-btn" onClick={() => kickMember(m.user_id)} style={{ display: "flex", alignItems: "center", color: "#555", padding: "1px 4px", borderRadius: 4, border: "1px solid #222", transition: "all 0.15s" }}><Icons.Kick /></button>
            </div>
          ))}
          {members.length < 2 && <span style={{ fontSize: 11, color: "#222" }}>Waiting for opponent…</span>}
        </div>
      )}

      {/* Votes display */}
      {!isJudge && votes.length > 0 && (
        <div style={{ padding: "7px 20px", borderBottom: "1px solid #1a1a1a", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 11, color: "#555", display: "flex", alignItems: "center", gap: 4 }}><Icons.Scale /> Votes:</span>
          {debaters.map(m => (
            <span key={m.user_id} style={{ fontSize: 12, color: "#888" }}>
              {m.profiles?.username || "Debater"}: <strong style={{ color: "#f5a623" }}>{voteCount[m.user_id] || 0}</strong>
            </span>
          ))}
        </div>
      )}

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {callActive && livekitToken && livekitUrl && (
          <div style={{ width: "55%", borderRight: "1px solid #1a1a1a", overflow: "hidden" }}>
            <LiveKitRoom token={livekitToken} serverUrl={livekitUrl} video={camOn && !isJudge} audio={micOn && !isJudge} onDisconnected={() => setCallActive(false)} style={{ height: "100%" }}>
              <VideoConference />
            </LiveKitRoom>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
          <div style={S.chatArea}>
            {isJudge && <div style={{ textAlign: "center", padding: "7px 14px", background: "#0a0a0a", borderRadius: 6, fontSize: 11, color: "#f5a623", marginBottom: 8, border: "1px solid #2a1500" }}>Judge mode — watch and vote only</div>}
            {!debateStarted && !isJudge && <div style={{ textAlign: "center", padding: "7px 14px", background: "#0d2a0d", borderRadius: 6, fontSize: 11, color: "#4caf50", marginBottom: 8, border: "1px solid #1a3a1a" }}>Waiting for host to start…</div>}
            {messages.length === 0 && <div style={{ textAlign: "center", color: "#222", fontSize: 13, marginTop: 20 }}>No messages yet.</div>}
            {messages.map(msg => (
              <div key={msg.id} className="msg-animate" style={{ ...S.msgRow, flexDirection: msg.user_id === user?.id ? "row-reverse" : "row" }}>
                {msg.profiles?.avatar_url && <img src={msg.profiles.avatar_url} style={{ width: 26, height: 26, borderRadius: 4, flexShrink: 0 }} alt="" />}
                <div style={{ ...S.msgBubble, background: msg.user_id === user?.id ? "#e63946" : "#111" }}>
                  {msg.user_id !== user?.id && (
                    <button className="player-name-btn" onClick={() => onViewProfile && onViewProfile(msg.user_id)} style={{ fontSize: 10, color: "#888", marginBottom: 2, fontFamily: "'Inter',sans-serif", textAlign: "left", transition: "color 0.15s" }}>
                      {msg.profiles?.username || "Anonymous"}
                    </button>
                  )}
                  <span style={{ fontSize: 14, color: "#fff" }}>{msg.content}</span>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          {!isJudge && (
            <div style={S.chatInput}>
              <input style={S.chatInputField} placeholder={debateStarted ? "Type your argument…" : "Waiting for debate to start…"} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && debateStarted && sendMessage()} disabled={!debateStarted} />
              <button className="send-btn" style={{ ...S.sendBtn, opacity: debateStarted ? 1 : 0.5, display: "flex", alignItems: "center", gap: 6 }} onClick={sendMessage} disabled={!debateStarted}>
                <Icons.Send /> <span>Send</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HomeScreen({ search, setSearch, selectedCategory, setSelectedCategory, filteredTopics, selectedTopic, setSelectedTopic, selectedLang, setSelectedLang, selectedFormat, setSelectedFormat, selectedDuration, setSelectedDuration, isAdultOnly, setIsAdultOnly, findDebate, rooms, joinRoom, hashtagFilter, setHashtagFilter }) {
  const [aiSearch, setAiSearch] = useState("");
  const [aiResults, setAiResults] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  async function searchWithAI() {
    if (!aiSearch.trim() || rooms.length === 0) return;
    setAiLoading(true);
    try {
      const roomList = rooms.map((r, i) => `${i}: "${r.title}"`).join(", ");
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: `Here are debate rooms: [${roomList}]. User wants: "${aiSearch}". Return ONLY a JSON array of index numbers that match, sorted by relevance. Example: [0,2,3]. If none match, return [].` }] })
      });
      const data = await res.json();
      if (data.error) { setAiResults([]); setAiLoading(false); return; }
      const text = data.content[0].text.replace(/```json|```/g, "").trim();
      const indices = JSON.parse(text);
      setAiResults(indices.map(i => rooms[i]?.id).filter(Boolean));
    } catch (e) { setAiResults([]); }
    setAiLoading(false);
  }

  // Collect all hashtags from rooms
  const allHashtags = [...new Set(rooms.flatMap(r => r.hashtags || []))].slice(0, 20);

  // Filter rooms by hashtag
  const hashtagFilteredRooms = hashtagFilter
    ? rooms.filter(r => r.hashtags && r.hashtags.includes(hashtagFilter))
    : null;

  return (
    <div>
      {/* LAYOUT: Topic + Connect side by side */}
      <div style={S.grid}>
        {/* Topic card */}
        <div style={S.card}>
          <h2 style={S.cardTitle}>Topic</h2>
          <div style={S.searchBox}>
            <span style={S.searchIcon}><Icons.Search /></span>
            <input style={S.searchInput} placeholder="Search topics…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={S.chips}>
            {["All", ...CATEGORIES].map(cat => (
              <button key={cat} className={`chip ${selectedCategory === cat ? "chip-sel" : ""}`} style={S.chip} onClick={() => setSelectedCategory(cat)}>{cat}</button>
            ))}
          </div>
          <div style={S.topicScroll}>
            {filteredTopics.map(t => (
              <button key={t.id} className={`topic-row ${selectedTopic?.id === t.id ? "topic-row-sel" : ""}`} style={S.topicRow} onClick={() => setSelectedTopic(t)}>
                <span style={S.topicLabel}>{t.label}</span>
                <span style={S.topicCat}>{t.category}</span>
              </button>
            ))}
          </div>
          {selectedTopic && (
            <div style={S.selectedBadge}>
              <span style={{ color: "#e63946" }}><Icons.Play /></span>
              <span style={{ fontWeight: 600, fontSize: 13, color: "#ccc" }}>{selectedTopic.label}</span>
              <button style={{ marginLeft: "auto", color: "#555" }} onClick={() => setSelectedTopic(null)}><Icons.Close /></button>
            </div>
          )}
        </div>

        {/* Connect card */}
        <div style={S.card}>
          <h2 style={S.cardTitle}>Connect</h2>
          <p style={S.fieldLabel}>Size</p>
          <div style={S.fmtRow}>
            {FORMATS.map(f => (
              <button key={f.id} className={`fmt-btn ${selectedFormat === f.id ? "fmt-sel" : ""}`} style={S.fmtBtn} onClick={() => setSelectedFormat(f.id)}>{f.label}</button>
            ))}
          </div>
          <p style={S.fieldLabel}>Duration</p>
          <div style={S.fmtRow}>
            {DURATIONS.map(d => (
              <button key={d.id} className={`dur-btn ${selectedDuration === d.id ? "dur-sel" : ""}`} style={{ ...S.fmtBtn, flexDirection: "column", gap: 2 }} onClick={() => setSelectedDuration(d.id)}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{d.label}</span>
                <span style={{ fontSize: 10, opacity: 0.6 }}>{d.desc}</span>
              </button>
            ))}
          </div>
          <p style={S.fieldLabel}>Opponent Language</p>
          <div style={S.langGrid}>
            {LANGUAGES.map(l => (
              <button key={l.code} className={`lang-btn ${selectedLang === l.code ? "lang-sel" : ""}`} style={S.langBtn} onClick={() => setSelectedLang(l.code)}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{l.flag}</span>
                <span style={{ fontSize: 11, marginTop: 2 }}>{l.label}</span>
              </button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18, padding: "10px 14px", background: "#0f1923", borderRadius: 8, border: `1px solid ${isAdultOnly ? "#e63946" : "#222"}` }}>
            <div>
              <p style={{ fontSize: 13, color: isAdultOnly ? "#e63946" : "#888", fontWeight: 600 }}>18+ Only</p>
              <p style={{ fontSize: 11, color: "#555", marginTop: 2 }}>Restrict room to adults</p>
            </div>
            <Toggle value={isAdultOnly} onChange={setIsAdultOnly} />
          </div>
          <button onClick={() => { setSelectedTopic(null); setSelectedFormat("1v1"); setSelectedDuration(40); setSelectedLang("en"); setIsAdultOnly(false); }} style={{ width: "100%", padding: "9px 0", background: "transparent", color: "#555", borderRadius: 8, fontSize: 12, border: "1px solid #222", marginTop: 12, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>Reset Filters</button>
          <button className="connect-btn" style={S.connectBtn} onClick={findDebate}>Find Debate</button>
          <p style={S.hint}>{selectedTopic ? <>Debating: <strong style={{ color: "#ccc" }}>{selectedTopic.label}</strong></> : "No topic selected — any topic"}</p>
        </div>
      </div>

      {/* Smart Search */}
      <div style={{ ...S.card, marginTop: 20 }}>
        <h2 style={S.cardTitle}>Smart Search</h2>
        <div style={S.searchBox}>
          <span style={S.searchIcon}><Icons.Sparkle /></span>
          <input style={S.searchInput} placeholder="What do you want to debate about?" value={aiSearch} onChange={e => setAiSearch(e.target.value)} onKeyDown={e => e.key === "Enter" && searchWithAI()} />
          <button onClick={searchWithAI} style={{ padding: "4px 14px", borderRadius: 6, background: aiLoading ? "#222" : "#e63946", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>
            {aiLoading ? "…" : "Search"}
          </button>
        </div>
        {aiResults !== null && aiResults.length === 0 && <p style={{ fontSize: 12, color: "#555", marginTop: 8 }}>No matching rooms found.</p>}
      </div>

      {/* Hashtag filter strip */}
      {allHashtags.length > 0 && (
        <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#555", display: "flex", alignItems: "center", gap: 4 }}><Icons.Hash /> Filter:</span>
          {hashtagFilter && (
            <button onClick={() => setHashtagFilter(null)} style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 20, border: "1px solid #e63946", background: "#2a1520", color: "#e63946", fontSize: 11, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>
              <Icons.Close /> Clear
            </button>
          )}
          {allHashtags.map(tag => (
            <button key={tag} className={`hashtag-pill ${hashtagFilter === tag ? "hashtag-pill-active" : ""}`}
              onClick={() => setHashtagFilter(hashtagFilter === tag ? null : tag)}
              style={{ padding: "3px 10px", borderRadius: 20, border: "1px solid #222", background: "#111", color: "#888", fontSize: 11, fontFamily: "'Inter',sans-serif", transition: "all 0.15s" }}>
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Active Rooms */}
      {(() => {
        const filtered = rooms.filter(r => {
          let score = 0;
          if (r.format === selectedFormat) score += 3;
          if (r.language === selectedLang) score += 2;
          if (selectedTopic && r.category === selectedTopic.category) score += 2;
          if (r.duration === selectedDuration) score += 1;
          return score > 0;
        });
        const aiFiltered = aiResults ? rooms.filter(r => aiResults.includes(r.id)) : null;
        const hashFiltered = hashtagFilteredRooms;
        const display = hashFiltered || aiFiltered || (filtered.length > 0 ? filtered : rooms);
        return display.length > 0 ? (
          <div style={{ marginTop: 24 }}>
            <h2 style={{ ...S.cardTitle, marginBottom: 16 }}>
              Active Rooms
              {hashtagFilter && <span style={{ fontSize: 12, color: "#e63946", fontWeight: 400, marginLeft: 10 }}>#{hashtagFilter}</span>}
              {!hashtagFilter && filtered.length > 0 && filtered.length < rooms.length && <span style={{ fontSize: 13, color: "#555", fontWeight: 400, marginLeft: 10 }}>{filtered.length} matching</span>}
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
              {display.map(room => (
                <div key={room.id} className="room-card" style={{ ...S.roomCard }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#ccc", marginBottom: 4, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        {room.title}
                        {room.is_adult_only && <span style={{ fontSize: 10, background: "#e63946", color: "#fff", padding: "1px 6px", borderRadius: 4 }}>18+</span>}
                        {room.host_mode && <span style={{ fontSize: 10, background: "#e63946", color: "#fff", padding: "1px 6px", borderRadius: 4 }}>HOST</span>}
                      </p>
                      {room.category && <span style={S.roomTag}>{room.category}</span>}
                      {/* Hashtags — clickable filters */}
                      {room.hashtags && room.hashtags.length > 0 && (
                        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 6 }}>
                          {room.hashtags.map(tag => (
                            <button key={tag} onClick={(e) => { e.stopPropagation(); setHashtagFilter(hashtagFilter === tag ? null : tag); }}
                              style={{ fontSize: 10, color: hashtagFilter === tag ? "#e63946" : "#555", background: hashtagFilter === tag ? "#2a1520" : "transparent", border: `1px solid ${hashtagFilter === tag ? "#e63946" : "#222"}`, padding: "1px 6px", borderRadius: 10, cursor: "pointer", fontFamily: "'Inter',sans-serif", transition: "all 0.15s" }}>
                              #{tag}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: 11, color: room.status === "active" ? "#4caf50" : "#555", whiteSpace: "nowrap", marginLeft: 8 }}>{room.status === "active" ? "● Live" : "waiting"}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                    <span style={{ fontSize: 11, color: "#555" }}>{room.format} · {DURATIONS.find(d => d.id === room.duration)?.label || "Standard"}</span>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="join-btn" style={S.joinBtn} onClick={() => joinRoom(room, "debater")}>Join</button>
                      <button className="judge-btn" style={S.judgeBtn} onClick={() => joinRoom(room, "judge")} title="Join as Judge">
                        <Icons.Scale />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null;
      })()}
    </div>
  );
}

function SettingsScreen({ settingsLang, setSettingsLang, camEnabled, setCamEnabled, micEnabled, setMicEnabled }) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [devices, setDevices] = useState({ video: [], audio: [] });
  const [selectedCam, setSelectedCam] = useState("");
  const [selectedMic, setSelectedMic] = useState("");
  const [camError, setCamError] = useState(false);

  useEffect(() => {
    async function getDevices() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        s.getTracks().forEach(t => t.stop());
        const allDevices = await navigator.mediaDevices.enumerateDevices();
        setDevices({ video: allDevices.filter(d => d.kind === "videoinput"), audio: allDevices.filter(d => d.kind === "audioinput") });
        const video = allDevices.filter(d => d.kind === "videoinput");
        const audio = allDevices.filter(d => d.kind === "audioinput");
        if (video[0]) setSelectedCam(video[0].deviceId);
        if (audio[0]) setSelectedMic(audio[0].deviceId);
      } catch { setCamError(true); }
    }
    getDevices();
  }, []);

  useEffect(() => {
    let s;
    async function startCam() {
      if (!camEnabled || !selectedCam) { if (stream) { stream.getTracks().forEach(t => t.stop()); setStream(null); } return; }
      try { s = await navigator.mediaDevices.getUserMedia({ video: { deviceId: selectedCam }, audio: false }); setStream(s); if (videoRef.current) videoRef.current.srcObject = s; } catch { setCamError(true); }
    }
    startCam();
    return () => { if (s) s.getTracks().forEach(t => t.stop()); };
  }, [camEnabled, selectedCam]);

  return (
    <div style={{ maxWidth: 580, margin: "0 auto", width: "100%" }}>
      <div style={S.card}>
        <h2 style={S.cardTitle}>Settings</h2>
        <p style={S.fieldLabel}>App Language</p>
        <div style={S.langGrid}>
          {LANGUAGES.map(l => (
            <button key={l.code} className={`lang-btn ${settingsLang === l.code ? "lang-sel" : ""}`} style={S.langBtn} onClick={() => setSettingsLang(l.code)}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>{l.flag}</span>
              <span style={{ fontSize: 11, marginTop: 2 }}>{l.label}</span>
            </button>
          ))}
        </div>
        <div style={S.divider} />
        <p style={S.fieldLabel}>Camera Preview</p>
        <div style={S.camPreview}>
          {camEnabled && !camError ? <video ref={videoRef} autoPlay muted playsInline style={S.video} /> : (
            <div style={S.camOff}><span style={{ color: "#555", fontSize: 13, marginTop: 8 }}>{camError ? "Not available" : "Off"}</span></div>
          )}
        </div>
        <div style={S.toggleRow}><span style={{ fontSize: 14, color: "#ccc" }}>Enable Camera</span><Toggle value={camEnabled} onChange={setCamEnabled} /></div>
        {devices.video.length > 0 && <select style={S.select} value={selectedCam} onChange={e => setSelectedCam(e.target.value)}>{devices.video.map(d => <option key={d.deviceId} value={d.deviceId}>{d.label || "Camera"}</option>)}</select>}
        <div style={S.divider} />
        <p style={S.fieldLabel}>Microphone</p>
        <div style={S.toggleRow}><span style={{ fontSize: 14, color: "#ccc" }}>Enable Microphone</span><Toggle value={micEnabled} onChange={setMicEnabled} /></div>
        {devices.audio.length > 0 && <select style={S.select} value={selectedMic} onChange={e => setSelectedMic(e.target.value)}>{devices.audio.map(d => <option key={d.deviceId} value={d.deviceId}>{d.label || "Microphone"}</option>)}</select>}
      </div>
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <button onClick={() => onChange(!value)} style={{ width: 44, height: 24, borderRadius: 12, background: value ? "#e63946" : "#222", position: "relative", flexShrink: 0, transition: "background 0.2s" }}>
      <span style={{ position: "absolute", top: 3, left: value ? 22 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.4)", transition: "left 0.2s" }} />
    </button>
  );
}

function CreateScreen({ roomTopic, setRoomTopic, user, onCreated }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [creating, setCreating] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(40);
  const [adultOnly, setAdultOnly] = useState(false);
  const [hostMode, setHostMode] = useState(false);

  const filtered = TOPICS.filter(t => {
    const matchCat = selectedCategory === "All" || t.category === selectedCategory;
    return matchCat && t.label.toLowerCase().includes(search.toLowerCase());
  });

  async function createRoom() {
    if (!user) { alert("Please sign in first!"); return; }
    if (!roomTopic.trim()) { alert("Please enter a room title!"); return; }
    setCreating(true);
    const tags = await generateTags(roomTopic);
    const { data } = await supabase.from("rooms").insert({
      title: roomTopic, topic: selectedTopic?.label, category: selectedTopic?.category,
      hashtags: tags, duration: selectedDuration, is_adult_only: adultOnly,
      host_mode: hostMode, created_by: user.id, status: "waiting",
    }).select().single();
    if (data) {
      await supabase.from("room_members").upsert({ room_id: data.id, user_id: user.id, role: "debater", is_host: true }, { onConflict: "room_id,user_id" });
      onCreated(data);
    }
    setCreating(false);
  }

  async function generateTags(title) {
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: `Generate exactly 5 short hashtags (1-2 words each, no # symbol) for a debate room titled: "${title}". Reply ONLY with a JSON array of 5 strings, nothing else.` }]
        })
      });
      const data = await res.json();
      const text = data.content[0].text.replace(/```json|```/g, "").trim();
      return JSON.parse(text);
    } catch { return []; }
  }

  return (
    <div style={{ maxWidth: 620, margin: "0 auto", width: "100%" }}>
      <div style={S.card}>
        <h2 style={S.cardTitle}>Create a Room</h2>
        <p style={S.fieldLabel}>Room Title</p>
        <input style={S.textInput} placeholder="e.g. Is veganism the future?" value={roomTopic} onChange={e => setRoomTopic(e.target.value)} />
        <p style={{ ...S.fieldLabel, marginTop: 22 }}>Duration</p>
        <div style={S.fmtRow}>
          {DURATIONS.map(d => (
            <button key={d.id} className={`dur-btn ${selectedDuration === d.id ? "dur-sel" : ""}`} style={{ ...S.fmtBtn, flexDirection: "column", gap: 2 }} onClick={() => setSelectedDuration(d.id)}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{d.label}</span>
              <span style={{ fontSize: 10, opacity: 0.6 }}>{d.desc}</span>
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18, padding: "10px 14px", background: "#0f1923", borderRadius: 8, border: `1px solid ${adultOnly ? "#e63946" : "#222"}` }}>
          <div>
            <p style={{ fontSize: 13, color: adultOnly ? "#e63946" : "#888", fontWeight: 600 }}>18+ Only</p>
            <p style={{ fontSize: 11, color: "#555", marginTop: 2 }}>You can kick underage players before starting</p>
          </div>
          <Toggle value={adultOnly} onChange={setAdultOnly} />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12, padding: "10px 14px", background: "#0f1923", borderRadius: 8, border: `1px solid ${hostMode ? "#e63946" : "#222"}` }}>
          <div>
            <p style={{ fontSize: 13, color: hostMode ? "#e63946" : "#888", fontWeight: 600 }}>Host Mode</p>
            <p style={{ fontSize: 11, color: "#555", marginTop: 2 }}>Streamer-style: kick & swap opponents anytime</p>
          </div>
          <Toggle value={hostMode} onChange={setHostMode} />
        </div>
        <p style={{ ...S.fieldLabel, marginTop: 22 }}>Select Debate Topic</p>
        <div style={S.searchBox}>
          <span style={S.searchIcon}><Icons.Search /></span>
          <input style={S.searchInput} placeholder="Search topics…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={S.chips}>
          {["All", ...CATEGORIES].map(cat => (
            <button key={cat} className={`chip ${selectedCategory === cat ? "chip-sel" : ""}`} style={S.chip} onClick={() => setSelectedCategory(cat)}>{cat}</button>
          ))}
        </div>
        <div style={{ ...S.topicScroll, maxHeight: 160 }}>
          {filtered.map(t => (
            <button key={t.id} className={`topic-row ${selectedTopic?.id === t.id ? "topic-row-sel" : ""}`} style={S.topicRow} onClick={() => setSelectedTopic(t)}>
              <span style={S.topicLabel}>{t.label}</span>
              <span style={S.topicCat}>{t.category}</span>
            </button>
          ))}
        </div>
        {selectedTopic && (
          <div style={S.selectedBadge}>
            <span style={{ color: "#e63946" }}><Icons.Play /></span>
            <span style={{ fontWeight: 600, fontSize: 13, color: "#ccc" }}>{selectedTopic.label}</span>
            <button style={{ marginLeft: "auto", color: "#555" }} onClick={() => setSelectedTopic(null)}><Icons.Close /></button>
          </div>
        )}
        <p style={{ fontSize: 11, color: "#555", marginTop: 12 }}>AI-generated hashtags will be added automatically to help players find your room.</p>
      </div>
      <button className="final-btn" style={S.finalBtn} onClick={createRoom} disabled={creating}>{creating ? "Creating…" : "Create Room"}</button>
    </div>
  );
}

function LoungeScreen({ user, profile }) {
  const [rooms, setRooms] = useState([]);
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [maxMembers, setMaxMembers] = useState(5);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [screen, setScreen] = useState("list");

  useEffect(() => { loadRooms(); }, []);

  async function loadRooms() {
    const { data } = await supabase.from("rooms").select("*").eq("type", "discussion").eq("is_private", false).in("status", ["waiting", "active"]).order("created_at", { ascending: false }).limit(20);
    if (data) setRooms(data);
  }

  async function createLounge() {
    if (!user) { alert("Please sign in first!"); return; }
    if (!newTitle.trim()) { alert("Please enter a title!"); return; }
    setCreating(true);
    const inviteCode = isPrivate ? Math.random().toString(36).substring(2, 8).toUpperCase() : null;
    const { data } = await supabase.from("rooms").insert({ title: newTitle, type: "discussion", is_private: isPrivate, invite_code: inviteCode, max_members: maxMembers, created_by: user.id, status: "waiting", format: "group" }).select().single();
    if (data) {
      await supabase.from("room_members").upsert({ room_id: data.id, user_id: user.id, role: "member" });
      setCurrentRoom(data); setScreen("room");
    }
    setCreating(false);
  }

  async function joinLounge(room) {
    if (!user) { alert("Please sign in first!"); return; }
    await supabase.from("room_members").upsert({ room_id: room.id, user_id: user.id, role: "member" });
    setCurrentRoom(room); setScreen("room");
  }

  if (screen === "room" && currentRoom) {
    return <LoungeRoom room={currentRoom} user={user} profile={profile} onBack={async () => {
      await supabase.from("room_members").delete().eq("room_id", currentRoom.id).eq("user_id", user.id);
      const { data: remaining } = await supabase.from("room_members").select("user_id").eq("room_id", currentRoom.id);
      if (!remaining || remaining.length === 0) await supabase.from("rooms").update({ status: "closed" }).eq("id", currentRoom.id);
      setCurrentRoom(null); setScreen("list"); loadRooms();
    }} />;
  }

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 24 }}>
        <div style={S.card}>
          <h2 style={S.cardTitle}>Create a Lounge</h2>
          <p style={S.fieldLabel}>Title</p>
          <input style={S.textInput} placeholder="e.g. Philosophy book club" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
          <p style={S.fieldLabel}>Max Members</p>
          <div style={{ display: "flex", gap: 8 }}>
            {[2, 5, 10].map(n => (
              <button key={n} onClick={() => setMaxMembers(n)} style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: `1px solid ${maxMembers === n ? "#ccc" : "#222"}`, background: maxMembers === n ? "#ccc" : "transparent", color: maxMembers === n ? "#0a0a0a" : "#888", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>{n}</button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18, padding: "10px 14px", background: "#0f1923", borderRadius: 8, border: `1px solid ${isPrivate ? "#f5a623" : "#222"}` }}>
            <div>
              <p style={{ fontSize: 13, color: isPrivate ? "#f5a623" : "#888", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}><Icons.Lock /> Private</p>
              <p style={{ fontSize: 11, color: "#555", marginTop: 2 }}>Only invite-link access</p>
            </div>
            <Toggle value={isPrivate} onChange={setIsPrivate} />
          </div>
          <button onClick={createLounge} disabled={creating} style={{ marginTop: 20, width: "100%", padding: "13px 0", background: "#ccc", color: "#0a0a0a", borderRadius: 8, fontSize: 14, fontWeight: 700, fontFamily: "'Syne',sans-serif", cursor: "pointer", letterSpacing: "0.5px" }}>{creating ? "Creating…" : "Create Lounge"}</button>
        </div>
        <div style={S.card}>
          <h2 style={S.cardTitle}>About Lounge</h2>
          <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7, marginTop: 8 }}>Lounges are calm discussion rooms — no debates, no judges, no timers. Just open conversation.</p>
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
            {[["Free-form chat", Icons.Send], ["Voice & video", Icons.Camera], ["Private rooms with invite link", Icons.Lock], ["Up to 10 members", Icons.Users]].map(([text, Icon]) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#555" }}><Icon /></span>
                <span style={{ fontSize: 13, color: "#ccc" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {rooms.length > 0 && (
        <div>
          <h2 style={{ ...S.cardTitle, marginBottom: 16 }}>Open Lounges</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
            {rooms.map(room => (
              <div key={room.id} className="room-card" style={S.roomCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#ccc" }}>{room.title}</p>
                  <span style={{ fontSize: 11, color: "#555", display: "flex", alignItems: "center", gap: 4 }}><Icons.Users /> {room.max_members || 10}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                  <span style={{ fontSize: 11, color: "#555" }}>discussion</span>
                  <button className="join-btn" style={S.joinBtn} onClick={() => joinLounge(room)}>Join</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LoungeRoom({ room, user, profile, onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [members, setMembers] = useState([]);
  const [livekitToken, setLivekitToken] = useState(null);
  const [livekitUrl, setLivekitUrl] = useState(null);
  const [callActive, setCallActive] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(room.title);
  const [currentTitle, setCurrentTitle] = useState(room.title);
  const [showMembers, setShowMembers] = useState(false);
  const bottomRef = useRef(null);
  const isCreator = user?.id === room.created_by;

  useEffect(() => {
    loadMessages(); loadMembers();
    const channel = supabase.channel(`lounge-${room.id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `room_id=eq.${room.id}` }, () => loadMessages())
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "rooms", filter: `id=eq.${room.id}` }, (payload) => { if (payload.new.title) setCurrentTitle(payload.new.title); })
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "room_members", filter: `room_id=eq.${room.id}` }, () => loadMembers())
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "room_members", filter: `room_id=eq.${room.id}` }, () => loadMembers())
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [room.id]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function loadMessages() {
    const { data } = await supabase.from("messages").select("*, profiles(username, avatar_url)").eq("room_id", room.id).order("created_at", { ascending: true });
    if (data) setMessages(data);
  }
  async function loadMembers() {
    const { data } = await supabase.from("room_members").select("*, profiles(username, avatar_url)").eq("room_id", room.id);
    if (data) setMembers(data);
  }
  async function sendMessage() {
    if (!input.trim() || !user) return;
    await supabase.from("messages").insert({ room_id: room.id, user_id: user.id, content: input.trim() });
    setInput(""); loadMessages();
  }
  async function updateTitle() {
    if (!newTitle.trim()) return;
    await supabase.from("rooms").update({ title: newTitle.trim() }).eq("id", room.id);
    setCurrentTitle(newTitle.trim()); setEditingTitle(false);
  }
  async function toggleCall() {
    if (callActive) { setCallActive(false); setLivekitToken(null); return; }
    try {
      const res = await fetch("/api/create-room", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ roomName: `vi-lounge-${room.id}`, participantName: profile?.username || user?.email || "user" }) });
      const data = await res.json();
      setLivekitToken(data.token); setLivekitUrl(data.url); setCallActive(true);
    } catch (e) { alert("Failed to start call."); }
  }

  return (
    <div style={S.roomContainer}>
      <div style={S.roomHeader}>
        <div style={{ flex: 1 }}>
          {editingTitle && isCreator ? (
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input style={{ ...S.chatInputField, fontSize: 15, fontWeight: 600, flex: 1 }} value={newTitle} onChange={e => setNewTitle(e.target.value)} onKeyDown={e => e.key === "Enter" && updateTitle()} autoFocus />
              <button onClick={updateTitle} style={{ padding: "6px 14px", background: "#e63946", color: "#fff", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>Save</button>
              <button onClick={() => setEditingTitle(false)} style={{ padding: "6px 10px", color: "#555", borderRadius: 6, fontSize: 12, cursor: "pointer" }}><Icons.Close /></button>
            </div>
          ) : (
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700, color: "#ccc", letterSpacing: "0.5px", display: "flex", alignItems: "center", gap: 8 }}>
              {currentTitle}
              <span style={{ fontSize: 10, background: "#0d2a0d", color: "#4caf50", padding: "2px 8px", borderRadius: 4, fontFamily: "'Inter',sans-serif" }}>lounge</span>
              {isCreator && <button onClick={() => setEditingTitle(true)} style={{ color: "#555", cursor: "pointer" }}><Icons.Edit /></button>}
            </h2>
          )}
          <p style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{members.length} members</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {room.is_private && room.invite_code && <span style={{ fontSize: 11, color: "#f5a623", background: "#241f0f", padding: "3px 10px", borderRadius: 6, border: "1px solid #f5a623", display: "flex", alignItems: "center", gap: 4 }}><Icons.Lock /> {room.invite_code}</span>}
          <button onClick={() => setShowMembers(!showMembers)} style={{ ...S.iconBtn, background: showMembers ? "#222" : "#111" }}>
            <Icons.Users /> <span style={{ fontSize: 12, marginLeft: 4 }}>{members.length}</span>
          </button>
          <button onClick={() => setMicOn(!micOn)} style={{ ...S.iconBtn, background: micOn ? "#e63946" : "#111", color: micOn ? "#fff" : "#888" }}><Icons.Mic off={!micOn} /></button>
          <button onClick={() => { setCamOn(!camOn); if (!callActive) toggleCall(); }} style={{ ...S.iconBtn, background: camOn ? "#e63946" : "#111", color: camOn ? "#fff" : "#888" }}><Icons.Camera off={!camOn} /></button>
          <button onClick={onBack} style={{ ...S.iconBtn, gap: 6 }}><Icons.Back /> <span style={{ fontSize: 12 }}>Leave</span></button>
        </div>
      </div>

      {showMembers && (
        <div className="slide-down" style={{ position: "absolute", top: 64, right: 16, background: "#0a0a0a", border: "1px solid #222", borderRadius: 10, padding: 16, zIndex: 20, minWidth: 200, boxShadow: "0 12px 40px rgba(0,0,0,0.7)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#ccc", textTransform: "uppercase", letterSpacing: "0.08em" }}>Members</span>
            <button onClick={() => setShowMembers(false)} style={{ color: "#555" }}><Icons.Close /></button>
          </div>
          {members.map(m => (
            <div key={m.user_id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: "1px solid #1a1a1a" }}>
              {m.profiles?.avatar_url ? <img src={m.profiles.avatar_url} style={{ width: 28, height: 28, borderRadius: 4 }} alt="" /> : <div style={{ width: 28, height: 28, borderRadius: 4, background: "#222", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>?</div>}
              <div>
                <p style={{ fontSize: 13, color: "#ccc", fontWeight: 500 }}>{m.profiles?.username || "Anonymous"}</p>
                <p style={{ fontSize: 11, color: "#555" }}>{m.role}</p>
              </div>
              {m.user_id === user?.id && <span style={{ marginLeft: "auto", fontSize: 10, color: "#555" }}>you</span>}
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {callActive && livekitToken && livekitUrl && (
          <div style={{ width: "55%", borderRight: "1px solid #1a1a1a", overflow: "hidden" }}>
            <LiveKitRoom token={livekitToken} serverUrl={livekitUrl} video={camOn} audio={micOn} onDisconnected={() => setCallActive(false)} style={{ height: "100%" }}><VideoConference /></LiveKitRoom>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
          <div style={S.chatArea}>
            {messages.length === 0 && <div style={{ textAlign: "center", color: "#222", fontSize: 13, marginTop: 20 }}>No messages yet.</div>}
            {messages.map(msg => (
              <div key={msg.id} className="msg-animate" style={{ ...S.msgRow, flexDirection: msg.user_id === user?.id ? "row-reverse" : "row" }}>
                {msg.profiles?.avatar_url && <img src={msg.profiles.avatar_url} style={{ width: 26, height: 26, borderRadius: 4, flexShrink: 0 }} alt="" />}
                <div style={{ ...S.msgBubble, background: msg.user_id === user?.id ? "#1a4a2a" : "#111" }}>
                  {msg.user_id !== user?.id && <span style={{ fontSize: 10, color: "#888", marginBottom: 2 }}>{msg.profiles?.username || "Anonymous"}</span>}
                  <span style={{ fontSize: 14, color: "#fff" }}>{msg.content}</span>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div style={S.chatInput}>
            <input style={S.chatInputField} placeholder="Say something…" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} />
            <button className="send-btn" style={{ ...S.sendBtn, background: "#4caf50", display: "flex", alignItems: "center", gap: 6 }} onClick={sendMessage}><Icons.Send /> Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShopScreen({ user, profile, setProfile }) {
  const [tab, setTab] = useState("sigs");
  const [buying, setBuying] = useState(null);
  const [owned, setOwned] = useState([]);

  useEffect(() => {
    supabase.from("user_items").select("item_id").eq("user_id", user.id).then(({ data }) => { if (data) setOwned(data.map(d => d.item_id)); });
  }, [user.id]);

  async function buyItem(item, currency) {
    const balance = currency === "sigs" ? (profile?.sigs || 0) : (profile?.deps || 0);
    if (balance < item.price) { alert("Not enough " + currency + "!"); return; }
    if (owned.includes(item.id)) { alert("Already owned!"); return; }
    setBuying(item.id);
    await supabase.from("user_items").insert({ user_id: user.id, item_id: item.id });
    await supabase.from("profiles").update({ [currency]: balance - item.price }).eq("id", user.id);
    setProfile(prev => ({ ...prev, [currency]: (prev?.[currency] || 0) - item.price }));
    setOwned(prev => [...prev, item.id]);
    setBuying(null);
  }

  const items = SHOP[tab];

  return (
    <div style={{ maxWidth: 620, margin: "0 auto", width: "100%" }}>
      <div style={S.card}>
        <h2 style={S.cardTitle}>Shop</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <span style={{ fontSize: 13, color: "#f5a623", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}><Icons.Coin /> {profile?.sigs || 0} Sigs</span>
          <span style={{ fontSize: 13, color: "#9b59b6", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}><Icons.Diamond /> {profile?.deps || 0} Deps</span>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <button onClick={() => setTab("sigs")} style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: `1px solid ${tab === "sigs" ? "#f5a623" : "#222"}`, background: tab === "sigs" ? "#241f0f" : "transparent", color: tab === "sigs" ? "#f5a623" : "#888", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Icons.Coin /> Sigs Shop</button>
          <button onClick={() => setTab("deps")} style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: `1px solid ${tab === "deps" ? "#9b59b6" : "#222"}`, background: tab === "deps" ? "#1e1228" : "transparent", color: tab === "deps" ? "#9b59b6" : "#888", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Icons.Diamond /> Deps Shop</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map(item => {
            const isOwned = owned.includes(item.id);
            const currency = tab;
            const balance = currency === "sigs" ? (profile?.sigs || 0) : (profile?.deps || 0);
            const canAfford = balance >= item.price;
            return (
              <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: "#0f1923", borderRadius: 8, border: `1px solid ${isOwned ? "#4caf50" : "#222"}` }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#ccc" }}>{item.name}</p>
                  <p style={{ fontSize: 12, color: "#555", marginTop: 2 }}>{item.desc}</p>
                </div>
                <button onClick={() => !isOwned && buyItem(item, currency)} disabled={isOwned || buying === item.id} style={{ padding: "8px 18px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: isOwned ? "default" : "pointer", background: isOwned ? "#0d2a0d" : canAfford ? (tab === "sigs" ? "#241f0f" : "#1e1228") : "#111", color: isOwned ? "#4caf50" : canAfford ? (tab === "sigs" ? "#f5a623" : "#9b59b6") : "#555", border: `1px solid ${isOwned ? "#4caf50" : canAfford ? (tab === "sigs" ? "#f5a623" : "#9b59b6") : "#222"}`, fontFamily: "'Inter',sans-serif", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 5 }}>
                  {isOwned ? "Owned" : buying === item.id ? "…" : <>{tab === "sigs" ? <Icons.Coin /> : <Icons.Diamond />} {item.price}</>}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---- STYLES — original palette restored ----
const S = {
  root: { minHeight: "100vh", background: "#0a0a0a", width: "100%", fontFamily: "'Inter', sans-serif", color: "#e0e0e0", overflowX: "hidden" },
  header: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 16px", height: 52, flexWrap: "nowrap", gap: 8, minWidth: 0,
    borderBottom: "1px solid #1a1a1a",
    background: "#0a0a0a",
    position: "sticky", top: 0, zIndex: 100,
    WebkitBackdropFilter: "blur(8px)",
  },
  logo: { display: "flex", alignItems: "center" },
  logoVi: { fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: "-1px" },
  nav: { display: "flex", gap: 16, alignItems: "center", overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none", flex: 1, justifyContent: "center", minWidth: 0 },
  main: { padding: "24px 16px", maxWidth: 980, margin: "0 auto", width: "100%" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 },
  card: { background: "#111", borderRadius: 16, padding: 24, border: "1px solid #1e1e1e" },
  cardTitle: { fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 18, letterSpacing: "-0.5px" },
  searchBox: { display: "flex", alignItems: "center", gap: 8, background: "#0a0a0a", borderRadius: 10, padding: "9px 12px", border: "1px solid #222", marginBottom: 12 },
  searchIcon: { color: "#444", display: "flex", alignItems: "center" },
  searchInput: { background: "none", border: "none", fontSize: 13, color: "#e0e0e0", flex: 1, fontFamily: "'Inter', sans-serif" },
  chips: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 },
  chip: { fontSize: 11, padding: "4px 10px", borderRadius: 20, background: "#1a1a1a", color: "#888", fontFamily: "'Inter', sans-serif", fontWeight: 500, transition: "all 0.15s" },
  topicScroll: { overflowY: "auto", maxHeight: 220, display: "flex", flexDirection: "column" },
  topicRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 10px", borderRadius: 8, width: "100%", textAlign: "left", borderLeft: "2px solid transparent", transition: "all 0.12s", fontFamily: "'Inter', sans-serif", background: "transparent" },
  topicLabel: { fontSize: 13, color: "#ccc" },
  topicCat: { fontSize: 11, color: "#444", fontStyle: "italic" },
  selectedBadge: { display: "flex", alignItems: "center", gap: 8, marginTop: 12, background: "#161616", borderRadius: 10, padding: "8px 12px", border: "1px solid #222", flexWrap: "wrap" },
  fieldLabel: { fontSize: 11, fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10, marginTop: 18 },
  fmtRow: { display: "flex", gap: 10 },
  fmtBtn: { flex: 1, padding: "10px 0", borderRadius: 10, border: "1px solid #222", fontSize: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif", color: "#888", transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center" },
  langGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 },
  langBtn: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "10px 4px", borderRadius: 10, border: "1.5px solid #222", fontSize: 11, fontFamily: "'Inter', sans-serif", color: "#888", transition: "all 0.15s", background: "#0f0f0f" },
  connectBtn: { marginTop: 20, width: "100%", padding: "15px 0", background: "#fff", color: "#0a0a0a", borderRadius: 12, fontSize: 15, fontWeight: 700, fontFamily: "'Syne', sans-serif", letterSpacing: "0.02em", transition: "all 0.15s", cursor: "pointer" },
  hint: { textAlign: "center", fontSize: 12, color: "#444", marginTop: 10 },
  divider: { height: 1, background: "#1a1a1a", margin: "20px 0" },
  camPreview: { width: "100%", aspectRatio: "16/9", background: "#0a0a0a", borderRadius: 12, overflow: "hidden", border: "1px solid #222", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 },
  video: { width: "100%", height: "100%", objectFit: "cover" },
  camOff: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
  toggleRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0" },
  select: { width: "100%", marginTop: 10, padding: "9px 12px", background: "#0a0a0a", border: "1px solid #222", borderRadius: 10, color: "#ccc", fontSize: 13, fontFamily: "'Inter', sans-serif" },
  textInput: { width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #222", fontSize: 13, fontFamily: "'Inter', sans-serif", background: "#0a0a0a", color: "#e0e0e0" },
  finalBtn: { marginTop: 24, width: "100%", padding: "15px 0", background: "#fff", color: "#0a0a0a", borderRadius: 12, fontSize: 15, fontWeight: 700, fontFamily: "'Syne', sans-serif", letterSpacing: "0.02em", transition: "all 0.15s", cursor: "pointer" },
  roomCard: { background: "#111", borderRadius: 12, padding: 16, border: "1px solid #1e1e1e", transition: "all 0.15s", cursor: "pointer" },
  roomTag: { fontSize: 11, color: "#e63946", background: "#1a0a0b", padding: "2px 8px", borderRadius: 20 },
  joinBtn: { padding: "6px 14px", borderRadius: 8, border: "1px solid #333", fontSize: 12, fontWeight: 600, color: "#888", fontFamily: "'Inter',sans-serif", transition: "all 0.15s" },
  judgeBtn: { padding: "6px 10px", borderRadius: 8, border: "1px solid #444", fontSize: 12, fontWeight: 600, color: "#888", fontFamily: "'Inter',sans-serif", transition: "all 0.15s", display: "flex", alignItems: "center" },
  roomContainer: { display: "flex", flexDirection: "column", height: "calc(100vh - 130px)", background: "#111", borderRadius: 16, border: "1px solid #1e1e1e", overflow: "hidden", position: "relative" },
  roomHeader: { padding: "16px 20px", borderBottom: "1px solid #1a1a1a", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 },
  chatArea: { flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 },
  msgRow: { display: "flex", gap: 8, alignItems: "flex-end" },
  msgBubble: { display: "flex", flexDirection: "column", padding: "8px 12px", borderRadius: 12, maxWidth: "70%" },
  chatInput: { padding: "12px 20px", borderTop: "1px solid #1a1a1a", display: "flex", gap: 10, flexShrink: 0 },
  chatInputField: { flex: 1, background: "#0a0a0a", border: "1px solid #222", borderRadius: 10, padding: "10px 14px", fontSize: 14, color: "#e0e0e0", fontFamily: "'Inter',sans-serif" },
  sendBtn: { padding: "10px 20px", background: "#e63946", color: "#fff", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: "'Syne',sans-serif", transition: "background 0.15s", cursor: "pointer" },
  iconBtn: { display: "flex", alignItems: "center", padding: "8px 12px", background: "#1a1a1a", color: "#888", borderRadius: 8, fontSize: 13, border: "1px solid #333", cursor: "pointer", transition: "all 0.15s", fontFamily: "'Inter',sans-serif" },
};