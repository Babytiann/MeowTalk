import { v4 as uuidv4 } from 'uuid';

// 用户认证信息接口
interface AuthInfo {
  userName: string;
  remember: boolean;
  token?: string;
}

// 保存用户登录信息
export function saveAuthInfo(authInfo: AuthInfo): void {
  const { userName, remember, token } = authInfo;
  
  if (remember) {
    // 记住登录：保存30天
    const expires = new Date();
    expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000));
    document.cookie = `auth_userName=${encodeURIComponent(userName)}; expires=${expires.toUTCString()}; path=/`;
    if (token) {
      document.cookie = `auth_token=${encodeURIComponent(token)}; expires=${expires.toUTCString()}; path=/`;
    }
  } else {
    // 不记住登录：会话结束即清除
    document.cookie = `auth_userName=${encodeURIComponent(userName)}; path=/`;
    if (token) {
      document.cookie = `auth_token=${encodeURIComponent(token)}; path=/`;
    }
  }
}

// 获取保存的认证信息
export function getAuthInfo(): AuthInfo | null {
  const cookies = document.cookie.split(';');
  const authInfo: Partial<AuthInfo> = {};
  
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'auth_userName') {
      authInfo.userName = decodeURIComponent(value);
    } else if (name === 'auth_token') {
      authInfo.token = decodeURIComponent(value);
    }
  }
  
  return authInfo.userName ? authInfo as AuthInfo : null;
}

// 清除认证信息
export function clearAuthInfo(): void {
  document.cookie = 'auth_userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
  document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
}

// 检查是否已登录
export function isLoggedIn(): boolean {
  return getAuthInfo() !== null;
}

// 原有的UUID功能
export function createUuid(days: number = 7) {
  const date = new Date();
  const uuid = uuidv4();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = `uuid=${encodeURIComponent(uuid)}; ${expires}; path=/`;
}

export function getUUID() {
  const cookieList = document.cookie.split(";");
  for (const cookie of cookieList) {
    const trimmedCookie = cookie.trim();
    if (trimmedCookie.startsWith('uuid=')) {
      return decodeURIComponent(trimmedCookie.substring(5));
    }
  }
  return null;
} 