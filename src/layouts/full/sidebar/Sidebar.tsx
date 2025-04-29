// src/layouts/full/SidebarLayout.tsx
import { Sidebar } from 'flowbite-react'
import React from 'react'
import SimpleBar from 'simplebar-react'
import FullLogo from '../shared/logo/FullLogo'
import NavItems from './NavItems'
import SidebarContent from './Sidebaritems'

const SidebarLayout = () => (
    <div className="xl:block hidden">
      <Sidebar
          className="fixed menu-sidebar bg-white dark:bg-darkgray"
          aria-label="Sidebar"
      >
        <div className="px-6 py-4 flex items-center">
          <FullLogo />
        </div>
        <SimpleBar className="h-[calc(100vh-230px)]">
          <Sidebar.Items className="px-5 mt-2">
            <Sidebar.ItemGroup className="sidebar-nav hide-menu">
              {SidebarContent.map((item) => (
                  <div className="caption" key={item.heading}>
                    <h5 className="text-link dark:text-white/70 caption font-semibold leading-6 tracking-widest text-xs pb-2 uppercase">
                      {item.heading}
                    </h5>
                    {item.children.map((child) => (
                        <NavItems key={child.id} item={child} />
                    ))}
                  </div>
              ))}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </SimpleBar>
      </Sidebar>
    </div>
)

export default SidebarLayout
