"use client";

import { useEffect, useState } from "react";
import LoadingState from "@/components/ui/LoadingState";
import { createClient } from "@/lib/supabase/client";
import LoginForm from "./LoginForm";

export default function LoginSessionReset() {
  const [gati, setGati] = useState(false);

  useEffect(() => {
    async function pastroSesionin() {
      try {
        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          await supabase.auth.signOut();
        }
      } catch {
        // Vazhdo me formën e login-it edhe nëse pastrimi dështon
      } finally {
        setGati(true);
      }
    }

    pastroSesionin();
  }, []);

  if (!gati) {
    return (
      <div className="card-elegant mx-auto w-full max-w-md rounded-2xl p-8">
        <LoadingState mesazhi="Duke përgatitur formën e hyrjes..." />
      </div>
    );
  }

  return <LoginForm />;
}
