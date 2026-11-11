"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartColumn,
  FileText,
  LayoutDashboard,
  BriefcaseBusiness,
  CircleUser,
  Settings,
  Users,
  PlusCircle,
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
// STEP 13: DashboardRole / MenuItem moved to the shared "@/types" barrel, so
// other modules can use them without importing from this client component.
import type { DashboardRole, MenuItem } from "@/types";

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
    { name: "Add Job", url: "/dashboard/recruiter/jobs/new", icon: PlusCircle },
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
  const role = (session?.user?.role || "admin") as DashboardRole;
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
