export interface Project {
  id: string;
  title: string;
  description: string;
  languages: string[];
  frameworks: string[];
  links: { label: string; url: string; icon: string }[];
}
