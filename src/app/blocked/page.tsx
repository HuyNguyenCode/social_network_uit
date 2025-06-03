"use client";

import { AppDispatch } from "@/redux/store";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getBlockedUsers, unblockUser } from "@/redux/followSlice";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const BlockedPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const blockedUsers = useSelector((state: RootState) => state.follow.blocked);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        await dispatch(getBlockedUsers() as any).unwrap();
      } catch (error: any) {
        toast.error(error.message || "Có lỗi xảy ra");
      }
      setIsLoading(false);
    })();
  }, [dispatch]);

  const handleUnblock = async (userName: string) => {
    try {
      await dispatch(unblockUser({ userToUnblockName: userName }) as any).unwrap();

      dispatch(getBlockedUsers() as any);
      toast.success("Đã bỏ chặn người dùng");
    } catch (error: any) {
      toast.error(error.message || "Có lỗi xảy ra");
    }
  };
  console.log(blockedUsers);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="px-10 py-10 flex flex-col w-[700px]">
      <h1 className="text-2xl font-bold">The account has been blocked</h1>
      <p className="text-gray-500">You can block anytime</p>
      {blockedUsers.length > 0 ? (
        <div className="mt-4">
          {blockedUsers.map((user, index) => (
            <div
              key={user.userId}
              className={cn("flex justify-between items-center gap-2 p-5", index !== 0 && "border-t-2 border-gray-200")}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div>
                  <span className="font-medium">{user.userName}</span>
                </div>
              </div>
              <button
                onClick={() => handleUnblock(user.userName)}
                className="bg-[#262626] text-white px-4 py-2 rounded-md hover:bg-[#363636] transition-colors"
              >
                Unblock
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 p-8 rounded-lg shadow-sm text-center">
          <p className="text-gray-500">No account has been blocked</p>
          <p className="text-sm text-gray-400 mt-2">
            When you block someone, they will not be able to view your post or contact you
          </p>
        </div>
      )}
    </div>
  );
};

export default BlockedPage;
