import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[calc(100vh-3.5rem-5rem)] max-w-5xl flex-col items-center justify-center px-6">
        <h1 className="font-serif text-4xl font-semibold tracking-tight">
          404
        </h1>
        <p className="mt-2 text-muted-foreground">
          This page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-6 text-sm font-medium underline underline-offset-4"
        >
          Go home
        </Link>
      </main>
      <Footer />
    </>
  );
}
