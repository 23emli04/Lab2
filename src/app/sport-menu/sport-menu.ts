import { Component, input, output } from '@angular/core';
import { Sport } from '../types'

@Component({
  selector: 'app-sport-menu',
  imports: [],
  templateUrl: './sport-menu.html',
  styleUrl: './sport-menu.css'
})
export class SportMenu {
  // Vald sport (valfri) som input – gör att vi kan markera aktiv knapp
  selectedSportIn = input<Sport | undefined>();

  //Hårdkodad sport lista (skulle nog passa bättre i en config fil eller dyl)
  sports: { key: Sport; label: string}[] = [
    { key: 'football', label: 'Fotboll'},
    { key: 'icehockey', label: 'Ishockey'},
    { key: 'floorball', label: 'Innebandy'},
  ]

  // Vi skickar vald sport ut till förälder via signal.
  // Den skickas vidare till LeagueList men även in igen hit via 'selectedSport'
  // för att kunna avgöra vilken knapp som klickats på.
  sportChangeOut = output<Sport>();
  pickSport(sport: Sport) {
    this.sportChangeOut.emit(sport);
  }
}
