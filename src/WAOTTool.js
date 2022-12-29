import React, { useState } from "react";
import { Link } from "react-router-dom";
import { coefficients } from "./coefficients";

function WAOTTool() {
  const [otHours, setOtHours] = useState("");
  const [otMinutes, setOtMinutes] = useState("");
  const [bonus, setBonus] = useState("");
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

    setOtHours("");
    setOtMinutes("");
    setBonus("");
  }

  return (
    <div className="grid place-items-center">
      <h1 className="text-center font-bold text-3xl mt-5 mb-1">
        WAOT Audit Tool
      </h1>
      <Link
        to="othelper"
        className="flex flex-row space-x-2 mb-5"
        target="_blank"
        rel="noreferrer"
      >
        <span>OT Helper</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          />
        </svg>
      </Link>
      <form
        onSubmit={getResult}
        className="flex space-x-5 mb-10 items-center"
        id="form"
      >
        <div className="flex flex-col space-y-1">
          <label htmlFor="bonus">Bonus</label>
          <input
            type="text"
            name="bonus"
            id="bonus"
            autoComplete="off"
            value={bonus}
            onChange={(e) => setBonus(e.target.value)}
            className="border-2 rounded-md px-2 w-32"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="otHours">OT Hours</label>
          <input
            type="text"
            name="otHours"
            id="otHours"
            autoComplete="off"
            value={otHours}
            onChange={(e) => setOtHours(e.target.value)}
            className="border-2 rounded-md px-2 w-32"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="otMinutes">OT Minutes</label>
          <input
            type="text"
            name="otMinutes"
            id="otMinutes"
            autoComplete="off"
            value={otMinutes}
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
          {items
            .slice(0)
            .reverse()
            .map((item, i) => {
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

export default WAOTTool;
