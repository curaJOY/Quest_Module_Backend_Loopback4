import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Behavior, BehaviorRelations} from '../models';

export class BehaviorRepository extends DefaultCrudRepository<
  Behavior,
  typeof Behavior.prototype.id,
  BehaviorRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Behavior, dataSource);
  }
}
