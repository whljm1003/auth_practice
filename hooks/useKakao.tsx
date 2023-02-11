import axios from "axios";
import React, { useState } from "react";
import qs from "qs";

interface Kakao {
  connected_at: string;
  id: number;
  kakao_account: {
    age_range?: string;
    age_range_needs_agreement?: boolean;
    birthday?: string;
    birthday_needs_agreement?: boolean;
    birthday_type?: string;
    email?: string;
    email_needs_agreement?: boolean;
    gender?: string;
    gender_needs_agreement?: boolean;
    has_age_range?: boolean;
    has_birthday?: boolean;
    has_email?: boolean;
    has_gender?: boolean;
    is_email_valid?: boolean;
    is_email_verified?: boolean;
    profile_image_needs_agreement?: boolean;
    profile_nickname_needs_agreement?: boolean;
    profile: {
      is_default_image?: boolean;
      nickname?: string;
      profile_image_url?: string;
      thumbnail_image_url?: string;
    };
  };
  properties: {
    nickname?: string;
    profile_image?: string;
    thumbnail_image?: string;
  };
}

export default function useKakao() {
  const REST_API_KEY = process.env.KAKAO_REST_API;
  const REDIRECT_URI = process.env.KAKAO_REDIRECT_URL;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;

  const [data, setData] = useState<any>();

  // 리다이렉트 카카오 로그인을 위한 함수
  const kakaoinit = async () => {
    const kakao = await (global as any).Kakao;
    if (!kakao?.isInitialized()) {
      kakao?.init(`${process.env.KAKAO_JAVASCRIPT_KEY}`);
    }
    return kakao;
  };

  // 리다이렉트 후 토큰 값 얻기
  const getToken = async () => {
    // calllback으로 받은 인가코드
    const code = new URL(window.location.href).searchParams.get("code");
    const init = await kakaoinit();
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      client_secret: CLIENT_SECRET,
    });
    // access token 가져오기
    try {
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload
      );
      // Kakao Javascript SDK 초기화
      init.isInitialized(REST_API_KEY);
      // access token 설정
      init.Auth.setAccessToken(res.data.access_token);
    } catch (err) {
      console.log("getToken ==>", err);
    }
  };

  // 얻은 토큰 값으로 프로필 정보 얻기
  const getProfileInfo = async () => {
    const init = await kakaoinit();

    // Kakao SDK API를 이용해 사용자 정보 획득
    try {
      let data = await init.API.request({
        url: "/v2/user/me",
      });
      // console.log("프로필 데이터");
      // console.log(data);
      setData(data);
    } catch (err) {
      console.log("getProfileInfo err ==>", err);
    }
  };
  // 카카오 로그아웃
  const KakaoLogout = async () => {
    const init = await kakaoinit();
    // 카카오 접근 토큰 확인 (로그인 후 해당 토큰을 이용하여 추가 기능 수행 가능)
    // console.log(init.Auth.getAccessToken());
    // 카카오 로그인 링크 해제
    init.API.request({
      url: "/v1/user/unlink",
      success: (res: any) => {
        // 로그인 성공할 경우 정보 확인 후 / 페이지로 push
        setData(undefined);
      },
      fail: (error: any) => {
        console.log(error);
      },
    });
  };

  // 토큰과 유저 프로필 정보를 한번에 실행시켜줌.
  const getUserInfo = () => {
    return getToken().then((res) => getProfileInfo());
  };

  return [data, KAKAO_AUTH_URL, getUserInfo, KakaoLogout];
}
