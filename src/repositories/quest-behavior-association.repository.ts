import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {QuestBehaviorAssociation, QuestBehaviorAssociationRelations} from '../models';

export class QuestBehaviorAssociationRepository extends DefaultCrudRepository<
  QuestBehaviorAssociation,
  typeof QuestBehaviorAssociation.prototype.id,
  QuestBehaviorAssociationRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(QuestBehaviorAssociation, dataSource);
  }
}
