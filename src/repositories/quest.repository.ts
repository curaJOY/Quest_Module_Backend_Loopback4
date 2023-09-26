import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Quest, QuestRelations} from '../models';

export class QuestRepository extends DefaultCrudRepository<
  Quest,
  typeof Quest.prototype.id,
  QuestRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Quest, dataSource);
  }
}
