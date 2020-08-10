import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";

const STORAGE_KEY = "@TIMEKEEPER";

export default class Helper {
	static doSomething = (): void => {
		console.log("fdfd");
	};

	putInStorage(key: string, data: any, callBack: any) {
		// Put the full map back to Async store
		let serialized = JSON.stringify(data);
		AsyncStorage.setItem(key, serialized)
			.then(() => {
				console.log("AsyncStorage.setItem success");
				if (callBack) callBack("Success");
			})
			.catch((error) => {
				console.log(error);
			});
	}

	static getFromStorage(key: string, callBack: any) {
		AsyncStorage.getItem(key).then((result) => {
			console.log("getFromStorage", result);
			if (callBack) callBack(result);
		});
	}

	saveTimeDetails(monthYearCode: string, timeData: WorkDayItem, callBack: any): void {
		// Get the month's data (this may or may not be there)
		let monthYearApplicationKey = this.getKeyForMonth(monthYearCode);
		this.getTimeDetails(monthYearCode, (monthDataJson: any) => {
			let monthData = {};

			if (monthDataJson != null) {
				monthData = monthDataJson;
			}

			// Update data set for the given month code.
			let dateNumber = moment(timeData.date).date();
			monthData[dateNumber.toString()] = timeData;

			// Put the full map back to Async store
			this.putInStorage(monthYearApplicationKey, monthData, callBack);
		});
	}

	getTimeDetails(monthYearCode: string, callBack: any): void {
		let monthYearApplicationKey = this.getKeyForMonth(monthYearCode);
		AsyncStorage.getItem(monthYearApplicationKey).then((monthDataJson) => {
			let deserialized = JSON.parse(monthDataJson);
			if (callBack) callBack(deserialized);
		});
	}

	static getMonthYearCodeFromDate(fullDate: string): string {
		// CAUTION: Changing the format order or casing will result in duplicate entries in storage.
		const code = moment(fullDate).format("YYYYMMM").toUpperCase();
		return code;
	}

	getKeyForMonth(monthYearCode: string): string {
		return STORAGE_KEY + "_" + monthYearCode;
	}

	static getFormattedDateForDisplay(isoDate: string) {
		return moment(isoDate).format("DD-MMM-YYYY");
	}

	static clearLocalStorage() {
		AsyncStorage.clear();
	}
}

type WorkDayItem = {
	date: string;
	dayType: string;
	timeIn: string;
	timeOut: string;
	remarks: string;
};
