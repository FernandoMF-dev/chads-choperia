import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { finalize } from "rxjs";
import { UtilsService } from "src/app/services/utils.service";
import { Role } from "../../models/role.model";
import { User } from "../../models/user.model";
import { RoleService } from "../../services/role.service";
import { UserService } from "../../services/user.service";
import { RolesDisplayName } from "src/app/utils/RolesUtil";

@Component({
	selector: "app-user-form",
	templateUrl: "./user-form.component.html",
	styleUrls: ["./user-form.component.scss"],
})
export class UserFormComponent implements OnInit {
	users: User[] = [];
	roles: Role[] = [];

	@Input() dialogOpen: boolean = false;
	@Input() user?: User;
	@Output() handleUsersChange = new EventEmitter<string>();
	@Output() hideDialog = new EventEmitter<string>();

	userForm: FormGroup;

	_isLoading = false;

	get isLoading(): boolean {
		return this._isLoading;
	}

	set isLoading(value: boolean) {
		value ? this.userForm.disable() : this.userForm.enable();
		this._isLoading = value;
	}

	constructor(private userService: UserService, private roleService: RoleService, private utilsService: UtilsService) {
		this.userForm = new FormGroup({
			id: new FormControl(null),
			username: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
			email: new FormControl("", [Validators.required, Validators.email]),
			password: new FormControl(""),
			idsRole: new FormControl("", [Validators.required]),
		});
	}

	ngOnInit() {
		this.fetchRoles();
	}

	private fetchRoles(): void {
		this.isLoading = true;
		this.roleService
			.getAll()
			.pipe(finalize(() => (this.isLoading = false)))
			.subscribe({
				next: (roles) => this.updateRoles(roles),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail),
			});
	}

	private updateRoles(roles: Role[]): void {
		this.roles = roles;
	}

	async saveUser() {
		this.user = this.userForm.value;
		this.isLoading = true;
		this.user?.id ? await this.updateUser() : await this.registerNewUser();

		this.handleUsersChange.emit();
    this.hideDialog.emit();
		this.isLoading = false;
	}

	private registerNewUser(): Promise<void> {
		return new Promise((resolve) => {
			this.userService
				.create(this.user!)
				.pipe(finalize(() => resolve()))
				.subscribe({
					next: () => {
						this.utilsService.showSuccessMessage("Usuário Criado");
					},
					error: (err) => this.utilsService.showErrorMessage(err.error.detail),
				});
		});
	}

	private updateUser(): Promise<void> {
		return new Promise((resolve) => {
			this.userService
				.update(this.user!)
				.pipe(finalize(() => resolve()))
				.subscribe({
					next: (updatedUser) => {
						this.utilsService.showSuccessMessage(`Usuário ${updatedUser.username} alterado`);
					},
					error: (err) => this.utilsService.showErrorMessage(err.error.detail),
				});
		});
	}

	verifyEditMode(): void {
		if (this.user) {
			this.userForm.patchValue(this.user);
			this.userForm.get("password")?.clearValidators();
			return;
		}
		this.userForm.get("password")?.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
	}

	isFieldValid(fieldName: string): boolean | undefined {
		return this.utilsService.isFieldValid(this.userForm, fieldName);
	}

	get roleOptions(): Array<Role & { disabled?: boolean, displayName: string }> {
    const rolesWithDisplayName: Array<Role & { disabled?: boolean, displayName: string }> = [];
    this.roles.forEach(role => {
      const newRole = {...role, displayName: RolesDisplayName[role.name as keyof typeof RolesDisplayName]}
      rolesWithDisplayName.push(newRole);
    })
		return [{ displayName: "Escolha a função", disabled: true }, ...rolesWithDisplayName];
	}

	isEditing(): boolean {
		return !this.user?.id;
	}
}
