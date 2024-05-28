import { getDefaultConfig } from "connectkit";
import { foundry } from "wagmi/chains";
import { WagmiProvider, useChains, createConfig } from "wagmi";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

const walletConnectProjectId = "";
export const config = createConfig(
  getDefaultConfig({
    appName: "My wagmi + ConnectKit App",
    chains: [foundry],
    walletConnectProjectId,
  })
);

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
