'use client'
import {
  Calendar,
  Home,
  Settings,
  Stethoscope,
  Tags,
} from "lucide-react"

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
import { useState } from "react";

const menuSections = [
  {
    label: "Visão Geral",
    items: [
      { title: "Dashboard", url: "/sistema/Dashboard", icon: Home },
    ],
  },
  {
    label: "Gerenciamento",
    items: [
      { title: "Agendamentos", url: "/sistema/Agendamentos", icon: Calendar },
      { title: "Consultas Realizadas", url: "/sistema/ConsultasRealizadas", icon: Stethoscope },
      { title: "Blog", url: "/sistema/Blog", icon: Tags },
    ],
  },
  {
    label: "Sistema",
    items: [
      { title: "Configurações", url: "#", icon: Settings },
    ],
  },
]

const menusDropDowns = 
[
  { title: "Pacientes", url: "/sistema/Pacientes", icon: Tags }
]

export function AppSidebar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Sidebar className="p-4 bg-slate-50 border-r border-slate-200 shadow-sm">
      <div className="mb-6 px-2 text-2xl font-bold text-yellow-600">
        Rosiméry Tomasi
      </div>

      <SidebarContent>
        {menuSections.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel className="text-slate-500 text-xs uppercase tracking-wide mb-1">
              {section.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className="flex items-center gap-2 rounded-md px-1 py-1.5 text-slate-700 hover:bg-blue-100 transition-colors"
                      >
                        <item.icon className="w-5 h-5 text-yellow-600" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {/* Dropdown Section */}
        <SidebarGroup>
          <SidebarGroupLabel
            className="text-slate-500 text-xs uppercase tracking-wide mb-1 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Cadastros {isDropdownOpen ? "▲" : "▼"}
          </SidebarGroupLabel>
          <div
            className={`transition-all duration-300 overflow-hidden ${
              isDropdownOpen ? "max-h-100" : "max-h-0"
            }`}
          >
            <SidebarGroupContent>
              <SidebarMenu>
                {menusDropDowns.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className="flex items-center gap-2 rounded-md px-1 py-1.5 text-slate-700 hover:bg-blue-100 transition-colors"
                      >
                        <item.icon className="w-5 h-5 text-yellow-600" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}