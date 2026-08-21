document.addEventListener("DOMContentLoaded", async function () {
  const tipsGrid = document.getElementById("tipsGrid");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // Modal elements
  const modal = document.getElementById("tipModal");
  const modalClose = document.getElementById("modalClose");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalLink = document.getElementById("modalLink");

  let tipsData = [];

  // Step 1: Fetch content from JSON
  try {
    const response = await fetch("../data/wellness-tips.json");
    if (!response.ok) throw new Error("Failed to load JSON data.");
    tipsData = await response.json();
    renderCards(tipsData);
  } catch (error) {
    console.error("Error loading tips:", error);
    if (tipsGrid) {
      tipsGrid.innerHTML = "<p>Unable to load wellness tips at this time.</p>";
    }
    return;
  }

  // Step 2: Render cards dynamically
  function renderCards(data) {
    tipsGrid.innerHTML = "";
    data.forEach(item => {
      const card = document.createElement("div");
      card.className = `tip-card filterDiv ${item.category}`;
      card.setAttribute("data-id", item.id);

      card.innerHTML = `
        <div class="tip-image-box">
          <img src="${item.image}" alt="${item.alt}">
        </div>
        <div class="tip-content">
          <h2>${item.title}</h2>
          <p>${item.shortDescription}</p>
        </div>
      `;

      // Add event listener to trigger modal on card click
      card.addEventListener("click", () => openModal(item));
      tipsGrid.appendChild(card);
    });
  }

  // Step 3: Handle Filter buttons
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener("click", function () {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");

        const selectedCategory = this.getAttribute("data-filter");
        const cards = document.querySelectorAll(".filterDiv");

        cards.forEach(card => {
          if (selectedCategory === "all" || card.classList.contains(selectedCategory)) {
            card.style.display = "flex";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  // Step 4: Modal logic functions
  function openModal(item) {
    modalImage.src = item.image;
    modalImage.alt = item.alt;
    modalTitle.textContent = item.title;
    modalDescription.textContent = item.modalDescription;
    modalLink.href = item.link;

    modal.classList.add("open");
  }

  function closeModal() {
    modal.classList.remove("open");
  }

  // Close modal via close button or clicking outside overlay
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
});