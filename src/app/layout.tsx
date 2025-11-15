import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Lumineux Dental Reception",
  description:
    "AI-powered receptionist dashboard for Lumineux Dental Clinic with scheduling, check-ins, insurance verification, call management, and messaging.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          {children}
          <ToastContainer position="bottom-right" theme="colored" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
