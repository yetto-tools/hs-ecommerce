export function CurrencyFormatter(Amount, i18n, currency){
  return new Intl.NumberFormat(i18n.language, {
    style: "currency", 
    currency: currency.currencyName,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
    }).format(Amount)
}