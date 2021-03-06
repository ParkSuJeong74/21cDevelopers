import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";

function Network() {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);
    const [users, setUsers] = useState([]);

    const myID = userState.user?.id

    useEffect(() => {
        if (!userState.user) {
            navigate("/login");
            return;
        }

        Api.get("user/list").then((res) => setUsers(res.data));
    }, [navigate]);

    return (
        <Container fluid>
            <Row xs="auto" className="jusify-content-center"
                style={{
                    marginTop: '30px', marginBottom: '20px'
                }}>
            {users.map((user) => (
                <UserCard 
                    key={user.id} 
                    user={user} 
                    myID={myID}
                    setUsers={setUsers}
                    isNetwork />
            ))}
            </Row>
        </Container>
    );
}

export default Network;
