'use client';

import { useState } from 'react';
import { parseAbi } from 'viem';
import { useWriteContract } from 'wagmi';

export default function SendIncrementTx() {
  const [incrementAmt, setIncrementAmt] = useState(1);
  const { writeContract } = useWriteContract();

  return (
    <div>
      <p>-----------------------------------------------------------</p>
      <input
        type='number'
        min={1}
        max={10}
        step={1}
        onChange={(e) => setIncrementAmt(Number(e.target.value))}
        value={incrementAmt}
      />
      <button
        onClick={() => {
          writeContract({
            address: '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
            abi: parseAbi([
              'function increment(uint8 incrementBy) external payable',
            ]),
            functionName: 'increment',
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
