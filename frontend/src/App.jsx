import React from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { getStoredToken } from "./api.js";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import PhotoDetailPage from "./pages/PhotoDetailPage.jsx";

function RequireAuth({ children }) {
  const location = useLocation();
  const token = getStoredToken();
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

function RootRedirect() {
  return <Navigate to="/gallery" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-dvh app-surface">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "rgba(255, 251, 245, 0.97)",
              color: "#2f241f",
              border: "1px solid #dccfc0",
              borderRadius: "16px",
              backdropFilter: "blur(10px)",
              boxShadow: "0 16px 42px rgba(61, 42, 28, 0.12)",
            },
          }}
        />

        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/gallery"
            element={
              <RequireAuth>
                <GalleryPage />
              </RequireAuth>
            }
          />
          <Route
            path="/photos/:id"
            element={
              <RequireAuth>
                <PhotoDetailPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/gallery" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
