import styled from "@emotion/styled";
import React from "react";

interface NftHistory {
  hash: string;
  from: string;
  to: string;
}

interface NftHistoryTableProps {
  history: NftHistory[];
}

export const NftHistoryTable = ({ history }: NftHistoryTableProps) => {
  return (
    <Container>
      <TableHead>
        <Event>Event</Event>
        <Address>From</Address>
        <Address>To</Address>
      </TableHead>

      {(history || []).map((event) => (
        <Row key={`event-${event.hash}`}>
          <Event>Transfer</Event>
          <Address>
            <a
              href={`https://etherscan.io/address${event.from}`}
              target="_blank"
            >
              {event.from}
            </a>
          </Address>
          <Address>
            <a href={`https://etherscan.io/address${event.to}`} target="_blank">
              {event.to}
            </a>
          </Address>
        </Row>
      ))}
    </Container>
  );
};

const Container = styled.div``;
const TableHead = styled.div`
  padding: 16px 0;
  display: flex;
  flex-direction: row;
  border-radius: 1px solid #f0f0f0;
  font-weight: 700;
`;
const Event = styled.div`
  flex: 1;
`;
const Address = styled.div`
  flex: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 36px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 24px;
`;
