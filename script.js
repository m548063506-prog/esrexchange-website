function toggleMenu() {
  const nav = document.getElementById("nav");
  if (nav) nav.classList.toggle("open");
}

/* WEB3FORMS - ALL FORMS */
const WEB3FORMS_ACCESS_KEY = "fef15f69-56fd-4a20-8ece-3a903fd0de75";

async function submitToWeb3Forms(payload, successMessage) {
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

function sendInventory(e) {
  if (e) e.preventDefault();

  submitToWeb3Forms({
    subject: "Inventory Submission for ESR Exchange",
    form_type: "Upload Inventory",
    company: document.getElementById("company")?.value || "",
    name: document.getElementById("name")?.value || "",
    email: document.getElementById("email")?.value || "",
    inventory: document.getElementById("items")?.value || ""
  }, "Thank you. Your inventory was submitted successfully.");
}

function sendBuyerMatch(e) {
  if (e) e.preventDefault();

  submitToWeb3Forms({
    subject: "Buyer Match Request",
    form_type: "Buyer Match",
    company: document.getElementById("bm-company")?.value || "",
    email: document.getElementById("bm-email")?.value || "",
    items: document.getElementById("bm-items")?.value || ""
  }, "Thank you. Your buyer match request was submitted successfully.");
}

function sendContact(e) {
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
    image: "servers.png",
    title: "Servers",
    count: "128 Items",
    desc: "Rack servers, blade servers, towers, GPU servers and enterprise systems.",
    items: [
      "Dell PowerEdge Rack Servers",
      "HPE ProLiant Servers",
      "Lenovo ThinkSystem Servers",
      "Supermicro Servers",
      "Cisco UCS Servers",
      "Blade Server Chassis",
      "AI Compute Servers",
      "Data Center Server Lots"
    ]
  },
  {
    id: "networking",
    image: "networking.png",
    title: "Networking",
    count: "243 Items",
    desc: "Switches, routers, firewalls, modules and enterprise network equipment.",
    items: [
      "Cisco Switches",
      "Juniper Routers",
      "Arista Switches",
      "Firewall Appliances",
      "Access Points",
      "Line Cards",
      "Network Modules",
      "Enterprise Network Lots"
    ]
  },
  {
    id: "memory",
    image: "memory.png",
    title: "Memory / RAM",
    count: "512 Items",
    desc: "DDR3, DDR4, DDR5, ECC registered server memory and bulk RAM lots.",
    items: [
      "DDR4 Server RAM",
      "DDR5 Server RAM",
      "ECC Registered Memory",
      "32GB Modules",
      "64GB Modules",
      "Samsung RAM",
      "SK Hynix RAM",
      "Micron RAM"
    ]
  },
  {
    id: "gpus",
    image: "gpus.png",
    title: "GPUs / AI Hardware",
    count: "86 Items",
    desc: "GPU cards, AI accelerators, compute cards and GPU servers.",
    items: [
      "NVIDIA A100",
      "NVIDIA H100",
      "RTX GPU Cards",
      "AMD GPU Cards",
      "AI Accelerator Cards",
      "PCIe GPUs",
      "SXM Modules",
      "GPU Servers"
    ]
  },
  {
    id: "storage",
    image: "storage.png",
    title: "Storage",
    count: "156 Items",
    desc: "SAN, NAS, DAS, SSDs, HDDs, storage arrays and expansion units.",
    items: [
      "Enterprise SSDs",
      "NVMe Drives",
      "Hard Drives",
      "Storage Arrays",
      "SAN Equipment",
      "NAS Systems",
      "RAID Controllers",
      "Drive Caddies"
    ]
  },
  {
    id: "scrap",
    image: "blade.png",
    title: "Electronic Scrap",
    count: "Bulk Lots",
    desc: "Mixed IT scrap, boards, cables, power supplies, telecom scrap and recycling material.",
    items: [
      "Mixed IT Scrap",
      "Circuit Boards",
      "Cable Scrap",
      "Telecom Scrap",
      "Server Scrap",
      "Power Supply Scrap",
      "Data Center Liquidation",
      "Recycling Lots"
    ]
  },
  {
    id: "cables",
    image: "cables.png",
    title: "Cables & Optics",
    count: "342 Items",
    desc: "DAC, fiber optic, SFP, QSFP, HDMI, power cables and assemblies.",
    items: [
      "QSFP56 Cables",
      "QSFP28 Cables",
      "SFP Modules",
      "Fiber Optic Cables",
      "DAC Cables",
      "AOC Cables",
      "InfiniBand Cables",
      "Transceivers"
    ]
  },
  {
    id: "processors",
    image: "processors.png",
    title: "CPUs / Processors",
    count: "95 Items",
    desc: "Intel Xeon, AMD EPYC, processors and bulk CPU lots.",
    items: [
      "Intel Xeon CPUs",
      "AMD EPYC CPUs",
      "Server Processors",
      "CPU Trays",
      "Heatsinks",
      "Processor Kits",
      "Gold CPUs",
      "Platinum CPUs"
    ]
  },
  {
    id: "drives",
    image: "drives.png",
    title: "Drives / Media",
    count: "718 Items",
    desc: "HDDs, SSDs, NVMe, SAS, SATA, tapes and removable media.",
    items: [
      "SAS Drives",
      "SATA Drives",
      "NVMe Drives",
      "Enterprise SSDs",
      "Tape Media",
      "Removable Media",
      "Server HDD Lots",
      "Drive Trays"
    ]
  },
  {
    id: "power",
    image: "power.png",
    title: "Power Supplies",
    count: "64 Items",
    desc: "Server PSUs, redundant power supplies and power modules.",
    items: [
      "Dell Server PSUs",
      "HPE Power Supplies",
      "Redundant PSUs",
      "Power Modules",
      "PDU Equipment",
      "Server Fans",
      "Battery Modules",
      "Power Cables"
    ]
  },
  {
    id: "racks",
    image: "racks.png",
    title: "Racks & Accessories",
    count: "210 Items",
    desc: "Racks, rails, brackets, bezels, tools and miscellaneous parts.",
    items: [
      "Server Rails",
      "Rack Cabinets",
      "Cable Managers",
      "Rack Shelves",
      "Bezels",
      "Brackets",
      "Mounting Kits",
      "Tool Lots"
    ]
  },
  {
    id: "telecom",
    image: "telecom.png",
    title: "Telecom",
    count: "73 Items",
    desc: "VoIP, PBX, gateways, line cards and carrier-grade gear.",
    items: [
      "Telecom Boards",
      "PBX Systems",
      "VoIP Gateways",
      "Carrier Equipment",
      "Optical Modules",
      "Base Station Parts",
      "Line Cards",
      "Telecom Lots"
    ]
  }
];

