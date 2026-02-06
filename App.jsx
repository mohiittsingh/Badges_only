import React, { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [page, setPage] = useState("home");

  const NavButton = ({ label, value }) => (
    <button
      onClick={() => setPage(value)}
      className={`px-4 py-2 rounded-2xl shadow-md transition-all ${
        page === value
          ? "bg-black text-white"
          : "bg-white text-black hover:shadow-lg"
      }`}
    >
      {label}
    </button>
  );

  const PageWrapper = ({ children }) => (
    <motion.div
      key={page}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="p-6"
    >
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Navbar */}
      <nav className="flex gap-3 p-4 bg-white shadow-md sticky top-0 z-50 justify-center">
        <NavButton label="Home" value="home" />
        <NavButton label="About" value="about" />
        <NavButton label="Projects" value="projects" />
        <NavButton label="Contact" value="contact" />
      </nav>

      {/* Pages */}
      {page === "home" && (
        <PageWrapper>
          <h1 className="text-4xl font-bold mb-4">Welcome 👋</h1>
          <p className="text-lg text-gray-700 max-w-xl">
            This is a single‑file React Single Page Application. You can upload
            this directly to GitHub and expand it later with routing, backend,
            or database integration.
          </p>
        </PageWrapper>
      )}

      {page === "about" && (
        <PageWrapper>
          <h1 className="text-3xl font-bold mb-4">About</h1>
          <p className="text-gray-700 max-w-xl">
            This SPA is built using React + Tailwind + Framer Motion animations.
            It demonstrates page switching without reload — the core concept of
            Single Page Applications.
          </p>
        </PageWrapper>
      )}

      {page === "projects" && (
        <PageWrapper>
          <h1 className="text-3xl font-bold mb-6">Projects</h1>
          <div className="grid md:grid-cols-3 gap-4">
            {[1, 2, 3].map((p) => (
              <div
                key={p}
                className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <h2 className="font-semibold text-lg mb-2">
                  Project {p}
                </h2>
                <p className="text-sm text-gray-600">
                  Description of your awesome project goes here.
                </p>
              </div>
            ))}
          </div>
        </PageWrapper>
      )}

      {page === "contact" && (
        <PageWrapper>
          <h1 className="text-3xl font-bold mb-4">Contact</h1>
          <form className="max-w-md bg-white p-4 rounded-2xl shadow-md space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 border rounded-xl"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 border rounded-xl"
            />
            <textarea
              placeholder="Message"
              className="w-full p-2 border rounded-xl"
            />
            <button className="bg-black text-white px-4 py-2 rounded-2xl w-full">
              Send
            </button>
          </form>
        </PageWrapper>
      )}

      {/* Footer */}
      <footer className="text-center p-4 text-sm text-gray-500">
        © {new Date().getFullYear()} My Single Page App
      </footer>
    </div>
  );
}
