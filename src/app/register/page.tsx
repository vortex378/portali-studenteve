import Navbar from "@/components/layout/Navbar";
import RegisterForm from "@/components/auth/RegisterForm";
import { getBranchesForPublic } from "@/lib/branches/getBranches";

export default async function FaqjaERegjistrimit() {
  const degët = await getBranchesForPublic();

  return (
    <>
      <Navbar />
      <main className="pattern-bg flex flex-1 items-center justify-center overflow-x-hidden px-3 py-8 sm:px-4 sm:py-12">
        <RegisterForm degët={degët} />
      </main>
    </>
  );
}
