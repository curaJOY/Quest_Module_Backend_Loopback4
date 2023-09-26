// src/models/quest-participants.model.ts

import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mysql: {
      schema: 'quest',
      table: 'quest_participants', // Explicitly specify the table name
    },
  }
})
export class QuestParticipant extends Entity {
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
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['notified', 'accepted', 'denied'],
    },
  })
  status: string;

  @property({
    type: 'number',
    required: true,
  })
  performance: number;

  @property({
    type: 'date',
    default: '$now',
  })
  updated_at?: string;

  constructor(data?: Partial<QuestParticipant>) {
    super(data);
  }
}

export interface QuestParticipantRelations {
  // describe navigational properties here
}

export type QuestParticipantWithRelations = QuestParticipant & QuestParticipantRelations;
