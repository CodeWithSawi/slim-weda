import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import { ThemeProvider } from "./context/theme-provider";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system">
        <MainLayout> hellow</MainLayout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
