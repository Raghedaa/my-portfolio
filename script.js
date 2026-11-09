AOS.init({ duration: 1000, once: true });

const menuIcon = document.getElementById('menuIcon');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('#navLinks a');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('show');
        menuIcon.classList.remove('active');
    });
});

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    menuIcon.classList.toggle('active');
});

const text = "Software Engineer | Mobile Developer";
let index = 0;
function type() {
    if (index < text.length) {
        document.getElementById("typewriter").innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 100);
    }
}
window.onload = type;


const navA = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('section');

const options = { threshold: 0.3 };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navA.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === entry.target.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, options);

sections.forEach(section => observer.observe(section));

function showDetails(title, desc) {
    document.getElementById('mTitle').innerText = title;
    document.getElementById('mDesc').innerText = desc;
    document.getElementById('projectModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('projectModal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    const cards = document.querySelectorAll('.project-card');
    const modalBody = document.getElementById('modalBody');

    cards.forEach(card => {
        card.addEventListener('click', () => {

            const title = card.querySelector('h3').innerText;
            const description = card.getAttribute('data-description');
            const imagesString = card.getAttribute('data-images');
            const images = imagesString ? imagesString.split(',') : [];

            modalBody.innerHTML = `
                <div class="modal-header">
                    <h2>${title}</h2>
                </div>
                <div class="modal-gallery">
                    <div class="main-image-container">
                        <img src="${images[0]}" id="mainModalImage" class="main-img">
                    </div>
                    <div class="thumbnails">
                        ${images.map((img, index) => `
                            <img src="${img}" class="thumb ${index === 0 ? 'active' : ''}" 
                                 onclick="changeModalImage('${img}', this)">
                        `).join('')}
                    </div>
                </div>
                <div class="modal-info">
                    <h3>About the Project</h3>
                    <p>${description}</p>
                </div>
            `;

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; 
        });
    });
});

function changeModalImage(src, thumb) {
    document.getElementById('mainModalImage').src = src;
    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
}

