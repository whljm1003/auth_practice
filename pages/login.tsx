import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
// import Layout from "../components/layout";

const Page = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const onLogin = (e: any) => {
    e.preventDefault();
    signIn("google");
  };
  const onLogout = (e: any) => {
    e.preventDefault();
    signOut();
  };

  useEffect(() => {
    console.log(session);
    console.log(status);
  }, [session, status]);

  return (
    <div>
      <div>
        {/* 로그인 전*/}
        {!session && (
          <ul>
            <li>
              <Link href="/api/auth/signin">
                <a onClick={onLogin}>Google Sign in</a>
              </Link>
            </li>
          </ul>
        )}
      </div>
      <div>
        {/* 로그인 후 */}
        {session?.user && (
          <>
            <Link href={"/api/auth/signout"}>
              <a onClick={onLogout}>Sign out</a>
            </Link>
            <div>{session.user.email}</div>
            <div>{session.user.name}</div>
            <Image
              src={session?.user?.image!}
              alt="user-img"
              width={50}
              height={50}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
