import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import useOnClickOutside from "@/hooks/outside";
import { useParams } from "next/navigation";
import Image from "next/image";
import { CldImage } from "next-cloudinary";

const MyFollowers = ({ followerList, myFollowing, handleFollow, handleUnfollow }: any) => {
    return followerList.map((follower: any) => {
        return (
            <div key={follower.userName} className="flex items-center">
                {follower.avatarUrl !== '' ? (
                    <CldImage
                        key={follower.avatarUrl}
                        src={follower.avatarUrl}
                        alt={`avatar ${follower.userName}`}
                        loading="lazy"
                        width={40}
                        height={40}
                        className="w-10 h-10 object-cover rounded-full mr-3"
                    />
                ) : (
                    <Image src={"/avatar.jpg"} alt="avatar" width={40} height={40} className="rounded-full mr-3" />
                )}
                <div className="flex w-full items-center gap-1">
                    <span className="text-white">{follower.userName}</span>
                    <span className="text-white">·</span>
                    {myFollowing.find((item: any) => item.userName === follower.userName) ? (
                        <button
                            onClick={() => {
                                handleUnfollow(follower.userName)
                            }}
                            className={`hover:text-[#E0F1FF] text-blue-500 text-xs`}
                        >
                            Đang theo dõi
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                handleFollow(follower.userName)
                            }}
                            className={`hover:text-[#E0F1FF] text-blue-500 text-xs`}
                        >
                            Theo dõi
                        </button>
                    )}
                </div>
            </div>
        )
    })
}

const OthersFollowers = ({ loginedUser, followerList, myFollowing, handleFollow, handleUnfollow }: any) => {
    console.log(loginedUser, "loginedUser")
    return followerList.map((follower: any) => {
        return (
            <div key={follower.userName} className="flex items-center">
                {follower.avatarUrl !== '' ? (
                    <CldImage
                        key={follower.avatarUrl}
                        src={follower.avatarUrl}
                        alt={`avatar ${follower.userName}`}
                        loading="lazy"
                        width={40}
                        height={40}
                        className="w-10 h-10 object-cover rounded-full mr-3"
                    />
                ) : (
                    <Image src={"/avatar.jpg"} alt="avatar" width={40} height={40} className="rounded-full mr-3" />
                )}
                <div className="flex w-full items-center justify-between gap-1">
                    <span className="text-white">{follower.userName}</span>
                    {follower.userName !== loginedUser && (
                        myFollowing.find((item: any) => item.userName === follower.userName) ? (
                            <button
                                onClick={() => handleUnfollow(follower.userName)}
                                className={`w-[132px] h-8 ml-auto bg-[#555555b3] hover:bg-[#363636] text-white px-4 py-1 rounded-lg text-sm !leading-4`}
                            >
                                Đang theo dõi
                            </button>
                        ) : (
                            <button
                                onClick={() => handleFollow(follower.userName)}
                                className={`w-[132px] h-8 ml-auto bg-[#0095f6] hover:bg-[#363636] text-white px-4 py-1 rounded-lg text-sm !leading-4`}
                            >
                                Theo dõi
                            </button>
                        )
                    )}
                </div>
            </div>
        )
    })
}

const Followers = ({ setIsModalOpen, isMyProfile, userInfo, handleFollow, handleUnfollow }: { setIsModalOpen: (value: boolean) => void, isMyProfile: boolean, userInfo: any, handleFollow: (userName: string) => void, handleUnfollow: (userName: string) => void }) => {
    const followerList = useSelector((state: RootState) => state.follow.followers);
    const myFollowing = useSelector((state: RootState) => state.follow.myFollowing);

    const currentUsername = useParams().username;

    const popUp = useRef<HTMLDivElement>(null);

    console.log(userInfo.username, "userInfo")

    useOnClickOutside(popUp, () => {
        setIsModalOpen(false);
    });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div ref={popUp} className="bg-[#262626] rounded-lg shadow-lg max-w-sm w-full">
                <div className=" relative m-auto border-b border-gray-200 py-2 px-6">
                    <h2 className="text-xl font-medium text-white text-center">Người theo dõi</h2>
                    <button onClick={() => setIsModalOpen(false)} className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-white">
                        X
                    </button>
                </div>
                <div className="h-[310px] mt-4 space-y-4 px-6 overflow-y-scroll">
                    {followerList.length > 0 ? (
                        isMyProfile ? (
                            <MyFollowers
                                isMyProfile={isMyProfile}
                                followerList={followerList}
                                myFollowing={myFollowing}
                                handleFollow={handleFollow}
                                handleUnfollow={handleUnfollow}
                            />
                        ) : (
                            <OthersFollowers
                                isMyProfile={isMyProfile}
                                followerList={followerList}
                                myFollowing={myFollowing}
                                handleFollow={handleFollow}
                                handleUnfollow={handleUnfollow}
                                loginedUser={userInfo.username as string}
                            />
                        )
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-white/50">{isMyProfile ? "Bạn" : currentUsername} chưa có người theo dõi</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Followers;
