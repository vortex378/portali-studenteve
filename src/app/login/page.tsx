import Navbar from "@/components/layout/Navbar";
import LoginSessionReset from "@/components/auth/LoginSessionReset";

export default function FaqjaHyrjes() {
  return (
    <>
      <Navbar />
      <main className="pattern-bg flex flex-1 items-center justify-center overflow-x-hidden px-4 py-12 sm:py-16">
        <LoginSessionReset />
      </main>
    </>
  );
}
