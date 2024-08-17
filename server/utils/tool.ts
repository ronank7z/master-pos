export function convertTime(date: any) {
	let dt = date.toISOString().split("T");
	let convertTime = dt[0] + " " + dt[1].slice(0, 8);
	return convertTime;
}
