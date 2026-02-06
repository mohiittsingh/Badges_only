import React, { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function App() {
  const [dark, setDark] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const theme = {
    bg: dark
      ? "bg-gradient-to-br from-black via-gray-900 to-black"
      : "bg-gradient-to-br from-gray-100 via-white to-gray-200",

    text: dark ? "text-white" : "text-gray-900",

    subText: dark ? "text-gray-300" : "text-gray-600",

    card: dark
      ? "bg-gradient-to-br from-gray-900 to-black border-gray-700"
      : "bg-white border-gray-200",

    input: dark
      ? "bg-black text-white border-gray-700"
      : "bg-white text-black border-gray-300",
  };

  const Section = ({ title, children }) => (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`min-h-screen flex flex-col justify-center items-center text-center px-6 transition-colors duration-700 ${theme.text}`}
    >
      <h2 className="text-4xl font-bold mb-6">{title}</h2>
      <div className={`max-w-2xl text-lg ${theme.subText}`}>
        {children}
      </div>
    </motion.section>
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={dark ? "dark" : "light"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className={`${theme.bg} font-sans min-h-screen transition-colors duration-700`}
      >
        {/* Scroll Progress */}
        <motion.div
          style={{ scaleX }}
          className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 origin-left z-50"
        />

        {/* Theme Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="fixed top-4 right-4 px-4 py-2 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 text-white shadow-lg hover:scale-105 transition"
        >
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* Hero */}
        <section className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
          <motion.div
            style={{ y: yParallax }}
            className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-transparent to-cyan-900/40"
          />

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-6xl font-extrabold z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500"
          >
            Developer Dashboard
          </motion.h1>

          <p className={`mt-4 text-lg z-10 ${theme.subText}`}>
            Classy Animated Skill Intelligence ⚡
          </p>
        </section>

        {/* Skills */}
        <Section title="Tech Stack">
          <div className="space-y-6 w-full max-w-xl">
            {[
              { name: "React", level: "90%" },
              { name: "Node.js", level: "85%" },
              { name: "PostgreSQL", level: "80%" },
              { name: "AI Integration", level: "75%" },
            ].map((skill, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span>{skill.name}</span>
                  <span>{skill.level}</span>
                </div>

                <div
                  className={`w-full h-3 rounded-full overflow-hidden ${
                    dark ? "bg-gray-800" : "bg-gray-300"
                  }`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.level }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="h-full bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Stats */}
        <Section title="GitHub Analytics">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: "Repositories", value: 42 },
              { label: "Stars", value: 128 },
              { label: "Commits", value: 1540 },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.08, y: -5 }}
                className={`${theme.card} border p-6 rounded-2xl shadow-xl transition`}
              >
                <p className={theme.subText}>{stat.label}</p>
                <h3 className="text-3xl font-bold mt-2">
                  {stat.value}
                </h3>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section title="Contact">
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`${theme.card} border p-6 rounded-2xl shadow-lg space-y-4 w-full max-w-md transition`}
          >
            <input
              type="text"
              placeholder="Your Name"
              className={`w-full p-2 border rounded-xl ${theme.input}`}
            />

            <input
              type="email"
              placeholder="Your Email"
              className={`w-full p-2 border rounded-xl ${theme.input}`}
            />

            <textarea
              placeholder="Message"
              className={`w-full p-2 border rounded-xl ${theme.input}`}
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 text-black font-semibold px-4 py-2 rounded-2xl w-full"
            >
              Send Message
            </motion.button>
          </motion.form>
        </Section>

        {/* Footer */}
        <footer
          className={`text-center p-6 text-sm transition ${theme.subText}`}
        >
          © {new Date().getFullYear()} Developer Dashboard SPA
        </footer>
      </motion.div>
    </AnimatePresence>
  );
}
