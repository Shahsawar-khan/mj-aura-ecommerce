# MJ AURA - Luxury Perfume E-Commerce Platform

MJ AURA is a premium, full-stack e-commerce web application designed for a luxury perfume brand. It features a modern **Black & Gold** user interface, a fully functional shopping cart, and a secure Admin Dashboard for complete store management. 

## 🚀 Features

### Customer Storefront
- **Luxury UI:** Premium Black & Gold theme tailored for a high-end brand.
- **Responsive Design:** 100% mobile-friendly layout using Tailwind CSS.
- **Authentication:** Secure user Registration and Login using Laravel Sanctum.
- **Shopping Cart:** Dynamic cart management (Add, Remove, Update) using React Context API.
- **Checkout System:** Dedicated checkout page where users can enter shipping details and place orders (Mock Payment Flow).
- **Product Display:** Beautiful product cards with image zoom effects and stock status.

### Admin Dashboard (Role-Based Access)
- **Real-time Statistics:** Track Total Products, Total Orders, and Revenue.
- **Product Management (CRUD):** Add new perfumes with image upload functionality.
- **Inventory Table:** View all products with their images, prices, and available stock.
- **Protected Routes:** Only users with the `admin` role can access the dashboard.

## 💻 Tech Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS (for modern styling)
- React Router DOM (for routing)
- Axios (for API requests)
- Context API (for state management)

**Backend:**
- Laravel 11 (PHP 8.2+)
- Laravel Sanctum (API Authentication)
- MySQL (Database)

## 🛠️ Local Installation & Setup

Follow these steps to run the project on your local machine:

### 1. Backend Setup (Laravel)
```bash
# Clone the repository
git clone https://github.com/Shahsawar-khan/mj-aura-ecommerce.git
cd mj-aura/backend

# Install PHP dependencies
composer install

# Create a copy of .env file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure your database in the .env file (DB_DATABASE, DB_USERNAME, DB_PASSWORD)
# Run migrations
php artisan migrate

# Create a symbolic link for image uploads
php artisan storage:link

# Start the backend server
php artisan serve