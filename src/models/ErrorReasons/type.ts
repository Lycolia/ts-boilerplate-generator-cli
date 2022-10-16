export type ErrorReason = {
  code: number;
  subject: string;
  message?: string;
};

export type AppError = {
  reason: ErrorReason;
  error?: unknown;
};
