import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {QuestBenefactory, QuestBenefactoryRelations} from '../models';

export class QuestBenefactoryRepository extends DefaultCrudRepository<
  QuestBenefactory,
  typeof QuestBenefactory.prototype.id,
  QuestBenefactoryRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(QuestBenefactory, dataSource);
  }
}
