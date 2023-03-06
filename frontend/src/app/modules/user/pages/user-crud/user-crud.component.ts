import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import { Role } from 'src/app/models/role.model';
import { User } from 'src/app/models/user.model';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    templateUrl: './user-crud.component.html',
    providers: [MessageService]
})
export class UserCrudComponent implements OnInit {

    userDialog: boolean = false;

    deleteUserDialog: boolean = false;

    users: User[] = [];

    roles: Array<Role & { disabled?: boolean }> = [];

    user: User = {};

    userForm: FormGroup;

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    isLoading = false;

    constructor(private userService: UserService, private roleService: RoleService, private messageService: MessageService) {
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
        this.userService.getAll().subscribe({
            next: (users) => {
                this.users = users
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao carregar dados', life: 3000 });
            }
        })
    }

    private fetchRoles(): void {
        this.roleService.getAll().subscribe({
            next: (roles) => {
                this.roles = [{ name: 'Escolha a Função', disabled: true }, ...roles];
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao carregar dados', life: 3000 });
            }
        })
    }

    openNew() {
        this.userForm.reset();
        this.user = {};
        this.submitted = false;
        this.userDialog = true;
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
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao carregar dados', life: 3000 });
                this.userDialog = false;
                this.isLoading = false;
            }
        })

        this.userDialog = true;
    }

    deleteUser(user: User) {
        this.deleteUserDialog = true;
        this.user = { ...user };
    }

    confirmDelete() {
        this.deleteUserDialog = false;
        this.userService.delete(this.user.id!).pipe(finalize(() => { this.user = {} })).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Usuário Removido', life: 3000 });
                this.users = this.users.filter(user => user.id !== this.user.id);
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao remover o usuário', life: 3000 });
            }
        })
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    async saveUser() {
        this.user = this.userForm.value;
        this.submitted = true;
        this.isLoading = true;
        this.user.id ? await this.updateUser() : await this.registerNewUser();
        this.userDialog = false;
        this.user = {};
        this.isLoading = false;
    }

    private registerNewUser(): Promise<void> {
        return new Promise((resolve) => {
            this.userService.create(this.user).pipe(
                finalize(() => resolve()),
            ).subscribe({
                next: (newUser) => {
                    this.users.push({ ...this.user, id: newUser.id, roleName: this.findRoleById(this.user.idRole!).name });
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuário Criado', life: 3000 });
                },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar o usuário', life: 3000 });
                }
            })
        })
    }

    private updateUser(): Promise<void> {
        return new Promise((resolve) => {
            this.userService.update(this.user).pipe(
                finalize(() => resolve()),
            ).subscribe({
                next: (updatedUser) => {
                    this.users[this.findIndexById(updatedUser.id!)] = updatedUser;
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: `Usuário ${updatedUser.username} alterado`, life: 3000 });
                },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao editar o usuário', life: 3000 });
                }
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
        return !(
            (this.userForm.get(fieldName)?.touched || this.userForm.get(fieldName)?.dirty) &&
            this.userForm.get(fieldName)?.invalid
        );
    }
}
