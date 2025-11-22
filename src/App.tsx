import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import SignupPage from "./features/auth/SignupPage";
import Dashboard from "./pages/Dashboard";
import ProjectsList from "./features/projects/ProjectsList";
import ProjectDetail from "./features/projects/ProjectDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
