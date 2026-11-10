"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  ChartColumn,
  FileText,
  LayoutDashboard,
  BriefcaseBusiness,
  CircleUser,
  Settings,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

// Matches the `role` additional field defined in src/lib/auth.ts.
export type DashboardRole = "seeker" | "recruiter" | "admin";

export type MenuItem = {
  /** Display name of the menu entry. */
  name: string;
  /** Destination path of the menu entry. */
  url: string;
  /** Lucide icon shown before the name. */
  icon: LucideIcon;
};

// Menu structure follows the UI design:
// Dashboard | Manage Jobs | Applications | Settings (recruiter example).
export const menuItemsByRole: Record<DashboardRole, MenuItem[]> = {
  seeker: [
    { name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { name: "Browse Jobs", url: "/dashboard/seeker/jobs", icon: BriefcaseBusiness },
    { name: "Applications", url: "/dashboard/seeker/applications", icon: FileText },
    { name: "Profile", url: "/dashboard/seeker/profile", icon: CircleUser },
    { name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],
  recruiter: [
    { name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    { name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: BriefcaseBusiness },
    { name: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
    { name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  ],
  admin: [
    { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Users", url: "/dashboard/admin/users", icon: Users },
    { name: "Jobs", url: "/dashboard/admin/jobs", icon: BriefcaseBusiness },
    { name: "Reports", url: "/dashboard/admin/reports", icon: ChartColumn },
    { name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
};

export function DashboardSidebar() {
  const { data: session, isPending } = authClient.useSession();
  const role = (session?.user?.role || "seeker") as DashboardRole;
  const pathname = usePathname();
  const menuItems = menuItemsByRole[role];
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {!isPending && (
              <SidebarMenu>
                {menuItems.map((item) => {
                  const isActive =
                    pathname === item.url || pathname.startsWith(`${item.url}/`);

                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={item.name}
                        render={<Link href={item.url} />}
                      >
                        <item.icon />
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
