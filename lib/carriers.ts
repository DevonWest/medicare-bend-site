/**
 * Public carrier data fails closed. Add a carrier only after the Bend/Oregon
 * appointment and current product lines are verified by an authorized agency
 * reviewer. Provider-network participation belongs in the separately sourced
 * provider guides and must never be used as proof of agency representation.
 */
export interface Carrier {
  name: string;
  productTypes: Array<
    | "Medicare Advantage"
    | "Medicare Supplement"
    | "Medicare Part D"
    | "Dental"
    | "Vision"
    | "Hospital Indemnity"
  >;
}

export const carriers: Carrier[] = [];
