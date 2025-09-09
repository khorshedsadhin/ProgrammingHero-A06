const loadCategories = async() => {
    const url = `https://openapi.programming-hero.com/api/categories`;
    
    const res = await fetch(url);
    const data = await res.json();

    displayCategories(data.categories);
}

const showActive = (id) => {
    removeActive();
    const clickBtn = document.getElementById(`category-btn-${id}`);
    clickBtn.classList.add("btn-active");
}
const removeActive = () => {
    const categoryButton = document.querySelectorAll(".category-btn");
    categoryButton.forEach(btn => btn.classList.remove("btn-active"));
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