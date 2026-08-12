// Updated scripts.js to fetch a single navbar template dynamically based on page location
function loadNavbar() {
    // Check if we are inside the 'scenes' folder or root directory
    const isInsideScenes = window.location.pathname.includes('/scenes/');
    const pathToRoot = isInsideScenes ? '../' : '';

    const navbarHTML = `
     <nav class="navbar">
        <button class="buttonStyle" onclick="location.href='${pathToRoot}index.html'">Home</button>
        <button class="buttonStyle" onclick="location.href='${pathToRoot}scenes/page2.html'">Financial Support</button>
        <button class="buttonStyle" onclick="location.href='${pathToRoot}scenes/page3.html'">Community Events</button>
        <button class="buttonStyle" onclick="location.href='${pathToRoot}scenes/page4.html'">Wellness Tips</button>
        <button class="buttonStyle" onclick="location.href='${pathToRoot}scenes/page5.html'">About Us</button>
    </nav>
    `;
   
    const holder = document.getElementById('navbarHolder');
    if (holder) {
        holder.innerHTML = navbarHTML;
    }
}

// Image Slideshow / Carousel function for Wellness Tips (page4.html)
let slideIndex = 1;

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");
    
    if (slides.length === 0) return; 
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex - 1].style.display = "block";
    if (dots.length > 0 && dots[slideIndex - 1]) {
        dots[slideIndex - 1].className += " active";
    }
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

window.onload = function() {
    loadNavbar();
    if (document.getElementsByClassName("mySlides").length > 0) {
        showSlides(slideIndex);
    }
};