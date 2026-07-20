export function StructuredData() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.bizzfi.com/#website",
    url: "https://www.bizzfi.com",
    name: "Bizzfi",
    publisher: {
      "@id": "https://www.bizzfi.com/#organization",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteSchema),
      }}
    />
  );
}