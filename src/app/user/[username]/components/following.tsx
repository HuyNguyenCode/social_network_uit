import React from "react";

const Following = ({ isModalOpen, setIsModalOpen }: { isModalOpen: boolean, setIsModalOpen: (value: boolean) => void }) => {
    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[#262626] rounded-lg shadow-lg max-w-sm w-full">
                <div className=" relative m-auto border-b border-gray-200 py-2 px-6">
                    <h2 className="text-xl font-medium text-white text-center">Đang theo dõi</h2>
                    <button onClick={() => setIsModalOpen(false)} className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-white">
                        X
                    </button>
                </div>
                <div className="h-[310px] mt-4 space-y-4 px-6 overflow-y-scroll">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                        <span>ww.haniee</span>
                        <button className="w-[132px] h-8 ml-auto bg-[#555555b3] hover:bg-[#363636] text-white px-4 py-1 rounded-lg text-sm !leading-4">Đang theo dõi</button>
                    </div>
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                        <span>ww.haniee</span>
                        <button className="w-[132px] h-8 ml-auto bg-[#555555b3] hover:bg-[#363636] text-white px-4 py-1 rounded-lg text-sm !leading-4">Đang theo dõi</button>
                    </div>
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                        <span>ww.haniee</span>
                        <button className="w-[132px] h-8 ml-auto bg-[#555555b3] hover:bg-[#363636] text-white px-4 py-1 rounded-lg text-sm !leading-4">Đang theo dõi</button>
                    </div>
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                        <span>ww.haniee</span>
                        <button className="w-[132px] h-8 ml-auto bg-[#555555b3] hover:bg-[#363636] text-white px-4 py-1 rounded-lg text-sm !leading-4">Đang theo dõi</button>
                    </div>
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                        <span>ww.haniee</span>
                        <button className="w-[132px] h-8 ml-auto bg-[#555555b3] hover:bg-[#363636] text-white px-4 py-1 rounded-lg text-sm !leading-4">Đang theo dõi</button>
                    </div>
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                        <span>ww.haniee</span>
                        <button className="w-[132px] h-8 ml-auto bg-[#555555b3] hover:bg-[#363636] text-white px-4 py-1 rounded-lg text-sm !leading-4">Đang theo dõi</button>
                    </div>
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                        <span>ww.haniee</span>
                        <button className="w-[132px] h-8 ml-auto bg-[#555555b3] hover:bg-[#363636] text-white px-4 py-1 rounded-lg text-sm !leading-4">Đang theo dõi</button>
                    </div>
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                        <span>ww.haniee</span>
                        <button className="w-[132px] h-8 ml-auto bg-[#555555b3] hover:bg-[#363636] text-white px-4 py-1 rounded-lg text-sm !leading-4">Đang theo dõi</button>
                    </div>
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                        <span>ww.haniee</span>
                        <button className="w-[132px] h-8 ml-auto bg-[#555555b3] hover:bg-[#363636] text-white px-4 py-1 rounded-lg text-sm !leading-4">Đang theo dõi</button>
                    </div>
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                        <span>ww.haniee</span>
                        <button className="w-[132px] h-8 ml-auto bg-[#555555b3] hover:bg-[#363636] text-white px-4 py-1 rounded-lg text-sm !leading-4">Đang theo dõi</button>
                    </div>
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                        <span>ww.haniee</span>
                        <button className="w-[132px] h-8 ml-auto bg-[#555555b3] hover:bg-[#363636] text-white px-4 py-1 rounded-lg text-sm !leading-4">Đang theo dõi</button>
                    </div>
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                        <span>ww.haniee</span>
                        <button className="w-[132px] h-8 ml-auto bg-[#555555b3] hover:bg-[#363636] text-white px-4 py-1 rounded-lg text-sm !leading-4">Đang theo dõi</button>
                    </div>
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                        <span>ww.haniee</span>
                        <button className="w-[132px] h-8 ml-auto bg-[#555555b3] hover:bg-[#363636] text-white px-4 py-1 rounded-lg text-sm !leading-4">Đang theo dõi</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Following;
