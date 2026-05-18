function toggleMenu(){
  const nav = document.getElementById('nav');
  if(nav) nav.classList.toggle('open');
}

const WEB3FORMS_ACCESS_KEY = "fef15f69-56fd-4a20-8ece-3a903fd0de75";

async function submitToWeb3Forms(payload, successMessage){
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        ...payload
      })
    });

    const result = await response.json();

    if(result.success){
      alert(successMessage || "Thank you. Your information was submitted successfully.");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } else {
      alert("There was a problem sending your information. Please try again.");
    }
  } catch(error){
    alert("Error sending information. Please try again.");
  }
}

function sendInventory(e){
  e.preventDefault();

  const nameValue = document.getElementById("name") ? document.getElementById("name").value : "";
  const emailValue = document.getElementById("email") ? document.getElementById("email").value : "";
  const itemsValue = document.getElementById("items") ? document.getElementById("items").value : "";

  submitToWeb3Forms({
    subject: "Inventory Submission for ESR Exchange",
    form_type: "Upload Inventory",
    name: nameValue,
    email: emailValue,
    inventory: itemsValue
  }, "Thank you. Your inventory was submitted successfully.");
}

function sendBuyerMatch(e){
  e.preventDefault();

  const emailValue = document.getElementById("bm-email") ? document.getElementById("bm-email").value : "";
  const itemsValue = document.getElementById("bm-items") ? document.getElementById("bm-items").value : "";

  submitToWeb3Forms({
    subject: "Buyer Match Request",
    form_type: "Buyer Match",
    email: emailValue,
    items: itemsValue
  }, "Thank you. Your buyer match request was submitted successfully.");
}

function sendContact(e){
  e.preventDefault();

  const nameValue = document.getElementById("contact-name") ? document.getElementById("contact-name").value : "";
  const emailValue = document.getElementById("contact-email") ? document.getElementById("contact-email").value : "";
  const messageValue = document.getElementById("contact-message") ? document.getElementById("contact-message").value : "";

  submitToWeb3Forms({
    subject: "ESR Exchange Contact Request",
    form_type: "Contact Form",
    name: nameValue,
    email: emailValue,
    message: messageValue
  }, "Thank you for your information. We will contact you shortly.");
}

/* Equipment category gallery */
const ESR_CATEGORIES = {
  servers: {
    title: "Servers",
    desc: "Rack servers, blade servers, towers, GPU servers and enterprise systems.",
    items: ["Dell PowerEdge Servers", "HPE ProLiant Servers", "Lenovo ThinkSystem", "Supermicro GPU Servers", "Cisco UCS Servers", "Blade Chassis", "Storage Servers", "AI Compute Servers"]
  },
  networking: {
    title: "Networking",
    desc: "Switches, routers, firewalls, modules and enterprise network equipment.",
    items: ["Cisco Switches", "Juniper Equipment", "Arista Switches", "Routers", "Firewalls", "Wireless Access Points", "Line Cards", "Network Modules"]
  },
  memory: {
    title: "Memory",
    desc: "DDR3, DDR4, DDR5, ECC registered server memory and bulk RAM lots.",
    items: ["DDR4 Server RAM", "DDR5 Server RAM", "ECC Registered Memory", "32GB Modules", "64GB Modules", "Samsung RAM", "SK Hynix RAM", "Micron RAM"]
  },
  gpus: {
    title: "GPUs / AI Hardware",
    desc: "GPU cards, AI accelerators, compute cards and GPU servers.",
    items: ["NVIDIA A100", "NVIDIA H100", "RTX GPU Cards", "AMD GPU Cards", "AI Accelerator Cards", "PCIe GPUs", "SXM Modules", "GPU Servers"]
  },
  storage: {
    title: "Storage",
    desc: "SSDs, HDDs, NVMe drives, storage arrays and storage controllers.",
    items: ["Enterprise SSDs", "NVMe Drives", "Hard Drives", "Storage Arrays", "SAN Equipment", "NAS Systems", "RAID Controllers", "Drive Caddies"]
  },
  cables: {
    title: "Cables & Optics",
    desc: "QSFP, SFP, fiber, DAC, AOC, InfiniBand cables and transceivers.",
    items: ["QSFP56 Cables", "QSFP28 Cables", "SFP Modules", "Fiber Optic Cables", "DAC Cables", "AOC Cables", "InfiniBand Cables", "Transceivers"]
  },
  processors: {
    title: "Processors",
    desc: "Intel Xeon, AMD EPYC, CPUs, heatsinks and processor kits.",
    items: ["Intel Xeon CPUs", "AMD EPYC CPUs", "Server Processors", "CPU Trays", "Heatsinks", "Processor Kits", "Gold CPUs", "Platinum CPUs"]
  },
  telecom: {
    title: "Telecom",
    desc: "Telecom boards, optical modules, base-station and carrier equipment.",
    items: ["Telecom Boards", "Base Station Equipment", "Line Cards", "Optical Modules", "Telecom Shelves", "Power Modules", "Network Appliances", "Carrier Equipment"]
  }
};

