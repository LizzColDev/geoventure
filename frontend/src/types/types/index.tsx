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
  gamesWon: number;
  exists: boolean;
  id: string;
  endTime: number;
  initialTime: number;
  userId: string;
  guessedLocation?: Coordinates;
  streetViewInfo: StreetViewInfo;
  isGuessCorrect?: boolean;
}

export interface UserData {
  id: string;
  name: string;
}
