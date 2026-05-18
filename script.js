function toggleMenu(){
  const nav = document.getElementById("nav");
  if (nav) nav.classList.toggle("open");
}

/* WEB3FORMS - ALL FORMS */
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

    if (result.success) {
      alert(successMessage || "Thank you. Your information was submitted successfully.");
      window.location.href = "index.html";
    } else {
      alert("There was a problem sending your information. Please try again.");
    }
  } catch (error) {
    alert("Error sending information. Please try again.");
  }
}

function sendInventory(e){
  if (e) e.preventDefault();

  submitToWeb3Forms({
    subject: "Inventory Submission for ESR Exchange",
    form_type: "Upload Inventory",
    name: document.getElementById("name")?.value || "",
    email: document.getElementById("email")?.value || "",
    inventory: document.getElementById("items")?.value || ""
  }, "Thank you. Your inventory was submitted successfully.");
}

function sendBuyerMatch(e){
  if (e) e.preventDefault();

  submitToWeb3Forms({
    subject: "Buyer Match Request",
    form_type: "Buyer Match",
    email: document.getElementById("bm-email")?.value || "",
    items: document.getElementById("bm-items")?.value || ""
  }, "Thank you. Your buyer match request was submitted successfully.");
}

function sendContact(e){
  if (e) e.preventDefault();

  submitToWeb3Forms({
    subject: "ESR Exchange Contact Request",
    form_type: "Contact Form",
    name: document.getElementById("contact-name")?.value || "",
    email: document.getElementById("contact-email")?.value || "",
    message: document.getElementById("contact-message")?.value || ""
  }, "Thank you for your information. We will contact you shortly.");
}

/* EQUIPMENT CATEGORIES */
const ESR_CATEGORIES = [
  {
    id: "servers",
    title: "Servers",
    count: "128 Items",
    desc: "Rack servers, blade servers, towers, GPU servers and enterprise systems.",
    items: [
      "Dell PowerEdge rack servers",
      "HPE ProLiant servers",
      "Lenovo ThinkSystem servers",
      "Supermicro GPU servers",
      "Cisco UCS servers",
      "Blade server chassis",
      "Storage servers",
      "AI compute servers"
    ]
  },
  {
    id: "networking",
    title: "Networking",
    count: "243 Items",
    desc: "Switches, routers, firewalls, modules and enterprise network equipment.",
    items: [
      "Cisco switches",
      "Juniper routers",
      "Arista switches",
      "Firewall appliances",
      "Access points",
      "Line cards",
      "Network modules",
      "Enterprise switch lots"
    ]
  },
  {
    id: "memory",
    title: "Memory / RAM",
    count: "512 Items",
    desc: "DDR3, DDR4, DDR5, ECC registered server memory and bulk RAM lots.",
    items: [
      "DDR4 server RAM",
      "DDR5 server RAM",
      "ECC registered memory",
      "32GB modules",
      "64GB modules",
      "Samsung RAM",
      "SK Hynix RAM",
      "Micron RAM"
    ]
  },
  {
    id: "gpus",
    title: "GPUs / AI Hardware",
    count: "86 Items",
    desc: "GPU cards, AI accelerators, compute cards and GPU servers.",
    items: [
      "NVIDIA A100",
      "NVIDIA H100",
      "RTX GPU cards",
      "AMD GPU cards",
      "AI accelerator cards",
      "PCIe GPUs",
      "SXM modules",
      "GPU servers"
    ]
  },
  {
    id: "storage",
    title: "Storage",
    count: "156 Items",
    desc: "SAN, NAS, DAS, SSDs, HDDs, storage arrays and expansion units.",
    items: [
      "Enterprise SSDs",
      "NVMe drives",
      "Hard drives",
      "Storage arrays",
      "SAN equipment",
      "NAS systems",
      "RAID controllers",
      "Drive caddies"
    ]
  },
  {
    id: "scrap",
    title: "Scrap / Recycling",
    count: "Bulk Lots",
    desc: "Mixed IT scrap, boards, cables, power supplies, telecom scrap and electronic recycling material.",
    items: [
      "Mixed IT scrap",
      "Circuit boards",
      "Cable scrap",
      "Telecom scrap",
      "Server scrap",
      "Power supply scrap",
      "Data center liquidation",
      "Recycling lots"
    ]
  },
  {
    id: "cables",
    title: "Cables & Optics",
    count: "342 Items",
    desc: "DAC, fiber optic, SFP, QSFP, HDMI, power cables and assemblies.",
    items: [
      "QSFP56 cables",
      "QSFP28 cables",
      "SFP modules",
      "Fiber optic cables",
      "DAC cables",
      "AOC cables",
      "InfiniBand cables",
      "Transceivers"
    ]
  },
  {
    id: "processors",
    title: "CPUs / Processors",
    count: "95 Items",
    desc: "Intel Xeon, AMD EPYC, processors and bulk CPU lots.",
    items: [
      "Intel Xeon CPUs",
      "AMD EPYC CPUs",
      "Server processors",
      "CPU trays",
      "Heatsinks",
      "Processor kits",
      "Gold CPUs",
      "Platinum CPUs"
    ]
  },
  {
    id: "drives",
    title: "Drives / Media",
    count: "718 Items",
    desc: "HDDs, SSDs, NVMe, SAS, SATA, tapes and removable media.",
    items: [
      "SAS drives",
      "SATA drives",
      "NVMe drives",
      "Enterprise SSDs",
      "Tape media",
      "Removable media",
      "Server HDD lots",
      "Drive trays"
    ]
  },
  {
    id: "power",
    title: "Power Supplies",
    count: "64 Items",
    desc: "Server PSUs, redundant power supplies and power modules.",
    items: [
      "Dell server PSUs",
      "HPE power supplies",
      "Redundant PSUs",
      "Power modules",
      "PDU equipment",
      "Server fans",
      "Battery modules",
      "Power cables"
    ]
  },
  {
    id: "racks",
    title: "Racks & Accessories",
    count: "210 Items",
    desc: "Racks, rails, brackets, bezels, tools and miscellaneous parts.",
    items: [
      "Server rails",
      "Rack cabinets",
      "Cable managers",
      "Rack shelves",
      "Bezels",
      "Brackets",
      "Mounting kits",
      "Tool lots"
    ]
  },
  {
    id: "telecom",
    title: "Telecom",
    count: "73 Items",
    desc: "VoIP, PBX, gateways, line cards and carrier-grade gear.",
    items: [
      "Telecom boards",
      "PBX systems",
      "VoIP gateways",
      "Carrier equipment",
      "Optical modules",
      "Base station parts",
      "Line cards",
      "Telecom lots"
    ]
  }
];

