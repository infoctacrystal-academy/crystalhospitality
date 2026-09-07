document.addEventListener("DOMContentLoaded", () => {
  // 1. Entrance Welcome Splash Event
  const splash = document.getElementById("welcomeSplash");
  const enterBtn = document.getElementById("enterBtn");

  if (enterBtn && splash) {
    enterBtn.addEventListener("click", () => {
      splash.classList.add("fade-out");
    });
  }

  // 2. Interactive Gold Particle Background Canvas
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 1;
      this.speedX = Math.random() * 0.8 - 0.4;
      this.speedY = Math.random() * 0.8 - 0.4;
      this.alpha = Math.random() * 0.6 + 0.2;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
        this.reset();
      }
    }
    draw() {
      ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < 60; i++) particles.push(new Particle());

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // 3. Glowing Cursor Follower
  const cursorBlur = document.querySelector(".cursor-blur");
  window.addEventListener("mousemove", (e) => {
    cursorBlur.style.left = `${e.clientX}px`;
    cursorBlur.style.top = `${e.clientY}px`;
  });

  // 4. Interactive 3D Card Tilt Effect
  const tiltElements = document.querySelectorAll(".tilt-element");

  tiltElements.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const tiltX = (y / rect.height) * -12;
      const tiltY = (x / rect.width) * 12;

      el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
      el.style.transition = "transform 0.1s ease-out";
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
      el.style.transition = "transform 0.5s ease";
    });
  });

  // 5. Mobile Navigation Menu Toggle
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.querySelector(".nav-links");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // 6. Course Category Filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const courseCards = document.querySelectorAll(".course-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      courseCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }
      });
    });
  });

  // 7. Scroll Reveal Animation
  const reveals = document.querySelectorAll(".reveal");
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    reveals.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - 80) {
        element.classList.add("active");
      }
    });
  };
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // 8. Animated Counter Numbers
  const counters = document.querySelectorAll(".counter");
  let animated = false;

  const startCounters = () => {
    const statsSection = document.querySelector(".stats-bar");
    if (!statsSection) return;

    const sectionPos = statsSection.getBoundingClientRect().top;
    if (sectionPos < window.innerHeight && !animated) {
      counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const speed = Math.max(1, target / 40);

        const updateCount = () => {
          count += speed;
          if (count < target) {
            counter.innerText = Math.ceil(count);
            setTimeout(updateCount, 30);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
      });
      animated = true;
    }
  };
  window.addEventListener("scroll", startCounters);

  // 9. Contact Form Handler
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      alert(`Thank you, ${name}! Your inquiry has been sent directly to infocta.crystal@gmail.com.`);
      contactForm.reset();
    });
  }
});