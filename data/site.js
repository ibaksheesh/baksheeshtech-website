// Site-wide settings: contact details and the live domain.
export const SITE = {
  url: "https://baksheeshtech.com",
  name: "Baksheesh Tech",
  whatsapp: "918580583233", // country code + number, digits only
  phoneDisplay: "+91 85805 83233",
  phoneIntl: "+91-8580583233", // used in the Google structured data
  email: "baksheeshtechin@gmail.com",
};

// WhatsApp chat link, optionally with a pre-filled message
export const waLink = (text) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const WA_HELLO = "Hi Baksheesh, I'd like to know more about your services.";
