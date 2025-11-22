function Sidebar() {
  return (
      <div className="h-screen w-64 bg-white shadow-md border-r border-gray-200 p-6">
     <h1 className="font-bold text-2xl text-gray-800 mb-6">Sidebar Menu</h1>
      <ul className="space-y-4 text-gray-700">
        <li className="cursor-pointer hover:text-amber-600 transition">Dashboard</li>
        <li className="cursor-pointer hover:text-amber-600 transition">Logout</li>
      </ul>
    </div>
  );
}

export default Sidebar;
