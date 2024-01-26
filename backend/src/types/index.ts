export interface GameData {
	exists: boolean;
	id: string;
	endTime: number;
	initialTime: number;
	userId: string;
	initialLocation?: {
	latitude: number;
	longitude: number;
	};
	guessedLocation?: {
			latitude: number;
			longitude: number;
	};
}

export interface UserData {
	exists: boolean;
	id: string;
	name: string;
}
