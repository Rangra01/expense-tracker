import { useEffect, useState } from "react";
import API from "../api/api";
import MainLayout from "../layouts/MainLayout";

const Transactions = () => {
  const [data,setData]=useState([]);

  useEffect(()=>{fetch();},[]);

  const fetch = async ()=>{
    const res = await API.get("/transactions");
    setData(res.data);
  };

  const del = async(id)=>{
    await API.delete(`/transactions/${id}`);
    fetch();
  };

  return (
    <MainLayout>
      <h1 className="text-2xl mb-6">Transactions</h1>

      {data.map(t=>(
        <div key={t._id} className="flex justify-between border-b py-2">
          <span>{t.category} ₹{t.amount}</span>

          <div className="flex gap-3">
            <button className="text-yellow-400">Edit</button>
            <button onClick={()=>del(t._id)} className="text-red-400">Delete</button>
          </div>
        </div>
      ))}
    </MainLayout>
  );
};

export default Transactions;