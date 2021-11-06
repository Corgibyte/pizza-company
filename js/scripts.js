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