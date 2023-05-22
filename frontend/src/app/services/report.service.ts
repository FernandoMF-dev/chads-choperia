import { Injectable } from "@angular/core";
import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";
import { reportPreset } from "../utils/pdfReportPreset.utils";
import { HeaderItem } from "../models/report.model";
import { DatePipe } from "@angular/common";

@Injectable({
	providedIn: "root",
})
export class ReportService {
	constructor(private datePipe: DatePipe) {}

	generateReport(reportName: string, filename: string, tableHeaders: HeaderItem[], tableItems: any[]): void {
		const reportProps = reportPreset;
		reportProps.fileName = filename;
		reportProps.contact = {
			label: "Informações do Relatório",
			name: reportName,
      otherInfo: `Data da Geração: ${this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss')}`
		};
    console.log(reportName)
    reportProps.invoice = {
      header: tableHeaders,
      table: tableItems,
    }

		jsPDFInvoiceTemplate(reportProps);
	}
}
