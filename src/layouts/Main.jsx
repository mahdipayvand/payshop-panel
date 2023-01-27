import { useEffect } from "react";
import { MenuItem } from "components";
import { Outlet } from "react-router-dom";
import { fetchUsers } from "store/slices/users";
import { fetchUserProfile } from "store/slices/auth";
import { fetchProducts } from "store/slices/products";
import { useDispatch, useSelector } from "react-redux";
import { RiFunctionLine, RiShoppingBagLine, RiUser3Line } from "react-icons/ri";

const menus = [
  { url: "/", icon: RiFunctionLine, label: "داشبورد" },
  { url: "/product", icon: RiShoppingBagLine, label: "محصولات" },
  { url: "/user", icon: RiUser3Line, label: "کاربران" },
];

const Main = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(fetchUserProfile(token));
    dispatch(fetchProducts());
    dispatch(fetchUsers(token));
  }, []);

  return (
    <>
      <header className="bg-white h-20 shadow-md flex items-center px-4 justify-between">
        <h1 className="text-xl text-gray-600 font-semibold indent-4">پنل مدیریت پای‌شاپ</h1>
        <a
          target="_blank"
          href={import.meta.env.VITE_WEBSITE_URL}
          className="border border-gray-200 h-12 rounded-full px-6 grid place-items-center text-gray-500 hover:text-gray-600 hover:border-gray-300"
        >
          مشاهده وبسایت
        </a>
      </header>
      <main className="h-[calc(theme(height.screen)_-_theme(height.20))] grid grid-cols-5">
        <aside className="bg-gradient-to-b from-violet-400 to-violet-900 h-full col-span-1">
          <div className="flex flex-col px-10 justify-center items-center text-white gap-y-2 py-8">
            <h2 className="text-lg font-medium">
              {user?.firstName} {user?.lastName}
            </h2>
            <span className="bg-white/10 rounded-full py-0.5 font-mono tracking-wide cursor-help px-2 text-xs">
              {user?.email}
            </span>
          </div>
          <hr className="border-1 border-white/10 mb-8" />
          <ul className="flex flex-col">
            {menus.map((menu, index) => (
              <li key={index} className="relative">
                <MenuItem {...menu} />
              </li>
            ))}
          </ul>
        </aside>
        <section className="col-span-4 p-10">
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default Main;
