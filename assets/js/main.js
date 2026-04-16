// Gallery data from Jekyll
const galleryData = [
    {% for photo in site.data.gallery %}
    {
        src: "{{ photo.src }}",
        thumb: "{{ photo.thumb }}",
        alt: "{{ photo.alt }}",
        caption: "{{ photo.caption }}",
        date: "{{ photo.date }}",
        location: "{{ photo.location }}",
        camera: "{{ photo.camera }}",
        post: "{{ photo.post }}"
    }{% if forloop.last == false %},{% endif %}
    {% endfor %}
];

let currentIndex = 0;

function updateGalleryDisplay() {
    const photo = galleryData[currentIndex];
    document.getElementById('gallery-current-img').src = photo.thumb;
    document.getElementById('gallery-current-caption').textContent = photo.caption;
    document.getElementById('gallery-current-location').textContent = photo.location;
    document.getElementById('gallery-index').textContent = currentIndex + 1;
}

function prevPhoto() {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    updateGalleryDisplay();
}

function nextPhoto() {
    currentIndex = (currentIndex + 1) % galleryData.length;
    updateGalleryDisplay();
}

function openLightbox() {
    const photo = galleryData[currentIndex];
    const lightbox = document.getElementById('lightbox');

    document.getElementById('lightbox-img').src = photo.src;
    document.getElementById('lightbox-caption').textContent = photo.caption;
    document.getElementById('lightbox-details').innerHTML =
        `<span>${photo.date}</span> · <span>${photo.location}</span> · <span>${photo.camera}</span>`;
    document.getElementById('lightbox-post-link').href = photo.post;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function prevPhotoLightbox() {
    prevPhoto();
    openLightbox();
}

function nextPhotoLightbox() {
    nextPhoto();
    openLightbox();
}

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        if (document.getElementById('lightbox').classList.contains('active')) {
            prevPhotoLightbox();
        }
    } else if (e.key === 'ArrowRight') {
        if (document.getElementById('lightbox').classList.contains('active')) {
            nextPhotoLightbox();
        }
    }
});
