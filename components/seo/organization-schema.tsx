export function OrganizationSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.bizzfi.com/#organization",

    name: "Bizzfi",
    url: "https://www.bizzfi.com",

    description:
      "Bizzfi provides digital business and technology solutions including website development, mobile apps, AI automation, ERP, CRM, cloud infrastructure, cyber security, digital marketing and managed IT services.",

    sameAs: [
      "https://www.instagram.com/bizzfi/",
      "https://www.facebook.com/bizzfi",
      "https://www.linkedin.com/company/bizzfi",
    ],

    parentOrganization: {
      "@type": "Organization",
      name: "KL10SOUQ ENTERPRISES LLP",
    },

    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-62355-62622",
      contactType: "customer service",
      email: "info@bizzfi.com",
      areaServed: "Worldwide",
      availableLanguage: ["English"],
    },

    address: {
      "@type": "PostalAddress",
      addressLocality: "Kodur",
      addressRegion: "Kerala",
      postalCode: "676504",
      addressCountry: "IN",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}