function categoryImagePath(id){
  const available = [
    "servers",
    "networking",
    "memory",
    "gpus",
    "storage",
    "scrap",
    "cables",
    "processors",
    "drives",
    "power",
    "racks",
    "telecom"
  ];

  if (available.includes(id)) {
    return "assets/real-categories/" + id + ".png";
  }

  return "assets/real-categories/servers.png";
}

function itemImagePath(categoryId, index){
  return "assets/real-categories/" + categoryId + ".png";
}

function addRealCategorySection(){
  let section = document.getElementById("esr-real-categories");

  if (!section) {
    section = document.createElement("section");
    section.id = "esr-real-categories";

    const oldCategories = document.querySelector("#categories");

    if (oldCategories) {
      oldCategories.innerHTML = "";
      oldCategories.appendChild(section);
    } else {
      const main = document.querySelector("main") || document.body;
      main.appendChild(section);
    }
  }

  section.innerHTML = `
    <div class="section-head">
      <h2>Equipment Categories</h2>
      <p>Click any category to view equipment pictures and examples.</p>
    </div>
    <div id="realCatGrid" class="real-cat-grid"></div>
    <div id="realGallery" class="real-gallery" style="display:none;"></div>
  `;

  const grid = document.getElementById("realCatGrid");

  ESR_CATEGORIES.forEach((c) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "real-cat-card";
    card.setAttribute("data-category", c.id);
    card.addEventListener("click", function(){
      openRealCategory(c.id);
    });

    card.innerHTML = `
      <img src="${categoryImagePath(c.id)}" alt="${c.title}" onerror="this.style.display='none'">
      <div class="real-cat-card-body">
        <h3>${c.title}</h3>
        <span>${c.count}</span>
        <p>${c.desc}</p>
      </div>
    `;

    grid.appendChild(card);
  });
}

function openRealCategory(id){
  const c = ESR_CATEGORIES.find((x) => x.id === id);
  const grid = document.getElementById("realCatGrid");
  const gallery = document.getElementById("realGallery");

  if (!c || !grid || !gallery) return;

  grid.style.display = "none";
  gallery.style.display = "block";

  gallery.innerHTML = `
    <button type="button" class="back-btn" onclick="closeRealCategory()">← Back to Categories</button>
    <div class="gallery-header">
      <img src="${categoryImagePath(c.id)}" alt="${c.title}" onerror="this.style.display='none'">
      <div>
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
      </div>
    </div>
    <div class="real-item-grid">
      ${c.items.map((item, index) => `
        <div class="real-item-card">
          <img src="${itemImagePath(c.id, index)}" alt="${item}" onerror="this.style.display='none'">
          <h4>${item}</h4>
        </div>
      `).join("")}
    </div>
  `;

  const section = document.getElementById("esr-real-categories");
  if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeRealCategory(){
  const grid = document.getElementById("realCatGrid");
  const gallery = document.getElementById("realGallery");

  if (grid) grid.style.display = "grid";
  if (gallery) gallery.style.display = "none";

  const section = document.getElementById("esr-real-categories");
  if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.addEventListener("DOMContentLoaded", function(){
  addRealCategorySection();

  const inventoryForm = document.getElementById("inventory-form");
  if (inventoryForm) inventoryForm.addEventListener("submit", sendInventory);

  const buyerForm = document.getElementById("buyer-match-form");
  if (buyerForm) buyerForm.addEventListener("submit", sendBuyerMatch);

  const contactForm = document.getElementById("contact-form");
  if (contactForm) contactForm.addEventListener("submit", sendContact);
});
