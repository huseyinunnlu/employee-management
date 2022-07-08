import { mask } from "maska";

const DEFAULT_MASK_PATTENRNS = {
  phone: "+90 (###) ### ## ##",
  iban: "TR## #### #### #### #### #### ##",
};

const formatString = (string, maskPattern = "phone") => {
  let pattern = maskPattern;

  if (DEFAULT_MASK_PATTENRNS[maskPattern]) {
    pattern = DEFAULT_MASK_PATTENRNS[maskPattern];
  }

  if (!string) {
    return null;
  }

  return mask(string, pattern);
};

const formatCurrency = (value = 0, locale = "tr-TR", currency = "TRY") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

export { formatString, formatCurrency };
