import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { CalendarDays, Check, Clock3, Download, Heart, MapPin, Music2, Pause, Play, Send, Volume2, VolumeX } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { weddingConfig as config } from "@/lib/wedding-config";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { CallaLilies, GoldDivider, Hydrangea, VillaIllustration } from "./Ornaments";

const ease = [0.22, 1, 0.36, 1] as const;
type Rsvp = Tables<"wedding_rsvps">;
type Wish = Tables<"wedding_wishes">;

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-10%" });
  const reduce = useReducedMotion();
  return <motion.div ref={ref} className={className} initial={reduce ? false : { opacity: 0, y: 32 }} animate={seen ? { opacity: 1, y: 0 } : {}} transition={{ duration: .9, delay, ease }}>{children}</motion.div>;
}

function getDeviceId() {
  const key = "oe-wedding-device";
  const current = localStorage.getItem(key);
  if (current) return current;
  const next = crypto.randomUUID();
  localStorage.setItem(key, next);
  return next;
}

function Intro({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const open = () => { if (opening) return; setOpening(true); window.setTimeout(onOpen, 1550); };
  return (
    <motion.section className="intro-screen" animate={opening ? { opacity: 0, y: "-8%" } : { opacity: 1 }} transition={{ duration: .8, delay: opening ? .85 : 0 }}>
      <CallaLilies className="intro-floral intro-floral-left" />
      <CallaLilies className="intro-floral intro-floral-right" />
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p className="eyebrow text-gold">حفل زفاف</p>
        <h1 className="script-title mt-3 text-ivory">{config.couple.display}</h1>
        <button type="button" className="envelope-trigger" onClick={open} aria-label="افتح دعوة الزفاف">
          <span className={opening ? "envelope is-open" : "envelope"}>
            <span className="envelope-letter"><span>{config.couple.monogram}</span></span>
            <span className="envelope-back" />
            <span className="envelope-flap" />
            <span className="envelope-front" />
            <span className="seal">{config.couple.monogram}</span>
          </span>
        </button>
        <button type="button" onClick={open} className="tap-open">اضغط لفتح الدعوة</button>
      </div>
    </motion.section>
  );
}

function Hero({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, .25], [0, 70]);
  return (
    <section className="hero-section">
      <motion.div style={{ y }} className="absolute -left-14 -top-8 w-52 text-ivory/70 sm:w-72"><CallaLilies /></motion.div>
      <motion.div style={{ y }} className="absolute -right-14 top-10 w-48 -scale-x-100 text-ivory/70 sm:w-72"><CallaLilies /></motion.div>
      <div className="monogram-badge">{config.couple.monogram}</div>
      <div className="opened-envelope" aria-hidden>
        <div className="hero-letter"><span>احفظوا الموعد</span><strong>{config.couple.display}</strong><small>{config.event.footerDate}</small></div>
        <div className="hero-envelope-back" /><div className="hero-envelope-front" />
      </div>
      <button type="button" className={`record ${playing ? "is-playing" : ""}`} onClick={onToggle} aria-label={playing ? "إيقاف الموسيقى مؤقتاً" : "تشغيل الموسيقى"} title={config.music.src ? undefined : "ستتوفر الموسيقى فور إضافة ملف الأغنية"}>
        <svg className="record-copy" viewBox="0 0 200 200" aria-hidden><defs><path id="recordPath" d="M 30,100 A 70,70 0 1,1 170,100" /></defs><text><textPath href="#recordPath" startOffset="2%">اضغط على الأسطوانة للتشغيل • </textPath></text></svg>
        <span className="record-center">{playing ? <Pause /> : <Play />}</span>
      </button>
      <div className="hero-caption"><span>بكل الحب والفرح</span><h2>نتشرف بدعوتكم</h2><GoldDivider /></div>
    </section>
  );
}

function InvitationCard() {
  return <section className="invitation-band"><Reveal className="invitation-card"><div className="lace-frame" /><div className="relative z-10 mx-auto max-w-xl text-center">
    <p className="invocation">بسم الله الرحمن الرحيم</p>
    <GoldDivider className="mx-auto my-7 w-36 text-gold" />
    <blockquote>﴿وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ﴾</blockquote>
    <p className="mt-8 text-sm uppercase tracking-[.22em]">نتشرف</p>
    <p className="mt-4 text-lg">بدعوتكم لحضور حفل زفاف</p>
    <h2 className="couple-script">{config.couple.display}</h2>
    <GoldDivider className="mx-auto my-5 w-48 text-gold" />
    <div className="invitation-facts"><p><CalendarDays />{config.event.dateLong}</p><p><MapPin />{config.venue.name}</p><p className="max-w-sm"><span className="icon-spacer" />{config.venue.address}</p><p><Clock3 />{config.event.time}</p></div>
  </div></Reveal></section>;
}

