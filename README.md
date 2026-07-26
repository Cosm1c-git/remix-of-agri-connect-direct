Core Languages & Configuration
  •	TypeScript: The primary programming language used for writing both the frontend interface and the backend server logic.
  (indicated by files ending in .ts and .tsx, such as server.ts, utils.ts, and example.functions.ts)
  •	CSS: The stylesheet language used to handle the visual appearance and layout of the app.
  (indicated by styles.css)
  •	JSON & TOML: Simple configuration file formats used to define project settings, dependencies, and environment rules.
  (indicated by configuration files like package.json, tsconfig.json, components.json, and bunfig.toml)

Frontend (User Interface & Experience)
  •	React: The fundamental framework used to construct the interactive web pages and reusable UI elements.
  (indicated by the .tsx file extension which stands for TypeScript JSX, used for all visual component files like index.tsx, farmer.tsx, and button.tsx)
  •	Tailwind CSS: A utility tool used to rapidly style the website layout, colors, and typography directly within the code.
  (While a specific Tailwind config file isn't explicitly visible, its required presence is indicated by components.json and styles.css, which are standard for running shadcn/ui and styling the application)
  •	shadcn/ui: A collection of pre-designed, highly customizable UI components (like the accordions, dialogs, and sliders seen in your files).
  (indicated by the components.json configuration file and the massive list of pre-built UI files inside the components/ui/ folder, such as accordion.tsx, dialog.tsx, and carousel.tsx)

Backend & APIs (Server Logic)
  •	Supabase: The standard backend-as-a-service for Lovable AI, which handles user authentication, file uploads, and automatically generates APIs to interact with the data. (While Supabase doesn't use a dedicated file extension, backend interactions and API logic are indicated by the lib/api/ folder and example.functions.ts file)
  Databases (Data Storage)
  •	Supabase (PostgreSQL): The underlying database engine where all the dynamic platform information (like user accounts, farmer product listings, and buyer orders) is securely stored.

DevOps & Tooling (Building & Managing Code)
  •	Bun: A fast JavaScript runtime and package manager used to install project dependencies and execute code.
  (indicated by bun.lock and bunfig.toml)
  •	Vite: The core build tool that bundles all the developer code into an optimized, fast-loading package for web browsers.
  (indicated by vite.config.ts)
  •	ESLint: A code analysis tool (indicated by eslint.config.js) used to automatically identify and fix bugs or problematic patterns while typing.
  (indicated by eslint.config.js)
  •	Prettier: A code formatter (indicated by .prettierrc) that ensures the entire codebase maintains a consistent, readable style.
  (indicated by .prettierrc and .prettierignore)
  •	Git: The version control system (indicated by .gitignore) used to track code changes over time and save the project history.
  (indicated by .gitignore)
