// import toast from "react-hot-toast";
// import { store } from "src/store";
// import { getReducer } from "src/store/apps/sliceActionReducer";
// import Router from "next/router";

// if you start with [1, 2, 3, 4, 5], the shuffled array might be [3, 2, 5, 1, 4] or [5, 1, 4, 3, 2], depending on the random indices generated during the shuffle process.
export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// // testOne  == Test One
export const capitalizeCamelSpace = (name: string) => {
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1);

  return capitalized.replace(/([A-Z])/g, ' $1').trim();
};

export const currencyFormatter = (
  value: number,
  currency: 'PKR' | 'SAR' | 'EUR' | 'JPY' | 'USD' | 'INR' | null = null,
  format: 'en-PK' | 'en-US' | 'de-DE' | 'ja-JP' | 'en-IN' = 'en-US'
): string => {
  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: 0,
  };

  if (currency) {
    options.style = 'currency';
    options.currency = currency;
  }

  const numberFormatter = new Intl.NumberFormat(format, options);

  // We format the absolute value of the provided number to handle both positive and negative values.
  let formattedValue = numberFormatter.format(Math.abs(value));

  // If the value is negative, adjust the formatting
  if (value < 0) {
    if (currency) {
      formattedValue = formattedValue.replace(/^(\D+)/, '$1-');
    } else {
      formattedValue = `-${formattedValue}`;
    }
  }

  return formattedValue;
};

// this is test....
export const titleSubstring = (
  title: string,
  length: number = 35,
  max: number = 25
) => {
  if (title.length > length) {
    return title.substring(0, max) + '...';
  }
  return title;
};

export function seoTitle(title: string): string {
  return title
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim() // Trim whitespace
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
}

// const handleTokenLogout = () => {
//   let setToken = getReducer("token");
//   store?.dispatch(setToken(null));
//   store?.dispatch(loginUser(null));
//   Router.push("/login");
// };

// export const axiosErrorMessage = (err) => {
//   console.log(err);
//   if (
//     err?.response?.status === 403 ||
//     err?.response?.data?.message === "jwt expired"
//   ) {
//     handleTokenLogout();
//   }

//   return err.response && err.response.data && err.response.data.message
//     ? err.response.data.message
//     : err.message
//     ? err.message
//     : "An unexpected error occurred";
// };
// export const axiosSuccessToast = (data) => {
//   if (data && data.message) {
//     toast.success(data.message, { duration: 2000 });
//   }
// };

// export const axiosErrorToast = (data) => {
//   console.log("===dta", data);
//   if ((data && data.message) || data) {
//     const text = data.message ? data.message : data;
//     toast.error(text, { duration: 2000 });
//   }
// };

// // check all name same
// export const isAllSameinArray = (dataArray, name) => {
//   if (dataArray.length === 0) return false; // or true, based on how you want to treat an empty array
//   const firstElementName = dataArray[0][name];

//   return dataArray.every((item) => item[name] === firstElementName);
// };

// // export const capitalizeValue = value => <div style={{ textTransform: 'capitalize' }}>{value}</div>
// export const capitalizeValue = (str) => {
//   if (typeof str !== "string" || !str) return str;

//   return str
//     .split(" ")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//     .join(" ");
// };

// //relace dash (-) with space and ever next word is capital,
// export function capitalizeSplitDash(str) {
//   return str
//     ? str.replace(/-/g, " ").replace(/\b\w/g, (match) => match.toUpperCase())
//     : "";
// }

// // remove undefined
// export const removeUndefined = (data) => {
//   for (let key in data) {
//     if (
//       data[key] === undefined ||
//       data[key] === null ||
//       data[key] === "" ||
//       data[key] === "null" ||
//       data[key] === "undefined"
//     ) {
//       delete data[key];
//     }
//   }
// };

// // conver to number format
// // const numberProperties = [
// //   'ticketCost',
// //   'sellingCost',
// // ]
// // handleNumberValues(data, numberProperties);
// export const handleNumberValues = (fields, properties) => {
//   properties.forEach((property) => {
//     if (fields[property]) {
//       fields[property] = Number(fields[property]);
//     }
//   });
// };

// // "item.product._id"
export const getNestedProperty = (
  obj: Record<string, any>,
  propertyKey: string
) => {
  return propertyKey.split('.').reduce((acc, part) => acc && acc[part], obj);
};