function Countdown() {
  const target = useMemo(() => new Date(config.event.iso).getTime(), []);
  const [now, setNow] = useState(target);
  useEffect(() => { setNow(Date.now()); const id = window.setInterval(() => setNow(Date.now()), 1000); return () => window.clearInterval(id); }, []);
  const remaining = Math.max(0, target - now);
  const values = [Math.floor(remaining / 86400000), Math.floor(remaining / 3600000) % 24, Math.floor(remaining / 60000) % 60, Math.floor(remaining / 1000) % 60];
  const labels = ["يوم", "ساعة", "دقيقة", "ثانية"];
  const eastern = (value: number) => String(value).padStart(2, "0").replace(/[0-9]/g, digit => "٠١٢٣٤٥٦٧٨٩"[Number(digit)]);
  const downloadIcs = () => {
    const body = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Osama & Eman//Wedding//EN\r\nBEGIN:VEVENT\r\nUID:osama-eman-wedding-20261008\r\nDTSTAMP:20260923T091400Z\r\nDTSTART:20261008T170000Z\r\nDTEND:20261008T210000Z\r\nSUMMARY:Osama & Eman's Wedding\r\nLOCATION:${config.venue.name} - ${config.venue.address}\r\nDESCRIPTION:Celebrate the wedding of Osama & Eman\r\nEND:VEVENT\r\nEND:VCALENDAR`;
    const url = URL.createObjectURL(new Blob([body], { type: "text/calendar" })); const a = document.createElement("a"); a.href = url; a.download = "osama-eman-wedding.ics"; a.click(); URL.revokeObjectURL(url);
  };
  return <section className="countdown-section"><Reveal><p className="eyebrow text-gold">موعدنا اقترب</p><h2 className="section-title">باقي على فرحتنا</h2>{remaining === 0 ? <p className="just-married">تم الزفاف بحمد الله <Heart fill="currentColor" /></p> : <div className="countdown-grid">{values.map((value, i) => <div key={labels[i]} className="countdown-cell"><strong>{eastern(value)}</strong><span>{labels[i]}</span></div>)}</div>}<div className="mt-9 flex flex-wrap justify-center gap-3"><Button asChild className="wedding-button"><a href={config.calendar.google} target="_blank" rel="noreferrer"><CalendarDays />أضف إلى Google</a></Button><Button variant="outline" className="wedding-button-outline" onClick={downloadIcs}><Download />تحميل الموعد</Button></div></Reveal></section>;
}

const timeline = [
  { label: "التاريخ", value: config.event.dateShort, icon: CalendarDays },
  { label: "المكان", value: config.venue.name, icon: MapPin },
  { label: "الموعد", value: config.event.timeShort, icon: Heart },
];
function التفاصيل() {
  return <section className="details-section"><Hydrangea className="absolute -left-12 top-10 w-56 text-ivory/40"/><CallaLilies className="absolute -right-12 bottom-0 w-48 -scale-x-100 text-ivory/35"/><Reveal><p className="eyebrow text-gold">ليلة العمر</p><h2 className="section-title text-ivory">التفاصيل</h2></Reveal><div className="timeline">{timeline.map(({ label,value,icon: Icon }, i)=><Reveal key={label} delay={i*.12} className="timeline-item"><span className="timeline-dot"><Icon /></span><div><p>{label}</p><strong>{value}</strong></div></Reveal>)}</div></section>;
}

function Venue() {
  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(config.venue.name + ", " + config.venue.address)}&output=embed`;
  return <section className="venue-section"><Reveal className="venue-card"><div className="venue-copy"><p className="eyebrow text-gold">مكان الحفل</p><h2>{config.venue.name}</h2><p>{config.venue.address}</p><Button asChild className="wedding-button mt-7"><a href={config.venue.mapUrl} target="_blank" rel="noreferrer"><MapPin />افتح الموقع على الخريطة</a></Button></div><div className="villa-frame"><VillaIllustration /></div></Reveal><Reveal className="map-frame"><iframe src={mapEmbed} title={`خريطة الوصول إلى ${config.venue.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></Reveal></section>;
}

