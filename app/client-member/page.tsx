"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {};

const ClientMemberPage = (props: Props) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/client-member");
    },
  });
  return (
    <div>
      <h1>Member Client Session</h1>
      <p>Email: {session?.user?.email}</p>
      <p>Role: {session?.user?.role}</p>
    </div>
  );
};

export default ClientMemberPage;
