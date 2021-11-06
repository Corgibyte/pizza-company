### Tests

#### Description: Store()
Creates a Store object with no orders or available toppings.

**Test:** It should return an empty Store with empty properties for orders and toppings.
**Code:**
    const testStore = new Store();
    testStore;
**Result:**
    Store {availableToppings: [], orders: {}}

#### Description: Store.prototype.addAvailableToppings(topping)
Adds the given topping to the store's available toppings. If a topping of the same name is available, it will update the price, but only list the topping once. It will return true if the toppings was able to be added or updated (even if the updated price is the same as the old). Will return false if the topping could not be added or updated.

**Test:** It should add a topping that isn't already available.
**Code:**
    const testStore = new Store();
    testStore.addAvailableToppings(new Topping("testA", 75));
    testStore.availableToppings;
**Result:**
    true
    [Topping {name: "testA", price: 75}]

**Test:** It should not add a topping that is already available, but should update its price.
**Code:**
    const testStore = new Store();
    testStore.addAvailableToppings(new Topping("testA", 75));
    testStore.addAvailableToppings(new Topping("testA", 50));
    testStore.availableToppings;
**Result:**
    true
    true
    [Topping {name: "testA", price: 50}]

#### Description: Store.prototype.removeAvailableToppings(topping)
Removes the toppings from the store's available toppings. If the listed topping is not found, no change will be made and the method will return false. If the topping is found and removed it will return true.

**Test:** It should add a topping that isn't already available.
**Code:**
    const testStore = new Store();
    testStore.addAvailableToppings(new Topping("testA", 75));
    testStore.availableToppings;
**Result:**
    [Topping {name: "testA", price: 75}]

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
    testOrder.addPizza(new Pizza(testToppings));
    testOrder.getCost();
**Result:**
    100;


Store
  Properties
    AvailableToppings
    Orders
  Methods
    addAvailableToppings(toppingsArray) - bool
    removeAvailableToppings(toppingsArray) - bool
    assignOrderId(order) - int

Order
  Properties
    Pizzas
    orderId
  Methods
    getCost() - int
    addPizza(pizza) - bool

Pizza
  Properties
    Size
    Toppings
  Methods
    getCost()
    addToppings(toppingsArray) - bool
    removeToppings(toppingsArray) - bool

Topping
  Description
  Price

