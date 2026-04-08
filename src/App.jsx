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
  const [roomHashtags, setRoomHashtags] = useState([]);
  const [hashtagInput, setHashtagInput] = useState("");
  const [isAdultOnly, setIsAdultOnly] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [myRole, setMyRole] = useState("debater");
  const [rooms, setRooms] = useState([]);

  async function loadProfile(userId) {
    const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
    if (data) setProfile(data);
  }

  async function loadRooms() {
    // Clean up empty old rooms first
    const thirtyMinsAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();
    await supabase.from("rooms").update({ status: "closed" })
      .eq("status", "waiting")
      .lt("created_at", thirtyMinsAgo);

    const { data } = await supabase
      .from("rooms").select("*")
      .in("status", ["waiting", "active"])
      .order("created_at", { ascending: false })
      .limit(20);
    if (data) setRooms(data);
    // Also close rooms where timer has expired
await supabase.from("rooms").update({ status: "closed" })
  .eq("status", "active")
  .not("started_at", "is", null)
  .lt("started_at", new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString());
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

  async function findDebate() {
  if (!user) { alert("Please sign in first!"); return; }
  let query = supabase.from("rooms").select("*").eq("status", "waiting").neq("created_by", user.id);
  if (selectedFormat) query = query.eq("format", selectedFormat);
  const { data: matches } = await query.limit(20);
  if (!matches || matches.length === 0) { alert("No rooms found. Use Create Room!"); return; }
  const scored = matches.map(r => {
    let score = 0;
    if (r.format === selectedFormat) score += 3;
    if (r.language === selectedLang) score += 2;
    if (selectedTopic && r.category === selectedTopic.category) score += 2;
    if (r.duration === selectedDuration) score += 1;
    return { ...r, score };
  }).sort((a, b) => b.score - a.score);
  const best = scored[0];
  await supabase.from("room_members").upsert({ room_id: best.id, user_id: user.id, role: "debater" });
  setMyRole("debater"); setCurrentRoom(best); setScreen("room");
}
   

  async function joinRoom(room, role = "debater") {
    if (!user) { alert("Please sign in first!"); return; }
    await supabase.from("room_members").upsert({ room_id: room.id, user_id: user.id, role });
    setMyRole(role); setCurrentRoom(room); setScreen("room");
  }

  const filteredTopics = TOPICS.filter((t) => {
    const matchCat = selectedCategory === "All" || t.category === selectedCategory;
    return matchCat && t.label.toLowerCase().includes(search.toLowerCase());
  });

  function addHashtag() {
    const tag = hashtagInput.trim().replace(/^#/, "");
    if (tag && roomHashtags.length < 5 && !roomHashtags.includes(tag)) {
      setRoomHashtags([...roomHashtags, tag]);
      setHashtagInput("");
    }
  }

  function removeHashtag(tag) {
    setRoomHashtags(roomHashtags.filter((t) => t !== tag));
  }

  return (
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
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
        .nav-btn { transition: color 0.15s; }
        .nav-btn:hover { color: #fff !important; }
        .nav-sel { color: #fff !important; }
        .hashtag-add:hover { background: #e63946 !important; color: #fff !important; }
        .final-btn:hover { background: #e63946 !important; }
        .toggle-track { transition: background 0.2s; }
        .toggle-thumb { transition: left 0.2s; }
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
        .adult-toggle:hover { border-color: #e63946 !important; }
        .adult-toggle-on { background: #1a0505 !important; border-color: #e63946 !important; color: #e63946 !important; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>

      <header style={S.header}>
        <div style={S.logo}><span style={S.logoVi}>Vi</span></div>
        <nav style={S.nav}>
          {screen === "room" ? (
            <button className="nav-btn" style={S.navBtn} onClick={() => { setScreen("home"); setCurrentRoom(null); setMyRole("debater"); loadRooms(); }}>← Back</button>
          ) : (
            ["home", "create", "settings"].map(s => (
              <button key={s} className={`nav-btn ${screen === s ? "nav-sel" : ""}`} style={S.navBtn} onClick={() => setScreen(s)}>
                {s === "home" ? "Home" : s === "create" ? "Create Room" : "Settings"}
              </button>
            ))
          )}
        </nav>
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {profile?.avatar_url && <img src={profile.avatar_url} className="profile-avatar" alt="avatar" onClick={() => setScreen("profile")} />}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", cursor: "pointer" }} onClick={() => setScreen("profile")}>
              <span style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>{profile?.username || user.email}</span>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ fontSize: 11, color: "#e63946" }}>🏆 {profile?.wins || 0}W</span>
                <span style={{ fontSize: 11, color: "#555" }}>{profile?.losses || 0}L</span>
                <span style={{ fontSize: 11, color: "#f5a623" }}>🪙 {profile?.coins || 0}</span>
              </div>
            </div>
            <button className="signout-btn" onClick={signOut} style={{ fontSize: 13, color: "#555", fontFamily: "'Inter',sans-serif", transition: "color 0.15s" }}>Sign out</button>
          </div>
        ) : (
          <button className="signin-btn" onClick={signInWithGoogle} style={{ padding: "8px 18px", background: "#fff", color: "#0a0a0a", borderRadius: 8, fontSize: 13, fontWeight: 600, fontFamily: "'Inter',sans-serif" }}>
            Sign in with Google
          </button>
        )}
      </header>

      <main style={S.main}>
        {screen === "home" && <HomeScreen
          search={search} setSearch={setSearch}
          selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
          filteredTopics={filteredTopics}
          selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic}
          selectedLang={selectedLang} setSelectedLang={setSelectedLang}
          selectedFormat={selectedFormat} setSelectedFormat={setSelectedFormat}
          selectedDuration={selectedDuration} setSelectedDuration={setSelectedDuration}
          isAdultOnly={isAdultOnly} setIsAdultOnly={setIsAdultOnly}
          findDebate={findDebate}
          rooms={rooms} joinRoom={joinRoom}
        />}
        {screen === "settings" && <SettingsScreen
          settingsLang={settingsLang} setSettingsLang={setSettingsLang}
          camEnabled={camEnabled} setCamEnabled={setCamEnabled}
          micEnabled={micEnabled} setMicEnabled={setMicEnabled}
        />}
        {screen === "create" && <CreateScreen
          roomTopic={roomTopic} setRoomTopic={setRoomTopic}
          roomHashtags={roomHashtags}
          hashtagInput={hashtagInput} setHashtagInput={setHashtagInput}
          addHashtag={addHashtag} removeHashtag={removeHashtag}
          user={user} onCreated={(room) => { setMyRole("debater"); setCurrentRoom(room); setScreen("room"); }}
        />}
        {screen === "room" && currentRoom && <RoomScreen room={currentRoom} user={user} profile={profile} myRole={myRole} setProfile={setProfile} />}
        {screen === "profile" && user && <ProfileScreen user={user} profile={profile} setProfile={setProfile} />}
      </main>
    </div>
  );
}

function ProfileScreen({ user, profile, setProfile }) {
  const [username, setUsername] = useState(profile?.username || "");
  const [saving, setSaving] = useState(false);
  const [history, setHistory] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase.from("debate_history").select("*").eq("user_id", user.id)
      .order("created_at", { ascending: false }).limit(20)
      .then(({ data }) => { if (data) setHistory(data); });
  }, [user.id]);

  async function saveUsername() {
    if (!username.trim()) return;
    setSaving(true);
    const { data } = await supabase.from("profiles").update({ username: username.trim() }).eq("id", user.id).select().single();
    if (data) { setProfile(data); setSaved(true); setTimeout(() => setSaved(false), 2000); }
    setSaving(false);
  }

  const winRate = (profile?.wins || profile?.losses)
    ? Math.round(((profile?.wins || 0) / ((profile?.wins || 0) + (profile?.losses || 0))) * 100) : 0;

  return (
    <div style={{ maxWidth: 580, margin: "0 auto", width: "100%" }}>
      <div style={S.card}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} style={{ width: 80, height: 80, borderRadius: "50%", border: "3px solid #e63946" }} alt="avatar" />
          ) : (
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#222", border: "3px solid #333", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>👤</div>
          )}
          <div>
            <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: 24, fontWeight: 700, color: "#fff" }}>{profile?.username || "Anonymous"}</h2>
            <p style={{ fontSize: 12, color: "#555", marginTop: 4 }}>{user.email}</p>
            {winRate > 0 && <p style={{ fontSize: 12, color: "#f5a623", marginTop: 4 }}>Win rate: {winRate}%</p>}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 28 }}>
          {[
            { label: "Wins", value: profile?.wins || 0, color: "#e63946", icon: "🏆" },
            { label: "Losses", value: profile?.losses || 0, color: "#555", icon: "💀" },
            { label: "Points", value: profile?.points || 0, color: "#888", icon: "⭐" },
            { label: "Coins", value: profile?.coins || 0, color: "#f5a623", icon: "🪙" },
          ].map(stat => (
            <div key={stat.label} style={{ background: "#0a0a0a", borderRadius: 12, padding: "14px 0", textAlign: "center", border: "1px solid #222" }}>
              <p style={{ fontSize: 18 }}>{stat.icon}</p>
              <p style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Syne',sans-serif", color: stat.color, marginTop: 4 }}>{stat.value}</p>
              <p style={{ fontSize: 10, color: "#555", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>{stat.label}</p>
            </div>
          ))}
        </div>

        <p style={S.fieldLabel}>Username</p>
        <div style={{ display: "flex", gap: 10 }}>
          <input style={{ ...S.textInput, flex: 1 }} value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" onKeyDown={e => e.key === "Enter" && saveUsername()} />
          <button className="save-btn" onClick={saveUsername} disabled={saving} style={{ padding: "10px 20px", background: saved ? "#4caf50" : "#e63946", color: "#fff", borderRadius: 10, fontSize: 13, fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: "pointer", transition: "background 0.2s", minWidth: 70 }}>
            {saving ? "…" : saved ? "✓" : "Save"}
          </button>
        </div>

        <p style={{ ...S.fieldLabel, marginTop: 28 }}>Debate History {history.length > 0 && <span style={{ color: "#444", fontWeight: 400 }}>({history.length})</span>}</p>
        {history.length === 0 ? (
          <p style={{ fontSize: 13, color: "#444", padding: "12px 0" }}>No debates yet — join your first debate!</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {history.map(h => (
              <div key={h.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#0a0a0a", borderRadius: 10, border: "1px solid #222" }}>
                <span style={{ fontSize: 13, color: "#ccc" }}>{h.topic || "Open Debate"}</span>
                <span style={{ fontSize: 12, color: h.result === "win" ? "#e63946" : "#555", fontWeight: 600 }}>
                  {h.result === "win" ? "🏆 Win" : "💀 Loss"}
                </span>
              </div>
            ))}
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
    function update() { setTimeLeft(Math.max(0, totalSeconds - Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000))); }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [duration, startedAt]);

  if (!startedAt || timeLeft === null) return null;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const isUrgent = timeLeft < 60;
  return (
    <span className={isUrgent ? "timer-urgent" : ""} style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: isUrgent ? "#e63946" : "#fff" }}>
      {timeLeft === 0 ? "⏱ Time's up!" : `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`}
    </span>
  );
}

