import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4">
      {/* Decorative background elements to match the premium aesthetic */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />

      <SignIn
        appearance={{
          layout: {
            logoImageUrl: "/logo.png",
            logoPlacement: "inside",
            socialButtonsPlacement: "bottom",
            showOptionalFields: false,
          },
          variables: {
            colorPrimary: "#00F0FF",
            colorTextSecondary: "#A3A3A3",
            borderRadius: "0.5rem",
            fontFamily: "Inter, sans-serif",
          },
          elements: {
            logoBox: "mb-6 flex justify-center",
            logoImage: "h-14 w-14 object-contain transition-all hover:scale-105",
            card: "bg-background/80 backdrop-blur-xl border border-border shadow-2xl",
            headerTitle: "text-2xl font-bold tracking-tight",
            headerSubtitle: "text-muted-foreground",
            formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90 transition-all",
            footerActionLink: "text-primary hover:text-primary/80",
            socialButtonsBlockButton: "border-border hover:bg-muted/50 transition-colors",
            formFieldInput: "bg-background/50 border-border focus:ring-primary focus:border-primary",
          },
        }}
      />
    </div>
  );
}
