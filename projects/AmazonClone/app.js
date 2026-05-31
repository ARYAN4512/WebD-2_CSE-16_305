// Shopping Cart Management
class ShoppingCart {
  constructor() {
    this.items = this.loadFromStorage();
    this.init();
  }

  init() {
    this.attachEventListeners();
    this.updateCartCount();
    this.loadDarkModePreference();
  }

  // Add item to cart
  addToCart(id, name, price, image) {
    const existingItem = this.items.find(item => item.id === id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ id, name, price, image, quantity: 1 });
    }
    
    this.saveToStorage();
    this.updateCartCount();
    this.showNotification(`${name} added to cart!`);
  }

  // Remove item from cart
  removeFromCart(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.saveToStorage();
    this.updateCartCount();
    this.renderCart();
  }

  // Update quantity
  updateQuantity(id, quantity) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.saveToStorage();
      this.renderCart();
    }
  }

  // Get total price
  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // Save to localStorage
  saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  // Load from localStorage
  loadFromStorage() {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  }

  // Update cart count in navbar
  updateCartCount() {
    const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
    const cartBadge = document.getElementById('cartCount');
    if (cartBadge) {
      cartBadge.textContent = count;
      cartBadge.style.display = count > 0 ? 'inline' : 'none';
    }
  }

  // Render cart modal
  renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems) return;

    if (this.items.length === 0) {
      cartItems.innerHTML = '<p class="text-center text-muted my-4">Your cart is empty</p>';
      cartTotal.innerHTML = '<strong>Total: ₹0</strong>';
      return;
    }

    cartItems.innerHTML = this.items.map(item => `
      <div class="cart-item d-flex justify-content-between align-items-center p-3 border-bottom">
        <div class="d-flex align-items-center flex-grow-1">
          <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: contain; margin-right: 15px;">
          <div>
            <h6 class="mb-1">${item.name}</h6>
            <p class="mb-0 text-muted">₹${item.price.toLocaleString()}</p>
          </div>
        </div>
        <div class="d-flex align-items-center gap-2">
          <input type="number" min="1" value="${item.quantity}" class="form-control" style="width: 60px;" onchange="cart.updateQuantity(${item.id}, this.value)">
          <button class="btn btn-sm btn-danger" onclick="cart.removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    `).join('');

    const total = this.getTotal();
    cartTotal.innerHTML = `<strong>Total: ₹${total.toLocaleString()}</strong>`;
  }

  // Show notification
  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success alert-dismissible fade show position-fixed';
    notification.style.cssText = 'top: 80px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // Attach event listeners to Add to Cart buttons
  attachEventListeners() {
    document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const { id, name, price, image } = btn.dataset;
        this.addToCart(parseInt(id), name, parseFloat(price), image);
      });
    });
  }

  // Dark Mode Toggle
  toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
  }

  loadDarkModePreference() {
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
    }
  }

  // Newsletter Signup
  setupNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        if (!this.validateEmail(email)) {
          alert('Please enter a valid email address');
          return;
        }
        
        form.reset();
        this.showNotification('✓ Successfully subscribed to our newsletter!');
      });
    }
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}

// Initialize cart when DOM is ready
let cart;
document.addEventListener('DOMContentLoaded', () => {
  cart = new ShoppingCart();
  cart.setupNewsletter();
  
  // Setup cart modal listener
  const cartModal = document.getElementById('cartModal');
  if (cartModal) {
    cartModal.addEventListener('show.bs.modal', () => {
      cart.renderCart();
    });
  }
});

// Dark mode stylesheet (injected dynamically)
const style = document.createElement('style');
style.innerHTML = `
  body.dark-mode {
    background-color: #1a1a1a;
    color: #e0e0e0;
  }
  body.dark-mode .navbar {
    background-color: #0a0a0a !important;
  }
  body.dark-mode .card {
    background-color: #2a2a2a;
    color: #e0e0e0;
    border-color: #444;
  }
  body.dark-mode .hero {
    background: linear-gradient(90deg, rgba(5,10,30,0.95) 0%, rgba(30,40,80,0.92) 100%) !important;
  }
  body.dark-mode .footer {
    background-color: #0a0a0a !important;
  }
  body.dark-mode .section-title {
    color: #fff;
  }
  body.dark-mode bg-white {
    background-color: #2a2a2a !important;
  }
  body.dark-mode .text-muted {
    color: #999 !important;
  }
`;
document.head.appendChild(style);
