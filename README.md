# Acquisition Management System

A modern Angular 20 web application for managing acquisition requirements, featuring a responsive design with the ADRES color palette, comprehensive CRUD operations, and real-time statistics.

![ADRES Color Palette](https://raw.githubusercontent.com/angular/angular/main/aio/src/assets/images/logos/angular/angular.svg)

## 🚀 Features

### 📊 Dashboard & Statistics
- **Real-time Metrics**: View total, active, and inactive acquisitions at a glance.
- **Financial Summaries**: Automatic calculation of total value and budget sums.
- **Visual Feedback**: Gradient cards with hover effects and responsive grid layout.

### 📝 Acquisition Management
- **Complete CRUD**: Create, Read, Update, and Delete (Toggle Status) capabilities.
- **Reactive Forms**: Robust validation for all inputs including budget, quantity, and dates.
- **Automatic Calculations**: `Total Value` is automatically computed from `Quantity` × `Unit Value`.
- **History Tracking**: Detailed timeline view of all changes made to an acquisition.

### 🔍 Search & Filtering
- **Smart Search**: Debounced search functionality for instant results.
- **Advanced Filters**: Filter by status (Active/Inactive) and date ranges.
- **Pagination**: Efficient handling of large datasets with smart page navigation.

### 🎨 User Experience
- **ADRES Design System**: Custom color palette (Navy #3d4c6b, Turquoise #00d9c0, Blue #6b7fc1).
- **Responsive Layout**: Optimized for Mobile, Tablet, and Desktop devices.
- **Interactive Elements**: Smooth transitions, loading spinners, and toast notifications.
- **Confirmation Modals**: Secure handling of destructive actions.

## 🛠️ Technology Stack

- **Framework**: Angular 20 (Standalone Components)
- **Language**: TypeScript 5.9 (Strict Mode)
- **Styling**: TailwindCSS v3
- **State Management**: Angular Signals
- **Reactive Programming**: RxJS 7.8
- **Control Flow**: Modern Angular `@if`, `@for` syntax

## ⚙️ Setup & Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd adquisiciones
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the backend API**
    Ensure your backend service is running on `http://localhost:8080`.

4.  **Run the application**
    ```bash
    npm start
    ```
    Navigate to `http://localhost:4200`.

## 📂 Project Structure

```
src/app/
├── components/
│   ├── acquisition-list/    # Main dashboard with stats and table
│   ├── acquisition-form/    # Create/Edit form with validation
│   ├── acquisition-stats/   # Statistics cards component
│   ├── acquisition-filter/  # Search and filter controls
│   ├── acquisition-history/ # Timeline history view
│   └── shared/              # Reusable components (Alerts, Modals, Spinner)
├── services/
│   ├── acquisition.service.ts # API communication
│   └── ...
├── models/                  # TypeScript interfaces
└── interceptors/            # HTTP error handling and loading state
```

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Primary** | `#3d4c6b` | Headers, Primary Buttons |
| **Secondary** | `#00d9c0` | Accents, Loading Spinner, Active States |
| **Accent** | `#6b7fc1` | Secondary Actions, Highlights |

## 🧪 Testing

Run unit tests:
```bash
ng test
```

## 📄 License

This project is proprietary and confidential.
