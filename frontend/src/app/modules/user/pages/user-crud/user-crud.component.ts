import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import { Role } from 'src/app/models/role.model';
import { User } from 'src/app/models/user.model';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
    templateUrl: './user-crud.component.html',
    providers: [UtilsService]
})
export class UserCrudComponent implements OnInit {

    userDialog: boolean = false;
    deleteUserDialog: boolean = false;

    users: User[] = [];
    roles: Role[] = [];

    user: User = {};
    userForm: FormGroup;

    cols: any[] = [];

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
            username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            idRole: new FormControl('', [Validators.required])
        })
    }

    ngOnInit() {
        this.fetchUsers();
        this.fetchRoles();

        this.cols = [
            { field: 'username', header: 'Nome' },
            { field: 'email', header: 'Email' },
            { field: 'roleName', header: 'Função' },
        ];
    }

    private fetchUsers(): void {
        this.isLoading = true;
        this.userService.getAll().pipe(finalize(() => this.isLoading = false)).subscribe({
            next: (users) => this.updateUsers(users),
            error: () => this.utilsService.showErrorMessage('Erro ao carregar dados')
        })
    }

    private updateUsers(users: User[]): void {
        this.users = users
    }

    private fetchRoles(): void {
        this.isLoading = true;
        this.roleService.getAll().pipe(finalize(() => this.isLoading = false)).subscribe({
            next: (roles) => this.updateRoles(roles),
            error: () => this.utilsService.showErrorMessage('Erro ao carregar os dados')
        })
    }

    private updateRoles(roles: Role[]): void {
        this.roles = roles;
    }

    private clearUser(): void {
        this.user = {};
    }

    private openUserFormDialog() {
        this.userDialog = true;
    }

    private closeUserFormDialog() {
        this.userDialog = false;
    }

    openNew() {
        this.userForm.reset();
        this.clearUser();
        this.openUserFormDialog();
    }

    editUser(user: User) {
        this.isLoading = true;
        this.user = user;
        this.userService.getById(user.id!).subscribe({
            next: (user) => {
                this.userForm.patchValue(user);
                this.isLoading = false;
            },
            error: () => {
                this.utilsService.showErrorMessage('Erro ao carregar os dados')
                this.closeUserFormDialog()
                this.isLoading = false;
            }
        })

        this.openUserFormDialog();
    }

    deleteUser(user: User) {
        this.deleteUserDialog = true;
        this.user = { ...user };
    }

    confirmDelete() {
        this.deleteUserDialog = false;
        this.userService.delete(this.user.id!).pipe(finalize(() => { this.user = {} })).subscribe({
            next: () => {
                this.users = this.users.filter(user => user.id !== this.user.id);
                this.utilsService.showSuccessMessage('Usuário Removido');
            },
            error: () => this.utilsService.showErrorMessage('Erro ao Remover o usuário')
        })
    }

    hideDialog() {
        this.closeUserFormDialog()
    }

    async saveUser() {
        this.user = this.userForm.value;
        this.isLoading = true;
        this.user.id ? await this.updateUser() : await this.registerNewUser();

        this.closeUserFormDialog()
        this.clearUser();
        this.isLoading = false;
    }

    private registerNewUser(): Promise<void> {
        return new Promise((resolve) => {
            this.userService.create(this.user)
                .pipe(finalize(() => resolve()))
                .subscribe({
                    next: (newUser) => {
                        this.users.push({ ...this.user, id: newUser.id, roleName: this.findRoleById(this.user.idRole!).name });
                        this.utilsService.showSuccessMessage('Usuário Criado');
                    },
                    error: () => this.utilsService.showErrorMessage('Erro ao criar o usuário')
                })
        })
    }

    private updateUser(): Promise<void> {
        const updateUserInUsersList = (updatedUser: User): void => {
            this.users[this.findIndexById(updatedUser.id!)] = updatedUser;
        }

        return new Promise((resolve) => {
            this.userService
                .update(this.user)
                .pipe(finalize(() => resolve()))
                .subscribe({
                    next: (updatedUser) => {
                        updateUserInUsersList(updatedUser);
                        this.utilsService.showSuccessMessage(`Usuário ${updatedUser.username} alterado`);
                    },
                    error: () => this.utilsService.showErrorMessage('Erro ao editar o usuário')
                })
        })
    }

    private findRoleById(id: number): Role {
        return this.roles.find(role => role.id == id) || {};
    }

    findIndexById(id: number): number {
        return this.users.findIndex(user => user.id === id);
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    isFieldValid(fieldName: string): boolean | undefined {
        return this.utilsService.isFieldValid(this.userForm, fieldName);
    }

    get roleOptions(): Array<Role & { disabled?: boolean }> {
        return [{ name: 'Escolha a função', disabled: true }, ...this.roles];
    }
}
