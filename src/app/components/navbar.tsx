"use client"

import * as React from "react"
import Link from "next/link"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { CircleHelpIcon, CircleIcon, CircleCheckIcon } from "lucide-react"

const NavBar = () => {
  return (
     <div className="flex items-center justify-between px-9 py-3 bg-amber-950">
          <div>
               Logo
          </div>

          <NavigationMenu>
               <NavigationMenuList>
               <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/">Início</Link>
                    </NavigationMenuLink>
               </NavigationMenuItem>
               <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/components">Components</Link>
                    </NavigationMenuLink>
               </NavigationMenuItem>
               <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/docs">Docs</Link>
                    </NavigationMenuLink>
               </NavigationMenuItem>
               <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/blog">Blog</Link>
                    </NavigationMenuLink>
               </NavigationMenuItem>
               </NavigationMenuList>
          </NavigationMenu>

          <div>
               Marque um horario
          </div>

     </div>
  )
}

export default NavBar;