import type { FAQItem, ServiceWhatIncluded } from "@/types";

/**
 * Full per-service page content. Source-of-truth discipline, since the
 * blueprint is a strategy document, not a full copy dump:
 *
 * - primaryKeyword: exact, from SEO Blueprint §4.1 (every page, unchanged).
 * - h1 / metaTitle / metaDescription: exact verbatim quotes where the
 *   blueprint gives a "SEO META DATA" block (Social Media Management,
 *   B2B Lead Gen). For the six pages marked "Keep As-Is" with no meta
 *   block restated, these are constructed from the confirmed primary
 *   keyword following the same pattern the blueprint itself uses
 *   elsewhere — the blueprint says these pages' existing meta already
 *   "correctly and cleanly" targets the keyword, but doesn't quote the
 *   literal string, so it can't be reproduced verbatim here.
 * - Paragraphs marked "(verbatim)" in a comment are exact blueprint copy
 *   and must not be edited. Unmarked overview/FAQ copy is written fresh
 *   (the blueprint confirms these sections are "well-written, no changes"
 *   on the live site but doesn't quote them) and should be swapped for the
 *   real existing copy where the client has it.
 * - No fabricated pricing figures: the blueprint gives a real number only
 *   for B2B Lead Gen ("from ₹30,000/month"). Every other service's pricing
 *   FAQ stays qualitative rather than inventing a number — swap in the
 *   real figure from the live site's existing FAQ before launch.
 */

export interface ServiceContent {
  slug: string;
  primaryKeyword: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  heroSubheading: string;
  overview: string[];
  whatsIncluded: ServiceWhatIncluded[];
  faq: FAQItem[];
}

const INTERNATIONAL_NOTE_SUPPORTING =
  "We also manage this for clients internationally — the same team and standard, whether you're in Ahmedabad or Amsterdam.";

