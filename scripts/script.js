const manageSpinner = (status) => {
    if(status === true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("card-section").classList.add("hidden");
    }
    else {
        document.getElementById("card-section").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

const loadCategories = async() => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/categories`;
    
    const res = await fetch(url);
    const data = await res.json();

    displayCategories(data.categories);
}

const loadAllTrees = async() => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/plants`;

    const res = await fetch(url);
    const data = await res.json();

    displayTrees(data.plants);
}

const showActive = async(id) => {
    manageSpinner(true);
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
                <button onclick="addToCart('${plant.name}', ${plant.price})" class="btn btn-block border-none bg-[#15803D] text-white font-[500] rounded-3xl">Add to Cart</button>
            </div>
            </div>
        `;
        cardsContainer.appendChild(cardDiv);
        
    });

    manageSpinner(false);
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
    
    manageSpinner(false);
}

loadCategories();
loadAllTrees();

// add cart functionality
let cartItems = [];
const addToCart = (name, price) => {
    const findCart = cartItems.find(item => item.name === name);

    if(findCart) {
        findCart.quantity++;
    }
    else {
        cartItems.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    showCart();
    updateTotal();
}

const showCart = () => {
    const cartContainer = document.getElementById("add-to-cart");
    cartContainer.innerHTML = "";

    cartItems.forEach(item => {
        const cartDiv = document.createElement("div");
        cartDiv.innerHTML = `
            <div class="p-4 rounded-xl flex justify-between items-center my-[8px] bg-[#F0FDF4]">
              <div>
                <h2 class="font-semibold">${item.name}</h2>
                <h2 class="text-gray-500">৳<span>${item.price}</span> x <span>${item.quantity}</span></h2>
              </div>
              <h2 onclick="removeFromCart('${item.name}')" class="text-gray-500 font-medium hover:text-black cursor-pointer">x</h2>
            </div>
        `;
        cartContainer.appendChild(cartDiv);
    });
}

const updateTotal = () => {
    const totalPrice = document.getElementById("total-price");
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPrice.innerText = parseInt(total);
}

const removeFromCart = (name) => {
    cartItems = cartItems.filter(item => item.name !== name);
    showCart();
    updateTotal();
}