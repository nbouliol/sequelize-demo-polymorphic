/* eslint-disable */
import {
  CollectionCustomizer,
  TAggregation,
  TConditionTree,
  TPaginatedFilter,
  TPartialRow,
  TSortClause
} from '@forestadmin/agent';

export type CommentCustomizer = CollectionCustomizer<Schema, 'comment'>;
export type CommentRecord = TPartialRow<Schema, 'comment'>;
export type CommentConditionTree = TConditionTree<Schema, 'comment'>;
export type CommentFilter = TPaginatedFilter<Schema, 'comment'>;
export type CommentSortClause = TSortClause<Schema, 'comment'>;
export type CommentAggregation = TAggregation<Schema, 'comment'>;

export type ImageCustomizer = CollectionCustomizer<Schema, 'image'>;
export type ImageRecord = TPartialRow<Schema, 'image'>;
export type ImageConditionTree = TConditionTree<Schema, 'image'>;
export type ImageFilter = TPaginatedFilter<Schema, 'image'>;
export type ImageSortClause = TSortClause<Schema, 'image'>;
export type ImageAggregation = TAggregation<Schema, 'image'>;

export type VideoCustomizer = CollectionCustomizer<Schema, 'video'>;
export type VideoRecord = TPartialRow<Schema, 'video'>;
export type VideoConditionTree = TConditionTree<Schema, 'video'>;
export type VideoFilter = TPaginatedFilter<Schema, 'video'>;
export type VideoSortClause = TSortClause<Schema, 'video'>;
export type VideoAggregation = TAggregation<Schema, 'video'>;


export type Schema = {
  'comment': {
    plain: {
      'id': number;
      'commentableId': number;
      'commentableType': string;
    };
    nested: {
      'image': Schema['image']['plain'] & Schema['image']['nested'];
      'video': Schema['video']['plain'] & Schema['video']['nested'];
    };
    flat: {
      'image:id': number;
      'image:title': string;
      'image:url': string;
      'video:id': number;
      'video:title': string;
      'video:text': string;
    };
  };
  'image': {
    plain: {
      'id': number;
      'title': string;
      'url': string;
    };
    nested: {};
    flat: {};
  };
  'video': {
    plain: {
      'id': number;
      'title': string;
      'text': string;
    };
    nested: {};
    flat: {};
  };
};
