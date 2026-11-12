const P=[
{t:"Fraksi / Gang Di GTA V Roleplay",y:2026,c:"Web",d:"Info tentang gang tersebut",s:["Figma","React","TypeScript"],a:"#2B50E6",b:"#FFD25A",sh:"circle",p:"Identity / Beberapa info tentang fraksi atau gang tersebut",r:["Identity","Petinggi","Anggota"]},
{t:"Kaos Buatan Sendiri",y:2024,c:"Sistem desain",d:"Desain hasil buatan tangan sendiri",s:["IbisPaintX","Pinterest","Pixellab"],a:"#0E8F7A",b:"#E7F5F0",sh:"grid",p:"Membangun desain sendiri sehingga menampilkan desain yang sederhan.",r:["Sablon, Kaos"]},
]
const $=s=>document.querySelector(s);
const cats=["Semua",...new Set(P.map(p=>p.c))];
let cat="Semua",cur=null;

/* proyek */
function art(el,p){
  const g={
    circle:`radial-gradient(circle at 70% 30%,${p.a} 0 28%,transparent 29%),radial-gradient(circle at 25% 75%,${p.a}55 0 18%,transparent 19%)`,
    grid:`repeating-linear-gradient(90deg,${p.a} 0 14px,transparent 14px 44px),repeating-linear-gradient(0deg,${p.a}33 0 14px,transparent 14px 44px)`,
    bars:`linear-gradient(${p.a},${p.a}) 12% 100%/16% 40% no-repeat,linear-gradient(${p.a}AA,${p.a}AA) 36% 100%/16% 65% no-repeat,linear-gradient(${p.a}77,${p.a}77) 60% 100%/16% 52% no-repeat,linear-gradient(${p.a}CC,${p.a}CC) 84% 100%/16% 82% no-repeat`
  }[p.sh];
  el.style.background=g+","+p.b;
}
function show(p){
  cur=p;art($("#art"),p);
  $("#pt").textContent=p.t;
  $("#pd").textContent=p.d+" · "+p.y;
  document.querySelectorAll(".list button").forEach(b=>b.classList.toggle("active",b.dataset.t===p.t));
}
function render(){
  const items=P.filter(p=>cat==="Semua"||p.c===cat);
  const ul=$("#list");ul.innerHTML="";
  if(!items.length){ul.innerHTML='<li class="empty">Belum ada proyek di kategori ini.</li>';return}
  items.forEach(p=>{
    const li=document.createElement("li"),b=document.createElement("button");
    b.dataset.t=p.t;b.type="button";
    b.innerHTML=`<h3>${p.t}</h3><span class="yr">${p.y}</span><span class="tag">${p.c} – ${p.d}</span>`;
    b.addEventListener("mouseenter",()=>show(p));
    b.addEventListener("focus",()=>show(p));
    b.addEventListener("click",()=>open(p));
    li.appendChild(b);ul.appendChild(li);
  });
  show(items[0]);
}
function chips(){
  const f=$("#filters");
  cats.forEach(c=>{
    const b=document.createElement("button");
    b.className="chip";b.type="button";b.textContent=c;
    b.setAttribute("aria-pressed",c===cat);
    b.onclick=()=>{cat=c;f.querySelectorAll(".chip").forEach(x=>x.setAttribute("aria-pressed",x===b));render()};
    f.appendChild(b);
  });
}
function open(p){
  art($("#dart"),p);
  $("#dt").textContent=p.t;
  $("#dp").textContent=p.p;
  $("#ds").innerHTML=p.s.map(x=>`<span>${x}</span>`).join("");
  $("#dl").innerHTML=p.r.map(x=>`<li>${x}</li>`).join("");
  $("#dlg").showModal();
}
$("#close").onclick=()=>$("#dlg").close();
$("#dlg").addEventListener("click",e=>{if(e.target===e.currentTarget)e.currentTarget.close()});
chips();render();

/* keahlian */
const S={
  "Desain":[["Riset dan uji kegunaan",90],["Desain antarmuka",95],["Sistem desain",88]],
  "Pengembangan":[["HTML dan CSS",96],["JavaScript dan TypeScript",85],["React dan Vue",82]],
  "Kolaborasi":[["Memimpin tim",80],["Presentasi ke klien",86],["Mentoring junior",78]]
};
$("#skills").innerHTML=Object.entries(S).map(([k,v])=>`<div><h3>${k}</h3>${v.map(([n,l])=>`<div class="bar"><label><span>${n}</span><span>${l}%</span></label><div class="track" role="img" aria-label="${n} ${l} persen"><div class="fill" data-w="${l}"></div></div></div>`).join("")}</div>`).join("");
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){
    e.target.querySelectorAll(".fill").forEach(f=>f.style.width=f.dataset.w+"%");
    io.unobserve(e.target);
  }
}),{threshold:.3});
io.observe($("#skills"));

/* teks peran yang berganti */
const roles=["antarmuka","produk digital","sistem desain","situs web"];let ri=0;
if(!matchMedia("(prefers-reduced-motion:reduce)").matches)
  setInterval(()=>{ri=(ri+1)%roles.length;$("#role").textContent=roles[ri]},2400);

/* menu aktif saat scroll */
const links=[...document.querySelectorAll("#menu a")];
const so=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting)links.forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+e.target.id));
}),{rootMargin:"-40% 0px -55% 0px"});
document.querySelectorAll("main section[id]").forEach(s=>so.observe(s));

/* tema terang/gelap */
const root=document.documentElement;
try{const t=localStorage.getItem("theme");if(t)root.dataset.theme=t}catch(e){}
$("#theme").onclick=()=>{
  const dark=root.dataset.theme?root.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;
  root.dataset.theme=dark?"light":"dark";
  try{localStorage.setItem("theme",root.dataset.theme)}catch(e){}
};

/* salin email */
$("#copy").onclick=async()=>{
  const t=$("#mail").textContent,s=$("#copyStatus");
  try{await navigator.clipboard.writeText(t);s.textContent="Email disalin."}
  catch(e){s.textContent="Salin manual: "+t}
};

/* formulir kontak */
const rules={
  n:v=>v.trim().length<2&&"Isi nama Anda, minimal 2 huruf.",
  e:v=>!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)&&"Masukkan email yang valid, misalnya nama@contoh.com.",
  m:v=>v.trim().length<10&&"Tulis pesan minimal 10 karakter."
};
function check(id){
  const el=document.getElementById(id),msg=rules[id](el.value);
  el.setAttribute("aria-invalid",!!msg);
  document.querySelector(`.err[data-for="${id}"]`).textContent=msg||"";
  return !msg;
}
Object.keys(rules).forEach(id=>document.getElementById(id).addEventListener("blur",()=>check(id)));
$("#form").addEventListener("submit",e=>{
  e.preventDefault();
  const ok=Object.keys(rules).map(check).every(Boolean),s=$("#formStatus");
  if(!ok){s.textContent="Periksa kolom yang ditandai.";return}
  const n=$("#n").value.trim(),m=$("#m").value.trim(),em=$("#e").value.trim();
  s.textContent="Membuka aplikasi email Anda dengan pesan yang sudah terisi.";
  location.href=`mailto:halo@rizkydewaramadhanu.id?subject=${encodeURIComponent("Halo dari "+n)}&body=${encodeURIComponent(m+"\n\n"+n+" ("+em+")")}`;
});