function closeProject() {
    document.getElementById('projectModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}






function openProjectModal(element) {
    const modal = document.getElementById('projectModal');
    const modalData = document.getElementById('modal-data');
    const modalContent = document.querySelector('.modal-content'); 

    const title = element.getAttribute('data-title');
    const desc = element.getAttribute('data-description');
    const tags = element.getAttribute('data-tags') ? element.getAttribute('data-tags').split(',') : [];
    const images = element.getAttribute('data-images').split(',');

    // تحديد نوع المشروع لعرض الصور بشكل صحيح (ويب أو موبايل)
    // ابحثي عن هذا الجزء داخل دالة openProjectModal واستبدليه
if (title.toLowerCase().includes('dashboard')) {
    modalContent.setAttribute('data-project-type', 'web');
} else {
    modalContent.setAttribute('data-project-type', 'mobile');
}
    
    modalData.innerHTML = `
        <h2 style="color: #00eeff; font-size: 2rem; margin-bottom: 15px;">${title}</h2>
        <p style="color: #ccd6f6; font-size: 1.05rem; line-height: 1.7; margin-bottom: 20px;">${desc}</p>

        <div class="tech-tags-container">
            ${tags.map(tag => `<span class="tech-tag">${tag.trim()}</span>`).join('')}
        </div>

        <div style="height: 1px; background: rgba(255,255,255,0.1); margin: 30px 0;"></div>

        <div class="modal-gallery-grid">
            ${images.map(img => `<img src="${img.trim()}" alt="Screenshot">`).join('')}
        </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}







// تحديث الرابط النشط عند السكرول
window.addEventListener('scroll', () => {
    let current = "";
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    // التحقق إذا كان المستخدم قد وصل لنهاية الصفحة تماماً
    const isBottom = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2;

    if (isBottom) {
        current = "contact"; // تفعيل سكشن التواصل فوراً عند الوصول للنهاية
    } else {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });



});
function updateModalImg(src, thumb) {
    document.getElementById('current-modal-img').src = src;
    document.querySelectorAll('.modal-thumbnails img').forEach(img => img.classList.remove('active'));
    thumb.classList.add('active');
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// click on the dark area outside the box closes the modal
document.getElementById('projectModal').addEventListener('click', (e) => {
    if (e.target.id === 'projectModal') closeProjectModal();
});

// Esc key closes it too
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
});








// ===== Featured project rows (paste at the end of script.js) =====

// Development & Quality text, keyed by data-title (trimmed)
const PROJECT_QUALITY = {
  "Musafer — Graduation Project":
    "Engineered concurrency-safe seat booking workflows, WebSocket-based GPS tracking integrated with PostGIS, and QR ticket validation. Tested critical booking scenarios and edge cases to ensure reliable reservations.",
   "SpendWise — Smart Personal Finance Companion":
"Built with Clean Architecture and BLoC/Cubit, integrating Firebase Authentication and Cloud Firestore through REST APIs using Dio. Implemented session persistence and secure cloud data synchronization.",  "Banking System":
    "Applied Facade, Strategy, Observer, and Chain of Responsibility design patterns to organize core banking operations. Tested failure scenarios across transaction processing and account states to improve system reliability.",
  "Complaint Management":
    "Implemented OTP-based authentication, real-time complaint status synchronization, and Firebase Cloud Messaging (FCM) notifications. Verified key user flows to ensure reliable complaint handling.",
  "Rental Marketplace":
    "Performed integration testing on API endpoints and role-based permissions across tenant, landlord, and admin workflows. Validated data handling and access control across the platform.",
  "Event Platform":
    "Implemented multilingual support and Dark/Light themes, and tested the main UI components and functional workflows to ensure a consistent user experience.",
  "Banking System Dashboard":
  "Designed responsive admin views for real-time transaction monitoring and financial analytics, with data visualization for clear insights.",
  "Real Estate Management Dashboard":
    "Built a responsive multi-user dashboard with property listings, customer tracking, analytics, and reporting tools."
};
// Replaces the old buildFeaturedProjects() and its DOMContentLoaded line.
// Keep the PROJECT_QUALITY object above it as it is.


const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });


function buildFeaturedProjects() {
document.querySelectorAll(".project-card").forEach((card, i) => {
        try {
      const isWeb = card.classList.contains("web-card");
      const title = (card.dataset.title || "").trim();
      const name = title.split("—")[0].trim();
      const words = name.split(/\s+/).filter(Boolean);
      const initials = (words.length > 1
        ? words[0][0] + words[1][0]
        : name.slice(0, 2)).toUpperCase();
      const desc = card.dataset.description || "";
      const quality = card.dataset.quality || PROJECT_QUALITY[title] || "";
      const images = (card.dataset.images || "")
        .split(",").map((s) => s.trim()).filter(Boolean);
      const tags = (card.dataset.keyTags || card.dataset.tags || "")
        .split(",").map((s) => s.trim()).filter(Boolean).slice(0, 10);

      const shown = images.slice(0, 3);
      const rest = images.length - 3;

      const shots = shown.map((src) =>
        `<div class="fp-shot"><img src="${src}" alt="${name} screenshot"></div>`
      ).join("");

      const moreSlot = rest > 0 ? `
        <div class="fp-shot more">
          <img src="${images[3]}" alt="">
          <button class="fp-more" type="button">
            <strong>+${rest}</strong><span>View more</span>
          </button>
        </div>` : "";

      // AOS measured these cards before they grew, so drop it for them
      card.removeAttribute("data-aos");
      card.removeAttribute("data-aos-delay");
      card.classList.remove("aos-init", "aos-animate", "mobile-card");
      card.classList.add("fp-reveal");
      revealObserver.observe(card);

      card.classList.add("featured-project");
      card.removeAttribute("onclick");

      card.innerHTML = `
${i < 2 ? `<div class="fp-badge"><i class="fas fa-star"></i> Featured Project</div>` : ""}        <div class="fp-head">
          <div class="fp-logo">${initials}</div>
          <h3 class="fp-title">${name}</h3>
        </div>
        <p class="fp-desc">${desc}</p>
        ${quality ? `
        <div class="fp-quality">
<h4>Technical Highlights</h4>

          <p>${quality}</p>
        </div>` : ""}
        <div class="fp-gallery ${isWeb ? "is-web" : "is-mobile"}">
          ${shots}${moreSlot}
        </div>
        <div class="fp-tags">${tags.map((t) => `<span>${t}</span>`).join("")}</div>
        <button class="fp-link" type="button">View project ↗</button>
      `;

      card.querySelectorAll(".fp-shot, .fp-link").forEach((el) =>
        el.addEventListener("click", () => openProjectModal(card))
      );
    } catch (err) {
      console.error("Project card failed:", card.dataset.title, err);
    }
  });

  if (window.AOS) AOS.refreshHard();
}

document.addEventListener("DOMContentLoaded", buildFeaturedProjects);