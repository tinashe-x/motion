export function PrivacyPage() {
  return (
    <article className="marketing-shell py-16">
      <h1 className="font-heading text-4xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated: August 2026 · POPIA-oriented draft</p>
      <div className="prose-invert mt-8 space-y-6 text-sm leading-relaxed text-white/80">
        <p>
          Motion (&quot;we&quot;, &quot;us&quot;) respects your privacy and processes personal
          information in line with South Africa&apos;s Protection of Personal
          Information Act (POPIA). This placeholder policy explains how we intend
          to handle data once the live backend is connected.
        </p>
        <h2 className="font-heading text-xl font-semibold text-white">Information we collect</h2>
        <p>
          Account details (email, username), profile content, location when you
          grant permission for verification or map discovery, photos you submit,
          and device/app diagnostics.
        </p>
        <h2 className="font-heading text-xl font-semibold text-white">How we use it</h2>
        <p>
          To operate the Motion service, verify event photos, surface safety
          signals, improve product quality, and communicate about events you
          follow. We do not sell personal information.
        </p>
        <h2 className="font-heading text-xl font-semibold text-white">Your rights</h2>
        <p>
          You may request access, correction, or deletion of personal information
          subject to POPIA. Contact{' '}
          <a className="text-accent" href="mailto:info@motionapp.co.za">
            info@motionapp.co.za
          </a>
          .
        </p>
        <p className="text-muted">
          This page is a product placeholder and will be replaced with counsel-reviewed
          legal text before public launch.
        </p>
      </div>
    </article>
  )
}
