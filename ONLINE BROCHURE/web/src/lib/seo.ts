// Per-page SEO title tags & meta descriptions.
// Source: gomati-sanitary-website-content-seo.md section 4.
export const SEO = {
  home: {
    title: 'Sanitary Hardware Wholesaler in Nepal | Gomati Sanitary',
    description:
      'Gomati Sanitary supplies sanitary hardware and bathroom fittings in bulk to retailers, contractors and dealers across Nepal. 1000+ products, 66+ categories. Request our catalogue today.',
  },
  about: {
    title: 'About Gomati Sanitary | Sanitary Hardware Wholesaler Since 2015',
    description:
      'Gomati Sanitary has supplied sanitary hardware and bathroom fittings to retailers and contractors across Nepal since 2015. Imported from China & India, sold at wholesale rates.',
  },
  catalogue: {
    title: 'Request Wholesale Catalogue | Gomati Sanitary',
    description:
      'Get the full Gomati Sanitary wholesale catalogue — 1000+ sanitary hardware and bathroom fitting products for retailers, contractors and dealers across Nepal.',
  },
  contact: {
    title: 'Contact Us | Gomati Sanitary, Sanitary Hardware Wholesaler',
    description:
      'Contact Gomati Sanitary for sanitary hardware and bathroom fitting orders. Visit our Kathmandu office, call, WhatsApp, or send a message — we deliver across Nepal.',
  },
};

/** Title/description pattern for each generated product-category page. */
export function categorySeo(name: string) {
  return {
    title: `${name} Wholesale Supplier in Nepal | Gomati Sanitary`,
    description: `Buy ${name} in bulk from Gomati Sanitary, Kathmandu. Wholesale rates for retailers and contractors across Nepal.`,
  };
}
