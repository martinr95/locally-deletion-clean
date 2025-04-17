import { motion } from "framer-motion";
import logo from "../assets/Locally_logo_black.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 flex flex-col items-center justify-center px-6 text-center">
      <motion.img
        src={logo}
        alt="Logo"
        className="w-32 h-32 mb-6 object-contain"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.h1
        className="text-4xl font-bold text-gray-800 mb-4 font-serif"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Welcome to AlmadinApp
      </motion.h1>
      <motion.p
        className="text-lg text-gray-600 max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Manage your account settings{" "}
        <a
          className="cursor-ponter hover:text-gray-700 underline"
          href="/deleteAccount"
        >
          here
        </a>
        .
      </motion.p>
    </div>
  );
}
