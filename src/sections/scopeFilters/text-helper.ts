export const processSubtitle = (subtitle: string[], separatorText?: string) => {
  let text = "";
  if (!subtitle && (subtitle as string[]).length === 0) {
    return "";
  }
  for (const item of subtitle) {
    text = text + item;
    if (subtitle.indexOf(item) < subtitle.length - 1) {
      text = separatorText ? text + separatorText : text + ", ";
    }
  }

  return text;
};

export const processSubtitleMulti = (
  subtitle: string[][],
  separatorText?: string
) => {
  const textElements: string[] = [];
  if (!subtitle && (subtitle as string[][]).length === 0) {
    return textElements;
  }
  for (const item of subtitle) {
    const formattedSubtitle = processSubtitle(item, separatorText);
    if (formattedSubtitle !== "") textElements.push(formattedSubtitle);
  }
  return textElements;
};

export const titleCase = (str: string) => {
  return (
    str &&
    str
      .trim()
      .toLowerCase()
      .split(" ")
      .map(function(word) {
        return word && word.replace(word[0], word[0].toUpperCase());
      })
      .join(" ")
  );
};

export const getFormatedSearchText = (str: string) => {
  return str == "*" ? str : str.replace(/-/g, "+") + "*";
};

export const getFormatedReviewSearchText = (str: string) => {
  if (str && str.indexOf(" ") > 0) return '"' + str + '"';

  const emailRegexp = /^((("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))@((?:(?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?))$|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?)$)/;
  if (str && emailRegexp.test(str)) return str.replace("@", "%40");

  return str ? str.replace("-", " +") + "*" : "";
};

export const sanitizeString = (str: string) => {
  // Replace all characters that are not alphanumeric, accented characters, spaces, underscores, hyphens, periods, or commas
  // Also remove tab, newline, form feed, carriage return, vertical tab, and null characters
  str = str.replace(/[\/\\?,._\|\(\)]/g, "");
  // Trim leading and trailing whitespace
  return str.trim();
};

export const makeFirstLetterLowercase = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toLowerCase() + str.slice(1);
};
