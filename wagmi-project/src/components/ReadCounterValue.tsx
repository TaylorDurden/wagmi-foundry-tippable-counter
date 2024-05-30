'use client';

import { useReadContract } from 'wagmi';
import { parseAbi } from 'viem';

export function ReadCounterValue() {
  const { data } = useReadContract({
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    abi: parseAbi(['function counter() view returns (uint256)']),
    functionName: 'counter',
  });
  console.log(`data: ${data}`);
  return (
    <div>
      <h2>Counter Value</h2>
      <p>{data?.toString()}</p>
    </div>
  );
}
