export interface GameData {
	id: string;
	endTime: number;
	initialTime: number;
	userId: string;
	estimatedLocation?: {
	latitude: number;
	longitude: number;
	};
	guessedLocation?: {
			latitude: number;
			longitude: number;
	};
}

export interface UserData {
	id: string;
	name: string;
}
