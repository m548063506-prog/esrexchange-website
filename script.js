function toggleMenu() {
  var nav = document.getElementById("nav");
  if (nav) nav.classList.toggle("open");
}

var WEB3FORMS_ACCESS_KEY = "fef15f69-56fd-4a20-8ece-3a903fd0de75";

async function submitToWeb3Forms(payload, successMessage) {
  try {
    var response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(Object.assign({
        access_key: WEB3FORMS_ACCESS_KEY
      }, payload))
    });

    var result = await response.json();

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

function sendInventory(e) {
  if (e) e.preventDefault();

  submitToWeb3Forms({
    subject: "Inventory Submission for ESR Exchange",
    form_type: "Upload Inventory",
    company: valueOf("company"),
    name: valueOf("name"),
    email: valueOf("email"),
    inventory: valueOf("items")
  }, "Thank you. Your inventory was submitted successfully.");
}

function sendBuyerMatch(e) {
  if (e) e.preventDefault();

  submitToWeb3Forms({
    subject: "Buyer Match Request",
    form_type: "Buyer Match",
    company: valueOf("bm-company"),
    email: valueOf("bm-email"),
    items: valueOf("bm-items")
  }, "Thank you. Your buyer match request was submitted successfully.");
}

function sendContact(e) {
  if (e) e.preventDefault();

  submitToWeb3Forms({
    subject: "ESR Exchange Contact Request",
    form_type: "Contact Form",
    name: valueOf("contact-name"),
    email: valueOf("contact-email"),
    message: valueOf("contact-message")
  }, "Thank you for your information. We will contact you shortly.");
}

function valueOf(id) {
  var el = document.getElementById(id);
  return el ? el.value : "";
}

var ESR_CATEGORIES = [
  {
    id: "servers",
    title: "Servers",
    count: "128 Items",
    image: "servers.png",
    desc: "Rack servers, blade servers, towers, GPU servers and enterprise systems.",
    items: ["Dell PowerEdge Rack Servers", "HPE ProLiant Servers", "Lenovo ThinkSystem Servers", "Supermicro Servers", "Cisco UCS Servers", "Blade Server Chassis", "AI Compute Servers", "Data Center Server Lots"]
  },
  {
    id: "networking",
    title: "Networking",
    count: "243 Items",
    image: "networking.png",
    desc: "Switches, routers, firewalls, modules and enterprise network equipment.",
    items: ["Cisco Switches", "Juniper Routers", "Arista Switches", "Firewall Appliances", "Access Points", "Line Cards", "Network Modules", "Enterprise Network Lots"]
  },
  {
    id: "memory",
    title: "Memory / RAM",
    count: "512 Items",
    image: "memory.png",
    desc: "DDR3, DDR4, DDR5, ECC registered server memory and bulk RAM lots.",
    items: ["DDR4 Server RAM", "DDR5 Server RAM", "ECC Registered Memory", "32GB Modules", "64GB Modules", "Samsung RAM", "SK Hynix RAM", "Micron RAM"]
  },
  {
    id: "gpus",
    title: "GPUs / AI Hardware",
    count: "86 Items",
    image: "gpus.png",
    desc: "GPU cards, AI accelerators, compute cards and GPU servers.",
    items: ["NVIDIA A100", "NVIDIA H100", "RTX GPU Cards", "AMD GPU Cards", "AI Accelerator Cards", "PCIe GPUs", "SXM Modules", "GPU Servers"]
  },
  {
    id: "storage",
    title: "Storage",
    count: "156 Items",
    image: "storage.png",
    desc: "SAN, NAS, DAS, SSDs, HDDs, storage arrays and expansion units.",
    items: ["Enterprise SSDs", "NVMe Drives", "Hard Drives", "Storage Arrays", "SAN Equipment", "NAS Systems", "RAID Controllers", "Drive Caddies"]
  },
  {
    id: "scrap",
    title: "Electronic Scrap",
    count: "Bulk Lots",
    image: "servers.png",
    desc: "Mixed IT scrap, boards, cables, power supplies, telecom scrap and electronic recycling material.",
    items: ["Mixed IT Scrap", "Circuit Boards", "Cable Scrap", "Telecom Scrap", "Server Scrap", "Power Supply Scrap", "Data Center Liquidation", "Recycling Lots"]
  },
  {
    id: "cables",
    title: "Cables & Optics",
    count: "342 Items",
    image: "cables.png",
    desc: "DAC, fiber optic, SFP, QSFP, HDMI, power cables and assemblies.",
    items: ["QSFP56 Cables", "QSFP28 Cables", "SFP Modules", "Fiber Optic Cables", "DAC Cables", "AOC Cables", "InfiniBand Cables", "Transceivers"]
  },
  {
    id: "processors",
    title: "CPUs / Processors",
    count: "95 Items",
    image: "processors.png",
    desc: "Intel Xeon, AMD EPYC, processors and bulk CPU lots.",
    items: ["Intel Xeon CPUs", "AMD EPYC CPUs", "Server Processors", "CPU Trays", "Heatsinks", "Processor Kits", "Gold CPUs", "Platinum CPUs"]
  },
  {
    id: "drives",
    title: "Drives / Media",
    count: "718 Items",
    image: "drives.png",
    desc: "HDDs, SSDs, NVMe, SAS, SATA, tapes and removable media.",
    items: ["SAS Drives", "SATA Drives", "NVMe Drives", "Enterprise SSDs", "Tape Media", "Removable Media", "Server HDD Lots", "Drive Trays"]
  },
  {
    id: "power",
    title: "Power Supplies",
    count: "64 Items",
    image: "power.png",
    desc: "Server PSUs, redundant power supplies and power modules.",
    items: ["Dell Server PSUs", "HPE Power Supplies", "Redundant PSUs", "Power Modules", "PDU Equipment", "Server Fans", "Battery Modules", "Power Cables"]
  },
  {
    id: "racks",
    title: "Racks & Accessories",
    count: "210 Items",
    image: "racks.png",
    desc: "Racks, rails, brackets, bezels, tools and miscellaneous parts.",
    items: ["Server Rails", "Rack Cabinets", "Cable Managers", "Rack Shelves", "Bezels", "Brackets", "Mounting Kits", "Tool Lots"]
  },
  {
    id: "telecom",
    title: "Telecom",
    count: "73 Items",
    image: "telecom.png",
    desc: "VoIP, PBX, gateways, line cards and carrier-grade gear.",
    items: ["Telecom Boards", "PBX Systems", "VoIP Gateways", "Carrier Equipment", "Optical Modules", "Base Station Parts", "Line Cards", "Telecom Lots"]
  }
];

