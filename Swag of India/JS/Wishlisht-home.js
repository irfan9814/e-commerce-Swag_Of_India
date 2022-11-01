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

let shop = document.getElementById('wishlist');

let eye = document.getElementById('wishlist-eye')



let basket = JSON.parse(localStorage.getItem("data")) || [];


let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x)=>{
        let {id, name, price, priceAfterDiscount, img} = x;
        let search = basket.find((x) => x.id === id) || [];
        
        return ``
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
    let wishlistIcon = document.getElementById("wishlist-item");
    // cartIcon.innerHTML = 100;
    wishlistIcon.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);
    // console.log();
}

calculation();