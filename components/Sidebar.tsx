// components/Sidebar.tsx
import { NavLink } from "react-router-dom";

export function Sidebar() {
  return (
    <nav className="w-48 bg-gray-900 text-white h-full p-4">
      <ul className="space-y-2">
        <li>
          <NavLink to="/" end className="block px-2 py-1 hover:bg-gray-700 rounded">
            ホーム
          </NavLink>
        </li>
        
        <li>
          <NavLink to="/admin" className="block px-2 py-1 hover:bg-gray-700 rounded">
            管理者確認
          </NavLink>
        </li>
        <li>
          <NavLink to="/display" className="block px-2 py-1 hover:bg-gray-700 rounded">
            ランキング表示
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
