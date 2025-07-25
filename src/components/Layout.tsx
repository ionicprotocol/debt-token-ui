import { ReactNode } from 'react';
import { ToastContextProvider } from './ui/ToastContext';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <ToastContextProvider>
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b border-border">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">I</span>
              </div>
              <h1 className="text-xl font-bold">Ionic Debt UI</h1>
            </div>
            <div className="flex items-center space-x-4">
              <appkit-button />
            </div>
          </div>
        </header>
        <main className="container mx-auto px-6 py-8">{children}</main>
        <footer className="bg-card border-t border-border mt-auto">
          <div className="container mx-auto px-6 py-6">
            <div className="text-center text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Ionic Protocol. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </ToastContextProvider>
  );
}
