export const setCookie = (name, value, options = {}) => {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )};`;

  if (options.expires) {
    const expires = new Date(options.expires).toUTCString();
    cookieString += `expires=${expires};`;
  }

  if (options.path) {
    cookieString += `path=${options.path};`;
  } else {
    cookieString += `path=/;`; // default path
  }

  if (options.domain) {
    cookieString += `domain=${options.domain};`;
  }

  if (options.secure) {
    cookieString += `secure;`;
  }

  if (options.sameSite) {
    cookieString += `SameSite=${options.sameSite};`;
  }

  document.cookie = cookieString;
};

// Get a cookie by name
export const getCookie = (name) => {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split("; ");

  for (let cookie of cookieArray) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null; // if cookie not found
};
