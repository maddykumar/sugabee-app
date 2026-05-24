// Sugabee menu data — extracted from Sugabee_Menu.pdf
// Edit prices/items here; the app will reflect changes immediately.

export const MENU = [
  // PANCAKES
  { id:'p1', name:'Chocolate Pancake', desc:'Rich cocoa pancakes topped with chocolate syrup.', price:149, cat:'Pancakes', img:'🥞', tag:'', veg:true, rating:4.7, prep:12 },
  { id:'p2', name:'Honey & Banana Pancake', desc:'Fluffy pancakes with fresh banana & honey drizzle.', price:149, cat:'Pancakes', img:'🥞', tag:'Signature', veg:true, rating:4.8, prep:12 },
  { id:'p3', name:'Nutella Bomb Pancake', desc:'Soft pancakes filled & topped with Nutella & nuts.', price:179, cat:'Pancakes', img:'🥞', tag:'Bestseller', veg:true, rating:4.9, prep:12 },
  { id:'p4', name:'Oreo Pancakes', desc:'Creamy Oreo-loaded pancakes with chocolate sauce.', price:169, cat:'Pancakes', img:'🥞', tag:'', veg:true, rating:4.7, prep:12 },
  { id:'p5', name:'Strawberry Bomb Pancake', desc:'Pancakes topped with sweet strawberry & chocolate compote, filled with jam.', price:169, cat:'Pancakes', img:'🥞', tag:'', veg:true, rating:4.6, prep:12 },
  { id:'p6', name:'Dark & White Fantasy', desc:'Mix of dark & white chocolate sauces with chocolate chips.', price:189, cat:'Pancakes', img:'🥞', tag:'Chef Special', veg:true, rating:4.8, prep:14 },
  { id:'p7', name:'Kitkat Pancakes', desc:'Mini pancakes topped with crushed KitKat & chocolate drizzle.', price:169, cat:'Pancakes', img:'🥞', tag:'', veg:true, rating:4.7, prep:12 },
  { id:'p8', name:'Cookie Crumble Pancake', desc:'Mini pancakes topped with cookie crumbs & cream.', price:169, cat:'Pancakes', img:'🥞', tag:'', veg:true, rating:4.6, prep:12 },

  // JAR CAKES
  { id:'j1', name:'Chocolate Jar Cake', desc:'Layers of moist chocolate cake & cream.', price:99, cat:'Jar Cakes', img:'🍰', tag:'Bestseller', veg:true, rating:4.8, prep:3 },
  { id:'j2', name:'Nutella Jar Cake', desc:'Chocolate cake with rich Nutella layers.', price:149, cat:'Jar Cakes', img:'🍰', tag:'', veg:true, rating:4.8, prep:3 },
  { id:'j3', name:'Oreo Jar Cake', desc:'Creamy Oreo dessert layered with chocolate cake.', price:129, cat:'Jar Cakes', img:'🍰', tag:'', veg:true, rating:4.7, prep:3 },
  { id:'j4', name:'Strawberry Cream Jar Cake', desc:'Light cake with strawberry cream layers.', price:129, cat:'Jar Cakes', img:'🍰', tag:'', veg:true, rating:4.6, prep:3 },
  { id:'j5', name:'Tiramisu Jar Cake', desc:'Layers of coffee cake, cream, and cocoa in a jar.', price:159, cat:'Jar Cakes', img:'🍰', tag:'Signature', veg:true, rating:4.9, prep:3 },
  { id:'j6', name:'Kit-kat Jar Cake', desc:'Chocolate cake layered with KitKat chunks.', price:129, cat:'Jar Cakes', img:'🍰', tag:'', veg:true, rating:4.7, prep:3 },

  // CUPCAKES
  { id:'c1', name:'Vanilla Cup Cake', desc:'Soft and fluffy vanilla cupcake with creamy frosting.', price:79, cat:'Cupcakes', img:'🧁', tag:'', veg:true, rating:4.5, prep:3 },
  { id:'c2', name:'Chocolate Cup Cake', desc:'Rich chocolate cupcake topped with smooth chocolate frosting.', price:89, cat:'Cupcakes', img:'🧁', tag:'', veg:true, rating:4.7, prep:3 },
  { id:'c3', name:'Red Velvet Cup Cake', desc:'Soft red velvet cupcake with creamy frosting.', price:99, cat:'Cupcakes', img:'🧁', tag:'Bestseller', veg:true, rating:4.8, prep:3 },
  { id:'c4', name:'Oreo Cup Cake', desc:'Chocolate cupcake topped with Oreo crumbs and cream.', price:99, cat:'Cupcakes', img:'🧁', tag:'', veg:true, rating:4.7, prep:3 },
  { id:'c5', name:'Biscoff Cup Cake', desc:'Soft cupcake topped with creamy Biscoff frosting and crumbs.', price:109, cat:'Cupcakes', img:'🧁', tag:'New', veg:true, rating:4.8, prep:3 },

  // WAFFLES
  { id:'w1', name:'Chocolate Waffle', desc:'Crispy waffle topped with chocolate syrup.', price:149, cat:'Waffles', img:'🧇', tag:'', veg:true, rating:4.6, prep:10 },
  { id:'w2', name:'Banana Caramel Waffle', desc:'Waffle with banana slices & caramel drizzle.', price:169, cat:'Waffles', img:'🧇', tag:'', veg:true, rating:4.7, prep:10 },
  { id:'w3', name:'Nutella Waffle', desc:'Waffle loaded with Nutella spread.', price:179, cat:'Waffles', img:'🧇', tag:'Bestseller', veg:true, rating:4.8, prep:10 },
  { id:'w4', name:'Almond Brownie Waffle', desc:'Waffle topped with brownie & almonds.', price:199, cat:'Waffles', img:'🧇', tag:'', veg:true, rating:4.7, prep:11 },
  { id:'w5', name:'Oreo Waffle', desc:'Creamy Oreo waffle with chocolate drizzle.', price:169, cat:'Waffles', img:'🧇', tag:'', veg:true, rating:4.6, prep:10 },
  { id:'w6', name:'Strawberry Waffle', desc:'Sweet waffle topped with strawberry sauce.', price:159, cat:'Waffles', img:'🧇', tag:'', veg:true, rating:4.5, prep:10 },
  { id:'w7', name:'Choco Melt Waffle', desc:'Waffle overloaded with melted chocolate.', price:189, cat:'Waffles', img:'🧇', tag:'', veg:true, rating:4.7, prep:11 },
  { id:'w8', name:'Choco Kunafa Waffle', desc:'Fusion waffle with kunafa & chocolate.', price:209, cat:'Waffles', img:'🧇', tag:'Chef Special', veg:true, rating:4.9, prep:13 },
  { id:'w9', name:'Colour Burst Waffle', desc:'Fun colorful waffle with sprinkles.', price:179, cat:'Waffles', img:'🧇', tag:'', veg:true, rating:4.5, prep:10 },
  { id:'w10', name:'Death by Choco Rush', desc:'Extreme chocolate loaded waffle.', price:219, cat:'Waffles', img:'🧇', tag:'Signature', veg:true, rating:4.9, prep:13 },

  // COOKIES
  { id:'k1', name:'Classic Chocolate Chip Cookie', desc:'Buttery cookie loaded with chocolate chips.', price:69, cat:'Cookies', img:'🍪', tag:'', veg:true, rating:4.6, prep:2 },
  { id:'k2', name:'Red Velvet Cookie', desc:'Soft red velvet cookie with white chocolate touch.', price:89, cat:'Cookies', img:'🍪', tag:'', veg:true, rating:4.7, prep:2 },
  { id:'k3', name:'Double Chocolate Cookie', desc:'Rich chocolate cookie with extra chocolate chunks.', price:79, cat:'Cookies', img:'🍪', tag:'', veg:true, rating:4.7, prep:2 },
  { id:'k4', name:'Nutella Stuffed Cookie', desc:'Warm cookie with molten Nutella center.', price:99, cat:'Cookies', img:'🍪', tag:'Bestseller', veg:true, rating:4.9, prep:4 },
  { id:'k5', name:'Oatmeal Cookie', desc:'Crunchy oats cookie with a hint of sweetness.', price:69, cat:'Cookies', img:'🍪', tag:'', veg:true, rating:4.4, prep:2 },
  { id:'k6', name:'Peanut Butter Cookie', desc:'Soft cookie with creamy peanut butter flavor.', price:79, cat:'Cookies', img:'🍪', tag:'', veg:true, rating:4.6, prep:2 },

  // VEG PIZZAS
  { id:'vp1', name:'Margherita Pizza', desc:'Classic cheese pizza with rich tomato sauce.', price:179, cat:'Veg Pizzas', img:'🍕', tag:'', veg:true, rating:4.6, prep:15 },
  { id:'vp2', name:'Veggie Supreme Pizza', desc:'Fully loaded veggie delight with sauces.', price:229, cat:'Veg Pizzas', img:'🍕', tag:'Bestseller', veg:true, rating:4.8, prep:18 },
  { id:'vp3', name:'Farmhouse Veg Pizza', desc:'Loaded with fresh veggies & cheese.', price:199, cat:'Veg Pizzas', img:'🍕', tag:'', veg:true, rating:4.7, prep:16 },
  { id:'vp4', name:'Paneer & Onion Pizza', desc:'Onion with creamy melted cheese.', price:179, cat:'Veg Pizzas', img:'🍕', tag:'', veg:true, rating:4.6, prep:15 },
  { id:'vp5', name:'Corn & Cheese Pizza', desc:'Sweet corn with creamy melted cheese.', price:189, cat:'Veg Pizzas', img:'🍕', tag:'', veg:true, rating:4.5, prep:15 },
  { id:'vp6', name:'Paneer Tikka Pizza', desc:'Spicy paneer tikka with cheesy base.', price:219, cat:'Veg Pizzas', img:'🍕', tag:'Chef Special', veg:true, rating:4.8, prep:17 },

  // NON-VEG PIZZAS
  { id:'np1', name:'Chicken Tikka Pizza', desc:'Spicy chicken tikka with melted cheese.', price:239, cat:'Non-Veg Pizzas', img:'🍕', tag:'Bestseller', veg:false, rating:4.8, prep:17 },
  { id:'np2', name:'BBQ Chicken Pizza', desc:'Smoky BBQ chicken with sweet sauce.', price:249, cat:'Non-Veg Pizzas', img:'🍕', tag:'', veg:false, rating:4.8, prep:17 },
  { id:'np3', name:'Chicken Supreme Pizza', desc:'Loaded chicken pizza with veggies.', price:259, cat:'Non-Veg Pizzas', img:'🍕', tag:'', veg:false, rating:4.7, prep:18 },
  { id:'np4', name:'Chicken Cheese Pizza', desc:'Juicy chicken with extra cheese layer.', price:239, cat:'Non-Veg Pizzas', img:'🍕', tag:'', veg:false, rating:4.7, prep:17 },

  // VEG MOMOS
  { id:'vm1', name:'Steamed Veg Momos', desc:'Soft dumplings filled with seasoned veggies.', price:99, cat:'Veg Momos', img:'🥟', tag:'', veg:true, rating:4.5, prep:10 },
  { id:'vm2', name:'Cheese Corn Momos', desc:'Creamy cheese & corn stuffed momos.', price:139, cat:'Veg Momos', img:'🥟', tag:'Bestseller', veg:true, rating:4.7, prep:11 },
  { id:'vm3', name:'Fried Veg Momos', desc:'Crispy fried momos with spicy dip.', price:119, cat:'Veg Momos', img:'🥟', tag:'', veg:true, rating:4.6, prep:11 },
  { id:'vm4', name:'Pizza Kurkure Momos', desc:'Crispy momos with pizza-style toppings.', price:149, cat:'Veg Momos', img:'🥟', tag:'Chef Special', veg:true, rating:4.8, prep:13 },
  { id:'vm5', name:'Steamed Paneer Momos', desc:'Soft momos stuffed with paneer filling.', price:119, cat:'Veg Momos', img:'🥟', tag:'', veg:true, rating:4.7, prep:11 },
  { id:'vm6', name:'Veg Kurkure Momos', desc:'Crunchy fried momos tossed in spices.', price:139, cat:'Veg Momos', img:'🥟', tag:'', veg:true, rating:4.7, prep:12 },

  // NON-VEG MOMOS
  { id:'nm1', name:'Steamed Chicken Momos', desc:'Soft dumplings filled with seasoned chicken.', price:99, cat:'Non-Veg Momos', img:'🥟', tag:'', veg:false, rating:4.6, prep:11 },
  { id:'nm2', name:'Fried Chicken Momos', desc:'Crispy fried momos with spicy dip.', price:119, cat:'Non-Veg Momos', img:'🥟', tag:'', veg:false, rating:4.7, prep:12 },
  { id:'nm3', name:'Chicken Kurkure Momos', desc:'Crunchy fried momos tossed in spices.', price:119, cat:'Non-Veg Momos', img:'🥟', tag:'Bestseller', veg:false, rating:4.8, prep:12 },
  { id:'nm4', name:'Chicken Pizza Kurkure Momos', desc:'Crispy chicken momos with pizza-style toppings.', price:139, cat:'Non-Veg Momos', img:'🥟', tag:'', veg:false, rating:4.7, prep:13 },

  // VEG BURGERS
  { id:'vb1', name:'Classic Veg Burger', desc:'Crispy veg patty with fresh veggies and mayo.', price:89, cat:'Veg Burgers', img:'🍔', tag:'', veg:true, rating:4.5, prep:8 },
  { id:'vb2', name:'Aloo Tikki Burger', desc:'Spiced aloo tikki in a soft toasted bun.', price:79, cat:'Veg Burgers', img:'🍔', tag:'', veg:true, rating:4.4, prep:7 },
  { id:'vb3', name:'Double Aloo Tikki Burger', desc:'Double aloo tikki for a fuller bite.', price:109, cat:'Veg Burgers', img:'🍔', tag:'', veg:true, rating:4.6, prep:9 },
  { id:'vb4', name:'Veg Crunch Burger', desc:'Crunchy veg patty with spicy sauce.', price:99, cat:'Veg Burgers', img:'🍔', tag:'', veg:true, rating:4.5, prep:8 },
  { id:'vb5', name:'Cheese Melt Burger', desc:'Crispy patty topped with melted cheese.', price:139, cat:'Veg Burgers', img:'🍔', tag:'Bestseller', veg:true, rating:4.7, prep:9 },
  { id:'vb6', name:'Veg Supreme Burger', desc:'Loaded veg burger with cheese and sauces.', price:129, cat:'Veg Burgers', img:'🍔', tag:'', veg:true, rating:4.6, prep:9 },

  // NON-VEG BURGERS
  { id:'nb1', name:'Classic Chicken Burger', desc:'Juicy chicken patty with lettuce and mayo.', price:119, cat:'Non-Veg Burgers', img:'🍔', tag:'', veg:false, rating:4.6, prep:10 },
  { id:'nb2', name:'Chicken Cheese Burger', desc:'Chicken burger topped with melted cheese.', price:159, cat:'Non-Veg Burgers', img:'🍔', tag:'Bestseller', veg:false, rating:4.8, prep:10 },
  { id:'nb3', name:'Crispy Chicken Burger', desc:'Crunchy chicken patty with creamy sauce.', price:139, cat:'Non-Veg Burgers', img:'🍔', tag:'', veg:false, rating:4.7, prep:10 },
  { id:'nb4', name:'Spicy Chicken Burger', desc:'Spicy chicken patty with fiery sauce.', price:149, cat:'Non-Veg Burgers', img:'🍔', tag:'', veg:false, rating:4.7, prep:10 },
  { id:'nb5', name:'Chicken Supreme Burger', desc:'Loaded chicken burger with cheese and veggies.', price:179, cat:'Non-Veg Burgers', img:'🍔', tag:'Chef Special', veg:false, rating:4.8, prep:12 },
  { id:'nb6', name:'Double Chicken Burger', desc:'Double chicken patties for a heavy meal.', price:189, cat:'Non-Veg Burgers', img:'🍔', tag:'', veg:false, rating:4.7, prep:12 },

  // VEG SANDWICHES
  { id:'vs1', name:'Veg Grilled Sandwich', desc:'Grilled sandwich stuffed with fresh veggies.', price:99, cat:'Veg Sandwiches', img:'🥪', tag:'', veg:true, rating:4.5, prep:8 },
  { id:'vs2', name:'Cheese Corn Sandwich', desc:'Creamy corn and cheese grilled to perfection.', price:119, cat:'Veg Sandwiches', img:'🥪', tag:'', veg:true, rating:4.7, prep:9 },
  { id:'vs3', name:'Paneer Sandwich', desc:'Spiced paneer filling in toasted bread.', price:129, cat:'Veg Sandwiches', img:'🥪', tag:'', veg:true, rating:4.6, prep:9 },
  { id:'vs4', name:'Club Sandwich', desc:'Layered sandwich with veggies, sauces, and cheese.', price:139, cat:'Veg Sandwiches', img:'🥪', tag:'Bestseller', veg:true, rating:4.8, prep:10 },

  // NON-VEG SANDWICHES
  { id:'ns1', name:'Chicken Grilled Sandwich', desc:'Grilled sandwich with juicy chicken filling.', price:139, cat:'Non-Veg Sandwiches', img:'🥪', tag:'', veg:false, rating:4.7, prep:10 },
  { id:'ns2', name:'Chicken Cheese Sandwich', desc:'Chicken and cheese in crispy toasted bread.', price:149, cat:'Non-Veg Sandwiches', img:'🥪', tag:'Bestseller', veg:false, rating:4.8, prep:10 },
  { id:'ns3', name:'Spicy Chicken Sandwich', desc:'Chicken sandwich with spicy sauces.', price:149, cat:'Non-Veg Sandwiches', img:'🥪', tag:'', veg:false, rating:4.7, prep:10 },
  { id:'ns4', name:'BBQ Chicken Sandwich', desc:'Smoky BBQ chicken in a grilled sandwich.', price:159, cat:'Non-Veg Sandwiches', img:'🥪', tag:'', veg:false, rating:4.8, prep:11 },

  // VEG NOODLES
  { id:'vn1', name:'Veg Noodles', desc:'Classic stir-fried noodles with fresh veggies.', price:119, cat:'Veg Noodles', img:'🍜', tag:'', veg:true, rating:4.5, prep:12 },
  { id:'vn2', name:'Singapore Noodles', desc:'Flavorful noodles tossed Singapore style.', price:139, cat:'Veg Noodles', img:'🍜', tag:'', veg:true, rating:4.6, prep:13 },
  { id:'vn3', name:'Chilli Garlic Noodles', desc:'Spicy noodles with chilli garlic punch.', price:139, cat:'Veg Noodles', img:'🍜', tag:'Bestseller', veg:true, rating:4.7, prep:13 },
  { id:'vn4', name:'Paneer Noodles', desc:'Stir-fried noodles with paneer chunks.', price:149, cat:'Veg Noodles', img:'🍜', tag:'', veg:true, rating:4.6, prep:13 },

  // NON-VEG NOODLES
  { id:'nn1', name:'Chicken Noodles', desc:'Classic noodles with juicy chicken.', price:149, cat:'Non-Veg Noodles', img:'🍜', tag:'', veg:false, rating:4.6, prep:13 },
  { id:'nn2', name:'Chilli Chicken Noodles', desc:'Spicy noodles tossed with chilli chicken.', price:169, cat:'Non-Veg Noodles', img:'🍜', tag:'Bestseller', veg:false, rating:4.8, prep:14 },
  { id:'nn3', name:'Chicken Manchurian Noodles', desc:'Noodles served with manchurian-style chicken.', price:169, cat:'Non-Veg Noodles', img:'🍜', tag:'', veg:false, rating:4.7, prep:14 },
  { id:'nn4', name:'Egg Noodles', desc:'Stir-fried noodles with egg and sauces.', price:129, cat:'Non-Veg Noodles', img:'🍜', tag:'', veg:false, rating:4.5, prep:12 },

  // VEG PASTA
  { id:'vpa1', name:'Red Sauce Pasta', desc:'Pasta tossed in tangy tomato herb sauce.', price:149, cat:'Veg Pasta', img:'🍝', tag:'', veg:true, rating:4.6, prep:13 },
  { id:'vpa2', name:'White Sauce Pasta', desc:'Creamy pasta in rich white sauce.', price:169, cat:'Veg Pasta', img:'🍝', tag:'Bestseller', veg:true, rating:4.7, prep:14 },
  { id:'vpa3', name:'Pink Sauce Pasta', desc:'Perfect mix of red and white sauce pasta.', price:179, cat:'Veg Pasta', img:'🍝', tag:'Chef Special', veg:true, rating:4.8, prep:14 },
  { id:'vpa4', name:'Veg Cheese Pasta', desc:'Creamy pasta loaded with cheese and veggies.', price:189, cat:'Veg Pasta', img:'🍝', tag:'', veg:true, rating:4.7, prep:14 },

  // NON-VEG PASTA
  { id:'npa1', name:'Chicken Red Sauce Pasta', desc:'Chicken pasta tossed in tangy tomato herb sauce.', price:189, cat:'Non-Veg Pasta', img:'🍝', tag:'', veg:false, rating:4.7, prep:14 },
  { id:'npa2', name:'Chicken White Sauce Pasta', desc:'Creamy white sauce pasta with juicy chicken.', price:209, cat:'Non-Veg Pasta', img:'🍝', tag:'Bestseller', veg:false, rating:4.8, prep:15 },
  { id:'npa3', name:'Chicken Pink Sauce Pasta', desc:'Chicken pasta in rich pink sauce.', price:219, cat:'Non-Veg Pasta', img:'🍝', tag:'', veg:false, rating:4.8, prep:15 },
  { id:'npa4', name:'Chicken Cheese Pasta', desc:'Cheesy pasta loaded with chicken pieces.', price:229, cat:'Non-Veg Pasta', img:'🍝', tag:'Chef Special', veg:false, rating:4.9, prep:15 },

  // BREADS & BUNS
  { id:'b1', name:'Butter Bun (Bun-Maska)', desc:'Soft toasted bun with rich buttery taste.', price:49, cat:'Breads & Buns', img:'🥖', tag:'', veg:true, rating:4.5, prep:4 },
  { id:'b2', name:'Cheese Bun', desc:'Fresh bun filled with creamy melted cheese.', price:69, cat:'Breads & Buns', img:'🥖', tag:'', veg:true, rating:4.6, prep:5 },
  { id:'b3', name:'Cream Cheese Garlic Bun', desc:'Garlic bun topped with smooth cream cheese.', price:89, cat:'Breads & Buns', img:'🥖', tag:'Bestseller', veg:true, rating:4.8, prep:6 },
  { id:'b4', name:'Garlic Bread', desc:'Crispy toasted bread with buttery garlic flavor.', price:99, cat:'Breads & Buns', img:'🥖', tag:'', veg:true, rating:4.6, prep:6 },
  { id:'b5', name:'Cheese Garlic Bread', desc:'Garlic bread filled with melted cheesy goodness.', price:129, cat:'Breads & Buns', img:'🥖', tag:'Bestseller', veg:true, rating:4.8, prep:7 },
  { id:'b6', name:'Stuffed Garlic Bread', desc:'Soft garlic bread stuffed with cheese, corn & olives.', price:149, cat:'Breads & Buns', img:'🥖', tag:'Chef Special', veg:true, rating:4.8, prep:8 },

  // FRIES
  { id:'f1', name:'Classic Salted Fries', desc:'Crispy golden salted fries.', price:89, cat:'Fries', img:'🍟', tag:'', veg:true, rating:4.5, prep:7 },
  { id:'f2', name:'Peri Peri Fries', desc:'Fries tossed in spicy peri peri seasoning.', price:99, cat:'Fries', img:'🍟', tag:'Bestseller', veg:true, rating:4.7, prep:7 },
  { id:'f3', name:'Masala Fries', desc:'Indian masala flavored fries.', price:99, cat:'Fries', img:'🍟', tag:'', veg:true, rating:4.6, prep:7 },
  { id:'f4', name:'Cheese Fries', desc:'Fries topped with melted cheese.', price:119, cat:'Fries', img:'🍟', tag:'', veg:true, rating:4.7, prep:8 },
  { id:'f5', name:'Cheese Loaded Fries', desc:'Fries loaded with cheese & sauces.', price:149, cat:'Fries', img:'🍟', tag:'Chef Special', veg:true, rating:4.8, prep:9 },
  { id:'f6', name:'Chicken Loaded Fries', desc:'Fries topped with chicken & cheese.', price:179, cat:'Fries', img:'🍟', tag:'', veg:false, rating:4.8, prep:10 },

  // MOCKTAILS
  { id:'mo1', name:'Virgin Mojito', desc:'Refreshing mint and lime cooler with fizzy soda.', price:99, cat:'Mocktails', img:'🍹', tag:'', veg:true, rating:4.6, prep:5 },
  { id:'mo2', name:'Pineapple Mint Cooler', desc:'Tangy pineapple cooler with a minty finish.', price:109, cat:'Mocktails', img:'🍹', tag:'', veg:true, rating:4.6, prep:5 },
  { id:'mo3', name:'Blue Lagoon', desc:'Chilled citrus cooler with a sweet blue twist.', price:119, cat:'Mocktails', img:'🍹', tag:'', veg:true, rating:4.7, prep:5 },
  { id:'mo4', name:'Mango Cooler', desc:'Smooth and refreshing mango-based summer drink.', price:119, cat:'Mocktails', img:'🍹', tag:'Bestseller', veg:true, rating:4.8, prep:5 },
  { id:'mo5', name:'Strawberry Mojito', desc:'Minty mojito blended with sweet strawberry flavor.', price:119, cat:'Mocktails', img:'🍹', tag:'', veg:true, rating:4.7, prep:5 },
  { id:'mo6', name:'Watermelon Cooler', desc:'Fresh and juicy watermelon drink served chilled.', price:109, cat:'Mocktails', img:'🍹', tag:'', veg:true, rating:4.6, prep:5 },
  { id:'mo7', name:'Iced Orange Cocoa', desc:'A unique chilled blend of orange and cocoa notes.', price:129, cat:'Mocktails', img:'🍹', tag:'Chef Special', veg:true, rating:4.7, prep:6 },
  { id:'mo8', name:'Mango Mint Sprite Tea Soda', desc:'Fizzy mango-mint drink with a tea-soda twist.', price:129, cat:'Mocktails', img:'🍹', tag:'', veg:true, rating:4.6, prep:6 },
  { id:'mo9', name:'Peach Ice Tea', desc:'Chilled tea with a sweet peach flavor.', price:109, cat:'Mocktails', img:'🍹', tag:'', veg:true, rating:4.5, prep:4 },
  { id:'mo10', name:'Ice Tea', desc:'Classic refreshing iced tea served chilled.', price:99, cat:'Mocktails', img:'🍹', tag:'', veg:true, rating:4.4, prep:4 },
  { id:'mo11', name:'Iced Cocoa Mint', desc:'Cool cocoa drink with a refreshing mint touch.', price:129, cat:'Mocktails', img:'🍹', tag:'', veg:true, rating:4.6, prep:5 },
  { id:'mo12', name:'Honey Lime Soda', desc:'Light and refreshing soda with honey and lime.', price:99, cat:'Mocktails', img:'🍹', tag:'Signature', veg:true, rating:4.7, prep:4 },

  // MILKSHAKES
  { id:'sh1', name:'Chocolate Shake', desc:'Thick and creamy chocolate shake with a rich cocoa taste.', price:99, cat:'Milkshakes', img:'🥤', tag:'Bestseller', veg:true, rating:4.7, prep:6 },
  { id:'sh2', name:'Strawberry Shake', desc:'Creamy milkshake with sweet strawberry flavor.', price:129, cat:'Milkshakes', img:'🥤', tag:'', veg:true, rating:4.7, prep:6 },
  { id:'sh3', name:'Oreo Shake', desc:'Smooth shake blended with crushed Oreo cookies.', price:119, cat:'Milkshakes', img:'🥤', tag:'Bestseller', veg:true, rating:4.8, prep:6 },
  { id:'sh4', name:'Vanilla Shake', desc:'Classic thick vanilla shake served chilled.', price:119, cat:'Milkshakes', img:'🥤', tag:'', veg:true, rating:4.5, prep:6 },
  { id:'sh5', name:'Kit-kat Shake', desc:'Creamy shake loaded with chocolatey KitKat flavor.', price:129, cat:'Milkshakes', img:'🥤', tag:'', veg:true, rating:4.7, prep:6 },
  { id:'sh6', name:'Nutella Shake', desc:'Rich and indulgent shake blended with Nutella.', price:149, cat:'Milkshakes', img:'🥤', tag:'Chef Special', veg:true, rating:4.9, prep:7 },
  { id:'sh7', name:'Brownie Shake', desc:'Thick chocolate shake blended with brownie chunks.', price:159, cat:'Milkshakes', img:'🥤', tag:'', veg:true, rating:4.8, prep:7 },
  { id:'sh8', name:'Banana Shake', desc:'Smooth and creamy banana shake with natural sweetness.', price:129, cat:'Milkshakes', img:'🥤', tag:'', veg:true, rating:4.5, prep:6 },
  { id:'sh9', name:'Tiramisu Shake', desc:'Creamy coffee-chocolate shake with a rich tiramisu flavor.', price:179, cat:'Milkshakes', img:'🥤', tag:'Signature', veg:true, rating:4.9, prep:7 },
  { id:'sh10', name:'Mango Shake', desc:'Refreshing mango shake with a smooth creamy texture.', price:129, cat:'Milkshakes', img:'🥤', tag:'', veg:true, rating:4.7, prep:6 },

  // COFFEE
  { id:'co1', name:'Americano', desc:'Bold black coffee with a smooth and strong finish.', price:99, cat:'Coffee', img:'☕', tag:'', veg:true, rating:4.5, prep:4 },
  { id:'co2', name:'Cold Coffee', desc:'Chilled creamy coffee served smooth and refreshing.', price:129, cat:'Coffee', img:'☕', tag:'Bestseller', veg:true, rating:4.7, prep:5 },
  { id:'co3', name:'Cappuccino', desc:'Rich espresso topped with frothy milk foam.', price:129, cat:'Coffee', img:'☕', tag:'', veg:true, rating:4.7, prep:5 },
  { id:'co4', name:'Cold Coffee with Ice-cream', desc:'Classic cold coffee topped with a scoop of ice cream.', price:159, cat:'Coffee', img:'☕', tag:'Bestseller', veg:true, rating:4.8, prep:6 },
  { id:'co5', name:'Latte', desc:'Smooth espresso blended with creamy steamed milk.', price:139, cat:'Coffee', img:'☕', tag:'', veg:true, rating:4.6, prep:5 },
  { id:'co6', name:'Mocha', desc:'Creamy coffee with rich chocolate flavor.', price:149, cat:'Coffee', img:'☕', tag:'', veg:true, rating:4.7, prep:6 },
  { id:'co7', name:'Ocean Latte', desc:'A signature layered latte with a cool refreshing twist.', price:169, cat:'Coffee', img:'☕', tag:'Signature', veg:true, rating:4.9, prep:7 },
  { id:'co8', name:'Pistachio Affogato', desc:'Creamy pistachio dessert coffee with a rich indulgent taste.', price:189, cat:'Coffee', img:'☕', tag:'Chef Special', veg:true, rating:4.9, prep:7 },

  // VEG WRAPS
  { id:'vw1', name:'Veg Crunch Wrap', desc:'Crispy veg filling with fresh veggies and creamy sauce.', price:129, cat:'Veg Wraps', img:'🌯', tag:'', veg:true, rating:4.6, prep:9 },
  { id:'vw2', name:'Paneer Tikka Wrap', desc:'Spiced paneer tikka wrapped with salad and mayo.', price:149, cat:'Veg Wraps', img:'🌯', tag:'Bestseller', veg:true, rating:4.8, prep:10 },
  { id:'vw3', name:'Cheese Corn Wrap', desc:'Creamy cheese and corn filling in a soft wrap.', price:139, cat:'Veg Wraps', img:'🌯', tag:'', veg:true, rating:4.7, prep:10 },
  { id:'vw4', name:'Double Aloo Tikki Wrap', desc:'Loaded wrap with double aloo tikki, fresh veggies, and sauces.', price:149, cat:'Veg Wraps', img:'🌯', tag:'', veg:true, rating:4.7, prep:10 },

  // NON-VEG WRAPS
  { id:'nw1', name:'Chicken Tikka Wrap', desc:'Juicy chicken tikka in a soft tortilla with fresh veggies.', price:169, cat:'Non-Veg Wraps', img:'🌯', tag:'Bestseller', veg:false, rating:4.8, prep:11 },
  { id:'nw2', name:'Crispy Chicken Wrap', desc:'Crunchy fried chicken in a soft tortilla wrap.', price:179, cat:'Non-Veg Wraps', img:'🌯', tag:'', veg:false, rating:4.7, prep:11 },
  { id:'nw3', name:'BBQ Chicken Wrap', desc:'Smoky BBQ chicken wrapped in a soft tortilla.', price:179, cat:'Non-Veg Wraps', img:'🌯', tag:'', veg:false, rating:4.8, prep:11 },
  { id:'nw4', name:'Spicy Double Chicken Wrap', desc:'Loaded wrap with double chicken filling and spicy sauces.', price:199, cat:'Non-Veg Wraps', img:'🌯', tag:'Chef Special', veg:false, rating:4.8, prep:12 },

  // GAMER PLATTERS
  { id:'gp1', name:'Player 1 Platter', desc:'4 momos, 1 mini burger, fries, 2 nuggets, 2 garlic bread slices & 1 dip.', price:249, cat:'Gamer Platters', img:'🎮', tag:'', veg:true, rating:4.8, prep:18 },
  { id:'gp2', name:'Duo Gamer Platter', desc:'6 momos, 2 mini burgers, 4 spring rolls, fries, 4 nuggets, 4 garlic bread, 1 noodles or pasta & 2 dips.', price:499, cat:'Gamer Platters', img:'🎮', tag:'Bestseller', veg:true, rating:4.9, prep:25 },
  { id:'gp3', name:'Squad Gamer Platter', desc:'8 momos, 4 mini burgers, 6 spring rolls, 2 fries, 8 nuggets, 6 garlic bread, 1 noodles, 1 pasta & 3 dips.', price:799, cat:'Gamer Platters', img:'🎮', tag:'Signature', veg:true, rating:4.9, prep:30 },
];

