import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Action} from '../models';
import {ActionRepository} from '../repositories';

export class ActionController {
  constructor(
    @repository(ActionRepository)
    public actionRepository : ActionRepository,
  ) {}

  @post('/actions')
  @response(200, {
    description: 'Action model instance',
    content: {'application/json': {schema: getModelSchemaRef(Action)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Action, {
            title: 'NewAction',
            exclude: ['id'],
          }),
        },
      },
    })
    action: Omit<Action, 'id'>,
  ): Promise<Action> {
    return this.actionRepository.create(action);
  }

  @get('/actions/count')
  @response(200, {
    description: 'Action model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Action) where?: Where<Action>,
  ): Promise<Count> {
    return this.actionRepository.count(where);
  }

  @get('/actions')
  @response(200, {
    description: 'Array of Action model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Action, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Action) filter?: Filter<Action>,
  ): Promise<Action[]> {
    return this.actionRepository.find(filter);
  }

  @patch('/actions')
  @response(200, {
    description: 'Action PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Action, {partial: true}),
        },
      },
    })
    action: Action,
    @param.where(Action) where?: Where<Action>,
  ): Promise<Count> {
    return this.actionRepository.updateAll(action, where);
  }

  @get('/actions/{id}')
  @response(200, {
    description: 'Action model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Action, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Action, {exclude: 'where'}) filter?: FilterExcludingWhere<Action>
  ): Promise<Action> {
    return this.actionRepository.findById(id, filter);
  }

  @patch('/actions/{id}')
  @response(204, {
    description: 'Action PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Action, {partial: true}),
        },
      },
    })
    action: Action,
  ): Promise<void> {
    await this.actionRepository.updateById(id, action);
  }

  @put('/actions/{id}')
  @response(204, {
    description: 'Action PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() action: Action,
  ): Promise<void> {
    await this.actionRepository.replaceById(id, action);
  }

  @del('/actions/{id}')
  @response(204, {
    description: 'Action DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.actionRepository.deleteById(id);
  }
}
