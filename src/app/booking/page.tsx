import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";

export default async function Booking() {
  const session = await getServerSession(authOptions);
  let profile = null;

  if (session && session.user?.token) {
    profile = await getUserProfile(session.user.token);
  }

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4 pt-10">
      <div className="text-2xl font-medium">Venue Booking</div>
      {profile ? (
        <div className="bg-slate-100 m-5 p-5 rounded-lg w-[80%] max-w-lg">
          <div className="text-2xl font-bold mb-4">{profile.data.name}</div>
          <table className="table-auto border-separate border-spacing-2">
            <tbody>
              <tr>
                <td className="font-semibold">Name:</td>
                <td>{profile.data.name}</td>
              </tr>
              <tr>
                <td className="font-semibold">Email:</td>
                <td>{profile.data.email}</td>
              </tr>
              <tr>
                <td className="font-semibold">Tel.:</td>
                <td>{profile.data.tel}</td>
              </tr>
              <tr>
                <td className="font-semibold">Member Since:</td>
                <td>{new Date(profile.data.createdAt).toString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-lg text-gray-500">
          Please log in to view your profile and make a booking.
        </div>
      )}
    </main>
  );
}
