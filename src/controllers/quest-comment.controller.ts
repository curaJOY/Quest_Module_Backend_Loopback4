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
import {QuestComment} from '../models';
import {QuestCommentRepository} from '../repositories';

export class QuestCommentController {
  constructor(
    @repository(QuestCommentRepository)
    public questCommentRepository : QuestCommentRepository,
  ) {}

  @post('/quest-comments')
  @response(200, {
    description: 'QuestComment model instance',
    content: {'application/json': {schema: getModelSchemaRef(QuestComment)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(QuestComment, {
            title: 'NewQuestComment',
            exclude: ['id'],
          }),
        },
      },
    })
    questComment: Omit<QuestComment, 'id'>,
  ): Promise<QuestComment> {
    return this.questCommentRepository.create(questComment);
  }

  @get('/quest-comments/count')
  @response(200, {
    description: 'QuestComment model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(QuestComment) where?: Where<QuestComment>,
  ): Promise<Count> {
    return this.questCommentRepository.count(where);
  }

  @get('/quest-comments')
  @response(200, {
    description: 'Array of QuestComment model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(QuestComment, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(QuestComment) filter?: Filter<QuestComment>,
  ): Promise<QuestComment[]> {
    return this.questCommentRepository.find(filter);
  }

  @patch('/quest-comments')
  @response(200, {
    description: 'QuestComment PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(QuestComment, {partial: true}),
        },
      },
    })
    questComment: QuestComment,
    @param.where(QuestComment) where?: Where<QuestComment>,
  ): Promise<Count> {
    return this.questCommentRepository.updateAll(questComment, where);
  }

  @get('/quest-comments/{id}')
  @response(200, {
    description: 'QuestComment model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(QuestComment, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(QuestComment, {exclude: 'where'}) filter?: FilterExcludingWhere<QuestComment>
  ): Promise<QuestComment> {
    return this.questCommentRepository.findById(id, filter);
  }

  @patch('/quest-comments/{id}')
  @response(204, {
    description: 'QuestComment PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(QuestComment, {partial: true}),
        },
      },
    })
    questComment: QuestComment,
  ): Promise<void> {
    await this.questCommentRepository.updateById(id, questComment);
  }

  @put('/quest-comments/{id}')
  @response(204, {
    description: 'QuestComment PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() questComment: QuestComment,
  ): Promise<void> {
    await this.questCommentRepository.replaceById(id, questComment);
  }

  @del('/quest-comments/{id}')
  @response(204, {
    description: 'QuestComment DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.questCommentRepository.deleteById(id);
  }
}
