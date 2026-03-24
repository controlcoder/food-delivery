import { useNavigate, useSearchParams } from "react-router-dom";

import "./Verify.css";
import { verifyPaymentAPI } from "../../api/orderApi";
import { useEffect } from "react";

export default function Verify() {
  const [searchParams, setSearchParams] = useSearchParams("");

  const navigate = useNavigate("");

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    const response = await verifyPaymentAPI(success, orderId);
    if (response.success) {
      navigate("/myorders");
    }
    else{
      navigate("/")
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
}
