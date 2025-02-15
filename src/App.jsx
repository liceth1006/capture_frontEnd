import { Toaster } from "react-hot-toast";
import "./App.css";
import Capture from "./components/Capture";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import { CaptureProvider } from "./context/Context";

function App() {
  return (
    <CaptureProvider>
      <Toaster position="top-right" />
      <div className="pt-8 bg-[#f9fff9]  dark:bg-gray-950 dark:text-amber-50">
        <Hero />
        <Capture />
        <Footer />
      </div>
    </CaptureProvider>
  );
}

export default App;
