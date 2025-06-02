import { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useOnClickOutside from "@/hooks/outside";
import { useParams } from "next/navigation";
import Image from "next/image";
import OutputFile from "@/app/(post)/create-post/outputFile";
import Link from "next/link";
const MyFollowers = ({ followerList, myFollowing, handleFollow, handleUnfollow }: any) => {
  return followerList.map((follower: any) => {
    return (
      <div className="flex items-center">
        <Link href={`http://localhost:3000/user/${follower.userName}`}>
          <div key={follower.userName} style={{ display: "flex" }}>
            <div className="w-6 h-6 rounded-full position-relative" style={{ position: "relative", marginRight: "10px" }}>
              {follower?.avatarUrl ? (
                <OutputFile imageID={follower?.avatarUrl ?? ""} />
              ) : (
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZw4HYx8PHlE8ZniW1hqck5nZeKaYZSqG56g&s"
                  alt="avatar"
                  className="w-12 h-12 rounded-full"
                  width={48}
                  height={48}
                  style={{ height: "100%" }}
                />
              )}
            </div>

            <div className="flex w-full items-center gap-1">
              <span className="text-white">{follower.userName}</span>
              <span className="text-white">·</span>
              {myFollowing.find((item: any) => item.userName === follower.userName) ? (
                <button
                  onClick={() => {
                    handleUnfollow(follower.userName);
                  }}
                  className={`hover:text-[#E0F1FF] text-blue-500 text-xs`}
                >
                  Following
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleFollow(follower.userName);
                  }}
                  className={`hover:text-[#E0F1FF] text-blue-500 text-xs`}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
        </Link>
      </div>
    );
  });
};

const OthersFollowers = ({ loginedUser, followerList, myFollowing, handleFollow, handleUnfollow }: any) => {
  console.log(loginedUser, "loginedUser");
  return followerList.map((follower: any) => {
    return (
      <div className="flex items-center">
        <Link href={`http://localhost:3000/user/${follower.userName}`}>
          <div key={follower.userName} style={{ display: "flex", alignItems: "center" }}>
            <div className="w-6 h-6 rounded-full position-relative" style={{ position: "relative", marginRight: "10px" }}>
              {follower?.avatarUrl ? (
                <OutputFile imageID={follower?.avatarUrl ?? ""} />
              ) : (
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZw4HYx8PHlE8ZniW1hqck5nZeKaYZSqG56g&s"
                  alt="avatar"
                  className="w-12 h-12 rounded-full"
                  width={48}
                  height={48}
                  style={{ height: "100%" }}
                />
              )}
            </div>
            <div className="flex w-full items-center justify-between gap-1">
              <span className="text-white">{follower.userName}</span>
              {follower.userName !== loginedUser &&
                (myFollowing.find((item: any) => item.userName === follower.userName) ? (
                  <button
                    onClick={() => handleUnfollow(follower.userName)}
                    className={`w-[132px] h-8 ml-auto bg-[#555555b3] hover:bg-[#363636] text-white px-4 py-1 rounded-lg text-sm !leading-4`}
                  >
                    Following
                  </button>
                ) : (
                  <button
                    onClick={() => handleFollow(follower.userName)}
                    className={`w-[132px] h-8 ml-auto bg-[#0095f6] hover:bg-[#363636] text-white px-4 py-1 rounded-lg text-sm !leading-4`}
                  >
                    Follow
                  </button>
                ))}
            </div>
          </div>
        </Link>
      </div>
    );
  });
};

const Followers = ({
  setIsModalOpen,
  isMyProfile,
  userInfo,
  handleFollow,
  handleUnfollow,
}: {
  setIsModalOpen: (value: boolean) => void;
  isMyProfile: boolean;
  userInfo: any;
  handleFollow: (userName: string) => void;
  handleUnfollow: (userName: string) => void;
}) => {
  const followerList = useSelector((state: RootState) => state.follow.followers);
  const myFollowing = useSelector((state: RootState) => state.follow.myFollowing);

  const currentUsername = useParams().username;

  const popUp = useRef<HTMLDivElement>(null);

  console.log(userInfo.username, "userInfo");

  useOnClickOutside(popUp, () => {
    setIsModalOpen(false);
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div ref={popUp} className="bg-[#262626] rounded-lg shadow-lg max-w-sm w-full">
        <div className=" relative m-auto border-b border-gray-200 py-2 px-6">
          <h2 className="text-xl font-medium text-white text-center">Followers</h2>
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
              <p className="text-white/50">{isMyProfile ? "Bạn" : currentUsername} chưa có Followers</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Followers;
