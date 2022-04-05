import {Card, Row, Col} from 'react-bootstrap'
import Style from '../../App.module.css'

function AwardCard({award, isEditable, setIsEditing, removeAward}){

    return (
        <Card.Text>
            <Row className="align-items-center"
                style={{paddingLeft: '28px'}}>
                <Col className="mb-3">
                    <span style={{
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                    }}>{award.title}</span>
                    <br />
                    <span className="text-muted">{award.description}</span>
                </Col>

                {isEditable && (
                    <Col xs={2}>
                        <button
                            onClick={() => setIsEditing((prev) => !prev)}
                            className={Style.mvpEditButton}>
                                수정
                        </button>

                        <button
                            onClick={() => removeAward()}
                            className={Style.mvpRemoveButton}>
                                삭제
                        </button>
                    </Col>
                )}
                
            </Row>
        </Card.Text>
    )
}

export default AwardCard
