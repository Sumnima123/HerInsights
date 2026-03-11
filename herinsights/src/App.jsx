import { useState, useRef, useEffect } from "react";

// ── Palette ───────────────────────────────────────────────────────────────────
const C = {
  bg:       "#F7F0F5",
  surface:  "#FFFFFF",
  surface2: "#F2E8EF",
  border:   "#E2D0DC",
  muted:    "#9E7E96",
  text:     "#2E1A28",
  textSoft: "#6B4D63",
  primary:  "#8B5E7A",
  sand:     "#C4956A",
  rose:     "#B87A8A",
  sage:     "#5A8A72",
  sageBg:   "#E8F4EE",
  amber:    "#C4956A",
  amberBg:  "#FBF3E8",
  grad:     "linear-gradient(135deg, #8B5E7A, #C4956A)",
  pride:    "linear-gradient(90deg,#E57373,#FFB74D,#FFF176,#81C784,#64B5F6,#BA68C8)",
  white:    "#FFFFFF",
};

// ── Static Data ───────────────────────────────────────────────────────────────
const VIDEO_TYPES = {
  story:     { label:"Personal Story",    color:"#8B5E7A", bg:"#F2E8EF" },
  expert:    { label:"Expert Clinician",  color:"#5A8A72", bg:"#E8F4EE" },
  explainer: { label:"Research Explainer",color:"#C4956A", bg:"#FBF3E8" },
  qa:        { label:"Q&A Reply",         color:"#B87A8A", bg:"#F9EEF0" },
};

const PRONOUNS = ["she/her","they/them","he/him","she/they","he/they","any/all"];

const allTags = [
  { id:"pcos",         label:"PCOS",              color:"#8B5E7A", subscribed:true,  lgbtq:false },
  { id:"breastcancer", label:"Breast Cancer",     color:"#B87A8A", subscribed:true,  lgbtq:false },
  { id:"endo",         label:"Endometriosis",     color:"#5A8A72", subscribed:true,  lgbtq:false },
  { id:"transhealth",  label:"Trans Health",      color:"#7A6A9A", subscribed:false, lgbtq:true  },
  { id:"queermentalh", label:"Queer Mental Health",color:"#5A7A9A",subscribed:false, lgbtq:true  },
  { id:"menopause",    label:"Menopause",          color:"#C4956A", subscribed:false, lgbtq:false },
  { id:"fertility",    label:"Fertility",          color:"#5A7A8A", subscribed:false, lgbtq:false },
  { id:"thyroid",      label:"Thyroid Health",     color:"#7A8A5A", subscribed:false, lgbtq:false },
  { id:"mentalhealth", label:"Mental Health",      color:"#8A6A7A", subscribed:false, lgbtq:false },
];

const feedItems = [
  { id:1, tag:"PCOS", tagColor:"#8B5E7A",
    title:"Inositol Supplementation Reduces Androgen Levels in PCOS Patients",
    source:"New England Journal of Medicine", sourceIcon:"🏥", citations:847, year:2024,
    summary:"A meta-analysis of 14 RCTs found myo-inositol significantly reduced testosterone and improved insulin sensitivity in women with PCOS.",
    readTime:"6 min", comments:34, saves:128 },
  { id:2, tag:"Breast Cancer", tagColor:"#B87A8A",
    title:"Dense Breast Tissue Screening Guidelines Updated by WHO",
    source:"The Lancet Oncology", sourceIcon:"🔬", citations:1203, year:2024,
    summary:"New WHO guidelines recommend supplemental MRI for women with extremely dense breast tissue, improving early detection rates across all demographics.",
    readTime:"9 min", comments:91, saves:312 },
  { id:3, tag:"Trans Health", tagColor:"#7A6A9A",
    title:"Gender-Affirming Care Improves Long-Term Mental Health Outcomes",
    source:"JAMA Psychiatry", sourceIcon:"📋", citations:742, year:2024,
    summary:"A longitudinal study of 3,500 patients found gender-affirming care significantly reduced depression and anxiety over a 5-year period.",
    readTime:"7 min", comments:156, saves:389 },
  { id:4, tag:"Endometriosis", tagColor:"#5A8A72",
    title:"Average Diagnostic Delay for Endometriosis Remains 8 Years",
    source:"JAMA Internal Medicine", sourceIcon:"🧬", citations:562, year:2024,
    summary:"Systemic under-reporting and symptom normalization are primary contributors to the persistent diagnostic gap in endometriosis care.",
    readTime:"5 min", comments:218, saves:504 },
];

const hopeItems = [
  { id:"h1", title:"2 years post-diagnosis: what actually helped my PCOS",
    content:"I was terrified when I got my diagnosis. Today my cycles are regular, my skin is clear, and I feel like myself again. Here's the honest breakdown of what worked — diet, medication, and sleep.",
    author:"Rina K.", avatar:"R", pronouns:"she/her",
    avatarGrad:"linear-gradient(135deg,#8B5E7A,#C4956A)", linkedArticle:true },
  { id:"h2", title:"How I found an affirming endocrinologist after 4 failed attempts",
    content:"As a trans woman navigating hormones and PCOS simultaneously, finding a doctor who understood both felt impossible. Sharing the exact questions and directories that helped.",
    author:"Jordan M.", avatar:"J", pronouns:"she/they",
    avatarGrad:"linear-gradient(135deg,#7A6A9A,#B4A8D4)", linkedArticle:true },
  { id:"h3", title:"Endometriosis doesn't have to define your fertility story",
    content:"After my diagnosis I was convinced I'd never have children. My doctor sat me down with the actual statistics — which are far more hopeful than what I'd read online.",
    author:"Priya D.", avatar:"P", pronouns:"she/her",
    avatarGrad:"linear-gradient(135deg,#5A8A72,#8AB89A)", linkedArticle:true },
];

