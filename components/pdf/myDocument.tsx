"use client";

import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { Table, TR, TH, TD } from "@ag-media/react-pdf-table";
import { Button } from "../Button";

// Sample data
const sampleData = [
  { id: 1, item: "Nasi Goreng", quantity: 50, price: 25000 },
  { id: 2, item: "Mie Goreng", quantity: 45, price: 23000 },
  { id: 3, item: "Sate Ayam", quantity: 75, price: 35000 },
  { id: 4, item: "Gado-gado", quantity: 30, price: 20000 },
];

// Table header configuration
const tableHeadersex = [
  {
    key: "id",
    label: "ID",
    render: (value: any) => value,
  },
  {
    key: "item",
    label: "Menu Item",
    render: (value: any) => value,
  },
  {
    key: "quantity",
    label: "Quantity",
    render: (value: any) => value,
  },
  {
    key: "price",
    label: "Price (Rp)",
    render: (value: any) => value.toLocaleString("id-ID"),
  },
];
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 20,
  },
  section: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 3,
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    padding: 5,
    fontSize: 12,
    textAlign: "center",
  },
  tableCell: {
    padding: 5,
    fontSize: 10,
    textAlign: "left",
    borderBottom: 1,
    borderStyle: "solid",
  },
});

// create interface
interface MyDocumentProps {
  title: string;
  tableHeaders: Array<any>;
  data: Array<any>;
}

function MyDocument({ title, tableHeaders, data }: MyDocumentProps) {
  const Header = () => (
    <View style={styles.header}>
      <View style={styles.section}>
        <Text style={styles.title}>Laporan {title}</Text>
        <Text style={styles.text}>Unikom Restaurant</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>
          Tanggal: {new Date().toLocaleDateString("id-ID")}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>
          Alamat: Jalan Dipatiukur No. 112-116, 40132.
        </Text>
        <Text style={styles.text}>
          Coblong, Lebakgede, Bandung, Jawa Barat, Indonesia
        </Text>
      </View>
    </View>
  );

  const TableData = () => (
    <Table>
      <TH>
        <TD style={styles.tableHeader}>No</TD>
        {tableHeaders.map((header) => (
          <TD key={header.key} style={styles.tableHeader}>
            {header.label}
          </TD>
        ))}
      </TH>
      {data?.map((row, index) => (
        <TR key={index}>
          <TD style={styles.tableCell}>{index + 1}</TD>
          {tableHeaders.map((header) => (
            <>
              <TD key={header.key} style={styles.tableCell}>
                {header.render(row[header.key])}
              </TD>
            </>
          ))}
        </TR>
      ))}
    </Table>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header />
        <TableData />
        <View style={{ marginTop: 20 }}>
          <Text style={styles.text}>Total Data: {data.length}</Text>
          {/* <Text style={styles.text}>
            Total Value: Rp{" "}
            {sampleData
              .reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
              .toLocaleString("id-ID")}
          </Text> */}
        </View>
      </Page>
    </Document>
  );
}
interface PDFDocumentProps {
  tableHeaders: Array<any>;
  data: Array<any>;
  nameFile: string;
  titleDocument: string;
  button: string;
}

export default function PDFDocument({
  tableHeaders,
  data,
  nameFile,
  titleDocument,
  button,
}: PDFDocumentProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <PDFDownloadLink
      document={
        <MyDocument
          title={titleDocument}
          tableHeaders={tableHeaders}
          data={data}
        />
      }
      fileName={nameFile + ".pdf"}
    >
      <Button>{button}</Button>
    </PDFDownloadLink>
  ) : (
    <></>
  );
}
