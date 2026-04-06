import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 md:ml-64 p-4 md:p-6">
        {children}
      </div>

    </div>
  );
};

export default MainLayout;