const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
let productData;

const url = `https://fakestoreapi.com/products/${productId}`; 
      
fetch(url)
  .then(response => response.json())
  .then(product => {
      productData = product;

      const div = document.getElementById("productDetails");

      div.innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.image}" width="200">
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        
    `;
        
});

document.getElementById("addToCartBtn").addEventListener("click", () => {
    const qty = document.getElementById("quantity").value;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const item = {
       id: productData.id,
       title: productData.title,
       price: productData.price,
       qty: qty
    };

    cart.push(item);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");

});