// src/models/quest-benefactors.model.ts

import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mysql: {
      schema: 'quest',
      table: 'quest_benefactors', // Explicitly specify the table name
    },
  }
})
export class QuestBenefactory extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  quest_id: number;

  @property({
    type: 'number',
    required: true,
  })
  benefactor_id: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['notified', 'accepted', 'denied'],
    },
  })
  status: string;

  @property({
    type: 'date',
    default: '$now',
  })
  updated_at?: string;

  constructor(data?: Partial<QuestBenefactory>) {
    super(data);
  }
}

export interface QuestBenefactoryRelations {
  // describe navigational properties here
}

export type QuestBenefactoryWithRelations = QuestBenefactory & QuestBenefactoryRelations;
