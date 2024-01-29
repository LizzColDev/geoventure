export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface StreetViewOptions extends Coordinates {}

export interface GameData {
  exists: boolean;
  id: string;
  endTime: number;
  initialTime: number;
  userId: string;
  initialLocation?: Coordinates;
  guessedLocation?: Coordinates;
	streetViewImage?: string;
}

export interface UserData {
  exists: boolean;
  id: string;
  name: string;
}
