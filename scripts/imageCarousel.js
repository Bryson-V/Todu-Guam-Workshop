document.addEventListener("DOMContentLoaded", () => {
    const RAW_ITEMS = [
        {
            tag: "Preventive Care",
            title: "Blood Sugar Screenings",
            description: "A resident receives a blood sugar screening during a GRMC health outreach at the Dededo Senior Citizens Center. The event provided free health screenings and medical services for Guam residents.",
            image: "assets/or1.jpg"
        },
        {
            tag: "Mobile Health",
            title: "DPHSS Mobile Health Clinic",
            description: "The DPHSS Mobile Health Clinic brings free health screenings, preventive care, and health education directly to Guam's communities, improving access to care for underserved residents.",
            image: "assets/or2.jpg"
        },
        {
            tag: "Education",
            title: "Todu Guam Foundation",
            description: "Todu Guam Foundation’s Prevention and Education program promotes proactive well-being through “Let’s Talk” forums and preventive health services across the community.",
            image: "assets/or3.webp"
        },
        {
            tag: "Mobile Clinic",
            title: "Mobile Care Clinic",
            description: "Bringing free primary and preventive health services directly to underserved communities. Services include medical checkups, immunizations, vision and oral screenings at no cost.",
            image: "assets/or4.webp"
        },
        {
            tag: "Homeless Outreach",
            title: "Salvation Army Outreach",
            description: "The Guam Medical Association held a homeless health outreach at the Salvation Army Light House Recovery Center, providing free health consultations and blood pressure screenings.",
            image: "assets/or5.webp"
        },
        {
            tag: "Youth Health",
            title: "Back-to-School Immunizations",
            description: "The Department of Public Health and Social Services hosted a Back-to-School Immunization Outreach, providing free routine vaccinations for eligible children to prepare for the school year.",
            image: "assets/or6.jpg"
        }
    ];

    const count = RAW_ITEMS.length;
    const CAROUSEL_ITEMS = [...RAW_ITEMS, ...RAW_ITEMS, ...RAW_ITEMS]; // Triple array for inf rotations

    const rotatorChamber = document.getElementById("rotatorChamber");
    const dotsContainer = document.getElementById("carousel-dots");
    const titleEl = document.getElementById("carousel-title");
    const descEl = document.getElementById("carousel-desc");
    const tagEl = document.getElementById("carousel-tag");

    // Start in the middle set of cards
    let activeIndex = count; 
    let isTransitioning = false;

    function initCarousel() {
        rotatorChamber.innerHTML = "";
        dotsContainer.innerHTML = "";

        // Build navigation dots for the original item count (6 dots)
        RAW_ITEMS.forEach((_, idx) => {
            const dot = document.createElement("button");
            dot.className = "nav-dot";
            dot.onclick = () => goToSlide(count + idx);
            dotsContainer.appendChild(dot);
        });

        // Build 18 cards (3 sets of 6)
        CAROUSEL_ITEMS.forEach((item, index) => {
            const card = document.createElement("div");
            card.className = "chamber-card";
            card.onclick = () => goToSlide(index);
            
            const img = document.createElement("img");
            img.src = item.image;
            img.alt = item.title;
            card.appendChild(img);
            rotatorChamber.appendChild(card);
        });

        updateCarousel(false);
    }

    function goToSlide(index) {
        activeIndex = index;
        updateCarousel(true);
    }

    function updateCarousel(animated = true) {
        const cards = rotatorChamber.children;
        for (let i = 0; i < CAROUSEL_ITEMS.length; i++) {
            const card = cards[i];
            const offset = i - activeIndex;

            // Settings for smooth CSS animation
            card.style.transition = animated 
                ? "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.7s ease" 
                : "none";
            card.style.transformOrigin = "240% 50%"; 

            // Fan angle of cards
            const rotateZ = offset * 22; 

            // Vertical separation between cards
            const translateY = offset * 40; 

            // Depth push
            const translateZ = -Math.abs(offset) * 90;    
            
            // # of cards to show on both sides (5 cards total)
            const isVisible = Math.abs(offset) <= 2;
            
            const opacity = isVisible ? (offset === 0 ? 1 : (Math.abs(offset) === 1 ? 0.75 : 0.4)) : 0;   
            
            const scale = offset === 0 ? 1.15 : (Math.abs(offset) === 1 ? 0.95 : 0.85);         
            
            card.style.transform = `translateY(${translateY}px) translateZ(${translateZ}px) rotateZ(${rotateZ}deg) scale(${scale})`;
            card.style.opacity = opacity;
            card.style.pointerEvents = isVisible ? "auto" : "none";
            card.style.zIndex = 100 - Math.abs(offset);
        }

        const realIndex = activeIndex % count;
        const currentItem = RAW_ITEMS[realIndex];
        titleEl.textContent = currentItem.title;
        descEl.textContent = currentItem.description;
        tagEl.textContent = currentItem.tag;

        const dots = dotsContainer.children;
        for (let i = 0; i < count; i++) {
            dots[i].classList.toggle("active", i === realIndex);
        }

        // Teleport activeIndex seamlessly to middle set
        if (animated) {
            isTransitioning = true;
            setTimeout(() => {
                if (activeIndex < count) {
                    activeIndex += count;
                    updateCarousel(false); // Teleport back to middle set without animation
                } else if (activeIndex >= count * 2) {
                    activeIndex -= count;
                    updateCarousel(false);
                }
                isTransitioning = false;
            }, 700);
        }
    }

    // Auto-rotate every 4.5 seconds
    setInterval(() => {
        if (!isTransitioning) {
            activeIndex++;
            updateCarousel(true);
        }
    }, 4500);

    initCarousel();

    rotatorChamber.addEventListener("wheel", (e) => {
        e.preventDefault();
        if (isTransitioning) return;

        if (e.deltaY > 0) {
            activeIndex++;
            updateCarousel(true);
        } else if (e.deltaY < 0) {
            activeIndex--;
            updateCarousel(true);
        }
    }, { passive: false });
});