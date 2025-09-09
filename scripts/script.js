const loadCategories = async() => {
    const url = `https://openapi.programming-hero.com/api/categories`;
    
    const res = await fetch(url);
    const data = await res.json();

    displayCategories(data.categories);
}

const loadAllTrees = async() => {
    const url = `https://openapi.programming-hero.com/api/plants`;

    const res = await fetch(url);
    const data = await res.json();

    displayTrees(data.plants);
}

const showActive = async(id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`;

    const res = await fetch(url);
    const data = await res.json(); 

    removeActive();
    const clickBtn = document.getElementById(`category-btn-${id}`);
    clickBtn.classList.add("btn-actives");
    displayTrees(data.plants);
}
const removeActive = () => {
    const categoryButton = document.querySelectorAll(".category-btn");
    categoryButton.forEach(btn => btn.classList.remove("btn-actives"));
}

// -----------------------------------------------------------------------------------
const displayTrees = (plants) => {
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "";

    plants.forEach(plant => {             
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
            <div class="card bg-base-100 w-full shadow-xl h-full flex flex-col">
            <figure class="px-3 pt-3 h-48">
                <img src="${plant.image}" class="rounded-xl w-full h-full object-cover" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body text-left flex-grow">
                <h2 class="card-title">${plant.name}</h2>
                <p>${plant.description}</p>

                <div class="flex justify-between items-center">
                  <button class="btn btn-active text-[#15803D] border-none rounded-3xl bg-[#DCFCE7]">${plant.category}</button>

                  <h2 class="font-semibold"><span>৳</span>${plant.price}</h2>
                </div>
            </div>
            <div class="card-actions p-4 pt-0">
                <button class="btn btn-block border-none bg-[#15803D] text-white font-[500] rounded-3xl">Add to Cart</button>
            </div>
            </div>
        `;
        cardsContainer.appendChild(cardDiv);
        
    });
}

const displayCategories = (categories) => {
    const buttonContainer = document.getElementById("button-container");
    buttonContainer.innerHTML = `
        <div>
              <a href="/" class="category-btn font-[400] block text-black hover:bg-green-600 active:bg-[#15803D] hover:text-white active:text-white pl-3 py-2 rounded-xl">
              <button class="">All Trees</button>
            </a>
        </div>
    `;
    categories.forEach(category => {
        // console.log(category.category_name);

        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <div>
                <a id="category-btn-${category.id}" onclick="showActive(${category.id})" class="category-btn font-[400] block text-black hover:bg-green-600 active:bg-[#15803D] hover:text-white active:text-white pl-3 py-2 rounded-xl">
                <button class="">${category.category_name}</button>
                </a>
            </div>
        `;
        buttonContainer.appendChild(btnDiv);
    });
}

loadCategories();
loadAllTrees();