const Instructions = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <img className="w-[12rem]" src="/img/success.png" alt="logo success" />
      <div className="font-bold text-5xl text-[#2BB673] mt-4">Thank You!</div>
      <div className="text-gray-400 mt-2">Payment done successfully</div>

      <div className="font-bold text-gray-600 mt-6">
        Please click button &quot;done&quot; on desktop
      </div>
    </div>
  );
};

export default Instructions;
