import { Navigate, Route, Routes } from "react-router-dom";
import About from "../pages/About";
import BookPage from "../pages/Book";
import Dashboard from "../pages/Dashboard";
import Favorites from "../pages/Favorites";
import Home from "../pages/Home";
import Results from "../pages/Results";
import SignIn from "../pages/SignIn";
import SuggestBook from "../pages/SuggestBook";
import SuggestBookError from "../pages/SuggestBookError";
import SuggestBookSuccess from "../pages/SuggestBookSuccess";

export function MainRoutes() {
  const ProtectedRoute = ({ children }: any) => {
    const user = localStorage.getItem("supabase.auth.token");
    if (!user) {
      return <Navigate to="/signin" />;
    }

    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/book/:id" element={<BookPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/results" element={<Results />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/suggest-book" element={<SuggestBook />} />
      <Route path="/suggest-book/success" element={<SuggestBookSuccess />} />
      <Route path="/suggest-book/error" element={<SuggestBookError />} />
    </Routes>
  );
}
