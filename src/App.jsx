import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {Loader} from "./components/Loader/Loader.jsx";
import {Header} from "./components/Header/Header.jsx";

 

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage.jsx"));
const DetailsPage = lazy (() => import("./pages/DetailsPage/DetailsPage.jsx"));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage.jsx'));


export default function App () {
  return (
    <>
    <Suspense fallback={<Loader />}>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/catalog/:id" element={<DetailsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </Suspense>
    <ToastContainer position="top-right" />
    </>
  )
}