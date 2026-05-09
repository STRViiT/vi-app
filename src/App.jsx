import { useState, useRef, useEffect } from "react";

const TOPICS = [
  { id: 1, label: "Democracy vs Authoritarianism", category: "Politics", hashtags: ["#democracy","#politics","#freedom","#government","#power","#dictatorship","#voting","#rights","#elections","#ideology"] },
  { id: 2, label: "Universal Basic Income", category: "Politics", hashtags: ["#ubi","#basicincome","#economy","#welfare","#poverty","#automation","#future","#money","#socialism","#policy"] },
  { id: 3, label: "Immigration Policy", category: "Politics", hashtags: ["#immigration","#borders","#refugees","#citizenship","#diversity","#culture","#law","#asylum","#migration","#politics"] },
  { id: 4, label: "Gun Control", category: "Politics", hashtags: ["#guns","#guncontrol","#2ndamendment","#safety","#violence","#rights","#firearms","#crime","#usa","#policy"] },
  { id: 5, label: "Electoral College", category: "Politics", hashtags: ["#electoralcollege","#voting","#elections","#usa","#democracy","#reform","#president","#politics","#fairness","#system"] },
  { id: 6, label: "Free Speech Limits", category: "Politics", hashtags: ["#freespeech","#censorship","#rights","#hatespeed","#internet","#law","#media","#expression","#government","#debate"] },
  { id: 7, label: "Capital Punishment", category: "Politics", hashtags: ["#deathpenalty","#justice","#crime","#law","#morality","#punishment","#humanrights","#murder","#courts","#ethics"] },
  { id: 8, label: "Affirmative Action", category: "Politics", hashtags: ["#affirmativeaction","#diversity","#race","#equality","#education","#hiring","#discrimination","#policy","#fairness","#society"] },
  { id: 9, label: "Welfare State", category: "Politics", hashtags: ["#welfare","#socialism","#taxes","#poverty","#government","#healthcare","#benefits","#economy","#policy","#society"] },
  { id: 10, label: "Taxation & Redistribution", category: "Politics", hashtags: ["#taxes","#redistribution","#wealth","#inequality","#economy","#government","#fairness","#rich","#poor","#policy"] },
  { id: 11, label: "Existence of God", category: "Religion", hashtags: ["#god","#atheism","#religion","#faith","#proof","#science","#belief","#philosophy","#spirituality","#existence"] },
  { id: 12, label: "Creationism vs Evolution", category: "Religion", hashtags: ["#evolution","#creationism","#science","#religion","#darwin","#bible","#biology","#faith","#education","#origins"] },
  { id: 13, label: "Morality Without Religion", category: "Religion", hashtags: ["#morality","#atheism","#ethics","#religion","#secular","#values","#philosophy","#god","#society","#goodness"] },
  { id: 14, label: "Afterlife", category: "Religion", hashtags: ["#afterlife","#death","#heaven","#hell","#religion","#soul","#spirituality","#belief","#consciousness","#philosophy"] },
  { id: 15, label: "Prayer in Schools", category: "Religion", hashtags: ["#prayer","#school","#religion","#separation","#government","#faith","#education","#rights","#children","#law"] },
  { id: 16, label: "Religious Freedom vs Civil Rights", category: "Religion", hashtags: ["#religiousfreedom","#civilrights","#lgbtq","#discrimination","#law","#faith","#equality","#rights","#society","#belief"] },
  { id: 17, label: "Atheism vs Agnosticism", category: "Religion", hashtags: ["#atheism","#agnosticism","#god","#belief","#religion","#philosophy","#faith","#secular","#spirituality","#debate"] },
  { id: 18, label: "Free Will vs Determinism", category: "Philosophy", hashtags: ["#freewill","#determinism","#philosophy","#choice","#fate","#consciousness","#science","#mind","#ethics","#existence"] },
  { id: 19, label: "Meaning of Life", category: "Philosophy", hashtags: ["#meaningoflife","#philosophy","#purpose","#existence","#happiness","#nihilism","#religion","#consciousness","#meaning","#life"] },
  { id: 20, label: "Moral Relativism", category: "Philosophy", hashtags: ["#moralrelativism","#ethics","#philosophy","#culture","#morality","#values","#relativism","#society","#truth","#judgment"] },
  { id: 21, label: "AI Will Replace Jobs", category: "Technology", hashtags: ["#ai","#automation","#jobs","#future","#technology","#economy","#robots","#work","#unemployment","#innovation"] },
  { id: 22, label: "Social Media Is Harmful", category: "Technology", hashtags: ["#socialmedia","#mentalhealth","#technology","#addiction","#youth","#instagram","#tiktok","#harm","#society","#internet"] },
  { id: 23, label: "Nuclear Energy", category: "Technology", hashtags: ["#nuclear","#energy","#environment","#safety","#cleanenergy","#radiation","#power","#climate","#future","#technology"] },
  { id: 24, label: "GMO Foods Are Safe", category: "Technology", hashtags: ["#gmo","#food","#science","#safety","#health","#agriculture","#environment","#biotech","#nutrition","#farming"] },
  { id: 25, label: "Space Exploration Priority", category: "Technology", hashtags: ["#space","#nasa","#exploration","#science","#mars","#funding","#future","#earth","#technology","#priority"] },
  { id: 26, label: "Crypto & Blockchain Future", category: "Technology", hashtags: ["#crypto","#blockchain","#bitcoin","#finance","#future","#decentralization","#money","#technology","#nft","#investment"] },
  { id: 27, label: "Surveillance Capitalism", category: "Technology", hashtags: ["#surveillance","#privacy","#bigdata","#capitalism","#google","#facebook","#technology","#rights","#data","#internet"] },
  { id: 28, label: "Electric Vehicles Mandate", category: "Technology", hashtags: ["#ev","#electricvehicles","#climate","#cars","#environment","#tesla","#policy","#future","#energy","#transportation"] },
  { id: 29, label: "Gene Editing Ethics", category: "Technology", hashtags: ["#geneediting","#crispr","#ethics","#science","#dna","#biotech","#medicine","#future","#morality","#genetics"] },
  { id: 30, label: "Internet Regulation", category: "Technology", hashtags: ["#internet","#regulation","#censorship","#freespeech","#government","#law","#privacy","#technology","#policy","#rights"] },
  { id: 31, label: "Alcohol Is Harmful", category: "Health", hashtags: ["#alcohol","#health","#addiction","#society","#drinking","#harm","#mentalhealth","#lifestyle","#ban","#culture"] },
  { id: 32, label: "Veganism Is Healthier", category: "Health", hashtags: ["#vegan","#health","#diet","#nutrition","#animals","#environment","#plantbased","#food","#lifestyle","#science"] },
  { id: 33, label: "Mandatory Vaccination", category: "Health", hashtags: ["#vaccines","#mandatoryvaccination","#health","#science","#freedom","#publichealth","#covid","#immunity","#policy","#rights"] },
  { id: 34, label: "Marijuana Legalization", category: "Health", hashtags: ["#marijuana","#legalization","#cannabis","#drugs","#health","#law","#freedom","#society","#addiction","#policy"] },
  { id: 35, label: "Universal Healthcare", category: "Health", hashtags: ["#healthcare","#universal","#medicine","#government","#insurance","#policy","#rights","#economy","#publichealth","#access"] },
  { id: 36, label: "Mental Health Stigma", category: "Health", hashtags: ["#mentalhealth","#stigma","#psychology","#society","#awareness","#depression","#anxiety","#health","#therapy","#culture"] },
  { id: 37, label: "Fast Food Should Be Taxed", category: "Health", hashtags: ["#fastfood","#tax","#health","#obesity","#policy","#nutrition","#government","#food","#society","#lifestyle"] },
  { id: 38, label: "Intermittent Fasting Works", category: "Health", hashtags: ["#intermittentfasting","#diet","#health","#weightloss","#nutrition","#science","#lifestyle","#fasting","#metabolism","#food"] },
  { id: 39, label: "Coffee Is Good For You", category: "Health", hashtags: ["#coffee","#health","#caffeine","#science","#nutrition","#lifestyle","#benefits","#addiction","#morning","#food"] },
  { id: 40, label: "Alternative Medicine", category: "Health", hashtags: ["#alternativemedicine","#homeopathy","#health","#science","#placebo","#holistic","#natural","#medicine","#wellness","#pseudoscience"] },
  { id: 41, label: "Cancel Culture", category: "Society", hashtags: ["#cancelculture","#socialmedia","#accountability","#freespeech","#culture","#internet","#woke","#society","#media","#censorship"] },
  { id: 42, label: "Gender Is a Social Construct", category: "Society", hashtags: ["#gender","#socialconstruct","#identity","#lgbtq","#society","#biology","#culture","#transgender","#feminism","#philosophy"] },
  { id: 43, label: "Feminism Today", category: "Society", hashtags: ["#feminism","#equality","#gender","#women","#rights","#society","#culture","#woke","#politics","#movement"] },
  { id: 44, label: "Social Media & Mental Health", category: "Society", hashtags: ["#socialmedia","#mentalhealth","#instagram","#youth","#depression","#technology","#anxiety","#society","#addiction","#harm"] },
  { id: 45, label: "Patriotism vs Globalism", category: "Society", hashtags: ["#patriotism","#globalism","#nationalism","#identity","#culture","#politics","#borders","#society","#flag","#world"] },
  { id: 46, label: "Traditional Family Values", category: "Society", hashtags: ["#family","#traditional","#values","#culture","#religion","#society","#marriage","#children","#lgbtq","#conservative"] },
  { id: 47, label: "Meritocracy Is a Myth", category: "Society", hashtags: ["#meritocracy","#equality","#privilege","#success","#society","#class","#race","#fairness","#capitalism","#culture"] },
  { id: 48, label: "Art Has No Objective Value", category: "Society", hashtags: ["#art","#value","#philosophy","#culture","#aesthetics","#subjective","#society","#creativity","#beauty","#meaning"] },
  { id: 49, label: "Animal Rights vs Human Rights", category: "Society", hashtags: ["#animalrights","#humanrights","#ethics","#vegan","#animals","#morality","#society","#law","#philosophy","#activism"] },
  { id: 50, label: "Privilege & Systemic Racism", category: "Society", hashtags: ["#privilege","#racism","#systemic","#society","#race","#equality","#discrimination","#politics","#woke","#culture"] },
  { id: 51, label: "Capitalism vs Socialism", category: "Economy", hashtags: ["#capitalism","#socialism","#economy","#politics","#wealth","#inequality","#market","#government","#freedom","#class"] },
  { id: 52, label: "Minimum Wage Increase", category: "Economy", hashtags: ["#minimumwage","#economy","#workers","#poverty","#business","#policy","#jobs","#income","#inflation","#fairness"] },
  { id: 53, label: "Globalization Is Good", category: "Economy", hashtags: ["#globalization","#economy","#trade","#culture","#jobs","#inequality","#world","#business","#politics","#development"] },
  { id: 54, label: "Billionaires Should Exist", category: "Economy", hashtags: ["#billionaires","#wealth","#inequality","#capitalism","#economy","#taxes","#rich","#society","#power","#ethics"] },
  { id: 55, label: "Gig Economy Workers Rights", category: "Economy", hashtags: ["#gigeconomy","#workers","#rights","#uber","#freelance","#labor","#economy","#policy","#jobs","#exploitation"] },
  { id: 56, label: "Rent Control", category: "Economy", hashtags: ["#rentcontrol","#housing","#economy","#policy","#tenants","#landlords","#cities","#affordability","#market","#government"] },
  { id: 57, label: "Student Loan Forgiveness", category: "Economy", hashtags: ["#studentloans","#forgiveness","#education","#debt","#policy","#economy","#college","#fairness","#government","#youth"] },
  { id: 58, label: "Outsourcing Jobs", category: "Economy", hashtags: ["#outsourcing","#jobs","#economy","#globalization","#business","#workers","#trade","#inequality","#corporations","#labor"] },
  { id: 59, label: "Unions Are Necessary", category: "Economy", hashtags: ["#unions","#workers","#rights","#labor","#economy","#strikes","#fairness","#business","#wages","#power"] },
  { id: 60, label: "Open Borders Economics", category: "Economy", hashtags: ["#openborders","#immigration","#economy","#labor","#trade","#globalization","#freedom","#policy","#society","#migration"] },
  { id: 61, label: "Climate Change Is Urgent", category: "Environment", hashtags: ["#climatechange","#environment","#urgency","#science","#globalwarming","#policy","#future","#earth","#activism","#crisis"] },
  { id: 62, label: "Veganism Saves the Planet", category: "Environment", hashtags: ["#vegan","#environment","#climate","#animals","#food","#sustainability","#plantbased","#earth","#farming","#lifestyle"] },
  { id: 63, label: "Nuclear Over Renewables", category: "Environment", hashtags: ["#nuclear","#renewables","#energy","#environment","#climate","#solar","#wind","#power","#future","#sustainability"] },
  { id: 64, label: "Carbon Tax", category: "Environment", hashtags: ["#carbontax","#climate","#environment","#policy","#emissions","#economy","#energy","#government","#sustainability","#tax"] },
  { id: 65, label: "Fast Fashion Ban", category: "Environment", hashtags: ["#fastfashion","#environment","#sustainability","#fashion","#waste","#climate","#ethics","#consumption","#industry","#ban"] },
  { id: 66, label: "Deforestation Policy", category: "Environment", hashtags: ["#deforestation","#environment","#forest","#climate","#policy","#amazon","#trees","#biodiversity","#earth","#sustainability"] },
  { id: 67, label: "Overpopulation Crisis", category: "Environment", hashtags: ["#overpopulation","#environment","#resources","#climate","#crisis","#future","#earth","#policy","#society","#sustainability"] },
  { id: 68, label: "Animal Agriculture Impact", category: "Environment", hashtags: ["#animalagriculture","#environment","#climate","#vegan","#food","#farming","#emissions","#water","#land","#sustainability"] },
  { id: 69, label: "Plastic Bans Effectiveness", category: "Environment", hashtags: ["#plastic","#ban","#environment","#pollution","#ocean","#sustainability","#policy","#waste","#recycling","#climate"] },
  { id: 70, label: "Geoengineering Solutions", category: "Environment", hashtags: ["#geoengineering","#climate","#science","#environment","#technology","#future","#risk","#policy","#earth","#innovation"] },
  { id: 71, label: "Homework Should Be Banned", category: "Education", hashtags: ["#homework","#school","#education","#students","#stress","#learning","#children","#policy","#ban","#teachers"] },
  { id: 72, label: "University Degrees Worth It", category: "Education", hashtags: ["#university","#degree","#education","#debt","#career","#college","#worth","#future","#jobs","#learning"] },
  { id: 73, label: "Sex Ed in Schools", category: "Education", hashtags: ["#sexeducation","#school","#education","#children","#policy","#health","#parents","#society","#curriculum","#rights"] },
  { id: 74, label: "Standardized Tests Are Fair", category: "Education", hashtags: ["#standardizedtests","#education","#fairness","#school","#inequality","#assessment","#students","#policy","#sat","#learning"] },
  { id: 75, label: "Private vs Public Schools", category: "Education", hashtags: ["#privateschool","#publicschool","#education","#inequality","#funding","#children","#policy","#quality","#society","#choice"] },
  { id: 76, label: "Critical Race Theory in Schools", category: "Education", hashtags: ["#crt","#education","#race","#history","#school","#politics","#curriculum","#children","#society","#controversy"] },
  { id: 77, label: "Religious Schools Public Funding", category: "Education", hashtags: ["#religiousschools","#funding","#education","#separation","#church","#state","#policy","#rights","#children","#law"] },
  { id: 78, label: "Phones Banned in Class", category: "Education", hashtags: ["#phones","#school","#ban","#education","#distraction","#technology","#students","#learning","#policy","#children"] },
  { id: 79, label: "School Uniforms", category: "Education", hashtags: ["#uniforms","#school","#education","#identity","#equality","#children","#policy","#dress","#society","#expression"] },
  { id: 80, label: "Homeschooling Effectiveness", category: "Education", hashtags: ["#homeschooling","#education","#children","#learning","#parents","#school","#socialization","#effectiveness","#policy","#alternative"] },
  { id: 81, label: "Video Games Cause Violence", category: "Entertainment", hashtags: ["#videogames","#violence","#media","#youth","#psychology","#entertainment","#research","#controversy","#gaming","#society"] },
  { id: 82, label: "Streaming Killed Cinema", category: "Entertainment", hashtags: ["#streaming","#cinema","#netflix","#movies","#entertainment","#industry","#film","#culture","#future","#technology"] },
  { id: 83, label: "Sports Stars Are Overpaid", category: "Entertainment", hashtags: ["#sports","#salary","#overpaid","#athletes","#entertainment","#money","#celebrity","#fairness","#business","#culture"] },
  { id: 84, label: "Reality TV Is Harmful", category: "Entertainment", hashtags: ["#realitytv","#media","#harm","#entertainment","#culture","#youth","#society","#television","#influence","#celebrity"] },
  { id: 85, label: "AI-Generated Art Is Real Art", category: "Entertainment", hashtags: ["#aiart","#creativity","#technology","#art","#debate","#future","#culture","#entertainment","#originality","#ethics"] },
  { id: 86, label: "Music Today Is Worse", category: "Entertainment", hashtags: ["#music","#culture","#quality","#entertainment","#nostalgia","#industry","#art","#streaming","#pop","#debate"] },
  { id: 87, label: "Censorship in Movies", category: "Entertainment", hashtags: ["#censorship","#movies","#freespeech","#entertainment","#media","#culture","#rights","#film","#government","#art"] },
  { id: 88, label: "Celebrity Influence on Youth", category: "Entertainment", hashtags: ["#celebrity","#influence","#youth","#media","#culture","#entertainment","#socialmedia","#rolemodel","#society","#impact"] },
  { id: 89, label: "Books vs Audiobooks", category: "Entertainment", hashtags: ["#books","#audiobooks","#reading","#learning","#entertainment","#culture","#literature","#technology","#habits","#debate"] },
  { id: 90, label: "Esports Are Real Sports", category: "Entertainment", hashtags: ["#esports","#gaming","#sports","#debate","#competition","#culture","#entertainment","#athletes","#future","#recognition"] },
  { id: 91, label: "Pineapple on Pizza", category: "Everyday", hashtags: ["#pineapple","#pizza","#food","#debate","#culture","#taste","#cooking","#controversial","#everyday","#fun"] },
  { id: 92, label: "Morning vs Night People", category: "Everyday", hashtags: ["#morning","#night","#productivity","#lifestyle","#health","#sleep","#habits","#debate","#everyday","#routine"] },
  { id: 93, label: "Cats vs Dogs", category: "Everyday", hashtags: ["#cats","#dogs","#pets","#animals","#lifestyle","#debate","#everyday","#fun","#companionship","#culture"] },
  { id: 94, label: "Working from Home", category: "Everyday", hashtags: ["#wfh","#remotework","#productivity","#lifestyle","#work","#future","#technology","#balance","#office","#debate"] },
  { id: 95, label: "4-Day Work Week", category: "Everyday", hashtags: ["#4dayworkweek","#work","#productivity","#lifestyle","#future","#balance","#economy","#policy","#happiness","#debate"] },
  { id: 96, label: "Paper Books vs E-Readers", category: "Everyday", hashtags: ["#paperbooks","#ereader","#reading","#technology","#culture","#literature","#kindle","#habits","#debate","#everyday"] },
  { id: 97, label: "Tipping Culture", category: "Everyday", hashtags: ["#tipping","#culture","#restaurants","#service","#economy","#debate","#fairness","#workers","#wages","#society"] },
  { id: 98, label: "Open Relationships", category: "Everyday", hashtags: ["#openrelationships","#love","#society","#culture","#relationships","#debate","#lifestyle","#ethics","#freedom","#intimacy"] },
  { id: 99, label: "Minimalism as a Lifestyle", category: "Everyday", hashtags: ["#minimalism","#lifestyle","#culture","#consumption","#happiness","#simplicity","#debate","#everyday","#philosophy","#society"] },
  { id: 100, label: "Social Media Detox Necessity", category: "Everyday", hashtags: ["#socialmedia","#detox","#mentalhealth","#lifestyle","#technology","#wellbeing","#debate","#everyday","#addiction","#balance"] },
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

export default function App() {
  const [screen, setScreen] = useState("home");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedLang, setSelectedLang] = useState("en");
  const [selectedMode, setSelectedMode] = useState("chat");
  const [selectedFormat, setSelectedFormat] = useState("1v1");
  const [settingsLang, setSettingsLang] = useState("en");
  const [camEnabled, setCamEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [roomTopic, setRoomTopic] = useState("");
  const [roomHashtags, setRoomHashtags] = useState([]);
  const [hashtagInput, setHashtagInput] = useState("");

  const filteredTopics = TOPICS.filter((t) => {
    const matchCat = selectedCategory === "All" || t.category === selectedCategory;
    const matchSearch = t.label.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
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

        .lang-btn:hover { border-color: #555 !important; background: #1a1a1a !important; }
        .lang-sel { border-color: #e63946 !important; background: #1a0a0b !important; color: #e63946 !important; }

        .connect-btn { transition: all 0.15s; }
        .connect-btn:hover { background: #e63946 !important; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(230,57,70,0.35) !important; }

        .nav-btn { transition: color 0.15s; }
        .nav-btn:hover { color: #fff !important; }
        .nav-sel { color: #fff !important; }

        .create-room-btn:hover { background: #1a1a1a !important; border-color: #555 !important; }

        .hashtag-add:hover { background: #e63946 !important; color: #fff !important; }

        .final-btn { transition: all 0.15s; }
        .final-btn:hover { background: #e63946 !important; box-shadow: 0 8px 24px rgba(230,57,70,0.35) !important; }

        .toggle-track { transition: background 0.2s; }
        .toggle-thumb { transition: left 0.2s; }

        .hashtag-tag { transition: background 0.15s; }
        .hashtag-tag:hover { background: #2a2a2a !important; }
      `}</style>

      <header style={S.header}>
        <div style={S.logo}>
          <span style={S.logoVi}>Vi</span>
        </div>
        <nav style={S.nav}>
          {["home","create","settings"].map(s => (
            <button key={s} className={`nav-btn ${screen === s ? "nav-sel" : ""}`} style={S.navBtn} onClick={() => setScreen(s)}>
              {s === "home" ? "Home" : s === "create" ? "Create Room" : "Settings"}
            </button>
          ))}
        </nav>
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
        />}
      </main>
    </div>
  );
}

function HomeScreen({ search, setSearch, selectedCategory, setSelectedCategory, filteredTopics, selectedTopic, setSelectedTopic, selectedLang, setSelectedLang, selectedMode, setSelectedMode, selectedFormat, setSelectedFormat }) {
  return (
    <div style={S.grid}>
      {/* Topic Card */}
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
          {filteredTopics.length === 0 && <p style={{ color: "#555", fontSize: 13, padding: "12px 0" }}>No topics found</p>}
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
            <div style={{ marginLeft: "auto", display: "flex", flexWrap: "wrap", gap: 4 }}>
              {selectedTopic.hashtags.slice(0, 5).map(h => (
                <span key={h} style={S.miniTag}>{h}</span>
              ))}
            </div>
            <button style={{ color: "#555", fontSize: 13, marginLeft: 8 }} onClick={() => setSelectedTopic(null)}>✕</button>
          </div>
        )}
      </div>

      {/* Connect Card */}
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
            <button key={f.id} className={`fmt-btn ${selectedFormat === f.id ? "fmt-sel" : ""}`} style={S.fmtBtn} onClick={() => setSelectedFormat(f.id)}>
              {f.label}
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

        <button className="connect-btn" style={S.connectBtn}>Find Debate</button>
        <p style={S.hint}>{selectedTopic ? <>Debating: <strong style={{ color: "#fff" }}>{selectedTopic.label}</strong></> : "No topic selected — any topic"}</p>
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

function CreateScreen({ roomTopic, setRoomTopic, roomHashtags, hashtagInput, setHashtagInput, addHashtag, removeHashtag }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState(null);

  const filtered = TOPICS.filter(t => {
    const matchCat = selectedCategory === "All" || t.category === selectedCategory;
    return matchCat && t.label.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div style={{ maxWidth: 620, margin: "0 auto", width: "100%" }}>
      <div style={S.card}>
        <h2 style={S.cardTitle}>Create a Room</h2>

        <p style={S.fieldLabel}>Room Title</p>
        <input style={S.textInput} placeholder="e.g. Is veganism the future?" value={roomTopic} onChange={e => setRoomTopic(e.target.value)} />

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

        <p style={{ ...S.fieldLabel, marginTop: 22 }}>
          Hashtags <span style={{ color: "#555", fontWeight: 400 }}>({roomHashtags.length}/5)</span>
        </p>
        <div style={S.searchBox}>
          <span style={S.searchIcon}>#</span>
          <input style={S.searchInput} placeholder="Add hashtag…" value={hashtagInput} onChange={e => setHashtagInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addHashtag()} />
          <button className="hashtag-add" style={S.hashtagAdd} onClick={addHashtag}>Add</button>
        </div>
        {selectedTopic && (
          <div style={{ marginTop: 8, marginBottom: 4 }}>
            <p style={{ fontSize: 11, color: "#555", marginBottom: 6 }}>Suggested:</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {selectedTopic.hashtags.map(h => (
                <button key={h} className="hashtag-tag" style={S.suggestedTag}
                  onClick={() => { const t = h.replace(/^#/, ""); if (roomHashtags.length < 5 && !roomHashtags.includes(t)) { removeHashtag("_"); } }}>
                  {h}
                </button>
              ))}
            </div>
          </div>
        )}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
          {roomHashtags.map(tag => (
            <span key={tag} style={S.hashtagPill}>#{tag} <button style={{ marginLeft: 6, color: "#666" }} onClick={() => removeHashtag(tag)}>✕</button></span>
          ))}
        </div>

        <button className="final-btn" style={S.finalBtn}>Create Room</button>
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
  miniTag: { fontSize: 10, color: "#555", background: "#1a1a1a", padding: "2px 6px", borderRadius: 10 },
  fieldLabel: { fontSize: 11, fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10, marginTop: 18 },
  modeRow: { display: "flex", gap: 10 },
  modeBtn: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "14px 8px", borderRadius: 12, border: "1px solid #222", fontSize: 12, fontFamily: "'Inter', sans-serif", color: "#888", gap: 2, transition: "all 0.15s" },
  fmtRow: { display: "flex", gap: 10 },
  fmtBtn: { flex: 1, padding: "10px 0", borderRadius: 10, border: "1px solid #222", fontSize: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif", color: "#888", transition: "all 0.15s" },
  langGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 },
  langBtn: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "10px 4px", borderRadius: 10, border: "1.5px solid #222", fontSize: 11, fontFamily: "'Inter', sans-serif", color: "#888", transition: "all 0.15s", background: "#0f0f0f" },
  connectBtn: { marginTop: 20, width: "100%", padding: "15px 0", background: "#fff", color: "#0a0a0a", borderRadius: 12, fontSize: 15, fontWeight: 700, fontFamily: "'Syne', sans-serif", letterSpacing: "0.02em", boxShadow: "0 4px 20px rgba(255,255,255,0.08)" },
  hint: { textAlign: "center", fontSize: 12, color: "#444", marginTop: 10 },
  divider: { height: 1, background: "#1a1a1a", margin: "20px 0" },
  camPreview: { width: "100%", aspectRatio: "16/9", background: "#0a0a0a", borderRadius: 12, overflow: "hidden", border: "1px solid #222", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 },
  video: { width: "100%", height: "100%", objectFit: "cover" },
  camOff: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
  toggleRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0" },
  select: { width: "100%", marginTop: 10, padding: "9px 12px", background: "#0a0a0a", border: "1px solid #222", borderRadius: 10, color: "#ccc", fontSize: 13, fontFamily: "'Inter', sans-serif" },
  textInput: { width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #222", fontSize: 13, fontFamily: "'Inter', sans-serif", background: "#0a0a0a", color: "#e0e0e0" },
  hashtagAdd: { padding: "4px 12px", borderRadius: 8, background: "#1a1a1a", fontSize: 12, fontWeight: 600, fontFamily: "'Inter', sans-serif", color: "#888", transition: "all 0.15s" },
  suggestedTag: { fontSize: 11, padding: "3px 8px", borderRadius: 20, background: "#1a1a1a", color: "#555", fontFamily: "'Inter', sans-serif", cursor: "pointer" },
  hashtagPill: { display: "flex", alignItems: "center", padding: "4px 10px", background: "#1a1a1a", borderRadius: 20, fontSize: 13, color: "#ccc", border: "1px solid #2a2a2a" },
  finalBtn: { marginTop: 24, width: "100%", padding: "15px 0", background: "#fff", color: "#0a0a0a", borderRadius: 12, fontSize: 15, fontWeight: 700, fontFamily: "'Syne', sans-serif", letterSpacing: "0.02em" },
};