export type List = {
  id: number
  name: string
  done: boolean
}[]

export type Data = {
  name: string
  age?: number
}[]

// 案例类型
// 后台返回数据类型
export type ChannelItem = {
  id: number
  name: string
}
// export type ResData = {
//   data: {
//     channels: ChannelItem[]
//   }
//   message: string
// }

export type ChannelResData = ResData<{
  channels: ChannelItem[]
}>

// 文章对象
export type ArticleItem = {
  art_id: string;
  aut_id: string;
  aut_name: string;
  comm_count: number;
  cover: {
    cover: number;
    images: string[];
  };
  is_top: number;
  pubdate: string;
  title: string;
};

// // 文章接口响应数据
// export type ArticleResData = {
//   data: {
//     pre_timestamp: string;
//     results: ArticleItem[];
//   };
//   message: string;
// };

// 文章接口响应数据
export type ArticleResData = ResData<{
  pre_timestamp: string;
  results: ArticleItem[];
}>


// 作业1：后台接口返回数据的类型怎么重用？泛型别名
type ResData<T> = {
  data: T
  message: string
};

