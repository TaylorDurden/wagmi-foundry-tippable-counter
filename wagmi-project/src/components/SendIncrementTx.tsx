"use client";

import { useState } from "react";
import { parseAbi } from "viem";
import { useWriteContract } from "wagmi";

export default function SendIncrementTx() {
  const [incrementAmt, setIncrementAmt] = useState(1);
  // const {config} = new UseWriteContractParameters(
  //   address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  //   abi: parseAbi(["function increment(uint8 incrementBy) external payable"]),
  //   functionName: "increment",
  // });
  const { writeContract } = useWriteContract();

  return (
    <div>
      <input
        type="number"
        min={1}
        max={10}
        step={1}
        onChange={(e) => setIncrementAmt(Number(e.target.value))}
        value={incrementAmt}
      />
      <button
        onClick={() => {
          writeContract({
            address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
            abi: parseAbi([
              "function increment(uint8 incrementBy) external payable",
            ]),
            functionName: "increment",
            args: [incrementAmt],
            value: BigInt(10000000000000000),
          });
        }}
      >
        Send
      </button>
    </div>
  );
}
