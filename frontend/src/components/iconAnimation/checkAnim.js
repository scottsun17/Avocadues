import React from "react";
import mojs from "@mojs/core";

import { Checkbox } from "@material-ui/core";

const burst = new mojs.Burst({
  left: 0,
  top: 0,
  radius: { 0: 50 },
  count: 8,
  children: {
    shape: "circle",
    radius: 20,
    fill: ["#91D2D5", "#BEE1BE", "#EDF1A4"],
    strokeWidth: 5,
    duration: 2000,
  },
});

export default function CheckAnim() {
  const play = (e) => {
    burst.tune({ x: e.pageX, y: e.pageY }).setSpeed(5).replay();
  };

  return (
    <div>
      <Checkbox onClick={play} color="primary" />
    </div>
  );
}
