const table = document.getElementById("cartTable");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.forEach((product, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${product.title}</td>
            <td>$${product.price}</td>
            <td>
                <input type="number" value="${product.qty}" data-index="${index}">
            </td>
            <td>$${product.price * product.qty}</td>
            <td><button data-index="${index}">Remove</button></td>

        `;
    table.appendChild(row);
});

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", event => {

        const index = event.target.dataset.index;

        cart.splice(index, 1);

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();

    });

});

document.querySelectorAll("input[type='number']").forEach(input => {

    input.addEventListener("change", event => {

        const index = event.target.dataset.index;

        const newQty = Number(event.target.value);

        cart[index].qty = newQty;

        localStorage.setItem("cart", JSON.stringify(cart));

        location.reload();

    });

});

function updatedTotal(){
    let total = 0;

    cart.forEach(product => {
        total += product.price * product.qty;
    });

    document.getElementById("total").textContent = "Total: $"+total.toFixed(2);
}

updatedTotal();