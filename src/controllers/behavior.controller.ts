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
import {Behavior} from '../models';
import {BehaviorRepository} from '../repositories';

export class BehaviorController {
  constructor(
    @repository(BehaviorRepository)
    public behaviorRepository : BehaviorRepository,
  ) {}

  @post('/behaviors')
  @response(200, {
    description: 'Behavior model instance',
    content: {'application/json': {schema: getModelSchemaRef(Behavior)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Behavior, {
            title: 'NewBehavior',
            exclude: ['id'],
          }),
        },
      },
    })
    behavior: Omit<Behavior, 'id'>,
  ): Promise<Behavior> {
    return this.behaviorRepository.create(behavior);
  }

  @get('/behaviors/count')
  @response(200, {
    description: 'Behavior model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Behavior) where?: Where<Behavior>,
  ): Promise<Count> {
    return this.behaviorRepository.count(where);
  }

  @get('/behaviors')
  @response(200, {
    description: 'Array of Behavior model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Behavior, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Behavior) filter?: Filter<Behavior>,
  ): Promise<Behavior[]> {
    return this.behaviorRepository.find(filter);
  }

  @patch('/behaviors')
  @response(200, {
    description: 'Behavior PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Behavior, {partial: true}),
        },
      },
    })
    behavior: Behavior,
    @param.where(Behavior) where?: Where<Behavior>,
  ): Promise<Count> {
    return this.behaviorRepository.updateAll(behavior, where);
  }

  @get('/behaviors/{id}')
  @response(200, {
    description: 'Behavior model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Behavior, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Behavior, {exclude: 'where'}) filter?: FilterExcludingWhere<Behavior>
  ): Promise<Behavior> {
    return this.behaviorRepository.findById(id, filter);
  }

  @patch('/behaviors/{id}')
  @response(204, {
    description: 'Behavior PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Behavior, {partial: true}),
        },
      },
    })
    behavior: Behavior,
  ): Promise<void> {
    await this.behaviorRepository.updateById(id, behavior);
  }

  @put('/behaviors/{id}')
  @response(204, {
    description: 'Behavior PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() behavior: Behavior,
  ): Promise<void> {
    await this.behaviorRepository.replaceById(id, behavior);
  }

  @del('/behaviors/{id}')
  @response(204, {
    description: 'Behavior DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.behaviorRepository.deleteById(id);
  }
}
