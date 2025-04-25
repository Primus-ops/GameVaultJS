// Wait for the DOM content to be fully loaded before running this script
document.addEventListener("DOMContentLoaded", function () {

  //Get the cart and favourites from localStorage or initialize them as empty
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const favouriteItems = JSON.parse(localStorage.getItem("favourites")) || [];

  //Get the reference to the table where order summary will be displayed 
  const table = document.getElementById("orderSummary");

  //Initialize total price for cart items
  let total = 0;

  // Function to add a row in the table
  function addRow(item, isFavourite = false) {
    //Create a new table row element 
    const row = document.createElement("tr");

    //Get item price (fallback to 0 if undefined)
    const itemPrice = item.price || 0;

    //if it's not a favourite item, add its price to the total
    if (!isFavourite) total += itemPrice;

    //Add the row content to display item  details in the table 
    row.innerHTML = `
      <td>${item.name || item} ${isFavourite ? "❤" : ""}</td>
      <td>1</td>
      <td>LKR ${item.price.toLocaleString()}</td>
    `;

    //Apppend the row to the order summary table
    table.appendChild(row);
  }

  // Loop through each cart item and display it in the table
  if (cartItems.length > 0) {
    cartItems.forEach(item => addRow(item));
  }

   // Create a list of names in the cart for easy comparison
   const cartNames = cartItems.map(item => item.name);

   // Filter favourites to only include those not already in the cart
   const filteredFavourites = favouriteItems.filter(
     fav => !cartNames.includes(fav.name)
   );
 
   // If there are any favourites not in the cart, display them separately
   if (filteredFavourites.length > 0) {
     // Create and add a "Favourites" section header
     const favHeader = document.createElement("tr");
     favHeader.innerHTML = `
       <td colspan="3" style="font-weight: bold; padding-top: 10px;">Favourites ❤</td>
     `;
     table.appendChild(favHeader);
 
     // Loop through the filtered favourites and add each to the table
     filteredFavourites.forEach(item => {
       addRow(item, false); // Pass true to mark it as a favourite
     });
   }

//Discount program
   document.getElementById("calculateLKRDiscount").addEventListener("click", function (e) {
    e.preventDefault();
  
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
  
    cart.forEach(item => {
      total += item.price;
    });
  
    let discountedTotal = total;
    let message = "No discount applied.";
  
    if (total > 300000) {
      discountedTotal = total * 0.8;
      message = " 20% discount applied!";
    }
  
    document.getElementById("discountOutput").innerHTML = `
      <p>Total before discount: LKR ${total.toLocaleString()}</p>
      <p>${message}</p>
      <p><strong>Final Amount: LKR ${discountedTotal.toLocaleString()}</strong></p>
    `;
  });

    // Handle checkout form submission
    const checkoutForm = document.getElementById("checkoutform");

    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent actual form submission
  
      // Optionally, you could validate or collect the data here
  
      alert("Payment successful! Your order has been placed."); // Confirmation message
  
      // Clear the cart and favourites after payment
      localStorage.removeItem("cart");
      localStorage.removeItem("favourites");
  
      // Redirect to home or confirmation page if needed:
      // window.location.href = "index.html";
    });  
});
