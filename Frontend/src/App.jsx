import ManageStudentPage from "./page/ManageStudentPage";
import { Route, Routes } from "react-router";
import LoginPage from "./page/LoginPage";
import ProtectedRoute from "./services/ProtectedRoute";
import RegisterPage from "./page/registerpage";
import ForgetPasswordPage from "./page/forgetPasswordPage";
import RestPasswordPage from "./page/resetPasswordPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ManageStudentPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route
          path="/reset-password/:resettoken"
          element={<RestPasswordPage />}
        />
      </Routes>
    </div>
  );
};

export default App;
