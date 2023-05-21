import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './components/containers/default/DefaultLayout';
import CategoryListPage from './components/category/list/CategoryListPage';

function App() {
  return (
      <>
        <Routes>
          <Route path="/" element={<DefaultLayout/>}>
            <Route index element={<CategoryListPage/>} />
          </Route>
        </Routes>
      </>
  );
}

export default App;