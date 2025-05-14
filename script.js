// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#')) {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Scroll-to-top button
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollBtn.className = 'scroll-to-top';
document.body.appendChild(scrollBtn);

scrollBtn.style.display = 'none';
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Section reveal on scroll
const revealSections = document.querySelectorAll('section');
const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  revealSections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
      section.classList.add('show');
    } else {
      section.classList.remove('show');
    }
  });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinksMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navLinksMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Close mobile menu when a link is clicked
navLinksMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      hamburger.classList.remove('open');
      navLinksMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
});

// Dark mode toggle
const darkModeBtn = document.querySelector('.dark-mode-toggle');
const darkModeIcon = darkModeBtn.querySelector('i');

function setDarkMode(enabled) {
  document.body.classList.toggle('dark-mode', enabled);
  darkModeBtn.setAttribute('aria-pressed', enabled);
  darkModeIcon.className = enabled ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('darkMode', enabled ? 'true' : 'false');
}

darkModeBtn.addEventListener('click', () => {
  const enabled = !document.body.classList.contains('dark-mode');
  setDarkMode(enabled);
});

// On load, set dark mode from localStorage
if (localStorage.getItem('darkMode') === 'true') {
  setDarkMode(true);
}

// Animate skill bars on scroll
function animateSkillBars() {
  document.querySelectorAll('.skill-bar').forEach(bar => {
    const span = bar.querySelector('span');
    const value = bar.getAttribute('data-skill');
    if (bar.getBoundingClientRect().top < window.innerHeight * 0.85) {
      span.style.width = value + '%';
    } else {
      span.style.width = '0';
    }
  });
}
window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// Contact form validation and feedback
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    const msgDiv = contactForm.querySelector('.form-message');
    let valid = true;
    msgDiv.textContent = '';
    if (!name) {
      valid = false;
      msgDiv.textContent = 'Please enter your name.';
      contactForm.name.focus();
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      valid = false;
      msgDiv.textContent = 'Please enter a valid email address.';
      contactForm.email.focus();
    } else if (!message) {
      valid = false;
      msgDiv.textContent = 'Please enter your message.';
      contactForm.message.focus();
    }
    if (valid) {
      msgDiv.textContent = 'Thank you! Your message has been sent.';
      msgDiv.style.color = '#2b6cb0';
      contactForm.reset();
    } else {
      msgDiv.style.color = '#d32f2f';
    }
  });
}

// Typewriter effect for hero subtitle
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
  const text = subtitle.textContent;
  subtitle.textContent = '';
  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      subtitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 55);
    }
  }
  setTimeout(typeWriter, 400);
}

// Scrollspy for navbar
const sections = document.querySelectorAll('section');
const navLinksSpy = document.querySelectorAll('.nav-links a');
function scrollSpy() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinksSpy.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}
window.addEventListener('scroll', scrollSpy);
window.addEventListener('load', scrollSpy);

// Subtle trailing cursor effect for interactive elements
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate3d(${mouseX - 10}px, ${mouseY - 10}px, 0)`;
});
['a', 'button', '.project-card', '.contact-item'].forEach(sel => {
  document.querySelectorAll(sel).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });
}); 