// interface Params {
//   id: string;
// }

// export default async function UserProfile({ params }: { params: Params }) {
//     return (
//       <div className="grid grid-rows-[20px_1fr_20px]  items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//         <h1 className="text-4xl font-bold neon-text">Profile</h1>
//         <div className="flex flex-row gap-6 w-fit  p-6 rounded-2xl glassy-bg shadow-lg backdrop-blur-md border border-gray-700">
//           <p className="text-md font-medium">User Profile Information 
//             <span className="bg-orange-700 ml-10 text-2xl font-bold p-2 rounded-xl"> {params.id}</span>
//           </p>
//         </div>
//       </div>
  
//     );
//   }



  // app/profile/[id]/page.tsx
interface PageProps {
  params: { id: string };
}

export default function UserProfile({ params }: PageProps) {
  return (
    <div className="flex flex-col items-start justify-start p-6">
      <div className="flex flex-row gap-6 w-fit p-6 rounded-2xl glassy-bg shadow-lg backdrop-blur-md border border-gray-700">
        <p className="text-md font-medium">
          User Profile Information
          <span className="bg-orange-700 ml-10 text-2xl font-bold p-2 rounded-xl">
            {params.id}
          </span>
        </p>
      </div>
    </div>
  );
}
