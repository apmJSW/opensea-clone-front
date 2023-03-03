import { getContract, getNfts, getOneNft, getNftTransferHistory } from "../api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function useNftContract(contractAddress: any) {
  return useQuery(
    ["nft", "contract", contractAddress],
    async () => {
      if (!contractAddress) {
        return {};
      }

      const result = await getContract(contractAddress);

      return result.data;
    },
    { retry: false }
  );
}

export function useNfts(contractAddress: any) {
  return useInfiniteQuery(
    ["nft", "contract", contractAddress, "tokens"],
    async ({ pageParam }) => {
      const result = await getNfts(contractAddress, pageParam);

      return result.data;
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextToken;
      },
    }
  );
}

export function useOneNft(contractAddress: any, tokenId: any) {
  return useQuery(
    ["nft", "contract", contractAddress, "tokens", tokenId],
    async () => {
      const result = await getOneNft(contractAddress, tokenId);

      return result.data;
    },
    { retry: false }
  );
}

export function useNftTransferHistory(contractAddress: any, tokenId: any) {
  return useQuery(
    ["nft", "contract", contractAddress, "tokens", tokenId, "history"],
    async () => {
      const result = await getNftTransferHistory(contractAddress, tokenId);

      return result.data;
    },
    { retry: false }
  );
}
