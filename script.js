window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('bg-white', 'shadow-lg');
        header.classList.remove('bg-transparent');
    } else {
        header.classList.add('bg-transparent');
        header.classList.remove('bg-white', 'shadow-lg');
    }
});

document.getElementById('menu-btn').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

const carousel = document.querySelector('.carousel');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

prevBtn.addEventListener('click', () => {
    carousel.scrollBy({
        left: -carousel.clientWidth,
        behavior: 'smooth'
    });
});

nextBtn.addEventListener('click', () => {
    carousel.scrollBy({
        left: carousel.clientWidth,
        behavior: 'smooth'
    });
});

function openModal(src) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = "block";
    modalImg.src = src;
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = "none";
}

function swapImage(src) {
    const bigImage = document.getElementById('bigImage');
    bigImage.src = src;
    openModal(src);
}

document.getElementById('generateBtn').addEventListener('click', async () => {
    const prompt = document.getElementById('promptInput').value;
    const response = await fetch(`https://magicimage.darkhacker7301.workers.dev/?search=${prompt}`);
    const data = await response.json();
    const images = data.images;

    if (images.length > 0) {
        document.getElementById('bigImage').src = images[0];
        const carousel = document.getElementById('carousel');
        carousel.innerHTML = '';

        images.slice(1).forEach(image => {
            const div = document.createElement('div');
            div.className = 'carousel-item snap-center w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6 p-4';
            const img = document.createElement('img');
            img.src = image;
            img.alt = 'Generated image based on user prompt';
            img.className = 'mx-auto rounded-lg shadow-lg cursor-pointer';
            img.onclick = () => swapImage(image);
            div.appendChild(img);
            carousel.appendChild(div);
        });
