import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import { routes } from "./routes";
import LoginPage from "./components/AuthPageComponent/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<LoginPage />}>  </Route>
        <Route path="/" element={<MainLayout />}>
        
          {routes}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
