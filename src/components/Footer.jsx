const Footer = () => {
  return (
    <div className="bg-[#2f3542] py-2">
      <div className="w-[96%] mx-auto">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm flex items-center gap-4">
              <span className="font-extrabold text-3xl">ⵌ</span> Copyright ©
              2024 - All right reserved
            </p>
            <div className="flex gap-6">
              <i className="fa fa-instagram text-2xl"></i>
              <i className="fa fa-twitter text-2xl"></i>
              <i className="fa fa-github text-2xl"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
