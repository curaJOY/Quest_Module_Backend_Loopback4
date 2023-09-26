import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {QuestParticipant, QuestParticipantRelations} from '../models';

export class QuestParticipantRepository extends DefaultCrudRepository<
  QuestParticipant,
  typeof QuestParticipant.prototype.id,
  QuestParticipantRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(QuestParticipant, dataSource);
  }
}
