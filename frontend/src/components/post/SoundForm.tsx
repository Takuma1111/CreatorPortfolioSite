import React, { useCallback, useState } from "react"

import styled from 'styled-components';

import { makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import IconButton from "@material-ui/core/IconButton"
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera"
import CancelIcon from "@material-ui/icons/Cancel"
import Cookies from "js-cookie";
import ReactPlayer from 'react-player'

import { createSound } from "../../lib/api/sounds"

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: "flex",
    flexWrap: "wrap",
    width: 320
  },
  inputFileBtn: {
    marginTop: "10px"
  },
  submitBtn: {
    marginTop: "10px",
    marginLeft: "auto"
  },
  box: {
    margin: "2rem 0 4rem",
    width: 320
  },
  preview: {
    width: "100%"
  }
}))

const Input = styled("input")({
  display: "none"
})

const borderStyles = {
  bgcolor: "background.paper",
  border: 1,
}

interface SoundFormProps {
  handleGetSounds: Function
}

const SoundForm = ({ handleGetSounds }: SoundFormProps) => {
  const classes = useStyles()

  const [user_id, setUserIds] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [text, setText] = useState<string>("")
  const [url, setUrl] = useState<File>()
  const [preview, setPreview] = useState<string>("")

  const uploadSound = useCallback((e) => {
    const file = e.target.files[0]
    setUrl(file)
  }, [])

  // プレビュー機能
  const previewSound = useCallback((e) => {
    const file = e.target.files[0]
    setPreview(window.URL.createObjectURL(file))
  }, [])

  const user_email = Cookies.get("_uid")

  // FormData形式でデータを作成
  const createFormData = (): FormData => {
    const formData = new FormData()
    formData.append("name",name)
    formData.append("text", text)
    formData.append("user_id", String(user_email))
    if (url) formData.append("url", url)

    return formData
  }

  const handleCreateSound  = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = createFormData()

    await createSound(data)
    .then(() => {
      setName("")
      setText("")
      setPreview("")
      setUrl(undefined)
      handleGetSounds()
    })
  }

  return (
    <>
      <form className={classes.form} noValidate onSubmit={handleCreateSound}>
      <TextField
          placeholder="Hello World"
          variant="outlined"
          multiline
          fullWidth
          rows="4"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value)
          }}
        />
        <TextField
          placeholder="Hello World"
          variant="outlined"
          multiline
          fullWidth
          rows="4"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value)
          }}
        />
        <div className={classes.inputFileBtn}>
          <label htmlFor="icon-button-file">
            <Input
              accept=".mp3,.wav,.aif"
              id="icon-button-file" 
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                uploadSound(e)
                previewSound(e)
              }}
            />
            <IconButton color="inherit" component="span">
              <PhotoCameraIcon />
            </IconButton>
          </label>
        </div>
        <div className={classes.submitBtn}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="inherit"
            disabled={!text || text.length > 140}
            className={classes.submitBtn}
          >
            Post
          </Button>
        </div>
      </form>
      { preview ?
        <Box
          sx={{ ...borderStyles, borderRadius: 1, borderColor: "grey.400" }}
          className={classes.box}
        >
          <IconButton
            color="inherit"
            onClick={() => setPreview("")}
          >
            <CancelIcon />
          </IconButton>
          {<audio controls src={preview} />}

          {/* <ReactPlayer url={preview} muted  controls={true}/> */}
        
        </Box> : null
      }
    </>
  )
}

export default SoundForm