export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  datePosted?: string;
  image?: string;
  url?: string;
}