import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://dsoaujiqgkdsayusyzax.supabase.co", // your URL
  import.meta.env.VITE_SUPABASE_ANON_KEY // set this in .env
);

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!agree) {
      setMessage({ type: "error", text: "You must confirm before deleting." });
      return;
    }

    setLoading(true);
    setMessage(null);

    // Step 1: Sign in to get access token and user ID
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError || !data?.session || !data.user) {
      setMessage({
        type: "error",
        text: "Login failed. Please check your credentials.",
      });
      setLoading(false);
      return;
    }

    const token = data.session.access_token;
    const userId = data.user.id;

    // Step 2: Call Edge Function to delete Supabase Auth user
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
      // Step 3: Delete profile entry using Supabase client
      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("user_db_id", userId);

      if (profileError) {
        console.error("Failed to delete profile:", profileError);
        setMessage({
          type: "error",
          text: "Auth deleted, but profile deletion failed.",
        });
        setLoading(false);
        return;
      }

      // Step 4: Sign out and confirm deletion
      await supabase.auth.signOut();
      setMessage({
        type: "success",
        text: "Your account and profile were deleted successfully.",
      });
    } else {
      setMessage({ type: "error", text: result.error || "Deletion failed." });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Delete Your AlmadinApp Account
        </h2>
        <form onSubmit={handleDelete} className="space-y-4">
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="form-checkbox"
            />
            <span>I understand this will permanently delete my account.</span>
          </label>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded text-white ${
              loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Deleting..." : "Delete My Account"}
          </button>
        </form>
        {message && (
          <div
            className={`mt-4 text-center text-sm ${
              message.type === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
