let data = [
  {
    id: 1,
    name: "SBGX353G",
    img: "./SBGX353G.png",
    price: 115000,
    cat: "Dress",
  },
  {
    id: 11,
    name: "SBGW281G",
    img: "./SBGW281G.png",
    price: 115000,
    cat: "Dress",
  },
  {
    id: 2,
    name: "SBGY009G",
    img: "./SBGY009G.png",
    price: 130000,
    cat: "Luxury",
  },
  {
    id: 3,
    name: "SBGH273G",
    img: "./SBGH273G.png",
    price: 95000,
    cat: "Casual",
  },
  {
    id: 4,
    name: "SBGM247G",
    img: "./SBGM247G.png",
    price: 120000,
    cat: "Sprot",
  },
  {
    id: 5,
    name: "SBGE283G",
    img: "./SBGE283G.png",
    price: 89000,
    cat: "Casual",
  },
];

let productContainer = document.querySelector(".products");
let searchInput = document.querySelector(".search");
let categoriesContainer = document.querySelector(".cats");
let priceRange = document.querySelector(".priceRange");
let priceValue = document.querySelector(".priceValue");

let displayProducts = (filteredProducts) => {
  productContainer.innerHTML = filteredProducts
    .map(
      (product) =>
        `
      <div class="product">
      <img
      src=${product.img}
      alt=""
      />
      <span class="name">${product.name}</span>
      <span class="priceText">$${product.price}</span>
    </div>
  `
    )
    .join("");
};

displayProducts(data);

searchInput.addEventListener("keyup", (e) => {
  let value = e.target.value.toLowerCase();

  if (value) {
    displayProducts(
      data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1)
    );
  } else {
    displayProducts(data);
  }
});

let setCategories = () => {
  let allCats = data.map((item) => item.cat);
  let categories = [
    "All",
    ...allCats.filter((item, i) => {
      return allCats.indexOf(item) === i;
      /*
      dress  0  0 
      dress  1  0
      luxury 2  2
      casual 3  3
      sport  4  4
      casual 5  3
      以第二個dress為例 : item = dress , i = 1,
      但indexOf(dress) = 0 != i
      */
    }),
  ];

  categoriesContainer.innerHTML = categories
    .map(
      (cat) => `
  <span class="cat">${cat}</span>`
    )
    .join("");

  categoriesContainer.addEventListener("click", (e) => {
    let selectedCat = e.target.textContent;

    selectedCat === "All"
      ? displayProducts(data)
      : displayProducts(data.filter((item) => item.cat === selectedCat));
  });
};

let setPrices = () => {
  let priceList = data.map((item) => item.price);
  let minPrice = Math.min(...priceList);
  let maxPrice = Math.max(...priceList);

  priceRange.min = minPrice;
  priceRange.max = maxPrice;
  priceRange.value = maxPrice;
  priceValue.textContent = "$" + maxPrice;

  priceRange.addEventListener("input", (e) => {
    priceValue.textContent = "$" + e.target.value;
    displayProducts(data.filter((item) => item.price <= e.target.value));
  });
};

setCategories();
setPrices();
