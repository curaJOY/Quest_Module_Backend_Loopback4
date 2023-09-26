// src/models/quest-comments.model.ts

import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mysql: {
      schema: 'quest',
      table: 'quest_comments', // Explicitly specify the table name
    },
  }
})
export class QuestComment extends Entity {
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
  user_id: number;

  @property({
    type: 'string',
    required: true,
  })
  comment: string;

  @property({
    type: 'date',
    default: '$now',
  })
  updated_at?: string;

  constructor(data?: Partial<QuestComment>) {
    super(data);
  }
}

export interface QuestCommentRelations {
  // describe navigational properties here
}

export type QuestCommentWithRelations = QuestComment & QuestCommentRelations;
