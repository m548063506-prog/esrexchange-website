function toggleMenu(){
  const nav = document.getElementById('nav');
  if(nav) nav.classList.toggle('open');
}

const WEB3FORMS_ACCESS_KEY = "fef15f69-56fd-4a20-8ece-3a903fd0de75";

async function submitToWeb3Forms(payload, successMessage){
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {"Content-Type": "application/json", "Accept": "application/json"},
      body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, ...payload })
    });

    const result = await response.json();

    if(result.success){
      alert(successMessage || "Thank you. Your information was submitted successfully.");
      setTimeout(() => { window.location.href = "/"; }, 1500);
    } else {
      alert("There was a problem sending your information. Please try again.");
    }
  } catch(error){
    alert("Error sending information. Please try again.");
  }
}

function sendInventory(e){
  e.preventDefault();
  submitToWeb3Forms({
    subject: "Inventory Submission for ESR Exchange",
    form_type: "Upload Inventory",
    name: document.getElementById("name")?.value || "",
    email: document.getElementById("email")?.value || "",
    inventory: document.getElementById("items")?.value || ""
  }, "Thank you. Your inventory was submitted successfully.");
}

function sendBuyerMatch(e){
  e.preventDefault();
  submitToWeb3Forms({
    subject: "Buyer Match Request",
    form_type: "Buyer Match",
    email: document.getElementById("bm-email")?.value || "",
    items: document.getElementById("bm-items")?.value || ""
  }, "Thank you. Your buyer match request was submitted successfully.");
}

function sendContact(e){
  e.preventDefault();
  submitToWeb3Forms({
    subject: "ESR Exchange Contact Request",
    form_type: "Contact Form",
    name: document.getElementById("contact-name")?.value || "",
    email: document.getElementById("contact-email")?.value || "",
    message: document.getElementById("contact-message")?.value || ""
  }, "Thank you for your information. We will contact you shortly.");
}

