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
import {QuestParticipant} from '../models';
import {QuestParticipantRepository} from '../repositories';

export class QuestParticipantController {
  constructor(
    @repository(QuestParticipantRepository)
    public questParticipantRepository : QuestParticipantRepository,
  ) {}

  @post('/quest-participants')
  @response(200, {
    description: 'QuestParticipant model instance',
    content: {'application/json': {schema: getModelSchemaRef(QuestParticipant)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(QuestParticipant, {
            title: 'NewQuestParticipant',
            exclude: ['id'],
          }),
        },
      },
    })
    questParticipant: Omit<QuestParticipant, 'id'>,
  ): Promise<QuestParticipant> {
    return this.questParticipantRepository.create(questParticipant);
  }

  @get('/quest-participants/count')
  @response(200, {
    description: 'QuestParticipant model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(QuestParticipant) where?: Where<QuestParticipant>,
  ): Promise<Count> {
    return this.questParticipantRepository.count(where);
  }

  @get('/quest-participants')
  @response(200, {
    description: 'Array of QuestParticipant model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(QuestParticipant, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(QuestParticipant) filter?: Filter<QuestParticipant>,
  ): Promise<QuestParticipant[]> {
    return this.questParticipantRepository.find(filter);
  }

  @patch('/quest-participants')
  @response(200, {
    description: 'QuestParticipant PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(QuestParticipant, {partial: true}),
        },
      },
    })
    questParticipant: QuestParticipant,
    @param.where(QuestParticipant) where?: Where<QuestParticipant>,
  ): Promise<Count> {
    return this.questParticipantRepository.updateAll(questParticipant, where);
  }

  @get('/quest-participants/{id}')
  @response(200, {
    description: 'QuestParticipant model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(QuestParticipant, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(QuestParticipant, {exclude: 'where'}) filter?: FilterExcludingWhere<QuestParticipant>
  ): Promise<QuestParticipant> {
    return this.questParticipantRepository.findById(id, filter);
  }

  @patch('/quest-participants/{id}')
  @response(204, {
    description: 'QuestParticipant PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(QuestParticipant, {partial: true}),
        },
      },
    })
    questParticipant: QuestParticipant,
  ): Promise<void> {
    await this.questParticipantRepository.updateById(id, questParticipant);
  }

  @put('/quest-participants/{id}')
  @response(204, {
    description: 'QuestParticipant PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() questParticipant: QuestParticipant,
  ): Promise<void> {
    await this.questParticipantRepository.replaceById(id, questParticipant);
  }

  @del('/quest-participants/{id}')
  @response(204, {
    description: 'QuestParticipant DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.questParticipantRepository.deleteById(id);
  }
}
