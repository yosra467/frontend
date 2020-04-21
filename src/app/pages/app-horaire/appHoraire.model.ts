import { Politique } from '../gerer-poli/gerer-politique.model';
import { Horaire } from '../horaire/horaire.model';

export class ApplicationHoraire{
    id:number;
    date:Date;
    horaire: Horaire;
    politique:Politique;
}