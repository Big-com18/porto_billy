import { contacts, profile } from "@/lib/content";

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-5 py-16 sm:px-10 sm:py-24 lg:px-16"
    >
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
          // contact.tsx
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-paper sm:text-4xl">
          Hubungi Saya
        </h2>
        <p className="mt-3 max-w-xl text-sm text-paper/65">
          Klik salah satu kanal di bawah untuk menghubungi saya.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-sm border border-rule bg-panel px-5 py-4 transition hover:border-teal"
            >
              <span>
                <span className="block font-mono text-xs uppercase tracking-wider text-muted">
                  {c.label}
                </span>
                <span className="mt-1 block font-display text-base text-paper group-hover:text-teal">
                  {c.value}
                </span>
              </span>
              <span className="font-mono text-muted transition group-hover:translate-x-0.5 group-hover:text-teal">
                ↗
              </span>
            </a>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start gap-4 border-t border-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-sm text-amber">
            &quot;{profile.tagline}&quot;
          </p>
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
