const API = (() => {
  const URL = "http://localhost:3000";
  const getCart = async () => {
    const response = await fetch(`${URL}/cart`);
    //console.log(response.json());
    return response.json();
  };

  const getInventory = async () => {
    // define your method to get inventory data
    const response = await fetch(`${URL}/inventory`);
    //console.log(response.json());
    return response.json();
  };

  const addToCart = async (inventoryItem) => {
    // define your method to add an item to cart
    const response = await fetch(`${URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inventoryItem),
    });
    return response.json();

  };

  const updateCart = async (id, newAmount) => {
    // define your method to update an item in cart
    const response = await fetch(`${URL}/cart/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: newAmount })
    });
    return response.json();
  };

  const deleteFromCart = async (id) => {
    // define your method to delete an item in cart
    await fetch(`${URL}/cart/${id}`, {
      method: "DELETE",
    });
  };

  const checkout = () => {
    // you don't need to add anything here
    return getCart().then((data) =>
      Promise.all(data.map((item) => deleteFromCart(item.id)))
    );
  };

  return {
    getCart,
    updateCart,
    getInventory,
    addToCart,
    deleteFromCart,
    checkout,
  };
})();

const Model = (() => {
  // implement your logic for Model
  class State {
    #onChange;
    #inventory;
    #cart;
    constructor() {
      this.#inventory = [];
      this.#cart = [];
    }
    get cart() {
      return this.#cart;
    }

    get inventory() {
      return this.#inventory;
    }

    set cart(newCart) {
      this.#cart = newCart;
      this.#onChange();
    }
    set inventory(newInventory) {
      this.#inventory = newInventory;
      this.#onChange();
    }

    subscribe(cb) {
      this.#onChange = cb;
    }
  }
  const {
    getCart,
    updateCart,
    getInventory,
    addToCart,
    deleteFromCart,
    checkout,
  } = API;
  return {
    State,
    getCart,
    updateCart,
    getInventory,
    addToCart,
    deleteFromCart,
    checkout,
  };
})();

const View = (() => {
  // implement your logic for View
  // get html
  const inventoryList = document.querySelector(".inventory__list");
  const cartList = document.querySelector(".cart__list");
  const checkoutButton = document.querySelector(".checkout-btn");
  const sortButton = document.querySelector(".sort-btn");
  const sortType = document.querySelector(".sort-type");
  const renderInventory = (inventory) => {
    inventoryList.innerHTML = inventory.map((item) => {
      return `<li id="${item.id}">
          <span>${item.content}</span>
          <button class="minus-btn">-</button>
          <span class="amount">0</span>
          <button class="plus-btn">+</button>
          <button class="add-to-cart-btn">Add to cart</button>
        </li>`;
    })
      .join("");
  };

  const renderCart = (cart) => {
    cartList.innerHTML = cart.map((item) => {
      return `<li id="${item.id}">
          <span>${item.content} x${item.amount}</span>
          <button class="delete-btn">Delete</button>
        </li>`;
    }).join("");
  };


  return {
    inventoryList,
    cartList,
    renderInventory,
    renderCart,
    checkoutButton,
    sortButton,
    sortType
  };
})();

const Controller = ((model, view) => {
  // implement your logic for Controller
  const state = new model.State();

  const init = async () => {
    state.subscribe(() => {
      view.renderInventory(state.inventory);
      view.renderCart(state.cart);
    });

    state.inventory = await model.getInventory();
    state.cart = await model.getCart();

    handleUpdateAmount();
    handleAddToCart();
    handleDelete();
    handleCheckout();
    handleSort();
  };
  const handleSort = () => {
    let count = 0
    view.sortButton.addEventListener('click', () => {
      count++;
      if (count % 2 === 1){
        state.inventory.sort((a, b) => {
          return a.content.localeCompare(b.content);
          
        });
        view.sortType.innerHTML = "Ascending";
      } else if(count % 2 === 0){
        state.inventory.sort((a, b) => {
          return b.content.localeCompare(a.content);
        });
        view.sortType.innerHTML = "Descending";
      }

      view.renderInventory(state.inventory);
    });
  };
  const handleUpdateAmount = () => {
    
    view.inventoryList.addEventListener('click', (e) => {
      const btn = e.target;
      const li = btn.parentElement;
      const amountSpan = li.querySelector(".amount");

      let amount = parseInt(amountSpan.textContent);


      if (btn.classList.contains("plus-btn")) {
        amount++;
      } else if (btn.classList.contains("minus-btn")) {
        amount = Math.max(0, amount - 1);
      }
      amountSpan.textContent = amount;
    });
  };

  const handleAddToCart = () => {
    view.inventoryList.addEventListener('click', async (e) => {
      const btn = e.target;
      if (btn.classList.contains("add-to-cart-btn")) {
        const li = btn.parentElement;
        const id = li.id;
        const amount = parseInt(li.querySelector(".amount").textContent);

        if (amount > 0) {
          const item = state.inventory.find(item => item.id == id);
          const cartItem = state.cart.find(item => item.id == id);

          if (amount > item.count) {
            alert(`The max available count of ${item.content} is ${item.count}`);
            return;
          }

          if (cartItem) {
            await model.updateCart(id, cartItem.amount + amount);
          } else {
            await model.addToCart({ id: item.id, content: item.content, amount: amount });
          }
          state.cart = await model.getCart();

        }
      }

    });
  };

  const handleDelete = () => {
    view.cartList.addEventListener('click', async (e) => {
      const btn = e.target;
      if (btn.classList.contains("delete-btn")) {
        const li = btn.parentElement;
        const id = li.id;
        await model.deleteFromCart(id);
        state.cart = await model.getCart();
      }
    });
  };

  const handleCheckout = () => {
    view.checkoutButton.addEventListener('click', async (e) => {
      await model.checkout();
      state.cart = await model.getCart();
    });
  };
  const bootstrap = () => {
    init();
  };
  return {
    bootstrap,
  };
})(Model, View);

Controller.bootstrap();
// const fetchInventory = async () => {
//   const inventory = await view;
//   console.log(inventory);
// };

// fetchInventory();
