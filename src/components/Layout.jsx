import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-gray-100 text-sm text-center text-gray-500 py-4 mt-8">
        © {new Date().getFullYear()} AlmadinApp. All rights reserved.
      </footer>
    </div>
  );
}
