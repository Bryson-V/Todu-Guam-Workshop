// Image Slideshow / Carousel Logic
let slideIndex = 1;

function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("demo");
    const captionText = document.getElementById("caption");
    
    // If no slides exist on the current page, exit safely
    if (!slides || slides.length === 0) return; 
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    // Hide all main slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Remove active state from thumbnails
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // Display current slide
    slides[slideIndex - 1].style.display = "block";
    
    // Activate current thumbnail & set caption text
    if (dots.length > 0 && dots[slideIndex - 1]) {
        dots[slideIndex - 1].className += " active";
        if (captionText) {
            // Priority: overlay text -> img alt text -> fallback
            const overlay = dots[slideIndex - 1].nextElementSibling;
            if (overlay && overlay.classList.contains('overlay')) {
                captionText.innerHTML = overlay.innerHTML;
            } else {
                captionText.innerHTML = dots[slideIndex - 1].alt;
            }
        }
    }
}

// Function triggered by clicking thumbnail images
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Auto-initialize slideshow when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    showSlides(slideIndex);
});