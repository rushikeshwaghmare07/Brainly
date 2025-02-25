export const random = (len: number): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charsLength = chars.length;
  let ans = "";

  for (let i = 0; i < len; i++) {
    ans += chars[Math.floor(Math.random() * charsLength)];
  }

  return ans;
};