function imagePath(fileName) {
  return "assets/real-categories/" + fileName;
}

function injectCategoryStyles() {
  if (document.getElementById("esr-category-styles")) return;

  const style = document.createElement("style");
  style.id = "esr-category-styles";
  style.textContent = `
    #esr-real-categories { width: 100%; }
    #esr-real-categories .section-head { margin-bottom: 24px; }
    #esr-real-categories .section-head p { color: #405054; font-size: 18px; }
    .real-cat-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 18px;
      margin-top: 24px;
    }
    .real-cat-card {
      border: 1px solid #d8cdbb;
      background: #ffffff;
      border-radius: 22px;
      overflow: hidden;
      cursor: pointer;
      text-align: left;
      box-shadow: 0 14px 35px rgba(0,0,0,.08);
      transition: transform .2s ease, box-shadow .2s ease;
      padding: 0;
      font: inherit;
      color: inherit;
    }
    .real-cat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 45px rgba(0,0,0,.14);
    }
    .real-cat-card img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      display: block;
      background: #e8e1d2;
    }
    .real-cat-card-body { padding: 18px; }
    .real-cat-card h3 { margin: 0 0 8px; font-size: 21px; }
    .real-cat-card span {
      display: inline-block;
      background: #06796e;
      color: white;
      border-radius: 999px;
      padding: 6px 10px;
      font-size: 12px;
      font-weight: 800;
      margin-bottom: 10px;
    }
    .real-cat-card p { margin: 0; color: #405054; line-height: 1.4; }
    .real-gallery { margin-top: 20px; }
    .back-btn {
      background: #06796e;
      color: #fff;
      border: 0;
      border-radius: 10px;
      padding: 12px 16px;
      font-weight: 800;
      cursor: pointer;
      margin-bottom: 20px;
    }
    .gallery-header {
      display: grid;
      grid-template-columns: 260px 1fr;
      gap: 24px;
      align-items: center;
      background: #fff;
      border: 1px solid #d8cdbb;
      border-radius: 24px;
      padding: 22px;
      margin-bottom: 22px;
    }
    .gallery-header img {
      width: 100%;
      height: 170px;
      object-fit: cover;
      border-radius: 18px;
      background: #e8e1d2;
    }
    .gallery-header h3 { margin: 0 0 10px; font-size: 34px; }
    .gallery-header p { margin: 0; color: #405054; font-size: 18px; line-height: 1.4; }
    .real-item-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
      gap: 16px;
    }
    .real-item-card {
      background: #fff;
      border: 1px solid #d8cdbb;
      border-radius: 18px;
      overflow: hidden;
      box-shadow: 0 10px 26px rgba(0,0,0,.08);
    }
    .real-item-card img {
      width: 100%;
      height: 130px;
      object-fit: cover;
      display: block;
      background: #e8e1d2;
    }
    .real-item-card h4 {
      margin: 0;
      padding: 14px;
      font-size: 16px;
    }
    @media(max-width:800px){
      .gallery-header { grid-template-columns: 1fr; }
      .gallery-header h3 { font-size: 28px; }
    }
  `;
  document.head.appendChild(style);
}