function imgPath(file) {
  return "assets/real-categories/" + file;
}

function fallbackSvg(title) {
  var safe = String(title).replace(/&/g, "and").replace(/</g, "").replace(/>/g, "");
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="520"><rect width="100%" height="100%" fill="#dfe9dc"/><rect x="45" y="45" width="810" height="430" rx="28" fill="#ffffff" opacity=".75"/><text x="50%" y="46%" text-anchor="middle" font-family="Arial" font-size="48" font-weight="700" fill="#112223">' + safe + '</text><text x="50%" y="58%" text-anchor="middle" font-family="Arial" font-size="25" fill="#06796e">ESR Exchange Equipment</text></svg>';
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

function makeImg(file, title) {
  var img = document.createElement("img");
  img.src = imgPath(file);
  img.alt = title;
  img.onerror = function () {
    this.onerror = null;
    this.src = fallbackSvg(title);
  };
  return img;
}

function injectCategoryStyles() {
  if (document.getElementById("esr-category-styles")) return;

  var style = document.createElement("style");
  style.id = "esr-category-styles";
  style.textContent =
    "#esr-real-categories{width:100%;}" +
    "#esr-real-categories .section-head{margin-bottom:24px;}" +
    "#esr-real-categories .section-head p{color:#405054;font-size:18px;}" +
    ".real-cat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;margin-top:24px;}" +
    ".real-cat-card{border:1px solid #d8cdbb;background:#fff;border-radius:22px;overflow:hidden;cursor:pointer;text-align:left;box-shadow:0 14px 35px rgba(0,0,0,.08);transition:transform .2s ease,box-shadow .2s ease;padding:0;font:inherit;color:inherit;}" +
    ".real-cat-card:hover{transform:translateY(-4px);box-shadow:0 20px 45px rgba(0,0,0,.14);}" +
    ".real-cat-card img{width:100%;height:150px;object-fit:cover;display:block;background:#e8e1d2;}" +
    ".real-cat-card-body{padding:18px;}" +
    ".real-cat-card h3{margin:0 0 8px;font-size:21px;}" +
    ".real-cat-card span{display:inline-block;background:#06796e;color:#fff;border-radius:999px;padding:6px 10px;font-size:12px;font-weight:800;margin-bottom:10px;}" +
    ".real-cat-card p{margin:0;color:#405054;line-height:1.4;}" +
    ".real-gallery{margin-top:20px;}" +
    ".back-btn{background:#06796e;color:#fff;border:0;border-radius:10px;padding:12px 16px;font-weight:800;cursor:pointer;margin-bottom:20px;}" +
    ".gallery-header{display:grid;grid-template-columns:260px 1fr;gap:24px;align-items:center;background:#fff;border:1px solid #d8cdbb;border-radius:24px;padding:22px;margin-bottom:22px;}" +
    ".gallery-header img{width:100%;height:170px;object-fit:cover;border-radius:18px;background:#e8e1d2;}" +
    ".gallery-header h3{margin:0 0 10px;font-size:34px;}" +
    ".gallery-header p{margin:0;color:#405054;font-size:18px;line-height:1.4;}" +
    ".real-item-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:16px;}" +
    ".real-item-card{background:#fff;border:1px solid #d8cdbb;border-radius:18px;overflow:hidden;box-shadow:0 10px 26px rgba(0,0,0,.08);}" +
    ".real-item-card img{width:100%;height:130px;object-fit:cover;display:block;background:#e8e1d2;}" +
    ".real-item-card h4{margin:0;padding:14px;font-size:16px;}" +
    "@media(max-width:800px){.gallery-header{grid-template-columns:1fr;}.gallery-header h3{font-size:28px;}}";

  document.head.appendChild(style);
}

function addRealCategorySection() {
  injectCategoryStyles();

  var oldCategories = document.getElementById("categories");
  if (!oldCategories) return;

  oldCategories.innerHTML = "";

  var wrap = document.createElement("div");
  wrap.id = "esr-real-categories";

  var head = document.createElement("div");
  head.className = "section-head";

  var h2 = document.createElement("h2");
  h2.textContent = "Equipment Categories";

  var p = document.createElement("p");
  p.textContent = "Click any category to view equipment pictures and examples.";

  head.appendChild(h2);
  head.appendChild(p);

  var grid = document.createElement("div");
  grid.id = "realCatGrid";
  grid.className = "real-cat-grid";

  var gallery = document.createElement("div");
  gallery.id = "realGallery";
  gallery.className = "real-gallery";
  gallery.style.display = "none";

  wrap.appendChild(head);
  wrap.appendChild(grid);
  wrap.appendChild(gallery);
  oldCategories.appendChild(wrap);

  ESR_CATEGORIES.forEach(function (c) {
    var card = document.createElement("button");
    card.type = "button";
    card.className = "real-cat-card";
    card.onclick = function () {
      openRealCategory(c.id);
    };

    var img = makeImg(c.image, c.title);
    var body = document.createElement("div");
    body.className = "real-cat-card-body";

    var title = document.createElement("h3");
    title.textContent = c.title;

    var count = document.createElement("span");
    count.textContent = c.count;

    var desc = document.createElement("p");
    desc.textContent = c.desc;

    body.appendChild(title);
    body.appendChild(count);
    body.appendChild(desc);

    card.appendChild(img);
    card.appendChild(body);
    grid.appendChild(card);
  });
}

function openRealCategory(id) {
  var c = null;
  for (var i = 0; i < ESR_CATEGORIES.length; i++) {
    if (ESR_CATEGORIES[i].id === id) c = ESR_CATEGORIES[i];
  }

  var grid = document.getElementById("realCatGrid");
  var gallery = document.getElementById("realGallery");

  if (!c || !grid || !gallery) {
    var categories = document.getElementById("categories");
    if (categories) categories.scrollIntoView({ behavior: "smooth" });
    return;
  }

  grid.style.display = "none";
  gallery.style.display = "block";
  gallery.innerHTML = "";

  var back = document.createElement("button");
  back.type = "button";
  back.className = "back-btn";
  back.textContent = "← Back to Categories";
  back.onclick = closeRealCategory;

  var header = document.createElement("div");
  header.className = "gallery-header";

  var headerImg = makeImg(c.image, c.title);

  var headerText = document.createElement("div");
  var headerTitle = document.createElement("h3");
  headerTitle.textContent = c.title;
  var headerDesc = document.createElement("p");
  headerDesc.textContent = c.desc;

  headerText.appendChild(headerTitle);
  headerText.appendChild(headerDesc);
  header.appendChild(headerImg);
  header.appendChild(headerText);

  var itemGrid = document.createElement("div");
  itemGrid.className = "real-item-grid";

  c.items.forEach(function (item) {
    var itemCard = document.createElement("div");
    itemCard.className = "real-item-card";

    var itemImg = makeImg(c.image, item);
    var itemTitle = document.createElement("h4");
    itemTitle.textContent = item;

    itemCard.appendChild(itemImg);
    itemCard.appendChild(itemTitle);
    itemGrid.appendChild(itemCard);
  });

  gallery.appendChild(back);
  gallery.appendChild(header);
  gallery.appendChild(itemGrid);

  var section = document.getElementById("categories");
  if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeRealCategory() {
  var grid = document.getElementById("realCatGrid");
  var gallery = document.getElementById("realGallery");

  if (grid) grid.style.display = "grid";
  if (gallery) {
    gallery.style.display = "none";
    gallery.innerHTML = "";
  }

  var section = document.getElementById("categories");
  if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.addEventListener("DOMContentLoaded", function () {
  addRealCategorySection();

  var inventoryForm = document.querySelector("#upload form");
  if (inventoryForm) inventoryForm.addEventListener("submit", sendInventory);

  var buyerForm = document.querySelector("#buyer-match form");
  if (buyerForm) buyerForm.addEventListener("submit", sendBuyerMatch);

  var contactForm = document.querySelector("#contact form");
  if (contactForm) contactForm.addEventListener("submit", sendContact);
});
