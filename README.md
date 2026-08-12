# Product Listing & Details App

A small learning-focused React application that demonstrates:

- Login form validation with React Hook Form
- Protected routes with React Router
- Product data fetching with Redux Toolkit and `createAsyncThunk`
- Material UI components
- A product listing and product details page using the DummyJSON API

## Run the app

```bash
npm install
npm run dev
```

Open the local URL Vite prints in the terminal. For the demo login, enter any valid email and a password of at least six characters.

## Useful commands

```bash
npm run lint
npm run build
```

## Folder guide

- `src/App.jsx` contains the pages, routes, and simple UI components.
- `src/store.js` contains the Redux store, authentication state, and product API requests.
- `src/main.jsx` connects React Router and Redux to the app.

The code is intentionally kept in a few files so the main React ideas are easy to follow before splitting it into more components later.