function makeCategoryImage(title, subtitle){
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#071a35"/><stop offset="100%" stop-color="#164d7c"/></linearGradient></defs>
      <rect width="900" height="600" rx="34" fill="url(#g)"/>
      <circle cx="760" cy="105" r="130" fill="#f5c84c" opacity=".14"/>
      <g transform="translate(255 100)">
        <rect x="0" y="0" width="390" height="65" rx="10" fill="#fff" opacity=".94"/>
        <rect x="0" y="85" width="390" height="65" rx="10" fill="#fff" opacity=".78"/>
        <rect x="0" y="170" width="390" height="65" rx="10" fill="#fff" opacity=".62"/>
        <circle cx="38" cy="33" r="9" fill="#f5c84c"/><circle cx="38" cy="118" r="9" fill="#f5c84c"/><circle cx="38" cy="203" r="9" fill="#f5c84c"/>
        <rect x="260" y="24" width="90" height="18" rx="5" fill="#123c69"/><rect x="260" y="109" width="90" height="18" rx="5" fill="#123c69"/><rect x="260" y="194" width="90" height="18" rx="5" fill="#123c69"/>
      </g>
      <text x="55" y="418" fill="#fff" font-family="Arial" font-size="48" font-weight="800">${title}</text>
      <text x="55" y="465" fill="#dbe7f3" font-family="Arial" font-size="24">${subtitle}</text>
      <text x="55" y="535" fill="#f5c84c" font-family="Arial" font-size="20" font-weight="800">ESR EXCHANGE</text>
    </svg>
  `)}`;
}

function addEquipmentGallery(){
  if(document.getElementById("esr-category-gallery")) return;

  const section = document.createElement("section");
  section.id = "esr-category-gallery";
  section.innerHTML = `
    <style>
      #esr-category-gallery{padding:70px 20px;background:#06172f;color:#fff;}
      #esr-category-gallery .esr-wrap{max-width:1200px;margin:0 auto;}
      #esr-category-gallery h2{text-align:center;font-size:38px;margin:0 0 10px;}
      #esr-category-gallery .sub{text-align:center;opacity:.85;font-size:18px;margin:0 0 34px;}
      .esr-cat-grid,.esr-item-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(235px,1fr));gap:22px;}
      .esr-cat-card,.esr-item{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.13);border-radius:18px;overflow:hidden;box-shadow:0 14px 30px rgba(0,0,0,.22);}
      .esr-cat-card{cursor:pointer;text-align:left;color:#fff;font:inherit;padding:0;transition:.2s;}
      .esr-cat-card:hover{transform:translateY(-4px);}
      .esr-cat-card img,.esr-item img{width:100%;display:block;aspect-ratio:3/2;object-fit:cover;}
      .esr-cat-card h3,.esr-item h4{font-size:21px;margin:16px 16px 8px;}
      .esr-cat-card p{margin:0 16px 18px;opacity:.82;line-height:1.45;}
      .esr-gallery{display:none;}
      .esr-back{border:0;border-radius:999px;padding:12px 18px;font-weight:800;cursor:pointer;margin-bottom:18px;}
      .esr-gallery h3{font-size:34px;margin:0 0 8px;}
      .esr-gallery p{opacity:.85;margin:0 0 25px;}
    </style>
    <div class="esr-wrap">
      <h2>Equipment Categories</h2>
      <p class="sub">Click any category to view more pictures and examples.</p>
      <div class="esr-cat-grid" id="esrCatGrid"></div>
      <div class="esr-gallery" id="esrGallery"></div>
    </div>
  `;

  const target = document.querySelector("#equipment") || document.querySelector("#categories") || document.querySelector("main") || document.body;
  if(target === document.body) document.body.appendChild(section);
  else target.appendChild(section);

  const grid = document.getElementById("esrCatGrid");
  Object.keys(ESR_CATEGORIES).forEach(key => {
    const c = ESR_CATEGORIES[key];
    const card = document.createElement("button");
    card.className = "esr-cat-card";
    card.onclick = () => openEsrCategory(key);
    card.innerHTML = `
      <img src="${makeCategoryImage(c.title, c.desc.substring(0,45))}" alt="${c.title}">
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
    `;
    grid.appendChild(card);
  });
}

function openEsrCategory(key){
  const c = ESR_CATEGORIES[key];
  const grid = document.getElementById("esrCatGrid");
  const gallery = document.getElementById("esrGallery");
  if(!c || !grid || !gallery) return;

  grid.style.display = "none";
  gallery.style.display = "block";
  gallery.innerHTML = `
    <button class="esr-back" onclick="closeEsrCategory()">← Back to Categories</button>
    <h3>${c.title}</h3>
    <p>${c.desc}</p>
    <div class="esr-item-grid">
      ${c.items.map((item, i) => `
        <div class="esr-item">
          <img src="${makeCategoryImage(item, c.title)}" alt="${item}">
          <h4>${item}</h4>
        </div>
      `).join("")}
    </div>
  `;
  document.getElementById("esr-category-gallery").scrollIntoView({behavior:"smooth"});
}

function closeEsrCategory(){
  const grid = document.getElementById("esrCatGrid");
  const gallery = document.getElementById("esrGallery");
  if(grid) grid.style.display = "grid";
  if(gallery) gallery.style.display = "none";
}

document.addEventListener("DOMContentLoaded", addEquipmentGallery);
