// src/models/quest-instance.model.ts

import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mysql: {
      schema: 'quest',
      table: 'quest_instance', // Explicitly specify the table name
    },
  }
})
export class QuestInstance extends Entity {
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
  questId: number;

  @property({
    type: 'date',
    required: true,
  })
  startDate: string;

  @property({
    type: 'date',
    required: true,
  })
  endDate: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['frequency', 'count'],
    },
  })
  goalType: string;

  @property({
    type: 'number',
    required: true,
  })
  goalValue: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['week', 'month', 'year'],
    },
  })
  goalUnit: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['active', 'stopped', 'finished'],
    },
  })
  status: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['collect', 'issued'],
    },
  })
  rewardStatus: string;

  @property({
    type: 'string',
    required: false,
    default: 'Self',
    jsonSchema: {
      enum: [
        'Self', 'ParentGuardian', 'Child', 'Grandchild', 'NieceNephew', 'Cousin',
        'Friend', 'GrandParent', 'UncleAunt', 'Educator', 'Provider', 'Spouse', 'Other'
      ],
    },
  })
  privacyOption: string;

  @property({
    type: 'number',
  })
  createdBy?: number;

  @property({
    type: 'date',
    default: '$now',
  })
  updatedAt?: string;

  constructor(data?: Partial<QuestInstance>) {
    super(data);
  }
}

export interface QuestInstanceRelations {
  // describe navigational properties here
}

export type QuestInstanceWithRelations = QuestInstance & QuestInstanceRelations;
