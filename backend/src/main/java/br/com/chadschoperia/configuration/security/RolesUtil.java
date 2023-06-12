package br.com.chadschoperia.configuration.security;

import lombok.experimental.UtilityClass;

@UtilityClass
public class RolesUtil {

	public static final String ADMIN = "ROLE_ADMINISTRADOR";
	public static final String CASHIER = "ROLE_CAIXA";
	public static final String COSTUMER = "ROLE_CLIENTE";
	public static final String COOK = "ROLE_COZINHEIRO";
	public static final String COSTUMER_MONITOR = "ROLE_FISCAL_ENTRADA";
	public static final String FOOD_MONITOR = "ROLE_FISCAL_COMIDA";
	public static final String STOCK_MONITOR = "ROLE_FISCAL_ESTOQUE";


}
