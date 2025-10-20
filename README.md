# Recipe App

A simple **frontend web application** that helps you **store, organize, and manage recipes** from different sources in one place.  
Whether your recipes come from YouTube, books, or friends — this app keeps them accessible and neatly categorized.

---

## Features

- **Add and Edit Recipes**
  - Create new recipes or update existing ones.
  - Each recipe includes:
    - Picture (uploaded directly through the app)
    - Title
    - Meal Type (Breakfast, Lunch, Dinner, Dessert, Soup)
    - Ingredients
    - Method
    - Notes
    - Source (YouTube link, book title, person’s name, etc.)
  - Images are uploaded to **Cloudinary**, and the generated image link is stored in **Airtable** along with the rest of the recipe data.

- **View and Manage Recipes**
  - Browse all recipes on the **Home page** with pagination.
  - Use the control block to:
    - **Search** recipes by title
    - **Sort** recipes by title or time added (ascending or descending)
    - **Filter** recipes by meal type (Breakfast, Lunch, Dinner, Dessert, Soup)

## Tech Stack

- [React](https://react.dev/) - UI library for building components
- [Vite](https://vitejs.dev/) - Lightning-fast development and build tool
- [Airtable](https://airtable.com/) - Cloud-based database for storing recipe data
- [Cloudinary](https://cloudinary.com/) - Image hosting and media management
- [React Router](https://reactrouter.com/) - Routing and navigation
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/) - Code linting and formatting

## Project Structure

```
ctd-recipes/
├── public/
├── src/
│ ├── assets/
│ ├── context/
│ ├── features/
│ ├── pages/
│ ├── reducers/
│ ├── shared/
│ ├── utility/
│ └── main.jsx
│ index.css
│ App.jsx
│ App.module.css
│ index.html
│ package.json
│ vite.config.js
│ eslint.config.js
│ README.md
```

---

## Getting Started

### 1. Clone the Repository

```
git clone https://github.com/judy99/ctd-recipes.git
cd ctd-recipes
```

### 2. Install Dependencies

```
npm install
```

### 3. Environment Variables

Create a .env file in the root and add the following:

```
# Airtable credentials
VITE_PAT=your_airtable_token
VITE_AIRTABLE_BASE_ID=your_airtable_base_id

# Cloudinary credentials
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

🔑 **_Please contact me via Slack (Julia Kurianova, Kiwi cohort) and I'll share with you all credentials._** 🔑

## Run the Project

### Development Mode

```
npm run dev

```

### Build for Production

```
npm run build
```

### Preview Production Build

```
npm run preview
```

Then open http://localhost:5173 in your browser.

## Future Improvements:

- Add authentication for multiple users
- Implement user favorites and collections
- Improve create/update form
- Implement deletion
- Create different tables for category, ingredients, and measurements.

## License

This project is open source and available under the MIT License.
