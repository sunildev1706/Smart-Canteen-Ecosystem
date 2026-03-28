import React, { useState } from "react";

function CounterManagement() {
  const [counterNo, setCounterNo] = useState("");
  const [pin, setPin] = useState("");
  const [counters, setCounters] = useState([]);

  // ➕ Add Counter
  const addCounter = () => {
    if (!counterNo || !pin) return alert("Fill all fields");

    const newCounter = {
      id: Date.now(),
      counterNo,
      pin
    };

    setCounters([...counters, newCounter]);
    setCounterNo("");
    setPin("");
  };

  // ❌ Delete Counter
  const deleteCounter = (id) => {
    setCounters(counters.filter((c) => c.id !== id));
  };

  return (
    <div>

      <h1 className="text-2xl font-bold text-violet-600 mb-6">
        Counter Management
      </h1>

      {/* ➕ Add Counter */}
      <div className="bg-white p-6 rounded-xl shadow mb-8 flex gap-4">

        <input
          placeholder="Counter Number"
          className="border p-2 rounded w-full"
          value={counterNo}
          onChange={(e) => setCounterNo(e.target.value)}
        />

        <input
          placeholder="PIN"
          type="password"
          className="border p-2 rounded w-full"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />

        <button
          onClick={addCounter}
          className="bg-violet-500 text-white px-4 rounded hover:bg-violet-600"
        >
          Add
        </button>

      </div>

      {/* 📋 Counter List */}
      <div className="grid md:grid-cols-3 gap-6">

        {counters.map((c) => (
          <div key={c.id} className="bg-white p-4 rounded-xl shadow">

            <h2 className="font-semibold text-lg">
              Counter {c.counterNo}
            </h2>

            <p className="text-gray-500">PIN: ****</p>

            <button
              onClick={() => deleteCounter(c.id)}
              className="mt-3 w-full bg-red-500 text-white py-1 rounded"
            >
              Remove
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default CounterManagement;