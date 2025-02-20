'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { FaBox, FaTags, FaBuilding, FaBlogger, FaChartBar } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { logOut } from "@/Redux/ReduxFunction";
import Cookies from "js-cookie";
import logout from "@/assests/logout.png";
import DashboardLogo from "../icon/DashboardLogo";
import { AppDispatch } from "@/Redux/store";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const navigation = [
  { label: "Dashboard", route: "/", icon: <MdDashboard size={20} /> },
  { label: "Applications", route: "/application", icon: <FaBox size={20} /> },
  // { label: "Category", route: "/category", icon: <FaTags size={20} /> },
  // { label: "Brand", route: "/brand", icon: <FaBuilding size={20} /> },
  // { label: "Blog", route: "/blog", icon: <FaBlogger size={20} /> },
  // { label: "Benchmark", route: "/benchmark", icon: <FaChartBar size={20} /> },
  // { label: "Contact", route: "/contact", icon: <FaChartBar size={20} /> },
];

const NavbarSlider = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const path = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogOut = () => {
    dispatch(logOut());
    Cookies.remove("accessToken");
    router.push("/login");
  };

  return (
    <div className={`h-screen bg-white shadow-md text-black flex flex-col transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="p-4">
        {isOpen ? (
          <Link href="/" className="flex items-center space-x-2">
            <DashboardLogo />
            <span className="text-2xl font-bold text-blue-600">Online Edu</span>
          </Link>
        ) : (
          <DashboardLogo />
        )}
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-2">
          {navigation.map((item) => {
            const isActive = path === item.route;
            return (
              <li key={item.route}>
                <Link
                  href={item.route}
                  className={`flex items-center p-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  {isOpen && <span className="ml-3">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4">
        <button
          onClick={handleLogOut}
          className="flex items-center w-full p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Image src={logout || "/placeholder.svg"} alt="logout" width={20} height={20} />
          {isOpen && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default NavbarSlider;