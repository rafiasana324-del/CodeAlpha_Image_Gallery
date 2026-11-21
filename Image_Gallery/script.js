// 10 images ki list (Tarteeb se, taake Next/Prev sahi chale)
const images = [
    "images/img1.jpg",
    "images/img2.jpg",
    "images/img3.jpg",
    "images/img4.jpg",
    "images/img5.jpg",
    "images/img6.jpg",
    "images/img7.jpg",
    "images/img8.jpg",
    "images/img9.jpg"
];

let currentIndex = 0;

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

// --- Lightbox Logic (Aapka purana code) ---
function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex];
    lightbox.classList.add('active'); 
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

function changeImage(direction) {
    currentIndex += direction;

    if (currentIndex >= images.length) {
        currentIndex = 0; 
    }
    if (currentIndex < 0) {
        currentIndex = images.length - 1; 
    }

    lightboxImg.src = images[currentIndex];
}

// --- Category Filter Logic ---
// Categories ki list (All ko shuru mein nahi rakha kyunke Next/Prev loop ke liye ye behtar hai)
const categoriesList = ['CsMaster', 'Study', 'Gameslover'];
let currentCategoryIndex = 0; // Default CsMaster

function filterSelection(category, btnElement) {
    const items = document.querySelectorAll('.gallery-item');
    const buttons = document.querySelectorAll('.filters button');

    // Agar user ne upar wale button pe click kiya hai
    if (btnElement) {
        buttons.forEach(btn => btn.classList.remove('active'));
        btnElement.classList.add('active');
    } else {
        // Agar Next/Prev button se aaya hai, toh upar wale button ko active karo
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.innerText === category || (category === 'all' && btn.innerText === 'All')) {
                btn.classList.add('active');
            }
        });
    }

    // Current Index update karo
    if (category === 'all') {
        currentCategoryIndex = 0; // Default to CsMaster
    } else {
        currentCategoryIndex = categoriesList.indexOf(category);
    }

    // Images ko hide/show karo
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.classList.remove('hide');
        } else {
            item.classList.add('hide');
        }
    });
}

// --- Next / Previous Category Buttons Logic ---
function changeCategory(direction) {
    // Index ko aage ya peeche karo
    currentCategoryIndex += direction;

    // Agar list ke aakhir se aage badh gaye, toh wapas shuru (CsMaster) se shuru karo
    if (currentCategoryIndex >= categoriesList.length) {
        currentCategoryIndex = 0;
    }
    // Agar pehli se peeche gaye, toh aakhri (Gameslover) par jao
    if (currentCategoryIndex < 0) {
        currentCategoryIndex = categoriesList.length - 1;
    }

    // Nayi category nikal kar filter function ko call karo
    const newCategory = categoriesList[currentCategoryIndex];
    filterSelection(newCategory, null);
}


// --- Miscellaneous Logic ---
// Keyboard Support (Arrow keys se lightbox image change karna)
document.addEventListener('keydown', function(e) {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowRight') changeImage(1);
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'Escape') closeLightbox();
    }
});

// Lightbox ke bahar (side par) click karne par band karna
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
});