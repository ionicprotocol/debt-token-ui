import { ReactNode } from "react";
import { ConnectWallet } from "./ConnectWallet";
import { NetworkInfo } from "./NetworkInfo";
import { ToastContextProvider } from "./ui/ToastContext";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <ToastContextProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">I</span>
              </div>
              <h1 className="text-xl font-bold">Ionic Debt UI</h1>
            </div>
            <div className="flex items-center space-x-4">
              <NetworkInfo />
              <ConnectWallet />
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">{children}</main>
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Ionic Protocol. All rights
              reserved.
            </div>
          </div>
        </footer>
      </div>
    </ToastContextProvider>
  );
}
