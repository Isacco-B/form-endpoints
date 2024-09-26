import { createRoot } from "react-dom/client";
import { Send } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle.tsx";
import { StrictMode } from "react";

import App from "./App.tsx";
import Footer from "./components/Footer.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="min-h-[100vh] p-4">
        <nav className="bg-white dark:bg-background bg-opacity-95 fixed w-full z-50 top-0 left-0">
          <div className="flex flex-row justify-between items-center p-4 max-w-[1500px] mx-auto">
            <div
              className="flex flex-row space-x-2 items-center cursor-pointer"
              onClick={() => window.location.reload()}
            >
              <Send
                size={38}
                className="text-[#404040] dark:text-neutral-200"
              />
              <h1 className="font-poppins font-bold text-2xl text-neutral-700 dark:text-neutral-200">
                Form
                <span className="font-poppins font-bold text-neutral-400 dark:text-neutral-300 ml-1">
                  Endpoints
                </span>
              </h1>
            </div>
            <ModeToggle />
          </div>
        </nav>
        <div className="mt-14 md:mt-20">
          <App />
          <Footer />
        </div>
        <Toaster />
      </main>
    </ThemeProvider>
  </StrictMode>
);
