'use client';
import { Activity } from "@/app/lib/data";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import { CheckCircle2Icon, MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  activities: Activity[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

const Sidebar = ({ activities, selectedIndex, onChange }: SidebarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <aside className="relative flex">
      <button
        onClick={toggleSidebar}
        className="fixed bottom-4 left-4 z-20 md:hidden p-2 rounded bg-gray-100"
      >
        {isSidebarOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
      </button>

      <div
        className={`fixed inset-y-0 left-0 z-10 bg-white transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:w-80 w-64`}
      >
				<div className="p-4">
					<span>Activity Outline</span>
				</div>
        <TabGroup selectedIndex={selectedIndex} onChange={onChange}>
          <TabList className="flex-none border-r min-h-screen">
            {activities.map((activity) => (
              <Tab
                key={activity.id}
                className={({ selected }) =>
                  `flex items-center space-x-2 py-3 px-4 w-full border-b transition-colors ${
                    selected
                      ? "bg-gray-50 text-blue-600 border-l-2 border-l-blue-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                  }`
                }
              >
                <CheckCircle2Icon
                  size={20}
                  color={
                    selectedIndex === activities.indexOf(activity)
                      ? "#2563EB"
                      : "gray"
                  }
                />
                <p className="text-sm font-medium">{activity.title}</p>
              </Tab>
            ))}
          </TabList>
        </TabGroup>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-5 md:hidden"
        ></div>
      )}
    </aside>
  );
};

export default Sidebar;