function Guestbook() {
  const [dialog, setDialog] = useState<"rsvp"|"wish"|null>(null);
  const [rsvps, setRsvps] = useState<Rsvp[]>([]); const [wishes, setWishes] = useState<Wish[]>([]);
  const [attending, setسيحضر] = useState("yes"); const [busy, setBusy] = useState(false); const [notice, setNotice] = useState("");
  const load = useCallback(async () => {
    const [r,w] = await Promise.all([supabase.from("wedding_rsvps").select("*").order("created_at",{ascending:false}), supabase.from("wedding_wishes").select("*").order("created_at",{ascending:false})]);
    if (r.data) setRsvps(r.data); if (w.data) setWishes(w.data);
  }, []);
  useEffect(() => { void load(); const channel = supabase.channel("wedding-live").on("postgres_changes",{event:"INSERT",schema:"public",table:"wedding_rsvps"},()=>void load()).on("postgres_changes",{event:"INSERT",schema:"public",table:"wedding_wishes"},()=>void load()).subscribe(); return ()=>{void supabase.removeChannel(channel)}; }, [load]);
  const submitRsvp = async (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setBusy(true); setNotice(""); const data=new FormData(e.currentTarget); const name=String(data.get("name")??"").trim().slice(0,80); const guests=Number(data.get("guests")??1); if(localStorage.getItem("oe-rsvp-sent")){setNotice("تم إرسال تأكيد حضور من هذا الجهاز من قبل.");setBusy(false);return} const {error}=await supabase.from("wedding_rsvps").insert({name,attending:attending==="yes",guest_count:attending==="yes"?Math.min(Math.max(guests,1),10):0,device_id:getDeviceId()}); if(error){setNotice(error.code==="23505"?"تم إرسال تأكيد حضور من هذا الجهاز من قبل.":"تعذر حفظ ردك، حاول مرة أخرى.")}else{localStorage.setItem("oe-rsvp-sent","1");setNotice("شكراً لتأكيد حضورك، في انتظارك.");(e.target as HTMLFormElement).reset();void load()} setBusy(false); };
  const submitWish = async (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setBusy(true); setNotice(""); const data=new FormData(e.currentTarget); const name=String(data.get("name")??"").trim().slice(0,80); const message=String(data.get("message")??"").trim().slice(0,500); if(localStorage.getItem("oe-wish-sent")){setNotice("تم إرسال تهنئة من هذا الجهاز من قبل.");setBusy(false);return} const {error}=await supabase.from("wedding_wishes").insert({name,message,device_id:getDeviceId()}); if(error){setNotice(error.code==="23505"?"تم إرسال تهنئة من هذا الجهاز من قبل.":"تعذر إرسال التهنئة، حاول مرة أخرى.")}else{localStorage.setItem("oe-wish-sent","1");setNotice("شكراً لك، أضفنا تهنئتك الجميلة.");(e.target as HTMLFormElement).reset();void load()} setBusy(false); };
  return <section className="guestbook-section"><Hydrangea className="absolute -right-10 -top-10 w-52 text-olive/30"/><Reveal className="guestbook-frame"><p className="eyebrow text-taupe">شاركونا فرحتنا</p><h2 className="section-title">وجودكم يسعدنا</h2><p className="mx-auto mt-3 max-w-md text-taupe">أكدوا حضوركم أو اتركوا لنا كلمة جميلة تبقى ذكرى في بداية حكايتنا.</p><div className="guest-actions"><Button className="rsvp-button" onClick={()=>{setNotice("");setDialog("rsvp")}}><span className="bird">⌁</span>تأكيد الحضور</Button><Button className="wish-button" onClick={()=>{setNotice("");setDialog("wish")}}><Heart /><span>شاركونا تهانيكم<small>اضغط هنا</small></span></Button></div>{wishes.length>0&&<div className="wish-preview"><p className="eyebrow text-taupe">تهاني الأحباب</p><div className="wish-grid">{wishes.slice(0,3).map(w=><motion.article initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} key={w.id}><Heart /><p>“{w.message}”</p><span>— {w.name}</span></motion.article>)}</div></div>}</Reveal>
  <Dialog open={dialog!==null} onOpenChange={o=>{if(!o)setDialog(null)}}><DialogContent className="guest-dialog"><DialogHeader><DialogTitle>{dialog==="rsvp"?"تأكيد الحضور":"شاركونا تهانيكم"}</DialogTitle><DialogDescription>{dialog==="rsvp"?"يسعدنا معرفة إن كنتم ستشاركوننا فرحتنا.":"اكتبوا لـ Osama & Eman كلمات من القلب."}</DialogDescription></DialogHeader>{dialog==="rsvp"?<><form onإرسال={submitRsvp} className="guest-form"><Label htmlFor="rsvp-name">الاسم</Label><Input id="rsvp-name" name="name" required maxLength={80} placeholder="اكتب اسمك"/><RadioGroup value={attending} onValueChange={setسيحضر} className="my-2"><Label className="radio-row"><RadioGroupItem value="yes"/>نعم، سأحضر إن شاء الله</Label><Label className="radio-row"><RadioGroupItem value="no"/>للأسف لن أستطيع الحضور</Label></RadioGroup>{attending==="yes"&&<><Label htmlFor="guests">عدد الأفراد</Label><Input id="guests" name="guests" type="number" min={1} max={10} defaultValue={1}/></>}<Button disabled={busy} className="wedding-button mt-2" type="submit"><Send />{busy?"جارٍ الإرسال…":"إرسال"}</Button></form><div className="responses"><h3>قائمة الحضور <span>{rsvps.length}</span></h3><div className="response-grid">{rsvps.map(r=><article key={r.id}><strong>{r.name}</strong><small className={r.attending?"attending":"not-attending"}>{r.attending?<><Check/>سيحضر</>:"لن يحضر"}</small></article>)}</div></div></>:<><form onإرسال={submitWish} className="guest-form"><Label htmlFor="wish-name">الاسم</Label><Input id="wish-name" name="name" required maxLength={80} placeholder="اكتب اسمك"/><Label htmlFor="message">التهنئة</Label><Textarea id="message" name="message" required minLength={2} maxLength={500} rows={4} placeholder="اكتب تهنئتك"/><Button disabled={busy} className="wedding-button mt-2" type="submit"><Send />{busy?"جارٍ النشر…":"إرسال التهنئة"}</Button></form><div className="responses"><h3>تهاني الأحباب <span>{wishes.length}</span></h3><div className="response-grid wishes-scroll">{wishes.map(w=><article key={w.id}><p>“{w.message}”</p><strong>— {w.name}</strong></article>)}</div></div></>}{notice&&<p className="form-notice" role="status">{notice}</p>}<Button variant="ghost" className="back-button" onClick={()=>setDialog(null)}>العودة للدعوة ←</Button></DialogContent></Dialog>
  </section>;
}

