import type { NavigationItem } from '../types';

const profileNodes: NavigationItem[] = [
    { name: 'Portfolio ', href: '/portfolio', icon: "briefcase", nodes: [] }
]
const resumeNodes: NavigationItem[] = [
    { name: "Upload a resume", href: "/resume", icon: "upload", nodes: [] },
    { name: "Build existing resume", href: "/resume/build", icon: "wrench", nodes: [] },
]

/**
 * [app-navigation]
 * next-feature@0.1.2-3
 * February 24th 2026, 7:08:19 pm
 */
export const APP_NAVIGATION = [
    // { name: 'Portfolio', href: '/portfolio', icon: Briefcase, nodes: porfolioNodes },
    { name: 'Profile', href: '/profile', icon: "briefcase", nodes: profileNodes },
    // { name: "Skills Analysis", href: "/skills", icon: Target, nodes:[] },
    // { name: "Job Matching", href: "/jobs", icon: TrendingUp, nodes:[] },
    { name: "Resume", href: "/resume", icon: "file-text", nodes: resumeNodes },
    { name: 'Interview', href: '/prep', icon: "message-square", nodes: [] },
    // { name: "Learning", href: "/learning", icon: "book-open", nodes:[] },
    { name: 'Settings', href: '/settings', icon: "settings", nodes: [] },
] as const satisfies NavigationItem[];

