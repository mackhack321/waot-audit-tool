import React, { useState } from "react";
import { coefficients } from "./coefficients";

function App() {
  const [otHours, setOtHours] = useState(0);
  const [otMinutes, setOtMinutes] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [items, setItems] = useState([]);
  const [totalBackwage, setTotalBackwage] = useState(0);

  function getCoeff(hours) {
    for (var i = 0; i < coefficients.length; i++) {
      if (hours >= parseFloat(Object.keys(coefficients[i + 1])[0])) {
        continue;
      }
      return parseFloat(Object.values(coefficients[i])[0]);
    }
  }

  function getResult(e) {
    e.preventDefault();

    const coeff = getCoeff(parseInt(otHours) + parseInt(otMinutes) / 60);
    const result = (coeff * parseFloat(bonus)).toFixed(2);

    setItems((current) => [
      ...current,
      {
        hours: parseInt(otHours),
        minutes: parseInt(otMinutes),
        bonus: parseFloat(bonus),
        coeff: coeff,
        result: result,
      },
    ]);
    setTotalBackwage(totalBackwage + parseFloat(result));

    document.getElementById("form").reset();

    setOtHours(0);
    setOtMinutes(0);
    setBonus(0);
  }

  return (
    <div className="grid place-items-center">
      <h1 className="text-center font-bold text-3xl my-5">WAOT Audit Tool</h1>
      <form
        onSubmit={getResult}
        className="flex space-x-5 mb-10 items-center"
        id="form"
      >
        <div className="flex flex-col space-y-1">
          <label htmlFor="bonus">Bonus</label>
          <input
            type="number"
            name="bonus"
            id="bonus"
            step={0.01}
            onChange={(e) => setBonus(e.target.value)}
            className="border-2 rounded-md px-2 w-32"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="otHours">OT Hours</label>
          <input
            type="number"
            name="otHours"
            id="otHours"
            min={0}
            max={45}
            onChange={(e) => setOtHours(e.target.value)}
            className="border-2 rounded-md px-2 w-32"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="otMinutes">OT Minutes</label>
          <input
            type="number"
            name="otMinutes"
            id="otMinutes"
            min={0}
            max={59}
            onChange={(e) => setOtMinutes(e.target.value)}
            className="border-2 rounded-md px-2 w-32"
          />
        </div>
        <button className="bg-sky-400 px-5 py-1 rounded-md h-fit">Add</button>
      </form>

      <table className="bg-sky-400 mb-5 rounded-md border border-separate">
        <thead>
          <tr>
            <th className="py-3 px-6">Bonus</th>
            <th className="py-3 px-6">OT Hours</th>
            <th className="py-3 px-6">OT Minutes</th>
            <th className="py-3 px-6">OT Minutes (decimal)</th>
            <th className="py-3 px-6">Coefficient</th>
            <th className="py-3 px-6">Backwage</th>
          </tr>
        </thead>
        <tbody className="bg-white border-sky-400">
          {items.map((item, i) => {
            return (
              <tr key={i} className="text-center">
                <td className="py-2">${item.bonus.toFixed(2)}</td>
                <td className="py-2">{item.hours}</td>
                <td className="py-2">{item.minutes}</td>
                <td className="py-2">{(item.minutes / 60).toFixed(2)}</td>
                <td className="py-2">{item.coeff}</td>
                <td className="py-2">${item.result}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="font-bold text-xl mb-5">
        Total backwages: ${totalBackwage.toFixed(2)}
      </p>

      <button
        className="bg-sky-400 px-5 py-1 rounded-md h-fit"
        onClick={() => {
          setItems([]);
          setTotalBackwage(0);
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default App;
