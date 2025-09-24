import { Component, input, effect, output, signal, inject } from '@angular/core';
import { CommonModule} from '@angular/common';
import { Sport, League } from '../types';
import { SportsApiService } from '../services/sports-api-service'

@Component({
  selector: 'app-league-list',
  imports: [CommonModule],
  templateUrl: './league-list.html',
  styleUrl: './league-list.css'
})
export class LeagueList {
// Input (krävs) – signalbaserad
sportIn = input.required<Sport>();
 // Output – signalbaserad
 selectLeagueIdOut = output<number>();

 // Lokalt state
 leagues = signal<League[]>([]);
 loading = signal(false);
 error = signal<string | null>(null);

 // Injicering av beroende som sköter datahämtning
 private api = inject(SportsApiService);

 // Reagera på sport() med effect. Denna kod har även med felhantering och annat som
 // kommer behövas i Projektet men inte är helt nödvändigt för labben.
 constructor() {
  console.log("LeagueList konstruerad");
   effect((onCleanup) => {
     const s = this.sportIn();
     this.loading.set(true); this.error.set(null);
   
     const ctrl = new AbortController();
     onCleanup(() => ctrl.abort()); // avbryt förra fetchen om sport ändras
   
     this.api.getLeagues(s, ctrl.signal).then(
       data => { this.leagues.set(data); this.loading.set(false); },
       err  => { if (err.name !== 'AbortError') { this.error.set('Kunde inte hämta ligor.'); this.loading.set(false); } }
     );
   });
 }
}