import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlanesController } from './controllers/planes.controller';
import { SuscripcionesController } from './controllers/suscripciones.controller';
import { PacientesController } from './controllers/pacientes.controller';
import { PsicologosController } from './controllers/psicologos.controller';
import { PacientesMatchingController } from './controllers/pacientes-matching.controller';

import { PlanesService } from './services/planes.service';
import { SuscripcionesService } from './services/suscripciones.service';
import { PacientesService } from './services/pacientes.service';
import { PsicologosService } from './services/psicologos.service';
import { PacientesMatchingService } from './services/pacientes-matching.service';

import { Plan } from '../common/entities/plan.entity';
import { Suscripcion } from '../common/entities/suscripcion.entity';
import { Paciente } from '../common/entities/paciente.entity';
import { Psicologo } from '../common/entities/psicologo.entity';
import { FichaSesion } from '../common/entities/ficha-sesion.entity';
import { User } from '../common/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Plan,
      Suscripcion,
      Paciente,
      Psicologo,
      FichaSesion,
      User,
    ]),
  ],
  controllers: [
    PlanesController,
    SuscripcionesController,
    PacientesController,
    PsicologosController,
    PacientesMatchingController,
  ],
  providers: [
    PlanesService,
    SuscripcionesService,
    PacientesService,
    PsicologosService,
    PacientesMatchingService,
  ],
  exports: [
    PlanesService,
    SuscripcionesService,
    PacientesService,
    PsicologosService,
    PacientesMatchingService,
  ],
})
export class GestionModule {}