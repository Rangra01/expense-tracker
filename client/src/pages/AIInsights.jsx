import { useEffect, useState } from "react";
import API from "../api/api";
import MainLayout from "../layouts/MainLayout";

const AIInsights = () => {
  const [insight,setInsight]=useState("");

  useEffect(()=>{
    API.get("/ai/insights").then(res=>setInsight(res.data.insight));
  },[]);

  return (
    <MainLayout>
      <h1 className="text-2xl mb-6">AI Insights</h1>

      <div className="glass p-4 rounded-xl">
        {insight}
      </div>
    </MainLayout>
  );
};

export default AIInsights;