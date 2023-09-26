import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mysql: {
      schema: 'quest',
      table: 'behaviors', // Explicitly specify the table name
    },
  }
})
export class Behavior extends Entity {
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
    type: 'date',
    default: () => new Date(),
  })
  updated_at?: Date;

  @property({
    type: 'number',
    required: true,
  })
  created_by: number;

  constructor(data?: Partial<Behavior>) {
    super(data);
  }
}

export interface BehaviorRelations {
  // describe navigational properties here
}

export type BehaviorWithRelations = Behavior & BehaviorRelations;
