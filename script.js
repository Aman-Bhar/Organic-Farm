let cart = JSON.parse(localStorage.getItem('cart')) || {};

const cartPanel = document.getElementById("cart");
const cartCount = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

document.getElementById("cart-icon").addEventListener("click", () => {
  cartPanel.classList.toggle("visible");
});

document.getElementById("close-cart").addEventListener("click", () => {
  cartPanel.classList.remove("visible");
});

document.querySelectorAll(".increase").forEach(btn => {
  btn.addEventListener("click", () => {
    let qty = btn.parentElement.querySelector(".quantity");
    qty.textContent = parseInt(qty.textContent) + 1;
  });
});

document.querySelectorAll(".decrease").forEach(btn => {
  btn.addEventListener("click", () => {
    let qty = btn.parentElement.querySelector(".quantity");
    let value = parseInt(qty.textContent);
    if (value > 1) qty.textContent = value - 1;
  });
});

document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.parentElement;
    const name = card.getAttribute("data-name");
    const price = parseInt(card.getAttribute("data-price"));
    const quantity = parseInt(card.querySelector(".quantity").textContent);

    if (cart[name]) {
      cart[name].quantity += quantity;
    } else {
      cart[name] = { price, quantity };
    }

    saveCartToStorage();
    updateCartUI();
  });
});

function updateCartUI() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  let count = 0;

  for (let item in cart) {
    const { price, quantity } = cart[item];
    total += price * quantity;
    count += quantity;

    const itemDiv = document.createElement("div");
    itemDiv.textContent = `${item} - ₹${price} x ${quantity}`;
    cartItemsContainer.appendChild(itemDiv);
  }

  cartTotal.textContent = total;
  cartCount.textContent = count;
}

function saveCartToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty. Please add items before checking out.");
    return;
  }

  const confirmCheckout = confirm("Are you sure you want to checkout?");
  if (confirmCheckout) {
    alert("✅ Your order has been placed successfully!\nThank you for shopping at GreenBasket.");
    cart = {};
    saveCartToStorage();
    updateCartUI();
    cartPanel.classList.remove("visible");
  }
});

document.getElementById("pay-btn").addEventListener("click", () => {
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty. Please add items before making a payment.");
    return;
  }

  alert("🧾 Processing payment...\n💳 Dummy payment successful!");
  cart = {};
  saveCartToStorage();
  updateCartUI();
  cartPanel.classList.remove("visible");
});

updateCartUI();
document.getElementById('contact-btn').addEventListener('click', () => {
  alert('Thank you for reaching out! Please email us at contact@organicveggies.in');
});

