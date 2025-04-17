import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-gradient-to-br from-red-50 to-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-lg"
      >
        <h1 className="text-5xl font-serif font-bold text-red-600 mb-4">404</h1>
        <p className="text-lg text-gray-700 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-medium transition"
        >
          Go back home
        </Link>
      </motion.div>
    </div>
  );
}
