import { useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { HomePage, HomePageRef } from "./components/HomePage";
import { GalleryPage } from "./components/GalleryPage";
import { AboutPage } from "./components/AboutPage";
import { SubmitPage } from "./components/SubmitPage";
import { Toaster } from "sonner";

export default function App() {
  const homePageRef = useRef<HomePageRef>(null);

  const handleShuffle = () => {
    homePageRef.current?.shuffle();
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Routes>
          <Route path="/" element={<HomePage ref={homePageRef} />} />
          <Route path="/view-all" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/s/:slug" element={<HomePage ref={homePageRef} />} />
        </Routes>
        <Navigation onShuffle={handleShuffle} />
        <Toaster />
      </div>
    </BrowserRouter>
  );
}