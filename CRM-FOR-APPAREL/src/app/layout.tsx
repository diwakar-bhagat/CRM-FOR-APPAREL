import type { ReactNode } from "react";

import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { APP_CONFIG } from "@/config/app-config";
import { fontVars } from "@/lib/fonts/registry";
import { PREFERENCE_DEFAULTS } from "@/lib/preferences/preferences-config";
import { ThemeBootScript } from "@/scripts/theme-boot";
import { PreferencesStoreProvider } from "@/stores/preferences/preferences-provider";
import { SettingsProvider } from "@/stores/settings/settings-provider";

import "./globals.css";

const metadataBase = new URL(
  process.env.NEXT_PUBLIC_APP_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ??
    (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ??
    "https://crm-for-apparel.vercel.app",
);

export const metadata: Metadata = {
  metadataBase,
  title: {
    template: `%s | ${APP_CONFIG.name}`,
    default: APP_CONFIG.meta.title,
  },
  description: APP_CONFIG.meta.description,
  openGraph: {
    title: APP_CONFIG.meta.title,
    description: APP_CONFIG.meta.description,
    type: "website",
    siteName: APP_CONFIG.name,
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: APP_CONFIG.meta.title,
    description: APP_CONFIG.meta.description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const { theme_mode, theme_preset, content_layout, navbar_style, sidebar_variant, sidebar_collapsible, font } =
    PREFERENCE_DEFAULTS;
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "hsl(221 83% 53%)",
          colorBackground: "hsl(var(--background))",
          colorText: "hsl(var(--foreground))",
          colorTextSecondary: "hsl(var(--foreground-muted))",
          colorInputBackground: "hsl(var(--background))",
          colorInputText: "hsl(var(--foreground))",
          borderRadius: "0.5rem",
          fontFamily: "Geist, Inter, system-ui, sans-serif",
          fontSize: "14px",
        },
        elements: {
          card: "shadow-sm border border-border bg-card rounded-xl",
          formButtonPrimary:
            "bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md shadow-sm font-medium transition-colors",
          socialButtonsBlockButton:
            "bg-background text-foreground border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-md shadow-sm font-medium transition-colors",
          formFieldInput:
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          formFieldLabel:
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground",
          headerTitle: "text-2xl font-semibold tracking-tight text-foreground",
          headerSubtitle: "text-sm text-muted-foreground",
          dividerLine: "bg-border",
          dividerText: "text-muted-foreground text-xs",
          footerActionLink: "text-primary hover:text-primary/90 font-medium",
          logoBox: "block",
        },
      }}
    >
      <html
        lang="en"
        data-theme-mode={theme_mode}
        data-theme-preset={theme_preset}
        data-content-layout={content_layout}
        data-navbar-style={navbar_style}
        data-sidebar-variant={sidebar_variant}
        data-sidebar-collapsible={sidebar_collapsible}
        data-font={font}
        suppressHydrationWarning
      >
        <head>
          {/* Applies theme and layout preferences on load to avoid flicker and unnecessary server rerenders. */}
          <ThemeBootScript />
        </head>
        <body className={`${fontVars} min-h-screen antialiased`}>
          <TooltipProvider>
            <PreferencesStoreProvider
              themeMode={theme_mode}
              themePreset={theme_preset}
              contentLayout={content_layout}
              navbarStyle={navbar_style}
              font={font}
            >
              <QueryProvider>
                <SettingsProvider>{children}</SettingsProvider>
              </QueryProvider>
              <Toaster />
            </PreferencesStoreProvider>
          </TooltipProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
