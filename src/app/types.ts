export type Sport = 'football' | 'icehockey' | 'floorball';

export interface League {
  id: number;           // Everysport "id"
  name: string;
  country?: string;     // inte alltid i svaret – låt vara optional
  sportId: number;      // t.ex. 10
  sportName?: string;   // "Fotboll"
}

export interface Team {
  id: number;
  name: string;
  logo?: string;
  leagueId: number;
}
