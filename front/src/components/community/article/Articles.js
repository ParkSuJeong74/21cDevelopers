import { useEffect, useReducer, useState } from "react"
import { Card, Row, Col } from "react-bootstrap"
import Article from "./Article"
import * as Api from "../../../api"
import ArticleAddForm from "./ArticleAddForm"
import Style from "../../../App.module.css"
import ArticleDetail from "./ArticleDetail"
import { articleReducer } from "../../../reducer"

const Articles = ({ isLogin, category, owner }) => {
    const [articles, articleDispatch] = useReducer(articleReducer, [])

    //TODO: API get 요청해서 set하기!
    useEffect(() => {
        const getData = async () => {
            try {
                await Api.get(`categories/${category?.id}`).then((res) => {
                    articleDispatch({
                        type: "SET",
                        payload: res.data.article,
                    })
                    console.log("게시글 목록을 불러왔어요.")
                })
            } catch (error) {
                alert(error.response.data)
            }
        }
        getData()
    }, [category?.name])

    //* ArticleDetail 컴포넌트로 선택된 게시글을 가져가는 상태값
    const [selectedArticle, setSelectedArticle] = useState(null)

    const [isAdding, setIsAdding] = useState(false)

    //* 게시글 상세 페이지로 이동하는 상태값, true: 상세페이지, false: 게시글 목록
    const [isDetail, setIsDetail] = useState(false)

    useEffect(() => {
        setIsDetail(false)
    }, [category?.name])
    return (
        <Card className={["mt-4", "mb-4"].join(" ")}>
            <div class={Style.articleItem}>
                <Card.Title style={{ fontWeight: "bolder" }}>
                    {category?.name}
                </Card.Title>
            </div>

            {isDetail ? (
                <ArticleDetail
                    category={category}
                    setIsDetail={setIsDetail}
                    selectedArticle={selectedArticle}
                    isLogin={isLogin}
                    owner={owner}
                />
            ) : (
                <Card.Body style={{ backgroundColor: "#F6F7FF" }}>
                    {/*로그인했을 때만 글작성할 수 있음 */}
                    {isLogin && (
                        <Row className="text-center">
                            <Col className="mb-4">
                                <button
                                    onClick={() => setIsAdding(true)}
                                    className={[
                                        Style.formAddButton,
                                        Style.communityAddButton,
                                    ].join(" ")}
                                ></button>
                            </Col>
                        </Row>
                    )}

                    {isAdding && (
                        <ArticleAddForm
                            owner={owner}
                            category={category}
                            articles={articles}
                            dispatch={articleDispatch}
                            setIsAdding={setIsAdding}
                        />
                    )}

                    {articles.map((article) => (
                        <Article
                            key={article.id}
                            category={category}
                            article={article}
                            dispatch={articleDispatch}
                            owner={owner}
                            isLogin={isLogin}
                            setIsDetail={setIsDetail}
                            setSelectedArticle={setSelectedArticle}
                        />
                    ))}
                </Card.Body>
            )}
        </Card>
    )
}
export default Articles
