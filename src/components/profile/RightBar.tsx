import Recommendations from "./Recommendations"; 
import PopularTags from "./PopularTags"; 


const RightBar = () => {
  return (
    <div className="w-full py-4 flex-col gap-4 sticky top-0 h-max flex "> 
      <PopularTags />
      <Recommendations />  
    </div>
  );
};

export default RightBar;