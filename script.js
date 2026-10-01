// ===================== EMAILJS INITIALIZATION =====================
(function() {
  emailjs.init({
    publicKey: "k0zULqG8DbDVDF8rJ",   // Your public key
  });
})();

// ===================== 1. TYPING ANIMATION =====================
const roles = [
  "Business Systems Engineer",
  "Java Developer",
  "Web Creator",
  "Snooker Strategist",
  "Problem Solver"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedRoleSpan = document.getElementById("typed-role");

function typeEffect() {
  if (!typedRoleSpan) return;
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    typedRoleSpan.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedRoleSpan.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }
  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    setTimeout(typeEffect, 2000);
    return;
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeEffect, 500);
    return;
  }
  const speed = isDeleting ? 50 : 100;
  setTimeout(typeEffect, speed);
}
if (typedRoleSpan) typeEffect();

// ===================== 2. DARK/LIGHT MODE TOGGLE =====================
const themeToggle = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme") || "dark";
document.body.setAttribute("data-theme", currentTheme);
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    let theme = document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    themeToggle.innerHTML = theme === "dark" ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  });
  themeToggle.innerHTML = currentTheme === "dark" ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

// ===================== 3. PROJECT VISIT COUNTERS =====================
function initVisitCounters() {
  document.querySelectorAll(".project-link").forEach(link => {
    const projectId = link.getAttribute("data-project-id");
    if (!projectId) return;
    const stored = localStorage.getItem(`visit_${projectId}`);
    const parentCard = link.closest(".card");
    const counterSpan = parentCard?.querySelector(".counter-value");
    if (stored && counterSpan) counterSpan.textContent = stored;
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("data-project-id");
      let count = parseInt(localStorage.getItem(`visit_${id}`) || "0");
      count++;
      localStorage.setItem(`visit_${id}`, count);
      const card = link.closest(".card");
      const span = card?.querySelector(".counter-value");
      if (span) span.textContent = count;
    });
  });
}
initVisitCounters();

// ===================== 4. GITHUB STATS WIDGET =====================
async function fetchGitHubRepos() {
  const repoCountSpan = document.getElementById("github-repo-count");
  if (!repoCountSpan) return;
  const username = "thatodesmond"; // 🔁 CHANGE TO YOUR REAL GITHUB USERNAME
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (response.ok) {
      const data = await response.json();
      repoCountSpan.textContent = data.public_repos ?? "?";
    } else {
      repoCountSpan.textContent = "?";
    }
  } catch {
    repoCountSpan.textContent = "?";
  }
}
fetchGitHubRepos();

// ===================== 5. TOAST NOTIFICATION =====================
function showToast(message, duration = 3000) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast hidden";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, duration);
}

// ===================== EMAILJS CONTACT FORM HANDLER =====================
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const submitBtn = document.getElementById("contact-submit");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Sending...';
    submitBtn.disabled = true;

    const templateParams = {
      user_name: document.getElementById("user_name").value,
      user_email: document.getElementById("user_email").value,
      message: document.getElementById("message").value,
      to_name: "Thato Modjadji",
    };

    emailjs.send("service_gg2w6gp", "template_ti7vg6m", templateParams)
      .then(function(response) {
        showToast("✓ Message sent successfully! I'll reply within 24h.", 4000);
        contactForm.reset();
        const logDiv = document.getElementById("contact-log");
        const entry = document.createElement("div");
        entry.style.background = "#0e1a24";
        entry.style.padding = "10px";
        entry.style.borderRadius = "16px";
        entry.style.marginTop = "8px";
        entry.innerHTML = `<strong><i class="fas fa-check-circle"></i> Message sent to my email</strong>`;
        logDiv.prepend(entry);
      })
      .catch(function(error) {
        console.error("EmailJS error:", error);
        showToast("❌ Failed to send. Please try again later or contact directly via LinkedIn.", 4000);
      })
      .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      });
  });
}

// ===================== OTHER EXISTING FUNCTIONS =====================
function toggleExtraSection(id) {
  const contactSec = document.getElementById('contact');
  const commentSec = document.getElementById('comments');
  if (id === 'contact') {
    contactSec.classList.toggle('hidden-section');
    if (!commentSec.classList.contains('hidden-section')) commentSec.classList.add('hidden-section');
  } else if (id === 'comments') {
    commentSec.classList.toggle('hidden-section');
    if (!contactSec.classList.contains('hidden-section')) contactSec.classList.add('hidden-section');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const contactSec = document.getElementById('contact');
  const commentSec = document.getElementById('comments');
  if (contactSec) contactSec.classList.remove('hidden-section');
  if (commentSec) commentSec.classList.add('hidden-section');
});

let commentCount = 0;
function submitComment(event) {
  event.preventDefault();
  const name = document.getElementById('comment-name').value.trim();
  const text = document.getElementById('comment-text').value.trim();
  if (!name || !text) return;
  const list = document.getElementById('comment-list');
  const countSpan = document.getElementById('comment-count');
  const li = document.createElement('li');
  li.innerHTML = `<i class="fas fa-comment"></i> <strong>${escapeHtml(name)}</strong>: ${escapeHtml(text)}`;
  list.prepend(li);
  commentCount++;
  countSpan.innerText = `📌 Total messages: ${commentCount}`;
  document.getElementById('comment-name').value = '';
  document.getElementById('comment-text').value = '';
}

function openModal(src, title) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const downloadBtn = document.getElementById('modalDownloadBtn');
  modal.style.display = "flex";
  modalImg.src = src;
  downloadBtn.href = src;
  downloadBtn.download = title || "certificate";
}
function closeModal() {
  document.getElementById('imageModal').style.display = "none";
}
window.onclick = function(e) {
  const modal = document.getElementById('imageModal');
  const adminModal = document.getElementById('adminModal');
  if (e.target === modal) closeModal();
  if (e.target === adminModal) closeAdminModal();
};

