export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface StreetViewInfo {
  urlImage?: string;
  initialLocation: Coordinates;
  namePlace?: string;
}

export interface GameData {
  exists: boolean;
  id: string;
  endTime: number;
  initialTime: number;
  userId: string;
  guessedLocation?: Coordinates;
	streetViewInfo?: StreetViewInfo;
}

export interface UserData {
  exists: boolean;
  id: string;
  name: string;
}
