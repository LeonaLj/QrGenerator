import React, { useState } from 'react'
import QRCode from 'qrcode'
import './QRgenerator.css'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import { AiOutlineDownload } from 'react-icons/ai'
import { ImQrcode } from 'react-icons/im'


function QRgenerator() {

    const [input, setInput] = useState("")
    const [imageUrl, setImageUrl] = useState("")

    function urlInput(e) {
        setInput(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    async function generateQrCode() {
        try {
            const response = await QRCode.toDataURL(input)
            setImageUrl(response)
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <Container id="app-container">
            <Row>
                <Col>
                    <ImQrcode className="logo-icon" />
                </Col>
            </Row>
            <Row id="row">
                <Col md={8} sm={6} className="generate-container div-css">
                    <div className="gnr-div">
                        <Form onSubmit={handleSubmit}>
                            <h1>Enter your link</h1>
                            <Form.Control className="input" type="text" size="lg" name="name" placeholder="Your link goes here" onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "Your link goes here"} onChange={urlInput} />
                        </Form>
                        <Button className="mt-5 generate-btn fw-bold" size="lg" onClick={generateQrCode}>Generate</Button>
                    </div>
                </Col>

                <Col md={4} sm={6} className="qr-container div-css">
                    <div>
                        <h3>This is your QR code</h3>
                    </div>
                    <div className="qr-div">
                        {imageUrl ? (<img className="qr-img" src={imageUrl} alt="qr-img" />) : null}
                        <a href={imageUrl} download><Button className="mt-3 download-btn fw-bold" size="lg"><AiOutlineDownload className="icon" /> Download QR</Button></a>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default QRgenerator