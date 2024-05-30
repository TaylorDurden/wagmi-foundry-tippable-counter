'use client';

import { useAccount, useConnect, useDisconnect, useChains } from 'wagmi';
import { ReadCounterValue, SendIncrementTx, IndexedEvents } from '@/components';

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const chains = useChains();

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>{account.address}</div>

        <h2>Network</h2>

        <div>{chains[0].name}</div>

        {account.status === 'connected' && (
          <button type='button' onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type='button'
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
      <ReadCounterValue />
      <SendIncrementTx />
      <IndexedEvents />
    </>
  );
}

export default App;
