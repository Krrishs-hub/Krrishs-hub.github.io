// Dynamic Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  const isCozy = document.body.dataset.theme === 'cozy';
  document.body.dataset.theme = isCozy ? '' : 'cozy';
  themeToggle.innerText = isCozy ? '🌙 Cozy Mode' : '☀️ Bright Mode';
});

// Gallery Tab Logic
const tabs = document.querySelectorAll('.tab');
const galleries = document.querySelectorAll('.gallery');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active state from all
    tabs.forEach(t => t.classList.remove('active'));
    galleries.forEach(g => g.classList.remove('active'));
    
    // Add active state to clicked tab and corresponding gallery
    tab.classList.add('active');
    document.getElementById(tab.dataset.city).classList.add('active');
  });
});

// Lightbox Viewer Logic
let currentImages = [];
let currentIndex = 0;
const viewer = document.getElementById('viewer');
const viewerImg = document.getElementById('viewer-img');

function openViewer(imgElement, cityId) {
  const gallery = document.getElementById(cityId);
  // Collect all images in the active gallery dynamically
  currentImages = Array.from(gallery.querySelectorAll('img'));
  currentIndex = currentImages.indexOf(imgElement);
  
  updateViewer();
  viewer.style.display = 'flex';
}

function updateViewer() {
  if (currentImages.length > 0) {
    viewerImg.src = currentImages[currentIndex].src;
  }
}

function nextPhoto() {
  if (currentImages.length > 0) {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateViewer();
  }
}

function prevPhoto() {
  if (currentImages.length > 0) {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateViewer();
  }
}

function closeViewer() {
  viewer.style.display = 'none';
}

// Add Keyboard Support for the Lightbox!
document.addEventListener('keydown', (e) => {
  if (viewer.style.display === 'flex') {
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
    if (e.key === 'Escape') closeViewer();
  }
});
