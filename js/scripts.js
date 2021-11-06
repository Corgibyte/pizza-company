//Business Logic
function Topping(name, price) {
  this.name = name;
  this.price = price;
}

function Pizza(size, toppingsArray) {
  this.size = size;
  this.toppings = toppingsArray;
}

Pizza.prototype.addTopping = function(topping) {
  let updatedTopping = false;
  for (let i = 0; i < this.toppings.length; i++) {
    if (this.toppings[i].name === topping.name) {
      this.toppings[i] = topping;
      updatedTopping = true;
    }
  }
  if (!updatedTopping) {
    this.toppings.push(topping);
  }
  return true;
};

Pizza.prototype.removeTopping = function(topping) {
  let removedTopping = false;
  let updatedToppings = [];
  this.toppings.forEach(function(thisTopping) {
    if (thisTopping.name !== topping.name || thisTopping.price !== topping.price) {
      updatedToppings.push(thisTopping);
    } else {
      removedTopping = true;
    }
  });
  this.toppings = updatedToppings;
  return removedTopping;
}

function Order() {
  this.pizzas = {};
  this.currentId = 0;
}

Order.prototype.addPizza = function(pizza) {
  this.currentId++;
  pizza.id = this.currentId;
  this.pizzas[this.currentId] = pizza;
  return true;
};

Order.prototype.removePizza = function(pizzaId) {
  if (this.pizzas[pizzaId] === undefined) {
    return false;
  } else {
    this.pizzas[pizzaId] = undefined;
    return true;
  }
}

function Store() {
  this.currentId = 0;
  this.orders = {};
  this.availableToppings = [];
}

Store.prototype.addAvailableTopping = function(topping) {
  let updatedTopping = false;
  for (let i = 0; i < this.availableToppings.length; i++) {
    if (this.availableToppings[i].name === topping.name) {
      this.availableToppings[i] = topping;
      updatedTopping = true;
    }
  }
  if (!updatedTopping) {
    this.availableToppings.push(topping);
  }
  return true;
};

Store.prototype.removeAvailableTopping = function(topping) {
  let removedTopping = false;
  let updatedToppings = [];
  this.availableToppings.forEach(function(thisTopping) {
    if (thisTopping.name !== topping.name || thisTopping.price !== topping.price) {
      updatedToppings.push(thisTopping);
    } else {
      removedTopping = true;
    }
  });
  this.availableToppings = updatedToppings;
  return removedTopping;
};

Store.prototype.addOrder = function(order) {
  this.currentId++;
  order.id = this.currentId;
  this.orders[this.currentId] = order;
  return true;
};