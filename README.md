### Tests

#### Description: Store()
Creates a Store object with no orders or available toppings.

**Test:** It should return an empty Store with empty properties for orders and toppings.
**Code:**
    const testStore = new Store();
    testStore;
**Result:**
    Store {availableToppings: [], orders: {}}

#### Description: Store.prototype.addAvailableTopping(topping)
Adds the given topping to the store's available toppings. If a topping of the same name is available, it will update the price, but only list the topping once. It will return true if the toppings was able to be added or updated (even if the updated price is the same as the old). Will return false if the topping could not be added or updated.

**Test:** It should add a topping that isn't already available.
**Code:**
    const testStore = new Store();
    testStore.addAvailableTopping(new Topping("testA", 75));
    testStore.availableToppings;
**Result:**
    true
    [Topping {name: "testA", price: 75}]

**Test:** It should not add a topping that is already available, but should update its price.
**Code:**
    const testStore = new Store();
    testStore.addAvailableTopping(new Topping("testA", 75));
    testStore.addAvailableTopping(new Topping("testA", 50));
    testStore.availableToppings;
**Result:**
    true
    true
    [Topping {name: "testA", price: 50}]

#### Description: Store.prototype.removeAvailableTopping(topping)
Removes the toppings from the store's available toppings. If the listed topping is not found, no change will be made and the method will return false. If the topping is found and removed it will return true.

**Test:** It should remove and return true a topping that is given and in the store's list.
**Code:**
    const testStore = new Store();
    testStore.addAvailableTopping(new Topping("testA", 75));
    testStore.removeAvailableTopping(new Topping("testA", 75));
    testStore.availableToppings;
**Result:**
    true
    []

**Test:** It should not change a store's available toppings and return false if the given topping is not in the store's list.
**Code:**
    const testStore = new Store();
    testStore.addAvailableTopping(new Topping("testA", 75));
    testStore.removeAvailableTopping(new Topping("testB", 75));
    testStore.availableToppings;
**Result:**
    false
    [Topping {name:"testA", price:75}]

#### Description: Store.prototype.addOrder(order) 
Assigns an order ID to the given order and adds it to the store's orders.

**Test:** If given its first order, it should assign the first ID and add it to the list.
**Code:**
    const testStore = new Store();
    const testToppings = [new Topping("testA", 25), new Topping("testB", 75)];
    const testPizza = new Pizza("md", testToppings);
    const testOrder = new Order();
    testOrder.addPizza(testPizza);
    testStore.addOrder(testOrder);
    testOrder.id;
    testStore.orders;
**Result:**
    1;
    {1:Order{...}}

**Test:** If given its second order, it should assign the second ID and add it to the list.
**Code:**
    const testStore = new Store();
    const testToppings = [new Topping("testA", 25), new Topping("testB", 75)];
    const testPizza1 = new Pizza("md", testToppings);
    const testPizza2 = new Pizza("md", testToppings);
    const testOrder1 = new Order();
    const testOrder2 = new Order();
    testOrder1.addPizza(testPizza1);
    testOrder2.addPizza(testPizza2);
    testStore.addOrder(testOrder1);
    testStore.addOrder(testOrder2);
    testOrder2.id;
    testStore.orders;
**Result:**
    2;
    {1:Order{...},2:Order{...}}

#### Description: Order()
Creates an Order object without any assigned id or pizzas.

**Test:** It should return an empty Order with empty properties for pizzas and no id property.
**Code:**
    const testOrder = new Order();
    testOrder;
**Result:**
    Order {pizzas: {}}


#### Description: Order.prototype.getCost()
Returns an int that represents the cost (in cents) of the current order.

**Test:** It should return 0 for an order with no pizzas in it.
**Code:**
    const testOrder = new Order();
    testOrder.getCost();
**Result:**
    0;

**Test:** It should return the cost of the pizza for an order with one pizza.
**Code:**
    const testToppings = [new Topping("testA", 25), new Topping("testB", 75)];
    const testPizza = new Pizza("md", testToppings);
    const testOrder = new Order();
    testOrder.addPizza(testPizza);
    testOrder.getCost();
**Result:**
    100;

#### Description: Order.prototype.addPizza(pizza)
Assigns the given pizza an id and adds it to the order. Will return true if pizza is added.

**Test:** It should add the given pizza to an empty order.
**Code:**
    const testToppings = [new Topping("testA", 25), new Topping("testB", 75)];
    const testPizza = new Pizza("md", testToppings);
    const testOrder = new Order();
    testOrder.addPizza(testPizza);
    testOrder;
**Result:**
    Order{pizzas: {testPizza}}

