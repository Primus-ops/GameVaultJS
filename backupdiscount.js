document.addEventListener("DOMContentLoaded", function () {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const table = document.getElementById("orderSummary");
  
    let total = 0;
  
    function addRow(item, isFavourite = false) {
      const price = item.price || 0;
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.name || item} ${isFavourite ? "❤️" : ""}</td>
        <td>1</td>
        <td>£${price.toFixed(2)}</td>
      `;
      table.appendChild(row);
      total += price;
    }
  
    // Add cart items
    cartItems.forEach(item => addRow(item));
  
    // Discount logic
    const summaryRow = document.createElement("tr");
    summaryRow.innerHTML = `<td colspan="2" style="text-align:right;"><strong>Total:</strong></td>
                            <td><strong>£${total.toFixed(2)}</strong></td>`;
    table.appendChild(summaryRow);
  
    if (total > 100) {
      const discount = total * 0.2;
      const discountedTotal = total - discount;
  
      const discountRow = document.createElement("tr");
      discountRow.innerHTML = `<td colspan="2" style="text-align:right;">20% Discount:</td>
                               <td>-£${discount.toFixed(2)}</td>`;
      table.appendChild(discountRow);
  
      const finalRow = document.createElement("tr");
      finalRow.innerHTML = `<td colspan="2" style="text-align:right;"><strong>Final Total:</strong></td>
                            <td><strong>£${discountedTotal.toFixed(2)}</strong></td>`;
      table.appendChild(finalRow);
    }
  });