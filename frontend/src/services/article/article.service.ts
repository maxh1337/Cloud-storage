import { instance } from "@/api/api.interceptor";

import { IArticle } from "@/types/article.interface";
import { ARTICLES, TypeArticleDataFilters } from "./article.types";

const ARTICLE = "article";

export const ArticleService = {
  //
  async getAll(queryData = {} as TypeArticleDataFilters) {
    return instance<IArticle[]>({
      url: ARTICLE,
      method: "GET",
      params: queryData,
    });
  },

  async getByCategoryId(id: number) {
    return instance<IArticle[]>({
      url: `${ARTICLE}/by-category/${id}`,
      method: "GET",
    });
  },

  async getById(id: string | number) {
    return instance<IArticle>({
      url: `${ARTICLES}/${id}`,
      method: "GET",
    });
  },
};
