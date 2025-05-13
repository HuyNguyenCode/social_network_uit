// "use client";

// import { useState } from 'react';
// import ProfileInfo from "@/components/profile/ProfileInfo";
// import ProfileAvatar from "@/components/profile/ProfileAvatar"; 

// interface ProfileData {
//   fullName: string;
//   email: string;
//   phoneNumber: string;
//   accountType: string;
//   avatarUrl: string;
// }

// export default function ProfilePage() {
//   const [profile, setProfile] = useState<ProfileData>({
//     fullName: "Wonderful Law",
//     email: "wonderfullaw@gmail.com",
//     phoneNumber: "",
//     accountType: "Pro",
//     avatarUrl: "/general/image.png",
//   });
  
//   const [isDirty, setIsDirty] = useState(false);

//   const handleInputChange = (field: keyof ProfileData, value: string) => {
//     setProfile(prev => ({
//       ...prev,
//       [field]: value
//     }));
//     setIsDirty(true);
//   };

//   const handleSave = () => {
//     // Tạm thời chỉ hiện thông báo
//     alert("Changes saved!");
//     setIsDirty(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
//         <div className="flex flex-col items-center">
//           <ProfileAvatar
//             avatarUrl={profile.avatarUrl}
//             onChange={(url) => handleInputChange("avatarUrl", url)}
//           />
//           <ProfileInfo
//             fullName={profile.fullName}
//             email={profile.email}
//             phoneNumber={profile.phoneNumber}
//             accountType={profile.accountType}
//             onChange={handleInputChange}
//           />
          
//           {/* Nút Save */}
//           <div className="mt-6 w-full flex justify-end">
//             <button
//               onClick={handleSave}
//               disabled={!isDirty}
//               className={`px-6 py-2 rounded-lg text-white font-medium
//                 ${isDirty 
//                   ? 'bg-blue-500 hover:bg-blue-600' 
//                   : 'bg-gray-400 cursor-not-allowed'
//                 }`}
//             >
//               Save Changes
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }