import { Component, OnInit } from "@angular/core";
import { Table } from "primeng/table";
import { finalize } from "rxjs/operators";
import { ActiveUserService } from "src/app/layout/service/auth/ActiveUserService";
import { Role } from "src/app/modules/user/models/role.model";
import { User } from "src/app/modules/user/models/user.model";
import { RoleService } from "src/app/modules/user/services/role.service";
import { UserService } from "src/app/modules/user/services/user.service";
import { UtilsService } from "src/app/services/utils.service";
import { RolesDisplayName } from "src/app/utils/RolesUtil";

@Component({
	templateUrl: "./user-crud.component.html",
	providers: [UtilsService],
})
export class UserCrudComponent implements OnInit {
	userDialog: boolean = false;

	users: User[] = [];
	roles: Role[] = [];

	cols: any[] = [];
	user?: User;

	isLoading = false;

	constructor(
		private userService: UserService,
		private activeUserService: ActiveUserService,
		private roleService: RoleService,
		private utilsService: UtilsService
	) {}

	ngOnInit() {
		this.fetchUsers();
		this.fetchRoles();

		this.cols = [
			{ field: "username", header: "Nome" },
			{ field: "email", header: "Email" },
			{ field: "roleName", header: "Função" },
		];
	}

	fetchUsers(): void {
		this.isLoading = true;
		this.userService
			.getAll()
			.pipe(finalize(() => (this.isLoading = false)))
			.subscribe({
				next: (users) => this.updateUsers(users),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail),
			});
	}

	private updateUsers(users: User[]): void {
		this.users = users;
		this.users.forEach(user => {
			let roles = (String(user.roleNames));
			roles = roles.replace('[', '');
			roles = roles.replace(']', '');
			user.roleNames = roles.split(', ')
		})
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

	private openUserFormDialog() {
		this.userDialog = true;
	}

	private closeUserFormDialog() {
		this.userDialog = false;
	}

	openNew() {
		this.openUserFormDialog();
	}

	editUser(user: User) {
		this.userService.getById(user.id!).subscribe({
			next: (user) => {
				this.user = user;
				this.openUserFormDialog();
			},
			error: (err) => {
				this.utilsService.showErrorMessage(err.error.detail);
			},
		});
	}

	deleteUser() {
		this.userService
			.delete(this.user?.id!)
			.pipe(finalize(() => (this.user = {})))
			.subscribe({
				next: () => {
					this.fetchUsers();
				},
				error: (err) => this.utilsService.showErrorMessage(err.error.detail),
			});
	}

	confirmDeleteUser(user: User): void {
		if (user.username === this.activeUserService.getUser()?.username) {
			this.utilsService.showErrorMessage("Você não pode excluir a si mesmo!");
			return;
		}

		this.user = { ...user };
		this.utilsService.displayConfirmationMessage(
			"Excluir Usuário",
			`Tem certeza que quer excluir o usuário <strong>${this.user!.username}</strong>?`,
			this,
			() => this.deleteUser()
		);
	}

	hideDialog() {
		this.closeUserFormDialog();
	}

	findIndexById(id: number): number {
		return this.users.findIndex((user) => user.id === id);
	}

	onGlobalFilter(table: Table, event: Event) {
		table.filterGlobal((event.target as HTMLInputElement).value, "contains");
	}

	handleUsersChange(): void {
		this.user = undefined;
		this.fetchUsers();
	}

	getUserRoles(user: User): string {
		return user.roleNames!.map(role => RolesDisplayName[role as keyof typeof RolesDisplayName]).join(' | ');
	}
}
