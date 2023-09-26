// Uncomment these imports to begin using these cool features!
import {inject} from '@loopback/core';
import {HttpErrors, get, param, post, requestBody} from '@loopback/rest';
import {QuestAction, QuestBenefactory, QuestInstance, QuestParticipant} from '../models';
import {QuestServiceService} from '../services/quest-service.service';

export class QuestServiceController {
  constructor(
    @inject('services.QuestService') private questService: QuestServiceService
  ) { }

  @post('/quest-instance')
  async createQuest(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              questInstance: {type: 'object'},
              actions: {type: 'array', items: {type: 'object'}},
              participants: {type: 'array', items: {type: 'object'}},
              benefactors: {type: 'array', items: {type: 'object'}},
            },
          },
        },
      },
    })
    data: {
      questInstance: QuestInstance,
      actions: QuestAction[],
      participants: QuestParticipant[],
      benefactors: QuestBenefactory[],
    }
  ): Promise<QuestInstance> {
    try {
      if (!data.questInstance) {
        throw new HttpErrors.BadRequest("questInstance data is missing");
      }

      //if (!data.questInstance || !data.participants || !data.benefactors) {
      //   throw new HttpErrors.BadRequest("Invalid request data");
      //}

      return await this.questService.createQuest(data);
    } catch (error) {
      if (error instanceof HttpErrors.HttpError) {
        throw error;
      }
      if (error.code && error.code === 'ER_DUP_ENTRY') {
        // this is just an example and depends on your database/error library
        throw new HttpErrors.Conflict('Duplicate entry');
      }
      // Other specific error checks...
      throw new HttpErrors.InternalServerError(`Error creating quest: ${error.message}`);
    }
  }

  @get('/quests-instance/{id}')
  async getQuestWithParticipantsAndBenefactors(
    @param.path.number('id') id: number
  ): Promise<any> {
    try {
      const result = await this.questService.getQuestWithParticipantsAndBenefactors(id);
      if (!result) {
        throw new HttpErrors.NotFound(`Quest with id ${id} not found`);
      }
      return result;
    } catch (error) {
      throw new HttpErrors.InternalServerError(`Error retrieving quest: ${error.message}`);
    }
  }

  @get('/quest-instances')
  async getAllQuestsWithParticipantsAndBenefactors(): Promise<any[]> {
    return this.questService.getAllQuestsWithParticipantsAndBenefactors();
  }

}
