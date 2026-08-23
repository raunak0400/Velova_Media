export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

/**
 * A genuine ordered sequence (each step depends on the last completing),
 * which is why it's the one place in the design system that uses numbered
 * markers — see Design Architecture §8, Timeline component note.
 */
export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    description: "A free consultation over WhatsApp to understand your brand, your market and what growth actually needs to look like for you.",
  },
  {
    index: "02",
    title: "Strategy",
    description: "A plan built from the services that move your specific numbers — not a generic package sold to every client the same way.",
  },
  {
    index: "03",
    title: "Execute",
    description: "A dedicated team runs campaigns, content and development day to day, across India and every market you sell into.",
  },
  {
    index: "04",
    title: "Report",
    description: "Transparent monthly reporting with real numbers — the same standard whether you're in Ahmedabad or Amsterdam.",
  },
];
