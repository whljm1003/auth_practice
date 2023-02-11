import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useKakao from "../hooks/useKakao";

const Page = () => {
  const router = useRouter();
  const [data, KAKAO_AUTH_URL, getUserInfo, KakaoLogout] = useKakao();

  useEffect(() => {
    if (router.query.code) {
      getUserInfo();
    }
  }, [router]);

  return (
    <div>
      {/* 로그인 전*/}
      <ul>
        <li>
          {data ? (
            <>
              <div>{`카카오 아이디: ${data.id}`}</div>
              <div>{`이메일: ${data.kakao_account.email}`}</div>
              <div>{`닉네임: ${data.kakao_account.profile.nickname}`}</div>
              <button onClick={KakaoLogout}>kakao Sign out</button>
            </>
          ) : (
            <Link href={KAKAO_AUTH_URL}>kakao Sign in</Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Page;
