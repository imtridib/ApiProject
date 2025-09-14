
// Load all categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => {
      displayCategories(data.categories);
    })
    .catch((error) => console.log(error));
};

// Remove active class from category buttons
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

// Load all pets
const loadPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayPets(data.pets))
    .catch((error) => console.log(error));
};

// Load pets by category
const loadPetByCategory = (categoryName) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();

      const activeBtn = document.getElementById(`btn-${categoryName}`);
      if (activeBtn) {
        activeBtn.classList.add("active");
      }

      displayPets(data.data); // API returns pets inside "data"
    })
    .catch((error) => console.log(error));
};

// Display categories dynamically
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories");
  categoriesContainer.innerHTML = ""; // clear previous

  categories.forEach((item) => {
    const categoryId = item.category;

    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
      <button id="btn-${categoryId}" 
              onclick="loadPetByCategory('${categoryId}')" 
              class="category-btn px-4 py-2 w-56 h-20 bg-[rgba(14,122,129,0.15)] hover:bg-teal-600 text-black text-2xl border border-black rounded-lg mb-4 flex items-center justify-center gap-2 transition">
        <img src="${item.category_icon}" alt="${item.category}" class="w-12 h-12"/>
        ${item.category} 
      </button>
    `;
    categoriesContainer.append(buttonContainer);
  });
};

// Display pets in grid
const displayPets = (pets) => {
  const petContainer = document.getElementById("pets");
  petContainer.innerHTML = "";

  // ✅ Grid wrapper
  const grid = document.createElement("div");
  grid.className =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full";
  petContainer.appendChild(grid);

  if (!pets || pets.length === 0) {
    petContainer.innerHTML = `
      <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center col-span-full">
        <img src="assets/icon.png" class="w-20 h-20"/>
        <h2 class="text-center text-2xl font-bold">
          No Pets Available
        </h2>
      </div>`;
    return;
  }

  pets.forEach((pet) => {
    const card = document.createElement("div");
    card.className =
      "bg-white border rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition flex flex-col";

    card.innerHTML = `
      <!-- Image -->
      <div class="h-48 w-full overflow-hidden">
        <img src="${pet.image}" alt="pets" class="w-full h-full object-cover" />
      </div>

      <!-- Info -->
      <div class="p-4 flex flex-col gap-2 flex-grow">
        <h2 class="text-lg font-bold">${pet.breed}</h2>

        <p class="flex items-center gap-2 text-sm text-gray-600">
          📦 Breed: ${pet.breed}
        </p>
        <p class="flex items-center gap-2 text-sm text-gray-600">
          🎂 Birth: ${pet.date_of_birth}
        </p>
        <p class="flex items-center gap-2 text-sm text-gray-600">
          ⚥ Gender: ${pet.gender}
        </p>
        <p class="flex items-center gap-2 text-sm font-semibold text-gray-800">
          💲 Price: ${pet.price}$
        </p>
      </div>

      <!-- Buttons -->
      <div class="flex justify-between gap-2 p-4 border-t">
        <!-- Like button -->
        <button onclick="toggleLike(this)" 
                class="w-10 h-10 flex items-center justify-center rounded-lg border hover:bg-gray-100">
          <img src="images/like.png" class="w-6 h-6" alt="like" />
        </button>

        <!-- Adopt button -->
        <button class="flex-1 border rounded-lg px-3 py-2 flex items-center justify-center gap-1 text-sm font-medium hover:bg-gray-100">
          👍 Adopt
        </button>

        <!-- Details button -->
        <button class="flex-1 border rounded-lg px-3 py-2 flex items-center justify-center gap-1 text-sm font-medium hover:bg-gray-100">
          📄 Details
        </button>
      </div>
    `;
    grid.append(card);
  });
};

// ✅ Like button toggle function
const toggleLike = (btn) => {
  const img = btn.querySelector("img");
  const liked = img.getAttribute("data-liked") === "true";

  if (liked) {
    img.src = "images/like.png"; // default
    img.setAttribute("data-liked", "false");
  } else {
    img.src = "images/liked.png"; // filled heart/thumb (make sure this exists)
    img.setAttribute("data-liked", "true");
  }
};

// Load all on page start
loadPets();
loadCategories();
