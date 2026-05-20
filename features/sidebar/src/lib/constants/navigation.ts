import type { NavigationItem } from '../types';

const jobNodes: NavigationItem[] = [
    { name: "Insights", href: "/insights", icon: "lightbulb", nodes: [] },

]
const resumeNodes: NavigationItem[] = [
    { name: "Upload a resume", href: "/resume", icon: "upload", nodes: [] },
    { name: "Build existing resume", href: "/resume/build", icon: "wrench", nodes: [] },
    { name: 'Profile', href: '/profile', icon: "briefcase", nodes: [] },
    { name: 'Projects ', href: '/portfolio', icon: "briefcase", nodes: [] }
]

const prepNodes: NavigationItem[] = [
    { name: "Skills Analysis", href: "/skills", icon: "target", nodes:[] },
    { name: "Learning", href: "/learning", icon: "book-open", nodes:[] },

]
/**
 * [app-navigation]
 * next-feature@0.1.2-3
 * February 24th 2026, 7:08:19 pm
 */
export const APP_NAVIGATION = [
    { name: "Jobs", href: "/jobs", icon: "trending-up", nodes:jobNodes },
    { name: "Resume", href: "/resume", icon: "file-text", nodes: resumeNodes },
    { name: 'Interview', href: '/prep', icon: "message-square", nodes: prepNodes },
    { name: 'Settings', href: '/settings', icon: "settings", nodes: [] },
] as const satisfies NavigationItem[];

