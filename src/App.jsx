import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Module from "./pages/Module";
import Admin from "./pages/Admin";
import CreateLevel from "./pages/CreateLevel";
import CreateContent from "./pages/CreateContent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/create-level" element={<CreateLevel />} />
      <Route path="/admin/create-content" element={<CreateContent />} />
       <Route path="/module/:levelId" element={<Module />} />
    </Routes>
  );
}

export default App;