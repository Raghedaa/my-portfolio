AOS.init({ duration: 1000, once: true });

const menuIcon = document.getElementById('menuIcon');
const navLinks = document.getElementById('navLinks');

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
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = 'none', 300);
    document.body.style.overflow = 'auto';
}


