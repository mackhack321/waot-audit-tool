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

    const coeff = getCoeff(otHours + otMinutes / 60);
    console.log(coeff * bonus);
    const result = (coeff * bonus).toFixed(2);

    setItems((current) => [
      ...current,
      {
        hours: otHours,
        minutes: otMinutes,
        bonus: bonus,
        coeff: coeff,
        result: result,
      },
    ]);
    setTotalBackwage(totalBackwage + parseFloat(result));

    document.getElementById("form").reset();
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
          <label htmlFor="otHours">OT Hours</label>
          <input
            type="number"
            name="otHours"
            id="otHours"
            min={0}
            max={45}
            onChange={(e) => setOtHours(parseInt(e.target.value))}
            placeholder="13"
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
            onChange={(e) => setOtMinutes(parseInt(e.target.value))}
            placeholder="27"
            className="border-2 rounded-md px-2 w-32"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="bonus">Bonus</label>
          <input
            type="number"
            name="bonus"
            id="bonus"
            placeholder="200"
            step={0.01}
            onChange={(e) => setBonus(parseFloat(e.target.value))}
            className="border-2 rounded-md px-2 w-32"
          />
        </div>
        <button className="bg-sky-400 px-5 py-1 rounded-md h-fit">Add</button>
      </form>

      <table className="bg-sky-400 mb-5 rounded-md">
        <thead>
          <tr>
            <th className="py-3 px-6">Hours</th>
            <th className="py-3 px-6">Minutes</th>
            <th className="py-3 px-6">Bonus</th>
            <th className="py-3 px-6">Coefficient</th>
            <th className="py-3 px-6">Backwage</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => {
            return (
              <tr key={i} className="text-center">
                <td className="pb-3">{item.hours}</td>
                <td className="pb-3">{item.minutes}</td>
                <td className="pb-3">${item.bonus.toFixed(2)}</td>
                <td className="pb-3">{item.coeff}</td>
                <td className="pb-3">${item.result}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="font-bold text-xl">
        Total backwages: ${totalBackwage.toFixed(2)}
      </p>
    </div>
  );
}

export default App;
