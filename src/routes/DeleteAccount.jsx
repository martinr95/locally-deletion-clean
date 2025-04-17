import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

export default function DeleteAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!agree) {
      setMessage({ type: "error", text: t("confirmError") });
      return;
    }

    setLoading(true);
    setMessage(null);

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (loginError || !data?.session || !data.user) {
      setMessage({ type: "error", text: t("loginError") });
      setLoading(false);
      return;
    }

    const token = data.session.access_token;
    const userId = data.user.id;

    const response = await fetch(
      "https://dsoaujiqgkdsayusyzax.supabase.co/functions/v1/deleteUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();

    if (response.ok) {
      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("user_db_id", userId);
      if (profileError) {
        setMessage({ type: "error", text: t("profileDeleteFail") });
        setLoading(false);
        return;
      }
      await supabase.auth.signOut();
      toast.success(t("deleteSuccess"));
      navigate("/");
    } else {
      setMessage({ type: "error", text: result.error || t("deleteFail") });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100 px-4 flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white p-8 shadow-xl rounded-2xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {t("deleteTitle")}
        </h2>
        <form onSubmit={handleDelete} className="space-y-5">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("email")}
            required
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("password")}
            required
          />
          <label className="flex items-start space-x-3 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="form-checkbox mt-1"
            />
            <span>{t("confirmLabel")}</span>
          </label>
          <Button type="submit" disabled={loading}>
            {loading ? t("deleting") : t("deleteButton")}
          </Button>
          <span className="text-sm text-gray-500 text-center block">
            Forgot password? Reset it{" "}
            <a
              className="underline cursor-pointer hover:text-gray-600"
              href="/request-password-reset"
            >
              here
            </a>
            .
          </span>
        </form>
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-4 text-center text-sm font-medium ${
              message.type === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {message.text}
          </motion.div>
        )}
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-gray-500 text-sm mt-6 max-w-md text-justify px-2"
      >
        {t("irreversibleNote")}
        <a
          href="mailto:dolobytes@gmail.com"
          className="text-red-600 font-medium"
        >
          {" "}
          dolobytes@gmail.com
        </a>
        {". "}
        {t("deletingDisclaimerFinale")}
      </motion.p>
      <div className="mt-4">
        {/*  <button
          onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'de' : 'en')}
          className="text-sm text-gray-600 underline"
        >
          Switch to {i18n.language === 'en' ? 'Deutsch' : 'English'}
        </button>*/}
      </div>
    </div>
  );
}
