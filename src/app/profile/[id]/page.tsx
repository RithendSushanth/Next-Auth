
// import React from "react";

// export default function UserProfile({ params }: any) {
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center py-6 bg-gradient-to-b from-purple-500 to-pink-500">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h1 className="text-3xl sm:text-4xl mb-4 text-center font-bold text-purple-600">Profile</h1>
//         <hr className="my-4" />
//         <p className="text-xl sm:text-2xl text-center mb-4">
//           Profile content{" "}
//           <span className="text-lg sm:text-3xl p-2 rounded bg-orange-300 text-black block w-full max-w-md">{params.id}</span>
//         </p>
//       </div>
//     </div>
//   );
// }

// Import necessary libraries and styles
import React from "react";

export default function UserProfile({ params }: any) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-6 bg-gradient-to-b from-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded shadow-md w-full md:max-w-md">
        <h1 className="text-3xl sm:text-4xl mb-4 text-center font-bold text-purple-600">Profile</h1>
        <hr className="my-4" />
        <p className="text-xl sm:text-2xl text-center mb-4">
          Profile content{" "}
          <span className="text-lg sm:text-xl p-2 rounded bg-orange-300 text-black block w-full ">{params.id}</span>
        </p>
      </div>
    </div>
  );
}

