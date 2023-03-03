import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:3000",
});

export function getContract(contractAddress: string) {
  return axios.get(`/nft/contract/${contractAddress}`);
}

export function getNfts(contractAddress: string, startToken?: string) {
  return axios.get(`/nft/contract/${contractAddress}/tokens`, {
    params: {
      startToken,
    },
  });
}

export function getOneNft(contractAddress: string, tokenId: string) {
  return axios.get(`/nft/contract/${contractAddress}/tokens/${tokenId}`);
}

export function getNftTransferHistory(
  contractAddress: string,
  tokenId: string
) {
  return axios.get(
    `/nft/contract/${contractAddress}/tokens/${tokenId}/history`
  );
}
