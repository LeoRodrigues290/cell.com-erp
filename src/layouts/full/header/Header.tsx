import {useState, useEffect} from "react";
import {Button, Navbar} from "flowbite-react";
import {Icon} from "@iconify/react";
import Profile from "./Profile";
import Notification from "./notification";
import {Drawer} from "flowbite-react";
import MobileSidebar from "../sidebar/MobileSidebar";
import {useDarkMode} from 'src/hooks/useDarkMode'
import Search from 'src/components/shared/Search'


const Header = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [theme, setTheme] = useDarkMode();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // mobile-sidebar
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);
    return (
        <>
            <header
                className={`sticky top-0 z-[5] ${isSticky
                    ? "bg-white dark:bg-dark fixed w-full"
                    : "bg-white"
                }`}
            >
                <Navbar
                    fluid
                    className={`rounded-none bg-transparent dark:bg-transparent py-4 sm:px-30 px-4`}
                >
                    {/* Mobile Toggle Icon */}

                    <div className="flex gap-3 items-center justify-between w-full ">
                        <div className="flex gap-2 items-center">
              <span
                  onClick={() => setIsOpen(true)}
                  className="h-10 w-10 flex text-black dark:text-white text-opacity-65 xl:hidden hover:text-primary hover:bg-lightprimary rounded-full justify-center items-center cursor-pointer"
              >
                <Icon icon="solar:hamburger-menu-line-duotone" height={21}/>
              </span>
                            {/*<Notification />*/}
                        </div>

                        <div className="flex flex-1 justify-center md:justify-start">
                            <Search/>
                        </div>

                        <div className="flex gap-4 items-center">
                            <div className="flex justify-end p-4">
                                <button
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className="flex items-center gap-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white shadow hover:opacity-90 transition"
                                >
                                    {theme === 'dark' ? '🌞 Claro' : '🌙 Escuro'}
                                </button>
                            </div>
                            <Profile/>
                        </div>
                    </div>
                </Navbar>
            </header>

            {/* Mobile Sidebar */}
            <Drawer open={isOpen} onClose={handleClose} className="w-130">
                <Drawer.Items>
                    <MobileSidebar/>
                </Drawer.Items>
            </Drawer>
        </>
    );
};

export default Header;
