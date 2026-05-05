import Link from "next/link";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SidebarSupportCard() {
  return (
    <Card size="sm" className="shadow-none group-data-[collapsible=icon]:hidden">
      <CardHeader className="px-4">
        <CardTitle className="text-sm">Looking for something more?</CardTitle>
        <CardDescription>
          Reach out to me via my&nbsp;
          <Link
            href="https://diwakarbhagat.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Website"
            className="text-foreground underline transition-colors hover:text-primary"
          >
            Website
          </Link>
          &nbsp;or&nbsp;
          <Link
            href="mailto:diwakarbhagat.pro@gmail.com"
            aria-label="Email me"
            className="text-foreground underline transition-colors hover:text-primary"
          >
            Email
          </Link>
          .
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
