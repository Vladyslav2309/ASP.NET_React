import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './components/containers/default/DefaultLayout';
import CategoryListPage from './components/category/list/CategoryListPage';
import CategoryCreatePage from "./components/category/create/CategoryCreatePage";

function App() {
  return (
      <>
        <Routes>
          <Route path="/" element={<DefaultLayout/>}>
            <Route index element={<CategoryListPage/>} />
              <Route path="categories/create" element={<CategoryCreatePage/>}/>
          </Route>
        </Routes>
      </>
  );
}

export default App;