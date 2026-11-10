import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "../components/dashboardSidebar"

const DashbordLayout = ({ children }: { children: React.ReactNode }) => {
   return (
    <SidebarProvider>
        <DashboardSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
};

export default DashbordLayout;