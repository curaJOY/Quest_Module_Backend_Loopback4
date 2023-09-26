import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mysql: {
      schema: 'quest',
      table: 'quest_action_associations', // Explicitly specify the table name
    }
  }
})
export class QuestActionAssociation extends Entity {
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
    default: () => new Date(),
  })
  updated_at?: Date;

  @property({
    type: 'number',
    required: true,
  })
  created_by: number;

  constructor(data?: Partial<QuestActionAssociation>) {
    super(data);
  }
}

export interface QuestActionAssociationRelations {
  // describe navigational properties here
}

export type QuestActionAssociationWithRelations = QuestActionAssociation & QuestActionAssociationRelations;
