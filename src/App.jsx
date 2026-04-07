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
const MODES = [
  { id: "chat", icon: "💬", label: "Chat" },
  { id: "voice", icon: "🎙️", label: "Voice" },
  { id: "video", icon: "📹", label: "Video" },
];
const FORMATS = [
  { id: "1v1", label: "1 vs 1" },
  { id: "3v3", label: "3 vs 3" },
];
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
  const [selectedMode, setSelectedMode] = useState("chat");
  const [selectedFormat, setSelectedFormat] = useState("1v1");
  const [selectedDuration, setSelectedDuration] = useState(40);
  const [settingsLang, setSettingsLang] = useState("en");
  const [camEnabled, setCamEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [roomTopic, setRoomTopic] = useState("");
  const [roomHashtags, setRoomHashtags] = useState([]);
  const [hashtagInput, setHashtagInput] = useState("");
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [rooms, setRooms] = useState([]);

  async function loadProfile(userId) {
    const { data } = await supabase.from("profiles").select("*").eq("id", userId).single();
    if (data) setProfile(data);
  }

  async function loadRooms() {
    const { data } = await supabase
      .from("rooms")
      .select("*")
      .eq("status", "waiting")
      .order("created_at", { ascending: false })
      .limit(20);
    if (data) setRooms(data);
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
  }

  async function findOrCreateRoom() {
    if (!user) { alert("Please sign in first!"); return; }
    const { data: existing } = await supabase
      .from("rooms")
      .select("*")
      .eq("status", "waiting")
      .eq("mode", selectedMode)
      .eq("format", selectedFormat)
      .neq("created_by", user.id)
      .limit(1)
      .single();

    if (existing) {
      await supabase.from("room_members").upsert({ room_id: existing.id, user_id: user.id });
      setCurrentRoom(existing);
      setScreen("room");
    } else {
      const { data: newRoom } = await supabase
        .from("rooms")
        .insert({
          title: selectedTopic ? selectedTopic.label : "Open Debate",
          topic: selectedTopic?.label,
          category: selectedTopic?.category,
          mode: selectedMode,
          format: selectedFormat,
          duration: selectedDuration,
          created_by: user.id,
          status: "waiting",
        })
        .select()
        .single();
      if (newRoom) {
        await supabase.from("room_members").insert({ room_id: newRoom.id, user_id: user.id });
        setCurrentRoom(newRoom);
        setScreen("room");
      }
    }
  }

  async function joinRoom(room) {
    if (!user) { alert("Please sign in first!"); return; }
    await supabase.from("room_members").upsert({ room_id: room.id, user_id: user.id });
    setCurrentRoom(room);
    setScreen("room");
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
        .mode-btn:hover { background: #1a1a1a !important; border-color: #444 !important; }
        .mode-sel { background: #e63946 !important; border-color: #e63946 !important; color: #fff !important; }
        .fmt-btn:hover { background: #1a1a1a !important; border-color: #555 !important; }
        .fmt-sel { background: #fff !important; color: #0a0a0a !important; border-color: #fff !important; }
        .dur-btn:hover { background: #1a1a1a !important; border-color: #555 !important; }
        .dur-sel { background: #e63946 !important; color: #fff !important; border-color: #e63946 !important; }
        .lang-btn:hover { border-color: #555 !important; background: #1a1a1a !important; }
        .lang-sel { border-color: #e63946 !important; background: #1a0a0b !important; color: #e63946 !important; }
        .connect-btn { transition: all 0.15s; }
        .connect-btn:hover { background: #e63946 !important; transform: translateY(-1px); }
        .nav-btn { transition: color 0.15s; }
        .nav-btn:hover { color: #fff !important; }
        .nav-sel { color: #fff !important; }
        .hashtag-add:hover { background: #e63946 !important; color: #fff !important; }
        .final-btn { transition: all 0.15s; }
        .final-btn:hover { background: #e63946 !important; }
        .toggle-track { transition: background 0.2s; }
        .toggle-thumb { transition: left 0.2s; }
        .signin-btn:hover { background: #f0f0f0 !important; }
        .signout-btn:hover { color: #ff6b6b !important; }
        .profile-avatar { border-radius: 50%; width: 32px; height: 32px; object-fit: cover; border: 2px solid #333; }
        .room-card:hover { border-color: #333 !important; background: #161616 !important; }
        .join-btn:hover { background: #e63946 !important; color: #fff !important; border-color: #e63946 !important; }
        .send-btn:hover { background: #c0303a !important; }
        .start-btn:hover { opacity: 0.85; }
        .timer-urgent { color: #e63946 !important; animation: pulse 1s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>

      <header style={S.header}>
        <div style={S.logo}><span style={S.logoVi}>Vi</span></div>
        <nav style={S.nav}>
          {screen === "room" ? (
            <button className="nav-btn" style={S.navBtn} onClick={() => { setScreen("home"); setCurrentRoom(null); loadRooms(); }}>← Back</button>
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
            {profile?.avatar_url && <img src={profile.avatar_url} className="profile-avatar" alt="avatar" />}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <span style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>{profile?.username || user.email}</span>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ fontSize: 11, color: "#e63946" }}>🏆 {profile?.wins || 0}W</span>
                <span style={{ fontSize: 11, color: "#555" }}>{profile?.losses || 0}L</span>
                <span style={{ fontSize: 11, color: "#888" }}>⭐ {profile?.points || 0}pts</span>
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
          selectedMode={selectedMode} setSelectedMode={setSelectedMode}
          selectedFormat={selectedFormat} setSelectedFormat={setSelectedFormat}
          selectedDuration={selectedDuration} setSelectedDuration={setSelectedDuration}
          findOrCreateRoom={findOrCreateRoom}
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
          user={user} onCreated={(room) => { setCurrentRoom(room); setScreen("room"); }}
        />}
        {screen === "room" && currentRoom && <RoomScreen room={currentRoom} user={user} profile={profile} />}
      </main>
    </div>
  );
}

function Timer({ duration, startedAt }) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!startedAt) return;
    const totalSeconds = duration * 60;
    function update() {
      const elapsed = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000);
      const left = Math.max(0, totalSeconds - elapsed);
      setTimeLeft(left);
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [duration, startedAt]);

  if (!startedAt || timeLeft === null) return null;

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const isUrgent = timeLeft < 60;
  const label = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  return (
    <span className={isUrgent ? "timer-urgent" : ""} style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: isUrgent ? "#e63946" : "#fff", minWidth: 60, textAlign: "center" }}>
      {timeLeft === 0 ? "Time's up!" : label}
    </span>
  );
}

function HomeScreen({ search, setSearch, selectedCategory, setSelectedCategory, filteredTopics, selectedTopic, setSelectedTopic, selectedLang, setSelectedLang, selectedMode, setSelectedMode, selectedFormat, setSelectedFormat, selectedDuration, setSelectedDuration, findOrCreateRoom, rooms, joinRoom }) {
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
          <p style={S.fieldLabel}>Format</p>
          <div style={S.modeRow}>
            {MODES.map(m => (
              <button key={m.id} className={`mode-btn ${selectedMode === m.id ? "mode-sel" : ""}`} style={S.modeBtn} onClick={() => setSelectedMode(m.id)}>
                <span style={{ fontSize: 22 }}>{m.icon}</span>
                <span style={{ fontSize: 12, marginTop: 4 }}>{m.label}</span>
              </button>
            ))}
          </div>
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
          <button className="connect-btn" style={S.connectBtn} onClick={findOrCreateRoom}>Find Debate</button>
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
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 4 }}>{room.title}</p>
                    {room.category && <span style={S.roomTag}>{room.category}</span>}
                  </div>
                  <span style={{ fontSize: 11, color: "#555" }}>{room.mode}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                  <span style={{ fontSize: 12, color: "#555" }}>
                    {room.format} • {DURATIONS.find(d => d.id === room.duration)?.label || "Standard"}
                  </span>
                  <button className="join-btn" style={S.joinBtn} onClick={() => joinRoom(room)}>Join</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function RoomScreen({ room, user, profile }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [members, setMembers] = useState([]);
  const [livekitToken, setLivekitToken] = useState(null);
  const [livekitUrl, setLivekitUrl] = useState(null);
  const [callActive, setCallActive] = useState(false);
  const [timerStarted, setTimerStarted] = useState(room.started_at);
  const bottomRef = useRef(null);

  useEffect(() => {
    loadMessages();
    loadMembers();

    const channel = supabase
      .channel(`room-${room.id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `room_id=eq.${room.id}` },
        (payload) => setMessages(prev => [...prev, payload.new])
      )
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "rooms", filter: `id=eq.${room.id}` },
        (payload) => { if (payload.new.started_at) setTimerStarted(payload.new.started_at); }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [room.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function loadMessages() {
    const { data } = await supabase
      .from("messages")
      .select("*, profiles(username, avatar_url)")
      .eq("room_id", room.id)
      .order("created_at", { ascending: true });
    if (data) setMessages(data);
  }

  async function loadMembers() {
    const { data } = await supabase
      .from("room_members")
      .select("*, profiles(username, avatar_url)")
      .eq("room_id", room.id);
    if (data) setMembers(data);
  }

  async function sendMessage() {
    if (!input.trim() || !user) return;
    await supabase.from("messages").insert({ room_id: room.id, user_id: user.id, content: input.trim() });
    setInput("");
  }

  async function startCall() {
    try {
      const res = await fetch("/api/create-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomName: `vi-${room.id}`,
          participantName: profile?.username || user?.email || "user",
        }),
      });
      const data = await res.json();
      setLivekitToken(data.token);
      setLivekitUrl(data.url);
      setCallActive(true);
    } catch (e) {
      console.error(e);
      alert("Failed to start call. Please try again.");
    }
  }

  async function startTimer() {
    const now = new Date().toISOString();
    await supabase.from("rooms").update({ started_at: now, status: "active" }).eq("id", room.id);
    setTimerStarted(now);
  }

  const showCall = room.mode === "voice" || room.mode === "video";
  const durationLabel = DURATIONS.find(d => d.id === room.duration)?.label || "Standard";

  return (
    <div style={S.roomContainer}>
      <div style={S.roomHeader}>
        <div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 700, color: "#fff" }}>{room.title}</h2>
          <p style={{ fontSize: 12, color: "#555", marginTop: 2 }}>{room.mode} • {room.format} • {durationLabel} • {members.length} members</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {timerStarted ? (
            <Timer duration={room.duration} startedAt={timerStarted} />
          ) : (
            <button onClick={startTimer} style={{ padding: "6px 14px", background: "#1a1a1a", color: "#888", borderRadius: 8, fontSize: 12, fontWeight: 600, fontFamily: "'Inter',sans-serif", border: "1px solid #333", cursor: "pointer" }}>
              ▶ Start Timer
            </button>
          )}
          {members.map(m => m.profiles?.avatar_url && (
            <img key={m.id} src={m.profiles.avatar_url} style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid #222" }} alt="" />
          ))}
          {showCall && !callActive && (
            <button className="start-btn" onClick={startCall} style={{ padding: "8px 16px", background: "#e63946", color: "#fff", borderRadius: 8, fontSize: 13, fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: "pointer" }}>
              {room.mode === "video" ? "📹 Start Video" : "🎙️ Start Voice"}
            </button>
          )}
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {callActive && livekitToken && livekitUrl && (
          <div style={{ width: "55%", borderRight: "1px solid #1a1a1a", overflow: "hidden" }}>
            <LiveKitRoom
              token={livekitToken}
              serverUrl={livekitUrl}
              video={room.mode === "video"}
              audio={true}
              onDisconnected={() => setCallActive(false)}
              style={{ height: "100%" }}
            >
              <VideoConference />
            </LiveKitRoom>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
          <div style={S.chatArea}>
            {messages.length === 0 && (
              <div style={{ textAlign: "center", color: "#333", fontSize: 13, marginTop: 40 }}>No messages yet. Start the debate!</div>
            )}
            {messages.map(msg => (
              <div key={msg.id} style={{ ...S.msgRow, flexDirection: msg.user_id === user?.id ? "row-reverse" : "row" }}>
                {msg.profiles?.avatar_url && (
                  <img src={msg.profiles.avatar_url} style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0 }} alt="" />
                )}
                <div style={{ ...S.msgBubble, background: msg.user_id === user?.id ? "#e63946" : "#1a1a1a" }}>
                  {msg.user_id !== user?.id && <span style={{ fontSize: 11, color: "#888", marginBottom: 2 }}>{msg.profiles?.username || "Anonymous"}</span>}
                  <span style={{ fontSize: 14, color: "#fff" }}>{msg.content}</span>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div style={S.chatInput}>
            <input
              style={S.chatInputField}
              placeholder="Type your argument…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />
            <button className="send-btn" style={S.sendBtn} onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
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
        <p style={S.fieldLabel}>Camera</p>
        <div style={S.camPreview}>
          {camEnabled && !camError ? (
            <video ref={videoRef} autoPlay muted playsInline style={S.video} />
          ) : (
            <div style={S.camOff}>
              <span style={{ fontSize: 32 }}>📷</span>
              <span style={{ color: "#555", fontSize: 13, marginTop: 8 }}>{camError ? "Camera not available" : "Camera is off"}</span>
            </div>
          )}
        </div>
        <div style={S.toggleRow}>
          <span style={{ fontSize: 14, color: "#ccc" }}>Enable Camera</span>
          <Toggle value={camEnabled} onChange={setCamEnabled} />
        </div>
        {devices.video.length > 1 && (
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

  const filtered = TOPICS.filter(t => {
    const matchCat = selectedCategory === "All" || t.category === selectedCategory;
    return matchCat && t.label.toLowerCase().includes(search.toLowerCase());
  });

  async function createRoom() {
    if (!user) { alert("Please sign in first!"); return; }
    if (!roomTopic.trim()) { alert("Please enter a room title!"); return; }
    setCreating(true);
    const { data } = await supabase.from("rooms").insert({
      title: roomTopic,
      topic: selectedTopic?.label,
      category: selectedTopic?.category,
      hashtags: roomHashtags,
      duration: selectedDuration,
      created_by: user.id,
      status: "waiting",
    }).select().single();
    if (data) {
      await supabase.from("room_members").insert({ room_id: data.id, user_id: user.id });
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
  root: { minHeight: "100vh", background: "#0a0a0a", fontFamily: "'Inter', sans-serif", color: "#e0e0e0" },
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
  modeRow: { display: "flex", gap: 10 },
  modeBtn: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "14px 8px", borderRadius: 12, border: "1px solid #222", fontSize: 12, fontFamily: "'Inter', sans-serif", color: "#888", gap: 2, transition: "all 0.15s" },
  fmtRow: { display: "flex", gap: 10 },
  fmtBtn: { flex: 1, padding: "10px 0", borderRadius: 10, border: "1px solid #222", fontSize: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif", color: "#888", transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center" },
  langGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 },
  langBtn: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "10px 4px", borderRadius: 10, border: "1.5px solid #222", fontSize: 11, fontFamily: "'Inter', sans-serif", color: "#888", transition: "all 0.15s", background: "#0f0f0f" },
  connectBtn: { marginTop: 20, width: "100%", padding: "15px 0", background: "#fff", color: "#0a0a0a", borderRadius: 12, fontSize: 15, fontWeight: 700, fontFamily: "'Syne', sans-serif", letterSpacing: "0.02em" },
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
  finalBtn: { marginTop: 24, width: "100%", padding: "15px 0", background: "#fff", color: "#0a0a0a", borderRadius: 12, fontSize: 15, fontWeight: 700, fontFamily: "'Syne', sans-serif", letterSpacing: "0.02em" },
  roomCard: { background: "#111", borderRadius: 12, padding: 16, border: "1px solid #1e1e1e", transition: "all 0.15s", cursor: "pointer" },
  roomTag: { fontSize: 11, color: "#e63946", background: "#1a0a0b", padding: "2px 8px", borderRadius: 20 },
  joinBtn: { padding: "6px 16px", borderRadius: 8, border: "1px solid #333", fontSize: 12, fontWeight: 600, color: "#888", fontFamily: "'Inter',sans-serif", transition: "all 0.15s" },
  roomContainer: { display: "flex", flexDirection: "column", height: "calc(100vh - 130px)", background: "#111", borderRadius: 16, border: "1px solid #1e1e1e", overflow: "hidden" },
  roomHeader: { padding: "16px 20px", borderBottom: "1px solid #1a1a1a", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 },
  chatArea: { flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 },
  msgRow: { display: "flex", gap: 8, alignItems: "flex-end" },
  msgBubble: { display: "flex", flexDirection: "column", padding: "8px 12px", borderRadius: 12, maxWidth: "70%" },
  chatInput: { padding: "12px 20px", borderTop: "1px solid #1a1a1a", display: "flex", gap: 10, flexShrink: 0 },
  chatInputField: { flex: 1, background: "#0a0a0a", border: "1px solid #222", borderRadius: 10, padding: "10px 14px", fontSize: 14, color: "#e0e0e0", fontFamily: "'Inter',sans-serif" },
  sendBtn: { padding: "10px 20px", background: "#e63946", color: "#fff", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: "'Syne',sans-serif", transition: "background 0.15s", cursor: "pointer" },
};