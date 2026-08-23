import type { FAQItem } from "@/types";

/**
 * General, agency-level questions for the homepage FAQ section — kota.co.uk's
 * homepage runs six questions in this same register (cost, timeline,
 * deadlines, post-launch support, revisions, bundled pricing) before a
 * visitor ever reaches a specific service page. Per-service FAQItem arrays
 * in data/services/content.ts stay untouched and channel-specific; these
 * six stay deliberately general so they don't duplicate that content.
 */
export const HOME_FAQ: FAQItem[] = [
  {
    question: "How much does working with Velova Media typically cost?",
    answer:
      "It depends on the channels, ad spend and content volume involved — we'd rather give you an honest, tailored range in a free consultation than a headline number that doesn't hold up once we know your actual goals.",
  },
  {
    question: "How long does a project usually take to show results?",
    answer:
      "Paid channels like Meta Ads and Google Ads typically show early signal within the first few weeks; SEO and organic growth are slower-moving and are usually judged over a few months, not days.",
  },
  {
    question: "Can you accommodate tight deadlines or a specific launch date?",
    answer:
      "Usually, yes — tell us the date up front and we'll be direct about what's realistic in that window rather than overpromising and missing it.",
  },
  {
    question: "What happens after a campaign or website goes live?",
    answer:
      "We keep monitoring, reporting and optimising — monthly reporting is standard on ongoing retainers, and we flag issues before you have to ask about them.",
  },
  {
    question: "How do you handle revisions and feedback?",
    answer:
      "Every project includes a revision round built into the process, and we'd rather iterate with you openly than treat feedback as a billable surprise.",
  },
  {
    question: "Do you offer more than one service at a time?",
    answer:
      "Yes — most clients run two or more channels together (Meta Ads plus SEO, or a new Shopify build plus the launch campaign) since a bundled approach is usually more efficient than hiring separately for each.",
  },
];
