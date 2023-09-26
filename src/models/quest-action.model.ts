// src/models/quest-participants.model.ts

import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mysql: {
      schema: 'quest',
      table: 'quest_actions', // Explicitly specify the table name
    },
  }
})
export class QuestAction extends Entity {
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
  action_id: number;

  @property({
    type: 'date',
    default: '$now',
  })
  updated_at?: string;

  constructor(data?: Partial<QuestAction>) {
    super(data);
  }
}

export interface QuestActionRelations {
  // describe navigational properties here
}

export type QuestActionWithRelations = QuestAction & QuestActionRelations;
