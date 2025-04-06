import React from 'react';
import Image from 'next/image';

interface UserPeakProfileProps {
    username: string;
    avatar: string;
    karma: number;
    cakeDay: string;
    description?: string;
}

const UserPeakProfile: React.FC<UserPeakProfileProps> = ({
    username,
    avatar,
    karma,
    cakeDay,
    description
}) => {
    return (
        <div className="flex flex-col max-w-[360px] w-[90vw] bg-[#181C1F] rounded-xl">
            <div className="pt-3 px-3">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-2 text-[#EEF1F3] text-lg font-bold">
                        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZw4HYx8PHlE8ZniW1hqck5nZeKaYZSqG56g&s
://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZw4HYx8PHlE8ZniW1hqck5nZeKaYZSqG56g&s
https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZw4HYx8PHlE8ZniW1hqck5nZeKaYZSqG56g&s" alt="avatar" className="w-12 h-12 rounded-full" width={48} height={48} />
                        <p>John Doe</p>
                    </div>
                    <button className="text-white text-sm font-semibold bg-[#2A3236] rounded-full px-4 py-1">Join</button>
                </div>
            </div>
            <div className="p-4 whitespace-normal text-sm !leading-5 font-normal">r/AskReddit is the place to ask and answer thought-provoking questions.</div>
            <div className="p-4 flex flex-row items-center gap-8 border-t border-[#FFFFFF19]">
                <div className="flex flex-col">
                    <span className="text-[#B7CAD4] text-sm font-semibold !leading-5">100M</span>
                    <span className="text-[#8BA2AD] text-xs !leading-4">Members</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[#B7CAD4] text-sm font-semibold !leading-5">5.5K</span>
                    <span className="flex items-center gap-1">
                        <span className="bg-[#01a816] rounded-full w-2 h-2"></span>
                        <span className="text-[#8BA2AD] text-xs !leading-4">Online</span>
                    </span>

                </div>
            </div>
        </div>
    )
}

export default UserPeakProfile; 