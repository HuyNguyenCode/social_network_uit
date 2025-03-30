import Image from "next/image";

const Recommendations = () => {
  return (
    <div className="p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4 bg-[#f7f9fa] ">
      {/* Edit Profile */}
      <h2 className="font-bold text-gray-600">Settings</h2>
      <div className='flex items-center justify-between'>
        {/* IMAGE AND USER INFO */}
        <div className='flex items-center gap-2'>
          <div className='relative rounded-full overflow-hidden w-10 border h-10'>
            <Image src="/general/image.png" alt="Van Anh" width={100} height={100} />
          </div>
          <div className=''>
            <h1 className="text-sm font-bold">Profile</h1>
          </div>
        </div>
        {/* BUTTON */}
        <button className="py-1 px-2 font-semibold bg-gray-200 text-black rounded-full text-[12px] hover:bg-gray-100">Edit Profile</button>
      </div>

      {/* Avatar */}
      <div className='flex items-center justify-between border-b pb-4'>
        {/* IMAGE AND USER INFO */}
        <div className='flex items-center gap-2'>
          <div className='relative rounded-full overflow-hidden w-10 border h-10'>
            <Image className="p-1" src="/icons/profile-svg.svg" alt="Avatar" width={100} height={100} />
          </div>
          <div className=''>
            <h1 className="text-sm font-bold">Avatar</h1>
          </div>
        </div>
        {/* BUTTON */}
        <button className="py-1 px-2 font-semibold bg-gray-200 text-black rounded-full text-[12px] hover:bg-gray-100">Style Avatar</button>
      </div>


      <h2 className="font-bold text-gray-600">Links</h2>

      <div className="flex pb-3">
        <button className="py-1 px-4 gap-2 font-thin hover:bg-gray-100 bg-gray-200 text-black text-[12px] rounded-full border-[1px] flex items-center ">
          <span className="text-xl">+</span>
          <span className="font-bold">Add Social Link</span>
        </button> 
      </div>


    </div>
  );
};

export default Recommendations;