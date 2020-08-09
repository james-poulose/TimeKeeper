import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";

const STORAGE_KEY = "@TIMEKEEPER";

export default class Helper {
	static doSomething = (): void => {
		console.log("fdfd");
	};

	static saveTimeDetails(monthYearCode: string, timeData: WorkDayItem): void {
		// Get the month's data (this may or may not be there)
		let key = this.getKeyForMonth(monthYearCode);
		const jsonString = this.getTimeDetails(monthYearCode);
		let monthData: Map<string, WorkDayItem>;
		if (jsonString != null) {
			const parseData = JSON.parse(jsonString);
			monthData = new Map(parseData);
		} else {
			monthData = new Map<string, WorkDayItem>();
		}

		// Update data set for the given month code.
		monthData.set(monthYearCode, timeData);

		// Put the full map back to Async store
		let data = JSON.stringify(timeData);
		AsyncStorage.setItem(key, data);
	}

	static getTimeDetails(monthYearCode: string): string {
		let monthData: string = null;
		let key = this.getKeyForMonth(monthYearCode);
		let monthDataPromise = AsyncStorage.getItem(key).then((data) => {
			monthData = data;
		});
		return monthData;
	}

	static getMonthYearCodeFromDate(fullDate: string): string {
		// CAUTION: Changing the format order or casing will result in duplicate entries in storage.
		const code = moment(fullDate).format("YYYYMMM").toUpperCase();
		return code;
	}

	static getKeyForMonth(monthYearCode: string): string {
		return STORAGE_KEY + "_" + monthYearCode;
	}
}

type WorkDayItem = {
	date: string;
	dayType: string;
	timeIn: string;
	timeOut: string;
	remarks: string;
};