**Test:** It should add the given pizza to an order that already had a pizza.
**Code:**
    const testToppings = [new Topping("testA", 25), new Topping("testB", 75)];
    const testPizza1 = new Pizza("md", testToppings);
    const testPizza2 = new Pizza("md", testToppings);
    const testOrder = new Order();
    testOrder.addPizza(testPizza1);
    testOrder.addPizza(testPizza2);
    testOrder;
**Result:**
    Order{pizzas:{1: testPizza1, 2: testPizza2}}

#### Description: Order.prototype.removePizza(pizzaId)
Removes the given pizza, identified by its ID, from the order. Will return true if pizza is removed. 

**Test:** It should remove a given pizza if it is on the order, but retain the id.
**Code:**
    const testToppings = [new Topping("testA", 25), new Topping("testB", 75)];
    const testPizza = new Pizza("md", testToppings);
    const testOrder = new Order();
    testOrder.addPizza(testPizza);
    testOrder.removePizza(testPizza.id);
    testOrder;
**Result:**
    true
    Order {pizzas:{1: undefined}}

#### Description: Pizza(size, toppingsArray)
Creates a pizza object with the given size and toppings array. Sizes can be "sm", "md", or "lg." Toppings must be given in an array of toppings where no two Topping elements share the same name, but can be an empty array.

**Test:** It should return a pizza with the given size and toppings.
**Code:**
    const testToppings = [new Topping("testA", 25), new Topping("testB", 75)];
    const testPizza1 = new Pizza("md", testToppings);
    testPizza1;
**Result:**
    Pizza{size:"md", [Topping{name:"testA", price:25}, Topping{name:"testB", price:75}]}

#### Description: Pizza.prototype.addTopping(topping)
Adds the given topping to the pizza. If a topping with the same name already exists, it will update the price of the topping. Will return true if topping is added; otherwise will return false. 

**Test:** It should add a given topping to the pizza if it isn't already on the pizza.
**Code:**
    const testToppings = [new Topping("testA", 25), new Topping("testB", 75)];
    const testPizza = new Pizza("md", testToppings);
    testPizza.addTopping(new Topping("testC", 50));
    testPizza;
**Result:**
    Pizza{size:"md", [Topping{name:"testA", price:25}, Topping{name:"testB", price:75}, Topping{name:"testC", price:50}]}

**Test:** It should update the price of a given topping if it's already on the pizza.
**Code:**
    const testToppings = [new Topping("testA", 25), new Topping("testB", 75)];
    const testPizza = new Pizza("md", testToppings);
    testPizza.addTopping(new Topping("testB", 50));
    testPizza;
**Result:**
    Pizza{size:"md", [Topping{name:"testA", price:25}, Topping{name:"testB", price:50}]}

#### Description: Pizza.prototype.removeTopping(topping)
Removes the given topping from the pizza. Topping must match both name and price to be removed. If topping is removed will return true, otherwise will return false.

**Test:** It should remove a given topping if it is on the pizza.
**Code:**
    const testToppings = [new Topping("testA", 25), new Topping("testB", 75)];
    const testPizza = new Pizza("md", testToppings);
    testPizza.removeTopping(new Topping("testA", 25));
    testPizza;
**Result:**
    true
    Pizza{size:"md", [Topping{name:"testB", price:75}]}

**Test:** It should not remove a given topping to the pizza if the topping name isn't on the pizza.
**Code:**
    const testToppings = [new Topping("testA", 25), new Topping("testB", 75)];
    const testPizza = new Pizza("md", testToppings);
    testPizza.removeTopping(new Topping("testC", 25));
    testPizza;
**Result:**
    false
    Pizza{size:"md", [Topping{name:"testA", price:25}, Topping{name:"testB", price:50}]}

**Test:** It should not remove a given topping to the pizza if the topping name is on the pizza, but the price is difference
**Code:**
    const testToppings = [new Topping("testA", 25), new Topping("testB", 75)];
    const testPizza = new Pizza("md", testToppings);
    testPizza.removeTopping(new Topping("testA", 50));
    testPizza;
**Result:**
    false
    Pizza{size:"md", [Topping{name:"testA", price:25}, Topping{name:"testB", price:50}]}

#### Description: Pizza.prototype.getCost()
Returns cost of the pizza (in cents).

**Test:** It should correctly calculate the cost of a pizza.
**Code:** 
    const testToppings = [new Topping("testA", 25), new Topping("testB", 75)];
    const testPizza = new Pizza("md", testToppings);
    testPizza.getCost();
**Result:**
    TODO

#### Description: Topping(name, price)
Creates a new topping object with the given name and price. Price must be in cents and must be a positive integer.

**Test:** It should return a Topping object with the given name and price.
**Code:**
    const testTopping = new Topping("testA", 50);
    testTopping;
**Result:**
    Topping{name:"testA", price:50}