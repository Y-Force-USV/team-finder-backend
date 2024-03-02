import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Organization } from '../organizations/organization.entity';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn()
  department_id: number;

  @Column()
  name: string;

  //PASUL 1
  //@ManyToOne - un decorator (funcție specială în Typescript) care adaugă metadate suplimentare proprietății sau clasei
  //pe care este aplicată. Mulți către unu înseamnă că multe proiecte pot fi asociate cu o singură organizație
  //PASUL 2
  // - primul argument al decoratorului '@ManyToOne' și este o funcție care returnează clasa entității cu care 'Project'
  //   are o relație, adică 'Organization'
  //Înseamnă că multe instanțe ale entității 'Project' pot fi legate de o singuă instanță a entității 'Organization'
  @ManyToOne(() => Organization)
  organization: Organization;
}