/* Real equipment category upgrade */
const ESR_CATEGORIES = [
  {id:"servers", title:"Servers", count:"128 Items", desc:"Rack servers, blade servers, towers, GPU servers and enterprise systems.", items:["Dell PowerEdge rack servers","HPE ProLiant servers","Lenovo ThinkSystem servers","Supermicro GPU servers","Cisco UCS servers","Blade server chassis","Storage servers","AI compute servers"]},
  {id:"networking", title:"Networking", count:"243 Items", desc:"Switches, routers, firewalls, modules and enterprise network equipment.", items:["Cisco switches","Juniper routers","Arista switches","Firewall appliances","Access points","Line cards","Network modules","Enterprise switch lots"]},
  {id:"memory", title:"Memory (RAM)", count:"512 Items", desc:"DDR3, DDR4, DDR5, ECC registered server memory and bulk RAM lots.", items:["DDR4 server RAM","DDR5 server RAM","ECC registered memory","32GB modules","64GB modules","Samsung RAM","SK Hynix RAM","Micron RAM"]},
  {id:"gpus", title:"GPUs / AI Hardware", count:"86 Items", desc:"GPU cards, AI accelerators, compute cards and GPU servers.", items:["NVIDIA A100","NVIDIA H100","RTX GPU cards","AMD GPU cards","AI accelerator cards","PCIe GPUs","SXM modules","GPU servers"]},
  {id:"storage", title:"Storage", count:"156 Items", desc:"SAN, NAS, DAS, SSDs, HDDs, storage arrays and expansion units.", items:["Enterprise SSDs","NVMe drives","Hard drives","Storage arrays","SAN equipment","NAS systems","RAID controllers","Drive caddies"]},
  {id:"cables", title:"Cables & Optics", count:"342 Items", desc:"DAC, fiber optic, SFP, QSFP, HDMI, power cables and assemblies.", items:["QSFP56 cables","QSFP28 cables","SFP modules","Fiber optic cables","DAC cables","AOC cables","InfiniBand cables","Transceivers"]},
  {id:"processors", title:"CPUs / Processors", count:"95 Items", desc:"Intel Xeon, AMD EPYC, processors and bulk CPU lots.", items:["Intel Xeon CPUs","AMD EPYC CPUs","Server processors","CPU trays","Heatsinks","Processor kits","Gold CPUs","Platinum CPUs"]},
  {id:"drives", title:"Drives / Media", count:"718 Items", desc:"HDDs, SSDs, NVMe, SAS, SATA, tapes and removable media.", items:["SAS drives","SATA drives","NVMe drives","Enterprise SSDs","Tape media","Removable media","Server HDD lots","Drive trays"]},
  {id:"power", title:"Power Supplies", count:"64 Items", desc:"Server PSUs, redundant power supplies and power modules.", items:["Dell server PSUs","HPE power supplies","Redundant PSUs","Power modules","PDU equipment","Server fans","Battery modules","Power cables"]},
  {id:"racks", title:"Racks & Accessories", count:"210 Items", desc:"Racks, rails, brackets, bezels, tools and miscellaneous parts.", items:["Server rails","Rack cabinets","Cable managers","Rack shelves","Bezels","Brackets","Mounting kits","Tool lots"]},
  {id:"telecom", title:"Telecom", count:"73 Items", desc:"VoIP, PBX, gateways, line cards and carrier-grade gear.", items:["Telecom boards","PBX systems","VoIP gateways","Carrier equipment","Optical modules","Base station parts","Line cards","Telecom shelves"]},
  {id:"blade", title:"Blade Servers", count:"44 Items", desc:"Blade enclosures, blades, I/O modules and management modules.", items:["Blade enclosures","Server blades","I/O modules","Management modules","Blade power supplies","Blade switches","Chassis fans","Bulk blade lots"]},
  {id:"ups", title:"UPS / Power Protection", count:"36 Items", desc:"UPS systems, batteries, PDU, surge protectors and accessories.", items:["APC UPS units","Battery backups","Rack PDUs","Surge protectors","Battery packs","Power distribution","UPS accessories","Data center power"]},
  {id:"kvm", title:"KVMs / Consoles", count:"28 Items", desc:"KVM switches, console servers, LCD consoles and accessories.", items:["KVM switches","LCD consoles","Console servers","Crash carts","Keyboard drawers","Remote access KVMs","KVM cables","Rack consoles"]},
  {id:"software", title:"Software / Licenses", count:"89 Items", desc:"OS, virtualization, CALs, OEM licenses and software keys.", items:["Windows Server","VMware licenses","Red Hat licenses","Microsoft CALs","OEM software","Virtualization software","Backup software","License keys"]}
];

