# <a href='https://github.com/shivau1208/thebrewedbeers'><img src='https://github.com/shivau1208/thebrewedbeers/assets/102743170/f6dcb048-ab50-4efc-a764-b9d0736f4a9a' width='30' /> </a>The Brewed Beers Project 
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) ![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/shivau1208/thebrewedbeers)


## Project Overview
The Brewed Beers is a modern beer shopping platform designed to offer a seamless and engaging shopping experience for beer enthusiasts. The platform features a high-performance web application with dynamic and responsive user interfaces.

1. **Authentication & Security**:
   - Integrated a secure login service using **Express** to authenticate users and protect all routes.  
   - Ensured that user sessions are managed safely to maintain data integrity.

2. **Enhanced Performance**:
   - Implemented **lazy loading** to load assets and components on demand, reducing initial load time and improving Core Web Vitals metrics like **CLS (Cumulative Layout Shift)**.  
   - Cached images and JSON data via CDNs to minimize server requests and enhance overall speed.  

3. **User Experience Improvements**:  
   - Addressed and resolved **CLS issues** for a seamless browsing experience with stable layouts during loading.  
   - Designed intuitive and engaging UI components to ensure a smooth shopping flow.  
   - Optimized the site for cross-device compatibility and responsiveness.
 
### Previews of Application
<img src='https://github.com/user-attachments/assets/9498f131-2bf2-4315-99f9-1eb329849b7f' width='600' />&nbsp;&nbsp;
<img src='https://github.com/user-attachments/assets/575ff147-66da-4ae9-825f-d599f01ef074' height='300'  />

```mermaid
flowchart TB
    %% Frontend Subgraph
    subgraph "Frontend"
        Frontend_Main("React Application"):::frontend
        API_Services("API & Backend Service Calls"):::frontend
        UI_Components("UI Components"):::frontend
        Pages("Pages (Views)"):::frontend
        Redux("Redux State Management"):::frontend
        Context("Context Providers"):::frontend
        SW_Public("Service Worker (Public)"):::frontend
        SW_Src("Service Worker (Src)"):::frontend
    end

    %% Backend, Database and CDN
    Backend("Express/Node.js Server (Auth_API)"):::backend
    Database("MongoDB Database"):::database
    CDN("CDN (Static Asset Caching)"):::cdn

    %% Internal Frontend Relationships
    Frontend_Main -->|"contains"| UI_Components
    Frontend_Main -->|"contains"| Pages
    Frontend_Main -->|"contains"| Redux
    Frontend_Main -->|"contains"| Context
    Frontend_Main -->|"integrates"| SW_Public
    Frontend_Main -->|"integrates"| SW_Src
    Frontend_Main -->|"calls_API"| API_Services

    %% External Relationships
    API_Services -->|"API_calls"| Backend
    Backend -->|"CRUD_ops"| Database
    CDN -->|"Static_assets"| Frontend_Main

    %% Click Events
    click Frontend_Main "https://github.com/shivau1208/thebrewedbeers/tree/main/frontend/src"
    click UI_Components "https://github.com/shivau1208/thebrewedbeers/tree/main/frontend/src/components"
    click Pages "https://github.com/shivau1208/thebrewedbeers/tree/main/frontend/src/pages"
    click Redux "https://github.com/shivau1208/thebrewedbeers/tree/main/frontend/src/redux"
    click Context "https://github.com/shivau1208/thebrewedbeers/tree/main/frontend/src/context"
    click API_Services "https://github.com/shivau1208/thebrewedbeers/tree/main/frontend/src/services"
    click SW_Public "https://github.com/shivau1208/thebrewedbeers/blob/main/frontend/public/sw.js"
    click SW_Src "https://github.com/shivau1208/thebrewedbeers/tree/main/frontend/src/workers"

    %% Styles
    classDef frontend fill:#444,stroke:#333,stroke-width:2px,color:#f4f4f4;
    classDef backend fill:#444,stroke:#333,stroke-width:2px,color:#f4f4f4;
    classDef database fill:#444,stroke:#333,stroke-width:2px,color:#f4f4f4;
    classDef cdn fill:#444,stroke:#333,stroke-width:2px,color:#f4f4f4;
```

## Technologies Used
- **Frontend**: React, SCSS
- **Backend**: Express, Node.js
- **Database**: MongoDB
- **Performance**: Lazy Loading, CDN Caching
- **Authentication**: JWT, Express Sessions

## Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/shivau1208/thebrewedbeers.git
   ```
2. Navigate to the project directory:
   ```bash
   cd thebrewedbeers
   ```

4. Install the dependencies:
   ```bash
   npm install
   ```
5. Start the development server:
   ```bash
   npm start
   ```
## Contributing
We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/new-feature).
3. Make your changes and commit them (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature/new-feature).
5. Open a Pull Request.
