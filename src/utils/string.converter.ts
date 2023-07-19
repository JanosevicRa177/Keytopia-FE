export function normalizeNames(names: string[]): string[] {
	let normalizedNames: string[] = [];
	names.forEach((name) => {
		normalizedNames.push(normalizeString(name));
	});
	return normalizedNames;
}

function normalizeString(str: string): string {
	const words = str.match(/[A-Za-z][a-z]*/g);
	if (!words) return "";

	const firstWord = words[0];
	const lowerCaseWords = words
		.slice(1)
		.map((word) => {
			const lowercasedWord = word.toLowerCase();
			const formattedWord =
				lowercasedWord.charAt(0).toLowerCase() +
				lowercasedWord.slice(1);
			return formattedWord;
		})
		.join(" ");
	const capitalizedFirstWord =
		firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
	const translatedStr = capitalizedFirstWord + " " + lowerCaseWords;
	return translatedStr;
}

export function normalizeEnum(str: string): string {
	const words = str.toLowerCase().split("_");
	const convertedWords = words.map(
		(word) => word.charAt(0).toUpperCase() + word.slice(1)
	);
	return convertedWords.join(" ");
}
