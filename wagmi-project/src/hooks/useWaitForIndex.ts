import { request } from 'graphql-request';
import { useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

export default function useWaitForIndex({
  hash,
  onIndexed,
}: {
  hash: `0x${string}` | undefined;
  onIndexed: Function;
}) {
  const [indexed, setIndexed] = useState(false);
  useEffect(() => {
    const id = setInterval(async () => {
      if (!hash || indexed) return;
      const res = await request(
        'http://127.0.0.1:42069',
        `query{
          events(where: {transactionHash: "${hash}"}) {
            items {
              ethSent
              id
              incrementedBy
              sender
              transactionHash
              counterValue
            }
          }
        }`
      );
      if ((res as any).events.length > 0) {
        setIndexed(true);
        onIndexed(res);
        clearInterval(id);
      }
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [hash]);

  useEffect(() => {
    setIndexed(false);
  }, [hash]);
}
