import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './components/containers/default/DefaultLayout';
import CategoryListPage from './components/category/list/CategoryListPage';
import CategoryCreatePage from "./components/category/create/CategoryCreatePage";
import RegistrationPage from "./components/category/auth/RegistrationPage";

function App() {
  return (
      <>
        <Routes>
          <Route path="/" element={<DefaultLayout/>}>
            <Route index element={<CategoryListPage/>} />
              <Route path="categories/create" element={<CategoryCreatePage/>}/>
              <Route path="api/Auth/register" element={<RegistrationPage/>}/>
          </Route>
        </Routes>
      </>
  );
}

export default App;