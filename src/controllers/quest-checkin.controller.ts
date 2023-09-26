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
import {QuestCheckin} from '../models';
import {QuestCheckinRepository} from '../repositories';

export class QuestCheckinController {
  constructor(
    @repository(QuestCheckinRepository)
    public questCheckinRepository : QuestCheckinRepository,
  ) {}

  @post('/quest-checkins')
  @response(200, {
    description: 'QuestCheckin model instance',
    content: {'application/json': {schema: getModelSchemaRef(QuestCheckin)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(QuestCheckin, {
            title: 'NewQuestCheckin',
            exclude: ['id'],
          }),
        },
      },
    })
    questCheckin: Omit<QuestCheckin, 'id'>,
  ): Promise<QuestCheckin> {
    return this.questCheckinRepository.create(questCheckin);
  }

  @get('/quest-checkins/count')
  @response(200, {
    description: 'QuestCheckin model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(QuestCheckin) where?: Where<QuestCheckin>,
  ): Promise<Count> {
    return this.questCheckinRepository.count(where);
  }

  @get('/quest-checkins')
  @response(200, {
    description: 'Array of QuestCheckin model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(QuestCheckin, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(QuestCheckin) filter?: Filter<QuestCheckin>,
  ): Promise<QuestCheckin[]> {
    return this.questCheckinRepository.find(filter);
  }

  @patch('/quest-checkins')
  @response(200, {
    description: 'QuestCheckin PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(QuestCheckin, {partial: true}),
        },
      },
    })
    questCheckin: QuestCheckin,
    @param.where(QuestCheckin) where?: Where<QuestCheckin>,
  ): Promise<Count> {
    return this.questCheckinRepository.updateAll(questCheckin, where);
  }

  @get('/quest-checkins/{id}')
  @response(200, {
    description: 'QuestCheckin model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(QuestCheckin, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(QuestCheckin, {exclude: 'where'}) filter?: FilterExcludingWhere<QuestCheckin>
  ): Promise<QuestCheckin> {
    return this.questCheckinRepository.findById(id, filter);
  }

  @patch('/quest-checkins/{id}')
  @response(204, {
    description: 'QuestCheckin PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(QuestCheckin, {partial: true}),
        },
      },
    })
    questCheckin: QuestCheckin,
  ): Promise<void> {
    await this.questCheckinRepository.updateById(id, questCheckin);
  }

  @put('/quest-checkins/{id}')
  @response(204, {
    description: 'QuestCheckin PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() questCheckin: QuestCheckin,
  ): Promise<void> {
    await this.questCheckinRepository.replaceById(id, questCheckin);
  }

  @del('/quest-checkins/{id}')
  @response(204, {
    description: 'QuestCheckin DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.questCheckinRepository.deleteById(id);
  }
}
