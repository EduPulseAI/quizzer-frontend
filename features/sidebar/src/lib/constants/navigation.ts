import {
    Briefcase,
    Building,
    FileText,
    MessageSquare,
    Settings,
    Upload,
    Wrench
} from 'lucide-react';
import type { NavigationItem } from '../types';

const profileNodes: NavigationItem[] = [
    { name: '(DEPRECATED) Portfolio ', href: '/portfolio', icon: Briefcase, nodes: [] }
]
const resumeNodes: NavigationItem[] = [
    { name: "Upload a resume", href: "/resume", icon: Upload, nodes: [] },
    { name: "Build existing resume", href: "/resume/build", icon: Wrench, nodes: [] },
]

/**
 * [app-navigation]
 * next-feature@0.1.2-3
 * February 24th 2026, 7:08:19 pm
 */
export const APP_NAVIGATION: NavigationItem[] = [
    // { name: 'Portfolio', href: '/portfolio', icon: Briefcase, nodes: porfolioNodes },
    { name: 'Profile', href: '/profile', icon: Briefcase, nodes: profileNodes },
    // { name: "Skills Analysis", href: "/skills", icon: Target, nodes:[] },
    // { name: "Job Matching", href: "/jobs", icon: TrendingUp, nodes:[] },
    { name: "Resume", href: "/resume", icon: FileText, nodes: resumeNodes },
    { name: 'Interview', href: '/prep', icon: MessageSquare, nodes: [] },
    // { name: "Learning", href: "/learning", icon: BookOpen, nodes:[] },
    { name: 'Settings', href: '/settings', icon: Settings, nodes: [] },
] as const;

