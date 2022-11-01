var countryFlag = {
    "India": "../img/Home-page/india.png",
    "USA": "../img/Home-page/USA.png",
    "UAE": "../img/Home-page/uae.png",
    "CANADA": "../img/Home-page/canada.png"
};

var countrySc = {
    "India": "+91 9838203708",
    "USA": "+1 9838203708",
    "UAE": "+971 9838203708",
    "CANADA": "+1 9838203799"
};

window.addEventListener("scroll", function () {
    var header = document.getElementById("header");
    header.classList.toggle("sticky", window.scrollY > 0);
});

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};



// Adding Items to cart

let shop = document.getElementById('shop');



let basket = JSON.parse(localStorage.getItem("data")) || [];

let basketW = JSON.parse(localStorage.getItem("Data")) || [];


let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x)=>{
        let {id, name, price, priceAfterDiscount, img} = x;
        let search = basket.find((x) => x.id === id) || [];
        
        return `
        <div class="d-block mt-15">
        <div id=product-id-${id} class="p-card">
            <div class="p-card-image"><img src=${img} alt=""></div>
            <p>${name}</p>
            <div class="margin-top--14">
                <span>Rs ${priceAfterDiscount}</span><del>Rs ${price}</del><span>(60% Off)</span>
            </div>
            <div class="p-card-stars"><i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-regular fa-star"></i>
            </div>
            <div class="hover-icons d-flex">
                <div onclick="wishUp(${id})" class="icons-round"><i class="fa-solid fa-heart heart"></i></div>
                <div class="icons-round"><a href="./Product-view-page-1.html"><i class="fa-solid fa-eye eye"></i></a></div>
                <div onclick="increment(${id})" class="icons-round"><i class="fa-solid fa-cart-arrow-down kart"></i></div>
            </div>
            <div class="d-flex product-quantity align-items-center justify-content-center">
            <div><i onclick="decrement(${id})" class="bi bi-dash-lg"></i></div>
            <div id=${id}>
            ${search.item === undefined? 0: search.item}
            </div>
            <div><i onclick="increment(${id})" class="bi bi-plus-lg"></i></div>
        </div>
        </div>
    </div>
        `
    }).join(""));
};

generateShop();

let increment = (id) => {
    let selectedItem = id;

    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }else{
        search.item += 1;
    }

    // console.log(basket);

    update(selectedItem.id);

    localStorage.setItem("data", JSON.stringify(basket));
    
};

let wishUp = (id) => {
    let selectedItemW = id;

    let searchW = basket.find((x) => x.id === selectedItemW.id);

    if (searchW === undefined){
        basketW.push({
            id: selectedItemW.id,
            item: 1,
        });
    }else{}

    // console.log(basket);
    updateW(selectedItemW.id);

    localStorage.setItem("Data", JSON.stringify(basketW));
    
};

let updateW = (id) => {
    let searchW = basketW.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML=searchW.item;
    calculationWishlist();
};


let decrement = (id) => {
    let selectedItem = id;

    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else{
        search.item -= 1;
    }

    // console.log(basket);
    
    update(selectedItem.id);
    
    basket = basket.filter((x) => x.item !== 0);

    localStorage.setItem("data", JSON.stringify(basket));

};
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML=search.item;
    calculation();
};

let calculation = () => {
    let cartIcon = document.getElementById("cart-amount");
    // cartIcon.innerHTML = 100;
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);
    // console.log();
}

calculation();


let calculationWishlist = () => {
    // console.log();
    let wishlistItem = document.getElementById("wishlist-item");
    // cartIcon.innerHTML = 100;
    wishlistItem.innerHTML = basketW.map((x) => x.item).reduce((x,y) => x+y, 0);
}

calculationWishlist();