export const OFFERS = [
  { id:'o1', code:'WELCOME20', title:'20% off your first order', desc:'New to Sugabee? Sweet welcome.', discount:20, type:'percent', minOrder:199, active:true, color:'coral', tag:'NEW USER' },
  { id:'o2', code:'SWEET50', title:'Flat ₹50 off on desserts', desc:'On pancakes, waffles, jar cakes — min ₹299.', discount:50, type:'flat', minOrder:299, active:true, color:'rose', tag:'DESSERTS' },
  { id:'o3', code:'GAMER15', title:'15% off Gamer Platters', desc:'Squad meals, sweeter deals.', discount:15, type:'percent', minOrder:249, active:true, color:'violet', tag:'PARTY' },
  { id:'o4', code:'COMBO99', title:'Mocktail + Pizza combo', desc:'Add a mocktail to any pizza order.', discount:99, type:'flat', minOrder:179, active:true, color:'amber', tag:'COMBO' },
];

export const INSTA = [
  { id:'i1', img:'🥞', caption:'Nutella Bomb Pancake season is here 🤎', likes:1240, date:'2d' },
  { id:'i2', img:'🧇', caption:'Death by Choco Rush — handle with care', likes:2103, date:'4d' },
  { id:'i3', img:'🍰', caption:'Tiramisu Jar Cake fresh out of the kitchen', likes:892, date:'1w' },
  { id:'i4', img:'🍕', caption:'Paneer Tikka Pizza, our most-ordered veg', likes:1567, date:'1w' },
  { id:'i5', img:'☕', caption:'New: Ocean Latte 🌊 a signature only at Sugabee', likes:3210, date:'2w' },
  { id:'i6', img:'🎮', caption:'Game night? Squad Platter solves it', likes:945, date:'2w' },
];

export const CATEGORIES = [...new Set(MENU.map(m => m.cat))];
