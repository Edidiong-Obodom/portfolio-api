import { words, capitalize } from "lodash";
import * as Helper from "./index";

/**
 * Converts a string to a title case, capitalizing the first letter of each word.
 *
 * @param params The input string to be converted to title case.
 * @returns The input string converted to title case, or null if the input string is null or empty.
 */
export const startWithCase = (params: string | null): string | null => {
  if (params === null || params.length === 0) {
    return null;
  } else {
    const returner = (whatName: string, index: number): string => {
      if (index === 0) {
        return capitalize(whatName);
      } else {
        return " " + capitalize(whatName);
      }
    };

    const nameHandler = (n: string): string => {
      let handleName = "";
      if (n.length === 0) {
        return "";
      } else {
        const name = words(n, /[^, ]+/g);
        name.map((user, i) => {
          return (handleName = handleName + returner(user, i));
        });
        return handleName;
      }
    };

    return nameHandler(params);
  }
};

/**
 * Generates an error message for pricing validation.
 *
 * @param message Initial message gotten from validation helper.
 * @param i Which pricing object in the pricing array failed validation.
 * @returns The final error message.
 */
export const pricingErrorMessage = (message: string, i: number): string => {
  return `${message} ${i <= 2 ? "In the" : "On pricing number"} ${
    i <= 2
      ? `${i === 0 ? "1st pricing" : i === 1 ? "2nd pricing" : "3rd pricing"}`
      : Number(i + 1)
  }.`;
};

/**
 * Checks if the provided date is valid, for February.
 * @param {string} date - The date string to be checked.
 * @returns {boolean} Returns true if the date is valid, otherwise false.
 *
 * This function validates the date against the allowed date format and ensures
 * that for February, the day part does not exceed 29.
 */
export const februaryCheck = (date: string): boolean => {
  if (!Helper.allowedDateFormat.test(date)) {
    return false;
  }

  if (date.slice(5, 7) === "02" && Number(date.slice(8, date.length)) > 29) {
    return false;
  }

  return true;
};
