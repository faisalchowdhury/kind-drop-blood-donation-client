import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiSettings,
  FiPlusCircle,
} from "react-icons/fi";
import Logo from "../Components/Utilities/Logo";
import logoLight from "../assets/Logos/logo-light.png";
import { FaUsersGear } from "react-icons/fa6";
import {
  FaBook,
  FaEdit,
  FaHandHoldingHeart,
  FaPowerOff,
  FaTint,
} from "react-icons/fa";
import useUserRole from "../Hooks/useUserRole";
import Loading from "../Components/Utilities/Loading";
import useAuth from "../Hooks/useAuth";
import useNotification from "../Hooks/useNotification";
export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const { userRole, roleLoading } = useUserRole();
  const { signOutUser } = useAuth();
  const notification = useNotification();
  const navigate = useNavigate();
  if (roleLoading) {
    return <Loading />;
  }
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FiHome className="w-5 h-5 mr-2" />,
    },
    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: <FiUser className="w-5 h-5 mr-2" />,
    },

    {
      name: "Request a Donation",
      path: "/dashboard/create-donation-request",
      icon: <FiPlusCircle className="w-5 h-5 mr-2" />,
    },

    {
      name: "My Donation Requests",
      path: "/dashboard/my-donation-requests",
      icon: <FaHandHoldingHeart className="w-5 h-5 mr-2" />,
    },
    ...(userRole.role === "admin"
      ? [
          {
            name: "Users",
            path: "/dashboard/users",
            icon: <FaUsersGear className="w-5 h-5 mr-2" />,
          },
        ]
      : []),
    // Admin and volunteer routes

    ...(userRole.role === "admin" || userRole.role === "volunteer"
      ? [
          {
            name: "Donation Requests",
            path: "/dashboard/all-donation-requests",
            icon: <FaTint className="w-5 h-5 mr-2" />,
          },
          {
            name: "Add Blog",
            path: "/dashboard/content-management/add-blog",
            icon: <FaEdit className="w-5 h-5 mr-2" />,
          },
          {
            name: "All Blogs",
            path: "/dashboard/content-management/all-blogs",
            icon: <FaBook className="w-5 h-5 mr-2" />,
          },
        ]
      : []),
  ];
  const logoutUser = () => {
    signOutUser()
      .then(() => {
        navigate("/login");
        notification.success("Logout successful");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="bg-slate-200 md:py-10">
      <div className="flex bg-slate-50 md:max-w-[1450px] mx-auto min-h-screen md:min-h-[90vh] rounded-lg shadow-2xl">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white shadow-md transform rounded-l-2xl ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50 md:translate-x-0 md:static md:shadow-none`}>
          <div className="p-4 border-b flex justify-between items-center md:hidden">
            <h2 className="text-lg font-semibold">Dashboard</h2>
            <button onClick={() => setIsOpen(false)}>
              <FiX className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col mt-4 space-y-1 p-4">
            <div className="pl-5">
              {" "}
              <Logo logo={logoLight} size={150}></Logo>
            </div>
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center px-4 py-2 rounded hover:bg-accent/10 text-gray-700 font-medium transition-colors"
                onClick={() => setIsOpen(false)}>
                {item.icon}
                {item.name}
              </Link>
            ))}
            <button
              onClick={logoutUser}
              className="flex items-center px-4 py-2 rounded hover:bg-accent/10 text-gray-700 font-medium transition-colors">
              <FaPowerOff className="w-5 h-5 mr-2" />
              Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col w-full">
          {/* Top Navbar */}
          <div className="bg-white p-4 shadow flex justify-between items-center md:hidden">
            <button onClick={() => setIsOpen(true)}>
              <FiMenu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold">
              <Logo logo={logoLight}></Logo>
            </h1>
          </div>

          {/* Content */}
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