const reelItems = [
  { id:1, type:"video", videoType:"story", tag:"PCOS", tagColor:"#8B5E7A",
    author:"Maya R.", avatar:"M", pronouns:"she/her", avatarGrad:"linear-gradient(135deg,#8B5E7A,#C4956A)",
    time:"2h ago", anonymous:false, cw:null,
    title:"My PCOS journey — 3 years in",
    content:"Sharing everything I wish I'd known when I was first diagnosed. The highs, the hard days, and what finally helped my symptoms.",
    duration:"4:32", bg:"linear-gradient(160deg,#F2E8EF,#E8D5E8,#D4B8CC)", emoji:"💜", replies:34, upvotes:187, saves:92, videoEmoji:"🎥" },
  { id:2, type:"video", videoType:"expert", tag:"Trans Health", tagColor:"#7A6A9A",
    author:"Dr. Sam Okafor", avatar:"Dr", pronouns:"they/them", avatarGrad:"linear-gradient(135deg,#7A6A9A,#B4A8D4)",
    time:"5h ago", anonymous:false, cw:null,
    title:"HRT options for trans women — what the research says",
    content:"A clear, evidence-based breakdown of current hormone therapy options, timelines, and what to ask your endocrinologist.",
    duration:"8:14", bg:"linear-gradient(160deg,#EEE8F4,#DDD0EC,#C8B8E0)", emoji:"🏳️‍⚧️", replies:61, upvotes:342, saves:198, videoEmoji:"👩‍⚕️" },
  { id:3, type:"text", tag:"Endometriosis", tagColor:"#5A8A72",
    author:"Anonymous", avatar:"?", pronouns:null, avatarGrad:"linear-gradient(135deg,#9E9E9E,#BDBDBD)",
    time:"4h ago", anonymous:true, cw:"chronic pain, medical trauma",
    title:null,
    content:"6 years of being told 'it's just bad periods.' Finally have a diagnosis. Finally have a name for what I've been living with. I'm grieving and relieved at the same time.",
    duration:null, bg:"linear-gradient(160deg,#E8F4EE,#D5EAE0,#B8D5C8)", emoji:"🌿", replies:89, upvotes:512, saves:234, videoEmoji:null },
  { id:4, type:"video", videoType:"explainer", tag:"Queer Mental Health", tagColor:"#5A7A9A",
    author:"HerInsights Research", avatar:"H", pronouns:null, avatarGrad:"linear-gradient(135deg,#8B5E7A,#C4956A)",
    time:"1d ago", anonymous:false, cw:null,
    title:"Minority stress & hormonal health",
    content:"Research shows chronic minority stress impacts cortisol, thyroid function, and immune response. Here's what the studies say and what helps.",
    duration:"6:05", bg:"linear-gradient(160deg,#E8F0FB,#D0DFF5,#B8C8E8)", emoji:"🔬", replies:28, upvotes:203, saves:156, videoEmoji:"📊" },
  { id:5, type:"video", videoType:"qa", tag:"Breast Cancer", tagColor:"#B87A8A",
    author:"Serena W.", avatar:"S", pronouns:"she/her", avatarGrad:"linear-gradient(135deg,#B87A8A,#D4A0AE)",
    time:"6h ago", anonymous:false, cw:"cancer treatment, chemotherapy",
    title:"Answering your chemo questions",
    content:"You asked, I answered. Fatigue management, what actually helped with nausea, supplements my oncologist approved, and what nobody tells you.",
    duration:"11:48", bg:"linear-gradient(160deg,#F5ECF0,#EDD5DC,#D4A8B4)", emoji:"🎀", replies:78, upvotes:423, saves:312, videoEmoji:"💬" },
  { id:6, type:"text", tag:"Queer Mental Health", tagColor:"#5A7A9A",
    author:"Jordan L.", avatar:"J", pronouns:"they/them", avatarGrad:"linear-gradient(135deg,#64B5F6,#90CAF9)",
    time:"3h ago", anonymous:false, cw:"anxiety, coming out",
    title:null,
    content:"Coming out to my doctor was scarier than coming out to my parents. But finding an affirming provider changed everything. Drop your city and I'll share resources 🏳️‍🌈",
    duration:null, bg:"linear-gradient(160deg,#FBF3E8,#F0E0C8,#DEC4A0)", emoji:"🌈", replies:103, upvotes:689, saves:445, videoEmoji:null },
];

const SUGGESTED = [
  "What are the latest PCOS treatment options in 2024?",
  "What does research say about HRT for trans women?",
  "How does endometriosis affect fertility?",
  "What are affirming mental health approaches for LGBTQ+ patients?",
];

const GUIDELINES = [
  "🤝  Respect all identities — pronouns matter here",
  "🏳️‍🌈  This is an explicitly LGBTQ+ inclusive space",
  "🫂  No unsolicited medical advice — share experiences, not prescriptions",
  "🔒  Anonymous posts are fully protected — no outing, ever",
  "⚠️  Content warnings are encouraged for sensitive topics",
  "❤️  Report harm — moderation team responds within 2 hours",
];

const SYSTEM_PROMPT = `You are HerInsights AI — a research assistant for a women's and LGBTQ+ inclusive health app.
Answer using only verified, peer-reviewed medical research from PubMed, Cochrane, NEJM, Lancet, JAMA, WHO, NIH, or equivalent.
Be explicitly inclusive of trans women, non-binary people, and all gender identities.
Cite sources inline. Never give personal medical advice.
Be warm, affirming, and empowering. Keep to 2–4 paragraphs. End with: [Source Name, Year]

ANXIETY SPIRAL DETECTION: If the user shows signs of health anxiety, catastrophizing, or emotional distress — acknowledge their feelings first, then ground them in the most reassuring evidence-based facts, and suggest speaking with an affirming provider. Do NOT feed the spiral with worst-case scenarios. Append exactly [WELLBEING_FLAG] at the very end if you detected distress.`;

// ── Sub-components ────────────────────────────────────────────────────────────

function VideoPlayer({ item }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const timer = useRef(null);
  const toggle = () => {
    if (playing) { clearInterval(timer.current); setPlaying(false); }
    else {
      setPlaying(true);
      timer.current = setInterval(() => setProgress(p => { if (p >= 100) { clearInterval(timer.current); setPlaying(false); return 0; } return p + 0.4; }), 80);
    }
  };
  useEffect(() => () => clearInterval(timer.current), []);
  const meta = VIDEO_TYPES[item.videoType];
  return (
    <div onClick={toggle} style={{ position:"relative", width:"100%", aspectRatio:"16/9", background:item.bg, borderRadius:16, overflow:"hidden", cursor:"pointer", flexShrink:0, boxShadow:"0 4px 20px rgba(139,94,122,0.15)" }}>
      <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10 }}>
        <div style={{ fontSize:48 }}>{item.videoEmoji}</div>
        <div style={{ fontSize:12, color:C.textSoft, fontFamily:"system-ui", fontWeight:600, textAlign:"center", padding:"0 16px" }}>{item.title}</div>
      </div>
      {!playing && (
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(46,26,40,0.15)" }}>
          <div style={{ width:54, height:54, borderRadius:"50%", background:"rgba(255,255,255,0.92)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, paddingLeft:4, boxShadow:"0 4px 16px rgba(0,0,0,0.15)" }}>▶</div>
        </div>
      )}
      <div style={{ position:"absolute", top:10, left:10, padding:"3px 10px", borderRadius:20, background:meta.bg, border:`1px solid ${meta.color}40`, fontSize:10, fontWeight:700, color:meta.color, fontFamily:"system-ui" }}>{meta.label}</div>
      <div style={{ position:"absolute", bottom:10, right:10, padding:"3px 9px", borderRadius:12, background:"rgba(46,26,40,0.6)", fontSize:11, color:"#fff", fontFamily:"system-ui", fontWeight:600 }}>{item.duration}</div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:"rgba(255,255,255,0.3)" }}>
        <div style={{ height:"100%", width:`${progress}%`, background:C.grad, transition:"width 0.08s linear" }} />
      </div>
    </div>
  );
}


