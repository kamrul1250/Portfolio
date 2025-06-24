// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    // Close menu on nav link click (small screen)
    if (navList.classList.contains('active')) {
      navList.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Load saved preference
if (localStorage.getItem('darkMode') === 'enabled') {
  body.classList.add('dark');
  darkModeToggle.textContent = '☀️';
} else {
  darkModeToggle.textContent = '🌙';
}

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  if (body.classList.contains('dark')) {
    darkModeToggle.textContent = '☀️';
    localStorage.setItem('darkMode', 'enabled');
  } else {
    darkModeToggle.textContent = '🌙';
    localStorage.setItem('darkMode', 'disabled');
  }
});

// Contact form validation and fake submission
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    formStatus.textContent = 'Please fill out all required fields correctly.';
    formStatus.style.color = 'red';
    return;
  }

  formStatus.style.color = '#a51c30';
  formStatus.textContent = 'Sending message...';

  setTimeout(() => {
    formStatus.textContent = 'Thank you! Your message has been sent.';
    form.reset();
  }, 1500);
});

// Scroll to top on logo click
document.querySelector('.logo a').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Hamburger menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navList = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  if (expanded) {
    navList.classList.remove("active");
    menuToggle.setAttribute('aria-expanded', 'false');
  } else {
    navList.classList.add("active");
    menuToggle.setAttribute('aria-expanded', 'true');
  }
});

// Close menu when clicking outside nav or buttons
document.addEventListener('click', (e) => {
  if (!navList.contains(e.target) &&
      !menuToggle.contains(e.target) &&
      !darkModeToggle.contains(e.target)) {
    navList.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

// Swipe down to close menu (mobile)
let touchStartY = null;

document.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
  if (!navList.classList.contains('active')) return;
  const touchEndY = e.touches[0].clientY;
  if (touchStartY !== null && (touchEndY - touchStartY) > 50) { // swipe down
    navList.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    touchStartY = null;
  }
});
