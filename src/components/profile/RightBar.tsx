import Recommendations from "./Recommendations";
import PopularTags from "./PopularTags";

interface RightBarProps {
  userInfo: {
    userId: string;
    username: string;
  };
  avatar_url: string;
}

const RightBar = ({ userInfo, avatar_url }: RightBarProps) => {
  console.log("rightbar")
  return (
    <div className="py-4 space-y-4">
      <PopularTags
        userInfo={userInfo}
        avatar_url={avatar_url}
      />
      <Recommendations
        userInfo={userInfo}
        avatar_url={avatar_url}
      />
    </div>
  );
};

export default RightBar;