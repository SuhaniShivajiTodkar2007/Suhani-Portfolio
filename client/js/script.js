const apiMeta = document.querySelector('meta[name="api-base"]');
const API_BASE = apiMeta ? apiMeta.content.trim() : "http://localhost:5000";

const projectsGrid = document.getElementById("projects-grid");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section");
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const typedRole = document.getElementById("typed-role");
const pageTransition = document.getElementById("page-transition");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const DEFAULT_PROJECTS = [
  {
    title: "SyncSpace",
    description:
      "A real-time chat platform built with Firebase Realtime Database and Authentication for seamless communication.",
    techStack: ["HTML", "CSS", "JavaScript", "Firebase"],
    features: ["Secure user authentication", "Instant real-time messaging", "Cloud-based synchronization"],
    problemSolved: "Enables fast and reliable communication with synchronized messages across users and devices.",
    repoUrl: "https://github.com/",
  },
  {
    title: "Bakery App",
    description: "A Firebase-powered bakery product management application for real-time inventory visibility.",
    techStack: ["HTML", "CSS", "JavaScript", "Firebase"],
    features: ["Structured product listing", "Real-time inventory updates", "User authentication"],
    problemSolved: "Simplifies product tracking and updates for small business workflows.",
    repoUrl: "https://github.com/",
  },
  {
    title: "Online Learning Website",
    description: "A responsive learning platform designed to deliver organized course content across devices.",
    techStack: ["HTML", "CSS", "JavaScript"],
    features: ["Structured course modules", "Mobile-first responsive design", "Clean and intuitive UI"],
    problemSolved: "Improves access to educational content with a clear and user-friendly learning experience.",
    repoUrl: "https://github.com/",
  },
];

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const safeApi = (path) => `${API_BASE.replace(/\/$/, "")}${path}`;

const setTheme = (theme) => {
  document.body.classList.toggle("dark", theme === "dark");
  if (themeIcon) themeIcon.textContent = theme === "dark" ? "Light" : "Dark";
  localStorage.setItem("theme", theme);
};

const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

const startPageTransition = () => {
  if (prefersReducedMotion) {
    document.body.classList.add("page-ready");
    if (pageTransition) pageTransition.style.display = "none";
    return;
  }

  window.addEventListener("load", () => {
    document.body.classList.add("page-ready");
    if (!pageTransition) return;
    requestAnimationFrame(() => {
      pageTransition.classList.add("exit");
    });
    setTimeout(() => {
      pageTransition.style.display = "none";
    }, 900);
  });
};

const startTypingRoles = () => {
  if (!typedRole) return;

  const roles = ["Web Developer", "Computer Science Student", "Problem Solver"];
  if (prefersReducedMotion) {
    typedRole.textContent = roles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const tick = () => {
    const current = roles[roleIndex];
    typedRole.textContent = current.slice(0, charIndex);

    if (!isDeleting && charIndex < current.length) {
      charIndex += 1;
      setTimeout(tick, 70);
      return;
    }

    if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      setTimeout(tick, 1200);
      return;
    }

    if (isDeleting && charIndex > 0) {
      charIndex -= 1;
      setTimeout(tick, 38);
      return;
    }

    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(tick, 220);
  };

  tick();
};

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
    setTheme(nextTheme);
  });
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
}
navLinks.forEach((link) =>
  link.addEventListener("click", () => {
    if (nav) nav.classList.remove("open");
  })
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
);

