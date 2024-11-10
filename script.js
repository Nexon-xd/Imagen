window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('bg-white', 'shadow-lg');
    } else {
        header.classList.remove('bg-white', 'shadow-lg');
    }
});

document.getElementById('menu-btn').addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

document.getElementById('generateBtn').addEventListener('click', async () => {
    const prompt = document.getElementById('promptInput').value;
    if (!prompt) {
        alert("Please enter a prompt.");
        return;
    }
    const response = await fetch(`https://magicimage.darkhacker7301.workers.dev/?search=${prompt}`);
    const data = await response.json();
    const images = data.images;

    if (images && images.length > 0) {
        const bigImage = document.getElementById('bigImage');
        bigImage.src = images[0];

        const carousel = document.getElementById('carousel');
        carousel.innerHTML = '';  // Clear previous images

        images.slice(1).forEach(image => {
            const div = document.createElement('div');
            div.className = 'carousel-item snap-center w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6 p-4';
            
            const img = document.createElement('img');
            img.src = image;
            img.alt = 'Generated image';
            img.className = 'mx-auto rounded-lg shadow-lg cursor-pointer';
            img.onclick = () => swapImage(image);
            
            div.appendChild(img);
            carousel.appendChild(div);
        });
    } else {
        alert("No images found for the provided prompt.");
    }
});

function swapImage(src) {
    const bigImage = document.getElementById('bigImage');
    bigImage.src = src;
    openModal(src);
}

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

document.getElementById('prev-btn').addEventListener('click', () => {
    document.getElementById('carousel').scrollBy({
        left: -carousel.clientWidth,
        behavior: 'smooth'
    });
});

document.getElementById('next-btn').addEventListener('click', () => {
    document.getElementById('carousel').scrollBy({
        left: carousel.clientWidth,
        behavior: 'smooth'
    });
});
