import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {QuestComment, QuestCommentRelations} from '../models';

export class QuestCommentRepository extends DefaultCrudRepository<
  QuestComment,
  typeof QuestComment.prototype.id,
  QuestCommentRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(QuestComment, dataSource);
  }
}
