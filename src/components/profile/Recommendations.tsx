import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OutputFile from "@/app/(post)/create-post/outputFile";
interface RecommendationsProps {
  userInfo: {
    username: string;
    userId: string;
  };
  avatar_url: string;
}

const Recommendations = ({ userInfo, avatar_url }: RecommendationsProps) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/settings/settings/link");
  };

  return (
    <div className="p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4 bg-[#f7f9fa] ">
      {/* Edit Profile */}
      <h2 className="font-bold text-gray-600">Settings</h2>
      <div className="flex items-center justify-between">
        {/* IMAGE AND USER INFO */}
        <div className="flex items-center gap-2">
          <div className="relative rounded-full overflow-hidden w-10 border h-10">
            {avatar_url ? (
              <div className="relative rounded-full overflow-hidden w-10 border h-10" style={{ position: "relative" }}>
                <OutputFile imageID={avatar_url ?? ""} />
              </div>
            ) : (
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZw4HYx8PHlE8ZniW1hqck5nZeKaYZSqG56g&s"
                alt="avatar"
                className="relative rounded-full overflow-hidden w-10 border h-10"
                width={32}
                height={32}
                style={{ height: "100%" }}
              />
            )}
          </div>
          <div className="">
            <h1 className="text-sm font-bold">Profile</h1>
          </div>
        </div>
        {/* BUTTON */}
        <div>
          <Link href="/settings/profile">
            <button className="py-1 px-2 font-semibold bg-gray-200 text-black rounded-full text-[12px] hover:bg-gray-100">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>

      {/* Avatar */}
      <div className="flex items-center justify-between border-b pb-4">
        {/* IMAGE AND USER INFO */}
        <div className="flex items-center gap-2">
          <div className="relative rounded-full overflow-hidden w-10 border h-10">
            <Image className="p-1" src="/icons/profile-svg.svg" alt="Avatar" width={100} height={100} />
          </div>
          <div className="">
            <h1 className="text-sm font-bold">Avatar</h1>
          </div>
        </div>
        {/* BUTTON */}
        <div>
          <Link href="/settings/settings/profile">
            <button className="py-1 px-2 font-semibold bg-gray-200 text-black rounded-full text-[12px] hover:bg-gray-100">
              Style Avatar
            </button>
          </Link>
        </div>
      </div>

      <h2 className="font-bold text-gray-600">Links</h2>

      <div className="flex pb-3">
        <button
          onClick={handleNavigate}
          className="py-1 px-4 gap-2 font-thin hover:bg-gray-100 bg-gray-200 text-black text-[12px] rounded-full border-[1px] flex items-center"
        >
          <span className="text-xl">+</span>
          <span className="font-bold">Add Social Link</span>
        </button>
      </div>
    </div>
  );
};

export default Recommendations;
