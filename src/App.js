import React, { useState } from "react";
import Screen1 from "./components/Screen1";
import Screen2 from "./components/Screen2";

export default function App(){
  const [screen, setScreen] = useState(1);
  return (
    <>
      {screen===1 && <Screen1 onUnlock={()=>setScreen(2)} />}
      {screen===2 && <Screen2 />}
    </>
  );
}
