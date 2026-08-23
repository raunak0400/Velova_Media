/**
 * Footer-only backdrop — black-dominant with a pink/magenta/blue/orange
 * blob cluster confined to the bottom-right corner, matching kota.co.uk's
 * footer treatment. See GradientMesh for the four-corner variant used on
 * light sections; this is intentionally a separate, smaller set of blobs
 * rather than a reused GradientMesh instance.
 */
export function FooterGlow() {
  return (
    <div aria-hidden="true" className="footer-glow">
      <span className="footer-glow__blob footer-glow__blob--pink" />
      <span className="footer-glow__blob footer-glow__blob--magenta" />
      <span className="footer-glow__blob footer-glow__blob--blue" />
      <span className="footer-glow__blob footer-glow__blob--warm" />
    </div>
  );
}
