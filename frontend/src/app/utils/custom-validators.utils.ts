import { AbstractControl } from '@angular/forms';

export class CustomValidators {
	static cpf(control: AbstractControl): any {
		const cpf = control.value;
		const regex = new RegExp('[0-9]{11}');
		const blackList = ['00000000000', '11111111111', '22222222222', '33333333333', '44444444444', '55555555555', '66666666666', '77777777777', '88888888888', '99999999999'];

		let sum: number = 0;
		let remainder: number;

		const cpfResult: (valid: boolean) => any = (valid: boolean) => valid ? null : { invalidCpf: true };

		if (blackList.some(value => value === cpf) || !regex.test(cpf)) {
			return cpfResult(false);
		}

		for (let i = 1; i <= 9; i++) {
			sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
		}
		remainder = (sum * 10) % 11;

		if (remainder == 10 || remainder == 11) {
			remainder = 0;
		}
		if (remainder != parseInt(cpf.substring(9, 10))) {
			return cpfResult(false);
		}

		sum = 0;
		for (let i = 1; i <= 10; i++) {
			sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
		}
		remainder = (sum * 10) % 11;

		if (remainder == 10 || remainder == 11) {
			remainder = 0;
		}
		if (remainder != parseInt(cpf.substring(10, 11))) {
			return cpfResult(false);
		}
		return cpfResult(true);

	}
}
