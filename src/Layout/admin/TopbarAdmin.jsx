import ProfileDropdown from "./ProfileDropdownAdmin";

export default function TopbarAdmin({ toggleSidebar, isOpen }) {
  return (
    <header
      className={`fixed top-0 right-0 h-16 bg-white shadow-sm border-b border-blue-200 flex items-center justify-between px-6 transition-all duration-300 z-30 ${
        isOpen ? "left-64" : "left-20"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-md bg-[#1E3A8A] hover:bg-[#262D63] transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M3 10h12M3 6h18M3 14h18M3 18h12"
          />
        </svg>
      </button>

      <div className="flex items-center gap-6">
        <ProfileDropdown />
      </div>
    </header>
  );
}