const observeRevealElements = (elements) => {
  elements.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index * 80, 360)}ms`;
    revealObserver.observe(el);
  });
};

observeRevealElements(document.querySelectorAll(".reveal, .scroll-anim"));

const skillObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const value = entry.target.dataset.progress || "0";
        entry.target.style.width = `${value}%`;
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".progress-fill").forEach((el) => skillObserver.observe(el));

const decorateSkillBars = () => {
  const skillTagMap = {
    C: "C",
    "C++": "CPP",
    JavaScript: "JS",
    HTML: "HTML",
    CSS: "CSS",
    Firebase: "FIRE",
    SQL: "SQL",
    GitHub: "GIT",
    "VS Code": "VSC",
  };

  document.querySelectorAll(".skill").forEach((skill) => {
    const label = skill.querySelector("span");
    const progressFill = skill.querySelector(".progress-fill");
    if (!label || !progressFill) return;
    if (skill.querySelector(".skill-head")) return;

    const value = progressFill.dataset.progress || "0";
    const skillName = label.textContent.trim();
    const skillTag = skillTagMap[skillName] || "DEV";
    const head = document.createElement("div");
    head.className = "skill-head";
    head.innerHTML = `<span><span class="fact-icon">${skillTag}</span>${skillName}</span><span>${value}%</span>`;
    label.replaceWith(head);
  });
};

decorateSkillBars();

const updateActiveNav = () => {
  if (!sections.length) return;
  const scrollY = window.pageYOffset;
  sections.forEach((section) => {
    const top = section.offsetTop - 130;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");
    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach((l) => l.classList.remove("active"));
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add("active");
    }
  });
};

window.addEventListener("scroll", updateActiveNav);

const addSectionTransitions = () => {
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      target.classList.add("section-focus");
      setTimeout(() => target.classList.remove("section-focus"), 700);
    });
  });
};

const addInteractiveCardTilt = () => {
  if (prefersReducedMotion || window.innerWidth < 900) return;

  const interactiveCards = document.querySelectorAll(".skills-grid .card, .metric-card, .about-card");
  interactiveCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -7;
      const rotateY = ((x / rect.width) - 0.5) * 7;
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
};

const addProjectCardTilt = (cards) => {
  if (prefersReducedMotion || window.innerWidth < 900) return;

  cards.forEach((card) => {
    if (card.dataset.tiltBound === "true") return;
    card.dataset.tiltBound = "true";

    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -10;
      const rotateY = ((x / rect.width) - 0.5) * 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
};

const getProjectIconMeta = (title = "") => {
  const t = title.toLowerCase();

  if (t.includes("syncspace") || t.includes("chat")) {
    return {
      className: "icon-chat",
      svg: `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"></path>
        </svg>
      `,
    };
  }

  if (t.includes("bakery")) {
    return {
      className: "icon-bakery",
      svg: `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path d="M4 12c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6v1H4v-1Z"></path>
          <path d="M3 14h18v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2Z"></path>
        </svg>
      `,
    };
  }

  if (t.includes("learning") || t.includes("course")) {
    return {
      className: "icon-learning",
      svg: `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path d="M3 5a2 2 0 0 1 2-2h6v16H5a2 2 0 0 1-2-2V5Z"></path>
          <path d="M13 3h6a2 2 0 0 1 2 2v12l-4-2-4 2V3Z"></path>
        </svg>
      `,
    };
  }

  return {
    className: "",
    svg: `
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M10 4 12 6h8a2 2 0 0 1 2 2v2H2V6a2 2 0 0 1 2-2h6Z"></path>
        <path d="M2 10h22l-2 8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8Z"></path>
      </svg>
    `,
  };
};

const renderProjects = (projects) => {
  if (!projectsGrid) return;
  if (!projects.length) {
    projectsGrid.innerHTML = `<article class="card glass">No projects available yet.</article>`;
    return;
  }

  projectsGrid.innerHTML = projects
    .map(
      (project) => {
        const iconMeta = getProjectIconMeta(project.title);
        const solved =
          project.problemSolved ||
          (project.features && project.features.length
            ? project.features[project.features.length - 1]
            : "Delivers a practical real-world solution.");
        return `
      <article class="project-card glass reveal">
        <div class="project-head">
          <span class="project-icon ${iconMeta.className}" aria-hidden="true">
            ${iconMeta.svg}
          </span>
          <span class="project-type">Featured Project</span>
        </div>
        <h3>${project.title}</h3>
        <p class="muted">${project.description}</p>
        <ul class="project-features">
          ${(project.features || []).map((feature) => `<li>${feature}</li>`).join("")}
        </ul>
        <p class="project-problem"><strong>Problem Solved:</strong> ${solved}</p>
        <div class="pill-wrap">
          ${(project.techStack || []).map((tech) => `<span class="pill tech-badge">${tech}</span>`).join("")}
        </div>
        <div class="project-actions">
          ${project.liveUrl ? `<a class="btn btn-secondary btn-sm" href="${project.liveUrl}" target="_blank" rel="noreferrer">Live Demo</a>` : ""}
          <a class="btn btn-primary btn-sm github-btn" href="${project.repoUrl || "https://github.com/"}" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
              <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.12.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.54-1.38-1.33-1.75-1.33-1.75-1.08-.74.09-.73.09-.73 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.8 1.29 3.49.99.11-.77.42-1.29.76-1.59-2.67-.3-5.48-1.34-5.48-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.76.84 1.23 1.91 1.23 3.22 0 4.62-2.82 5.65-5.5 5.95.43.38.81 1.11.81 2.24v3.32c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"></path>
            </svg>
            GitHub
          </a>
        </div>
      </article>
    `;
      }
    )
    .join("");

  observeRevealElements(projectsGrid.querySelectorAll(".reveal"));
  addProjectCardTilt(projectsGrid.querySelectorAll(".project-card"));
};

const fetchProjects = async () => {
  try {
    const response = await fetch(safeApi("/api/projects"));
    if (!response.ok) throw new Error("Failed to fetch projects");
    const data = await response.json();
    const projects = data.projects?.length ? data.projects : DEFAULT_PROJECTS;
    renderProjects(projects);
  } catch (error) {
    renderProjects(DEFAULT_PROJECTS);
  }
};

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    formStatus.textContent = "Sending message...";
    formStatus.style.color = "var(--muted)";

    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(safeApi("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to send message");

      formStatus.textContent = "Message sent successfully. Check your email for confirmation.";
      formStatus.style.color = "var(--accent)";
      contactForm.reset();
    } catch (error) {
      formStatus.textContent = error.message;
      formStatus.style.color = "#ff6b6b";
    }
  });
}

fetchProjects();
updateActiveNav();
startTypingRoles();
startPageTransition();
addSectionTransitions();
addInteractiveCardTilt();
