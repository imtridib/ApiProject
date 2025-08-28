const loadCategories = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => {
      console.log(data); // Debug: see what comes back
      displayCategories(data.categories);
    })
    .catch((error) => console.log(error));
};





const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories");
  categoriesContainer.innerHTML = ""; // clear previous

  categories.forEach((item) => {
    console.log(item);
    // create a button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
      <button id="btn-${item.id}" 
              onclick="loadCategoryVideos(${item.id})" 
              class="px-4 py-2 w-56 h-20 bg-rgba(14, 122, 129, 0.15) hover:bg-teal-600 text-black text-2xl border-1 border-black rounded-lg mb-4">
              <img src="${item.category_icon}" alt="${item.category}" class="w-12 h-12 inline-block mr-2"/>
        ${item.category} 
      </button>
    `;
    // add button to category container
    categoriesContainer.append(buttonContainer);
  });
};

// call it once page loads
loadCategories();