export function WeddingInvitation() {
  const [opened,setOpened]=useState(false); const [playing,setPlaying]=useState(false); const [muted,setMuted]=useState(false); const audio=useRef<HTMLAudioElement>(null); const wasPlaying=useRef(false);
  useEffect(()=>{const stored=localStorage.getItem("oe-wedding-muted")==="true";setMuted(stored)},[]);
  const start=()=>{setOpened(true); if(config.music.src&&audio.current){audio.current.volume=0; void audio.current.play().then(()=>{setPlaying(true); let v=0; const fade=window.setInterval(()=>{v=Math.min(1,v+.08);if(audio.current)audio.current.volume=v;if(v>=1)clearInterval(fade)},80)}).catch(()=>setPlaying(false))}};
  const toggle=()=>{if(!config.music.src||!audio.current)return;if(playing){audio.current.pause();setPlaying(false)}else{void audio.current.play();setPlaying(true)}};
  const toggleMute=()=>{const next=!muted;setMuted(next);localStorage.setItem("oe-wedding-muted",String(next));if(audio.current)audio.current.muted=next};
  useEffect(()=>{const visibility=()=>{if(document.hidden){wasPlaying.current=playing;if(playing){audio.current?.pause();setPlaying(false)}}else if(wasPlaying.current&&audio.current){void audio.current.play();setPlaying(true);wasPlaying.current=false}};document.addEventListener("visibilitychange",visibility);return()=>document.removeEventListener("visibilitychange",visibility)},[playing]);
  return <main className="wedding-page">{config.music.src&&<audio ref={audio} src={config.music.src} loop muted={muted}/>} {!opened?<Intro onOpen={start}/>:<motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}><div className="ambient" aria-hidden>{Array.from({length:14}).map((_,i)=><span key={i} style={{left:`${(i*37)%100}%`,animationDelay:`${i*.7}s`,animationDuration:`${7+i%5}s`}}/>)}</div><Button size="icon" className="music-fab" onClick={toggleMute} aria-label={muted?"تشغيل صوت الموسيقى":"كتم الموسيقى"} title={muted?"تشغيل صوت الموسيقى":"كتم الموسيقى"}>{muted?<VolumeX/>:playing?<Volume2/>:<Music2/>}</Button><Hero playing={playing} onToggle={toggle}/><InvitationCard/><Countdown/><التفاصيل/><Venue/><Guestbook/><footer><div className="footer-monogram">{config.couple.monogram}</div><p>بانتظاركم لتكتمل فرحتنا</p><span>{config.event.footerDate}</span><GoldDivider /></footer></motion.div>}</main>;
}
