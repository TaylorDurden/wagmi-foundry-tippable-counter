'use client';

import { useReadContract } from 'wagmi';
import { parseAbi } from 'viem';

export function ReadCounterValue() {
  const { data } = useReadContract({
    address: '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512',
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
