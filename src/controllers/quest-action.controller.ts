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
import {QuestAction} from '../models';
import {QuestActionRepository} from '../repositories';

export class QuestActionController {
  constructor(
    @repository(QuestActionRepository)
    public questActionRepository : QuestActionRepository,
  ) {}

  @post('/quest-actions')
  @response(200, {
    description: 'QuestAction model instance',
    content: {'application/json': {schema: getModelSchemaRef(QuestAction)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(QuestAction, {
            title: 'NewQuestAction',
            exclude: ['id'],
          }),
        },
      },
    })
    questAction: Omit<QuestAction, 'id'>,
  ): Promise<QuestAction> {
    return this.questActionRepository.create(questAction);
  }

  @get('/quest-actions/count')
  @response(200, {
    description: 'QuestAction model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(QuestAction) where?: Where<QuestAction>,
  ): Promise<Count> {
    return this.questActionRepository.count(where);
  }

  @get('/quest-actions')
  @response(200, {
    description: 'Array of QuestAction model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(QuestAction, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(QuestAction) filter?: Filter<QuestAction>,
  ): Promise<QuestAction[]> {
    return this.questActionRepository.find(filter);
  }

  @patch('/quest-actions')
  @response(200, {
    description: 'QuestAction PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(QuestAction, {partial: true}),
        },
      },
    })
    questAction: QuestAction,
    @param.where(QuestAction) where?: Where<QuestAction>,
  ): Promise<Count> {
    return this.questActionRepository.updateAll(questAction, where);
  }

  @get('/quest-actions/{id}')
  @response(200, {
    description: 'QuestAction model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(QuestAction, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(QuestAction, {exclude: 'where'}) filter?: FilterExcludingWhere<QuestAction>
  ): Promise<QuestAction> {
    return this.questActionRepository.findById(id, filter);
  }

  @patch('/quest-actions/{id}')
  @response(204, {
    description: 'QuestAction PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(QuestAction, {partial: true}),
        },
      },
    })
    questAction: QuestAction,
  ): Promise<void> {
    await this.questActionRepository.updateById(id, questAction);
  }

  @put('/quest-actions/{id}')
  @response(204, {
    description: 'QuestAction PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() questAction: QuestAction,
  ): Promise<void> {
    await this.questActionRepository.replaceById(id, questAction);
  }

  @del('/quest-actions/{id}')
  @response(204, {
    description: 'QuestAction DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.questActionRepository.deleteById(id);
  }
}
