import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AIProvider } from "@/components/ai/AIProvider";
import { AITrigger } from "@/components/ai/AITrigger";
import { AIPanel } from "@/components/ai/AIPanel";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AIProvider>
      <Header />
      <main className="mx-auto min-h-[calc(100vh-3.5rem-5rem)] max-w-5xl px-6">
        {children}
      </main>
      <Footer />
      <AITrigger />
      <AIPanel />
    </AIProvider>
  );
}
