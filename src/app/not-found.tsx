import Link from "next/link";
import { Shield } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Card from "@/components/ui/Card";

export default function FaqjaNukUGjet() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center overflow-x-hidden px-4 py-20 text-center">
        <Card glass padding="lg" className="max-w-md animate-slide-up">
          <div className="icon-accent-box mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
            <Shield className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-6xl font-bold gold-accent">404</h1>
          <h2 className="mt-4 text-xl font-semibold text-foreground">
            Faqja nuk u gjet
          </h2>
          <p className="mt-3 text-sm text-muted">
            Faqja që kërkoni nuk ekziston ose është zhvendosur.
          </p>
          <Link
            href="/"
            className="btn-primary mt-8 inline-block rounded-xl px-8 py-3.5 text-sm font-semibold"
          >
            Kthehu në Kryefaqe
          </Link>
        </Card>
      </main>
    </>
  );
}
