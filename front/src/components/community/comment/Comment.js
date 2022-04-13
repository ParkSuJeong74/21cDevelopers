import React, { useState } from "react"
import CommentCard from "./CommentCard"
import CommentEditForm from "./CommentEditForm"
import * as Api from "../../../api"

function Comment({ owner, comment, dispatch, isLogin }) {
    const [isEditing, setIsEditing] = useState(false)

    //* 댓글 작성자 = 로그인한 사용자 일 때만 수정, 삭제 가능함
    const isEditable = isLogin && comment.writerId === owner.id

    async function removeComment() {
        //TODO: Api put 요청하기! (soft delete)
        try {
            await Api.put(`comments/${comment.id}/delete`, {
                comment: comment.comment,
                userId: owner.id,
            })

            dispatch({
                type: "DELETE",
                payload: comment,
            })
        } catch (error) {
            alert(error.response.data)
        }
    }

    return (
        <>
            {isEditing ? (
                <CommentEditForm
                    owner={owner}
                    currentComment={comment}
                    dispatch={dispatch}
                    setIsEditing={setIsEditing}
                />
            ) : (
                <CommentCard
                    owner={owner}
                    comment={comment}
                    isEditable={isEditable}
                    removeComment={removeComment}
                    setIsEditing={setIsEditing}
                />
            )}
        </>
    )
}

export default Comment
