import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {QuestAction, QuestActionRelations} from '../models';

export class QuestActionRepository extends DefaultCrudRepository<
  QuestAction,
  typeof QuestAction.prototype.id,
  QuestActionRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(QuestAction, dataSource);
  }
}
