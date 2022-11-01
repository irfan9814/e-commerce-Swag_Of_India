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



let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');
let clearAll = document.getElementById('clearAll');
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
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket.map((x) => {
            let {
                id,
                item
            } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return `
            <div class="product-card">
            <div class="product-sub-card d-flex">
                <div class="p-image"><img src= ${search.img} alt=""></div>
                <div class="d-flex">
                    <div class="product-d">
                        <p>${search.name}</p>
                        <p class="product-color">Color: Multicolor</p>
                        <div class="seller-name">Seller: Krishna Pooja Bhandar</div>
                        <div class="product-price"><span>Rs ${search.priceAfterDiscount}</span><del>Rs ${search.price}</del><span>(60% Off)</span>
                        </div>
                        <div class="d-flex">
                            <div>
                                <form action="#">
                                    <select class="size" name="" id="size">
                                        <option value="one-size">Size: One size</option>
                                        <option value="one-size">Size: Two size</option>
                                        <option value="one-size">Size: Three size</option>
                                    </select>
                                </form>
                            </div>
                            <div class="d-flex product-quantity align-items-center justify-content-center">
                                <div><i onclick="decrement(${id})" class="bi bi-dash-lg"></i></div>
                                <div id=${id}>${item}</div>
                                <div><i onclick="increment(${id})" class="bi bi-plus-lg"></i></div>
                            </div>
                        </div>
                        <div class="exp-del">
                            Delivery in 4-6 days
                        </div>
                    </div>
                    <div class="sub-total-each">
                        Rs ${item * search.priceAfterDiscount}
                    </div>
                </div>
            </div>
            <div class="Rem-Wish d-flex">
                <div onclick = "removeItem(${id})" >Remove</div>
                <div>|</div>
                <div>Move to Wishlist</div>
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
        label.innerHTML = ``;

        priceDetail.innerHTML = `
        ${0}
        `;

        bagDiscount.innerHTML =`
        ${0}
        `;

        orderTotal.innerHTML = `
        ${Math.round(0)}
        `;

        total.innerHTML = `
        ${Math.round(0)}
        `;

        deliveryCharge.innerHTML = `NA`;



    }
};

generateCartItems();

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

    generateCartItems();

    update(selectedItem.id);

    localStorage.setItem("data", JSON.stringify(basket));
    
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

    generateCartItems();

    localStorage.setItem("data", JSON.stringify(basket));

};
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML=search.item;
    calculation();
    totalAmount();
};


let removeItem = (id) => {
    let selectedItem =id;
    // console.log(selectedItem.id);
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};


let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}

let totalAmount = () => {
    if (basket.length !== 0){
        let amount = basket.map((x) => {
            let {item, id} = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.priceAfterDiscount;
        }).reduce((x,y) => x + y , 0);

        label.innerHTML =`
        Total: Rs. ${amount}
        `;

        clearAll.innerHTML=`
        <p onclick="clearCart()">(CLEAR ALL)</p>
        `;

        priceDetail.innerHTML = `
        ${amount}
        `;

        bagDiscount.innerHTML =`
        ${Math.round(0.1 * amount)}
        `;

        orderTotal.innerHTML = `
        ${Math.round(amount - (0.1 * amount))}
        `;

        total.innerHTML = `
        ${Math.round(amount - (0.1 * amount))}
        `;

        deliveryCharge.innerHTML = 
        `<del>Rs 99</del><span class="c-green mt-5">Free</span>`
        ;

        // console.log(amount);
    }
    else return;
}

totalAmount();

