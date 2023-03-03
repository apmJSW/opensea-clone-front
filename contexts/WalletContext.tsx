import { createContext, PropsWithChildren, useState, useCallback } from "react";
import Web3 from "web3";
import Axios from "axios";

declare const window: any;

interface IWalletContext {
  web3: Web3 | null;
  account: string;
  login: () => void;
}

export const WalletContext = createContext<IWalletContext>({
  web3: null,
  account: "",
  login: () => {},
});

const axios = Axios.create({
  baseURL: "http://localhost:3000",
});

export const WalletContextProvider = ({ children }: PropsWithChildren) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const login = useCallback(async () => {
    if (typeof window.ethereum === "undefined") {
      return console.log("metamask not installed");
    }

    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const web3 = new Web3(window.ethereum);
    setWeb3(web3);

    const authRequest = await axios.get(`/auth/${account.replace("0x", "")}`);

    const signature = await web3.eth.personal.sign(
      authRequest.data.message,
      account,
      ""
    );

    const authResult = await axios.post("/auth/verify", {
      id: authRequest.data.id,
      signature,
    });

    setAccessToken(authResult.data.accessToken);
  }, []);

  return (
    <WalletContext.Provider value={{ web3, account, login }}>
      {children}
    </WalletContext.Provider>
  );
};
