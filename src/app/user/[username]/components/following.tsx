import useOnClickOutside from "@/hooks/outside";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useParams } from "next/navigation";
import { CldImage } from "next-cloudinary";
import Image from "next/image";

const Following = ({ setIsModalOpen, isMyProfile, userInfo, handleFollow, handleUnfollow }: { setIsModalOpen: (value: boolean) => void, isMyProfile: boolean, userInfo: any, handleFollow: (userName: string) => void, handleUnfollow: (userName: string) => void }) => {
    const dispatch = useDispatch<AppDispatch>();

    console.log(userInfo, "userInfo")

    const followingList = useSelector((state: RootState) => state.follow.following);
    const myFollowing = useSelector((state: RootState) => state.follow.myFollowing);

    const currentUsername = useParams().username;

    const popUp = useRef<HTMLDivElement>(null);

    useOnClickOutside(popUp, () => {
        setIsModalOpen(false);
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div ref={popUp} className="bg-[#262626] rounded-lg shadow-lg max-w-sm w-full">
                <div className=" relative m-auto border-b border-gray-200 py-2 px-6">
                    <h2 className="text-xl font-medium text-white text-center">Đang theo dõi</h2>
                    <button onClick={() => setIsModalOpen(false)} className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-white">
                        X
                    </button>
                </div>
                <div className="h-[310px] mt-4 space-y-4 px-6 overflow-y-scroll">
                    {followingList.length > 0 ? (
                        followingList.map((following) => {
                            return (
                                <div key={following.userName} className="flex items-center">
                                    {following.avatarUrl !== '' ? (
                                        <CldImage
                                            key={following.avatarUrl}
                                            src={following.avatarUrl}
                                            alt={`avatar ${following.userName}`}
                                            loading="lazy"
                                            width={40}
                                            height={40}
                                            className="w-10 h-10 object-cover rounded-full mr-3"
                                        />
                                    ) : (
                                        <Image src={"/avatar.jpg"} alt="avatar" width={40} height={40} className="rounded-full mr-3" />
                                    )}
                                    <div className="flex items-center justify-between w-full gap-1">
                                        <span className="text-white">{following.userName}</span>
                                        {userInfo.username !== following.userName && (
                                            myFollowing.find(item => item.userName === following.userName) ? (
                                                <button
                                                    onClick={() => {
                                                        handleUnfollow(following.userName)
                                                    }}
                                                    className={`w-[132px] h-8 ml-auto bg-[#555555b3] hover:bg-[#363636] text-white px-4 py-1 rounded-lg text-sm !leading-4`}
                                                >
                                                    Đang theo dõi
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        handleFollow(following.userName)
                                                    }}
                                                    className={`w-[132px] h-8 ml-auto bg-[#555555b3] hover:bg-[#363636] text-white px-4 py-1 rounded-lg text-sm !leading-4`}
                                                >
                                                    Theo dõi
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-white/50">{isMyProfile ? "Bạn" : currentUsername} chưa theo dõi ai</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Following;
