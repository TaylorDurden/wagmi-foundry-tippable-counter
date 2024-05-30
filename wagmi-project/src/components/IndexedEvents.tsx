'use client';

import { request } from 'graphql-request';
import useSWR from 'swr';
import { formatUnits } from 'viem';

const fetcher = (query: string) =>
  request(
    'http://127.0.0.1:42069',
    `query{
        events {
          items {
            id
            ethSent
            incrementedBy
            sender
            transactionHash
            counterValue
          }
        }
      }`
  );

type Event = {
  id: string;
  counterValue: string;
  ethSent: string;
  incrementedBy: string;
  sender: string;
  transactionHash: string;
};

export function IndexedEvents() {
  const { data, error }: any = useSWR('indexedEvents', fetcher);
  console.log(`data.events: ${JSON.stringify(data?.events)}`);
  return (
    <div>
      <h2>Indexed Events</h2>
      {data?.events.items &&
        data?.events?.items?.map((e: Event, idx: number) => (
          <div key={idx}>
            <p>Index: {idx}</p>
            <p>Transaction Hash: {e.transactionHash}</p>
            <p>Sender: {e.sender}</p>
            <p>Incremened By: {e.incrementedBy}</p>
            <p>Counter Value: {e.counterValue}</p>
            <p>Eth Sent: {formatUnits(BigInt(e.ethSent), 18)}</p>
          </div>
        ))}
    </div>
  );
}
