const { UserModel } = require("../schemas/user")
const { ArticleModel } = require("../schemas/article")
const { CommentModel } = require("../schemas/comment")

const Article = {
  // 게시글 생성하기
  create: async ({ newArticle }) => {
    const createdNewArticle = await ArticleModel.create(newArticle)
    return createdNewArticle
  },
  // userId로 회원 정보 찾기
  findByUserId: async ({ userId }) => {
    const user = await UserModel.findOne({ id: userId })
    return user
  },
  // id로 게시글 + 댓글 찾기
  findById: async ({ articleId }) => {
    const article = await ArticleModel.findOne({ id: articleId })
    const comment = await CommentModel.find({ articleId }).sort({
      createdAt: 1,
    }) // 댓글 오래된 것부터
    return { article, comment }
  },
  // 본인 게시글 확인 후 수정하기
  update: async ({ articleId, updateObject }) => {
    const filter = { id: articleId } // 바꿀 대상 찾기
    const update = { $set: updateObject } // 바꿀 내용
    const option = { returnOriginal: false } // 옵션

    const updateArticle = await ArticleModel.findOneAndUpdate(
      filter,
      update,
      option
    )

    return updateArticle
  },
  // 본인 게시글 확인 후 삭제하기
  deleteById: async ({ articleId }) => {
    const deleteResult = await ArticleModel.deleteOne({ id: articleId })
    const isDataDeleted = deleteResult.deletedCount === 1
    return isDataDeleted
  },
  // 좋아요 개수, 좋아요 누른 사용자 목록 업데이트
  updateLike: async ({ articleId, toUpdate }) => {
    const filter = { id: articleId } // 바꿀 게시물
    const update = toUpdate
    const option = { returnOriginal: false }

    const updateArticle = await ArticleModel.findOneAndUpdate(
      filter,
      update,
      option
    )

    return updateArticle
  },
}

module.exports = { Article }
