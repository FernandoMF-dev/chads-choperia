package br.com.chadschoperia.utils;

import lombok.experimental.UtilityClass;

@UtilityClass
public class FormatUtils {
	public static String formatTelephone(String tel) {
		return String.format("(%s) %s-%s", tel.substring(0, 2), tel.substring(2, 7), tel.substring(7));
	}

}
