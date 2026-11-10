import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "../components/dashboardSidebar"
import { Toaster } from "@/components/ui/toast"

const DashbordLayout = ({ children }: { children: React.ReactNode }) => {
   return (
    <SidebarProvider>
        <DashboardSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
      <Toaster />
    </SidebarProvider>
  )
};

export default DashbordLayout;