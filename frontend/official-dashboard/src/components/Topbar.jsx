function Topbar() {
  return (
    <div className="flex items-center justify-between bg-white shadow-md px-6 py-4 border-b border-gray-200">
      {/* Logo or Title */}
      <h1 className="text-2xl font-bold text-gray-800">Topbar Header</h1>
      <div className="flex items-center cursor-pointer hover:text-amber-600 transition">
        <span className="material-symbols-outlined mr-1">notifications</span>
        <span className="hidden sm:inline">Notification</span>
      </div>
      <div className="flex items-center cursor-pointer hover:text-amber-600 transition">
        <span className="material-symbols-outlined mr-1">settings</span>
        <span className="hidden sm:inline">Settings</span>
      </div>
      <div className="flex items-center cursor-pointer hover:text-amber-600 transition">
        <span className="material-symbols-outlined mr-1">help</span>
        <span className="hidden sm:inline">Help</span>
      </div>
    </div>
  );
}

export default Topbar;
