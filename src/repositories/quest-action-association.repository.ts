import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {QuestActionAssociation, QuestActionAssociationRelations} from '../models';

export class QuestActionAssociationRepository extends DefaultCrudRepository<
  QuestActionAssociation,
  typeof QuestActionAssociation.prototype.id,
  QuestActionAssociationRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(QuestActionAssociation, dataSource);
  }
}
