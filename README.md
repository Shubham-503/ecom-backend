## Steps to run this project
- clone and create a .env file
- .env should have all variables as in .env.example
- npm i
- npm run dev
- all endpoints are in the controller section

## EndPoints

### Users Endpoint
1. SIGNUP
 * @route http://localhost:5000/api/v1/auth/users
 * @description User signUp Controller for creating new user
 * @method POST
 * @parameters username, email, password
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the signup was successful
 *  - {string} token - JWT token for the authenticated user
 *  - {object} user - The newly created user object

2. LOGIN
 * @route http://localhost:5000/api/v1/auth/login
 * @description User signIn Controller for loging new user
 * @method POST
 * @parameters  email, password
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the operation was successful (true)
 *  - {string} token - JWT token for the authenticated user
 *  - {object} user - The user object containing details of the authenticated user
  
3. LOGOUT
 * @route http://localhost:5000/api/v1/auth/logout
 * @method GET
 * @description User logout by clearing user cookies
 * @parameters
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the operation was successful (true)
 *  - {string} message - A message indicating the user has logged out ("Logged Out")
  
4. FETCH USER
 * @route http://localhost:5000/api/v1/auth/users/:id
 * @method GET
 * @description get user by id
 * @parameters id
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the operation was successful (true)
 *  - {object} user - The user object containing details of the user
  
5. UPDATE USER
 * @route http://localhost:5000/api/v1/auth/user/:id
 * @method PUT
 * @description Controller to update user details (username, email)
 * @parameters id (User ID), username, email (optional fields in the request body)
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the update was successful
 *  - {object} user - The updated user object
  
6. DELETE USER
 * @route http://localhost:5000/api/v1/auth/user/:id
 * @method DELETE
 * @description Controller to delete a user by ID
 * @parameters id (User ID in the request params)
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the deletion was successful
 *  - {string} message - A message confirming user deletion ("User deleted successfully")

### Product Endpoint

1. GET PRODUCTS
 * @route http://localhost:5000/api/v1/products
 * @method GET
 * @description Controller to list all products with pagination
 * @parameters page (optional), limit (optional) - for pagination
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the operation was successful
 *  - {array} products - Array of product objects
 *  - {number} totalProducts - Total number of products
 *  - {number} currentPage - The current page number
 *  - {number} totalPages - Total number of pages available
  
2. CREATE PRODUCT
 * @route http://localhost:5000/api/v1/products
 * @method POST
 * @description Controller to create a new product
 * @parameters name, description, price, stock
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the product was created successfully
 *  - {object} product - The newly created product object
  
3. GET PRODUCT
 * @route http://localhost:5000/api/v1/products/:id
 * @method GET
 * @description Controller to get product details by ID
 * @parameters id (Product ID) - The ID of the product to retrieve
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the operation was successful
 *  - {object} product - The product object containing product details
  
4. UPDATE PRODUCT
 * @route http://localhost:5000/api/v1/products/:id
 * @method PUT
 * @description Controller to update product details by ID
 * @parameters id (Product ID), name, description, price, stock (optional fields in the request body)
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the update was successful
 *  - {object} product - The updated product object
  
5. DELETE PRODUCT
 * @route http://localhost:5000/api/v1/products/:id
 * @method DELETE
 * @description Controller to delete a product by ID
 * @parameters id (Product ID) - The ID of the product to delete
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the operation was successful
 *  - {string} message - Success message indicating the product was deleted
  
### Order EndPoint

1. CREATE ORDER
 * @route http://localhost:5000/api/v1/orders
 * @method POST
 * @description Controller to create a new order
 * @parameters userId, products (array of objects containing productId and quantity)
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the order was created successfully
 *  - {object} order - The newly created order object
  
2. GET ORDER
 * @route http://localhost:5000/api/v1/orders/:id
 * @method GET
 * @description Controller to get order details by ID
 * @parameters id (Order ID) - The ID of the order to retrieve
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the operation was successful
 *  - {object} order - The order object containing order details and product information
  
3. GET USER ORDERS
 * @route http://localhost:5000/api/v1/users/:id/orders
 * @method GET
 * @description Controller to list all orders for a user by user ID
 * @parameters id (User ID) - The ID of the user whose orders to retrieve
 * @returns {object} JSON object containing:
 *  - {boolean} success - Indicates if the operation was successful
 *  - {array} orders - Array of order objects for the specified user









