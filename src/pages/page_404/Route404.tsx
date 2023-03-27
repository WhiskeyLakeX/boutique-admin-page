import React, { useEffect, useState } from "react";
import img_404 from "../../assets/404_page.png";
import "./index.scss";
import { useNavigate } from "react-router-dom";
export default function Route404(): JSX.Element {
  const [count, setCount] = useState(80);
  const navigate = useNavigate();

  useEffect(() => {
    if (count === 0) {
      navigate("/dashboard", { replace: true });
    }

    setTimeout(() => {
      if (count > 0) {
        setCount(count - 1);
      }
    }, 1000);
  }, [count, navigate]);

  return (
    <div className="page-wrapper">
      <img />
      <div className="text-container">
        <div className="notify t-lighter t-h4">This URL does not exist!</div>
        <div className="notify t-lighter t-h4">
          Back to dashboard in {count} {count > 1 ? "seconds" : "second"}
        </div>
        <div
          className="notify t-lighter t-h5"
          role="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Return Now!
        </div>
      </div>
    </div>
  );
}
