import { countries } from "countries-list";
export const countriesArray = Object.entries(countries).map(([code, data]) => ({
  value: code,
  label: data.name,
}));
export const currencyArray = [
  {
    value: "USD",
    label: "USD",
  },
  {
    value: "PKR",
    label: "PKR",
  },
];
