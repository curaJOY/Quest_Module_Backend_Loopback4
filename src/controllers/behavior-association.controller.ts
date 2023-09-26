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
import {QuestBehaviorAssociation} from '../models';
import {QuestBehaviorAssociationRepository} from '../repositories';

export class BehaviorAssociationController {
  constructor(
    @repository(QuestBehaviorAssociationRepository)
    public questBehaviorAssociationRepository : QuestBehaviorAssociationRepository,
  ) {}

  @post('/quest-behavior-associations')
  @response(200, {
    description: 'QuestBehaviorAssociation model instance',
    content: {'application/json': {schema: getModelSchemaRef(QuestBehaviorAssociation)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(QuestBehaviorAssociation, {
            title: 'NewQuestBehaviorAssociation',
            exclude: ['id'],
          }),
        },
      },
    })
    questBehaviorAssociation: Omit<QuestBehaviorAssociation, 'id'>,
  ): Promise<QuestBehaviorAssociation> {
    return this.questBehaviorAssociationRepository.create(questBehaviorAssociation);
  }

  @get('/quest-behavior-associations/count')
  @response(200, {
    description: 'QuestBehaviorAssociation model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(QuestBehaviorAssociation) where?: Where<QuestBehaviorAssociation>,
  ): Promise<Count> {
    return this.questBehaviorAssociationRepository.count(where);
  }

  @get('/quest-behavior-associations')
  @response(200, {
    description: 'Array of QuestBehaviorAssociation model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(QuestBehaviorAssociation, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(QuestBehaviorAssociation) filter?: Filter<QuestBehaviorAssociation>,
  ): Promise<QuestBehaviorAssociation[]> {
    return this.questBehaviorAssociationRepository.find(filter);
  }

  @patch('/quest-behavior-associations')
  @response(200, {
    description: 'QuestBehaviorAssociation PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(QuestBehaviorAssociation, {partial: true}),
        },
      },
    })
    questBehaviorAssociation: QuestBehaviorAssociation,
    @param.where(QuestBehaviorAssociation) where?: Where<QuestBehaviorAssociation>,
  ): Promise<Count> {
    return this.questBehaviorAssociationRepository.updateAll(questBehaviorAssociation, where);
  }

  @get('/quest-behavior-associations/{id}')
  @response(200, {
    description: 'QuestBehaviorAssociation model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(QuestBehaviorAssociation, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(QuestBehaviorAssociation, {exclude: 'where'}) filter?: FilterExcludingWhere<QuestBehaviorAssociation>
  ): Promise<QuestBehaviorAssociation> {
    return this.questBehaviorAssociationRepository.findById(id, filter);
  }

  @patch('/quest-behavior-associations/{id}')
  @response(204, {
    description: 'QuestBehaviorAssociation PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(QuestBehaviorAssociation, {partial: true}),
        },
      },
    })
    questBehaviorAssociation: QuestBehaviorAssociation,
  ): Promise<void> {
    await this.questBehaviorAssociationRepository.updateById(id, questBehaviorAssociation);
  }

  @put('/quest-behavior-associations/{id}')
  @response(204, {
    description: 'QuestBehaviorAssociation PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() questBehaviorAssociation: QuestBehaviorAssociation,
  ): Promise<void> {
    await this.questBehaviorAssociationRepository.replaceById(id, questBehaviorAssociation);
  }

  @del('/quest-behavior-associations/{id}')
  @response(204, {
    description: 'QuestBehaviorAssociation DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.questBehaviorAssociationRepository.deleteById(id);
  }
}
