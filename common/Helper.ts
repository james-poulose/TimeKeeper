import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";

const STORAGE_KEY = "@TIMEKEEPER";

export default class Helper {
	static doSomething = (): void => {
		console.log("fdfd");
	};

	putInStorage(key: string, data: any) {
		// Put the full map back to Async store
		let serialized = JSON.stringify(data);
		AsyncStorage.setItem(key, serialized)
			.then(() => {
				console.log("AsyncStorage.setItem success");
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

	saveTimeDetails(monthYearCode: string, timeData: WorkDayItem): void {
		// Get the month's data (this may or may not be there)
		let monthYearApplicationKey = this.getKeyForMonth(monthYearCode);
		this.getTimeDetails(monthYearCode, (monthDataJsonString: any) => {
			let monthData: Map<string, WorkDayItem>;
			console.log("#100", Object.keys(monthDataJsonString));
			console.log("#200", monthDataJsonString.constructor === Object);
			if (Object.keys(monthDataJsonString).length === 0 && monthDataJsonString.constructor === Object) { 
				console.log("Hambada villaaa...!!");
			}
			if (monthDataJsonString != null) {
				console.log("monthDataJsonString", monthDataJsonString);
				const parseData = JSON.parse(monthDataJsonString);
				monthData = new Map(parseData);
			} else {
				monthData = new Map<string, WorkDayItem>();
			}
			// Update data set for the given month code.
			let dateNumber = moment(timeData.date).date();
			console.log("dateNumber", dateNumber);
			monthData.set(dateNumber.toString(), timeData);

			// Put the full map back to Async store
			this.putInStorage(monthYearApplicationKey, monthData);
		});
	}

	getTimeDetails(monthYearCode: string, callBack: any): void {
		let monthYearApplicationKey = this.getKeyForMonth(monthYearCode);
		AsyncStorage.getItem(monthYearApplicationKey).then((data) => {
			console.log("getTimeDetails", data);
			if (callBack) callBack(data);
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
}

type WorkDayItem = {
	date: string;
	dayType: string;
	timeIn: string;
	timeOut: string;
	remarks: string;
};
