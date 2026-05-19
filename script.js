/* ============================================================
   PORTFOLIO DATA — Edit these arrays to customize your portfolio
   ============================================================ */

/* ---------- SKILLS ----------
   Add or remove objects below.
   icon  : any emoji or short text
   name  : skill label shown on the card
*/
const SKILLS = [
  { icon: "🌐", name: "HTML" },
  { icon: "🎨", name: "CSS" },
  { icon: "⚡", name: "JavaScript" },
  { icon: "⚛️",  name: "React" },
  { icon: "🟢", name: "Node.js" },
  { icon: "🐍", name: "Python" },
  { icon: "🗄️", name: "SQL" },
  { icon: "🐙", name: "Git" },
  { icon: "🐳", name: "Docker" },
  { icon: "☁️", name: "AWS" },
];

/* ---------- PROJECTS ----------
   Add your projects here. Each entry will automatically
   create a card in the Projects section.

   title    : project name
   desc     : short description (1-2 sentences)
   emoji    : large icon shown when no image is provided
   image    : (optional) URL or relative path to a screenshot
   tags     : array of technology labels
   live     : (optional) URL to live demo
   github   : (optional) URL to source code

   Example entry — uncomment and fill in your details:
   {
     title: "My Awesome App",
     desc: "A full-stack web app that does something cool.",
     emoji: "🚀",
     tags: ["React", "Node.js", "MongoDB"],
     live: "https://myapp.com",
     github: "https://github.com/yourusername/my-awesome-app",
   },
*/
const PROJECTS = [
  // ← Paste your projects here. See the example in the comment above.
];

/* ============================================================
   TYPEWRITER STRINGS
   Change these to describe yourself.
   ============================================================ */
const TYPEWRITER_STRINGS = [
  "Full-Stack Developer",
  "UI/UX Enthusiast",
  "Problem Solver",
  "Open Source Contributor",
];

/* ============================================================
   RENDER FUNCTIONS — no need to edit below this line
   ============================================================ */

function renderSkills() {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;
  grid.innerHTML = SKILLS.map(
    (s) => `
    <div class="skill-card fade-in">
      <span class="skill-icon">${s.icon}</span>
      <span class="skill-name">${s.name}</span>
    </div>`
  ).join("");
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  const hint = document.getElementById("projects-hint");
  if (!grid) return;

  if (PROJECTS.length === 0) {
    if (hint) hint.style.display = "block";
    return;
  }

  grid.innerHTML = PROJECTS.map(
    (p) => `
    <div class="project-card fade-in">
      ${
        p.image
          ? `<img class="project-thumb" src="${p.image}" alt="${p.title}" />`
          : `<div class="project-thumb">${p.emoji || "💻"}</div>`
      }
      <div class="project-body">
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-tags">
          ${(p.tags || []).map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
        <div class="project-links">
          ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener">Live Demo ↗</a>` : ""}
          ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener">Source Code ↗</a>` : ""}
        </div>
      </div>
    </div>`
  ).join("");
}

/* ============================================================
   TYPEWRITER EFFECT
   ============================================================ */
function startTypewriter() {
  const el = document.getElementById("typewriter");
  if (!el) return;

  let stringIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const cursor = document.createElement("span");
  cursor.className = "cursor";
  el.appendChild(cursor);

  function tick() {
    const current = TYPEWRITER_STRINGS[stringIndex];

    if (!deleting) {
      charIndex++;
      el.firstChild
        ? (el.firstChild.textContent = current.slice(0, charIndex))
        : el.insertBefore(document.createTextNode(current.slice(0, charIndex)), cursor);

      if (el.childNodes[0]) el.childNodes[0].textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1600);
        return;
      }
    } else {
      charIndex--;
      if (el.childNodes[0]) el.childNodes[0].textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        stringIndex = (stringIndex + 1) % TYPEWRITER_STRINGS.length;
        setTimeout(tick, 400);
        return;
      }
    }

    setTimeout(tick, deleting ? 60 : 90);
  }

  el.insertBefore(document.createTextNode(""), cursor);
  tick();
}

/* ============================================================
   SCROLL FADE-IN (Intersection Observer)
   ============================================================ */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
}

/* ============================================================
   CONTACT FORM VALIDATION
   ============================================================ */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const fields = {
    name: { el: form.querySelector("#name"), err: form.querySelector("#name-error"), msg: "Name is required." },
    email: { el: form.querySelector("#email"), err: form.querySelector("#email-error"), msg: "A valid email is required." },
    message: { el: form.querySelector("#message"), err: form.querySelector("#message-error"), msg: "Message cannot be empty." },
  };

  function validate() {
    let valid = true;
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    Object.entries(fields).forEach(([key, f]) => {
      const val = f.el.value.trim();
      let err = "";
      if (!val) err = f.msg;
      else if (key === "email" && !emailRe.test(val)) err = f.msg;
      f.err.textContent = err;
      if (err) valid = false;
    });

    return valid;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;

    const success = document.getElementById("form-success");
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    btn.textContent = "Sending…";

    // Simulate send — replace this block with your actual fetch/email service call
    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.textContent = "Send Message";
      if (success) {
        success.style.display = "block";
        setTimeout(() => (success.style.display = "none"), 4000);
      }
    }, 1200);
  });
}

/* ============================================================
   MOBILE NAV
   ============================================================ */
function initMobileNav() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => navLinks.classList.remove("open"))
  );
}

/* ============================================================
   ACTIVE NAV HIGHLIGHT
   ============================================================ */
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-links a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add("active");
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ============================================================
   FOOTER YEAR
   ============================================================ */
function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  renderProjects();
  startTypewriter();
  initScrollAnimations();
  initContactForm();
  initMobileNav();
  initActiveNav();
  setYear();

  // Re-observe after render (cards are injected dynamically)
  setTimeout(initScrollAnimations, 50);
});
