const burger = document.getElementById("hamburger");
const menu = document.getElementById("menu");
burger.onclick = () => {
  burger.classList.toggle("active");
  menu.classList.toggle("active");
};
const themeToggle = document.getElementById("theme-toggle");
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  themeToggle.checked = true;
}
themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }
});
document.querySelectorAll(".glass").forEach((card) => {
  card.addEventListener("click", (e) => {
    e.stopPropagation();
    document
      .querySelectorAll(".glass")
      .forEach((c) => c.classList.remove("active"));
    card.classList.add("active");
  });
});
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const bar = entry.target.querySelector(".bar span");
      const value = entry.target.dataset.skill;
      bar.style.width = value + "%";
      entry.target
        .querySelector(".bar")
        .setAttribute("data-label", value + "%");
      skillObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.3 },
);
document
  .querySelectorAll(".skill")
  .forEach((skill) => skillObserver.observe(skill));
function animateStat(el, target, suffix) {
  let current = 0;
  const step = Math.max(Math.ceil(target / 50), 1);
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    el.textContent = current + suffix;
  }, 25);
}
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      let target = 0;
      let suffix = "";
      if (el.dataset.count) {
        target = parseInt(el.dataset.count);
        suffix = "+";
      } else if (el.dataset.percent) {
        target = parseInt(el.dataset.percent);
        suffix = "%";
      }
      animateStat(el, target, suffix);
      statObserver.unobserve(el);
    });
  },
  { threshold: 0.1 },
);
document
  .querySelectorAll(".stat h3[data-count], .stat h3[data-percent]")
  .forEach((stat) => statObserver.observe(stat));
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
document.addEventListener("DOMContentLoaded", function () {
  const words = [
    "< Web Developer />",
    "< Frontend Engineer />",
    "< UI/UX Designer />",
  ];
  const typing = document.getElementById("typing");
  if (!typing) return;
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  function typeEffect() {
    const currentWord = words[wordIndex];
    if (!isDeleting) {
      typing.textContent = currentWord.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        setTimeout(() => (isDeleting = true), 1500);
      }
    } else {
      typing.textContent = currentWord.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    setTimeout(typeEffect, isDeleting ? 40 : 70);
  }
  typeEffect();
});
const preview = document.getElementById("imgPreview");
const previewImg = document.getElementById("imgPreviewSrc");
document.querySelectorAll("img").forEach((img) => {
  img.style.cursor = "pointer";
  img.onclick = (e) => {
    e.stopPropagation();
    previewImg.src = img.src;
    preview.style.display = "flex";
  };
});
preview.onclick = () => (preview.style.display = "none");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".menu a");
const header = document.querySelector("header");
function setActiveMenu() {
  const scrollPos =
    window.scrollY +
    window.innerHeight / 2 -
    (header ? header.offsetHeight : 0);
  let current = sections[0].id;
  for (let i = sections.length - 1; i >= 0; i--) {
    const sec = sections[i];
    if (scrollPos >= sec.offsetTop) {
      current = sec.id;
      break;
    }
  }
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}
window.addEventListener("scroll", setActiveMenu);
window.addEventListener("load", setActiveMenu);
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    menu.classList.remove("active");
    burger.classList.remove("active");
  });
});
(function () {
  emailjs.init("NWu2gq9VRetxPYL9S");
})();
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[name="from_email"]');
    formMessage.textContent = "Pesan sedang dikirim...";
    formMessage.className = "sending";
    formMessage.style.display = "block";
    emailjs.sendForm("service_77zeccu", "template_5jfrqnp", this).then(
      () => {
        formMessage.textContent = "Pesan berhasil terkirim!";
        formMessage.className = "success";
        formMessage.style.display = "block";
        contactForm.reset();
        setTimeout(() => {
          formMessage.style.display = "none";
        }, 5000);
      },
      (error) => {
        formMessage.textContent = "Pesan gagal terkirim";
        formMessage.className = "error";
        formMessage.style.display = "block";
        console.error(error);
        setTimeout(() => {
          formMessage.style.display = "none";
        }, 5000);
      },
    );
  });
}
const faders = document.querySelectorAll(".fade-up");
const observerOptions = {
  threshold: 0.2,
};
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const delay = Array.from(faders).indexOf(entry.target) * 30;
    setTimeout(() => {
      entry.target.classList.add("show");
    }, delay);
    obs.unobserve(entry.target);
  });
}, observerOptions);
faders.forEach((fader) => observer.observe(fader));
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");
  const popup = document.querySelectorAll(".pop-up");
  const progress = document.querySelector(".progress");
  let progressValue = 0;
  const intervalTime = 30;
  let finished = false;
  function showPopup() {
    popup.forEach((el, i) => {
      setTimeout(() => el.classList.add("show"), i * 200);
    });
  }
  function showMainContent() {
    if (finished) return;
    finished = true;
    clearInterval(progressInterval);
    loader.style.display = "none";
    mainContent.style.display = "block";
    showPopup();
  }
  const progressInterval = setInterval(() => {
    if (progressValue >= 100) {
      showMainContent();
    } else {
      progressValue++;
      if (progress) progress.style.width = progressValue + "%";
    }
  }, intervalTime);
  loader.addEventListener("click", showMainContent);
  const skipBtn = document.getElementById("skip-loader");
  skipBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showMainContent();
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const robotMini = document.querySelector(".robot-mini");
  const robotWrapper = document.querySelector(".robot-wrapper");
  const robotBody = document.querySelector(".robot-body");
  const pupils = document.querySelectorAll(".robot-pupil");
  setTimeout(() => robotMini.classList.add("show"), 500);
  document.addEventListener("mousemove", (e) => {
    pupils.forEach((pupil) => {
      const eye = pupil.parentElement;
      const rect = eye.getBoundingClientRect();
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
      const radius = 6;
      pupil.style.transform = `translate(-50%,-50%) translate(${Math.cos(angle) * radius}px,${Math.sin(angle) * radius}px)`;
    });
  });
  document.addEventListener("mousemove", (e) => {
    const rect = robotBody.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
    if (dist < 120) {
      robotBody.classList.add("shy");
    } else {
      robotBody.classList.remove("shy");
    }
  });
  let clickCount = 0;
  let timer;
  robotWrapper.addEventListener("click", () => {
    robotBody.classList.remove("shy");
    robotBody.classList.add("shock");
    setTimeout(() => robotBody.classList.remove("shock"), 400);
    clickCount++;
    clearTimeout(timer);
    timer = setTimeout(() => (clickCount = 0), 600);
    if (clickCount >= 3) {
      robotWrapper.classList.add("spin");
      setTimeout(() => robotWrapper.classList.remove("spin"), 600);
      clickCount = 0;
    }
  });
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    if (Math.abs(window.scrollY - lastScroll) > 20) {
      robotWrapper.classList.add("bounce");
      setTimeout(() => robotWrapper.classList.remove("bounce"), 400);
      lastScroll = window.scrollY;
    }
  });
  document.querySelectorAll("button, a, .btn").forEach((el) => {
    el.addEventListener("mouseenter", () => robotBody.classList.add("smile"));
    el.addEventListener("mouseleave", () =>
      robotBody.classList.remove("smile"),
    );
  });
});
let scrollTimeout;
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  if (Math.abs(currentScroll - lastScroll) > 10) {
    robotWrapper.classList.add("scroll-bounce");
    robotBody.classList.add("scroll-mode");
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      robotWrapper.classList.remove("scroll-bounce");
      robotBody.classList.remove("scroll-mode");
    }, 400);
    lastScroll = currentScroll;
  }
});
mode.onclick = () => {
  document.body.classList.toggle("light");
  console.log(document.body.classList);
};
const eyes = document.querySelectorAll(".eye");
function randomBlink() {
  eyes.forEach((eye) => {
    eye.style.animation = "none";
    void eye.offsetWidth;
    eye.style.animation = "blink 4s infinite";
  });
  setTimeout(randomBlink, Math.random() * 5000 + 3000);
}

randomBlink();
const seeMoreBtn = document.getElementById("seeMoreBtn");
const hiddenProjects = document.querySelectorAll(".hidden-project");

let expanded = false;

seeMoreBtn.addEventListener("click", () => {
  expanded = !expanded;

  hiddenProjects.forEach(project => {
    if (expanded) {
      project.classList.add("show");
    } else {
      project.classList.remove("show");
    }
  });

  seeMoreBtn.textContent = expanded ? "See Less" : "See More";
});
