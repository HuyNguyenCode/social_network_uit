import Link from "next/link";
import Image from "next/image";
import { FaRegComment } from "react-icons/fa";
import Followers from "@/components/profile/Follower";
import Following from "@/components/profile/Following";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { blockUser, followUser, getFollowers, getFollowing, getMyFollowing, unfollowUser } from "@/redux/followSlice";
import { redirect, useParams } from "next/navigation";
import useOnClickOutside from "@/hooks/outside";
import { toast } from "sonner";
import { useUserStore } from "@/store/useUserStore";
interface PopularTagsProps {
  userInfo: {
    userId: string;
    username: string;
  };
  avatar_url: string;
}

const PopularTags = ({ userInfo }: PopularTagsProps) => {
  const dispatch = useDispatch();
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);

  const [viewFollowers, setViewFollowers] = useState(false);
  const [viewFollowing, setViewFollowing] = useState(false);
  const currentUsername = useParams().username;
  const { userId, username } = useUserStore();
  const isMyProfile = currentUsername === username;

  const moreModalRef = useRef(null);

  const { followers, following, myFollowing } = useSelector((state: RootState) => state.follow);
  const isFollowing = myFollowing.find((follow) => follow.userName === currentUsername);

  const blockModelRef = useRef(null);
  useOnClickOutside(blockModelRef, () => setIsMoreModalOpen(false));

  const handleBlockUser = async () => {
    try {
      await dispatch(blockUser({ userToBlockName: currentUsername as string }) as any).unwrap();
      toast.success("Đã chặn người dùng");
      setIsMoreModalOpen(false);
      if (isFollowing) {
        await handleUnfollow(currentUsername as string);
      }
      redirect(`/user/${currentUsername}`);
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra");
    }
  };

  const handleFollow = async (targetUsername: string) => {
    try {
      await dispatch(followUser({ targetUsername: targetUsername }) as any).unwrap();
      toast.success("Follow thành công");
      Promise.all([
        dispatch(getMyFollowing() as any).unwrap(),
        dispatch(getFollowing({ username: currentUsername as string }) as any).unwrap(),
        dispatch(getFollowers({ username: currentUsername as string }) as any).unwrap(),
      ]);
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra");
    }
  };

  const handleUnfollow = async (targetUsername: string) => {
    try {
      const resultAction = await dispatch(unfollowUser({ targetUsername: targetUsername }) as any).unwrap();

      if (unfollowUser.rejected.match(resultAction)) {
        const error = resultAction.payload as { message: string; status: number };
        toast.error(error.message || "Không thể hủy Follow");
      } else {
        toast.success("Đã hủy Follow");
        Promise.all([
          dispatch(getMyFollowing() as any).unwrap(),
          dispatch(getFollowing({ username: currentUsername as string }) as any).unwrap(),
          dispatch(getFollowers({ username: currentUsername as string }) as any).unwrap(),
        ]);
      }
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra");
    }
  };

  return (
    <div className="rounded-2xl border-[1px] border-borderGray flex flex-col bg-[#f7f9fa]">
      <div className="relative w-full max-w-[317px]">
        <div className="rounded-t-2xl overflow-hidden w-full h-auto" style={{ width: "107%" }}>
          <Image className="h-[97px] w-full object-cover" src="/general/post.jpeg" alt="banner" width={317} height={97} />
        </div>
        <Link href="/" className="absolute bottom-0 right-0 px-2 py-2">
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer bg-gray-200 hover:bg-gray-100">
            <Image className="" src="/icons/camera-svgrepo-com.svg" alt="more" width={20} height={20} />
          </div>
        </Link>
      </div>

      <div className="px-4 py-2">
        <div className="relative flex justify-between items-center gap-2">
          <h2 className="font-bold py-2">{currentUsername || "No username"}</h2>
          <button
            ref={moreModalRef}
            onClick={() => setIsMoreModalOpen((prev) => !prev)}
            className="bg-gray-200 text-black pb-2 px-3 rounded-2xl leading-none"
          >
            ...
          </button>
          {isMoreModalOpen && (
            <div ref={blockModelRef} className="absolute top-9 right-0 z-10">
              <div className="w-48 bg-white shadow-md rounded-lg">
                {isMyProfile ? (
                  <Link href={`/blocked`} className="block w-full h-10 px-3 py-2 text-center hover:bg-gray-100 rounded-md">
                    Xem người đã chặn
                  </Link>
                ) : (
                  <button onClick={handleBlockUser} className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md">
                    Chặn
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {!isMyProfile && (
          <div className="flex gap-2 justify-between py-3">
            {isFollowing ? (
              <button
                onClick={() => handleUnfollow(currentUsername as string)}
                className={`flex items-center gap-1 py-1 px-3 bg-gray-200 text-black rounded-full text-sm hover:bg-gray-300 transition-colors`}
              >
                Following
              </button>
            ) : (
              <button
                onClick={() => handleFollow(currentUsername as string)}
                className={`flex items-center gap-1 py-1 px-3 bg-gray-200 text-black rounded-full text-sm hover:bg-gray-300 transition-colors`}
              >
                Follow
              </button>
            )}

            <button className="flex items-center gap-1 py-1 px-3 bg-gray-200 text-black rounded-full text-sm hover:bg-gray-300 transition-colors">
              <FaRegComment className="w-3 h-3" />
              Chat
            </button>
          </div>
        )}
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <button onClick={() => setViewFollowers(true)} className="font-bold text-gray-600 focus:outline-none hover:underline">
              {followers.length}
            </button>
            <span className="text-sm text-gray-500">Followers</span>
            {viewFollowers && (
              <Followers
                handleFollow={handleFollow}
                handleUnfollow={handleUnfollow}
                setIsModalOpen={setViewFollowers}
                isMyProfile={isMyProfile}
                userInfo={userInfo}
              />
            )}
          </div>

          <div className="flex flex-col items-center">
            <button onClick={() => setViewFollowing(true)} className="text-gray-600 font-bold focus:outline-none hover:underline">
              {following.length}
            </button>
            <span className="text-gray-500 text-sm">Followings</span>
            {viewFollowing && (
              <Following
                handleFollow={handleFollow}
                handleUnfollow={handleUnfollow}
                setIsModalOpen={setViewFollowing}
                isMyProfile={isMyProfile}
                userInfo={userInfo}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularTags;
