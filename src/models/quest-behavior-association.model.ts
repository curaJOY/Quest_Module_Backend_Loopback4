import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mysql: {
      schema: 'quest',
      table: 'quest_behavior_associations', // Explicitly specify the table name
    },
  }
})
export class QuestBehaviorAssociation extends Entity {
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

  constructor(data?: Partial<QuestBehaviorAssociation>) {
    super(data);
  }
}

export interface QuestBehaviorAssociationRelations {
  // describe navigational properties here
}

export type QuestBehaviorAssociationWithRelations = QuestBehaviorAssociation & QuestBehaviorAssociationRelations;
