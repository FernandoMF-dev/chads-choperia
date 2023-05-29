export class RolesUtil {
	public static readonly ADMIN = "ROLE_ADMINISTRADOR";
	public static readonly CASHIER = "ROLE_CAIXA";
	public static readonly COSTUMER = "ROLE_CLIENTE";
	public static readonly COOK = "ROLE_COZINHEIRO";
	public static readonly COSTUMER_MONITOR = "ROLE_FISCAL_ENTRADA";
	public static readonly FOOD_MONITOR = "ROLE_FISCAL_COMIDA";
	public static readonly STOCK_MONITOR = "ROLE_FISCAL_ESTOQUE";
}

export const RolesDisplayName = {
	ROLE_ADMINISTRADOR: "Administrador",
	ROLE_CAIXA: "Caixa",
	ROLE_CLIENTE: 'Cliente',
	ROLE_COZINHEIRO: "Cozinheiro",
	ROLE_FISCAL_ENTRADA: "Fiscal de Entrada",
	ROLE_FISCAL_COMIDA: "Fiscal de Self-Service",
	ROLE_FISCAL_ESTOQUE: "Fiscal de Estoque"
};
