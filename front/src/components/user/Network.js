import React, { useEffect, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Row } from "react-bootstrap"

import * as Api from "../../api"
import UserCard from "./UserCard"
import { UserStateContext } from "../../App"

function Network() {
    const navigate = useNavigate()
    const userState = useContext(UserStateContext)
    const [users, setUsers] = useState([])

    //현재 로그인한 자기 아이디
    const loginUserId = userState.user?.id

    // follow를 하거나 unfollow를 할 때 상태가 변경되는 걸 감지하고 user list를 다시 불러오도록 함
    const [ReloadUserlist, setReloadUserlist] = useState(false)

    useEffect(() => {
        if (!userState.user) {
            navigate("/login")
            return
        }

        Api.get("user/list").then((res) => setUsers(res.data))
    }, [navigate, ReloadUserlist])

    return (
        <Container fluid>
            <Row
                xs="auto"
                className="jusify-content-center"
                style={{
                    marginTop: "30px",
                    marginBottom: "20px",
                }}
            >
                {users.map((user) => (
                    <UserCard
                        key={user.id}
                        user={user}
                        loginUserId={loginUserId}
                        setReloadUserlist={setReloadUserlist}
                        isNetwork
                    />
                ))}
            </Row>
        </Container>
    )
}

export default Network
