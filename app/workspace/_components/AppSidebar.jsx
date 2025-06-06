"use client";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Book,
  Compass,
  LayoutDashboard,
  PencilRulerIcon,
  WalletCards,
} from "lucide-react";
import Link from "next/link"; // ✅ Correct Link component

import Image from "next/image";
import { usePathname } from "next/navigation";
import AddNewCourseDiaglog from "./AddNewCourseDiaglog";
const SidebarOptions = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/workspace",
  },
  {
    title: "My Learning",
    icon: Book,
    path: "/workspace/my-learning",
  },
  {
    title: "Explore Courses",
    icon: Compass,
    path: "/workspace/explore-courses",
  },

  {
    title: "Billing",
    icon: WalletCards,
    path: "/workspace/billing",
  },
  {
    title: "Learn More",
    icon: WalletCards,
    path: "/workspace/learn-more",
  },
];
function AppSidebar() {
  const path = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className={"p-4"}>
        <Image src={"/logo.svg"} alt="logo" width={130} height={120} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <AddNewCourseDiaglog>
          <Button>Create new course</Button>
        </AddNewCourseDiaglog>

        <SidebarGroup />
        <SidebarGroup />
        <SidebarGroupContent>
          <SidebarMenu>
            {SidebarOptions.map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild className={"p-5"}>
                  <Link
                    href={item.path}
                    className={`text-[17pxl] ${
                      path.includes(item.path) && "text-primary bg-orange-50"
                    }`}
                  >
                    <item.icon className="h-7 w-7" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;
