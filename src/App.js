import React, { useEffect } from "react";
import { StatsigSynchronousProvider, useGate } from "statsig-react";

function Gate() {
  const { value } = useGate("test_public");
  return <div>Gate: {value ? "Pass" : "Fail"}</div>;
}

function App({ bootstrap }) {
  return (
    <StatsigSynchronousProvider
      sdkKey="client-wlH3WMkysINMhMU8VrNBkbjrEr2JQrqgxKwDPOUosJK"
      initializeValues={bootstrap}
    >
      <input type="hidden" id="bootstrap" value={JSON.stringify(bootstrap)} />
      <Gate />
    </StatsigSynchronousProvider>
  );
}

export default App;
