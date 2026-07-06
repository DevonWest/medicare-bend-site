export type Testimonial = {
  name: string;
  location: string;
  text: string;
  rating: 5;
  source: "Google";
  featured?: boolean;
};

/**
 * Client testimonials for the Bend site.
 *
 * The prior site's testimonials were location-specific to another market and
 * cannot be presented as Bend/Central Oregon reviews, so they were removed.
 * Seed this array with genuine Bend/Central Oregon client reviews as they are
 * collected — do not relabel reviews from another market. Components that
 * render testimonials handle the empty state gracefully.
 */
export const testimonials: Testimonial[] = [];
