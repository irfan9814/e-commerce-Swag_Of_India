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



let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');
let clearAll = document.getElementById('clear-all');
let priceDetail = document.getElementById('price-detail');
let bagDiscount = document.getElementById('bag-discount');
let orderTotal = document.getElementById('order-total');
let total = document.getElementById('total');
let deliveryCharge = document.getElementById('delivery-charge');


let basket = JSON.parse(localStorage.getItem("data")) || [];

let basketW = JSON.parse(localStorage.getItem("Data")) || [];

let calculationWishlist = () => {
    // console.log();
    let wishlistItem = document.getElementById("wishlist-item");
    // cartIcon.innerHTML = 100;
    wishlistItem.innerHTML = basketW.map((x) => x.item).reduce((x,z) => x+z, 0);
}

calculationWishlist();

let calculation = () => {
    let cartIcon = document.getElementById("cart-amount");
    // cartIcon.innerHTML = 100;
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
    // console.log();
}

calculation();

let generateCartItems = () => {
    if (basketW.length !== 0) {
        return (shoppingCart.innerHTML = basketW.map((x) => {
            let {
                id,
                item
            } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return `
            <div class="product-card">
                    <div class="product-sub-card d-flex">
                        <div class="p-image"><img src=${search.img} alt=""></div>
                        <div class="d-flex">
                            <div class="product-d-2 mt-20">
                                <p>${search.name}</p>
                                <div class="product-d">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <span>(2850)</span>
                                    <p class="product-color">Color: Multicolor</p>
                                    <div class="seller-name">Seller: Krishna Pooja Bhandar</div>
                                    <div class="product-price"><span>Rs ${search.priceAfterDiscount}</span><del>Rs ${search.price}</del><span>(60%
                                            Off)</span>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="d-flex product-quantity align-items-center justify-content-center">
                                        <div><i onclick="decrement(${id})" class="bi bi-dash-lg"></i></div>
                                        <div id=${id}>0</div>
                                        <div><i onclick="increment(${id})" class="bi bi-plus-lg"></i></div>
                                    </div>
                                </div>
                                <div class="Rem-Wish d-flex">
                                    <div class="remove">Add to Cart</div>
                                    <div>|</div>
                                    <div onclick = "removeItem(${id})">Remove from Wishlist</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            `
        }).join(""));

    } else {
        shoppingCart.innerHTML = `
        <div class="product-card">
        <div class="d-flex"><div class="empty">EMPTY</div> <div class="cart-size"><i class="bi bi-cart-x"></i></div></div>
            <a class="add-items-a" href="./index.html">
                <div class="add-items">
                    Add Items
                </div>
            </a>
            </div>
        `;

    }
};

generateCartItems();

let increment = (id) => {
    let selectedItem = id;

    let search = basketW.find((x) => x.id === selectedItem.id);

    if (search === undefined){
        basketW.push({
            id: selectedItem.id,
            item: 1,
        });
    }else{
    }

    generateCartItems();

    update(selectedItem.id);

    localStorage.setItem("Data", JSON.stringify(basketW));
    
};
let decrement = (id) => {
    let selectedItem = id;

    let search = basketW.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else{
        search.item -= 1;
    }

    // console.log(basket);
    
    update(selectedItem.id);
    
    basketW = basketW.filter((x) => x.item !== 0);

    generateCartItems();

    localStorage.setItem("Data", JSON.stringify(basketW));

};
let update = (id) => {
    let search = basketW.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML=search.item;
    calculation();
    totalAmount();
};


let removeItem = (id) => {
    let selectedItem =id;
    // console.log(selectedItem.id);
    basketW = basketW.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    calculationWishlist();
    localStorage.setItem("Data", JSON.stringify(basketW));
};


let clearCart = () => {
    basketW = [];
    generateCartItems();
    calculationWishlist();
    localStorage.setItem("Data", JSON.stringify(basketW));
}


