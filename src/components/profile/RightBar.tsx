import Recommendations from "./Recommendations";
import PopularTags from "./PopularTags";
import { useUserStore } from "@/store/useUserStore";
import Cookies from "js-cookie";
interface RightBarProps {
  userInfo: {
    userId: string;
    username: string;
  };
  avatar_url: string;
}

const RightBar = ({ userInfo, avatar_url }: RightBarProps) => {
  const { userId, username } = useUserStore();
  console.log("userInfo", userInfo);

  return (
    <div className="py-4 space-y-4">
      <PopularTags userInfo={userInfo} avatar_url={avatar_url} />
      {userInfo.username === username && <Recommendations userInfo={userInfo} avatar_url={avatar_url} />}
    </div>
  );
};

export default RightBar;
