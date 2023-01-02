import React, { useState } from "react";

export default function OTHelper() {
  const [otHours, setOtHours] = useState("");
  const [otMinutes, setOtMinutes] = useState("");
  const [rows, setRows] = useState([]);
  const [result, setResult] = useState("00:00");

  function add(e) {
    e.preventDefault();

    rows.push({ hours: otHours, minutes: otMinutes });

    let hours = 0;
    let minutes = 0;

    rows.forEach((row) => {
      minutes += parseInt(row.minutes);
      hours += parseInt(row.hours);
    });

    while (minutes >= 60) {
      hours += Math.floor(minutes / 60);
      minutes = minutes % 60;
    }

    setResult(
      `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`
    );

    document.getElementById("form").reset();

    setOtHours("");
    setOtMinutes("");
  }

  return (
    <div className="grid place-items-center">
      <h1 className="text-center font-bold text-3xl my-5">OT Helper</h1>
      <form
        onSubmit={add}
        className="flex space-x-5 mb-10 items-center"
        id="form"
      >
        <div className="flex flex-col space-y-1">
          <label htmlFor="hours">Hours</label>
          <input
            type="text"
            name="hours"
            id="hours"
            autoComplete="off"
            value={otHours}
            onChange={(e) => setOtHours(e.target.value)}
            className="border-2 rounded-md px-2 w-32"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="minutes">Minutes</label>
          <input
            type="text"
            name="minutes"
            id="minutes"
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
            <th className="py-3 px-6">Hours</th>
            <th className="py-3 px-6">Minutes</th>
          </tr>
        </thead>
        <tbody className="bg-white border-sky-400">
          {rows
            .slice(0)
            .reverse()
            .map((row, i) => {
              return (
                <tr key={i} className="text-center">
                  <td className="py-2">{row.hours}</td>
                  <td className="py-2">{row.minutes}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <p className="font-bold text-xl mb-5">Total OT: {result}</p>

      <button
        className="bg-sky-400 px-5 py-1 rounded-md h-fit"
        onClick={() => {
          setRows([]);
          setResult("00:00");
        }}
      >
        Reset
      </button>
    </div>
  );
}
