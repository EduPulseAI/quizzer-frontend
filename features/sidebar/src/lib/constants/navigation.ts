import {
    Briefcase,
    FileText,
    MessageSquare,
    Settings
} from 'lucide-react';
import type { NavigationItem } from '../types';

/**
 * [app-navigation]
 * next-feature@0.1.2-3
 * February 24th 2026, 7:08:19 pm
 */
export const APP_NAVIGATION: NavigationItem[] = [
    { name: 'Portfolio', href: '/portfolio', icon: Briefcase, nodes: porfolioNodes },
    { name: 'Profile', href: '/profile', icon: Briefcase, nodes: [] },
    // { name: "Skills Analysis", href: "/skills", icon: Target, nodes:[] },
    // { name: "Job Matching", href: "/jobs", icon: TrendingUp, nodes:[] },
    { name: "Resume", href: "/resume", icon: FileText, nodes: [] },
    { name: 'Interview', href: '/prep', icon: MessageSquare, nodes: [] },
    // { name: "Learning", href: "/learning", icon: BookOpen, nodes:[] },
    { name: 'Settings', href: '/settings', icon: Settings, nodes: [] },
] as const;

var porfolioNodes: NavigationItem[] = []