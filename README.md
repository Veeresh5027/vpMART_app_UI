# vpMART - E-Commerce Frontend (UI)

[![Angular](https://img.shields.io/badge/Angular-17%2B-DD0031?style=flat&logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-7952B3?style=flat&logo=bootstrap)](https://getbootstrap.com/)

**vpMART UI** is the modern, responsive web interface for the vpMART e-commerce platform. Built with **Angular**, it provides a seamless user experience for browsing products, managing accounts, and placing orders.

---

## 🚀 Key Features

* **Dynamic Product Catalog:** Browse products with real-time data fetched from the Spring Boot backend.
* **User Authentication:** Custom-built screens for **User Registration** and **Login**.
* **Account Recovery:** Intuitive workflow for **Forgot Password** and **Reset Password**.
* **Responsive Design:** Fully mobile-friendly UI using Bootstrap and CSS3.
* **State Management:** Efficient handling of the Shopping Cart and User Sessions.
* **Reactive Forms:** Robust data validation for all user inputs (Login, Signup, etc.).

---

## 🛠️ Technical Stack

* **Framework:** Angular 17+
* **Language:** TypeScript
* **Styling:** CSS3 & Bootstrap 5
* **API Communication:** HttpClient (REST API Integration)
* **Tooling:** Angular CLI, Node.js

---

## 📂 Project Architecture



The project follows a highly organized structure to ensure scalability:

```text
src/app/
├── components/           # UI Components
│   ├── cart-details/     # Full cart view
│   ├── cart-status/      # Header cart summary
│   ├── checkout/         # Payment & Shipping form
│   ├── forgot-password/  # Recovery initiation
│   ├── login/            # User authentication
│   ├── product-list/     # Main product grid
│   ├── register/         # New user signup
│   └── search/           # Global search logic
├── dto/                  # Data Transfer Objects (Interface models)
│   ├── product.ts        # Product data model
│   ├── cart-item.ts      # Cart logic model
│   ├── order.ts          # Order submission model
│   └── ...               # (Total 12+ type-safe models)
├── services/             # API & Logic layer (Product, Auth, Cart services)
├── guards/               # Route protection logic
├── app.routes.ts         # Centralized routing
└── app.constants.ts      # Global API configurations
```

