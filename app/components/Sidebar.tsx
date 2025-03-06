import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-primary text-white py-3 px-6 text-center shadow-md">
              <h1 className="text-lg font-semibold text-white">SideBar</h1>
      <ul className="mt-20 space-y-4 text-sm font-medium px-6">
        <li className="hover:bg-secondary-foreground p-2 rounded cursor-pointer">Home</li>
        <li className="hover:bg-secondary-foreground p-2 rounded cursor-pointer">Profile</li>
        <li className="hover:bg-secondary-foreground p-2 rounded cursor-pointer">Settings</li>
        <li className="hover:bg-secondary-foreground p-2 rounded cursor-pointer">Logout</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
