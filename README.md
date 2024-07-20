# Bubble Tea Merchandise Ecommerce System

A full-stack MERN (MongoDB, Express, React, Node.js) ecommerce platform for bubble tea merchandise, featuring a user-friendly shopping experience and an admin portal for order management.

## Live Website

Visit the live website: [BBT Project](http://ec2-54-255-232-252.ap-southeast-1.compute.amazonaws.com)

![image](public/Entry-Page.png)

## Repositories

- Frontend: [https://github.com/bfcxfm/BBT-Merch](https://github.com/bfcxfm/BBT-Merch)
- Backend: [https://github.com/bfcxfm/BBT-BE](https://github.com/bfcxfm/BBT-BE)

## Project Structure

Our project is split into two main repositories:

1. **Frontend (BBT-Merch)**: Contains the React-based user interface, including all client-side logic and components.

2. **Backend (BBT-BE)**: Houses the Express.js server, API endpoints, database interactions, and business logic.

This separation allows for independent development and scaling of the frontend and backend components.

## Features

### Customer Portal

- **Product Browsing**: View and search for drink selection.
- **Price Check**: Easily view prices for all items.
- **Detailed Product Information**: See ingredients, percentage of drink components, sugar levels, and more for each product.
- **Customization Options**: Adjust sugar levels, ice levels, and toppings when ordering drinks.
- **Cart Management**: Add items to cart without signing in.
- **User Authentication**: Sign in required to place an order.
- **Order Placement**: Secure checkout process for registered users.
- **Order Tracking**: Track order status and history.

![image](public/orderpage.png)

![image](public/cart.png)

![image](public/transaction.png)

### Admin Portal

- **Order Management**: Confirm or cancel orders.
- **Cost Management**: Revenue, cost and user count.
- **Product Management**: Add new products or edit existing ones, including detailed ingredient and component information.
- **Inventory Control**: Monitor and update stock levels for products and ingredients.

![image](public/adminpage.png)

![image](public/productpage.png)

## Animations

<img src="public/animation.gif" width="300">

## Responsive Design

Our application is built with a mobile-first approach, ensuring a seamless experience across all devices:

- **Desktop**: Full-featured interface with optimized layouts for larger screens.
- **Tablet**: Adaptive design that adjusts to medium-sized screens.
- **Mobile**: Streamlined interface for easy navigation and interaction on smaller screens.

<img src="public/darkmode.png" width="300">

## Dark Mode

The application supports system-based dark mode:

- Automatically switches between light and dark themes based on user's system preferences.
- Carefully designed color palette for both modes to ensure readability and reduce eye strain.
- Consistent styling across all components in both light and dark modes.

<img src="public/admin-dark.png" width="300">

```mermaid
erDiagram
    USER {
      int UserID PK
      string Name
      string Email
      string PasswordHash
      boolean isAdmin
      date CreatedAt
    }

    PUBLICUSER {
      int PublicUserID PK
      string SessionID
      date CreatedAt
    }

    PRODUCT {
      int ProductID PK
      string Name
      string Description
      float Price
      int Stock
      int CategoryID FK
      date CreatedAt
    }

    ORDER {
      int OrderID PK
      int UserID FK
      date OrderDate
      float TotalAmount
      int ShippingAddressID FK
      int PickupLocationID FK
      string PaymentStatus
    }

    ORDERITEM {
      int OrderItemID PK
      int OrderID FK
      int ProductID FK
      int Quantity
      float ItemPrice
    }

    CATEGORY {
      int CategoryID PK
      string CategoryName
    }

    COMMENT {
      int CommentID PK
      int ProductID FK
      int UserID FK
      int Rating
      string Content
      date CreatedAt
    }

    CART {
      int CartID PK
      int UserID FK
      int PublicUserID FK
    }

    CARTITEM {
      int CartItemID PK
      int CartID FK
      int ProductID FK
      int Quantity
    }

    PAYMENT {
      int PaymentID PK
      int OrderID FK
      string PaymentMethod
      date PaymentDate
      float AmountPaid
    }

    SHIPPINGADDRESS {
      int ShippingAddressID PK
      int UserID FK
      string StreetAddress
      string City
      string State
      string PostalCode
      string Country
    }

    PICKUPLOCATION {
      int PickupLocationID PK
      string LocationName
      string Address
      string City
      string State
      string PostalCode
      string Country
    }

    ADMIN {
      int AdminID PK
      string Name
      string Email
      string PasswordHash
      boolean isAdmin
      date CreatedAt
    }

    LOGIN {
      int LoginID PK
      string Email
      string PasswordHash
      date LoginTime
    }

    REGISTER {
      int RegisterID PK
      string Name
      string Email
      string PasswordHash
      date RegisterTime
    }

    USER ||--o{ ORDER : has
    USER ||--o{ COMMENT : writes
    USER ||--|| CART : owns
    PUBLICUSER ||--|| CART : owns

    ORDER ||--o{ ORDERITEM : contains
    ORDERITEM ||--|| PRODUCT : refers

    ORDER }|--|| SHIPPINGADDRESS : "ships_to"
    ORDER }|--|| PICKUPLOCATION : "picked_up_at"

    PRODUCT }o--|| CATEGORY : belongs_to
    PRODUCT ||--o{ COMMENT : receives

    CART ||--o{ CARTITEM : contains
    CARTITEM ||--|| PRODUCT : contains

    COMMENT }|--|| USER : written_by

    PAYMENT }|--|| ORDER : pays_for

    ADMIN ||--o{ ORDER : views_edits
    ADMIN ||--o{ USER : views_edits
    ADMIN ||--o{ PRODUCT : edits

    USER ||--|| LOGIN : performs
    PUBLICUSER ||--|| REGISTER : performs


```

```mermaid
flowchart TB
    subgraph HomePage [Home Page for PublicUser]
        H0[Homepage]
        H1[View Products]
        H2[Select Product]
        H3[Add to Cart]
        H4[Login]
        H5[Register]
        H6[Login/Register to Order]

        H0 --> H1
        H1 --> H2
        H2 --> H3
        H3 --> H6
        H0 --> H4
        H4 --> H6
        H0 --> H5
        H5 --> H6
    end

    subgraph AdminPage [Admin Page]
        AP1[Admin Dashboard]
        AP2[View/Edit Products]
        AP3[View/Edit Users]
        AP4[View/Edit Orders]

        AP1 --> AP2
        AP1 --> AP3
        AP1 --> AP4

        subgraph ProductPage [Product Page for Admin Editing]
            PP1[Product List]
            PP2[Edit Product Details]
            PP3[Save Changes]

            PP1 --> PP2
            PP2 --> PP3
        end

        subgraph UserInfoPage [User Info Page for Admin Editing]
            UIP1[User List]
            UIP2[Edit User Details]
            UIP3[Save Changes]

            UIP1 --> UIP2
            UIP2 --> UIP3
        end

        subgraph OrderPageAdmin [Order Page for Admin Editing]
            OPA1[Order List]
            OPA2[Edit Order Details]
            OPA3[Save Changes]

            OPA1 --> OPA2
            OPA2 --> OPA3
        end

        AP2 --> ProductPage
        AP3 --> UserInfoPage
        AP4 --> OrderPageAdmin
    end

    subgraph UserPage [User Page]
        UP1[User Dashboard]
        UP2[View Orders]
        UP3[Place New Order]
        UP4[Leave Comments]

        UP1 --> UP2
        UP1 --> UP3
        UP1 --> UP4

        subgraph OrderPageUser [Order Page for User]
            OPU1[Order List]
            OPU2[Choose Shipping/Pickup]
            OPU3[Complete Order]

            OPU1 --> OPU2
            OPU2 --> OPU3
        end

        subgraph CommentPage [Comment Page for User]
            CP1[View Products]
            CP2[Add Comment]
            CP3[Submit Comment]

            CP1 --> CP2
            CP2 --> CP3
        end

        UP2 --> OrderPageUser
        UP4 --> CommentPage
    end

```

## Tech Stack

### Frontend

- React.js
- shadcn UI components
- Tailwind CSS for styling

### Backend

- Node.js with Express.js

### Database

- MongoDB

### Authentication

- JSON Web Tokens (JWT)

### Deployment

- AWS EC2
- Nginx as reverse proxy

## Deployment

The application is deployed on an AWS EC2 instance with Nginx serving as a reverse proxy. This setup ensures that the backend is not directly exposed to the public internet, enhancing security.

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name xxx.compute.amazonaws.com;

    location / {
        root /home/ec2-user/.../dist;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

This configuration serves the frontend from the `/dist` directory and proxies API requests to the local backend server running on port 3000.

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/bfcxfm/BBT-Merch.git
   ```

2. Install dependencies:

   ```
   cd BBT-Merch
   npm install
   ```

3. Set up environment variables:

   ```
   cp .env.example .env
   ```

   Edit the `.env` file with your configuration.

4. Run the development server:

   ```
   npm run dev
   ```

5. Run the development build on server:

   ```
   npm run build
   ```

## Key Features in Detail

### Detailed Product Information

- Users can view comprehensive details for each bubble tea product, including:
  - Full list of ingredients
  - Percentage breakdown of drink components (e.g., 70% tea, 30% milk)
  - Available sugar and level options (0%, 25%, 50%, 75%, 100%)

### Customization

- Users can customize their drinks with options for:
  - Sugar level
  - Ice level
  - Additional toppings
    -comments

### Admin Product Management

- Admins can input and edit detailed product information, including:
  - Ingredient lists
  - Component percentages
  - Customization options
  - Revenue, cost and user management

# Future Features

Here are some exciting features we plan to implement in the near future:

### Enhanced Product Customization

- **Real-time Ingredient Updates**: As users customize their drinks, the ingredient list will update in real-time, reflecting the exact composition of their custom order.

### Nutritional Information

- **Dynamic Calorie Calculation**: Calorie information will be calculated and displayed in real-time as users customize their drinks, helping them make informed choices.

### Allergen Awareness

- **Allergen Warnings**: Clear allergen warnings will be displayed for each product, updating dynamically based on customization choices to ensure customer safety.

### Expanded Customization Options

- **Broader Ingredient Selection**: Introduce a wider range of toppings, syrups, and tea bases for even more personalized drinks.

### Sustainability Features

- **Eco-friendly Packaging Options**: Allow customers to choose environmentally friendly packaging alternatives.
- **Carbon Footprint Tracking**: Display the environmental impact of each order and offer options to offset it.

### Advanced User Profiles

- **Favorite Orders**: Enable users to save and quickly reorder their favorite drink combinations.
- **Personalized Recommendations**: Implement an AI-driven system to suggest new drinks based on user preferences and order history.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
