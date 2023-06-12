import { OutputType } from "jspdf-invoice-template";
import { PdfReportProps } from "../models/report.model";

export const reportPreset: PdfReportProps = {
	outputType: OutputType.Save,
	returnJsPDFDocObject: true,
	fileName: "relatorio",
	orientationLandscape: false,
	compress: true,
	logo: {
		src: "assets/layout/images/logo.png",
		width: 10,
		height: 10,
		margin: {
			top: 5,
			left: 5,
		},
	},
	business: {
		name: "Chad's Choperia",
		address: "Av. Arino Gomes Leal, 1700 - Santa Margarida, Colatina - ES, 29700-558",
		phone: "+55 (27) 9 9999-9999",
		email: "administracao@chadschoperia.com",
		website: "http://www.chadschoperia.com.br/",
	},
	footer: {
		text: "Esse relatório foi criado via Software de controle.",
	},
	pageEnable: true,
	pageLabel: "Página ",
};
