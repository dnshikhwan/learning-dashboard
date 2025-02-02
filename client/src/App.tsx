import { Route, Routes } from "react-router";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/landing/Landing";
import Dashboard from "./pages/dashboard/Dashboard";
import RequestResetPassword from "./pages/auth/RequestResetPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Skills from "./pages/skills/Skills";
import AddSkill from "./pages/skills/AddSkill";

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route
          path="/auth/request-reset-password"
          element={<RequestResetPassword />}
        />
        <Route path="/auth/reset-password/:token" element={<ResetPassword />} />

        {/* protected routes */}
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/skills" element={<Skills />} />
        <Route path="/skills/add" element={<AddSkill />} />
      </Routes>
    </>
  );
};

export default App;
