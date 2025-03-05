import React, { useState, useEffect } from "react";
import { fetchEffect } from "../services/api";

const EffectDetails = ({ url }) => {
    const [effect, setEffect] = useState("");
  
    useEffect(() => {
      const getEffect = async () => {
        try {
          const effectText = await fetchEffect(url);
          setEffect(effectText);
        } catch (error) {
          console.error("Failed to fetch ability effect:", error);
          setEffect("Effect not available");
        }
      };
  
      getEffect();
    }, [url]);
  
    return <div className="text-sm text-gray-400">{effect}</div>;
  };

  export default EffectDetails;
  