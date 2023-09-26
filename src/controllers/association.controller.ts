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
import {QuestActionAssociation} from '../models';
import {QuestActionAssociationRepository} from '../repositories';

export class AssociationController {
  constructor(
    @repository(QuestActionAssociationRepository)
    public questActionAssociationRepository : QuestActionAssociationRepository,
  ) {}

  @post('/quest-action-associations')
  @response(200, {
    description: 'QuestActionAssociation model instance',
    content: {'application/json': {schema: getModelSchemaRef(QuestActionAssociation)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(QuestActionAssociation, {
            title: 'NewQuestActionAssociation',
            exclude: ['id'],
          }),
        },
      },
    })
    questActionAssociation: Omit<QuestActionAssociation, 'id'>,
  ): Promise<QuestActionAssociation> {
    return this.questActionAssociationRepository.create(questActionAssociation);
  }

  @get('/quest-action-associations/count')
  @response(200, {
    description: 'QuestActionAssociation model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(QuestActionAssociation) where?: Where<QuestActionAssociation>,
  ): Promise<Count> {
    return this.questActionAssociationRepository.count(where);
  }

  @get('/quest-action-associations')
  @response(200, {
    description: 'Array of QuestActionAssociation model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(QuestActionAssociation, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(QuestActionAssociation) filter?: Filter<QuestActionAssociation>,
  ): Promise<QuestActionAssociation[]> {
    return this.questActionAssociationRepository.find(filter);
  }

  @patch('/quest-action-associations')
  @response(200, {
    description: 'QuestActionAssociation PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(QuestActionAssociation, {partial: true}),
        },
      },
    })
    questActionAssociation: QuestActionAssociation,
    @param.where(QuestActionAssociation) where?: Where<QuestActionAssociation>,
  ): Promise<Count> {
    return this.questActionAssociationRepository.updateAll(questActionAssociation, where);
  }

  @get('/quest-action-associations/{id}')
  @response(200, {
    description: 'QuestActionAssociation model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(QuestActionAssociation, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(QuestActionAssociation, {exclude: 'where'}) filter?: FilterExcludingWhere<QuestActionAssociation>
  ): Promise<QuestActionAssociation> {
    return this.questActionAssociationRepository.findById(id, filter);
  }

  @patch('/quest-action-associations/{id}')
  @response(204, {
    description: 'QuestActionAssociation PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(QuestActionAssociation, {partial: true}),
        },
      },
    })
    questActionAssociation: QuestActionAssociation,
  ): Promise<void> {
    await this.questActionAssociationRepository.updateById(id, questActionAssociation);
  }

  @put('/quest-action-associations/{id}')
  @response(204, {
    description: 'QuestActionAssociation PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() questActionAssociation: QuestActionAssociation,
  ): Promise<void> {
    await this.questActionAssociationRepository.replaceById(id, questActionAssociation);
  }

  @del('/quest-action-associations/{id}')
  @response(204, {
    description: 'QuestActionAssociation DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.questActionAssociationRepository.deleteById(id);
  }
}
