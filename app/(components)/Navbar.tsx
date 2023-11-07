import { getServerSession } from "next-auth";
import Link from "next/link";
import { options } from "../api/auth/[...nextauth]/options";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getServerSession(options);

  return (
    <header className="bg-gray-600 text-gray-100">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div>My Site</div>
        <div className="flex gap-10">
          <Link href="/">Home</Link>
          <Link href="/create-user">Create User</Link>
          <Link href="/client-member">Client Memeber</Link>
          <Link href="/member">Member</Link>
          <Link href="/public">Public</Link>
          {session ? (
            <Link href="/api/auth/signout?callbackUrl=/">Sign Out</Link>
          ) : (
            <Link href="/api/auth/signin">Sign In</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
