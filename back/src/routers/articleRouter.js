const is = require("@sindresorhus/is")
const { Router } = require("express")
const { login_required } = require("../middlewares/login_required")
const { ArticleService } = require("../services/articleService")

const articleRouter = Router()
articleRouter.use(login_required)

// 모든 API는 app.js에서 /article로 라우팅 된 상태

// 게시글 등록하기
articleRouter.post("/", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      )
    }

    //const userId = req.currentUserId // jwt토큰에서 추출된 로그인 사용자 id
    const { categoryId, hidden, title, description, author } = req.body
    const newArticle = await ArticleService.addArticle({
      categoryId,
      author,
      userId: author,
      hidden,
      title,
      description,
    })

    res.status(201).json(newArticle)
  } catch (error) {
    next(error)
  }
})
// 게시글 상세 페이지 보여주기
articleRouter.get("/:id", async (req, res, next) => {
  try {
    const userId = req.currentUserId
    const articleId = req.params.id
    const article = await ArticleService.getArticle({ userId, articleId })

    res.status(200).send(article)
  } catch (error) {
    next(error)
  }
})
// 게시글 수정하기
articleRouter.put("/:id", async (req, res, next) => {
  try {
    //const userId = req.currentUserId // jwt토큰에서 추출된 로그인 사용자 id
    const articleId = req.params.id
    const userId = req.currentUserId
    const { author, hidden, title, description } = req.body
    if (userId == author) {
      // 로그인 사용자 = 게시글 작성자이면
      const toUpdate = { hidden, title, description }
      const article = await ArticleService.setArticle({
        userId,
        articleId,
        toUpdate,
      })

      res.status(200).send(article)
    } else {
      throw new Error("당신은 게시글 작성자가 아닙니다.")
    }
  } catch (error) {
    next(error)
  }
})
// 게시글 삭제하기
articleRouter.delete("/:id", async (req, res, next) => {
  try {
    const articleId = req.params.id
    const result = await ArticleService.deleteArticle({ articleId })

    res.status(200).send(result)
  } catch (error) {
    next(error)
  }
})

// 게시글 좋아요/좋아요 취소
articleRouter.put("/:id/like", async (req, res, next) => {
  try {
    const userId = req.currentUserId // 로그인 한 사용자
    const articleId = req.params.id // 게시글 Id
    const author = req.body.author // 게시글 작성자의 userId

    if (userId == author) {
      // 로그인 사용자 = 게시글 작성자이면
      throw new Error("본인 글에는 좋아요 할 수 없습니다.")
    } else {
      // 본인 게시글이 아니면
      const article = await ArticleService.setLike({ userId, articleId })

      res.status(200).send(article)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = { articleRouter }
