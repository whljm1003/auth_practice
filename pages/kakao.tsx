import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
// 리다이렉트 카카오 로그인
const Kakao: NextPage = () => {
  const router = useRouter();
  const { code: authCode, error: kakaoServerError } = router.query;

  useEffect(() => {
    const authorizeCodeFromKakao = window.location.search.split("=")[1];
    if (authorizeCodeFromKakao !== undefined) {
      console.log(`authorizeCodeFromKakao : ${authorizeCodeFromKakao}`);

      const data: any = {
        grant_type: "authorization_code",
        client_id: "cf6d4ca0c422c34c7f0b86a212cc501a",
        redirect_uri: "http://localhost:3000/kakao",
        code: authorizeCodeFromKakao,
      };

      const queryString = Object.keys(data)
        .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
        .join("&");

      fetch("https://kauth.kakao.com/oauth/token", {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        body: queryString,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          router.push("/login");
        });
    } else {
      console.log("No AuthorizeCodeFromKakao");
    }
  }, []);
  return <h2>로그인 중입니다..</h2>;
};

export default Kakao;
