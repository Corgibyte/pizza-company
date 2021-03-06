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

function Order(name, latCoord, longCoord) {
  this.pizzas = {};
  this.currentId = 0;
  this.name = name;
  this.latCoord = latCoord;
  this.longCoord = longCoord;
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

Order.prototype.hasPizza = function() {
  let hasPizza = false;
  for (let i = 1; i <= this.currentId && !hasPizza; i++) {
    hasPizza = this.pizzas[i] !== undefined;
  }
  return hasPizza;
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
let currentOrder = {};

function updateToppings() {
  const toppingSelector = $("#toppingList");
  for (let i = 0; i < pizzaStore.availableToppings.length; i++) {
    const divOpen = "<div class='form-check'>"
    const inputLine = "<input class='form-check-input' type='checkbox' id='topping" + i + "' name='topping" + i + "' val='" + i + "'>";
    const toppingPrice = formatPrice(pizzaStore.availableToppings[i].price);
    const labelLine = "<label class='form-check-label' for='topping" + i + "'>" + pizzaStore.availableToppings[i].name + " (" + toppingPrice + ")</label>";
    const divClose = "</div>"
    toppingSelector.append(divOpen + inputLine + labelLine + divClose);
  }
}

function updateOrderOutput(order) {
  const pizzaListSel = $("#pizzaList");
  pizzaListSel.html("");
  for (let i = 1; i <= order.currentId; i++) {
    if (order.pizzas[i] !== undefined) {
      let liString = "<li>" + order.pizzas[i].size + " pizza with: <ul>";
      order.pizzas[i].toppings.forEach(function(topping) {
        liString = liString.concat("<li>" + topping.name + "</li>");
      });
      const pizzaPrice = formatPrice(order.pizzas[i].getCost());
      liString = liString.concat("<p class='price'>Price: " + pizzaPrice + "</p>");
      liString = liString.concat("</ol>");
      liString = liString.concat("<button id='removePizza" + i + "' class='btn btn-sm btn-secondary'>Remove Pizza</button></li>");
      pizzaListSel.append(liString);
      addRemovePizzaListener(i);
    }
  }
  if (currentOrder.hasPizza()) {
    $("#submitOrder").show();
    const orderPrice = formatPrice(order.getCost());
    $("#totalPrice").text("Total: " + orderPrice);
  } else {
    $("#submitOrder").hide();
  }
}

function updateConfirmation(order) {
  const pizzaListSel = $("#confirmationList");
  for (let i = 1; i <= order.currentId; i++) {
    if (order.pizzas[i] !== undefined) {
      let liString = "<li>" + order.pizzas[i].size + " pizza with: <ul>";
      order.pizzas[i].toppings.forEach(function(topping) {
        liString = liString.concat("<li>" + topping.name + "</li>");
      });
      const pizzaPrice = formatPrice(order.pizzas[i].getCost());
      liString = liString.concat("<p class='price'>Price: " + pizzaPrice + "</p>");
      liString = liString.concat("</ol></li>");
      pizzaListSel.append(liString);
    }
  }
  $("#confirmationTotal").text("Total: " + formatPrice(order.getCost()));
}

function addRemovePizzaListener(id) {
  $("#removePizza" + id).click(function() {
    currentOrder.removePizza(id);
    updateOrderOutput(currentOrder);
  });
}

function formatPrice(price) {
  const priceStr = price.toString();
  const priceDollars = parseInt(price / 100).toString();
  const priceCents = priceStr.slice(priceStr.length - 2);
  return "$" + priceDollars + "." + priceCents;
}

$(document).ready(function() {
  const testToppings = [new Topping("pepperoni", 125),
    new Topping("mushrooms", 133), 
    new Topping("pineapple", 144),
    new Topping("live bees", 2217),
    new Topping("beans", 168),
    new Topping("sausage", 456),
    new Topping("carrots", 133),
    new Topping("crystallized hope", 456),
    new Topping("chitin", 98),
    new Topping("thread", 208)];
  testToppings.forEach(function(topping) {
    pizzaStore.addAvailableTopping(topping);
  });
  updateToppings();

  $("#pizzaForm").submit(function(event) {
    event.preventDefault();
    let toppings = [];
    for (let i = 0; i < pizzaStore.availableToppings.length; i++) {
      if ($("#topping" + i).is(":checked")) {
        toppings.push(pizzaStore.availableToppings[i]);
      }
    }
    currentOrder.addPizza(new Pizza($("input[name='pizzaSize']:checked").val(), toppings));
    updateOrderOutput(currentOrder);
    $("#pizzaForm").trigger("reset");
  });

  $("#welcomeForm").submit(function(event) {
    event.preventDefault();
    currentOrder = new Order($("#nameForm").val(), parseInt($("#latForm").val()), parseInt($("#longForm").val()));
    $("#welcome").hide();
    $("#order").show();
  });

  $("#submitOrder").click(function() {
    if (currentOrder.hasPizza) {
      $("#order").hide();
      $("#confirmation").show();
      updateConfirmation(currentOrder);
    }
  });
});
