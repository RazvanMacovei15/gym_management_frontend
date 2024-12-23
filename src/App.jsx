/* import Sidebar from "./components/sidebar";
import MainView from "./components/MainView";
import Login from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import { useAuth } from "./components/AuthProvider";

function App() {
  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <MainView />
    </div>
  );
}
export default App;
 */

import React from "react";
import { Outlet } from "react-router-dom"; // To render child routes
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/side-bar/app-sidebar";
import TopBar from "./components/TopBar";

function App() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex flex-row h-screen w-screen">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <div className="flex flex-col grow h-full transition-all duration-300">
          <TopBar />
          {/* Outlet renders child routes */}
          <div className="flex-grow bg-gradient-to-b from-gray-950 via-gray-950 to-pink-950 p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;