function addRealCategorySection() {
  injectCategoryStyles();

  const oldCategories = document.getElementById("categories");
  if (!oldCategories) return;

  oldCategories.innerHTML = `
    <div id="esr-real-categories">
      <div class="section-head">
        <h2>Equipment Categories</h2>
        <p>Click any category to view equipment pictures and examples.</p>
      </div>
      <div id="realCatGrid" class="real-cat-grid"></div>
      <div id="realGallery" class="real-gallery" style="display:none;"></div>
    </div>
  `;

  const grid = document.getElementById("realCatGrid");
  if (!grid) return;

  ESR_CATEGORIES.forEach(function(c) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "real-cat-card";
    card.onclick = function() {
      openRealCategory(c.id);
    };

    card.innerHTML = `
      <img src="${imagePath(c.image)}" alt="${c.title}">
      <div class="real-cat-card-body">
        <h3>${c.title}</h3>
        <span>${c.count}</span>
        <p>${c.desc}</p>
      </div>
    `;

    grid.appendChild(card);
  });
}

function openRealCategory(id) {
  const c = ESR_CATEGORIES.find(function(x) { return x.id === id; });
  const grid = document.getElementById("realCatGrid");
  const gallery = document.getElementById("realGallery");

  if (!c || !grid || !gallery) {
    const categories = document.getElementById("categories");
    if (categories) categories.scrollIntoView({ behavior: "smooth" });
    return;
  }

  grid.style.display = "none";
  gallery.style.display = "block";

  gallery.innerHTML = `
    <button type="button" class="back-btn" onclick="closeRealCategory()">← Back to Categories</button>
    <div class="gallery-header">
      <img src="${imagePath(c.image)}" alt="${c.title}">
      <div>
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
      </div>
    </div>
    <div class="real-item-grid">
      ${c.items.map(function(item) {
        return `
          <div class="real-item-card">
            <img src="${imagePath(c.image)}" alt="${item}">
            <h4>${item}</h4>
          </div>
        `;
      }).join("")}
    </div>
  `;

  const section = document.getElementById("categories");
  if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeRealCategory() {
  const grid = document.getElementById("realCatGrid");
  const gallery = document.getElementById("realGallery");

  if (grid) grid.style.display = "grid";
  if (gallery) {
    gallery.style.display = "none";
    gallery.innerHTML = "";
  }

  const section = document.getElementById("categories");
  if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.addEventListener("DOMContentLoaded", function() {
  addRealCategorySection();

  const inventoryForm = document.querySelector("#upload form");
  if (inventoryForm) inventoryForm.addEventListener("submit", sendInventory);

  const buyerForm = document.querySelector("#buyer-match form");
  if (buyerForm) buyerForm.addEventListener("submit", sendBuyerMatch);

  const contactForm = document.querySelector("#contact form");
  if (contactForm) contactForm.addEventListener("submit", sendContact);
});
