import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "CTA Apparels",
  version: packageJson.version,
  copyright: `© ${currentYear}, CTA Apparels Pvt. Ltd.`,
  meta: {
    title: "CTA Apparels - Merchandising Dashboard",
    description:
      "Advanced merchandising and TNA tracking system for CTA Apparels. Manage orders, sample tracking, inventory, and supplier performance in one integrated platform.",
  },
};
