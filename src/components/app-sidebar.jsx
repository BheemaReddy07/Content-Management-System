import { Calendar, Home, Inbox, NotebookPen, Pencil, Search, Settings, User } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authOptions, getAuthSession } from "@/lib/auth"
import IsAdmin from "@/utils/isAdmin"


const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Blogs",
    url: "/blogs",
    icon: Inbox,
  },
  {
    title: "Drafts",
    url: "/draft",
    icon: Pencil,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
   
]

const adminItems = [
  {
    title: "All Posts",
    url: "/posts",
    icon: NotebookPen,
  },
  {
    title: "All Users",
    url: "/users",
    icon: User,
  } 
   
]

const userItems = [
  {
    title: "My Posts",
    url: "/posts",
    icon: NotebookPen,
  },
  
   
]

export async function  AppSidebar() {
  const session = await getAuthSession(authOptions)
  const isAdmin =await IsAdmin(session)
  const settingItems = isAdmin ? adminItems : userItems
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Writely</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
         {
          isAdmin ?  <SidebarGroupLabel>Admin</SidebarGroupLabel> : ""
         }
          <SidebarGroupContent>
            <SidebarMenu>
              {settingItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}