export type services =
  | "Web application development"
  | "Mobile application development"
  | "Site reliability"
  | "Software engineering mentorship"
  | "Software architecture";

export interface ContactMe {
  email: string;
  name: string;
  service: services;
  message: string;
}
