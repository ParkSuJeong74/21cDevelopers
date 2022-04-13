import { useState } from "react"

import { Box, TextField, Stack, Button } from "@mui/material"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import DesktopDatePicker from "@mui/lab/DesktopDatePicker"
import { styled } from "@mui/material/styles"

import * as Api from "../../api"
import { TimeUtil } from "../../common/TimeUtil"

function CertificateEditForm({
    setCertificates,
    currentCertificate,
    setIsEditing,
}) {
    const [title, setTitle] = useState(currentCertificate.title)
    const [description, setDescription] = useState(
        currentCertificate.description,
    )
    const [whenDate, setWhenDate] = useState(
        new Date(currentCertificate.whenDate),
    )

    async function submitHandler(e) {
        e.preventDefault()
        e.stopPropagation()

        const userId = currentCertificate.userId
        const date = TimeUtil.getTime(whenDate).toISOString().split("T")[0]

        const updatedCertificate = {
            userId,
            title,
            description,
            whenDate: date,
        }
        try {
            await Api.put(
                `certificates/${currentCertificate.id}`,
                updatedCertificate,
            )

            const res = await Api.get("certificates/lists", userId)
            setCertificates(res.data)

            setIsEditing(false)
        } catch (error) {
            alert(error.response.data)
        }
    }

    return (
        <Box
            component="form"
            onSubmit={submitHandler}
            sx={{ mt: 1, width: "400px" }}
        >
            <Stack spacing={2}>
                <StyledTextField
                    required
                    label="자격증 제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <StyledTextField
                    required
                    label="상세내역"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Stack>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <DesktopDatePicker
                        label="취득일자"
                        inputFormat={"yyyy-MM-dd"}
                        mask={"____-__-__"}
                        value={whenDate}
                        onChange={(date) => setWhenDate(date)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Stack>
            </LocalizationProvider>

            <StyledButton
                variant="contained"
                type="submit"
                size="large"
                fullWidth
            >
                확인
            </StyledButton>
        </Box>
    )
}

export default CertificateEditForm

const StyledTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "#08075C",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#08075C",
    },
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: "#08075C",
        },
    },
})
const StyledButton = styled(Button)({
    backgroundColor: "#08075C",
    marginTop: "20px",
    "&:hover": {
        backgroundColor: "#2422b8",
    },
})
