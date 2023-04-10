import { submit, submitMutation } from './request';
import { createATagQuery, fetchAllTags } from './request/query';
import orderBy from 'lodash.orderby';
// get all tags
const getAllTags = () => {
  return submit(fetchAllTags).then((res) => {
    return orderBy(res, [(tag) => tag.name.toLowerCase()], ['asc']);
  });
};

const createATag = (tagObject) => {
  return submitMutation(createATagQuery, tagObject);
};

export const Tags = {
  getAllTags,
  createATag
};
