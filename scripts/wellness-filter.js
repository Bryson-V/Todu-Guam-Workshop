
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const tipCards = document.querySelectorAll(".filterDiv");

  // Guard clause: Exit if filter buttons aren't present on this page
  if (filterButtons.length === 0) return;

  filterButtons.forEach(button => {
    button.addEventListener("click", function () {
      
      // Step 1: Manage active state styling on the buttons
      filterButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");

      // Step 2: Grab the target category attribute from the clicked button
      const selectedCategory = this.getAttribute("data-filter");

      // Step 3: Loop through cards and show/hide based on category match
      tipCards.forEach(card => {
        if (selectedCategory === "all" || card.classList.contains(selectedCategory)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});