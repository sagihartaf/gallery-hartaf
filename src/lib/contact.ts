export const gallery = {
  name: 'Gallery Hartaf',
  artist: 'Shmuel Hartaf',
  email: 'hartafgallery@gmail.com',
  /**
   * International number, digits only, no plus sign.
   * Example: '972501234567'. Leave null until a number is ready.
   * When set, WhatsApp appears beside email on Contact and on each artwork.
   */
  whatsapp: null as string | null,
};

export function enquireHref(title?: string) {
  const subject = title ? `Enquiry: ${title}` : 'Enquiry';
  return `mailto:${gallery.email}?subject=${encodeURIComponent(subject)}`;
}

export function whatsappHref(title?: string) {
  if (!gallery.whatsapp) return null;
  const text = title
    ? `Hello, I would like to ask about “${title}”.`
    : 'Hello, I would like to ask about a painting.';
  return `https://wa.me/${gallery.whatsapp}?text=${encodeURIComponent(text)}`;
}

export type ContactChannel = {
  id: 'email' | 'whatsapp';
  label: string;
  href: string;
};

export function contactChannels(title?: string): ContactChannel[] {
  const channels: ContactChannel[] = [
    { id: 'email', label: 'Email', href: enquireHref(title) },
  ];
  const whatsapp = whatsappHref(title);
  if (whatsapp) {
    channels.push({ id: 'whatsapp', label: 'WhatsApp', href: whatsapp });
  }
  return channels;
}
