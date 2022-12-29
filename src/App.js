import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import OTHelper from "./OTHelper";
import WAOTTool from "./WAOTTool";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<WAOTTool />} />
          <Route path="othelper" element={<OTHelper />} />
        </Routes>
      </Router>
    </div>
  );
}
