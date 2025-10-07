import { useEffect } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface EventData {
  name: string;
  startDate: string;
  endDate?: string;
  location: string;
  description: string;
  url?: string;
}

interface StructuredDataProps {
  type: 'faq' | 'event' | 'article' | 'breadcrumb';
  data: any;
}

export const StructuredData = ({ type, data }: StructuredDataProps) => {
  useEffect(() => {
    const scriptId = `structured-data-${type}`;
    
    // Remove existing script if present
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    let structuredData: any = {};

    switch (type) {
      case 'faq':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": (data as FAQItem[]).map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        };
        break;

      case 'event':
        const event = data as EventData;
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Event",
          "name": event.name,
          "startDate": event.startDate,
          "endDate": event.endDate,
          "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
          "eventStatus": "https://schema.org/EventScheduled",
          "location": {
            "@type": "Place",
            "name": event.location,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "St. Louis",
              "addressRegion": "MO",
              "addressCountry": "US"
            }
          },
          "description": event.description,
          "organizer": {
            "@type": "Organization",
            "name": "Cyborg Cats FRC Team 4256",
            "url": "https://cyborgcats4256.com"
          }
        };
        if (event.url) {
          structuredData.url = event.url;
        }
        break;

      case 'article':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.title,
          "description": data.description,
          "image": data.image || "https://cyborgcats4256.com/og-image.jpg",
          "datePublished": data.publishDate,
          "dateModified": data.modifiedDate || data.publishDate,
          "author": {
            "@type": "Organization",
            "name": "Cyborg Cats FRC Team 4256"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Cyborg Cats 4256",
            "logo": {
              "@type": "ImageObject",
              "url": "https://cyborgcats4256.com/cyborg-cats-logo.png"
            }
          }
        };
        break;

      case 'breadcrumb':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": `https://cyborgcats4256.com${item.path}`
          }))
        };
        break;
    }

    // Add script to document head
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [type, data]);

  return null;
};