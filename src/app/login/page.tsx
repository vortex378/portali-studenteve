import Navbar from "@/components/layout/Navbar";
import LoginSessionReset from "@/components/auth/LoginSessionReset";

export default function FaqjaHyrjes() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <LoginSessionReset />
      </main>
    </>
  );
}
