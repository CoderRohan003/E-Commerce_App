import { Routes, Route } from "react-router-dom";
import Pagenotfound from "./pages/Pagenotfound";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/Routes/Protected";
import ForgotPassword from "./pages/Auth/ForgotPassword";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover={false} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
       {/* means if no other routes are found */}
        <Route path="*" element={<Pagenotfound />} />
        {/* Protected routes for Dashboard */}
        <Route path="/dashboard" element={<ProtectedRoute />} >
        <Route path="" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
