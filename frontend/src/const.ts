// ❌ COMENTE ESTAS LINHA
// export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// ✅ MANTENHA APENAS ESTAS
export const APP_TITLE = "Santuário Nossa Senhora de Fátima";
export const APP_LOGO = "/nossa-senhora-fatima.png";

// ✅ COMENTE A FUNÇÃO COMPLEXA
/*
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};
*/