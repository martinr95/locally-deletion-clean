import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { supabase } from "../lib/supabaseClient";
import ReCAPTCHA from "react-google-recaptcha";

export default function RequestPasswordReset() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      toast.error("Please verify the CAPTCHA before continuing.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://almadinapp.dolobytes.com/resetPassword",
    });

    if (error) {
      toast.error("Something went wrong. Please check the email.");
    } else {
      toast.success("Password reset email sent!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-white to-red-50 text-center">
      <motion.div
        className="max-w-md bg-white shadow-lg rounded-xl p-8 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Reset Your Password
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Enter your email below. If it matches a user, you'll receive a
          password reset link.
        </p>
        <form onSubmit={handleReset} className="space-y-4">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
          />
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={(value) => setCaptchaValue(value)}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
