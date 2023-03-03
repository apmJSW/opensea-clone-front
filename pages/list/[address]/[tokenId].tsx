import { NftHistoryTable, TopHeader } from "../../../components";
import { NextPage } from "next";
import React from "react";
import { useRouter } from "next/router";
import { useNftTransferHistory, useOneNft } from "@/hooks";
import styled from "@emotion/styled";
import { Button, Grid } from "@mui/material";
import { NftTokenInfoBox } from "@/components/NftTokenInfoBox";
import Link from "next/link";

const TokenDetailPage: NextPage = () => {
  const router = useRouter();
  const { address, tokenId } = router.query;

  const { data: nft } = useOneNft(address, tokenId);
  const { data: history } = useNftTransferHistory(address, tokenId);

  const contractName = nft?.contractMetadata.name?.replace(/([A-Z])/g, " $1");

  return (
    nft &&
    history && (
      <div>
        <TopHeader />

        {nft && (
          <Container>
            <MainContainer>
              <Grid container spacing={3}>
                <Grid item xs={5}>
                  {nft?.media && <TokenImage src={nft.media[0].gateway} />}
                  <NftTokenInfoBox nft={nft} contractName={"test"} />
                </Grid>
                <Grid item xs={7}>
                  <Link href={`/list/${address}`}>
                    <ContractName>{contractName}</ContractName>
                  </Link>

                  <TokenId>#{nft.id.tokenId}</TokenId>

                  <Owner>
                    Owned by{" "}
                    <a
                      href={`https://etherscan.io/address/${nft.owners[0]}`}
                      target="_blank"
                    >
                      <OwnerAddress>{nft.owners[0]}</OwnerAddress>
                    </a>
                  </Owner>

                  <Section>
                    <SectionTitle>Current Price</SectionTitle>
                    <Price>61.4 ETH</Price>

                    <OrderButtonView>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <OrderButton variant="contained">Buy Now</OrderButton>
                        </Grid>
                        <Grid item xs={6}>
                          <OrderButton variant="outlined">
                            Make Offer
                          </OrderButton>
                        </Grid>
                      </Grid>
                    </OrderButtonView>
                  </Section>

                  <Section>
                    <SectionTitle>Offers</SectionTitle>
                  </Section>

                  <Section>
                    <SectionTitle>Recent Item Activities</SectionTitle>
                    <NftHistoryTable history={history} />
                  </Section>
                </Grid>
              </Grid>
            </MainContainer>
          </Container>
        )}
      </div>
    )
  );
};

const Container = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
`;
const MainContainer = styled.div`
  width: 100%;
  max-width: 1280px;
`;
const TokenImage = styled.img`
  width: 100%;
`;
const ContractName = styled.div`
  color: #0070f3;
  font-size: 18px;
  cursor: pointer;
`;
const TokenId = styled.div`
  margin-top: 16px;
  font-size: 28px;
  font-weight: 700;
`;
const Owner = styled.div`
  margin-top: 12px;
  font-size: 20px;
  font-weight: 600;
`;
const OwnerAddress = styled.span`
  font-size: 0.88em;
  font-weight: 500;
  color: #0070f3;
`;
const Section = styled.div`
  margin-top: 24px;
  border: 1px solid #f0f0f0;
  padding: 24px;
  border-radius: 8px;
`;
const SectionTitle = styled.div`
  font-size: 18px;
  color: #606060;
`;
const Price = styled.div`
  margin-top: 8px;
  font-size: 28px;
  font-weight: 700;
`;
const OrderButtonView = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const OrderButton = styled(Button)`
  width: 100%;
  padding: 16px;
  border-radius: 12px;
`;

export default TokenDetailPage;
