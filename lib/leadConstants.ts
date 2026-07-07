export const SITE_SOURCE = "medicareinbend.com";

export const CRM_SYNC_STATUS = {
  /** Lead saved to Firestore; CRM sync not attempted yet. */
  pending: "pending",
  /** CRM sync succeeded. */
  synced: "synced",
  /** CRM sync was attempted but failed (network, 4xx/5xx, timeout). */
  failed: "failed",
  /** CRM sync was not attempted because the CRM is not configured. */
  skipped: "skipped",
} as const;

export type CrmSyncStatus = (typeof CRM_SYNC_STATUS)[keyof typeof CRM_SYNC_STATUS];
