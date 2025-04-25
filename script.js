//Add event listeners
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("buyBtn").disabled = false;
    document.getElementById("applyFavouritesBtn").disabled = false;
    document.getElementById("clearCartBtn").disabled = false;
    document.getElementById("clearFavsBtn").disabled = false;
});

// Adds a product with its price to the cart in localStorage
function addToCart(product, price) {
    // Retrieve the current cart from localStorage or initialize an empty 
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Add the new product and price to the cart array
    cart.push({ name: product, price: price });
    // Save the updated cart back to localStorage 
    localStorage.setItem('cart', JSON.stringify(cart));
    // Notify the user that the item was added
    alert(product + " added to cart!");
}

// Adds a product to the favourites list in localStorage
function addToFavourites(product, price) {
    // Retrieve the current favourites from localStorages or initialize an empty array if none
    let favs = JSON.parse(localStorage.getItem('favourites')) || [];
    // Check if the item is already in favourites to avoid duplicates
    if (!favs.some(item => item.name === product)) {
        // Add the product if it's 
        
        favs.push({name: product, price: price});
        localStorage.setItem('favourites', JSON.stringify(favs));
        alert(product + " added to favourites!");
    }
}

function applyFavourites() {
    let favs = JSON.parse(localStorage.getItem('favourites')) || [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    favs.forEach(fav => {
        let exists = cart.some(item => item.name === fav.name);
        if (!exists) {
            cart.push(fav);
        }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Favourites applied to cart!");
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    const cartList = document.getElementById('cart-items');
    if (cartList) {
        cartList.innerHTML = '';

        cart.forEach((item, index) => {
            total += item.price;

            const li = document.createElement('li');
            li.innerHTML = `
                ${item.name} - Rs${item.price.toFixed(2)} 
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;

            cartList.appendChild(li);
        });

        document.getElementById('total').textContent = "Total: Rs." + total.toFixed(2);

        // Add click listeners for remove buttons
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = parseInt(this.dataset.index);
                cart.splice(index, 1); // remove the item
                localStorage.setItem('cart', JSON.stringify(cart)); // update localStorage
                loadCart(); // re-render the cart
            });
        });
    }
}


//function to clear the cart
function clearCart() {
    // clear items from the cart
    localStorage.removeItem('cart');
    location.reload();
}

function buyNow() {
    window.location.href = 'checkout.html';
}

window.onload = function () {
    if (document.getElementById('cart-items')) {
        loadCart();
    }
};

function clearFavourites() {
    localStorage.removeItem('favourites');
    alert("Favourites cleared!");
    location.reload(); // optional: refresh the page
}