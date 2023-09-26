import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mysql: {
      schema: 'quest',
      table: 'quests', // Explicitly specify the table name
    },
  }
})
export class Quest extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    required: false,
  })
  totalCount?: number;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  updated_at?: Date;

  @property({
    type: 'number',
    required: true,
  })
  created_by: number;

  constructor(data?: Partial<Quest>) {
    super(data);
  }
}

export interface QuestRelations {
  // describe navigational properties here
}

export type QuestWithRelations = Quest & QuestRelations;