export const SERVICE_CONTENT: ServiceContent[] = [
  // ---------------------------------------------------------------
  // HERO TIER
  // ---------------------------------------------------------------
  {
    slug: "social-media-management",
    primaryKeyword: "Meta Ads & social media marketing agency Ahmedabad",
    h1: "Meta Ads & Social Media Marketing Agency in Ahmedabad — Instagram, Facebook & Performance Campaigns",
    metaTitle: "Meta Ads & Social Media Marketing Agency Ahmedabad | Velova Media",
    metaDescription:
      "Velova Media runs Meta Ads and social media for brands across India, the UK, USA, Canada & the Netherlands. Instagram, Facebook, Meta Ads management. Real leads, not vanity metrics.",
    heroSubheading: "Performance-first Meta Ads and social media management — campaigns built around real leads, not vanity metrics.",
    overview: [
      "Social media isn't just about posting consistently — it's about turning attention into real business results. We manage Instagram, Facebook and LinkedIn accounts with one goal: campaigns that convert, not just campaigns that look good.",
      "Every account gets a dedicated strategist, real Meta Ads management, and monthly reporting that shows exactly what your spend is doing — no vanity metrics, no guesswork.",
      // (verbatim — SEO Blueprint §6.3)
      "We manage Meta Ads and social accounts for clients well beyond Ahmedabad — including e-commerce and D2C brands in the UK, the USA, Canada and the Netherlands, where campaign structure, creative approach and even compliance requirements (like the EU's Omnibus Directive on influencer and ad disclosure) can differ meaningfully from the Indian market. If you're running Meta Ads for an international audience, that experience is built in, not bolted on.",
    ],
    whatsIncluded: [
      { title: "Instagram & Reels", description: "Content strategy, Reels production and community growth built around what actually gets shared." },
      { title: "Facebook & Meta Ads", description: "Campaign structure, creative testing and budget management across the full Meta Ads stack." },
      { title: "LinkedIn", description: "B2B-focused content and outreach for brands that sell to other businesses." },
      { title: "Content Creation", description: "Scroll-stopping creative, shot and edited for how people actually use each platform." },
      { title: "Community Management", description: "Real responses to real comments and DMs — never an auto-reply that makes a brand look absent." },
      { title: "Monthly Reports", description: "Plain-language reporting on what worked, what didn't, and what's changing next month." },
    ],
    faq: [
      {
        question: "What's the difference between social media management and Meta Ads?",
        answer:
          "Social media management covers your organic Instagram, Facebook and LinkedIn presence — content, community and growth. Meta Ads is paid: budget spent to reach specific people with a specific goal. We run both together so your paid and organic content reinforce each other instead of working in isolation.",
      },
      {
        question: "How much does Meta Ads and social media management cost?",
        answer:
          "It depends on the number of platforms, content volume and ad spend you're working with. We'll recommend a realistic monthly budget in your free consultation — there's no one-size-fits-all number, and we'd rather give you an honest range than a low headline price that changes later.",
      },
      {
        question: "Do you manage Meta Ads for brands outside India?",
        answer:
          "Yes — we run Meta Ads and social accounts for e-commerce and D2C brands in the UK, the USA, Canada and the Netherlands, with campaign structure and compliance adapted to each market.",
      },
    ],
  },
  {
    slug: "shopify-store-creation",
    primaryKeyword: "Shopify store development Ahmedabad",
    h1: "Shopify Store Development Agency in Ahmedabad — Design, Build & Grow Your D2C Store",
    metaTitle: "Shopify Store Development Agency Ahmedabad | Velova Media",
    metaDescription:
      "Velova Media designs and builds Shopify stores for D2C brands in India and internationally — store setup, CRO, migrations and ongoing support.",
    heroSubheading: "Shopify storefronts built for brands selling across India, Europe and North America — not just Ahmedabad.",
    overview: [
      "A Shopify store is more than a template with your logo on it. We build storefronts around how your specific customers actually shop — product discovery, checkout friction, mobile speed — the details that separate a store that looks good from one that converts.",
      // (verbatim — SEO Blueprint §6.3)
      "D2C brands don't stop at India's border, and neither do we — we've built and audited Shopify storefronts for e-commerce brands selling into European and North American markets, where currency, shipping logic, and trust conventions (EU cookie/consent rules, Dutch and UK buyer expectations) need to be built into the store from day one, not patched on afterward.",
    ],
    whatsIncluded: [
      { title: "Store Setup & Design", description: "A storefront built on your brand, not a generic theme with swapped colours." },
      { title: "App Integration & Optimisation", description: "The right app stack for your catalogue size and workflow — nothing bloated, nothing missing." },
      { title: "Store Migration", description: "Moving from another platform to Shopify without losing SEO equity or order history." },
      { title: "Conversion Rate Optimisation", description: "Checkout, product page and mobile-speed audits aimed at turning more visitors into orders." },
      { title: "Ongoing Support", description: "A team that keeps your store running as your catalogue and traffic grow." },
    ],
    faq: [
      {
        question: "How much does a Shopify store cost to build?",
        answer:
          "Cost depends on catalogue size, custom design work and the app stack you need. We'll give you a clear, itemised quote after understanding your specific requirements in a free consultation.",
      },
      {
        question: "Should I use Amazon, Shopify, or both?",
        answer:
          "Most D2C brands eventually want both — Amazon for discovery and marketplace reach, Shopify for full control over brand experience and customer data. We can help you decide which to prioritise first based on your product and margins.",
      },
      {
        question: "Can you build a Shopify store for customers outside India?",
        answer:
          "Yes — we've built and audited stores for D2C brands selling into the UK, the USA and the Netherlands, with currency, shipping and consent requirements handled from day one.",
      },
    ],
  },
  {
    slug: "seo",
    primaryKeyword: "SEO agency Ahmedabad",
    h1: "SEO Agency in Ahmedabad — Rankings Built for Search and AI Search",
    metaTitle: "SEO Agency in Ahmedabad | Velova Media",
    metaDescription:
      "Velova Media is an SEO agency in Ahmedabad building rankings that hold up in classic search and Google's AI-powered search features.",
    heroSubheading: "SEO built for how people actually search now — including the AI Overviews sitting on top of the results page.",
    overview: [
      "SEO that works isn't a one-time audit and a stack of keywords — it's ongoing, structured work executed by an experienced team that understands both Google's algorithm and your local market. " +
        // (verbatim — SEO Blueprint §6.3)
        "That now includes how Google's AI Overviews and AI-powered search surface answers — we structure content so it's findable by both classic search rankings and the newer answer-engine and AI-search systems.",
      `${INTERNATIONAL_NOTE_SUPPORTING}`,
    ],
    whatsIncluded: [
      { title: "Local SEO", description: "Google Business Profile, local citations and the on-page signals that win Ahmedabad-specific searches." },
      { title: "On-Page SEO", description: "Titles, headings and content structure built around the keywords your customers actually search." },
      { title: "Technical SEO", description: "Site speed, crawlability and schema — the foundation classic rankings and AI search both depend on." },
      { title: "Link Building", description: "Real, relevant backlinks — not the directory-spam kind that puts your domain at risk." },
      { title: "Ecommerce SEO", description: "Category and product page structure built to rank and convert, not just rank." },
      { title: "Content Marketing", description: "Blog and resource content built for topical authority, not thin keyword-stuffed pages." },
    ],
    faq: [
      {
        question: "How long does SEO take to show results?",
        answer:
          "Most clients start seeing meaningful movement in 3-6 months, with compounding results after that — SEO is a long-term channel, and we'll say so plainly rather than promise a faster timeline than is realistic.",
      },
      {
        question: "How much does SEO cost in Ahmedabad?",
        answer:
          "Pricing depends on your site's current state, competition and how many pages need work. We'll walk through a realistic scope and monthly investment in your free consultation.",
      },
      {
        question: "Do you optimise for Google's AI Overviews too?",
        answer:
          "Yes — we structure content with clear, direct-answer formatting and proper schema markup, which is what both classic rankings and AI-generated answers pull from.",
      },
    ],
  },
  {
    slug: "b2b-lead-generation",
    primaryKeyword: "B2B lead generation agency Ahmedabad",
    h1: "B2B Lead Generation Agency in Ahmedabad — WhatsApp, Meta & Click-to-Message Campaigns",
    metaTitle: "B2B Lead Generation Agency Ahmedabad | Velova Media",
    metaDescription:
      "Velova Media builds B2B lead generation systems that actually deliver sales-ready leads — Click-to-WhatsApp campaigns, Meta lead ads & funnel design. Serving India & international B2B brands.",
    heroSubheading:
      "Most \"lead gen\" campaigns hand you a spreadsheet of names. We build systems — Click-to-WhatsApp campaigns, Meta lead ads, and qualification funnels — that get sales-ready conversations started automatically, for B2B brands in India and internationally.",
    overview: [
      // (verbatim — SEO Blueprint §6.4)
      "B2B buyers research on their own terms and reach out when they're ready — which means a slow contact form is often the difference between a lead and a lost prospect. Velova Media designs lead generation systems built around how B2B buyers actually behave: instant Click-to-WhatsApp ad flows that start a real conversation the moment someone clicks, Meta lead-generation ads with pre-qualifying questions built in, and funnel logic that routes serious prospects to your sales team fast instead of burying them in a CRM export nobody follows up on.",
    ],
    whatsIncluded: [
      { title: "Click-to-WhatsApp Campaigns", description: "Meta ad campaigns built specifically to open a WhatsApp conversation, not just collect a form submission — the fastest way to move a B2B prospect from ad click to real conversation." },
      { title: "Meta Lead Ads & Qualification", description: "Instant-form lead ads with qualifying questions built in, so your sales team spends time on leads worth calling, not every click." },
      { title: "Funnel & Landing Page Design", description: "Purpose-built landing pages for lead campaigns, designed around conversion, not just aesthetics." },
      { title: "Lead Routing & Follow-Up Systems", description: "We help set up the handoff — CRM integration, WhatsApp Business automation, or simple notification systems — so a hot lead never sits untouched." },
      { title: "Vertical-Specific Campaigns", description: "B2B lead gen isn't one-size-fits-all — we tailor targeting, messaging and qualification criteria to your industry and deal size, whether that's local B2B services or export-facing B2B brands." },
    ],
    faq: [
      // (verbatim — SEO Blueprint §6.4)
      {
        question: "What's the difference between B2B lead generation and regular Meta Ads?",
        answer:
          "Regular Meta Ads campaigns are often optimised for broad awareness or e-commerce sales. B2B lead generation campaigns are built around a longer, more considered buying process — which means different ad objectives (leads and conversations, not just clicks), different qualifying questions, and a funnel that's designed to filter for genuine buying intent rather than volume.",
      },
      {
        question: "How much does B2B lead generation cost?",
        answer:
          "Campaign management typically starts from ₹30,000/month, with ad spend budgeted separately based on your target lead volume and industry CPL. We'll recommend a realistic budget in your free consultation based on your sector and goals.",
      },
      {
        question: "Do you work with B2B brands outside India?",
        answer:
          "Yes — we manage lead generation for B2B brands targeting international markets as well as domestic Indian buyers, with campaign structure and messaging adapted to each market.",
      },
    ],
  },

  // ---------------------------------------------------------------
  // SUPPORTING TIER
  // ---------------------------------------------------------------
  {
    slug: "google-ads",
    primaryKeyword: "Google Ads agency Ahmedabad",
    h1: "Google Ads Agency in Ahmedabad — Search, Display & Shopping Campaigns",
    metaTitle: "Google Ads Agency Ahmedabad | Velova Media",
    metaDescription: "Velova Media manages Google Ads — Search, Display, Shopping and Remarketing — for brands in Ahmedabad and internationally.",
    heroSubheading: "Search, Display, Shopping and Remarketing campaigns managed by a certified team.",
    overview: [
      "Google Ads can be one of the fastest routes to qualified traffic — or one of the fastest ways to burn a budget with nothing to show for it. We manage campaigns with the same discipline we bring to every channel: clear goals, real testing, and reporting that shows what your spend is actually doing.",
      INTERNATIONAL_NOTE_SUPPORTING,
    ],
    whatsIncluded: [
      { title: "Search Campaigns", description: "Intent-driven campaigns targeting the exact searches your customers are already making." },
      { title: "Display & Remarketing", description: "Staying in front of visitors who didn't convert the first time, without wasting spend on people who'll never buy." },
      { title: "Shopping Campaigns", description: "Product feed optimisation and Shopping campaigns built for e-commerce catalogues." },
      { title: "Conversion Tracking", description: "Proper tracking set up from day one, so every number in your report is one you can trust." },
    ],
    faq: [
      {
        question: "How is Google Ads different from Meta Ads?",
        answer:
          "Google Ads captures people actively searching for something specific — high intent, often higher cost per click. Meta Ads reaches people based on interests and behaviour before they've started searching. Most brands benefit from both, weighted differently depending on the product and sales cycle.",
      },
      {
        question: "How much should I budget for Google Ads?",
        answer: "Budget depends on your industry's cost-per-click and how much volume you need. We'll recommend a realistic starting budget in your free consultation.",
      },
      {
        question: "Do you manage Google Ads for international campaigns?",
        answer: "Yes — we manage Google Ads for clients targeting audiences outside India as well as domestic campaigns.",
      },
    ],
  },
  {
    slug: "amazon-account-management",
    primaryKeyword: "Amazon account management Ahmedabad",
    h1: "Amazon Account Management Agency in Ahmedabad",
    metaTitle: "Amazon Account Management Agency Ahmedabad | Velova Media",
    metaDescription: "Velova Media manages Amazon seller accounts — listing optimisation, advertising and account health — for brands in India and internationally.",
    heroSubheading: "Listing optimisation, advertising and account health management for Amazon sellers.",
    overview: [
      "Selling well on Amazon means winning the buy box, not just being listed. We manage the full account — listings, advertising and account health — so your catalogue actually competes on the platform's own terms.",
      INTERNATIONAL_NOTE_SUPPORTING,
    ],
    whatsIncluded: [
      { title: "Listing Optimisation", description: "Titles, images and backend keywords built to rank and convert inside Amazon's own search." },
      { title: "Amazon PPC", description: "Sponsored Products, Brands and Display campaigns managed for profitable ACoS, not just visibility." },
      { title: "Account Health Management", description: "Monitoring policy compliance and performance metrics so your account stays in good standing." },
      { title: "Catalogue Management", description: "Keeping listings, inventory and pricing consistent as your catalogue grows." },
    ],
    faq: [
      {
        question: "Do you manage Amazon accounts outside India?",
        answer: "Yes — we manage Amazon seller accounts for brands selling into international Amazon marketplaces as well as Amazon.in.",
      },
      {
        question: "How much does Amazon account management cost?",
        answer: "Pricing depends on catalogue size and ad spend. We'll give you a clear quote after reviewing your current account in a free consultation.",
      },
      {
        question: "Can you fix an Amazon account that's been suspended?",
        answer: "We can help diagnose account health issues and work through Amazon's reinstatement process, though outcomes depend on the specific violation.",
      },
    ],
  },
  {
    slug: "graphic-design",
    primaryKeyword: "graphic design agency Ahmedabad",
    h1: "Graphic Design Agency in Ahmedabad — Brand Identity & Campaign Design",
    metaTitle: "Graphic Design Agency Ahmedabad | Velova Media",
    metaDescription: "Velova Media is a graphic design agency in Ahmedabad — brand identity, social creative and print collateral for brands in India and internationally.",
    heroSubheading: "Brand identity and campaign design that holds up across every channel it touches.",
    overview: [
      "Good design is consistent design — the same brand recognisable whether it's a social post, a product package or a pitch deck. We build visual systems, not one-off graphics.",
      INTERNATIONAL_NOTE_SUPPORTING,
    ],
    whatsIncluded: [
      { title: "Brand Identity", description: "Logo, colour, type and visual system built to work everywhere your brand shows up." },
      { title: "Social Media Creative", description: "On-brand templates and campaign creative that keep every post visually consistent." },
      { title: "Print Collateral", description: "Packaging, brochures and print materials designed to the same standard as your digital presence." },
      { title: "Campaign Design", description: "Visual systems for individual campaigns and launches, built to stand out without breaking the brand." },
    ],
    faq: [
      {
        question: "Do you offer a full brand identity package, or individual design pieces?",
        answer: "Both — we can build a complete brand identity from scratch, or work within an existing identity for ongoing campaign and social creative.",
      },
      {
        question: "How much does graphic design cost?",
        answer: "Cost depends on scope — a full brand identity is priced differently to ongoing monthly creative. We'll scope this with you in a free consultation.",
      },
      {
        question: "Can you design for international audiences?",
        answer: "Yes — we design for brands and markets outside India, adapting tone and visual conventions where they differ.",
      },
    ],
  },
  {
    slug: "website-development",
    primaryKeyword: "website development company Ahmedabad",
    h1: "Website Development Company in Ahmedabad",
    metaTitle: "Website Development Company Ahmedabad | Velova Media",
    metaDescription: "Velova Media builds fast, conversion-focused websites for brands in Ahmedabad and internationally, built on modern foundations.",
    heroSubheading: "Fast, conversion-focused websites built on modern foundations — not a template with your logo swapped in.",
    overview: [
      "A website's job is to convert, not just exist. We design and build websites around real user journeys — clear navigation, fast load times, and a path to contact or purchase that doesn't make visitors work for it.",
      INTERNATIONAL_NOTE_SUPPORTING,
    ],
    whatsIncluded: [
      { title: "UX/UI Design", description: "Layouts built around how your specific visitors actually browse and decide." },
      { title: "Development", description: "Fast, modern builds — no bloated page builders slowing down your Core Web Vitals." },
      { title: "CMS Integration", description: "Content you can update yourself, without needing a developer for every text change." },
      { title: "Ongoing Maintenance", description: "Updates, monitoring and support so the site stays fast and secure after launch." },
    ],
    faq: [
      {
        question: "How long does a website take to build?",
        answer: "Timelines depend on scope — a straightforward brochure site moves faster than a full e-commerce build. We'll give you a realistic timeline once we understand your requirements.",
      },
      {
        question: "How much does a website cost?",
        answer: "Cost depends on the number of pages, custom functionality and design complexity. We'll provide a clear quote after a free consultation.",
      },
      {
        question: "Do you build websites for businesses outside India?",
        answer: "Yes — we build and maintain websites for clients across the markets we serve, not only Ahmedabad-based businesses.",
      },
    ],
  },
  {
    slug: "product-photography",
    primaryKeyword: "product photography Ahmedabad",
    h1: "Product Photography & Videography in Ahmedabad",
    metaTitle: "Product Photography & Videography Ahmedabad | Velova Media",
    metaDescription: "Velova Media shoots studio and lifestyle product photography and videography for brands in Ahmedabad and internationally.",
    heroSubheading: "Studio and lifestyle content that makes a product page — or a Shopify listing — actually convert.",
    overview: [
      "Product pages live or die on how the product looks. We shoot studio and lifestyle content built for how each platform actually displays it — Amazon listing requirements, Shopify galleries, and social feeds are all different problems.",
      INTERNATIONAL_NOTE_SUPPORTING,
    ],
    whatsIncluded: [
      { title: "Studio Photography", description: "Clean, platform-compliant product shots for listings and catalogues." },
      { title: "Lifestyle Shoots", description: "Product-in-context imagery for social, ads and hero banners." },
      { title: "Product Videography", description: "Short-form video built for how your product actually gets used." },
      { title: "Retouching & Editing", description: "Consistent colour, cropping and finishing across an entire catalogue." },
    ],
    faq: [
      {
        question: "Do you shoot on location or in-studio?",
        answer: "Both — studio shoots for clean catalogue imagery, on-location for lifestyle and brand content, depending on what the product needs.",
      },
      {
        question: "How much does a product photography shoot cost?",
        answer: "Pricing depends on the number of products, shot types and whether video is included. We'll scope this with you directly.",
      },
      {
        question: "Can you shoot content for an international audience?",
        answer: "Yes — we shoot content built for the trust and presentation conventions of the specific market it's targeting.",
      },
    ],
  },
  {
    slug: "influencer-marketing",
    primaryKeyword: "influencer marketing agency Ahmedabad",
    h1: "Influencer Marketing Agency in Ahmedabad",
    metaTitle: "Influencer Marketing Agency Ahmedabad | Velova Media",
    metaDescription: "Velova Media runs influencer marketing campaigns — creator sourcing, management and UGC — for brands in India and internationally.",
    heroSubheading: "Creator partnerships matched to your category and market, not a generic follower-count list.",
    overview: [
      "The right influencer for your brand isn't always the biggest one. We match creators to your category and audience, then manage the whole relationship — briefing, content and reporting — so campaigns feel authentic instead of obviously paid.",
      INTERNATIONAL_NOTE_SUPPORTING,
    ],
    whatsIncluded: [
      { title: "Creator Sourcing", description: "Matching creators to your category, audience and budget — not just follower count." },
      { title: "Campaign Management", description: "Briefing, contracts and content approval handled end to end." },
      { title: "UGC Content", description: "Creator-shot content repurposed for your own ads and social channels." },
      { title: "Performance Tracking", description: "Reporting on reach, engagement and — where trackable — conversions." },
    ],
    faq: [
      {
        question: "Do you work with micro-influencers or only large creators?",
        answer: "Both — micro-influencers often deliver stronger engagement and lower cost per result, and we'll recommend the right mix for your budget and goals.",
      },
      {
        question: "How much does influencer marketing cost?",
        answer: "Cost depends on creator tier, deliverables and campaign scale. We'll walk through realistic options in your free consultation.",
      },
      {
        question: "Do you have a Gujarati-speaking creator network?",
        answer: "Yes — we work with regional creators for brands targeting Gujarati-speaking audiences specifically, alongside our broader national and international creator network.",
      },
    ],
  },
];

export function getServiceContent(slug: string): ServiceContent | undefined {
  return SERVICE_CONTENT.find((s) => s.slug === slug);
}
