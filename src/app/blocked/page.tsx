"use client"

import { AppDispatch } from "@/redux/store";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getBlockedUsers, unblockUser, blockUser } from "@/redux/followSlice";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const BlockedPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [loadingUnblock, setLoadingUnblock] = useState<string | null>(null);
    const blockedUsers = useSelector((state: RootState) => state.follow.blocked);

    useEffect(() => {
        dispatch(getBlockedUsers() as any);
    }, [dispatch]);

    const handleUnblock = async (userId: string) => {
        try {
            setLoadingUnblock(userId);
            const resultAction = await dispatch(unblockUser({ userToUnblockId: userId }) as any);

            if (unblockUser.rejected.match(resultAction)) {
                const error = resultAction.payload as { message: string; status: number };
                toast.error(error.message || "Không thể bỏ chặn người dùng");
            } else {
                toast.success("Đã bỏ chặn người dùng");
                // Refresh danh sách người dùng bị chặn
                dispatch(getBlockedUsers() as any);
            }
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra");
        } finally {
            setLoadingUnblock(null);
        }
    }

    return (
        <div className="px-10 py-10 flex flex-col w-[900px]">
            <h1 className="text-2xl font-bold">Tài khoản đã chặn</h1>
            <p className="text-gray-500">Bạn có thể chặn bất cứ lúc nào</p>
            {blockedUsers.length > 0 ? (
                <div className="mt-4">
                    {blockedUsers.map((user) => (
                        <div key={user.userId} className="flex justify-between items-center gap-2 p-4 bg-white rounded-lg shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                                <div>
                                    <span className="font-medium">{user.username}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleUnblock(user.userId)}
                                disabled={loadingUnblock === user.userId}
                                className={`bg-[#262626] text-white px-4 py-2 rounded-md hover:bg-[#363636] transition-colors ${loadingUnblock === user.userId ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {loadingUnblock === user.userId ? 'Đang xử lý...' : 'Bỏ chặn'}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="mt-4 p-8 bg-white rounded-lg shadow-sm text-center">
                    <p className="text-gray-500">Chưa có tài khoản nào bị chặn</p>
                    <p className="text-sm text-gray-400 mt-2">
                        Khi bạn chặn ai đó, họ sẽ không thể xem bài viết của bạn hoặc liên hệ với bạn
                    </p>
                </div>
            )}
        </div>
    );
};

export default BlockedPage;