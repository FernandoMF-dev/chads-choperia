import { createServer } from "net";
import { resolve } from "path";

const ESC = "\u001B";
const CLEAR_SCREEN = `${ESC}[2J`;
const MOVE_HOME = `${ESC}[H`;

const server = createServer((socket) => {
	console.log("Cliente conectado.");

	let inputString = "";
	let lastInputCaracter;
	let isPaused = false;

	const pauseMicroterminal = (secondsToSleep = 5) => {
		isPaused = true;
		setTimeout(() => {
			isPaused = false;
		}, secondsToSleep * 1000);
	};

	const clearTerminalAfterTime = (secondsBeforeClear = 5) => {
		setTimeout(() => {
			inputString = "";
			writeOutput(inputString);
		}, secondsBeforeClear * 1000);
	};

	const writeOutput = (string) => {
		socket.write(CLEAR_SCREEN + MOVE_HOME);
		socket.write(string);
	};

	const formatToBrlCurrency = (number) => {
		const options = { style: "currency", currency: "BRL" };
		const formatNumber = new Intl.NumberFormat("pt-BR", options);

		return formatNumber.format(number).replace(/\s/g, "");
	};

	const deleteLastCaracter = () => {
		inputString = inputString.slice(0, -1);
	};

	const clearInputString = () => {
		inputString = "";
	};

	const fetchCardData = () => {
		return new Promise(async (resolve) => {
			try {
				console.log(`http://localhost:8080/api/card/client/rfid/${inputString}`);
				const response = await fetch(`http://localhost:8080/api/card/client/rfid/${inputString}`);
				const card = await response.json();
				inputString = `Total ${formatToBrlCurrency(Math.max(card.totalExpenses - card.payment, 0))}`;
				resolve();
			} catch {
				inputString = "Cartao invalido";
				resolve();
			}
		})
	}

	const handleSubmitCardNumber = async () => {
		pauseMicroterminal();
		await fetchCardData();
		writeOutput(inputString);
		clearTerminalAfterTime();
	};

	const incrementCaracterOnInputString = () => {
		const isNumeric = () => {
			return /^\d+$/.test(lastInputCaracter);
		};
		if (!isNumeric()) return;
		if (inputString.length >= 10) return;
		inputString += lastInputCaracter;
	};

	const commands = {
		8: deleteLastCaracter,
		27: clearInputString,
		13: handleSubmitCardNumber,
		default: incrementCaracterOnInputString,
	};

	const handleInputData = () => {
		const command = commands[lastInputCaracter.charCodeAt(0)];
		command ? command() : commands.default();
	};

	socket.on("data", (data) => {
		if (isPaused) return;
		lastInputCaracter = data.toString();
		handleInputData();
		writeOutput(inputString);
	});

	socket.on("end", () => {
		console.log("Cliente desconectado.");
		inputString = "";
	});
});

server.listen(1001, () => {
	console.log("Servidor de socket iniciado na porta 1001.");
});
