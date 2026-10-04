const depts=[["Cardiology","Heart checkups, ECG, echo and cardiac care."],["Pediatrics","Newborn to teen care and vaccinations."],["Gynecology","Maternity, antenatal and women's health."],["Orthopedics","Bones, joints, sports injuries and physio."],["Dentistry","Checkups, root canals, braces and surgery."],["Medicine","General medicine and chronic disease care."],["Radiology","X-ray, ultrasound, CT and MRI."],["Emergency","Round-the-clock trauma and urgent care."]];
const docs=[["Dr. Ayesha Khan","Cardiology","Consultant, 14 yrs"],["Dr. Imran Siddiqui","Cardiology","Professor, 20 yrs"],["Dr. Sana Malik","Pediatrics","Consultant, 9 yrs"],["Dr. Hamza Qureshi","Pediatrics","Specialist, 6 yrs"],["Dr. Fatima Raza","Gynecology","Consultant, 12 yrs"],["Dr. Bilal Ahmed","Orthopedics","Surgeon, 15 yrs"],["Dr. Hina Farooq","Dentistry","Oral surgeon, 8 yrs"],["Dr. Zain Ali","Medicine","Consultant, 11 yrs"],["Dr. Maryam Shah","Radiology","Radiologist, 10 yrs"]];
const $=s=>document.querySelector(s);
$("#deptGrid").innerHTML=depts.map(d=>`<div class="card"><h3>${d[0]}</h3><p>${d[1]}</p></div>`).join("");
let active="All";
const names=["All",...depts.map(d=>d[0]).filter(n=>docs.some(x=>x[1]===n))];
$("#chips").innerHTML=names.map(n=>`<button class="chip${n==="All"?" on":""}" data-d="${n}">${n}</button>`).join("");
function initials(n){return n.replace("Dr. ","").split(" ").map(w=>w[0]).join("")}
function showDocs(){
 const q=$("#q").value.toLowerCase();
 const list=docs.filter(d=>(active==="All"||d[1]===active)&&d[0].toLowerCase().includes(q));
 $("#docGrid").innerHTML=list.map(d=>`<div class="card doc"><div class="av">${initials(d[0])}</div><div><b>${d[0]}</b><small>${d[1]} · ${d[2]}</small></div></div>`).join("");
 $("#none").style.display=list.length?"none":"block";
}
$("#chips").onclick=e=>{const b=e.target.closest(".chip");if(!b)return;active=b.dataset.d;document.querySelectorAll("#chips .chip").forEach(c=>c.classList.toggle("on",c===b));showDocs()};
$("#q").oninput=showDocs;showDocs();
$("#dept").innerHTML='<option value="">Select department</option>'+names.slice(1).map(n=>`<option>${n}</option>`).join("");
function fillDocs(){const d=$("#dept").value;$("#doc").innerHTML='<option value="">Any available doctor</option>'+docs.filter(x=>x[1]===d).map(x=>`<option>${x[0]}</option>`).join("")}
$("#dept").onchange=fillDocs;fillDocs();
const today=new Date().toISOString().split("T")[0];$("#date").min=today;
$("#form").onsubmit=e=>{
 e.preventDefault();let ok=true;
 const chk=(id,bad,msg)=>{const el=$("#"+id),m=el.parentNode.querySelector(".err");m.textContent=bad?msg:"";if(bad)ok=false};
 chk("name",$("#name").value.trim().length<3,"Enter your full name.");
 chk("phone",!/^(03\d{2}-?\d{7})$/.test($("#phone").value.trim()),"Enter a valid number like 0300-1234567.");
 chk("dept",!$("#dept").value,"Choose a department.");
 chk("date",!$("#date").value||$("#date").value<today,"Choose today or a later date.");
 if(!ok)return;
 const box=$("#ok");
 box.style.display="block";
 box.innerHTML=`<b>Appointment requested.</b><br>${$("#name").value}, we will call ${$("#phone").value} to confirm ${$("#dept").value}${$("#doc").value?" with "+$("#doc").value:""} on ${$("#date").value} (${$("#time").value}).`;
 box.scrollIntoView({behavior:"smooth",block:"nearest"});e.target.reset();fillDocs();
};
$("#menu").onclick=()=>{const o=$("#links").classList.toggle("open");$("#menu").setAttribute("aria-expanded",o)};
$("#links").onclick=e=>{if(e.target.tagName==="A")$("#links").classList.remove("open")};
$("#theme").onclick=()=>{const r=document.documentElement,dark=matchMedia("(prefers-color-scheme:dark)").matches;const cur=r.dataset.theme||(dark?"dark":"light");r.dataset.theme=cur==="dark"?"light":"dark"};


(function(){const sp=document.getElementById("splash");let done=false;
function close(){if(done)return;done=true;sp.classList.add("hide");setTimeout(()=>sp.remove(),800)}
sp.onclick=close;setTimeout(close,2800);})();

(function(){const it=document.getElementById("intro");if(!it)return;let d=false;
function go(){if(d)return;d=true;it.classList.add("hide");setTimeout(()=>it.remove(),800)}
document.getElementById("enter").onclick=go;document.getElementById("xbtn").onclick=go;const pb=document.getElementById("popbook");if(pb)pb.onclick=()=>{go();location.hash="#book"};setTimeout(go,10800);})();