function RoomScreen({ room, user, profile, myRole, setProfile }) {
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
  const [coinsAwarded, setCoinsAwarded] = useState(false);
  const bottomRef = useRef(null);

  const isCreator = user?.id === room.created_by;
  const isJudge = myRole === "judge";
  const debaters = members.filter(m => m.role === "debater");
  const judges = members.filter(m => m.role === "judge");

  useEffect(() => {
    loadMessages(); loadMembers(); loadVotes();
    const channel = supabase.channel(`room-${room.id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `room_id=eq.${room.id}` },
        (payload) => setMessages(prev => [...prev, payload.new]))
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "rooms", filter: `id=eq.${room.id}` },
        (payload) => {
          if (payload.new.started_at) setTimerStarted(payload.new.started_at);
          if (payload.new.started) setDebateStarted(true);
        })
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "votes", filter: `room_id=eq.${room.id}` }, () => loadVotes())
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "room_members", filter: `room_id=eq.${room.id}` }, () => loadMembers())
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "room_members", filter: `room_id=eq.${room.id}` }, () => loadMembers())
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [room.id]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  // Award coins when timer runs out
  useEffect(() => {
    if (!timerStarted || coinsAwarded || votes.length === 0) return;
    const totalSeconds = room.duration * 60;
    const elapsed = Math.floor((Date.now() - new Date(timerStarted).getTime()) / 1000);
    if (elapsed >= totalSeconds) awardCoins();
  }, [timerStarted, votes, coinsAwarded]);

  async function awardCoins() {
    if (coinsAwarded) return;
    setCoinsAwarded(true);
    const voteCount = {};
    votes.forEach(v => { voteCount[v.voted_for] = (voteCount[v.voted_for] || 0) + 1; });

    for (const debater of debaters) {
      const votesCast = voteCount[debater.user_id] || 0;
      const coins = votesCast * 100;
      if (coins > 0) {
        const { data } = await supabase.from("profiles").select("coins").eq("id", debater.user_id).single();
        const currentCoins = data?.coins || 0;
        await supabase.from("profiles").update({ coins: currentCoins + coins }).eq("id", debater.user_id);
        if (debater.user_id === user?.id) {
          setProfile(prev => ({ ...prev, coins: (prev?.coins || 0) + coins }));
        }
      }
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

  async function startTimer() {
    const now = new Date().toISOString();
    await supabase.from("rooms").update({ started_at: now, status: "active" }).eq("id", room.id);
    setTimerStarted(now);
  }

  async function startDebate() {
    await supabase.from("rooms").update({ started: true, status: "active" }).eq("id", room.id);
    setDebateStarted(true);
  }

  async function kickMember(memberId) {
    if (!isCreator || debateStarted) return;
    await supabase.from("room_members").delete().eq("room_id", room.id).eq("user_id", memberId);
  }

  const durationLabel = DURATIONS.find(d => d.id === room.duration)?.label || "Standard";
  const voteCount = {};
  votes.forEach(v => { voteCount[v.voted_for] = (voteCount[v.voted_for] || 0) + 1; });

  return (
    <div style={S.roomContainer}>
      <div style={S.roomHeader}>
        <div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 10 }}>
            {room.title}
            {room.is_adult_only && <span style={{ fontSize: 11, background: "#e63946", color: "#fff", padding: "2px 8px", borderRadius: 20, fontFamily: "'Inter',sans-serif" }}>18+</span>}
            {isJudge && <span style={{ fontSize: 11, background: "#f5a623", color: "#000", padding: "2px 8px", borderRadius: 20, fontFamily: "'Inter',sans-serif" }}>⚖️ Judge</span>}
          </h2>
          <p style={{ fontSize: 12, color: "#555", marginTop: 2 }}>{room.format} • {durationLabel} • {debaters.length} debaters • {judges.length} judges</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {timerStarted ? (
            <Timer duration={room.duration} startedAt={timerStarted} />
          ) : isCreator && !isJudge && (
            <button onClick={startTimer} style={{ padding: "6px 14px", background: "#1a1a1a", color: "#888", borderRadius: 8, fontSize: 12, fontWeight: 600, fontFamily: "'Inter',sans-serif", border: "1px solid #333", cursor: "pointer" }}>▶ Timer</button>
          )}

          {/* Mic toggle */}
          {!isJudge && (
            <button onClick={() => setMicOn(!micOn)} style={{ padding: "8px 12px", background: micOn ? "#e63946" : "#1a1a1a", color: micOn ? "#fff" : "#888", borderRadius: 8, fontSize: 13, border: "1px solid #333", cursor: "pointer" }}>
              {micOn ? "🎙️" : "🔇"}
            </button>
          )}

          {/* Cam toggle */}
          {!isJudge && (
            <button onClick={() => { setCamOn(!camOn); if (!callActive) toggleCall(); }} style={{ padding: "8px 12px", background: camOn ? "#e63946" : "#1a1a1a", color: camOn ? "#fff" : "#888", borderRadius: 8, fontSize: 13, border: "1px solid #333", cursor: "pointer" }}>
              {camOn ? "📹" : "📷"}
            </button>
          )}

          {/* Watch live for judges */}
          {isJudge && (
            <button onClick={toggleCall} style={{ padding: "8px 14px", background: callActive ? "#333" : "#1a1a1a", color: "#888", borderRadius: 8, fontSize: 12, border: "1px solid #333", cursor: "pointer" }}>
              {callActive ? "👁 Watching" : "👁 Watch"}
            </button>
          )}

          {/* Start debate / kick — only creator before debate starts */}
          {isCreator && !debateStarted && debaters.length >= 2 && (
            <button className="start-debate-btn" onClick={startDebate} style={{ padding: "8px 16px", background: "#1a3a1a", color: "#4caf50", borderRadius: 8, fontSize: 13, fontWeight: 600, border: "1px solid #4caf50", cursor: "pointer", transition: "background 0.15s" }}>
              ▶ Start
            </button>
          )}
        </div>
      </div>

      {/* Judge voting panel */}
      {isJudge && debaters.length > 0 && (
        <div style={{ padding: "12px 20px", borderBottom: "1px solid #1a1a1a", background: "#0f0f00", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: "#f5a623", fontWeight: 600 }}>⚖️ Vote for winner:</span>
          {debaters.map(m => (
            <button key={m.user_id} className="vote-btn" onClick={() => castVote(m.user_id)} disabled={!!myVote}
              style={{ padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, background: myVote === m.user_id ? "#f5a623" : myVote ? "#1a1a1a" : "#222", color: myVote === m.user_id ? "#000" : myVote ? "#555" : "#fff", border: `1px solid ${myVote === m.user_id ? "#f5a623" : "#333"}`, cursor: myVote ? "default" : "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 6 }}>
              {m.profiles?.avatar_url && <img src={m.profiles.avatar_url} style={{ width: 18, height: 18, borderRadius: "50%" }} alt="" />}
              {m.profiles?.username || "Debater"} <span style={{ fontSize: 11, opacity: 0.7 }}>({voteCount[m.user_id] || 0})</span>
            </button>
          ))}
          {myVote && <span style={{ fontSize: 12, color: "#f5a623" }}>✓ Voted!</span>}
        </div>
      )}

      {/* Members panel with kick for creator */}
      {isCreator && !debateStarted && (
        <div style={{ padding: "10px 20px", borderBottom: "1px solid #1a1a1a", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: "#555" }}>Waiting room:</span>
          {members.filter(m => m.user_id !== user.id).map(m => (
            <div key={m.user_id} style={{ display: "flex", alignItems: "center", gap: 6, background: "#1a1a1a", borderRadius: 20, padding: "4px 10px" }}>
              {m.profiles?.avatar_url && <img src={m.profiles.avatar_url} style={{ width: 20, height: 20, borderRadius: "50%" }} alt="" />}
              <span style={{ fontSize: 12, color: "#ccc" }}>{m.profiles?.username || "User"}</span>
              <span style={{ fontSize: 10, color: "#555" }}>{m.role}</span>
              <button className="kick-btn" onClick={() => kickMember(m.user_id)} style={{ fontSize: 11, color: "#555", padding: "2px 6px", borderRadius: 10, border: "1px solid #333", transition: "all 0.15s" }}>✕</button>
            </div>
          ))}
          {members.length < 2 && <span style={{ fontSize: 11, color: "#444" }}>Waiting for opponent…</span>}
        </div>
      )}

      {/* Votes display for debaters */}
      {!isJudge && votes.length > 0 && (
        <div style={{ padding: "8px 20px", borderBottom: "1px solid #1a1a1a", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 12, color: "#555" }}>⚖️ Votes:</span>
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
            {isJudge && <div style={{ textAlign: "center", padding: "8px 16px", background: "#0f0f00", borderRadius: 8, fontSize: 12, color: "#f5a623", marginBottom: 8 }}>⚖️ Judge mode — watch and vote only</div>}
            {!debateStarted && !isJudge && <div style={{ textAlign: "center", padding: "8px 16px", background: "#0a1a0a", borderRadius: 8, fontSize: 12, color: "#4caf50", marginBottom: 8 }}>Waiting for host to start the debate…</div>}
            {messages.length === 0 && <div style={{ textAlign: "center", color: "#333", fontSize: 13, marginTop: 20 }}>No messages yet.</div>}
            {messages.map(msg => (
              <div key={msg.id} style={{ ...S.msgRow, flexDirection: msg.user_id === user?.id ? "row-reverse" : "row" }}>
                {msg.profiles?.avatar_url && <img src={msg.profiles.avatar_url} style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0 }} alt="" />}
                <div style={{ ...S.msgBubble, background: msg.user_id === user?.id ? "#e63946" : "#1a1a1a" }}>
                  {msg.user_id !== user?.id && <span style={{ fontSize: 11, color: "#888", marginBottom: 2 }}>{msg.profiles?.username || "Anonymous"}</span>}
                  <span style={{ fontSize: 14, color: "#fff" }}>{msg.content}</span>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          {!isJudge && (
            <div style={S.chatInput}>
              <input style={S.chatInputField} placeholder={debateStarted ? "Type your argument…" : "Waiting for debate to start…"} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && debateStarted && sendMessage()} disabled={!debateStarted} />
              <button className="send-btn" style={{ ...S.sendBtn, opacity: debateStarted ? 1 : 0.5 }} onClick={sendMessage} disabled={!debateStarted}>Send</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HomeScreen({ search, setSearch, selectedCategory, setSelectedCategory, filteredTopics, selectedTopic, setSelectedTopic, selectedLang, setSelectedLang, selectedFormat, setSelectedFormat, selectedDuration, setSelectedDuration, isAdultOnly, setIsAdultOnly, findDebate, rooms, joinRoom }) {
  return (
    <div>
      <div style={S.grid}>
        <div style={S.card}>
          <h2 style={S.cardTitle}>Topic</h2>
          <div style={S.searchBox}>
            <span style={S.searchIcon}>⌕</span>
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
              <span style={{ color: "#e63946" }}>▶</span>
              <span style={{ fontWeight: 600, fontSize: 13 }}>{selectedTopic.label}</span>
              <button style={{ marginLeft: "auto", color: "#555" }} onClick={() => setSelectedTopic(null)}>✕</button>
            </div>
          )}
        </div>

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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18, padding: "10px 14px", background: "#0a0a0a", borderRadius: 10, border: `1px solid ${isAdultOnly ? "#e63946" : "#222"}` }}>
            <div>
              <p style={{ fontSize: 13, color: isAdultOnly ? "#e63946" : "#888", fontWeight: 600 }}>🔞 18+ Only</p>
              <p style={{ fontSize: 11, color: "#444", marginTop: 2 }}>Restrict room to adults</p>
            </div>
            <Toggle value={isAdultOnly} onChange={setIsAdultOnly} />
          </div>
          <button onClick={() => { setSelectedTopic(null); setSelectedFormat("1v1"); setSelectedDuration(40); setSelectedLang("en"); setIsAdultOnly(false); }} style={{ width: "100%", padding: "10px 0", background: "transparent", color: "#555", borderRadius: 12, fontSize: 13, border: "1px solid #222", marginTop: 12, cursor: "pointer" }}>
  Reset Filters
</button>
          <button className="connect-btn" style={S.connectBtn} onClick={findDebate}>Find Debate</button>
          <p style={S.hint}>{selectedTopic ? <>Debating: <strong style={{ color: "#fff" }}>{selectedTopic.label}</strong></> : "No topic selected — any topic"}</p>
        </div>
      </div>

      {rooms.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h2 style={{ ...S.cardTitle, marginBottom: 16 }}>Active Rooms</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
            {rooms.map(room => (
              <div key={room.id} className="room-card" style={S.roomCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                      {room.title}
                      {room.is_adult_only && <span style={{ fontSize: 10, background: "#e63946", color: "#fff", padding: "1px 6px", borderRadius: 10 }}>18+</span>}
                    </p>
                    {room.category && <span style={S.roomTag}>{room.category}</span>}
                  </div>
                  <span style={{ fontSize: 11, color: room.status === "active" ? "#4caf50" : "#555" }}>{room.status === "active" ? "🔴 Live" : "waiting"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                  <span style={{ fontSize: 12, color: "#555" }}>{room.format} • {DURATIONS.find(d => d.id === room.duration)?.label || "Standard"}</span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="join-btn" style={S.joinBtn} onClick={() => joinRoom(room, "debater")}>Join</button>
                    <button className="judge-btn" style={S.judgeBtn} onClick={() => joinRoom(room, "judge")}>⚖️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
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
        const video = allDevices.filter(d => d.kind === "videoinput");
        const audio = allDevices.filter(d => d.kind === "audioinput");
        setDevices({ video, audio });
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
      try {
        s = await navigator.mediaDevices.getUserMedia({ video: { deviceId: selectedCam }, audio: false });
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch { setCamError(true); }
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
            <div style={S.camOff}>
              <span style={{ fontSize: 32 }}>📷</span>
              <span style={{ color: "#555", fontSize: 13, marginTop: 8 }}>{camError ? "Not available" : "Off"}</span>
            </div>
          )}
        </div>
        <div style={S.toggleRow}>
          <span style={{ fontSize: 14, color: "#ccc" }}>Enable Camera</span>
          <Toggle value={camEnabled} onChange={setCamEnabled} />
        </div>
        {devices.video.length > 0 && (
          <select style={S.select} value={selectedCam} onChange={e => setSelectedCam(e.target.value)}>
            {devices.video.map(d => <option key={d.deviceId} value={d.deviceId}>{d.label || "Camera"}</option>)}
          </select>
        )}
        <div style={S.divider} />
        <p style={S.fieldLabel}>Microphone</p>
        <div style={S.toggleRow}>
          <span style={{ fontSize: 14, color: "#ccc" }}>Enable Microphone</span>
          <Toggle value={micEnabled} onChange={setMicEnabled} />
        </div>
        {devices.audio.length > 0 && (
          <select style={S.select} value={selectedMic} onChange={e => setSelectedMic(e.target.value)}>
            {devices.audio.map(d => <option key={d.deviceId} value={d.deviceId}>{d.label || "Microphone"}</option>)}
          </select>
        )}
      </div>
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <button onClick={() => onChange(!value)} className="toggle-track" style={{ width: 46, height: 26, borderRadius: 13, background: value ? "#e63946" : "#333", position: "relative", flexShrink: 0 }}>
      <span className="toggle-thumb" style={{ position: "absolute", top: 3, left: value ? 23 : 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.4)" }} />
    </button>
  );
}

function CreateScreen({ roomTopic, setRoomTopic, roomHashtags, hashtagInput, setHashtagInput, addHashtag, removeHashtag, user, onCreated }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [creating, setCreating] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(40);
  const [adultOnly, setAdultOnly] = useState(false);

  const filtered = TOPICS.filter(t => {
    const matchCat = selectedCategory === "All" || t.category === selectedCategory;
    return matchCat && t.label.toLowerCase().includes(search.toLowerCase());
  });

  async function createRoom() {
    if (!user) { alert("Please sign in first!"); return; }
    if (!roomTopic.trim()) { alert("Please enter a room title!"); return; }
    setCreating(true);
    const { data } = await supabase.from("rooms").insert({
      title: roomTopic, topic: selectedTopic?.label, category: selectedTopic?.category,
      hashtags: roomHashtags, duration: selectedDuration, is_adult_only: adultOnly,
      created_by: user.id, status: "waiting",
    }).select().single();
    if (data) {
      await supabase.from("room_members").insert({ room_id: data.id, user_id: user.id, role: "debater" });
      onCreated(data);
    }
    setCreating(false);
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

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18, padding: "10px 14px", background: "#0a0a0a", borderRadius: 10, border: `1px solid ${adultOnly ? "#e63946" : "#222"}` }}>
          <div>
            <p style={{ fontSize: 13, color: adultOnly ? "#e63946" : "#888", fontWeight: 600 }}>🔞 18+ Only</p>
            <p style={{ fontSize: 11, color: "#444", marginTop: 2 }}>You can kick underage players before starting</p>
          </div>
          <Toggle value={adultOnly} onChange={setAdultOnly} />
        </div>

        <p style={{ ...S.fieldLabel, marginTop: 22 }}>Select Debate Topic</p>
        <div style={S.searchBox}>
          <span style={S.searchIcon}>⌕</span>
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
            <span style={{ color: "#e63946" }}>▶</span>
            <span style={{ fontWeight: 600, fontSize: 13 }}>{selectedTopic.label}</span>
            <button style={{ marginLeft: "auto", color: "#555" }} onClick={() => setSelectedTopic(null)}>✕</button>
          </div>
        )}
        <p style={{ ...S.fieldLabel, marginTop: 22 }}>Hashtags <span style={{ color: "#555", fontWeight: 400 }}>({roomHashtags.length}/5)</span></p>
        <div style={S.searchBox}>
          <span style={S.searchIcon}>#</span>
          <input style={S.searchInput} placeholder="Add hashtag…" value={hashtagInput} onChange={e => setHashtagInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addHashtag()} />
          <button className="hashtag-add" style={S.hashtagAdd} onClick={addHashtag}>Add</button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
          {roomHashtags.map(tag => (
            <span key={tag} style={S.hashtagPill}>#{tag} <button style={{ marginLeft: 6, color: "#666" }} onClick={() => removeHashtag(tag)}>✕</button></span>
          ))}
        </div>
        <button className="final-btn" style={S.finalBtn} onClick={createRoom} disabled={creating}>
          {creating ? "Creating…" : "Create Room"}
        </button>
      </div>
    </div>
  );
}

const S = {
  root: { minHeight: "100vh", background: "#0a0a0a", width: "100%", fontFamily: "'Inter', sans-serif", color: "#e0e0e0" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px", borderBottom: "1px solid #1a1a1a", background: "#0a0a0a", position: "sticky", top: 0, zIndex: 10 },
  logo: { display: "flex", alignItems: "center" },
  logoVi: { fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: "-1px" },
  nav: { display: "flex", gap: 28 },
  navBtn: { fontSize: 14, color: "#555", fontWeight: 500, padding: "4px 0" },
  main: { padding: "32px 24px", maxWidth: 980, margin: "0 auto" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 },
  card: { background: "#111", borderRadius: 16, padding: 24, border: "1px solid #1e1e1e" },
  cardTitle: { fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 18, letterSpacing: "-0.5px" },
  searchBox: { display: "flex", alignItems: "center", gap: 8, background: "#0a0a0a", borderRadius: 10, padding: "9px 12px", border: "1px solid #222", marginBottom: 12 },
  searchIcon: { color: "#444", fontSize: 18 },
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
  hashtagAdd: { padding: "4px 12px", borderRadius: 8, background: "#1a1a1a", fontSize: 12, fontWeight: 600, fontFamily: "'Inter', sans-serif", color: "#888", transition: "all 0.15s" },
  hashtagPill: { display: "flex", alignItems: "center", padding: "4px 10px", background: "#1a1a1a", borderRadius: 20, fontSize: 13, color: "#ccc", border: "1px solid #2a2a2a" },
  finalBtn: { marginTop: 24, width: "100%", padding: "15px 0", background: "#fff", color: "#0a0a0a", borderRadius: 12, fontSize: 15, fontWeight: 700, fontFamily: "'Syne', sans-serif", letterSpacing: "0.02em", transition: "all 0.15s", cursor: "pointer" },
  roomCard: { background: "#111", borderRadius: 12, padding: 16, border: "1px solid #1e1e1e", transition: "all 0.15s", cursor: "pointer" },
  roomTag: { fontSize: 11, color: "#e63946", background: "#1a0a0b", padding: "2px 8px", borderRadius: 20 },
  joinBtn: { padding: "6px 14px", borderRadius: 8, border: "1px solid #333", fontSize: 12, fontWeight: 600, color: "#888", fontFamily: "'Inter',sans-serif", transition: "all 0.15s" },
  judgeBtn: { padding: "6px 10px", borderRadius: 8, border: "1px solid #444", fontSize: 12, fontWeight: 600, color: "#888", fontFamily: "'Inter',sans-serif", transition: "all 0.15s" },
  roomContainer: { display: "flex", flexDirection: "column", height: "calc(100vh - 130px)", background: "#111", borderRadius: 16, border: "1px solid #1e1e1e", overflow: "hidden" },
  roomHeader: { padding: "16px 20px", borderBottom: "1px solid #1a1a1a", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 },
  chatArea: { flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 },
  msgRow: { display: "flex", gap: 8, alignItems: "flex-end" },
  msgBubble: { display: "flex", flexDirection: "column", padding: "8px 12px", borderRadius: 12, maxWidth: "70%" },
  chatInput: { padding: "12px 20px", borderTop: "1px solid #1a1a1a", display: "flex", gap: 10, flexShrink: 0 },
  chatInputField: { flex: 1, background: "#0a0a0a", border: "1px solid #222", borderRadius: 10, padding: "10px 14px", fontSize: 14, color: "#e0e0e0", fontFamily: "'Inter',sans-serif" },
  sendBtn: { padding: "10px 20px", background: "#e63946", color: "#fff", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: "'Syne',sans-serif", transition: "background 0.15s", cursor: "pointer" },
};