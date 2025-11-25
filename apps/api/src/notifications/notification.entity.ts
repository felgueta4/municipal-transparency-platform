export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  municipalityId: string | null;
  createdBy: string;
  isRead: boolean;
  readAt: Date | null;
  metadata: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
}
