import { SocialLinks } from "@/components/contact/SocialLinks";
import { contactContent, getPublicEmail } from "@/data/contact";

export function ContactDetails() {
  const email = getPublicEmail();
  const hasMeta = Boolean(
    email || contactContent.location || contactContent.availability,
  );

  return (
    <div className="flex flex-col gap-6">
      {hasMeta ? (
        <dl className="space-y-4 border-t border-border-subtle pt-6">
          {email ? (
            <div>
              <dt className="text-label text-text-muted">
                {contactContent.preferEmailLabel}
              </dt>
              <dd className="mt-2">
                <a
                  href={`mailto:${email}`}
                  className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-text transition-colors hover:text-accent focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] rounded-sm"
                >
                  {email} →
                </a>
              </dd>
            </div>
          ) : null}

          {contactContent.location ? (
            <div>
              <dt className="text-label text-text-muted">Location</dt>
              <dd className="mt-1 text-body-sm text-text-secondary">
                {contactContent.location}
              </dd>
            </div>
          ) : null}

          {contactContent.availability ? (
            <div>
              <dt className="text-label text-text-muted">Availability</dt>
              <dd className="mt-1 text-body-sm text-text-secondary">
                {contactContent.availability}
              </dd>
            </div>
          ) : null}
        </dl>
      ) : (
        <p className="border-t border-border-subtle pt-6 text-body-sm text-text-muted">
          Direct email and socials can be added in site/contact config when
          ready. The inquiry form below is ready to connect.
        </p>
      )}

      <SocialLinks />
    </div>
  );
}
