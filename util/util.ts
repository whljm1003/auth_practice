import axios from "axios";
import qs from "qs";

const kakaoAuth = {
  // 리다이렉트 카카오 로그인을 위한 함수
  init: () => {
    console.log("init 실행");
    const kakao = (global as any).Kakao;
    if (kakao) {
      if (!kakao.isInitialized()) {
        kakao.init(`${process.env.KAKAO_JAVASCRIPT_KEY}`);
      }
    }

    return kakao;
  },
  getToken: async () => {
    console.log("getToken 실행");
    const REST_API_KEY = process.env.KAKAO_REST_API;
    const REDIRECT_URI = process.env.KAKAO_REDIRECT_URL;
    const CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;

    // calllback으로 받은 인가코드
    const code = new URL(window.location.href).searchParams.get("code");
    const init = kakaoAuth.init();
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      client_secret: CLIENT_SECRET,
    });
    try {
      // access token 가져오기
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload
      );
      // Kakao Javascript SDK 초기화
      init.isInitialized(REST_API_KEY);
      // access token 설정
      init.Auth.setAccessToken(res.data.access_token);
      return kakaoAuth.getProfileInfo();
    } catch (err) {
      console.log("getToken ==>", err);
    }
  },
  getProfileInfo: async () => {
    console.log("getProfileInfo 실행");
    const init = await kakaoAuth.init();
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await init.API.request({
        url: "/v2/user/me",
      });
      console.log("프로필 데이터");
      console.log(data);
      return data;
    } catch (err) {
      console.log("getProfileInfo err ==>", err);
    }
  },
};

export default kakaoAuth;
