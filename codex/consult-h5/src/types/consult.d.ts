// 文章类型
export type KnowledgeType = 'like' | 'recommend' | 'fatReduction' | 'food'

// 通用泛型工具
export type PageData<T> = {
  pageTotal: number
  total: number
  rows: T
}

// 1. 健康知识列表：文章信息类型
export type Knowledge = {
  id: string
  title: string
  coverUrl: string[]
  topics: string[]
  collectionNumber: number
  commentNumber: number
  creatorName: string
  creatorAvatar: string
  creatorHospatalName: string
  likeFlag: 0 | 1
  content: string
  creatorDep: string
  creatorTitles: string
  creatorId: string
}

// 文章列表
export type KnowledgeList = Knowledge[]

// 文章列表带分页 => api接口data指定类型
export type KnowledgePage = PageData<KnowledgeList>
// {
//   pageTotal: number
//   total: number
//   rows: KnowledgeList
// }

// 文章列表查询参数
// export type KnowledgeParams = {
//   type: KnowledgeType
//   current: number
//   pageSize: number
// }

// 2.关注医生
// 通用的分页查询参数
export type PageParams = {
  current: number
  pageSize: number
}

// 文章列表查询参数，复用PageParams
export type KnowledgeParams = PageParams & {
  type: KnowledgeType
}

// 医生卡片
export type Doctor = {
  id: string
  name: string
  avatar: string
  hospitalName: string
  gradeName: string
  depName: string
  positionalTitles: string
  likeFlag: 0 | 1
  serviceFee: number
  consultationNum: number
  score: number
  major: string
}

// 医生列表
export type DoctorList = Doctor[]

// 医生分页 => api返回在数据data类型
export type DoctorPage = PageData<DoctorList>
// {
//   pageTotal: number
//   total: number
//   rows: DoctorList
// }

// 关注的类型
export type FollowType = 'doc' | 'knowledge' | 'topic' | 'disease'
