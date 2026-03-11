import { useState, useRef, useEffect } from "react";

// ── Palette — warm, botanical wellness ────────────────────────────────────────
const C = {
  bg:       "#FAF7F2",        // warm oat
  surface:  "#FFFFFF",
  surface2: "#F4EFE8",        // soft parchment
  border:   "#E8DDD0",
  muted:    "#A8947E",        // warm taupe
  text:     "#2C2018",        // deep espresso
  textSoft: "#6B5444",
  primary:  "#7B6F5E",        // stone
  rose:     "#C4857A",        // dusty rose
  roseBg:   "#FAF0EE",
  sage:     "#6B8C72",        // botanical sage
  sageBg:   "#EEF4EF",
  sand:     "#C4A882",        // warm sand
  sandBg:   "#FAF3EA",
  lavender: "#8C7EA8",
  grad:     "linear-gradient(135deg, #C4857A 0%, #C4A882 100%)",
  gradSoft: "linear-gradient(135deg, #F5EAE7 0%, #FAF3EA 100%)",
};

// ── Tags ──────────────────────────────────────────────────────────────────────
const ALL_TAGS = [
  { id:"pcos",         label:"PCOS",            color:"#C4857A", active:true  },
  { id:"breastcancer", label:"Breast Cancer",   color:"#8C7EA8", active:true  },
  { id:"endo",         label:"Endometriosis",   color:"#6B8C72", active:true  },
  { id:"menopause",    label:"Menopause",        color:"#C4A882", active:false },
  { id:"fertility",    label:"Fertility",        color:"#7A9A8C", active:false },
  { id:"thyroid",      label:"Thyroid",          color:"#8C9A72", active:false },
  { id:"mentalhealth", label:"Mental Health",    color:"#7B6F5E", active:false },
  { id:"transhealth",  label:"Trans Health",     color:"#8C7EA8", active:false },
  { id:"hearthealth",  label:"Heart Health",     color:"#C47A7A", active:false },
  { id:"autoimmune",   label:"Autoimmune",       color:"#8A8472", active:false },
  { id:"skinhealth",   label:"Skin Health",      color:"#C4A072", active:false },
  { id:"nutrition",    label:"Nutrition",        color:"#7A9A72", active:false },
];

const VIDEO_TYPES = {
  story:     { label:"Personal Story",     color:"#C4857A" },
  expert:    { label:"Expert Clinician",   color:"#6B8C72" },
  explainer: { label:"Research Explainer", color:"#C4A882" },
  qa:        { label:"Q&A",               color:"#8C7EA8" },
};

// ── Content ───────────────────────────────────────────────────────────────────
const feedItems = [
  { id:1, tagId:"pcos", tag:"PCOS", tagColor:"#C4857A",
    title:"Inositol Supplementation Reduces Androgen Levels in PCOS",
    source:"New England Journal of Medicine", sourceIcon:"🏥", citations:847, year:2024,
    summary:"A meta-analysis of 14 RCTs found myo-inositol significantly reduced testosterone and improved insulin sensitivity in women with PCOS.",
    readTime:"6 min", comments:34, saves:128 },
  { id:2, tagId:"breastcancer", tag:"Breast Cancer", tagColor:"#8C7EA8",
    title:"Dense Breast Tissue Screening Guidelines Updated by WHO",
    source:"The Lancet Oncology", sourceIcon:"🔬", citations:1203, year:2024,
    summary:"New WHO guidelines recommend supplemental MRI for women with extremely dense breast tissue, improving early detection rates.",
    readTime:"9 min", comments:91, saves:312 },
  { id:3, tagId:"endo", tag:"Endometriosis", tagColor:"#6B8C72",
    title:"Average Diagnostic Delay for Endometriosis Remains 8 Years",
    source:"JAMA Internal Medicine", sourceIcon:"🧬", citations:562, year:2024,
    summary:"Systemic under-reporting and symptom normalisation are primary contributors to the persistent diagnostic gap in endometriosis care.",
    readTime:"5 min", comments:218, saves:504 },
  { id:4, tagId:"menopause", tag:"Menopause", tagColor:"#C4A882",
    title:"HRT Timing Matters: The Window of Opportunity Hypothesis",
    source:"Climacteric Journal", sourceIcon:"🔬", citations:621, year:2024,
    summary:"Starting HRT within 10 years of menopause onset reduces cardiovascular risk. Earlier intervention yields meaningfully better outcomes.",
    readTime:"8 min", comments:47, saves:189 },
  { id:5, tagId:"thyroid", tag:"Thyroid", tagColor:"#8C9A72",
    title:"Subclinical Hypothyroidism and Fertility: New Evidence",
    source:"Journal of Clinical Endocrinology", sourceIcon:"🏥", citations:438, year:2024,
    summary:"TSH levels above 2.5 mIU/L in women trying to conceive are linked to longer time to pregnancy, even within standard reference ranges.",
    readTime:"6 min", comments:82, saves:241 },
  { id:6, tagId:"fertility", tag:"Fertility", tagColor:"#7A9A8C",
    title:"Lifestyle Factors and IVF Success Rates: A Comprehensive Review",
    source:"Human Reproduction", sourceIcon:"🧬", citations:891, year:2024,
    summary:"Sleep quality, stress management, and Mediterranean diet adherence showed the strongest associations with successful embryo implantation.",
    readTime:"10 min", comments:133, saves:367 },
  { id:7, tagId:"mentalhealth", tag:"Mental Health", tagColor:"#7B6F5E",
    title:"Premenstrual Dysphoric Disorder: Recognition and Treatment Gaps",
    source:"The Lancet Psychiatry", sourceIcon:"📋", citations:534, year:2024,
    summary:"PMDD affects 3–8% of reproductive-age women but remains underdiagnosed. SSRIs and lifestyle interventions show strong evidence.",
    readTime:"7 min", comments:298, saves:512 },
  { id:8, tagId:"transhealth", tag:"Trans Health", tagColor:"#8C7EA8",
    title:"Gender-Affirming Care Improves Long-Term Mental Health Outcomes",
    source:"JAMA Psychiatry", sourceIcon:"📋", citations:742, year:2024,
    summary:"A longitudinal study of 3,500 patients found gender-affirming care significantly reduced depression and anxiety over a 5-year period.",
    readTime:"7 min", comments:156, saves:389 },
];

