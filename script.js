// تهيئة الأنميشن
AOS.init({ duration: 1000, once: true });

// القائمة الجانبية للموبايل
const menu = document.querySelector('#mobile-menu');
const navLinks = document.querySelector('#navLinks');

menu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menu.classList.toggle('is-active');
});

// إغلاق القائمة عند الضغط على رابط
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menu.classList.remove('is-active');
    });
});

// عناصر المودال
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const gridContainer = document.getElementById("imagesGrid");
// العنصر الذي يحتوي على المودال لإضافة كلاس التكبير له
const modalContent = document.querySelector(".modal-content");

function openModal(card) {
    console.log("1. تم الضغط على الكارد بنجاح");

    if (!card) {
        console.error("خطأ: الكارد غير موجود!");
        return;
    }

    // --- الجزء الجديد: تفعيل كلاس الويب الذي طلبتِيه ---
    if (card.classList.contains('web-card')) {
        modalContent.classList.add('web-modal');
        console.log("تفعيل تنسيق الويب العريض للمودال");
    } else {
        modalContent.classList.remove('web-modal');
        console.log("استخدام التنسيق العادي للموبايل");
    }
    // ----------------------------------------------

    const title = card.querySelector("h3")?.innerText;
    const description = card.getAttribute("data-description");
    const imagesAttr = card.getAttribute("data-images");

    console.log("2. البيانات المستخرجة:", { title, description, imagesAttr });

    if (!imagesAttr) {
        console.warn("تنبيه: لا توجد صور في سمة data-images لهذا الكارد");
        return;
    }

    const imagesList = imagesAttr.split(",");
    gridContainer.innerHTML = "";

    imagesList.forEach(imgSrc => {
        const imgElement = document.createElement("img");
        imgElement.src = imgSrc.trim();
        gridContainer.appendChild(imgElement);
    });

    modalTitle.innerText = title || "No Title";
    modalDesc.innerHTML = description || "";

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    
    console.log("3. المودال يجب أن يكون ظاهراً الآن");
}

function openModalFromCard(card) {
    openModal(card);
}

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        openModal(this);
    });
});

// إغلاق المودال عند الضغط على X
document.querySelector(".close").onclick = () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
};

// إغلاق المودال عند الضغط خارج المحتوى
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

// السكرول وتلوين الروابط
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".nav-links li a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 250)) { // عدلنا الرقم ليكون الاستيعاب أسرع للقسم
            current = section.getAttribute("id");
        }
    });

    // التأكد من تلوين آخر قسم (Contact) عند الوصول لنهاية الصفحة
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 5) {
        current = "contact";
    }

    navLi.forEach((a) => {
        a.classList.remove("active-link");
        const href = a.getAttribute("href");
        if (href === `#${current}`) {
            a.classList.add("active-link");
        }
    });
});