function escapeHtml(str) {
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// Mobile nav toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle) {
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('show'));
}
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('show'));
});

// Active link highlight
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  const scrollPos = window.scrollY + 150;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

// Show contact section when hero button clicked
const showContactBtn = document.getElementById('showContactBtn');
if (showContactBtn) {
  showContactBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const contactSec = document.getElementById('contact');
    const commentSec = document.getElementById('comments');
    if (contactSec.classList.contains('hidden-section')) contactSec.classList.remove('hidden-section');
    if (!commentSec.classList.contains('hidden-section')) commentSec.classList.add('hidden-section');
    contactSec.scrollIntoView({ behavior: 'smooth' });
  });
}

// ===================== DYNAMIC ITEM ADDER (ADMIN PANEL) =====================
const openAdminBtn = document.getElementById("openAdminBtn");
const adminModal = document.getElementById("adminModal");
const adminForm = document.getElementById("admin-form");

if (openAdminBtn) {
  openAdminBtn.addEventListener("click", () => {
    adminModal.style.display = "flex";
  });
}

function closeAdminModal() {
  adminModal.style.display = "none";
}

window.addEventListener("DOMContentLoaded", () => {
  loadCustomItems();
});

if (adminForm) {
  adminForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const category = document.getElementById("item-category").value;
    const title = document.getElementById("item-title").value.trim();
    const desc = document.getElementById("item-desc").value.trim();
    const link = document.getElementById("item-link").value.trim();
    const imageFileInput = document.getElementById("item-image-file");

    const saveNewItem = (imageSource) => {
      const newItem = { 
        category, 
        title, 
        desc, 
        link: link || imageSource, 
        image: imageSource, 
        id: Date.now() 
      };

      let customItems = JSON.parse(localStorage.getItem("custom_portfolio_items") || "[]");
      customItems.push(newItem);
      localStorage.setItem("custom_portfolio_items", JSON.stringify(customItems));

      renderItem(newItem);
      showToast("✓ Item added successfully!", 3000);
      adminForm.reset();
      closeAdminModal();
    };

    // Check if user uploaded an image file
    if (imageFileInput && imageFileInput.files && imageFileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function(event) {
        saveNewItem(event.target.result);
      };
      reader.readAsDataURL(imageFileInput.files[0]);
    } else {
      saveNewItem(link);
    }
  });
}

function loadCustomItems() {
  const customItems = JSON.parse(localStorage.getItem("custom_portfolio_items") || "[]");
  customItems.forEach(item => renderItem(item));
}

function renderItem(item) {
  if (item.category === "achievement") {
    const grid = document.querySelector("#achievements .grid-2");
    if (grid) {
      const card = document.createElement("div");
      card.className = "card";
      let imgHtml = '';
      if (item.image) {
        imgHtml = `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" style="width: 60px; border-radius: 12px; margin-top: 10px; cursor: pointer;" onclick="openModal(this.src, '${escapeHtml(item.title)}')">`;
      }
      card.innerHTML = `
        <h3><i class="fas fa-trophy"></i> ${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.desc)}</p>
        ${imgHtml}
        ${item.link && !item.image ? `<a href="${escapeHtml(item.link)}" target="_blank" class="download-link"><i class="fas fa-external-link-alt"></i> View Link</a>` : ''}
      `;
      grid.appendChild(card);
    }
  } else if (item.category === "project") {
    const grid = document.querySelector("#projects .grid-2");
    if (grid) {
      const card = document.createElement("div");
      card.className = "card";
      let tagsHtml = '';
      if (item.desc) {
        tagsHtml = `<div class="tech-stack">` + item.desc.split(',').map(t => `<span>${escapeHtml(t.trim())}</span>`).join('') + `</div>`;
      }
      let imgHtml = '';
      if (item.image) {
        imgHtml = `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" style="width: 100%; max-height: 150px; object-fit: cover; border-radius: 12px; margin-bottom: 10px; cursor: pointer;" onclick="openModal(this.src, '${escapeHtml(item.title)}')">`;
      }
      card.innerHTML = `
        ${imgHtml}
        <h3><i class="fas fa-laptop-code"></i> ${escapeHtml(item.title)}</h3>
        <p>${item.image && !item.desc ? 'Custom added project.' : escapeHtml(item.desc || '')}</p>
        ${tagsHtml}
        ${item.link && !item.image ? `<div class="project-links"><a href="${escapeHtml(item.link)}" class="project-link" target="_blank"><i class="fas fa-globe"></i> Live Demo</a></div>` : ''}
      `;
      grid.appendChild(card);
    }
  } else if (item.category === "skill") {
    const techCard = document.querySelector("#skills .grid-2 .card:nth-child(2) div");
    if (techCard) {
      const tag = document.createElement("span");
      tag.className = "skill-tag";
      tag.textContent = item.title;
      techCard.appendChild(tag);
    }
  } else if (item.category === "certificate") {
    const grid = document.querySelector("#certificates .grid-3");
    if (grid) {
      const card = document.createElement("div");
      card.className = "card certificate-card";
      const imgSrc = item.image || item.link || 'images/Umalusi.jpg';
      card.innerHTML = `
        <img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(item.title)}" class="cert-img" onclick="openModal(this.src, '${escapeHtml(item.title)}')">
        <a href="${escapeHtml(imgSrc)}" download class="download-link" style="margin-top: 10px;"><i class="fas fa-download"></i> Download Certificate</a>
      `;
      grid.appendChild(card);
    }
  }
}

function clearCustomData() {
  if (confirm("Are you sure you want to clear all custom added items?")) {
    localStorage.removeItem("custom_portfolio_items");
    location.reload();
  }
}