const reelItems = [
  { id:1, tagId:"pcos", type:"video", videoType:"story", tag:"PCOS", tagColor:"#C4857A",
    author:"Maya R.", avatar:"M", avatarGrad:"linear-gradient(135deg,#C4857A,#C4A882)",
    time:"2h ago", cw:null,
    title:"My PCOS journey — 3 years in",
    content:"Sharing everything I wish I'd known at diagnosis. The hard days, and what finally helped.",
    duration:"4:32", bg:"linear-gradient(160deg,#FAF0EE,#F5E5E0,#EDD8D2)", replies:34, upvotes:187, saves:92, videoEmoji:"🎥" },
  { id:2, tagId:"endo", type:"text", tag:"Endometriosis", tagColor:"#6B8C72",
    author:"Anonymous", avatar:"?", avatarGrad:"linear-gradient(135deg,#B0B0A0,#C8C8B8)",
    time:"4h ago", cw:"chronic pain",
    title:null,
    content:"6 years of being told 'it's just bad periods.' Finally have a diagnosis. Finally have a name for what I've been living with. I'm grieving and relieved at the same time.",
    bg:"linear-gradient(160deg,#EEF4EF,#E4EEE5,#D5E5D7)", replies:89, upvotes:512, saves:234, videoEmoji:null },
  { id:3, tagId:"breastcancer", type:"video", videoType:"qa", tag:"Breast Cancer", tagColor:"#8C7EA8",
    author:"Serena W.", avatar:"S", avatarGrad:"linear-gradient(135deg,#8C7EA8,#B0A5C4)",
    time:"6h ago", cw:"cancer treatment",
    title:"Answering your chemo questions",
    content:"Fatigue management, nausea, supplements my oncologist approved, and what nobody tells you.",
    duration:"11:48", bg:"linear-gradient(160deg,#F0EEF8,#E5E0F4,#D5CEEC)", replies:78, upvotes:423, saves:312, videoEmoji:"💬" },
  { id:4, tagId:"mentalhealth", type:"text", tag:"Mental Health", tagColor:"#7B6F5E",
    author:"Anonymous", avatar:"?", avatarGrad:"linear-gradient(135deg,#B0B0A0,#C8C8B8)",
    time:"3h ago", cw:"anxiety",
    title:null,
    content:"Tracked my mood against my cycle for 6 months. The pattern was undeniable. Sharing my chart — the correlation between day 21 and anxiety spikes was something my doctor couldn't argue with.",
    bg:"linear-gradient(160deg,#F2EFE8,#EAE5DC,#E0D8CC)", replies:103, upvotes:689, saves:445, videoEmoji:null },
  { id:5, tagId:"fertility", type:"video", videoType:"expert", tag:"Fertility", tagColor:"#7A9A8C",
    author:"Dr. Aisha Noor", avatar:"Dr", avatarGrad:"linear-gradient(135deg,#7A9A8C,#9AB8AE)",
    time:"1d ago", cw:null,
    title:"Egg freezing after 35 — honest answers",
    content:"What clinics don't always tell you. Success rates, costs, and the optimal age window.",
    duration:"9:22", bg:"linear-gradient(160deg,#EEF4F0,#E4EEE9,#D5E5DC)", replies:44, upvotes:287, saves:198, videoEmoji:"🥚" },
  { id:6, tagId:"menopause", type:"text", tag:"Menopause", tagColor:"#C4A882",
    author:"Claire T.", avatar:"C", avatarGrad:"linear-gradient(135deg,#C4A882,#DAC09C)",
    time:"8h ago", cw:null,
    title:null,
    content:"Hot flashes at 42. I thought I was too young. Turns out perimenopause can start a decade before menopause. Sharing what my gynaecologist told me that changed everything.",
    bg:"linear-gradient(160deg,#FAF3EA,#F2E8D8,#E8DAC4)", replies:67, upvotes:341, saves:212, videoEmoji:null },
];

const threadItems = [
  { id:"t1", tagId:"pcos", tag:"PCOS", tagColor:"#C4857A",
    title:"Anyone else's symptoms get worse in winter?",
    author:"Rina K.", avatar:"R", avatarGrad:"linear-gradient(135deg,#C4857A,#C4A882)", time:"3h ago",
    body:"I've noticed every November my hair shedding spikes and my cycles get longer. Doctor said it's unrelated but it feels too consistent. Has anyone tracked seasonal patterns with PCOS?",
    upvotes:142, comments:38, saves:61, flair:"Question",
    replies:[
      { author:"Maya T.", avatar:"M", avatarGrad:"linear-gradient(135deg,#C4A882,#DAC09C)", time:"2h ago", body:"Yes!! My endocrinologist confirmed there's emerging research linking vitamin D deficiency to androgen spikes. Worth getting your D levels checked.", upvotes:89 },
      { author:"Dr. Priya S.", avatar:"Dr", avatarGrad:"linear-gradient(135deg,#6B8C72,#8AAE8A)", time:"1h ago", body:"Clinician here — the vitamin D / insulin sensitivity connection is real. Lower sun → lower D → worse insulin signalling → elevated androgens. Seasonal pattern is plausible and under-studied.", upvotes:204 },
    ]},
  { id:"t2", tagId:"endo", tag:"Endometriosis", tagColor:"#6B8C72",
    title:"Post-lap recovery — what actually helped",
    author:"Priya D.", avatar:"P", avatarGrad:"linear-gradient(135deg,#6B8C72,#8AAE8A)", time:"2d ago",
    body:"Just had my diagnostic laparoscopy. Collecting real experiences because the NHS leaflet was not very useful. What do you wish you'd known?",
    upvotes:276, comments:94, saves:312, flair:"Recovery",
    replies:[
      { author:"Clara B.", avatar:"C", avatarGrad:"linear-gradient(135deg,#C4857A,#DAA090)", time:"2d ago", body:"Peppermint tea for the shoulder tip pain from the gas — not in any leaflet but it works. Also a heating pad on your shoulders, not just your abdomen.", upvotes:187 },
      { author:"Mira K.", avatar:"M", avatarGrad:"linear-gradient(135deg,#8C7EA8,#B0A5C4)", time:"1d ago", body:"Give yourself more time than you think. I was back at my desk in 4 days and I genuinely regret it. Two weeks of real rest would have saved me months of fatigue.", upvotes:221 },
    ]},
  { id:"t3", tagId:"menopause", tag:"Menopause", tagColor:"#C4A882",
    title:"Perimenopause brain fog — coping strategies",
    author:"Claire T.", avatar:"C", avatarGrad:"linear-gradient(135deg,#C4A882,#DAC09C)", time:"5h ago",
    body:"I'm a surgeon and perimenopause brain fog is affecting my work in ways I never expected. Sharing strategies that have helped me, and desperately seeking more.",
    upvotes:387, comments:121, saves:298, flair:"Discussion",
    replies:[
      { author:"Dr. Sarah L.", avatar:"Dr", avatarGrad:"linear-gradient(135deg,#6B8C72,#8AAE8A)", time:"4h ago", body:"HRT was the only thing that actually resolved the fog for me — not just managed it. The research on estrogen and cognitive function is compelling. Worth a serious conversation with your gynaecologist.", upvotes:234 },
    ]},
  { id:"t4", tagId:"fertility", tag:"Fertility", tagColor:"#7A9A8C",
    title:"IVF round 3 — what changed between failed and successful cycles",
    author:"Anonymous", avatar:"?", avatarGrad:"linear-gradient(135deg,#B0B0A0,#C8C8B8)", time:"12h ago",
    body:"Two failed cycles. Third worked. The differences were small but I think they mattered. Sharing in case it helps anyone in the same position.",
    upvotes:512, comments:147, saves:423, flair:"Experience",
    replies:[
      { author:"Leila M.", avatar:"L", avatarGrad:"linear-gradient(135deg,#7A9A8C,#9AB8AE)", time:"10h ago", body:"Thank you for sharing this. The acupuncture point you mentioned — I've seen small RCTs supporting it for endometrial receptivity. It's on my list to try.", upvotes:89 },
    ]},
  { id:"t5", tagId:"mentalhealth", tag:"Mental Health", tagColor:"#7B6F5E",
    title:"Managing health anxiety without spiralling — what works",
    author:"Beth A.", avatar:"B", avatarGrad:"linear-gradient(135deg,#7B6F5E,#9A8C7A)", time:"1d ago",
    body:"Chronic illness and health anxiety are a brutal combination. I've been working on this for two years. Sharing what's helped me stay grounded without avoiding necessary care.",
    upvotes:423, comments:98, saves:334, flair:"Wellbeing",
    replies:[
      { author:"Dr. James F.", avatar:"Dr", avatarGrad:"linear-gradient(135deg,#C4A882,#DAC09C)", time:"22h ago", body:"This is such an important topic. Scheduled worry time, somatic grounding, and working with a therapist who understands chronic illness specifically — all evidence-based. Thank you for this post.", upvotes:167 },
    ]},
  { id:"t6", tagId:"breastcancer", tag:"Breast Cancer", tagColor:"#8C7EA8",
    title:"What I wish I'd known before my first oncology appointment",
    author:"Serena W.", avatar:"S", avatarGrad:"linear-gradient(135deg,#8C7EA8,#B0A5C4)", time:"3d ago",
    body:"I was completely overwhelmed at my first oncology appointment. Sharing the questions I wish I'd asked, and how I learned to advocate for myself.",
    upvotes:634, comments:178, saves:521, flair:"Experience",
    replies:[
      { author:"Clara B.", avatar:"C", avatarGrad:"linear-gradient(135deg,#C4857A,#DAA090)", time:"3d ago", body:"Bring someone with you if at all possible — to take notes if nothing else. Your brain cannot absorb everything you're being told when you're that scared.", upvotes:312 },
    ]},
];

