import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

const Page = () => {
  const { data: session, status } = useSession();
  const csrfToken = getCsrfToken();

  const loading = status === "loading";

  const onGoogleLogin = (e: any) => {
    e.preventDefault();
    signIn("kakao");
  };
  const onKakaoLogin = (e: any) => {
    e.preventDefault();
    signIn("kakao");
  };
  const onLogout = (e: any) => {
    e.preventDefault();
    signOut();
  };

  // 리다이렉트 카카오 로그인
  // const kakaoLogin = () => {
  //   window.Kakao.Auth.authorize({
  //     redirectUri: "http://localhost:3000/kakao",
  //   });
  // };
  // const getKakaoUserInfo = async () => {
  //   console.log("카카오 로그인 인포");
  //   let data = "";
  //   await window.Kakao.API.request({
  //     url: "/v2/user/me",
  //     success: function (response: any) {
  //       data = response;
  //     },
  //     fail: function (error: any) {
  //       console.log(error);
  //     },
  //   });
  //   console.log("카카오 계정 정보", data);
  //   return data;
  // };

  // useEffect(() => {
  //   getKakaoUserInfo();
  // }, []);

  useEffect(() => {
    console.log(session);
    console.log(status);
    csrfToken.then((res) => console.log(res));
  }, [session, status, csrfToken]);

  return (
    <div>
      {/* <div onClick={kakaoLogin}>카카오 로인</div> */}
      <div>
        {/* 로그인 전*/}
        {!session && (
          <ul>
            <li>
              <Link href="/api/auth/signin">
                <a onClick={onGoogleLogin}>Google Sign in</a>
              </Link>
            </li>
            <li>
              <Link href="/api/auth/signin">
                <a onClick={onKakaoLogin}>kakao Sign in</a>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
