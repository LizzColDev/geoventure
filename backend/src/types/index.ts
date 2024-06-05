export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface StreetViewInfo {
  initialLocation: Coordinates;
  namePlace?: string;
}

export interface GameData {
  exists: boolean;
  id: string;
  endTime: number;
  initialTime: number;
  userId: string;
  gamesWon: number;
  guessedLocation?: Coordinates;
	streetViewInfo?: StreetViewInfo;
}

export interface UserData {
  exists: boolean;
  id: string;
  name: string;
}
