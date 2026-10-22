import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import { ThemeProvider } from "./context/theme-provider";
import WeatherDashboard from "./pages/WeatherDashboard";
import City from "./pages/City";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system">
        <MainLayout>
          <Routes>
            <Route path="/" element={<WeatherDashboard />} />
            <Route path="/city/:city" element={<City />} />
          </Routes>
        </MainLayout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
