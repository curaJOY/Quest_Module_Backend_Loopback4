import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {QuestCheckin, QuestCheckinRelations} from '../models';

export class QuestCheckinRepository extends DefaultCrudRepository<
  QuestCheckin,
  typeof QuestCheckin.prototype.id,
  QuestCheckinRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(QuestCheckin, dataSource);
  }
}
