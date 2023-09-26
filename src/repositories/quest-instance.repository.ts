import {inject} from '@loopback/core';
import {DefaultTransactionalRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {QuestInstance, QuestInstanceRelations} from '../models';

export class QuestInstanceRepository extends DefaultTransactionalRepository<
  QuestInstance,
  typeof QuestInstance.prototype.id,
  QuestInstanceRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(QuestInstance, dataSource);
  }
}
