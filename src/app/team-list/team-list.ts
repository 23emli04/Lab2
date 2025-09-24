import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, output, signal } from '@angular/core';
import { League, Team } from '../types';
import { SportsApiService } from '../services/sports-api-service';

@Component({
  selector: 'app-team-list',
  imports: [CommonModule],
  templateUrl: './team-list.html',
  styleUrl: './team-list.css'
})
export class TeamList {
  leagueIdIn = input.required<number | null>();

  teams = signal<Team[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  // Injicering av beroende som sköter datahämtning
  private api = inject(SportsApiService);
  constructor() {
    effect((onCleanup) => {
      const leagueIdIn = this.leagueIdIn();
      console.log("TeamList: leagueIdIn ändrades: ", leagueIdIn);
      this.loading.set(true); this.error.set(null);

      const ctrl = new AbortController();
      onCleanup(() => ctrl.abort()); // avbryt förra fetchen om league ändras
      if (leagueIdIn  == null) {
        this.teams.set([]);
        this.loading.set(false);
        return;
      }

      this.api.getTeams(leagueIdIn, ctrl.signal).then(
        data => { this.teams.set(data); this.loading.set(false); },
        err => { if (err.name !== 'AbortError') { this.error.set('Kunde inte hämta lag.'); this.loading.set(false); } }
      );

    });
  }
}