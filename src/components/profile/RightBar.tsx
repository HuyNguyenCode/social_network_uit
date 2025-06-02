import Recommendations from "./Recommendations"; 
import PopularTags from "./PopularTags"; 

interface RightBarProps {
  username: string;
  avatar_url: string;
}

const RightBar = ({ username, avatar_url }: RightBarProps) => {
  return (
    <div className="py-4 space-y-4">
      <PopularTags 
        username={username}
        avatar_url={avatar_url}
      />
      <Recommendations 
        username={username}
        avatar_url={avatar_url}
      />
    </div>
  );
};

export default RightBar;