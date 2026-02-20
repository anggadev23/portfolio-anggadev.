document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");
  const popups = document.querySelectorAll(".pop-up");
  const progress = document.querySelector(".progress");
  let progressValue = 0;
  const intervalTime = 30;
  let finished = false;
  function showMainContent() {
    if (finished) return;
    finished = true;
    clearInterval(progressInterval);
    loader.style.display = "none";
    mainContent.style.display = "block";
    function onLoadingComplete() {
      loadingScreen.style.display = "none";
      mainContent.style.display = "block";
      showPopups();
    }
    popups.forEach((el, i) => {
      setTimeout(() => el.classList.add("show"), i * 200);
    });
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
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".menu a");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const link = document.querySelector(`.menu a[href="#${id}"]`);
        if (entry.intersectionRatio > 0.25 && link) {
          navLinks.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    {
      root: null,
      threshold: [0.25],
    },
  );
  sections.forEach((sec) => observer.observe(sec));
});