import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'files',
        data: { pageTitle: 'Files' },
        loadChildren: () => import('./files/files.module').then(m => m.FilesModule),
      },
      {
        path: 'events',
        data: { pageTitle: 'Events' },
        loadChildren: () => import('./events/events.module').then(m => m.EventsModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
