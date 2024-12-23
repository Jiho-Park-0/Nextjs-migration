// export const PAGE_KEYS = {
//   byTitle: ({ groupId, title }: { groupId: number; title: string }) => ['pageByTitle', { groupId, title }] as const,
//   recentChangeList: ({ groupId }: { groupId: number }) => ['recentChangeList', { groupId }] as const,
//   searchKeyword: ({ groupId, keyword }: { groupId: number; keyword: string }) =>
//     ['searchKeyword', { groupId, keyword }] as const,
//   indexList: ({ groupId, pageId }: { groupId: number; pageId: number }) => ['indexList', { groupId, pageId }] as const,
//   isExistence: ({ groupId, title }: { groupId: number; title: string }) => ['isExistence', { groupId, title }] as const,
// };

export const Main_Keys = {
  youtube: ['youtube'] as const,
  news: ['news'] as const,
}