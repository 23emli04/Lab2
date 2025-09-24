import { Injectable } from '@angular/core';
import { API_BASE, USE_MOCK } from '../config/env';
import { League, Sport, Team } from '../types';

// --- Konfig: sportnamn -> Everysport sportId ---
const SPORT_ID: Record<Sport, number> = {
  football: 10,       // Fotboll
  icehockey: 2,       // Ishockey
  floorball: 4       // Innebandy
};

// Säsong (om du vill filtrera – kan göras valfritt/parametriserat)
const DEFAULT_SEASON = '2022';
const DEFAULT_SEASON_ISHOCKEY = '2022-2023';
const APIKEY = '';

@Injectable({ providedIn: 'root' })
export class SportsApiService {
  // ---- MOCK (workshop) ----
  private mockLeagues: League[] = [
    { id: 124439, name: 'Allsvenskan', country: 'SE', sportId: 10, sportName: 'Fotboll' },
    { id: 123935, name: 'Damallsvenskan', country: 'SE', sportId: 10, sportName: 'Fotboll' },
    { id: 125554, name: 'SDHL', country: 'SE', sportId: 2, sportName: 'Ishockey' },
    { id: 125472, name: 'SHL', country: 'SE', sportId: 2, sportName: 'Ishockey' },
  ];
  private mockTeams: Team[] = [
    { id: 9367, name: 'AIK',        logo: '', leagueId: 124439 },
    { id: 9368, name: 'Djurgården', logo: '', leagueId: 124439 },
    { id: 9739, name: 'AIK DFF',    logo: '', leagueId: 123935 },
    { id: 1171, name: 'Brynäs IF',    logo: '', leagueId: 125472 },
  ];

  /**
   * Hämta ligor för vald sport.
   * - MOCK: returnerar mockLeagues filtrerat på sportId
   * - API: Ej klart. Sista 'return' (tom lista) är ersättning för API anrop
   *    AbortSignal är förberett för att avbryta förfrågan om sport ändras under
   *    pågående hämtning.
   *    Den riktiga hämtningen fungerar på likartad vis - hämta alla ligor och 
   *    filtrera på sportId. Inte supereffektivt men så fungerar everysport
   */
  async getLeagues(sport: Sport, signal?: AbortSignal): Promise<League[]> {
    if (USE_MOCK) {
      //await sleep(200, signal);
      const sid = SPORT_ID[sport];
      return this.mockLeagues.filter(l => l.sportId === sid);
    }
    return <League[]>[];
  }
  /**
   * Hämta lag för en liga.
   */
  async getTeams(leagueId: number | string, signal?: AbortSignal): Promise<Team[]> {
    if (USE_MOCK) {
      //await sleep(200, signal);
      return this.mockTeams.filter(t => t.leagueId === Number(leagueId));
    }
    return <Team[]>[];
  }
}