export function TermsPage() {
  return (
    <article className="marketing-shell py-16">
      <h1 className="font-heading text-4xl font-bold">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted">Last updated: August 2026 · Placeholder</p>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/80">
        <p>
          By using Motion you agree to these draft terms. Motion provides real-time
          nightlife discovery tools for Johannesburg and surrounding areas.
        </p>
        <h2 className="font-heading text-xl font-semibold text-white">Acceptable use</h2>
        <p>
          Do not post harmful, illegal, or misleading content. Do not attempt to
          spoof location for photo verification. Respect other users and venue
          staff.
        </p>
        <h2 className="font-heading text-xl font-semibold text-white">Events & hosts</h2>
        <p>
          Hosts are responsible for the accuracy of event listings they submit.
          Motion may approve, reject, or remove listings that violate community
          guidelines or safety standards.
        </p>
        <h2 className="font-heading text-xl font-semibold text-white">Liability</h2>
        <p>
          Motion is an information and community tool. Always exercise personal
          judgment about attending events. Safety scores are community signals,
          not guarantees.
        </p>
        <p className="text-muted">
          Final terms will be published before launch. Questions:{' '}
          <a className="text-accent" href="mailto:info@motionapp.co.za">
            info@motionapp.co.za
          </a>
          .
        </p>
      </div>
    </article>
  )
}
