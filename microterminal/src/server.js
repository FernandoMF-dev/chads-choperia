import { createServer } from "net";

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
		const options = {style: "currency", currency: "BRL"};
		const formatNumber = new Intl.NumberFormat("pt-BR", options);

		return formatNumber.format(number).replace(/\s/g, '');
	};

	const deleteLastCaracter = () => {
		inputString = inputString.slice(0, -1);
	}

	const clearInputString = () => {
		inputString = "";
	}

	const handleSubmitCardNumber = async () => {
		try {
			// const cardValue = await fetch(`http://localhost:8080/cartao/${inputString}`);
			// const data = await cardValue.json();
			inputString = `Total ${formatToBrlCurrency(20)}`;
		} catch {
			inputString = "Cartao invalido";
		}
		pauseMicroterminal();
		clearTerminalAfterTime();
	}

	const incrementCaracterOnInputString = () => {
		const isNumeric = () => {
			return /^\d+$/.test(lastInputCaracter);
		}
		if (!isNumeric()) return;
		inputString += lastInputCaracter;
	}

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