function HopeCard({ item }) {
  return (
    <div style={{ background:`linear-gradient(135deg,${C.sageBg},#F0EBF8)`, border:`1.5px solid ${C.sage}45`, borderRadius:18, padding:20, marginBottom:14, boxShadow:"0 2px 12px rgba(90,138,114,0.1)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
        <div style={{ padding:"4px 12px", borderRadius:20, background:C.sage+"28", color:C.sage, fontSize:11, fontWeight:700, fontFamily:"system-ui" }}>✦ Recovery Story</div>
        {item.linkedArticle && <div style={{ padding:"3px 10px", borderRadius:20, background:C.sageBg, fontSize:10, color:C.sage, fontFamily:"system-ui", fontWeight:600 }}>📄 Research linked</div>}
      </div>
      <div style={{ fontSize:14.5, fontWeight:700, lineHeight:1.45, marginBottom:9, color:C.text }}>{item.title}</div>
      <div style={{ fontSize:13, color:C.textSoft, lineHeight:1.7, marginBottom:14, fontFamily:"system-ui" }}>{item.content}</div>
      <div style={{ display:"flex", alignItems:"center", gap:8, paddingTop:11, borderTop:`1px solid ${C.sage}30` }}>
        <div style={{ width:28, height:28, borderRadius:"50%", background:item.avatarGrad, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:"#fff" }}>{item.avatar}</div>
        <span style={{ fontSize:12, color:C.textSoft, fontFamily:"system-ui" }}>{item.author} · <span style={{ color:C.muted }}>{item.pronouns}</span></span>
      </div>
    </div>
  );
}


function ReelCard({ item }) {
  const [liked, setLiked]   = useState(false);
  const [saved, setSaved]   = useState(false);
  const [votes, setVotes]   = useState(item.upvotes);
  const [cwOk, setCwOk]     = useState(!item.cw);

  if (!cwOk) return (
    <div style={{ width:"100%", height:"100%", background:item.bg, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, scrollSnapAlign:"start" }}>
      <div style={{ fontSize:48, marginBottom:16 }}>⚠️</div>
      <div style={{ fontSize:17, fontWeight:700, color:C.text, marginBottom:10, textAlign:"center" }}>Content Warning</div>
      <div style={{ fontSize:14, color:C.textSoft, fontFamily:"system-ui", textAlign:"center", lineHeight:1.7, marginBottom:28, padding:"12px 16px", background:"rgba(255,255,255,0.7)", borderRadius:14, backdropFilter:"blur(8px)" }}>
        This post mentions: <strong style={{ color:C.primary }}>{item.cw}</strong>
      </div>
      <div style={{ display:"flex", gap:12 }}>
        <button onClick={() => setCwOk(true)} style={{ padding:"11px 24px", borderRadius:24, background:C.grad, border:"none", color:"#fff", fontSize:14, fontWeight:700, fontFamily:"system-ui", cursor:"pointer" }}>I'm okay, continue</button>
        <button onClick={() => setCwOk(true)} style={{ padding:"11px 20px", borderRadius:24, background:"rgba(255,255,255,0.8)", border:`1px solid ${C.border}`, color:C.textSoft, fontSize:14, fontFamily:"system-ui", cursor:"pointer" }}>Skip</button>
      </div>
    </div>
  );

  return (
    <div style={{ width:"100%", height:"100%", background:item.bg, display:"flex", flexDirection:"column", scrollSnapAlign:"start", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:-60, right:-60, width:180, height:180, borderRadius:"50%", background:"rgba(255,255,255,0.2)", pointerEvents:"none" }} />

      {/* Top */}
      <div style={{ padding:"14px 14px 0", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0, zIndex:2 }}>
        <div style={{ padding:"4px 12px", borderRadius:20, background:"rgba(255,255,255,0.78)", backdropFilter:"blur(8px)" }}>
          <span style={{ fontSize:11, fontWeight:700, color:item.tagColor, fontFamily:"system-ui" }}>{item.tag}</span>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          {item.anonymous && <div style={{ padding:"3px 10px", borderRadius:20, background:"rgba(255,255,255,0.75)", fontSize:10, color:C.muted, fontFamily:"system-ui", fontWeight:600 }}>🔒 Anonymous</div>}
          <span style={{ fontSize:20 }}>{item.emoji}</span>
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex:1, overflowY:"auto", padding:"12px 14px 8px", scrollbarWidth:"none" }}>
        {item.type === "video" && <VideoPlayer item={item} />}
        {item.title && <div style={{ fontSize:15, fontWeight:700, color:C.text, marginTop:14, marginBottom:6, lineHeight:1.4 }}>{item.title}</div>}
        <div style={{ fontSize:14, lineHeight:1.75, color:C.text, fontFamily:"system-ui", marginTop: item.type==="text" ? 14 : 10 }}>{item.content}</div>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:16 }}>
          <div style={{ width:36, height:36, borderRadius:"50%", background:item.avatarGrad, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#fff", flexShrink:0 }}>{item.avatar}</div>
          <div>
            <div style={{ fontSize:13, fontWeight:700, color:C.text, fontFamily:"system-ui" }}>{item.author}</div>
            <div style={{ display:"flex", gap:6, alignItems:"center" }}>
              {item.pronouns && <span style={{ fontSize:10, color:C.muted, fontFamily:"system-ui", background:"rgba(255,255,255,0.6)", padding:"1px 7px", borderRadius:10 }}>{item.pronouns}</span>}
              <span style={{ fontSize:11, color:C.muted, fontFamily:"system-ui" }}>{item.time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right actions */}
      <div style={{ position:"absolute", right:12, bottom:130, display:"flex", flexDirection:"column", alignItems:"center", gap:18, zIndex:3 }}>
        {[
          { icon: liked?"❤️":"🤍", count:votes, action:()=>{setLiked(l=>!l);setVotes(v=>liked?v-1:v+1);} },
          { icon:"💬", count:item.replies, action:()=>{} },
          { icon: saved?"🔖":"📌", count:item.saves+(saved?1:0), action:()=>setSaved(s=>!s) },
          { icon:"↗", count:"Share", action:()=>{} },
        ].map((btn,i) => (
          <button key={i} onClick={btn.action} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
            <div style={{ width:46, height:46, borderRadius:"50%", background:"rgba(255,255,255,0.82)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:21, boxShadow:"0 2px 10px rgba(0,0,0,0.08)" }}>{btn.icon}</div>
            <span style={{ fontSize:11, fontWeight:600, color:C.text, fontFamily:"system-ui" }}>{btn.count}</span>
          </button>
        ))}
      </div>

      {/* Research grounding bar */}
      <div style={{ padding:"0 14px 8px", flexShrink:0, zIndex:2 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 12px", background:"rgba(255,255,255,0.68)", backdropFilter:"blur(8px)", borderRadius:12, border:"1px solid rgba(255,255,255,0.88)" }}>
          <span style={{ fontSize:11, color:C.sage, fontWeight:600 }}>📄</span>
          <span style={{ fontSize:11, color:C.textSoft, fontFamily:"system-ui", flex:1 }}>Research on <strong style={{ color:C.primary }}>{item.tag}</strong></span>
          <span style={{ fontSize:11, color:C.primary, fontFamily:"system-ui", fontWeight:700, cursor:"pointer" }}>View →</span>
        </div>
      </div>

      {/* Reply bar */}
      <div style={{ padding:"0 14px 76px", flexShrink:0, zIndex:2 }}>
        <div style={{ display:"flex", gap:10, alignItems:"center", background:"rgba(255,255,255,0.72)", backdropFilter:"blur(12px)", borderRadius:26, padding:"10px 14px", border:"1px solid rgba(255,255,255,0.9)" }}>
          <div style={{ width:28, height:28, borderRadius:"50%", background:C.grad, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"#fff", flexShrink:0 }}>A</div>
          <span style={{ fontSize:13, color:C.muted, fontFamily:"system-ui", fontStyle:"italic", flex:1 }}>Reply to {item.anonymous ? "this post" : item.author}…</span>
          <span style={{ fontSize:16, cursor:"pointer" }}>🎥</span>
        </div>
      </div>
    </div>
  );
}

function SessionNudge({ onClose, onBreak }) {
  return (
    <div style={{ position:"absolute", bottom:16, left:16, right:84, zIndex:200, animation:"slideUp 0.4s ease" }}>
      <div style={{ background:"#fff", borderRadius:20, padding:"16px 18px", boxShadow:"0 8px 32px rgba(139,94,122,0.18)", border:`1px solid ${C.border}` }}>
        <div style={{ fontSize:10, color:C.muted, fontFamily:"system-ui", letterSpacing:"0.07em", marginBottom:5 }}>WELLBEING CHECK-IN</div>
        <div style={{ fontSize:15, fontWeight:700, color:C.text, marginBottom:5 }}>You've been reading for a while 🌸</div>
        <div style={{ fontSize:12, color:C.textSoft, fontFamily:"system-ui", lineHeight:1.6, marginBottom:14 }}>Health content can be a lot. How are you feeling? It's okay to take a break.</div>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={onClose} style={{ flex:1, padding:"9px", borderRadius:14, background:C.grad, border:"none", color:"#fff", fontSize:12, fontWeight:700, fontFamily:"system-ui", cursor:"pointer" }}>I'm doing well ✓</button>
          <button onClick={onBreak} style={{ flex:1, padding:"9px", borderRadius:14, background:C.surface2, border:`1px solid ${C.border}`, color:C.textSoft, fontSize:12, fontFamily:"system-ui", cursor:"pointer" }}>Take a break</button>
        </div>
      </div>
    </div>
  );
}

function TopicCooldown({ topic, onDismiss, onContinue }) {
  return (
    <div style={{ position:"absolute", inset:0, background:"rgba(46,26,40,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, backdropFilter:"blur(6px)", padding:24 }}>
      <div style={{ background:"#fff", borderRadius:24, padding:"28px 22px", width:"100%", maxWidth:320 }}>
        <div style={{ fontSize:36, textAlign:"center", marginBottom:12 }}>🫧</div>
        <div style={{ fontSize:17, fontWeight:700, color:C.text, marginBottom:8, textAlign:"center" }}>Time for a breather</div>
        <div style={{ fontSize:13, color:C.textSoft, fontFamily:"system-ui", lineHeight:1.7, textAlign:"center", marginBottom:18 }}>
          You've read a lot about <strong style={{ color:C.primary }}>{topic}</strong> today. Deep-diving is great — your mind deserves rest too.
        </div>
        <div style={{ padding:"11px 14px", borderRadius:14, background:C.sageBg, marginBottom:18 }}>
          <div style={{ fontSize:11, color:C.sage, fontFamily:"system-ui", fontWeight:600, marginBottom:3 }}>💡 Evidence says</div>
          <div style={{ fontSize:11, color:C.textSoft, fontFamily:"system-ui", lineHeight:1.6 }}>Short breaks between health research sessions reduce anxiety and improve information retention.</div>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={onDismiss} style={{ flex:1, padding:"11px", borderRadius:14, background:C.grad, border:"none", color:"#fff", fontSize:13, fontWeight:700, fontFamily:"system-ui", cursor:"pointer" }}>Take a break</button>
          <button onClick={onContinue} style={{ flex:1, padding:"11px", borderRadius:14, background:C.surface2, border:`1px solid ${C.border}`, color:C.textSoft, fontSize:13, fontFamily:"system-ui", cursor:"pointer" }}>Continue</button>
        </div>
      </div>
    </div>
  );
}

function WellbeingCheck({ onClose }) {
  return (
    <div style={{ position:"absolute", bottom:16, left:16, right:84, zIndex:200, animation:"slideUp 0.4s ease" }}>
      <div style={{ background:"#fff", borderRadius:20, padding:"16px 18px", boxShadow:"0 8px 32px rgba(90,138,114,0.2)", border:`1.5px solid ${C.sage}` }}>
        <div style={{ fontSize:10, color:C.sage, fontFamily:"system-ui", fontWeight:600, letterSpacing:"0.07em", marginBottom:5 }}>HERINSIGHTS CARES</div>
        <div style={{ fontSize:14, fontWeight:700, color:C.text, marginBottom:5 }}>This might feel heavy 💙</div>
        <div style={{ fontSize:12, color:C.textSoft, fontFamily:"system-ui", lineHeight:1.65, marginBottom:14 }}>Health anxiety is real and valid. Talking to an affirming provider can help more than more research right now.</div>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={onClose} style={{ flex:1, padding:"9px", borderRadius:12, background:C.sage, border:"none", color:"#fff", fontSize:12, fontWeight:700, fontFamily:"system-ui", cursor:"pointer" }}>Find a provider</button>
          <button onClick={onClose} style={{ flex:1, padding:"9px", borderRadius:12, background:C.surface2, border:`1px solid ${C.border}`, color:C.textSoft, fontSize:12, fontFamily:"system-ui", cursor:"pointer" }}>I'm okay, thanks</button>
        </div>
      </div>
    </div>
  );
}

function GuidelinesModal({ onClose }) {
  return (
    <div style={{ position:"absolute", inset:0, background:"rgba(46,26,40,0.5)", display:"flex", alignItems:"flex-end", zIndex:200, backdropFilter:"blur(6px)" }} onClick={onClose}>
      <div style={{ background:C.bg, borderRadius:"24px 24px 0 0", padding:"22px 20px 40px", width:"100%", border:`1px solid ${C.border}` }} onClick={e => e.stopPropagation()}>
        <div style={{ width:36, height:4, borderRadius:2, background:C.border, margin:"0 auto 16px" }} />
        <div style={{ height:4, borderRadius:2, background:C.pride, marginBottom:16 }} />
        <div style={{ fontSize:18, fontWeight:700, color:C.text, marginBottom:4 }}>Community Guidelines</div>
        <div style={{ fontSize:13, color:C.muted, fontFamily:"system-ui", marginBottom:16, lineHeight:1.6 }}>
          HerInsights is a safe space for <strong style={{ color:C.primary }}>girls, women, and all queer people</strong>.
        </div>
        {GUIDELINES.map((g, i) => (
          <div key={i} style={{ padding:"10px 14px", marginBottom:8, borderRadius:12, background:C.surface, border:`1px solid ${C.border}`, fontSize:13, color:C.textSoft, fontFamily:"system-ui" }}>{g}</div>
        ))}
        <button onClick={onClose} style={{ marginTop:16, width:"100%", padding:"14px", background:C.grad, border:"none", borderRadius:16, color:"#fff", fontSize:15, fontWeight:700, fontFamily:"system-ui", cursor:"pointer" }}>I understand — take me in ❤️</button>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab]                   = useState("feed");
  const [userTags, setUserTags]         = useState(allTags);
  const [showTagModal, setShowTagModal] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [messages, setMessages]         = useState([]);
  const [input, setInput]               = useState("");
  const [loading, setLoading]           = useState(false);
  const [searchQ, setSearchQ]           = useState("");
  const [activeReel, setActiveReel]     = useState(0);
  const [selectedPronoun, setSelectedPronoun] = useState("she/her");
  const [sessionMin, setSessionMin]     = useState(0);
  const [showNudge, setShowNudge]       = useState(false);
  const [topicCounts, setTopicCounts]   = useState({});
  const [cooldownTopic, setCooldownTopic] = useState(null);
  const [showWellbeing, setShowWellbeing] = useState(false);
  const endRef  = useRef(null);
  const reelRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, loading]);

  useEffect(() => {
    if (tab !== "discourse" || !reelRef.current) return;
    const el = reelRef.current;
    const fn = () => setActiveReel(Math.round(el.scrollTop / el.clientHeight));
    el.addEventListener("scroll", fn, { passive:true });
    return () => el.removeEventListener("scroll", fn);
  }, [tab]);

  // Session nudge — demo fires after 10s, production would be 30min
  useEffect(() => {
    const t = setTimeout(() => setShowNudge(true), 10000);
    return () => clearTimeout(t);
  }, []);

  const toggleTag = id => setUserTags(p => p.map(t => t.id === id ? { ...t, subscribed:!t.subscribed } : t));

  const trackTopic = (msg) => {
    const map = { PCOS:["pcos","polycystic","androgen"], "Breast Cancer":["breast","cancer","tumor"], Endometriosis:["endo","laparoscopy"], "Trans Health":["hrt","transition","trans"], Anxiety:["worried","scared","terrified","dying","worst"] };
    const lower = msg.toLowerCase();
    for (const [topic, kw] of Object.entries(map)) {
      if (kw.some(k => lower.includes(k))) {
        setTopicCounts(prev => {
          const next = { ...prev, [topic]: (prev[topic]||0)+1 };
          if (next[topic] === 5) setCooldownTopic(topic);
          return next;
        });
        break;
      }
    }
  };

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput("");
    trackTopic(msg);
    const next = [...messages, { role:"user", content:msg }];
    setMessages(next);
    setLoading(true);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system:SYSTEM_PROMPT, messages:next }),
      });
      const d = await r.json();
      let reply = d.content?.map(b => b.text||"").join("") || "Please try again.";
      if (reply.includes("[WELLBEING_FLAG]")) {
        reply = reply.replace("[WELLBEING_FLAG]","").trim();
        setShowWellbeing(true);
      }
      setMessages([...next, { role:"assistant", content:reply }]);
    } catch { setMessages([...next, { role:"assistant", content:"Connection issue. Please try again." }]); }
    finally { setLoading(false); }
  };

  // Shared styles
  const cardStyle = { background:C.surface, border:`1px solid ${C.border}`, borderRadius:18, padding:20, marginBottom:14, cursor:"pointer", boxShadow:"0 2px 12px rgba(139,94,122,0.07)", transition:"box-shadow 0.2s,border-color 0.2s" };
  const citeBadge = n => <div style={{ display:"flex", alignItems:"center", gap:4, background:C.sageBg, borderRadius:20, padding:"3px 10px", fontSize:10, color:C.sage, fontFamily:"system-ui", fontWeight:600, whiteSpace:"nowrap" }}>✓ {n} citations</div>;
  const tabBtn = (id, label) => <button key={id} onClick={() => setTab(id)} style={{ flex:1, padding:"10px 0", background:"none", border:"none", borderBottom:tab===id?`2.5px solid ${C.primary}`:"2.5px solid transparent", color:tab===id?C.text:C.muted, fontSize:12, fontFamily:"system-ui", fontWeight:tab===id?700:400, cursor:"pointer", marginBottom:-1 }}>{label}</button>;

  const renderMsg = (msg, i) => {
    const isUser = msg.role === "user";
    let body = msg.content, sources = [];
    if (!isUser) { const m = msg.content.match(/(\[.+?\][\s]*)+$/s); if (m) { body = msg.content.slice(0,m.index).trim(); sources = m[0].trim().split("\n").filter(Boolean); } }
    return (
      <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:isUser?"flex-end":"flex-start", marginBottom:18 }}>
        {!isUser && (
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7 }}>
            <div style={{ width:28, height:28, borderRadius:"50%", background:C.grad, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"#fff" }}>H</div>
            <span style={{ fontSize:11, color:C.textSoft, fontFamily:"system-ui", fontWeight:600 }}>HerInsights AI</span>
            <span style={{ fontSize:9, color:C.sage, background:C.sageBg, borderRadius:10, padding:"2px 8px", fontFamily:"system-ui", fontWeight:600 }}>✓ Verified</span>
          </div>
        )}
        <div style={{ maxWidth:"88%", background:isUser?C.primary:C.surface, border:`1px solid ${isUser?"transparent":C.border}`, borderRadius:isUser?"18px 18px 4px 18px":"4px 18px 18px 18px", padding:"13px 16px" }}>
          <div style={{ fontSize:13.5, lineHeight:1.7, color:isUser?"#fff":C.text, fontFamily:isUser?"system-ui":"Georgia,serif", whiteSpace:"pre-wrap" }}>{body}</div>
          {sources.length > 0 && (
            <div style={{ marginTop:10, paddingTop:10, borderTop:`1px solid ${C.border}` }}>
              <div style={{ fontSize:10, color:C.muted, fontFamily:"system-ui", marginBottom:5, letterSpacing:"0.07em" }}>SOURCES</div>
              {sources.map((s,si) => <div key={si} style={{ fontSize:11, color:C.sage, fontFamily:"system-ui", marginBottom:3 }}>✓ {s}</div>)}
            </div>
          )}
        </div>
      </div>
    );
  };

  const lgbtqTags   = userTags.filter(t => t.lgbtq);
  const regularTags = userTags.filter(t => !t.lgbtq);

  return (
    <div style={{ fontFamily:"Georgia,'Times New Roman',serif", background:C.bg, height:"100vh", width:"100%", maxWidth:420, margin:"0 auto", position:"relative", overflow:"hidden", display:"flex" }}>

      {/* ── Content ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

        {/* ── FEED ── */}
        {tab === "feed" && (
          <div style={{ flex:1, overflowY:"auto", padding:"22px 14px 20px", scrollbarWidth:"none" }}>
            <div style={{ fontSize:22, fontWeight:700, color:C.text, marginBottom:2 }}>Her<span style={{ color:C.primary }}>Insights</span></div>
            <div style={{ fontSize:10, color:C.muted, fontFamily:"system-ui", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:18 }}>Research-backed · Inclusive</div>
            <div style={{ fontSize:11, color:C.muted, fontFamily:"system-ui", marginBottom:16, letterSpacing:"0.07em" }}>LATEST VERIFIED RESEARCH</div>

            {feedItems.reduce((acc, item, i) => {
              acc.push(
                <div key={item.id} style={cardStyle}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow="0 6px 20px rgba(139,94,122,0.14)"; e.currentTarget.style.borderColor=item.tagColor+"70"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow="0 2px 12px rgba(139,94,122,0.07)"; e.currentTarget.style.borderColor=C.border; }}
                >
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:11 }}>
                    <div style={{ padding:"4px 12px", borderRadius:20, background:item.tagColor+"18", color:item.tagColor, fontSize:11, fontWeight:700, fontFamily:"system-ui" }}>{item.tag}</div>
                    {citeBadge(item.citations.toLocaleString())}
                  </div>
                  <div style={{ fontSize:14.5, fontWeight:700, lineHeight:1.45, marginBottom:9, color:C.text }}>{item.title}</div>
                  <div style={{ fontSize:13, color:C.textSoft, lineHeight:1.7, marginBottom:14, fontFamily:"system-ui" }}>{item.summary}</div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:11, borderTop:`1px solid ${C.border}` }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <span>{item.sourceIcon}</span>
                      <span style={{ fontSize:11, color:C.muted, fontFamily:"system-ui" }}>{item.source} · {item.year}</span>
                    </div>
                    <div style={{ display:"flex", gap:12 }}>
                      <span style={{ fontSize:12, color:C.muted, fontFamily:"system-ui" }}>💬 {item.comments}</span>
                      <span style={{ fontSize:12, color:C.muted, fontFamily:"system-ui" }}>🔖 {item.saves}</span>
                      <span style={{ fontSize:11, color:C.muted, fontFamily:"system-ui" }}>{item.readTime}</span>
                    </div>
                  </div>
                </div>
              );
              if ((i + 1) % 2 === 0 && hopeItems[Math.floor(i / 2)]) {
                acc.push(<HopeCard key={"hope" + i} item={hopeItems[Math.floor(i / 2)]} />);
              }
              return acc;
            }, [])}

            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginTop:8, marginBottom:24 }}>
              <div style={{ height:1, width:36, background:C.border }} />
              <span style={{ fontSize:10, color:C.sage, fontFamily:"system-ui", fontWeight:600 }}>✦ 35% recovery & hope stories</span>
              <div style={{ height:1, width:36, background:C.border }} />
            </div>
          </div>
        )}

        {/* ── RESEARCH ── */}
        {tab === "search" && (
          <div style={{ flex:1, overflowY:"auto", padding:"22px 14px 20px", scrollbarWidth:"none" }}>
            <div style={{ fontSize:22, fontWeight:700, color:C.text, marginBottom:18 }}>Research <span style={{ color:C.primary }}>Search</span></div>
            <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:"12px 16px", display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
              <span style={{ opacity:0.6 }}>🔍</span>
              <input type="text" placeholder="Search verified medical research..." value={searchQ} onChange={e => setSearchQ(e.target.value)}
                style={{ flex:1, background:"none", border:"none", outline:"none", color:C.text, fontSize:14, fontFamily:"system-ui" }} />
            </div>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:22 }}>
              {["PubMed","NEJM","Cochrane","Lancet","JAMA"].map(s => (
                <div key={s} style={{ padding:"4px 12px", borderRadius:20, background:C.surface2, border:`1px solid ${C.border}`, fontSize:11, color:C.muted, fontFamily:"system-ui" }}>✓ {s}</div>
              ))}
            </div>
            {[
              { title:"PCOS and Insulin Resistance: Mechanisms and Management", source:"PubMed Central", citations:1847, year:2024 },
              { title:"Gender-Affirming HRT — Long-term Safety Profile", source:"JAMA", citations:1102, year:2024 },
              { title:"Endometriosis Pain Pathophysiology — A Systematic Review", source:"Cochrane Library", citations:932, year:2023 },
            ].map((r, i) => (
              <div key={i} style={{ ...cardStyle, marginBottom:12 }}>
                <div style={{ fontSize:14, fontWeight:600, lineHeight:1.45, marginBottom:10, color:C.text }}>{r.title}</div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:11, color:C.muted, fontFamily:"system-ui" }}>{r.source} · {r.year}</span>
                  {citeBadge(r.citations.toLocaleString())}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── COMMUNITY ── */}
        {tab === "discourse" && (
          <div style={{ flex:1, position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:14, right:14, zIndex:10 }}>
              <button onClick={() => setShowGuidelines(true)} style={{ background:"rgba(255,255,255,0.82)", backdropFilter:"blur(8px)", border:`1px solid ${C.border}`, borderRadius:20, padding:"6px 13px", color:C.primary, fontSize:11, cursor:"pointer", fontFamily:"system-ui", fontWeight:600 }}>🤝 Guidelines</button>
            </div>
            <div style={{ position:"absolute", top:14, left:10, right:130, zIndex:10, display:"flex", gap:6, overflowX:"auto", scrollbarWidth:"none", pointerEvents:"none" }}>
              {Object.entries(VIDEO_TYPES).map(([k, v]) => (
                <div key={k} style={{ flexShrink:0, padding:"3px 10px", borderRadius:20, background:v.bg+"EE", border:`1px solid ${v.color}40`, fontSize:10, color:v.color, fontFamily:"system-ui", fontWeight:600, whiteSpace:"nowrap", backdropFilter:"blur(4px)" }}>{v.label}</div>
              ))}
            </div>
            <div style={{ position:"absolute", left:8, top:"50%", transform:"translateY(-50%)", zIndex:10, display:"flex", flexDirection:"column", gap:6 }}>
              {reelItems.map((_, i) => (
                <div key={i} style={{ width:5, height:i===activeReel?20:5, borderRadius:3, background:i===activeReel?C.primary:C.border, transition:"all 0.3s" }} />
              ))}
            </div>
            <div ref={reelRef} style={{ height:"100%", overflowY:"scroll", scrollSnapType:"y mandatory", scrollbarWidth:"none" }}>
              {reelItems.map(item => (
                <div key={item.id} style={{ height:"100%", scrollSnapAlign:"start" }}>
                  <ReelCard item={item} />
                </div>
              ))}
            </div>
            <button style={{ position:"absolute", bottom:82, right:14, zIndex:10, width:50, height:50, borderRadius:"50%", background:C.grad, border:"none", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, cursor:"pointer", boxShadow:"0 4px 16px rgba(139,94,122,0.35)" }}>✚</button>
          </div>
        )}

        {/* ── CHAT ── */}
        {tab === "chat" && (
          <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
            <div style={{ padding:"12px 16px", background:C.surface2, borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
              <div style={{ width:38, height:38, borderRadius:"50%", background:C.grad, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, fontWeight:700, color:"#fff", flexShrink:0 }}>H</div>
              <div>
                <div style={{ fontSize:13, fontWeight:700, fontFamily:"system-ui", color:C.text }}>HerInsights AI</div>
                <div style={{ fontSize:10, color:C.muted, fontFamily:"system-ui" }}>Inclusive · Evidence-based · Affirming</div>
              </div>
              <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:5 }}>
                <div style={{ width:7, height:7, borderRadius:"50%", background:C.sage }} />
                <span style={{ fontSize:10, color:C.sage, fontFamily:"system-ui", fontWeight:600 }}>Online</span>
              </div>
            </div>
            <div style={{ padding:"8px 14px 6px", display:"flex", gap:6, flexWrap:"wrap", background:C.bg, borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
              {[["★ HerInsights DB",true],["✓ PubMed Live",false],["✓ Cochrane",false],["✓ NEJM",false]].map(([s,p]) => (
                <div key={s} style={{ padding:"3px 10px", borderRadius:20, background:p?C.primary+"18":C.surface2, border:`1px solid ${p?C.primary+"60":C.border}`, fontSize:10, color:p?C.primary:C.muted, fontFamily:"system-ui", fontWeight:600 }}>{s}</div>
              ))}
            </div>
            <div style={{ flex:1, overflowY:"auto", padding:"16px 14px 8px", scrollbarWidth:"none" }}>
              {messages.length === 0 && (
                <div>
                  <div style={{ fontSize:19, fontWeight:700, marginBottom:6, textAlign:"center", color:C.text }}>Ask anything about your health</div>
                  <div style={{ fontSize:12, color:C.muted, fontFamily:"system-ui", textAlign:"center", marginBottom:6 }}>Inclusive of all bodies, identities, and experiences</div>
                  <div style={{ height:3, borderRadius:2, background:C.pride, margin:"0 auto 24px", width:120 }} />
                  <div style={{ fontSize:10, color:C.muted, fontFamily:"system-ui", letterSpacing:"0.07em", marginBottom:10 }}>SUGGESTED QUESTIONS</div>
                  {SUGGESTED.map((q, i) => (
                    <button key={i} onClick={() => send(q)} style={{ width:"100%", textAlign:"left", padding:"12px 15px", background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, marginBottom:8, cursor:"pointer", color:C.textSoft, fontSize:13, fontFamily:"system-ui", lineHeight:1.4, transition:"border-color 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor=C.primary+"80"}
                      onMouseLeave={e => e.currentTarget.style.borderColor=C.border}
                    >
                      <span style={{ color:C.primary, marginRight:9, fontWeight:700 }}>→</span>{q}
                    </button>
                  ))}
                  <div style={{ marginTop:16, padding:"12px 15px", borderRadius:14, background:C.amberBg, border:`1px solid ${C.sand}50` }}>
                    <span style={{ fontSize:11, color:C.sand, fontFamily:"system-ui", fontWeight:600 }}>⚠ Medical disclaimer: </span>
                    <span style={{ fontSize:11, color:C.muted, fontFamily:"system-ui" }}>HerInsights AI provides research summaries only. Always consult a qualified, affirming healthcare provider.</span>
                  </div>
                </div>
              )}
              {messages.map(renderMsg)}
              {loading && (
                <div style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:16 }}>
                  <div style={{ width:28, height:28, borderRadius:"50%", background:C.grad, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"#fff", flexShrink:0 }}>H</div>
                  <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:"4px 18px 18px 18px", padding:"13px 16px" }}>
                    <div style={{ display:"flex", gap:5, alignItems:"center" }}>
                      {[0,1,2].map(j => <div key={j} style={{ width:7, height:7, borderRadius:"50%", background:C.primary, animation:`pulse 1.2s ease-in-out ${j*0.2}s infinite` }} />)}
                      <span style={{ fontSize:11, color:C.muted, fontFamily:"system-ui", marginLeft:8 }}>Searching verified sources…</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>
            <div style={{ padding:"10px 14px 16px", borderTop:`1px solid ${C.border}`, background:C.bg, flexShrink:0 }}>
              <div style={{ display:"flex", gap:10, alignItems:"flex-end", background:C.surface, border:`1px solid ${C.border}`, borderRadius:24, padding:"10px 14px" }}>
                <textarea rows={1} placeholder="Ask about PCOS, trans health, endometriosis…" value={input}
                  onChange={e => { setInput(e.target.value); e.target.style.height="auto"; e.target.style.height=Math.min(e.target.scrollHeight,100)+"px"; }}
                  onKeyDown={e => { if (e.key==="Enter"&&!e.shiftKey) { e.preventDefault(); send(); } }}
                  style={{ flex:1, background:"none", border:"none", outline:"none", color:C.text, fontSize:14, fontFamily:"system-ui", resize:"none", maxHeight:100, lineHeight:1.5 }}
                />
                <button onClick={() => send()} disabled={!input.trim()||loading}
                  style={{ width:36, height:36, borderRadius:"50%", border:"none", flexShrink:0, cursor:input.trim()&&!loading?"pointer":"default", background:input.trim()&&!loading?C.primary:C.border, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, color:"#fff", transition:"background 0.2s" }}>↑</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Right Nav ── */}
      <div style={{ width:68, background:C.surface, borderLeft:`1px solid ${C.border}`, display:"flex", flexDirection:"column", alignItems:"center", paddingTop:16, paddingBottom:24, gap:2, flexShrink:0, zIndex:20 }}>
        <div style={{ width:36, height:36, borderRadius:"50%", background:C.grad, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:"#fff", marginBottom:14 }}>H</div>
        {[["feed","⬡","Feed"],["search","◎","Search"],["discourse","▣","Community"],["chat","✦","Ask AI"]].map(([id,icon,label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ width:54, paddingTop:10, paddingBottom:10, background:tab===id?C.primary+"18":"transparent", border:"none", borderRadius:14, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:4, transition:"background 0.18s" }}>
            <span style={{ fontSize:22, color:tab===id?C.primary:C.muted }}>{icon}</span>
            <span style={{ fontSize:9, fontFamily:"system-ui", fontWeight:tab===id?700:400, color:tab===id?C.primary:C.muted, textAlign:"center" }}>{label}</span>
          </button>
        ))}
        <div style={{ flex:1 }} />
        <div style={{ width:30, height:4, borderRadius:2, background:C.pride, marginBottom:10 }} />
        <button onClick={() => setShowTagModal(true)} style={{ width:54, paddingTop:8, paddingBottom:8, background:"transparent", border:"none", borderRadius:14, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
          <span style={{ fontSize:20, color:C.muted }}>⊕</span>
          <span style={{ fontSize:9, fontFamily:"system-ui", color:C.muted }}>Topics</span>
        </button>
        <div style={{ width:36, height:36, borderRadius:"50%", background:C.grad, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#fff", fontFamily:"system-ui", marginTop:6, cursor:"pointer" }}>A</div>
      </div>

      {/* ── Wellbeing overlays ── */}
      {showNudge    && <SessionNudge onClose={() => setShowNudge(false)} onBreak={() => { setShowNudge(false); setTab("feed"); }} />}
      {cooldownTopic && <TopicCooldown topic={cooldownTopic} onDismiss={() => { setCooldownTopic(null); setTab("feed"); }} onContinue={() => setCooldownTopic(null)} />}
      {showWellbeing && <WellbeingCheck onClose={() => setShowWellbeing(false)} />}

      {/* ── Modals ── */}
      {showTagModal && (
        <div style={{ position:"absolute", inset:0, background:"rgba(46,26,40,0.45)", display:"flex", alignItems:"flex-end", zIndex:100, backdropFilter:"blur(6px)" }} onClick={() => setShowTagModal(false)}>
          <div style={{ background:C.bg, borderRadius:"24px 24px 0 0", padding:"22px 20px 40px", width:"100%", border:`1px solid ${C.border}`, maxHeight:"85%", overflowY:"auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ width:36, height:4, borderRadius:2, background:C.border, margin:"0 auto 18px" }} />
            <div style={{ fontSize:18, fontWeight:700, color:C.text, marginBottom:4 }}>Manage Topics</div>
            <div style={{ fontSize:13, color:C.muted, fontFamily:"system-ui", marginBottom:18 }}>Personalise your feed. All identities welcome.</div>
            <div style={{ fontSize:10, color:C.muted, fontFamily:"system-ui", letterSpacing:"0.07em", marginBottom:10 }}>HEALTH TOPICS</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:9, marginBottom:20 }}>
              {regularTags.map(t => (
                <button key={t.id} onClick={() => toggleTag(t.id)} style={{ padding:"8px 16px", borderRadius:24, border:`1.5px solid ${t.subscribed?t.color:C.border}`, background:t.subscribed?t.color+"20":"transparent", color:t.subscribed?t.color:C.muted, fontSize:13, fontFamily:"system-ui", fontWeight:600, cursor:"pointer" }}>
                  {t.subscribed?"✓ ":""}{t.label}
                </button>
              ))}
            </div>
            <div style={{ height:3, borderRadius:2, background:C.pride, marginBottom:14 }} />
            <div style={{ fontSize:10, color:C.muted, fontFamily:"system-ui", letterSpacing:"0.07em", marginBottom:10 }}>🏳️‍🌈 LGBTQ+ HEALTH TOPICS</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:9, marginBottom:20 }}>
              {lgbtqTags.map(t => (
                <button key={t.id} onClick={() => toggleTag(t.id)} style={{ padding:"8px 16px", borderRadius:24, border:`1.5px solid ${t.subscribed?t.color:C.border}`, background:t.subscribed?t.color+"20":"transparent", color:t.subscribed?t.color:C.muted, fontSize:13, fontFamily:"system-ui", fontWeight:600, cursor:"pointer" }}>
                  {t.subscribed?"✓ ":""}{t.label}
                </button>
              ))}
            </div>
            <div style={{ fontSize:11, color:C.muted, fontFamily:"system-ui", marginBottom:10, fontWeight:600 }}>Your pronouns</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:22 }}>
              {PRONOUNS.map(p => (
                <button key={p} onClick={() => setSelectedPronoun(p)} style={{ padding:"6px 14px", borderRadius:20, border:`1.5px solid ${selectedPronoun===p?C.primary:C.border}`, background:selectedPronoun===p?C.primary+"18":"transparent", color:selectedPronoun===p?C.primary:C.muted, fontSize:12, fontFamily:"system-ui", fontWeight:600, cursor:"pointer" }}>{p}</button>
              ))}
            </div>
            <button onClick={() => setShowTagModal(false)} style={{ width:"100%", padding:"14px", background:C.grad, border:"none", borderRadius:16, color:"#fff", fontSize:15, fontWeight:700, fontFamily:"system-ui", cursor:"pointer" }}>Save preferences</button>
          </div>
        </div>
      )}
      {showGuidelines && <GuidelinesModal onClose={() => setShowGuidelines(false)} />}

      <style>{`
        @keyframes pulse { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        textarea { scrollbar-width:none; }
        ::-webkit-scrollbar { display:none; }
        * { box-sizing:border-box; }
      `}</style>
    </div>
  );
}
