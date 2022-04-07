import React, { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Avatar,
  Typography,
  Box,
  Grid,
  TextField,
  CssBaseline,
  Button,
  Link,
} from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"

import * as Api from "../../api"

import EmailAuthModal from "./EmailAuthModal"

const theme = createTheme()

function RegisterForm() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [responseCode, setResponseCode] = useState(null)
  const [isCheckedEmail, setIsCheckedEmail] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [nickname, setNickname] = useState("")

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  const isEmailValid = validateEmail(email)
  const isPasswordValid = password.length >= 4
  const isPasswordSame = password === confirmPassword
  const isNameValid = name.length >= 2

  const isNicknameValid = nickname.length >= 2

  const isFormValid =
    isEmailValid &&
    isPasswordValid &&
    isPasswordSame &&
    isNameValid &&
    isNicknameValid

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (isCheckedEmail) {
        await Api.post("user/register", {
          email,
          password,
          name,
          nickname,
        })
        navigate("/login")
      } else {
        alert("이메일 인증을 진행해주세요.")
        window.location.reload()
      }
    } catch (error) {
      alert(error.response.data)
    }
  }

  const onClickEmailAuthentication = async () => {
    try {
      console.log("email 전송")
      const res = await Api.post("user/emailAuth", {
        email,
      })
      alert("인증번호가 발송되었습니다. 메일을 확인해주세요.")
      setResponseCode(res)
    } catch (error) {
      alert(error.response.data)
    }
  }

  const isCheckedEmailCallback = useCallback(() => {
    setIsCheckedEmail(true)
  })

  const [isModalActive, setIsModalActive] = useState(false)

  const handleModalClose = () => setIsModalActive(false)
  const handleModalShow = () => setIsModalActive(true)

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mb: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#000d3e" }}>
            <LockOutlinedIcon></LockOutlinedIcon>
          </Avatar>
          <Typography component="h1" variant="h5">
            Born as a new PUPA
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={9} sx={{ mb: 0 }}>
                <TextField
                  name="email"
                  id="email"
                  label="메일주소"
                  required
                  fullWidth
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  sx={{
                    bgcolor: "#000d3e",
                    color: "#FFF",
                  }}
                  onClick={() => {
                    handleModalShow()
                    onClickEmailAuthentication()
                  }}
                >
                  이메일 인증
                </Button>
              </Grid>
              {!isEmailValid && (
                <Grid item xs={12} className="text-success">
                  이메일 형식이 올바르지 않습니다.
                </Grid>
              )}
              <Grid item xs={9}>
                <TextField
                  name="emailCertificate"
                  id="emailCertificate"
                  label="인증번호"
                  required
                  fullWidth
                  autoFocus
                  onChange={(e) => setIsCheckedEmail(e.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  sx={{
                    bgcolor: "#000d3e",
                    color: "#FFF",
                  }}
                  onClick={() => {
                    handleModalShow()
                    onClickEmailAuthentication()
                  }}
                >
                  확인
                </Button>
              </Grid>
              {!isCheckedEmail && (
                <Grid item xs={12} className="text-success">
                  인증되지 않은 이메일입니다
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  id="firstName"
                  label="이름"
                  required
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName"
                  id="lastName"
                  label="성"
                  required
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="nickName"
                  id="nickName"
                  label="닉네임"
                  required
                  fullWidth
                  autoFocus
                  onChange={(e) => setNickname(e.target.value)}
                />
                {!isNicknameValid && (
                  <span className="text-success">
                    닉네임은 2글자 이상으로 설정해 주세요.
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  id="password"
                  label="비밀번호"
                  required
                  fullWidth
                  autoFocus
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isPasswordValid && (
                  <span className="text-success">
                    비밀번호는 4글자 이상으로 설정해 주세요.
                  </span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="passwordCheck"
                  id="passwordCheck"
                  label="비밀번호 재확인"
                  required
                  fullWidth
                  autoFocus
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {!isPasswordSame && (
                  <span className="text-success">
                    비밀번호가 일치하지 않습니다.
                  </span>
                )}
              </Grid>
            </Grid>

            {/* submit and sign-in button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, mb: 2, bgcolor: "#000d3e" }}
            >
              가입하기
            </Button>
            <Grid container justifyContent="flex-end">
              <Link href="../login" variant="body2">
                이미 가입하셨나요? 로그인하기
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
      {/* <Row className="justify-content-md-center mt-5">
          <Col lg={8}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="registerEmail" class="me-3">
                <Form.Label>이메일 주소</Form.Label>

                <Row>
                  <Col>
                    <Form.Control
                      type="email"
                      autoComplete="off"
                      value={email}
                      style={{
                        border: "solid 2px #DBC7FF",
                      }}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>

                  <Col>
                    <Button
                      style={{
                        backgroundColor: "#FF87D2",
                        border: "solid 2px",
                      }}
                      onClick={() => {
                        handleModalShow()
                        onClickEmailAuthentication()
                      }}
                    >
                      이메일 인증
                    </Button>
                  </Col>
                </Row>

                {!isEmailValid && (
                  <Form.Text className="text-success">
                    이메일 형식이 올바르지 않습니다.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="registerPassword" className="mt-3">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="off"
                  value={password}
                  style={{
                    border: "solid 2px #DBC7FF",
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isPasswordValid && (
                  <Form.Text className="text-success">
                    비밀번호는 4글자 이상으로 설정해 주세요.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="registerConfirmPassword" className="mt-3">
                <Form.Label>비밀번호 재확인</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="off"
                  value={confirmPassword}
                  style={{
                    border: "solid 2px #DBC7FF",
                  }}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {!isPasswordSame && (
                  <Form.Text className="text-success">
                    비밀번호가 일치하지 않습니다.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="registerName" className="mt-3">
                <Form.Label>이름</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  value={name}
                  style={{
                    border: "solid 2px #DBC7FF",
                  }}
                  onChange={(e) => setName(e.target.value)}
                />
                {!isNameValid && (
                  <Form.Text className="text-success">
                    이름은 2글자 이상으로 설정해 주세요.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="registerName" className="mt-3">
                <Form.Label>닉네임</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  value={nickname}
                  style={{
                    border: "solid 2px #DBC7FF",
                  }}
                  onChange={(e) => setNickname(e.target.value)}
                />
                {!isNicknameValid && (
                  <Form.Text className="text-success">
                    닉네임은 2글자 이상으로 설정해 주세요.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!isFormValid}
                  >
                    회원가입
                  </Button>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <Button variant="light" onClick={() => navigate("/login")}>
                    로그인하기
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row> */}

      {isModalActive && (
        <EmailAuthModal
          onConfirm={handleModalClose}
          onCancel={handleModalClose}
          responseCode={responseCode}
          isCheckedEmailCallback={isCheckedEmailCallback}
        />
      )}
    </ThemeProvider>
  )
}

export default RegisterForm
