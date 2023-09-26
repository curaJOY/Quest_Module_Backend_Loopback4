// src/models/quest-action-checkins.model.ts

import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mysql: {
      schema: 'quest',
      table: 'quest_action_checkins', // Explicitly specify the table name
    },
  }
})
export class QuestCheckin extends Entity {
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
  participant_id: number;

  @property({
    type: 'date',
    default: '$now',
  })
  updated_at?: string;

  constructor(data?: Partial<QuestCheckin>) {
    super(data);
  }
}

export interface QuestCheckinRelations {
  // describe navigational properties here
}

export type QuestCheckinWithRelations = QuestCheckin & QuestCheckinRelations;
