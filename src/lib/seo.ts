import { gallery } from './contact';
import type { Centimetres } from './dimensions';

function originOf(site: URL | string) {
  return String(site).replace(/\/$/, '');
}

export function personNode(site: URL | string) {
  const origin = originOf(site);
  return {
    '@type': 'Person',
    '@id': `${origin}/about#shmuel-hartaf`,
    name: gallery.artist,
    url: `${origin}/about`,
    jobTitle: 'Painter',
    email: gallery.email,
    telephone: '+972547073333',
  };
}

export function homeJsonLd(site: URL, description: string) {
  const origin = originOf(site);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personNode(site),
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        name: gallery.name,
        url: `${origin}/`,
        description,
        publisher: { '@id': `${origin}/about#shmuel-hartaf` },
      },
    ],
  };
}

export function aboutJsonLd(site: URL, description: string) {
  const origin = originOf(site);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personNode(site),
      {
        '@type': 'AboutPage',
        url: `${origin}/about`,
        name: gallery.artist,
        description,
        mainEntity: { '@id': `${origin}/about#shmuel-hartaf` },
      },
    ],
  };
}

export function artworkJsonLd(options: {
  site: URL;
  name: string;
  description: string;
  medium: string;
  artform: string;
  url: string;
  image: string;
  size: Centimetres | null;
}) {
  const artwork: Record<string, unknown> = {
    '@type': 'VisualArtwork',
    name: options.name,
    description: options.description,
    artMedium: options.medium,
    artform: options.artform,
    url: options.url,
    image: options.image,
    creator: { '@id': `${originOf(options.site)}/about#shmuel-hartaf` },
  };
  if (options.size) {
    artwork.width = `${options.size.width} cm`;
    artwork.height = `${options.size.height} cm`;
  }
  return {
    '@context': 'https://schema.org',
    '@graph': [personNode(options.site), artwork],
  };
}