function addRealCategorySection(){
  if(document.getElementById("esr-real-categories")) return;

  const oldInjected = document.getElementById("esr-category-gallery");
  if(oldInjected) oldInjected.remove();

  const section = document.createElement("section");
  section.id = "esr-real-categories";
  section.innerHTML = `
    <style>
      #esr-real-categories{padding:70px 20px;background:#06172f;color:#fff;}
      #esr-real-categories .wrap{max-width:1500px;margin:0 auto;}
      #esr-real-categories h2{text-align:center;font-size:42px;margin:0 0 8px;font-weight:900;}
      #esr-real-categories .subtitle{text-align:center;font-size:18px;margin:0 0 28px;color:#e5edf6;}
      .real-cat-grid,.real-gallery-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;}
      .real-cat-card,.real-gallery-card{background:#0b1b2d;border:1px solid rgba(255,255,255,.16);border-radius:8px;overflow:hidden;color:#fff;box-shadow:0 12px 28px rgba(0,0,0,.22);}
      .real-cat-card{padding:0;text-align:left;font:inherit;cursor:pointer;transition:.2s;}
      .real-cat-card:hover{transform:translateY(-3px);border-color:#21b36b;}
      .real-cat-card img,.real-gallery-card img{width:100%;height:150px;object-fit:cover;display:block;}
      .real-card-body{padding:14px 14px 18px;}
      .real-card-top{display:flex;justify-content:space-between;align-items:center;gap:10px;}
      .real-card-body h3,.real-gallery-card h4{font-size:22px;margin:0 0 8px;font-weight:800;}
      .real-card-body p{font-size:15px;line-height:1.45;margin:0;color:#d7e2ee;}
      .count{background:#218c53;color:#fff;border-radius:5px;padding:4px 8px;font-size:13px;font-weight:800;white-space:nowrap;}
      .real-gallery{display:none;}
      .real-back{border:0;border-radius:7px;padding:12px 18px;font-weight:800;cursor:pointer;margin:0 0 20px;background:#21b36b;color:#fff;}
      .real-gallery h3{font-size:36px;margin:0 0 7px;}
      .real-gallery p{margin:0 0 24px;color:#d7e2ee;font-size:17px;}
      .real-gallery-card h4{padding:14px;margin:0;font-size:18px;}
      .trust-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-top:28px;border-top:1px solid rgba(255,255,255,.12);padding-top:20px;}
      .trust-box{display:flex;gap:12px;align-items:center;color:#d7e2ee;}
      .trust-icon{width:38px;height:38px;border:2px solid #21b36b;border-radius:50%;display:grid;place-items:center;color:#21b36b;font-weight:900;}
      @media(max-width:650px){#esr-real-categories h2{font-size:32px}.real-cat-card img,.real-gallery-card img{height:135px}}
    </style>
    <div class="wrap">
      <h2>Equipment Categories</h2>
      <p class="subtitle">Click any category to view real equipment pictures and examples.</p>
      <div class="real-cat-grid" id="realCatGrid"></div>
      <div class="real-gallery" id="realGallery"></div>
      <div class="trust-row">
        <div class="trust-box"><div class="trust-icon">✓</div><div><b>Trusted by IT Professionals</b><br>Quality equipment, verified sellers.</div></div>
        <div class="trust-box"><div class="trust-icon">◎</div><div><b>Global Shipping</b><br>Fast and secure delivery worldwide.</div></div>
        <div class="trust-box"><div class="trust-icon">🛡</div><div><b>Secure Transactions</b><br>Safe buyer and seller support.</div></div>
        <div class="trust-box"><div class="trust-icon">↻</div><div><b>Bulk Inventory</b><br>Large quantities available.</div></div>
      </div>
    </div>
  `;

  const oldCategories = document.querySelector("#categories");
  if(oldCategories) {
    oldCategories.innerHTML = "";
    oldCategories.appendChild(section);
  } else {
    const main = document.querySelector("main") || document.body;
    main.appendChild(section);
  }

  const grid = document.getElementById("realCatGrid");
  ESR_CATEGORIES.forEach(c => {
    const card = document.createElement("button");
    card.className = "real-cat-card";
    card.onclick = () => openRealCategory(c.id);
    card.innerHTML = `
      <img src="assets/real-categories/${c.id}.png" alt="${c.title}">
      <div class="real-card-body">
        <div class="real-card-top"><h3>${c.title}</h3><span class="count">${c.count}</span></div>
        <p>${c.desc}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}

function openRealCategory(id){
  const c = ESR_CATEGORIES.find(x => x.id === id);
  const grid = document.getElementById("realCatGrid");
  const gallery = document.getElementById("realGallery");
  if(!c || !grid || !gallery) return;

  grid.style.display = "none";
  gallery.style.display = "block";
  gallery.innerHTML = `
    <button class="real-back" onclick="closeRealCategory()">← Back to Categories</button>
    <h3>${c.title}</h3>
    <p>${c.desc}</p>
    <div class="real-gallery-grid">
      ${c.items.map(item => `
        <div class="real-gallery-card">
          <img src="assets/real-categories/${c.id}.png" alt="${item}">
          <h4>${item}</h4>
        </div>
      `).join("")}
    </div>
  `;
  document.getElementById("esr-real-categories").scrollIntoView({behavior:"smooth"});
}

function closeRealCategory(){
  document.getElementById("realCatGrid").style.display = "grid";
  document.getElementById("realGallery").style.display = "none";
}

document.addEventListener("DOMContentLoaded", addRealCategorySection);
