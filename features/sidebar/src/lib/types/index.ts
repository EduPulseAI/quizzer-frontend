import type { IconName } from "lucide-react/dynamic";

/**
 * [navigation-item]
 * next-feature@0.1.2-3
 * February 24th 2026, 2:57:36 pm
 */
export interface NavigationItem {
    name: string;
    href: string;
    icon: IconName;
    nodes: NavigationItem[];
}
