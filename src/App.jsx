import { Routes, Route, Outlet } from "react-router-dom";
import DeleteAccount from "./routes/DeleteAccount";
import Home from "./routes/Home";
import RequestPasswordReset from "./routes/RequestPasswordReset";
import ResetPassword from "./routes/ResetPassword";
import NotFound from "./routes/NotFound";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="deleteAccount" element={<DeleteAccount />} />
        <Route
          path="request-password-reset"
          element={<RequestPasswordReset />}
        />
        <Route path="resetPassword" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
