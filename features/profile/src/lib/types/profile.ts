
/**
 * [profile]
 * next-feature@0.1.1-beta.6
 * January 23rd 2026, 4:53:28 pm
 */
export interface Profile {
  personal: Personal;
  about: About;
  experience: ExperienceItem[];
  credentials: Credentials;
  technicalSkills: TechnicalSkills;
}

export interface Personal {
  firstName: string;
  lastName: string;
  title: string;
  location: string;
  email: string;
  phone: string;
}


export type SocialLink = Record<"Github" | "Linkedin" | "Discord" | "Twitter" | "Instagram", "#" | string>

export interface About {
  summary: string[];
}

export interface Language {
  name: string;
  proficiency: string;
  level: number;
  flag: string;
}


export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Credentials {
  certifications: Certification[];
  education: Education[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  logo: string | null;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface TechnicalSkills {
  languages: string[]
  backend: string[]
  frontend: string[]
  database: string[]
  cloud: string[]
  tools: string[]
  methodologies: string[]
}