const SYSTEM_PROMPT = `You are HerInsights AI — a research assistant for a women's health app.
Answer using only verified, peer-reviewed medical research from PubMed, Cochrane, NEJM, Lancet, JAMA, WHO, NIH, or equivalent.
Be inclusive of all patients regardless of background or identity.
Cite sources inline. Never give personal medical advice.
Be warm, clear, and empowering. Keep to 2–4 paragraphs. End with: [Source Name, Year]

ANXIETY SPIRAL DETECTION: If the user shows signs of health anxiety, catastrophizing, or emotional distress — acknowledge their feelings first, then ground them in reassuring evidence-based facts, and suggest speaking with a healthcare provider. Do NOT feed the spiral. Append exactly [WELLBEING_FLAG] at the very end if you detected distress.`;

const GUIDELINES = [
  "🤝  Treat others with respect — disagreement is fine, unkindness is not",
  "🔒  Anonymous posts are fully protected",
  "🫂  Share experiences, not prescriptions — no unsolicited medical advice",
  "⚠️  Content warnings are encouraged for sensitive topics",
  "❤️  Report harm — moderation responds within 2 hours",
  "📋  All discussions grounded in peer-reviewed research",
];

// ── Tag Manager Sheet ─────────────────────────────────────────────────────────
function TagManagerSheet({ tags, onToggle, onClose }) {
  const active   = tags.filter(t => t.active);
  const inactive = tags.filter(t => !t.active);
  return (
    <div style={{ position:"absolute", inset:0, background:"rgba(44,32,24,0.4)",
      display:"flex", alignItems:"flex-end", zIndex:100, backdropFilter:"blur(8px)" }} onClick={onClose}>
      <div style={{ background:C.bg, borderRadius:"24px 24px 0 0", padding:"20px 20px 48px",
        width:"100%", border:`1px solid ${C.border}`, maxHeight:"88%", overflowY:"auto" }}
        onClick={e => e.stopPropagation()}>
        <div style={{ width:40, height:4, borderRadius:2, background:C.border, margin:"0 auto 20px" }} />
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22 }}>
          <div>
            <div style={{ fontSize:19, fontWeight:700, color:C.text, letterSpacing:"-0.02em" }}>Your Health Topics</div>
            <div style={{ fontSize:12, color:C.muted, fontFamily:"system-ui", marginTop:3 }}>Your Home feed shows only what you follow</div>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:22,
            color:C.muted, cursor:"pointer", lineHeight:1, padding:"4px 8px" }}>✕</button>
        </div>

        {active.length > 0 && (
          <>
            <div style={{ fontSize:10, color:C.muted, fontFamily:"system-ui",
              letterSpacing:"0.08em", marginBottom:12, fontWeight:600 }}>FOLLOWING</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:24 }}>
              {active.map(t => (
                <div key={t.id} style={{ display:"inline-flex", alignItems:"center",
                  borderRadius:20, background:t.color+"18", border:`1.5px solid ${t.color}50`, overflow:"hidden" }}>
                  <span style={{ fontSize:13, fontWeight:700, color:t.color,
                    fontFamily:"system-ui", padding:"9px 8px 9px 16px" }}>{t.label}</span>
                  <button onClick={() => onToggle(t.id)}
                    style={{ background:"none", border:"none", borderLeft:`1px solid ${t.color}25`,
                      cursor:"pointer", padding:"9px 14px", color:t.color, fontSize:17,
                      lineHeight:1, minHeight:42, fontWeight:300 }}
                    aria-label={`Remove ${t.label}`}>×</button>
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{ height:1, background:C.border, marginBottom:22 }} />
        <div style={{ fontSize:10, color:C.muted, fontFamily:"system-ui",
          letterSpacing:"0.08em", marginBottom:14, fontWeight:600 }}>EXPLORE MORE TOPICS</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:28 }}>
          {inactive.map(t => (
            <button key={t.id} onClick={() => onToggle(t.id)}
              style={{ padding:"9px 16px", borderRadius:20, border:`1.5px solid ${C.border}`,
                background:"transparent", color:C.textSoft, fontSize:13, fontFamily:"system-ui",
                fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:7 }}>
              <span style={{ color:t.color, fontSize:15, lineHeight:1 }}>+</span>{t.label}
            </button>
          ))}
        </div>
        <button onClick={onClose}
          style={{ width:"100%", padding:"15px", background:C.grad, border:"none",
            borderRadius:16, color:"#fff", fontSize:15, fontWeight:700,
            fontFamily:"system-ui", cursor:"pointer", letterSpacing:"0.01em" }}>
          Save & close
        </button>
      </div>
    </div>
  );
}

// ── VideoPlayer ───────────────────────────────────────────────────────────────
function VideoPlayer({ item }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const timer = useRef(null);
  const toggle = () => {
    if (playing) { clearInterval(timer.current); setPlaying(false); }
    else {
      setPlaying(true);
      timer.current = setInterval(() => setProgress(p => {
        if (p >= 100) { clearInterval(timer.current); setPlaying(false); return 0; }
        return p + 0.4;
      }), 80);
    }
  };
  useEffect(() => () => clearInterval(timer.current), []);
  const meta = VIDEO_TYPES[item.videoType];
  return (
    <div onClick={toggle} style={{ position:"relative", width:"100%", aspectRatio:"16/9",
      background:item.bg, borderRadius:14, overflow:"hidden", cursor:"pointer" }}>
      <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center", gap:10 }}>
        <div style={{ fontSize:40 }}>{item.videoEmoji}</div>
        <div style={{ fontSize:11, color:C.textSoft, fontFamily:"system-ui", fontWeight:600,
          textAlign:"center", padding:"0 16px" }}>{item.title}</div>
      </div>
      {!playing && (
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center",
          justifyContent:"center", background:"rgba(44,32,24,0.12)" }}>
          <div style={{ width:48, height:48, borderRadius:"50%", background:"rgba(255,255,255,0.92)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:17, paddingLeft:3 }}>▶</div>
        </div>
      )}
      {playing && (
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:"rgba(255,255,255,0.3)" }}>
          <div style={{ height:"100%", width:`${progress}%`, background:C.grad }} />
        </div>
      )}
      {meta && (
        <div style={{ position:"absolute", top:10, left:10, padding:"3px 10px", borderRadius:20,
          background:"rgba(255,255,255,0.88)" }}>
          <span style={{ fontSize:10, fontWeight:700, color:meta.color, fontFamily:"system-ui" }}>{meta.label}</span>
        </div>
      )}
      {item.duration && (
        <div style={{ position:"absolute", bottom:10, right:10, padding:"2px 7px", borderRadius:7,
          background:"rgba(44,32,24,0.5)" }}>
          <span style={{ fontSize:10, color:"#fff", fontFamily:"system-ui" }}>{item.duration}</span>
        </div>
      )}
    </div>
  );
}

