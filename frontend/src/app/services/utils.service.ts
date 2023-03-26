import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Confirmation, ConfirmationService, MessageService } from 'primeng/api';

@Injectable()
export class UtilsService {
	constructor(
		private messageService: MessageService,
		private confirmationService: ConfirmationService
	) {
	}

	showSuccessMessage(message?: string): void {
		this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: message || 'Sucesso ao realizar operação', life: 3000 });
	}

	showErrorMessage(message?: string): void {
		this.messageService.add({ severity: 'error', summary: 'Error', detail: message || 'Erro ao realizar operação', life: 3000 });
	}

	isFieldValid(form: FormGroup, fieldName: string): boolean {
		return !(
			((form.get(fieldName)?.dirty)) &&
			form.get(fieldName)?.invalid
		);
	}

	displayConfirmationMessage(title: string, message: string, component?: Object, accept?: (...args: any) => void, reject?: (...args: any) => void): void {
		const confirmation: Confirmation = this.buildConfirmationMessage(title, message);

		if (accept) {
			confirmation.acceptLabel = 'Confirmar';
			confirmation.rejectLabel = 'Cancelar';
			confirmation.rejectVisible = true;
			confirmation.accept = () => accept.bind(component)();

			if (reject) {
				confirmation.reject = () => reject.bind(component)();
			}
		}

		this.confirmationService.confirm(confirmation);
	}

	private buildConfirmationMessage(title: string, message: string): Confirmation {
		return {
			message: message,
			header: title,
			icon: 'pi pi-exclamation-triangle icon-warning',
			acceptLabel: 'Ok',
			rejectVisible: false,
			acceptVisible: true
		};
	}
}
