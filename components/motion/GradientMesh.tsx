import { cn } from "@/lib/utils/cn";

interface GradientMeshProps {
  className?: string;
}

/**
 * Soft, slowly-drifting multi-color blob background — kota.co.uk's signature
 * light-section backdrop. Pure CSS (keyframe transforms on blurred radial
 * gradients), so it costs nothing beyond paint and respects
 * prefers-reduced-motion via globals.css.
 */
export function GradientMesh({ className }: GradientMeshProps) {
  return (
    <div aria-hidden="true" className={cn("gradient-mesh", className)}>
      <span className="gradient-mesh__blob gradient-mesh__blob--a" />
      <span className="gradient-mesh__blob gradient-mesh__blob--b" />
      <span className="gradient-mesh__blob gradient-mesh__blob--c" />
      <span className="gradient-mesh__blob gradient-mesh__blob--d" />
    </div>
  );
}
