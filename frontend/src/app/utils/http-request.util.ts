import { HttpParams } from '@angular/common/http';

export class HttpRequestUtil {
	public static getParamsFromObject(obj: { [key: string]: any }, config: Partial<ParseParamConfig> = {}): HttpParams {
		const fullConfig: ParseParamConfig = Object.assign(new ParseParamConfig(), config);
		let params: HttpParams = new HttpParams();

		for (const key in obj) {
			const value: any = obj[key];

			if (this.doesValueMatchConfig(value, fullConfig)) {
				if (value instanceof Date) {
					params = params.append(key, value.toISOString().slice(0, -1));
				} else if (typeof value === 'object' && value != null) {
					params = params.append(key, value.toString());
				} else {
					params = params.append(key, value);
				}
			}
		}

		return params;
	}

	private static doesValueMatchConfig(value: any, config: ParseParamConfig): boolean {
		return (typeof value === 'boolean' || !!value || !config.ignoreNonBooleanFalsy)
			&& (value !== null || !config.ignoreNull)
			&& (value !== undefined || !config.ignoreUndefined);
	}
}

export class ParseParamConfig {
	constructor(
		public ignoreNonBooleanFalsy: boolean = true,
		public ignoreNull: boolean = true,
		public ignoreUndefined: boolean = true
	) {
	}
}
