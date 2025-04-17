import { useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { supabase } from "../lib/supabaseClient";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenChecked, setTokenChecked] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
      setHasToken(true);
    }
    setTokenChecked(true);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      toast.error("Failed to update password. Try again.");
    } else {
      toast.success("Password updated successfully!");
      navigate("/");
    }

    setLoading(false);
  };

  if (!tokenChecked) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-white to-red-50 text-center">
      <motion.div
        className="max-w-md bg-white shadow-lg rounded-xl p-8 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {hasToken ? (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Set New Password
            </h1>
            <form onSubmit={handleUpdate} className="space-y-4">
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Invalid or Missing Token
            </h1>
            <p className="text-gray-600 text-sm">
              The reset link is invalid or expired. Please request a new
              password reset.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
