// types/html2pdf.d.ts

declare module "html2pdf.js" {
  interface HTML2PDFOptions {
    margin?: number | [number, number, number, number];
    filename?: string;
    image?: { type?: `jpeg` | `png`; quality?: number };
    html2canvas?: any;
    jsPDF?: any;
  }

  interface html2pdfInstance {
    from(element: HTMLElement | string | Node): html2pdfInstance;
    set(options: HTML2PDFOptions): html2pdfInstance;
    save(filename?: string): Promise<void>;
    output(type: "datauristring"): Promise<string>;
  }

  interface html2pdfFunction {
    (): html2pdfInstance;
    (element: HTMLElement, options: HTML2PDFOptions): Promise<void>;
  }

  const html2pdf: html2pdfFunction;
  export default html2pdf;
}
