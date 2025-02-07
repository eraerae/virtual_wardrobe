import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://nabwaeiktpnqxwohvril.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hYndhZWlrdHBucXh3b2h2cmlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU0MTA5MDAsImV4cCI6MjAyMDk4NjkwMH0.l_9FIcK6mP_RJSmjd5ywW45B02EzSWVdydNUiu6QGfc"
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);
