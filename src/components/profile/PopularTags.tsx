import Link from "next/link";
import Image from "next/image";
import { FaRegComment } from "react-icons/fa";
import Followers from "@/app/user/[username]/components/followers";
import Following from "@/app/user/[username]/components/following";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { blockUser, followUser, getFollowers, getFollowing, getMyFollowing, unfollowUser } from "@/redux/followSlice";
import { useParams } from "next/navigation";
import { toast } from "sonner";


interface PopularTagsProps {
  userInfo: {
    userId: string;
    username: string;
  };
  avatar_url: string;
}

const PopularTags = ({ userInfo, avatar_url }: PopularTagsProps) => {
  const dispatch = useDispatch();
  const [isBlockLoading, setIsBlockLoading] = useState(false);
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);

  const [viewFollowers, setViewFollowers] = useState(false);
  const [viewFollowing, setViewFollowing] = useState(false);
  const currentUsername = useParams().username;
  const isMyProfile = currentUsername === userInfo.username;

  const moreModalRef = useRef(null);

  const { followers, following, myFollowing } = useSelector((state: RootState) => state.follow);
  const isFollowing = myFollowing.find(follow => follow.userName === currentUsername);

  const handleBlockUser = async () => {
    try {
      setIsBlockLoading(true);
      const resultAction = await dispatch(blockUser({ userToBlockName: currentUsername as string }) as any);

      if (blockUser.rejected.match(resultAction)) {
        const error = resultAction.payload as { message: string; status: number };
        toast.error(error.message || "Không thể chặn người dùng");
      } else {
        toast.success("Đã chặn người dùng");
        setIsMoreModalOpen(false);
        // Nếu đang theo dõi thì tự động hủy theo dõi
        if (isFollowing) {
          await handleUnfollow(currentUsername as string);
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra");
    } finally {
      setIsBlockLoading(false);
    }
  }

  const handleFollow = async (targetUsername: string) => {
    try {
      const resultAction = await dispatch(followUser({ targetUsername: targetUsername }) as any);

      if (followUser.rejected.match(resultAction)) {
        const error = resultAction.payload as { message: string; status: number };
        toast.error(error.message || "Không thể theo dõi người dùng");
      } else {
        toast.success("Theo dõi thành công");
        Promise.all([
          dispatch(getMyFollowing() as any),
          dispatch(getFollowing({ username: currentUsername as string }) as any),
          dispatch(getFollowers({ username: currentUsername as string }) as any)
        ])
      }
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra");
    }
  }

  const handleUnfollow = async (targetUsername: string) => {
    try {
      const resultAction = await dispatch(unfollowUser({ targetUsername: targetUsername }) as any);

      if (unfollowUser.rejected.match(resultAction)) {
        const error = resultAction.payload as { message: string; status: number };
        toast.error(error.message || "Không thể hủy theo dõi");
      } else {
        toast.success("Đã hủy theo dõi");
        Promise.all([
          dispatch(getMyFollowing() as any),
          dispatch(getFollowing({ username: currentUsername as string }) as any),
          dispatch(getFollowers({ username: currentUsername as string }) as any)
        ])
      }
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra");
    }
  }

  return (
    <div className="rounded-2xl border-[1px] border-borderGray flex flex-col bg-[#f7f9fa]">

      <div className="relative w-full max-w-[317px]">
        <div className="rounded-t-2xl overflow-hidden w-full h-auto">
          <Image className="h-[97px] w-full object-cover"
            src="/general/post.jpeg"
            alt="banner"
            width={317}
            height={97}
          />
        </div>
        <Link href="/" className="absolute bottom-0 right-0 px-2 py-2">
          <div className="w-9 h-9 flex items-center justify-center rounded-full border-[1px] border-gray-500 cursor-pointer bg-gray-200 hover:bg-gray-100">
            <Image className="" src="/icons/camera-svgrepo-com.svg" alt="more" width={20} height={20} />
          </div>
        </Link>
      </div>

      <div className="px-4 py-2">
        <div className="relative flex justify-between items-center gap-2">
          <h2 className="font-bold py-2">
            {currentUsername || "No username"}
          </h2>
          <button ref={moreModalRef} onClick={() => setIsMoreModalOpen((prev) => !prev)} className="bg-gray-200 text-black pb-2 px-3 rounded-2xl leading-none">
            ...
          </button>
          {isMoreModalOpen && (
            <div className="absolute top-9 right-0 z-10">
              <div className="w-40 bg-white shadow-md rounded-lg p-2">
                <button
                  onClick={handleBlockUser}
                  disabled={isBlockLoading}
                  className={`w-full text-left py-2 px-3 hover:bg-gray-100 rounded-md ${isBlockLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                  {isBlockLoading ? 'Đang xử lý...' : 'Chặn'}
                </button>
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
                Đang theo dõi
              </button>
            ) : (
              <button
                onClick={() => handleFollow(currentUsername as string)}
                className={`flex items-center gap-1 py-1 px-3 bg-gray-200 text-black rounded-full text-sm hover:bg-gray-300 transition-colors`}
              >
                Theo dõi
              </button>
            )}

            <button
              className="flex items-center gap-1 py-1 px-3 bg-gray-200 text-black rounded-full text-sm hover:bg-gray-300 transition-colors"
            >
              <FaRegComment className="w-3 h-3" />
              Chat
            </button>
          </div>
        )}
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <button
              onClick={() => setViewFollowers(true)}
              className="font-bold text-gray-600 focus:outline-none hover:underline"
            >
              {followers.length}
            </button>
            <span className="text-sm text-gray-500">Followers</span>
            {viewFollowers && (
              <Followers handleFollow={handleFollow} handleUnfollow={handleUnfollow} setIsModalOpen={setViewFollowers} isMyProfile={isMyProfile} userInfo={userInfo} />
            )}
          </div>

          <div className="flex flex-col items-center">
            <button
              onClick={() => setViewFollowing(true)}
              className="text-gray-600 font-bold focus:outline-none hover:underline"
            >
              {following.length}
            </button>
            <span className="text-gray-500 text-sm">Followings</span>
            {viewFollowing && (
              <Following handleFollow={handleFollow} handleUnfollow={handleUnfollow} setIsModalOpen={setViewFollowing} isMyProfile={isMyProfile} userInfo={userInfo} />
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PopularTags;