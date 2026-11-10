import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

const menuItemByRole = {
  admin: [],
  recruiter: [],
  seeker: [],
};

export function DashboardSidebar() {
  const { data: session, isPending } = authClient.useSession();
  const role = session?.user?.role || 'seeker';
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarMenu>
          {
        //   menuItemByRole[role].map((item) => (
        //     <SidebarMenuItem key={item.name}>
        //       <SidebarMenuButton render={<a href={item.url} />}>
        //         <item.icon />
        //         <span>{item.name}</span>
        //       </SidebarMenuButton>
        //     </SidebarMenuItem>
        //   ))
          }
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
