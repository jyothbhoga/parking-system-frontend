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

export const deleteCookie = (cookieName) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  window.location.reload();
};

export const dataURLToBlob = (dataURL) => {
  const [header, data] = dataURL.split(",");
  const mimeString = header.split(":")[1].split(";")[0];
  const byteString = atob(data);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  return new Blob([arrayBuffer], { type: mimeString });
};

export const downloadBlob = async (fetchUrl, filename) => {
  try {
    const response = await fetch(fetchUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(blobUrl);
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

// Convert Blob to File
export const blobToFile = (blob, filename) => {
  return new File([blob], filename, { type: blob.type });
};

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const requirements = [
    /[A-Z]/, // At least one uppercase letter
    /[a-z]/, // At least one lowercase letter
    /\d/, // At least one digit
    /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/, // At least one special character
  ];

  return requirements.every((rule) => rule.test(password));
};

export const isEqualObjects = (obj1, obj2) => {
  const entries1 = Object.entries(obj1);
  const entries2 = Object.entries(obj2);

  if (entries1.length !== entries2.length) {
    return false;
  }

  return entries1.every(
    ([key, value]) => obj2.hasOwnProperty(key) && obj2[key] === value
  );
};

export const getFormattedDate = (timestamp, formatType) => {
  const date = new Date(timestamp);

  switch (formatType) {
    case "DD:MM":
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
      });

    case "DD:MM:YYYY HH:MM:SS":
      return (
        date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }) +
        " " +
        date.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );

    case "YYYY-MM-DD":
      return date.toISOString().split("T")[0];

    case "MM/DD/YYYY":
      return date.toLocaleDateString("en-US");

    case "HH:MM AM/PM":
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

    case "FULL_DATE_TIME":
      return date.toLocaleString();

    default:
      return "Invalid format type";
  }
};