// ── Community post card (reel-style) ─────────────────────────────────────────
function PostCard({ item }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [votes, setVotes] = useState(item.upvotes);
  const [cwOk, setCwOk]   = useState(!item.cw);

  return (
    <div style={{ margin:"0 16px 2px", borderRadius:20, overflow:"hidden",
      background:item.bg, position:"relative" }}>
      {!cwOk && (
        <>
          <div style={{ position:"absolute", top:10, left:10, right:10, zIndex:10,
            display:"flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.94)",
            borderRadius:12, padding:"8px 12px", border:`1px solid ${C.border}` }}>
            <span>⚠️</span>
            <span style={{ fontSize:11, color:C.textSoft, fontFamily:"system-ui", flex:1 }}>
              Mentions: <strong style={{ color:C.rose }}>{item.cw}</strong></span>
          </div>
          <button onClick={() => setCwOk(true)}
            style={{ position:"absolute", bottom:12, left:12, right:12, zIndex:10, padding:"12px",
              background:C.grad, border:"none", borderRadius:14, color:"#fff",
              fontSize:13, fontWeight:700, fontFamily:"system-ui", cursor:"pointer" }}>Show anyway</button>
        </>
      )}
      <div style={{ filter:!cwOk?"blur(5px)":"none", transition:"filter 0.3s", pointerEvents:!cwOk?"none":"auto" }}>
        <div style={{ padding:"14px 16px 8px", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:34, height:34, borderRadius:"50%", background:item.avatarGrad,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:13, fontWeight:700, color:"#fff", flexShrink:0 }}>{item.avatar}</div>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:C.text, fontFamily:"system-ui" }}>{item.author}</div>
              <div style={{ fontSize:10, color:C.muted, fontFamily:"system-ui" }}>{item.time}</div>
            </div>
          </div>
          <span style={{ padding:"4px 10px", borderRadius:20, background:"rgba(255,255,255,0.7)",
            fontSize:10, fontWeight:700, color:item.tagColor, fontFamily:"system-ui",
            backdropFilter:"blur(4px)" }}>{item.tag}</span>
        </div>
        {item.type === "video"
          ? <div style={{ margin:"0 14px 10px" }}><VideoPlayer item={item} /></div>
          : <div style={{ padding:"2px 16px 14px", fontSize:14, lineHeight:1.8,
              color:C.text, fontFamily:"Georgia, serif" }}>{item.content}</div>
        }
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"8px 14px 14px" }}>
          <a href="#" onClick={e => e.stopPropagation()} style={{ fontSize:12, color:C.sage,
            fontFamily:"system-ui", fontWeight:600, textDecoration:"none",
            display:"flex", alignItems:"center", gap:3 }}>
            <span style={{ fontSize:10 }}>↗</span> Research
          </a>
          <div style={{ display:"flex", gap:4 }}>
            {[
              { label:liked?"❤️":"🤍", count:votes, fn:()=>{ setLiked(l=>!l); setVotes(v=>liked?v-1:v+1); } },
              { label:"💬", count:item.replies, fn:()=>{} },
              { label:saved?"🔖":"📌", count:null, fn:()=>setSaved(s=>!s) },
            ].map((btn,i)=>(
              <button key={i} onClick={btn.fn}
                style={{ background:"rgba(255,255,255,0.65)", border:"none", borderRadius:20,
                  cursor:"pointer", display:"flex", alignItems:"center", gap:5,
                  padding:"7px 12px", minHeight:40 }}>
                <span style={{ fontSize:15 }}>{btn.label}</span>
                {btn.count != null && <span style={{ fontSize:11, color:C.textSoft, fontFamily:"system-ui", fontWeight:600 }}>{btn.count}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Thread card (clean, not Reddit) ──────────────────────────────────────────
function ThreadCard({ t, onOpen }) {
  return (
    <div onClick={() => onOpen(t)} style={{ margin:"0 16px 0", cursor:"pointer" }}>
      <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
        <div style={{ width:34, height:34, borderRadius:"50%", background:t.avatarGrad, flexShrink:0,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:12, fontWeight:700, color:"#fff" }}>{t.avatar}</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
            <span style={{ fontSize:11, fontWeight:700, color:t.tagColor, fontFamily:"system-ui" }}>{t.tag}</span>
            <span style={{ fontSize:10, color:C.muted, fontFamily:"system-ui" }}>· {t.flair} · {t.time}</span>
          </div>
          <div style={{ fontSize:15, fontWeight:700, color:C.text, lineHeight:1.35,
            letterSpacing:"-0.01em", marginBottom:6 }}>{t.title}</div>
          <div style={{ fontSize:12.5, color:C.textSoft, fontFamily:"system-ui", lineHeight:1.65,
            marginBottom:10, display:"-webkit-box", WebkitLineClamp:2,
            WebkitBoxOrient:"vertical", overflow:"hidden" }}>{t.body}</div>
          {t.replies[0] && (
            <div style={{ background:C.surface2, borderRadius:12, padding:"9px 12px", marginBottom:10 }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                <div style={{ width:16, height:16, borderRadius:"50%", background:t.replies[0].avatarGrad,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:7, fontWeight:700, color:"#fff" }}>{t.replies[0].avatar}</div>
                <span style={{ fontSize:10, fontWeight:600, color:C.rose, fontFamily:"system-ui" }}>{t.replies[0].author}</span>
              </div>
              <div style={{ fontSize:11.5, color:C.textSoft, fontFamily:"system-ui", lineHeight:1.6,
                display:"-webkit-box", WebkitLineClamp:2,
                WebkitBoxOrient:"vertical", overflow:"hidden" }}>{t.replies[0].body}</div>
            </div>
          )}
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:11, color:C.muted, fontFamily:"system-ui" }}>▲ {t.upvotes}</span>
            <span style={{ fontSize:11, color:C.muted, fontFamily:"system-ui" }}>💬 {t.comments}</span>
            <a href="#" onClick={e=>e.stopPropagation()} style={{ marginLeft:"auto", fontSize:11, color:C.sage,
              fontFamily:"system-ui", fontWeight:600, textDecoration:"none",
              display:"flex", alignItems:"center", gap:3 }}>
              <span style={{ fontSize:9 }}>↗</span> Research
            </a>
          </div>
        </div>
      </div>
      <div style={{ height:1, background:C.border, margin:"14px 0" }} />
    </div>
  );
}

// ── Thread detail view ────────────────────────────────────────────────────────
function ThreadDetail({ t, onBack }) {
  return (
    <div style={{ flex:1, overflowY:"auto", scrollbarWidth:"none" }}>
      <button onClick={onBack} style={{ display:"flex", alignItems:"center", gap:6,
        padding:"14px 16px 6px", background:"none", border:"none", color:C.rose,
        fontFamily:"system-ui", fontSize:13, fontWeight:600, cursor:"pointer" }}>← Back</button>
      <div style={{ padding:"0 16px 20px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
          <div style={{ width:36, height:36, borderRadius:"50%", background:t.avatarGrad,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:13, fontWeight:700, color:"#fff" }}>{t.avatar}</div>
          <div>
            <span style={{ fontSize:13, fontWeight:600, color:C.text, fontFamily:"system-ui" }}>{t.author}</span>
            <div style={{ display:"flex", gap:6, marginTop:2 }}>
              <span style={{ fontSize:10, fontWeight:700, color:t.tagColor, fontFamily:"system-ui" }}>{t.tag}</span>
              <span style={{ fontSize:10, color:C.muted, fontFamily:"system-ui" }}>· {t.flair} · {t.time}</span>
            </div>
          </div>
          <a href="#" style={{ marginLeft:"auto", fontSize:11, color:C.sage, fontFamily:"system-ui",
            fontWeight:600, textDecoration:"none", display:"flex", alignItems:"center", gap:3 }}>
            <span style={{ fontSize:9 }}>↗</span> Research
          </a>
        </div>
        <div style={{ fontSize:19, fontWeight:700, color:C.text, lineHeight:1.3,
          letterSpacing:"-0.015em", marginBottom:14 }}>{t.title}</div>
        <div style={{ fontSize:14.5, color:C.textSoft, lineHeight:1.8,
          fontFamily:"Georgia, serif", marginBottom:16 }}>{t.body}</div>
        <div style={{ display:"flex", gap:14 }}>
          <span style={{ fontSize:12, color:C.muted, fontFamily:"system-ui" }}>▲ {t.upvotes}</span>
          <span style={{ fontSize:12, color:C.muted, fontFamily:"system-ui" }}>💬 {t.comments}</span>
          <span style={{ fontSize:12, color:C.muted, fontFamily:"system-ui" }}>🔖 {t.saves}</span>
        </div>
      </div>
      <div style={{ height:1, background:C.border, margin:"0 16px" }} />
      <div style={{ padding:"16px 16px 0" }}>
        <div style={{ fontSize:10, color:C.muted, fontFamily:"system-ui",
          letterSpacing:"0.08em", marginBottom:18, fontWeight:600 }}>REPLIES</div>
        {t.replies.map((r, i) => (
          <div key={i} style={{ marginBottom:20 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <div style={{ width:28, height:28, borderRadius:"50%", background:r.avatarGrad,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:11, fontWeight:700, color:"#fff" }}>{r.avatar}</div>
              <span style={{ fontSize:12, fontWeight:600, color:C.text, fontFamily:"system-ui" }}>{r.author}</span>
              <span style={{ fontSize:10, color:C.muted, fontFamily:"system-ui", marginLeft:"auto" }}>{r.time}</span>
            </div>
            <div style={{ fontSize:13.5, color:C.text, lineHeight:1.78, fontFamily:"Georgia, serif",
              marginBottom:8, paddingLeft:36 }}>{r.body}</div>
            <div style={{ display:"flex", gap:14, paddingLeft:36 }}>
              <span style={{ fontSize:11, color:C.muted, fontFamily:"system-ui" }}>▲ {r.upvotes}</span>
              <span style={{ fontSize:11, color:C.rose, fontFamily:"system-ui", cursor:"pointer", fontWeight:600 }}>Reply</span>
            </div>
            {i < t.replies.length - 1 && <div style={{ height:1, background:C.border, margin:"16px 0 0" }} />}
          </div>
        ))}
        <div style={{ display:"flex", gap:10, alignItems:"center", padding:"12px 0 40px" }}>
          <div style={{ width:28, height:28, borderRadius:"50%", background:C.grad, flexShrink:0,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:11, fontWeight:700, color:"#fff" }}>A</div>
          <div style={{ flex:1, background:C.surface2, border:`1px solid ${C.border}`,
            borderRadius:20, padding:"11px 16px", fontSize:13, color:C.muted,
            fontFamily:"system-ui" }}>Join the conversation…</div>
        </div>
      </div>
    </div>
  );
}

// ── Wellbeing overlays ────────────────────────────────────────────────────────
function WellbeingCheck({ onClose }) {
  return (
    <div style={{ position:"absolute", bottom:88, left:16, right:16, zIndex:200, animation:"slideUp 0.4s ease" }}>
      <div style={{ background:C.surface, borderRadius:20, padding:"18px 20px",
        boxShadow:"0 12px 40px rgba(107,140,114,0.2)", border:`1.5px solid ${C.sage}60` }}>
        <div style={{ fontSize:11, color:C.sage, fontFamily:"system-ui", fontWeight:700,
          letterSpacing:"0.08em", marginBottom:6 }}>HERINSIGHTS CARES</div>
        <div style={{ fontSize:15, fontWeight:700, color:C.text, marginBottom:6, letterSpacing:"-0.01em" }}>This might feel heavy 💙</div>
        <div style={{ fontSize:13, color:C.textSoft, fontFamily:"system-ui", lineHeight:1.65, marginBottom:16 }}>
          Health anxiety is real and valid. Talking to a healthcare provider can often help more than continued research right now.</div>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={onClose} style={{ flex:1, padding:"10px", borderRadius:12, background:C.sage,
            border:"none", color:"#fff", fontSize:13, fontWeight:700, fontFamily:"system-ui", cursor:"pointer" }}>Find a provider</button>
          <button onClick={onClose} style={{ flex:1, padding:"10px", borderRadius:12, background:C.surface2,
            border:`1px solid ${C.border}`, color:C.textSoft, fontSize:13,
            fontFamily:"system-ui", cursor:"pointer" }}>I'm okay, thanks</button>
        </div>
      </div>
    </div>
  );
}

function GuidelinesModal({ onClose }) {
  return (
    <div style={{ position:"absolute", inset:0, background:"rgba(44,32,24,0.45)",
      display:"flex", alignItems:"flex-end", zIndex:200, backdropFilter:"blur(8px)" }} onClick={onClose}>
      <div style={{ background:C.bg, borderRadius:"24px 24px 0 0", padding:"22px 20px 44px",
        width:"100%", border:`1px solid ${C.border}` }} onClick={e => e.stopPropagation()}>
        <div style={{ width:40, height:4, borderRadius:2, background:C.border, margin:"0 auto 18px" }} />
        <div style={{ fontSize:19, fontWeight:700, color:C.text, marginBottom:6, letterSpacing:"-0.02em" }}>Community Guidelines</div>
        <div style={{ fontSize:13, color:C.muted, fontFamily:"system-ui", marginBottom:18, lineHeight:1.6 }}>
          A respectful space for <strong style={{ color:C.rose }}>women and all people navigating women's health</strong>.
        </div>
        {GUIDELINES.map((g, i) => (
          <div key={i} style={{ padding:"10px 14px", marginBottom:8, borderRadius:12,
            background:C.surface, border:`1px solid ${C.border}`, fontSize:13,
            color:C.textSoft, fontFamily:"system-ui" }}>{g}</div>
        ))}
        <button onClick={onClose} style={{ marginTop:18, width:"100%", padding:"14px", background:C.grad,
          border:"none", borderRadius:16, color:"#fff", fontSize:15, fontWeight:700,
          fontFamily:"system-ui", cursor:"pointer" }}>I understand</button>
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab]                 = useState("home");
  const [tags, setTags]               = useState(ALL_TAGS);
  const [showTagManager, setShowTagManager] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [messages, setMessages]       = useState([]);
  const [loading, setLoading]         = useState(false);
  const [searchQ, setSearchQ]         = useState("");
  const [showWellbeing, setShowWellbeing] = useState(false);
  const [expandedThread, setExpandedThread] = useState(null);
  const endRef = useRef(null);

  const activeTags = tags.filter(t => t.active);
  const activeIds  = new Set(activeTags.map(t => t.id));
  const byTag = items => items.filter(i => activeIds.has(i.tagId));

  const toggleTag = id => setTags(prev => prev.map(t => t.id === id ? { ...t, active:!t.active } : t));
  const goTab = id => { setTab(id); setExpandedThread(null); };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages, loading]);

  const send = async text => {
    const msg = (text || "").trim();
    if (!msg || loading) return;
    setSearchQ(""); setTab("search");
    const next = [...messages, { role:"user", content:msg }];
    setMessages(next); setLoading(true);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system:SYSTEM_PROMPT, messages:next }),
      });
      const d = await r.json();
      let reply = d.content?.map(b => b.text||"").join("") || "Please try again.";
      if (reply.includes("[WELLBEING_FLAG]")) { reply = reply.replace("[WELLBEING_FLAG]","").trim(); setShowWellbeing(true); }
      setMessages([...next, { role:"assistant", content:reply }]);
    } catch { setMessages([...next, { role:"assistant", content:"Connection issue. Please try again." }]); }
    finally { setLoading(false); }
  };

  const renderMsg = (msg, i) => {
    const isUser = msg.role === "user";
    let body = msg.content, sources = [];
    if (!isUser) { const m = msg.content.match(/(\[.+?\][\s]*)+$/s); if (m) { body = msg.content.slice(0,m.index).trim(); sources = m[0].trim().split("\n").filter(Boolean); } }
    return (
      <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:isUser?"flex-end":"flex-start", marginBottom:18 }}>
        {!isUser && (
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7 }}>
            <div style={{ width:28, height:28, borderRadius:"50%", background:C.grad,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:11, fontWeight:700, color:"#fff" }}>H</div>
            <span style={{ fontSize:11, color:C.textSoft, fontFamily:"system-ui", fontWeight:600 }}>HerInsights AI</span>
            <span style={{ fontSize:9, color:C.sage, background:C.sageBg, borderRadius:10,
              padding:"2px 8px", fontFamily:"system-ui", fontWeight:600 }}>✓ Verified</span>
          </div>
        )}
        <div style={{ maxWidth:"88%", background:isUser?C.rose:C.surface,
          border:`1px solid ${isUser?"transparent":C.border}`,
          borderRadius:isUser?"18px 18px 4px 18px":"4px 18px 18px 18px", padding:"13px 16px" }}>
          <div style={{ fontSize:13.5, lineHeight:1.75, color:isUser?"#fff":C.text,
            fontFamily:isUser?"system-ui":"Georgia, serif", whiteSpace:"pre-wrap" }}>{body}</div>
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

  // Hour of day greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  // Derived
  const homeFeed    = byTag(feedItems);
  const communityItems = (() => {
    const reels   = byTag(reelItems);
    const threads = byTag(threadItems);
    const out = [];
    let ri=0, ti=0;
    while (ri < reels.length || ti < threads.length) {
      if (ri < reels.length)   out.push({ _type:"post",   data:reels[ri++] });
      if (ri < reels.length)   out.push({ _type:"post",   data:reels[ri++] });
      if (ti < threads.length) out.push({ _type:"thread", data:threads[ti++] });
    }
    return out;
  })();

  return (
    <div style={{ fontFamily:"Georgia, 'Times New Roman', serif", background:C.bg, height:"100vh",
      width:"100%", maxWidth:420, margin:"0 auto", position:"relative", overflow:"hidden",
      display:"flex", flexDirection:"column" }}>

      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

        {/* ══════════════════ HOME ══════════════════ */}
        {tab === "home" && (
          <div style={{ flex:1, overflowY:"auto", scrollbarWidth:"none" }}>
            {/* Warm hero */}
            <div style={{ background:C.gradSoft, padding:"28px 20px 24px", borderBottom:`1px solid ${C.border}` }}>
              <div style={{ fontSize:22, fontWeight:700, color:C.text, letterSpacing:"-0.02em", marginBottom:2 }}>
                Her<span style={{ color:C.rose }}>Insights</span>
              </div>
              <div style={{ fontSize:26, fontWeight:300, color:C.text, lineHeight:1.25,
                marginTop:14, letterSpacing:"-0.02em" }}>
                {greeting} 🌿
              </div>
              <div style={{ fontSize:14, color:C.textSoft, fontFamily:"system-ui",
                marginTop:6, lineHeight:1.6 }}>
                Your personal health research, curated to what matters to you.
              </div>
            </div>

            {/* Topic pills — only on Home */}
            <div style={{ padding:"18px 20px 10px" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                <div style={{ fontSize:11, fontWeight:600, color:C.muted, fontFamily:"system-ui", letterSpacing:"0.08em" }}>
                  YOUR TOPICS
                </div>
                <button onClick={() => setShowTagManager(true)}
                  style={{ background:"none", border:"none", fontSize:12, color:C.rose,
                    fontFamily:"system-ui", fontWeight:600, cursor:"pointer", padding:0 }}>
                  Edit
                </button>
              </div>
              {activeTags.length === 0 ? (
                <button onClick={() => setShowTagManager(true)}
                  style={{ width:"100%", padding:"14px 18px", background:C.surface, border:`1.5px dashed ${C.border}`,
                    borderRadius:16, color:C.muted, fontSize:13, fontFamily:"system-ui",
                    cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:20 }}>＋</span>
                  <span>Add health topics to personalise your feed</span>
                </button>
              ) : (
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {activeTags.map(t => (
                    <div key={t.id} style={{ display:"inline-flex", alignItems:"center",
                      padding:"6px 7px 6px 13px", borderRadius:20,
                      background:t.color+"16", border:`1.5px solid ${t.color}40` }}>
                      <span style={{ fontSize:12, fontWeight:700, color:t.color, fontFamily:"system-ui" }}>{t.label}</span>
                      <button onClick={() => toggleTag(t.id)}
                        style={{ background:"none", border:"none", cursor:"pointer",
                          marginLeft:4, padding:"0 5px", color:t.color,
                          fontSize:15, fontWeight:300, lineHeight:1, opacity:0.65 }}
                        aria-label={`Remove ${t.label}`}>×</button>
                    </div>
                  ))}
                  <button onClick={() => setShowTagManager(true)}
                    style={{ width:32, height:32, borderRadius:"50%", background:C.surface2,
                      border:`1.5px solid ${C.border}`, color:C.rose, fontSize:18,
                      cursor:"pointer", display:"flex", alignItems:"center",
                      justifyContent:"center", flexShrink:0 }}>+</button>
                </div>
              )}
            </div>

            {/* Research feed */}
            <div style={{ padding:"6px 20px 32px" }}>
              {activeTags.length === 0 || homeFeed.length === 0 ? (
                <div style={{ textAlign:"center", padding:"32px 0" }}>
                  <div style={{ fontSize:36, marginBottom:12 }}>🌿</div>
                  <div style={{ fontSize:16, fontWeight:600, color:C.text, marginBottom:8 }}>Your feed is waiting</div>
                  <div style={{ fontSize:13, color:C.muted, fontFamily:"system-ui", lineHeight:1.65, marginBottom:20 }}>
                    Add health topics above to see relevant peer-reviewed research here.
                  </div>
                  <button onClick={() => setShowTagManager(true)}
                    style={{ padding:"11px 24px", background:C.grad, border:"none", borderRadius:20,
                      color:"#fff", fontSize:13, fontWeight:700, fontFamily:"system-ui", cursor:"pointer" }}>
                    Choose your topics
                  </button>
                </div>
              ) : (
                homeFeed.map((item, i) => (
                  <div key={item.id}>
                    <div style={{ paddingTop:14, cursor:"pointer" }}
                      onMouseEnter={e => e.currentTarget.style.opacity="0.85"}
                      onMouseLeave={e => e.currentTarget.style.opacity="1"}>
                      <div style={{ display:"flex", gap:13, alignItems:"flex-start" }}>
                        <div style={{ width:46, height:46, borderRadius:14, background:item.tagColor+"18",
                          display:"flex", alignItems:"center", justifyContent:"center",
                          fontSize:20, flexShrink:0 }}>{item.sourceIcon}</div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:5 }}>
                            <span style={{ fontSize:10, fontWeight:700, color:item.tagColor,
                              fontFamily:"system-ui", letterSpacing:"0.05em" }}>{item.tag.toUpperCase()}</span>
                            <span style={{ fontSize:10, color:C.muted, fontFamily:"system-ui" }}>· {item.year}</span>
                          </div>
                          <div style={{ fontSize:15, fontWeight:700, lineHeight:1.38,
                            color:C.text, marginBottom:6, letterSpacing:"-0.01em" }}>{item.title}</div>
                          <div style={{ fontSize:12.5, color:C.textSoft, lineHeight:1.65,
                            fontFamily:"system-ui", marginBottom:10, display:"-webkit-box",
                            WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{item.summary}</div>
                          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                            <span style={{ fontSize:11, color:C.sage, fontFamily:"system-ui", fontWeight:600 }}>✓ {item.citations.toLocaleString()} citations</span>
                            <span style={{ fontSize:11, color:C.muted, fontFamily:"system-ui" }}>{item.readTime}</span>
                            <a href="#" onClick={e => e.stopPropagation()}
                              style={{ marginLeft:"auto", fontSize:11, color:C.rose, fontFamily:"system-ui",
                                fontWeight:600, textDecoration:"none",
                                display:"flex", alignItems:"center", gap:3 }}>
                              <span style={{ fontSize:9 }}>↗</span> {item.source.split(" ").slice(0,2).join(" ")}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {i < homeFeed.length - 1 && <div style={{ height:1, background:C.border, marginTop:14 }} />}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ══════════════════ SEARCH ══════════════════ */}
        {tab === "search" && (
          <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
            {/* Bold search hero */}
            <div style={{ background:C.gradSoft, padding:"22px 20px 18px",
              borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
              <div style={{ fontSize:13, fontWeight:700, color:C.rose, fontFamily:"system-ui",
                letterSpacing:"0.08em", marginBottom:4 }}>RESEARCH SEARCH</div>
              <div style={{ fontSize:20, fontWeight:700, color:C.text, letterSpacing:"-0.02em",
                marginBottom:14, lineHeight:1.2 }}>
                Search 50 million<br/>peer-reviewed papers
              </div>
              <div style={{ display:"flex", gap:10, alignItems:"center", background:C.surface,
                borderRadius:20, padding:"12px 16px", border:`1.5px solid ${C.border}`,
                boxShadow:"0 2px 16px rgba(196,133,122,0.10)" }}>
                <span style={{ fontSize:16, opacity:0.4 }}>🔍</span>
                <input type="text" placeholder="e.g. PCOS insulin resistance, HRT timing…" value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                  onKeyDown={e => { if (e.key==="Enter" && searchQ.trim()) send(searchQ); }}
                  style={{ flex:1, background:"none", border:"none", outline:"none",
                    color:C.text, fontSize:14, fontFamily:"system-ui" }} />
                {searchQ.trim() && (
                  <button onClick={() => send(searchQ)}
                    style={{ width:34, height:34, borderRadius:"50%", background:C.grad, border:"none",
                      color:"#fff", fontSize:15, cursor:"pointer", display:"flex",
                      alignItems:"center", justifyContent:"center", flexShrink:0 }}>↑</button>
                )}
              </div>
              {/* Source logos */}
              <div style={{ display:"flex", gap:6, marginTop:10, flexWrap:"wrap" }}>
                {["PubMed","Cochrane","NEJM","Lancet","JAMA","WHO"].map(s => (
                  <span key={s} style={{ fontSize:10, color:C.sage, fontFamily:"system-ui",
                    fontWeight:600, background:C.sageBg, borderRadius:10,
                    padding:"3px 9px" }}>✓ {s}</span>
                ))}
              </div>
            </div>

            {messages.length === 0 ? (
              <div style={{ flex:1, overflowY:"auto", padding:"20px 20px 28px", scrollbarWidth:"none" }}>
                <div style={{ fontSize:10, color:C.muted, fontFamily:"system-ui", letterSpacing:"0.08em",
                  marginBottom:12, fontWeight:600 }}>TRY ASKING</div>
                <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
                  {[
                    "What are the latest PCOS treatment options in 2024?",
                    "How does endometriosis affect fertility outcomes?",
                    "What does research say about perimenopause symptoms?",
                    "Evidence-based approaches to managing PMDD?",
                  ].map((q, i) => (
                    <button key={i} onClick={() => send(q)}
                      style={{ textAlign:"left", padding:"12px 16px", background:C.surface,
                        border:`1px solid ${C.border}`, borderRadius:14, cursor:"pointer",
                        color:C.textSoft, fontSize:13, fontFamily:"system-ui", lineHeight:1.4,
                        display:"flex", alignItems:"center", gap:10 }}>
                      <span style={{ color:C.rose, fontSize:14, flexShrink:0 }}>→</span>{q}
                    </button>
                  ))}
                </div>

                {/* Recent research preview */}
                <div style={{ fontSize:10, color:C.muted, fontFamily:"system-ui", letterSpacing:"0.08em",
                  marginBottom:12, fontWeight:600 }}>LATEST RESEARCH</div>
                {feedItems.slice(0,3).map((r, i) => (
                  <div key={r.id}>
                    <div style={{ display:"flex", gap:12, alignItems:"flex-start", padding:"12px 0", cursor:"pointer" }}>
                      <div style={{ width:42, height:42, borderRadius:12, background:r.tagColor+"18",
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:18, flexShrink:0 }}>{r.sourceIcon}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13.5, fontWeight:600, color:C.text,
                          lineHeight:1.4, marginBottom:5 }}>{r.title}</div>
                        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                          <span style={{ fontSize:10, color:C.sage, fontFamily:"system-ui", fontWeight:600 }}>✓ {r.citations.toLocaleString()}</span>
                          <span style={{ fontSize:10, color:C.muted, fontFamily:"system-ui" }}>{r.source.split(" ").slice(0,2).join(" ")} · {r.year}</span>
                          <a href="#" style={{ marginLeft:"auto", fontSize:10, color:C.rose,
                            fontFamily:"system-ui", fontWeight:600, textDecoration:"none" }}>↗</a>
                        </div>
                      </div>
                    </div>
                    {i < 2 && <div style={{ height:1, background:C.border }} />}
                  </div>
                ))}

                <div style={{ marginTop:20, padding:"12px 16px", borderRadius:14,
                  background:C.sandBg, border:`1px solid ${C.sand}40` }}>
                  <span style={{ fontSize:11, color:C.sand, fontFamily:"system-ui", fontWeight:700 }}>⚠ </span>
                  <span style={{ fontSize:11, color:C.muted, fontFamily:"system-ui" }}>
                    Research summaries only. Always consult a qualified healthcare provider.
                  </span>
                </div>
              </div>
            ) : (
              <div style={{ flex:1, overflowY:"auto", padding:"16px 16px 8px", scrollbarWidth:"none" }}>
                {messages.map(renderMsg)}
                {loading && (
                  <div style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:16 }}>
                    <div style={{ width:28, height:28, borderRadius:"50%", background:C.grad,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:11, fontWeight:700, color:"#fff", flexShrink:0 }}>H</div>
                    <div style={{ background:C.surface, border:`1px solid ${C.border}`,
                      borderRadius:"4px 18px 18px 18px", padding:"13px 16px" }}>
                      <div style={{ display:"flex", gap:5 }}>
                        {[0,1,2].map(j => <div key={j} style={{ width:6, height:6, borderRadius:"50%",
                          background:C.rose, animation:`pulse 1.2s ease-in-out ${j*0.2}s infinite` }} />)}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={endRef} />
              </div>
            )}
          </div>
        )}

        {/* ══════════════════ COMMUNITY ══════════════════ */}
        {tab === "community" && (
          <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
            {expandedThread ? (
              <ThreadDetail t={expandedThread} onBack={() => setExpandedThread(null)} />
            ) : (
              <>
                {/* Community header */}
                <div style={{ padding:"18px 20px 14px", background:C.surface,
                  borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div>
                      <div style={{ fontSize:20, fontWeight:700, color:C.text, letterSpacing:"-0.02em" }}>Community</div>
                      <div style={{ fontSize:11, color:C.muted, fontFamily:"system-ui", marginTop:2 }}>
                        Real experiences · Research grounded
                      </div>
                    </div>
                    <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                      <button onClick={() => setShowGuidelines(true)}
                        style={{ background:"transparent", border:"none", color:C.muted,
                          fontSize:19, cursor:"pointer", padding:"4px" }} aria-label="Guidelines">🤝</button>
                      <button style={{ background:C.grad, border:"none", borderRadius:20,
                        padding:"8px 16px", color:"#fff", fontSize:12, cursor:"pointer",
                        fontFamily:"system-ui", fontWeight:700 }}>+ Post</button>
                    </div>
                  </div>
                </div>

                {/* Feed */}
                <div style={{ flex:1, overflowY:"auto", scrollbarWidth:"none", paddingTop:8 }}>
                  {communityItems.length === 0 ? (
                    <div style={{ textAlign:"center", padding:"48px 32px" }}>
                      <div style={{ fontSize:36, marginBottom:12 }}>🌱</div>
                      <div style={{ fontSize:16, fontWeight:600, color:C.text, marginBottom:8 }}>No posts yet</div>
                      <div style={{ fontSize:13, color:C.muted, fontFamily:"system-ui", lineHeight:1.65, marginBottom:20 }}>
                        Add topics on the Home tab to see community posts and discussions.
                      </div>
                      <button onClick={() => goTab("home")}
                        style={{ padding:"11px 24px", background:C.grad, border:"none", borderRadius:20,
                          color:"#fff", fontSize:13, fontWeight:700, fontFamily:"system-ui", cursor:"pointer" }}>
                        Go to Home
                      </button>
                    </div>
                  ) : (
                    <div style={{ paddingBottom:24 }}>
                      {communityItems.map((item, idx) => (
                        item._type === "post"
                          ? <div key={"p"+item.data.id+idx} style={{ marginBottom:14 }}>
                              <PostCard item={item.data} />
                            </div>
                          : <div key={"t"+item.data.id+idx} style={{ padding:"0 4px" }}>
                              <ThreadCard t={item.data} onOpen={setExpandedThread} />
                            </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* ══════════════════ PROFILE ══════════════════ */}
        {tab === "profile" && (
          <div style={{ flex:1, overflowY:"auto", scrollbarWidth:"none" }}>
            {/* Profile hero */}
            <div style={{ background:C.gradSoft, padding:"32px 20px 28px",
              borderBottom:`1px solid ${C.border}`, textAlign:"center" }}>
              <div style={{ width:76, height:76, borderRadius:"50%", background:C.grad,
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:30,
                fontWeight:700, color:"#fff", margin:"0 auto 14px" }}>A</div>
              <div style={{ fontSize:18, fontWeight:700, color:C.text, letterSpacing:"-0.01em" }}>Your Profile</div>
              <div style={{ fontSize:12, color:C.muted, fontFamily:"system-ui", marginTop:4 }}>HerInsights member</div>
            </div>

            <div style={{ padding:"24px 20px 40px" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                <div style={{ fontSize:11, fontWeight:600, color:C.muted, fontFamily:"system-ui", letterSpacing:"0.08em" }}>
                  YOUR HEALTH TOPICS
                </div>
                <button onClick={() => setShowTagManager(true)}
                  style={{ background:"none", border:"none", fontSize:12, color:C.rose,
                    fontFamily:"system-ui", fontWeight:600, cursor:"pointer", padding:0 }}>Manage</button>
              </div>

              {activeTags.length === 0 ? (
                <button onClick={() => setShowTagManager(true)}
                  style={{ width:"100%", padding:"14px 18px", background:C.surface,
                    border:`1.5px dashed ${C.border}`, borderRadius:16, color:C.muted,
                    fontSize:13, fontFamily:"system-ui", cursor:"pointer", textAlign:"left",
                    display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:20 }}>＋</span>
                  <span>Add health topics</span>
                </button>
              ) : (
                <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:4 }}>
                  {activeTags.map(t => (
                    <div key={t.id} style={{ display:"inline-flex", alignItems:"center",
                      borderRadius:20, background:t.color+"16", border:`1.5px solid ${t.color}40`, overflow:"hidden" }}>
                      <span style={{ fontSize:13, fontWeight:700, color:t.color,
                        fontFamily:"system-ui", padding:"8px 8px 8px 14px" }}>{t.label}</span>
                      <button onClick={() => toggleTag(t.id)}
                        style={{ background:"none", border:"none", borderLeft:`1px solid ${t.color}20`,
                          cursor:"pointer", padding:"8px 14px", color:t.color,
                          fontSize:16, lineHeight:1, minHeight:40 }}
                        aria-label={`Remove ${t.label}`}>×</button>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ height:1, background:C.border, margin:"24px 0" }} />

              <div style={{ fontSize:11, fontWeight:600, color:C.muted, fontFamily:"system-ui",
                letterSpacing:"0.08em", marginBottom:14 }}>ABOUT HERINSIGHTS</div>
              <div style={{ fontSize:13, color:C.textSoft, fontFamily:"system-ui", lineHeight:1.8, marginBottom:20 }}>
                HerInsights surfaces peer-reviewed research from PubMed, Cochrane, NEJM, Lancet, JAMA, WHO, and NIH.
                Your Home feed is personalised to your health topics — you are always in control of what you see.
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                <button onClick={() => setShowTagManager(true)}
                  style={{ padding:"13px 18px", background:C.surface, border:`1px solid ${C.border}`,
                    borderRadius:14, color:C.textSoft, fontSize:14, fontFamily:"system-ui",
                    cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:12 }}>
                  <span style={{ fontSize:18 }}>🔖</span> Manage health topics
                </button>
                <button onClick={() => setShowGuidelines(true)}
                  style={{ padding:"13px 18px", background:C.surface, border:`1px solid ${C.border}`,
                    borderRadius:14, color:C.textSoft, fontSize:14, fontFamily:"system-ui",
                    cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:12 }}>
                  <span style={{ fontSize:18 }}>📋</span> Community guidelines
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom Nav ── */}
      <div style={{ background:C.surface, borderTop:`1px solid ${C.border}`, display:"flex",
        flexDirection:"row", alignItems:"stretch", flexShrink:0, zIndex:20,
        paddingBottom:"env(safe-area-inset-bottom,0px)" }}>
        {[
          ["home",      "🌿", "Home"],
          ["search",    "🔍", "Research"],
          ["community", "🫂", "Community"],
          ["profile",   "○",  "Profile"],
        ].map(([id, icon, label]) => {
          const active = tab === id;
          return (
            <button key={id} onClick={() => goTab(id)}
              style={{ flex:1, paddingTop:10, paddingBottom:12, background:"transparent", border:"none",
                borderTop:active ? `2px solid ${C.rose}` : "2px solid transparent",
                cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center",
                gap:3, transition:"all 0.15s", minHeight:56 }}>
              <span style={{ fontSize:id==="profile"?22:20, color:active ? C.rose : C.muted, lineHeight:1 }}>{icon}</span>
              <span style={{ fontSize:10, fontFamily:"system-ui", fontWeight:active ? 700 : 500,
                color:active ? C.rose : C.muted }}>{label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Overlays ── */}
      {showTagManager  && <TagManagerSheet tags={tags} onToggle={toggleTag} onClose={() => setShowTagManager(false)} />}
      {showGuidelines  && <GuidelinesModal onClose={() => setShowGuidelines(false)} />}
      {showWellbeing   && <WellbeingCheck onClose={() => setShowWellbeing(false)} />}

      <style>{`
        @keyframes pulse { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        ::-webkit-scrollbar { display:none; }
        * { box-sizing:border-box; }
      `}</style>
    </div>
  );
}
