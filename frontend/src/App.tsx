import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Popup from "./components/popup/popup";
import ErrorBoundary from "./components/ErrorBoundary";
import Navigation from "./components/layout/Navigation";
import WhatsAppButton from './components/layout/WhatsAppButton';
import AppRoutes from "./routes/AppRoutes";

import { AuthProvider } from "./contexts/AuthContext";
import { RecadosProvider } from "./contexts/RecadosContext";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RecadosProvider>
          <ThemeProvider defaultTheme="light">
            <TooltipProvider>
              <Toaster />

              <BrowserRouter>
                <Navigation />
                <Popup />    
                <AppRoutes />
                 
                <WhatsAppButton />
              </BrowserRouter>
            </TooltipProvider>
          </ThemeProvider>
        </RecadosProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}