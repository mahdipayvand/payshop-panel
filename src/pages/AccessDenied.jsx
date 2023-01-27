const AccessDenied = () => (
  <div className="grid h-screen place-items-center">
    <div className="flex flex-col items-center gap-y-5">
      <h1 className="text-2xl text-gray-700">مجوز های لازم برای ورود رو ندارید</h1>
      <p className="text-gray-500">
        این پنل فقط برای مدیر وبسایت{" "}
        <a
          target="_blank"
          href={import.meta.env.VITE_WEBSITE_URL}
          className="hover:text-violet-500 font-bold text-gray-600"
        >
          پای‌شاپ
        </a>{" "}
        هست
      </p>
    </div>
  </div>
);

export default AccessDenied;
