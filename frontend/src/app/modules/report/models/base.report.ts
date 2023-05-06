import { getISOWeek } from 'date-fns';

export abstract class BaseReport {
	protected constructor(
		public description: string,
		public value: number,
		public dateTime: Date
	) {
	}

	public static splitPerDay<T extends BaseReport>(reports: T[]): T[][] {
		return this.splitPerDateString(reports, (report) => report.dateTime.toISOString().slice(0, 10));
	}

	public static splitPerWeek<T extends BaseReport>(reports: T[]): T[][] {
		return this.splitPerDateString(reports, (report) => `${ report.dateTime.getFullYear() }-${ getISOWeek(report.dateTime) }`);
	}

	public static splitPerMonth<T extends BaseReport>(reports: T[]): T[][] {
		return this.splitPerDateString(reports, (report) => report.dateTime.toISOString().slice(0, 7));
	}

	public static splitPerYear<T extends BaseReport>(reports: T[]): T[][] {
		return this.splitPerDateString(reports, (report) => report.dateTime.toISOString().slice(0, 4));
	}

	private static splitPerDateString<T extends BaseReport>(reports: T[], getDateStr: (report: T) => string): T[][] {
		const groupItemsPerDay: { [key: string]: T[] } = {};

		reports.forEach((report) => {
			const dateStr = getDateStr(report);
			if (!groupItemsPerDay[dateStr]) {
				groupItemsPerDay[dateStr] = [];
			}
			groupItemsPerDay[dateStr].push(report);
		});

		return Object.values(groupItemsPerDay);
	}
}
