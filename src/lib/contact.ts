export const gallery = {
  name: 'Gallery Hartaf',
  artist: 'Shmuel Hartaf',
  email: 'zoreffhartaf@gmail.com',
  /** Local display of the studio WhatsApp number. */
  phone: '054 707 3333',
  /** Digits only, country code, no plus. Used for wa.me. */
  whatsapp: '972547073333',
};

export function enquireHref(title?: string) {
  const subject = title ? `Enquiry: ${title}` : 'Enquiry';
  return `mailto:${gallery.email}?subject=${encodeURIComponent(subject)}`;
}

export function whatsappHref(title?: string) {
  const text = title
    ? `Hello, I'm interested in "${title}"`
    : `Hello, I'm interested in a painting`;
  return `https://wa.me/${gallery.whatsapp}?text=${encodeURIComponent(text)}`;
}

export type ContactChannel = {
  id: 'email' | 'whatsapp';
  label: string;
  href: string;
  value: string;
};

export function contactChannels(title?: string): ContactChannel[] {
  return [
    { id: 'email', label: 'Email', href: enquireHref(title), value: gallery.email },
    { id: 'whatsapp', label: 'WhatsApp', href: whatsappHref(title), value: gallery.phone },
  ];
}
