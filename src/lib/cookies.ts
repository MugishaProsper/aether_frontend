// Cookie utility functions
type CookieOptions = {
  path?: string;
  expires?: Date | string | number;
  'max-age'?: number;
  domain?: string;
  secure?: boolean;
  samesite?: 'lax' | 'strict' | 'none';
  httpOnly?: boolean;
};

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  // Set default path if not provided
  if (!options.path) {
    options.path = '/';
  }

  // Add options to cookie string
  if (options.expires instanceof Date) {
    cookieString += `; expires=${options.expires.toUTCString()}`;
  }
  
  if (options['max-age']) {
    cookieString += `; max-age=${options['max-age']}`;
  }
  
  if (options.domain) {
    cookieString += `; domain=${options.domain}`;
  }
  
  if (options.path) {
    cookieString += `; path=${options.path}`;
  }
  
  if (options.secure) {
    cookieString += '; secure';
  }
  
  if (options.samesite) {
    cookieString += `; samesite=${options.samesite}`;
  }

  // Note: httpOnly flag cannot be set from client-side JavaScript
  document.cookie = cookieString;
}

export function getCookie(name: string): string | null {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

export function deleteCookie(name: string, path = '/', domain?: string): void {
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${
    domain ? `; domain=${domain}` : ''
  }${path ? `; path=${path}` : ''}`;
}

export function getAllCookies(): Record<string, string> {
  const cookies: Record<string, string> = {};
  document.cookie.split(';').forEach(cookie => {
    const [name, value] = cookie.split('=').map(c => c.trim());
    if (name) {
      cookies[decodeURIComponent(name)] = decodeURIComponent(value);
    }
  });
  return cookies;
}
