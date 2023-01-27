const NotFound = () => (
  <div className="grid h-[calc(theme(height.screen)_-_calc(theme(height.20)_+_theme(padding.20)))] place-items-center">
    <div className="flex flex-col items-center gap-y-5">
      <h1 className="text-2xl text-gray-700">این صفحه وجود نداره</h1>
      <p className="text-gray-500">این صفحه اشتباه است یا برای همیشه حذف شده</p>
    </div>
  </div>
);

export default NotFound;
