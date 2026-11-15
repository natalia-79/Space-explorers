// Buildless archive interface. Mission records and illustrations ship with the exhibit.
(() => {
  "use strict";
  const $ = (selector) => document.querySelector(selector);
  const escape = (value) => String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ordered = ["opportunity", "apollo", "voyager", "insight", "lcross"];
  const missions = ordered.map(id => window.missions.find(m => m.id === id));
  const byId = Object.fromEntries(missions.map(m => [m.id, m]));
  const number = (m) => String(ordered.indexOf(m.id) + 1).padStart(2, "0");
  const srcList = m => '<ul class="source-links">' + m.sources.map(([title,url]) => '<li><a href="' + escape(url) + '">' + escape(title) + ' <span aria-hidden="true">↗</span></a></li>').join("") + '</ul>';
  const photoLink = p => '<a href="' + escape(p.url) + '">' + escape(p.title) + ' · ' + escape(p.credit) + '</a>';
  function evidencePhoto(m) {
    const p = window.photos?.[m.id];
    return p ? '<figure class="record-photo"><img loading="eager" src="' + escape(p.file) + '" alt="' + escape(p.caption) + '"><figcaption><span class="d-kicker">NASA image record</span><p>' + escape(p.caption) + '</p>' + photoLink(p) + '</figcaption></figure>' : '';
  }
  const button = (label, active, attr) => '<button type="button" class="filter" ' + attr + ' aria-pressed="' + active + '">' + escape(label) + '</button>';
  const art = m => 'art/' + m.id + '.svg';
  const attr = el => el.closest("[data-open]");
  let trigger = null;
  const dlg = $("#dialog");
  const chapters = ["The mission", "The journey", "The discovery", "The silence", "The legacy"];
  function show(id, opener) {
    const m = byId[id];
    if (!m) return;
    trigger = opener || document.activeElement;
    const story = m.chapters.map((p, i) => '<section class="chapter"><span class="chapter-number">0' + (i+1) + '</span><div><h3>' + (i === 3 && id === "voyager" ? "The continuing signal" : chapters[i]) + '</h3><p>' + escape(p) + '</p></div></section>').join("");
    dlg.innerHTML = '<div class="dialog-head"><span>SPACE EXPLORERS &nbsp;/&nbsp; FILE ' + number(m) + '</span><button class="close" type="button" aria-label="Close mission file">Close ✕</button></div><img class="dialog-art" src="' + art(m) + '" alt="Artist’s interpretation of ' + escape(m.name) + '"><div class="dialog-watermark">SI-generated illustration</div><div class="dialog-body"><div class="d-kicker">' + escape(m.destination) + ' &nbsp;/&nbsp; ' + escape(m.type) + '</div><h2 id="dialog-title">' + escape(m.name) + '</h2><p class="dialog-intro">' + escape(m.teaser) + '</p><aside class="ghost-file"><h3>Explorer facts</h3><dl>' + [["Launch",m.year],["Location",m.location],["Status",m.status]].map(([k,v]) => '<div><dt>'+k+'</dt><dd>'+escape(v)+'</dd></div>').join("") + '</dl></aside>' + story + evidencePhoto(m) + '<aside class="file-message"><span class="d-kicker">The message</span><p>'+escape(m.message)+'</p></aside><h3>NASA mission records</h3>' + srcList(m) + '</div>';
    dlg.setAttribute("aria-labelledby", "dialog-title");
    dlg.showModal();
    dlg.scrollTop = 0;
    document.body.classList.add("file-open");
    dlg.querySelector(".close").focus({preventScroll:true});
  }
  dlg.addEventListener("click", e => {
    if (e.target.closest(".close")) dlg.close();
    else if (e.target === dlg) {
      const box = dlg.getBoundingClientRect();
      if (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) dlg.close();
    }
  });
  dlg.addEventListener("close", () => {
    document.body.classList.remove("file-open");
    if (trigger?.isConnected) trigger.focus({preventScroll:true});
  });
  document.addEventListener("click", e => {
    const el = attr(e.target) || e.target.closest("#featured");
    if (el) { e.preventDefault(); show(el.dataset.open || "opportunity", el); }
  });
  const filters = {
    "All files": () => true, Moon: m => m.destination === "Moon",
    Mars: m => m.destination === "Mars", "Deep Space": m => m.destination === "Deep Space",
    Silent: m => ["opportunity","insight"].includes(m.id),
    Retired: m => m.id === "apollo", "Still traveling": m => m.id === "voyager",
    Impacted: m => m.id === "lcross"
  };
  function archive(filter) {
    const list = missions.filter(filters[filter]);
    $("#filters").querySelectorAll("[data-filter]").forEach(b => b.setAttribute("aria-pressed", b.dataset.filter === filter));
    $("#count").textContent = String(list.length).padStart(2,"0") + (list.length === 1 ? " FILE" : " FILES");
    $("#cards").innerHTML = list.map(m => '<button class="card" type="button" data-open="' + m.id + '" aria-label="Open ' + escape(m.name) + ' mission file"><div class="card-img"><img src="' + art(m) + '" loading="lazy" alt=""><span class="file-id">FILE / ' + number(m) + '</span></div><div class="card-body"><div class="meta">'+escape(m.destination)+' · '+escape(m.year)+' · '+escape(m.type)+'</div><h3>'+escape(m.name)+'</h3><p class="teaser">'+escape(m.teaser)+'</p><div class="card-bottom"><span class="status">'+escape(m.status)+'</span><span class="arrow" aria-hidden="true">↗</span></div></div></button>').join("");
  }
  $("#filters").innerHTML = Object.keys(filters).map(f => button(f, f === "All files", 'data-filter="'+f+'"')).join("");
  $("#filters").addEventListener("click", e => { const b=e.target.closest("[data-filter]"); if(b) archive(b.dataset.filter); });
  $("#count").setAttribute("aria-live", "polite");
  archive("All files");

  // A schematic separates destinations without suggesting measured distances or a live trajectory.
  const stops = [["Moon",115,134,17],["Mars",276,122,25],["Deep Space",445,64,7]];
  const axis = $("#map");
  axis.innerHTML = '<svg class="orbit-chart" viewBox="0 0 510 228" role="group" aria-label="Choose a destination on this schematic, distances not to scale"><defs><pattern id="sg-grid" width="26" height="26" patternUnits="userSpaceOnUse"><path d="M26 0H0V26" fill="none" stroke="#91a6ad" stroke-opacity=".13" stroke-width=".6"/></pattern><radialGradient id="sg-moon" cx=".23" cy=".26" r=".9"><stop stop-color="#e4decf"/><stop offset=".6" stop-color="#8a918c"/><stop offset="1" stop-color="#222d32"/></radialGradient><radialGradient id="sg-mars" cx=".25" cy=".25" r=".85"><stop stop-color="#ffc69a"/><stop offset=".52" stop-color="#b96949"/><stop offset="1" stop-color="#412c2b"/></radialGradient></defs><rect width="510" height="228" fill="url(#sg-grid)"/><g fill="none" stroke="#8d9f9e" stroke-width=".75" opacity=".5"><ellipse cx="-23" cy="179" rx="150" ry="102" transform="rotate(-15 -23 179)"/><ellipse cx="-35" cy="170" rx="335" ry="185" transform="rotate(-12 -35 170)"/><path d="M-5 215Q219 155 485 47" stroke-dasharray="4 6"/></g><text x="20" y="25" class="chart-caption">DESTINATION PLOT</text><text x="20" y="211" class="chart-caption">SCHEMATIC / DISTANCES NOT TO SCALE</text>' + stops.map(([d,x,y,r],i) => '<g class="chart-stop" role="button" tabindex="0" aria-label="Show '+d+' missions" aria-pressed="false" data-stop="'+d+'" transform="translate('+x+' '+y+')"><rect fill="transparent" x="-46" y="-40" width="92" height="90"/><circle class="halo" r="'+(r+9)+'" fill="none" stroke="#efaf78" stroke-dasharray="3 3"/><circle r="'+r+'" fill="'+['url(#sg-moon)','url(#sg-mars)','#e4dbca'][i]+'"/>'+(i === 0 ? '<g fill="#737b73" opacity=".7"><circle cx="-5" cy="-3" r="3.2"/><circle cx="4" cy="5" r="2.5"/><circle cx="1" cy="-9" r="2"/></g>' : i===1 ? '<path d="M-20 -5Q-5 -9 1 -4T21 -6M-13 9Q-5 4 9 9" fill="none" stroke="#99573f" opacity=".7"/>' : '<path d="M-12 0H12M0 -12V12" stroke="#e6dabc"/>') + '<text text-anchor="middle" y="'+(r+24)+'">'+d.toUpperCase()+'</text></g>').join("") + '<text x="375" y="211" class="chart-caption">SI-generated</text></svg>';
  $("#maplist").innerHTML = '<div class="map-controls" aria-label="Destination">'+stops.map(([d])=>button(d,false,'data-stop="'+d+'"')).join("")+'</div><div class="map-results" aria-live="polite"></div>';
  function destination(name) {
    document.querySelectorAll("[data-stop]").forEach(el => el.setAttribute("aria-pressed", el.dataset.stop === name));
    const list = missions.filter(m=>m.destination===name);
    $("#maplist .map-results").innerHTML='<p class="d-kicker">'+list.length+' '+(list.length===1?"file":"files")+' at this destination</p>'+list.map(m=>'<button type="button" class="map-file" data-open="'+m.id+'"><span>'+escape(m.name)+'</span><span aria-hidden="true">↗</span></button>').join("");
  }
  [axis, $("#maplist")].forEach(el=>el.addEventListener("click",e=>{ const stop=e.target.closest("[data-stop]"); if(stop) destination(stop.dataset.stop); }));
  axis.addEventListener("keydown",e=>{if(["Enter"," "].includes(e.key) && e.target.dataset.stop) { e.preventDefault(); destination(e.target.dataset.stop); }});
  destination("Mars");
  const chronology = $("#timeline");
  chronology.innerHTML = '<label class="timeline-select">Mission file <select aria-label="Timeline mission">'+missions.map(m=>'<option value="'+m.id+'">'+escape(m.name)+'</option>').join("")+'<option value="all">All mission events</option></select></label><ol class="events" aria-live="polite"></ol>';
  function drawTimeline(val) {
    const events=(val==="all"?missions:[byId[val]]).flatMap(m=>m.events.map(([date,label])=>({m,date,label})));
    const parse = date => { const t=Date.parse(date); return Number.isFinite(t) ? t : Number((String(date).match(/\d{4}/)||["9999"])[0])*31536000000-62125920000000; };
    events.sort((a,b)=>parse(a.date)-parse(b.date));
    chronology.querySelector(".events").innerHTML=events.map(e=>'<li><span class="event-date">'+escape(e.date)+'</span><div><span class="event-name">'+escape(e.m.name)+'</span><p>'+escape(e.label)+'</p></div></li>').join("");
  }
  chronology.querySelector("select").addEventListener("change", e=>drawTimeline(e.target.value));
  drawTimeline("opportunity");

  const questions = [
    ["Opportunity’s last signal arrived during a dust storm. Why did dark skies matter?", ["Its wheels needed sunlight to grip the sand.","Its solar panels needed sunlight to make electricity.","Its antenna needed a clear view of the Sun."],1,"Dust blocked sunlight from reaching the rover’s solar panels. Without enough electricity, even a working radio cannot call home."],
    ["You want clues about the inside of Mars. Which evidence would you study?", ["Tracks made by a lunar rover","Photographs of the sky from Earth","Marsquake vibrations recorded by InSight"],2,"As quake waves pass through different materials, their speed and path change. That gives scientists clues about layers they cannot see."],
    ["LCROSS hit the Moon on purpose. Where did scientists look for evidence of water?", ["In the cloud of material blasted up by the impact","In ocean waves on the surface","In tire tracks beside the crater"],0,"The impact lifted normally hidden material into sunlight. Instruments studying the cloud found evidence of water ice."],
    ["Which file belongs in a different status category from the silent Mars machines?", ["InSight, a lander on Mars","Opportunity, a rover on Mars","Voyager 1, a probe traveling through interstellar space"],2,"Voyager 1 flew past planets and continued beyond the region dominated by the solar wind. It never landed on the Moon or Mars."]
  ];
  let qi=0, score=0;
  const quiz=$("#quiz");
  function renderQuestion(focus) {
    const q=questions[qi];
    quiz.innerHTML='<div class="quiz-progress">FIELD CHECK &nbsp;/&nbsp; '+String(qi+1).padStart(2,"0")+' OF 04</div><h3 tabindex="-1">'+escape(q[0])+'</h3><div class="quiz-options">'+q[1].map((v,i)=>'<button type="button" class="quiz-choice" data-answer="'+i+'"><span>'+String.fromCharCode(65+i)+'</span>'+escape(v)+'</button>').join("")+'</div><div class="quiz-feedback" role="status"></div>';
    if(focus) quiz.querySelector("h3").focus();
  }
  quiz.addEventListener("click", e=>{
    const b=e.target.closest("button"); if(!b) return;
    if(b.dataset.answer!==undefined && !b.disabled) {
      const q=questions[qi],correct=Number(b.dataset.answer)===q[2];
      if(correct) score++;
      quiz.querySelectorAll(".quiz-choice").forEach((el,i)=>{el.disabled=true;if(i===q[2]){el.classList.add("correct");el.setAttribute("aria-label","Correct answer: "+q[1][i]);}});
      if(!correct) b.classList.add("incorrect");
      quiz.querySelector(".quiz-feedback").innerHTML='<strong>'+(correct?"Correct.":"The evidence points to "+String.fromCharCode(65+q[2])+".")+'</strong> '+escape(q[3]);
      quiz.insertAdjacentHTML("beforeend",'<button class="quiz-action" type="button" data-next>'+(qi===questions.length-1?"See my results":"Next question")+' →</button>');
      quiz.querySelector(".quiz-action").focus({preventScroll:true});
    } else if(b.hasAttribute("data-next")) {
      qi++;
      if(qi<questions.length) renderQuestion(true);
      else { quiz.innerHTML='<div class="quiz-progress">FIELD CHECK / COMPLETE</div><h3 tabindex="-1">You identified '+score+' of 4 clues.</h3><p>Every answer connects an instrument to the evidence it collected. Reopen a mission file to follow a clue back to its source.</p><button class="quiz-action" type="button" data-restart>Try again ↻</button>'; quiz.querySelector("h3").focus(); }
    } else if(b.hasAttribute("data-restart")) { qi=0;score=0;renderQuestion(true); }
  });
  renderQuestion(false);
  $("#sources").innerHTML=missions.map(m=>'<details><summary>'+escape(m.name)+' <span class="src-count">'+String(m.sources.length).padStart(2,"0")+' SOURCES</span></summary>'+srcList(m)+'</details>').join("");
  const credits=$("#photocredits");
  if(credits && window.photos) credits.innerHTML='<h3>NASA image records</h3><ul class="source-links">'+Object.values(window.photos).map(p=>'<li>'+photoLink(p)+'</li>').join("")+'</ul>';
  const sparkleButton = $("#sparkles");
  sparkleButton.addEventListener("click",()=>{ const active=sparkleButton.getAttribute("aria-pressed")!=="true"; sparkleButton.setAttribute("aria-pressed",active); sparkleButton.textContent=active?"✧ Sparkles on":"✧ Sparkles paused"; document.body.classList.toggle("sparkles-paused",!active); });
  const menu=$("#menu"), nav=$("#nav");
  if(menu && nav) {
    const toggle=open=>{menu.setAttribute("aria-expanded",open);nav.classList.toggle("open",open);};
    menu.setAttribute("aria-controls","nav");toggle(false);
    menu.addEventListener("click",()=>toggle(menu.getAttribute("aria-expanded")!=="true"));
    nav.addEventListener("click",e=>{if(e.target.closest("a")) toggle(false);});
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&menu.getAttribute("aria-expanded")==="true"){toggle(false);menu.focus();}});
  }
})();
