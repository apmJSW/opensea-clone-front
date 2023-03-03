import { TopHeader } from "../../../components";
import { useNftContract, useNfts } from "../../../hooks";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import Link from "next/link";

const List: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;

  const { data: contract } = useNftContract(address);
  const { data: nfts, hasNextPage, fetchNextPage } = useNfts(address);

  return (
    <div>
      <TopHeader />

      <Container>
        {contract && (
          <>
            <ContractImage src={contract.image} />
            <ContractTitle>
              {contract.name?.replace(/([A-Z])/g, " $1")}
            </ContractTitle>
            <ContractMetadata>
              Total : <b>{contract.totalSupply}</b>
            </ContractMetadata>
            <ContractDescription>{contract.description}</ContractDescription>
          </>
        )}

        <Grid container spacing={2}>
          {nfts?.pages.map((page) => {
            return page.result.map((nft: any) => (
              <Grid key={`${address}-nft-${nft.tokenId}`} item xs={3}>
                <Link href={`/list/${address}/${parseInt(nft.tokenId, 16)}`}>
                  <NftContainer>
                    <NftImage src={nft.image} />
                    <NftInfo>
                      <TokenId>#{parseInt(nft.tokenId)}</TokenId>
                      <TokenPrice>10.0ETH</TokenPrice>
                    </NftInfo>
                  </NftContainer>
                </Link>
              </Grid>
            ));
          })}
        </Grid>

        {hasNextPage && <More onClick={() => fetchNextPage()}>More</More>}
      </Container>
    </div>
  );
};

const Container = styled.div`
  padding: 24px 80px;
`;
const ContractImage = styled.img`
  width: 192px;
  height: 192px;
  border-radius: 12px;
`;
const ContractTitle = styled.div`
  margin-top: 8px;
  font-size: 32px;
  font-weight: 800;
`;
const ContractMetadata = styled.div`
  margin-top: 16px;
`;
const ContractDescription = styled.div`
  margin-top: 16px;
  padding: 18px 24px;
  background: #f0f0f0;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 40px;
`;
const NftContainer = styled.div``;
const NftImage = styled.img`
  width: 100%;
  height: 100%;
`;
const NftInfo = styled.div`
  padding: 8px 4px;
`;
const TokenId = styled.div`
  font-size: 16px;
`;
const TokenPrice = styled.div`
  margin-top: 8px;
  font-weight: 800;
  font-size: 18px;
`;
const More = styled.div`
  background: #f0f0f0;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 60px;
  text-align: center;
  cursor: pointer;
`;

export default List;
