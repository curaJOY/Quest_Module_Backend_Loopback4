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
import {Quest} from '../models';
import {QuestRepository} from '../repositories';

export class QuestController {
  constructor(
    @repository(QuestRepository)
    public questRepository : QuestRepository,
  ) {}

  @post('/quests')
  @response(200, {
    description: 'Quest model instance',
    content: {'application/json': {schema: getModelSchemaRef(Quest)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Quest, {
            title: 'NewQuest',
            exclude: ['id'],
          }),
        },
      },
    })
    quest: Omit<Quest, 'id'>,
  ): Promise<Quest> {
    return this.questRepository.create(quest);
  }

  @get('/quests/count')
  @response(200, {
    description: 'Quest model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Quest) where?: Where<Quest>,
  ): Promise<Count> {
    return this.questRepository.count(where);
  }

  @get('/quests')
  @response(200, {
    description: 'Array of Quest model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Quest, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Quest) filter?: Filter<Quest>,
  ): Promise<Quest[]> {
    return this.questRepository.find(filter);
  }

  @patch('/quests')
  @response(200, {
    description: 'Quest PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Quest, {partial: true}),
        },
      },
    })
    quest: Quest,
    @param.where(Quest) where?: Where<Quest>,
  ): Promise<Count> {
    return this.questRepository.updateAll(quest, where);
  }

  @get('/quests/{id}')
  @response(200, {
    description: 'Quest model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Quest, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Quest, {exclude: 'where'}) filter?: FilterExcludingWhere<Quest>
  ): Promise<Quest> {
    return this.questRepository.findById(id, filter);
  }

  @patch('/quests/{id}')
  @response(204, {
    description: 'Quest PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Quest, {partial: true}),
        },
      },
    })
    quest: Quest,
  ): Promise<void> {
    await this.questRepository.updateById(id, quest);
  }

  @put('/quests/{id}')
  @response(204, {
    description: 'Quest PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() quest: Quest,
  ): Promise<void> {
    await this.questRepository.replaceById(id, quest);
  }

  @del('/quests/{id}')
  @response(204, {
    description: 'Quest DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.questRepository.deleteById(id);
  }
}
