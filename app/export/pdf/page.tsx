"use client";

import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { MyDocument } from "@/components/pdf/myDocument";

export default function Page() {
  return (
    <div>
      <div className="w-full h-screen">
        <PDFViewer width="100%" height="100%">
          {/* <MyDocument title="test" /> */}
        </PDFViewer>
      </div>
    </div>
  );
}
