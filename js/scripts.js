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

Pizza.prototype.getCost = function() {
  let cost = 0;
  let toppingMod = 1.0;
  switch (this.size) {
    case ("sm"):
      cost = 1200;
      break;
    case ("md"):
      cost = 1500;
      toppingMod = 1.25;
      break;
    case ("lg"):
      cost = 1800;
      toppingMod = 1.5;
      break;
  }
  let toppingCost = 0;
  this.toppings.forEach(function(topping) {
    toppingCost += toppingMod * topping.price;
  });
  return Math.round(cost + toppingCost);
};

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

Order.prototype.getCost = function() {
  let totalCost = 0;
  for (let i = 0; i < this.currentId + 1; i++) {
    if (this.pizzas[i] !== undefined) {
      totalCost += this.pizzas[i].getCost();
    }
  }
  return totalCost;
};

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

//UI Logic
let pizzaStore = new Store();

function updateToppings() {
  const toppingSelector = $("#toppingList");
  for (let i = 0; i < pizzaStore.availableToppings.length; i++) {
    const inputLine = "<input type='checkbox' id='topping" + i + "' name='topping" + i + "' val='" + i + "'>";
    const labelLine = "<label for='topping" + i + "'>" + pizzaStore.availableToppings[i].name + " (" + pizzaStore.availableToppings[i].price + ")</label>";
    toppingSelector.append(inputLine + labelLine);
  }
}

$(document).ready(function() {
  const testToppings = [new Topping("pepperoni", 125), new Topping("mushrooms", 200), new Topping("carrots", 111)];
  testToppings.forEach(function(topping) {
    pizzaStore.addAvailableTopping(topping);
  });
  updateToppings();

  $("#pizzaForm").submit(function(event) {
    event.preventDefault();
    let newOrder = new Order();
    let toppings = [];
    for (let i = 0; i < pizzaStore.availableToppings.length; i++) {
      if ($("#topping" + i).is(":checked")) {
        toppings.push(pizzaStore.availableToppings[i]);
      }
    }
    newOrder.addPizza(new Pizza($("input[name='pizzaSize']:checked").val(), toppings));
    pizzaStore.addOrder(newOrder);
    console.log(pizzaStore);
  });
});