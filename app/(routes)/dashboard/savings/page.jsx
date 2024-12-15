import React from "react";
import SavingsList from "./_components/SavingsList";

function Savings() {
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">My Savings Streams</h2>
      <SavingsList />
    </div>
  );
}

export default Savings;
