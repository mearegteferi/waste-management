function Topbar() {
  return (
    <div>
      <h1 className="flex font-bold text-2xl">topbar header</h1>
      <div className="flex items-center cursor-pointer hover:text-amber-600 transition">
        <span className="material-symbols-outlined mr-1">notifications</span>
        <span className="hidden sm:inline">Notification</span>
      </div>
      <div className="flex items-center cursor-pointer hover:text-amber-600 transition">
        <span className="material-symbols-outlined mr-1">settings</span>
        <span className="hidden sm:inline">Settings</span>
      </div>
      <div className="text-amber-300">help</div>
    </div>
  );
}
