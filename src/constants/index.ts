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
export const productsUnits = [
  {
    value: "KG",
    label: "KG",
  },
  {
    value: "DOZEN",
    label: "DOZEN",
  },
  {
    value: "CARTON",
    label: "CARTON",
  },
];
export const SaleStatus = [
  {
    value: "PENDING",
    label: "PENDING",
  },
  {
    value: "COMPLETED",
    label: "COMPLETED",
  },
  {
    value: "CANCELLED",
    label: "CANCELLED",
  },
];
export const PaymentMethod = [
  {
    value: "CASH",
    label: "CASH",
  },
  {
    value: "BANK",
    label: "BANK",
  },
  {
    value: "CREDIT",
    label: "CREDIT",
  },
  {
    value: "DEBIT",
    label: "DEBIT",
  },
  {
    value: "CHECK",
    label: "CHECK",
  },
  {
    value: "MOBILE",
    label: "MOBILE",
  },
  {
    value: "OTHER",
    label: "OTHER",
  },
];
export const ShippingStatus = [
  {
    value: "PENDING",
    label: "PENDING",
  },
  {
    value: "SHIPPED",
    label: "SHIPPED",
  },
  {
    value: "DELIVERED",
    label: "DELIVERED",
  },
  {
    value: "RETURNED",
    label: "RETURNED",
  },
  {
    value: "CANCELLED",
    label: "CANCELLED",
  },
  {
    value: "OTHER",
    label: "OTHER",
  },
];
export const PaymentStatus = [
  {
    value: "PENDING",
    label: "PENDING",
  },
  {
    value: "PAID",
    label: "PAID",
  },
  {
    value: "PARTIALLY_PAID",
    label: "PARTIALLY_PAID",
  },
  {
    value: "CANCELLED",
    label: "CANCELLED",
  },
  {
    value: "OTHER",
    label: "OTHER",
  },
];
