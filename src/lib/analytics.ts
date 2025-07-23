// Safe analytics utilities

export const trackEvent = (
  action: string,
  category: string = "engagement",
  label?: string,
  value?: number
) => {
  // Only track in production and when gtag is available
  if (
    typeof window !== "undefined" &&
    window.gtag &&
    process.env.NODE_ENV === "production"
  ) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } else {
    // Log to console in development
    console.log("Analytics Event:", { action, category, label, value });
  }
};

export const trackFormSubmit = (formType: string) => {
  trackEvent("form_submit", "conversion", formType);
};

export const trackWhatsAppClick = (source: string) => {
  trackEvent("whatsapp_click", "engagement", source);
};

export const trackVideoPlay = (videoId: string) => {
  trackEvent("video_play", "engagement", videoId);
};
