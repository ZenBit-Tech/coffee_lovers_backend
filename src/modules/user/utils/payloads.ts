import ProfileQuestionsDto from '@/modules/user/dto/profile-questions.dto';

const createUserProfilePayload = (
  payload: ProfileQuestionsDto,
): { userPayload: object; workPayload: object; eduPayload: object } => {
  const userPayload = {
    available_time: payload.available_time,
    description: payload.description,
    hourly_rate: payload.hourly_rate,
    position: payload.position,
  };
  const workPayload = {
    work_history_descr: payload.work_history_descr,
    work_history_from: payload.work_history_from,
    work_history_to: payload.work_history_to,
  };
  const eduPayload = {
    education_descr: payload.education_descr,
    education_from: payload.education_from,
    education_to: payload.education_to,
  };

  return { userPayload, workPayload, eduPayload };
};
