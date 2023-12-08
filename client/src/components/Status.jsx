import React from "react";
import { useSelector } from "react-redux";

function Status() {
  const { message, error } = useSelector((state) => state.user);
  return (
    <div className="mt-2">
      {message && <p className="text-xl text-green-600">{message}</p>}
      {error && <p className="text-xl text-red-600">{error}</p>}
    </div>
  );
}

export default Status;
