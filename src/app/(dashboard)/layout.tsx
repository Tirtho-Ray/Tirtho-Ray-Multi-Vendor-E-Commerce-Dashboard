import Sidebar from "@/components/layout/Sidebar";
import Container from "@/components/ui/container/Container";
import { Suspense } from "react";

export const metadata = {
  title: "Xbit Sora",
  description: "Sidebar Layout App",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Container>
        <div className="">
          <div className="flex h-screen overflow-hidden py-3">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-y-auto">
              <main className="px-4 ml-5">
                <Suspense
                  fallback={<div className="p-6">⏳ Loading content...</div>}
                >
                  {children}
                </Suspense>
              </main>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
