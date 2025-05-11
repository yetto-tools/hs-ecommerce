// usePaymentData.js
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const usePaymentData = () => {
  const [searchParams] = useSearchParams();

  return useMemo(
    () => ({
      response: searchParams.get("response"),
      responsetext: searchParams.get("responsetext"),
      authcode: searchParams.get("authcode"),
      transactionid: searchParams.get("transactionid"),
      avsresponse: searchParams.get("avsresponse"),
      cvvresponse: searchParams.get("cvvresponse"),
      orderid: searchParams.get("orderid"),
      type: searchParams.get("type"),
      response_code: searchParams.get("response_code"),
      website: searchParams.get("website"),
      three_ds_version: searchParams.get("three_ds_version"),
      ipaddress: searchParams.get("ipaddress"),
      eci: searchParams.get("eci"),
      cavv: searchParams.get("cavv"),
      username: searchParams.get("username"),
      time: searchParams.get("time"),
      amount: searchParams.get("amount"),
      hash: searchParams.get("hash"),
    }),
    [searchParams]
  );
};

export default usePaymentData;
