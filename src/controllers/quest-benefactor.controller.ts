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
import {QuestBenefactory} from '../models';
import {QuestBenefactoryRepository} from '../repositories';

export class QuestBenefactorController {
  constructor(
    @repository(QuestBenefactoryRepository)
    public questBenefactoryRepository : QuestBenefactoryRepository,
  ) {}

  @post('/quest-benefactories')
  @response(200, {
    description: 'QuestBenefactory model instance',
    content: {'application/json': {schema: getModelSchemaRef(QuestBenefactory)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(QuestBenefactory, {
            title: 'NewQuestBenefactory',
            exclude: ['id'],
          }),
        },
      },
    })
    questBenefactory: Omit<QuestBenefactory, 'id'>,
  ): Promise<QuestBenefactory> {
    return this.questBenefactoryRepository.create(questBenefactory);
  }

  @get('/quest-benefactories/count')
  @response(200, {
    description: 'QuestBenefactory model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(QuestBenefactory) where?: Where<QuestBenefactory>,
  ): Promise<Count> {
    return this.questBenefactoryRepository.count(where);
  }

  @get('/quest-benefactories')
  @response(200, {
    description: 'Array of QuestBenefactory model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(QuestBenefactory, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(QuestBenefactory) filter?: Filter<QuestBenefactory>,
  ): Promise<QuestBenefactory[]> {
    return this.questBenefactoryRepository.find(filter);
  }

  @patch('/quest-benefactories')
  @response(200, {
    description: 'QuestBenefactory PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(QuestBenefactory, {partial: true}),
        },
      },
    })
    questBenefactory: QuestBenefactory,
    @param.where(QuestBenefactory) where?: Where<QuestBenefactory>,
  ): Promise<Count> {
    return this.questBenefactoryRepository.updateAll(questBenefactory, where);
  }

  @get('/quest-benefactories/{id}')
  @response(200, {
    description: 'QuestBenefactory model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(QuestBenefactory, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(QuestBenefactory, {exclude: 'where'}) filter?: FilterExcludingWhere<QuestBenefactory>
  ): Promise<QuestBenefactory> {
    return this.questBenefactoryRepository.findById(id, filter);
  }

  @patch('/quest-benefactories/{id}')
  @response(204, {
    description: 'QuestBenefactory PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(QuestBenefactory, {partial: true}),
        },
      },
    })
    questBenefactory: QuestBenefactory,
  ): Promise<void> {
    await this.questBenefactoryRepository.updateById(id, questBenefactory);
  }

  @put('/quest-benefactories/{id}')
  @response(204, {
    description: 'QuestBenefactory PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() questBenefactory: QuestBenefactory,
  ): Promise<void> {
    await this.questBenefactoryRepository.replaceById(id, questBenefactory);
  }

  @del('/quest-benefactories/{id}')
  @response(204, {
    description: 'QuestBenefactory DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.questBenefactoryRepository.deleteById(id);
  }
}
