import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Action, ActionRelations} from '../models';

export class ActionRepository extends DefaultCrudRepository<
  Action,
  typeof Action.prototype.id,
  ActionRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Action, dataSource);
  }
}
