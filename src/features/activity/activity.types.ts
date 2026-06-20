export type ActivityTone = "info" | "attention" | "success" | "closed";

export type RequestActivityItem = {
  id: string;
  body: string;
  createdAt: string;
  title: string;
  tone: ActivityTone;
};
