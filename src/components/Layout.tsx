import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Toaster } from "sonner";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
};
