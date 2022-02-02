import React, { useState } from 'react'
import QRCode from 'qrcode'
import { SketchPicker } from 'react-color';
import './QRgenerator.css'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import { AiOutlineDownload } from 'react-icons/ai'
import { ImQrcode } from 'react-icons/im'


function QRgenerator() {

    const [color, setColor] = useState("#FB607F");
    const [input, setInput] = useState("")
    const [imageUrl, setImageUrl] = useState("")


    function urlInput(e) {
        setInput(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    var qrcolor = {
        color: {
            dark: color,
            light: '#0000'
        }
    }

    async function generateQrCode() {
        try {
            const response = await QRCode.toDataURL(input, (qrcolor))
            setImageUrl(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Container id="app-container">
                <ImQrcode className="logo-icon" />
                <Row>
                    <Col className='intro-div'>
                        <h1>Generate your own QR Code for FREE</h1>
                    </Col>
                </Row>
                <Row className='colored-row'>
                    <Col md={3} sm={3}>
                        <span>1</span>
                        <p>choose color</p>
                    </Col>
                    <Col md={3} sm={3}>
                        <span>2</span>
                        <p>paste URL</p></Col>
                    <Col md={3} sm={3}>
                        <span>3</span>
                        <p>click GENERATE</p></Col>
                    <Col md={3} sm={3}>
                        <span>4</span>
                        <p>download QR</p>
                    </Col>
                </Row>
                <Row id="row">
                    <Col md={6} sm={12} className="generate-container">
                        <div className="gnr-div">
                            <div className="color-div">
                                <SketchPicker className="color-picker"
                                    color={color}
                                    onChange={(color) => { setColor(color.hex) }}
                                />
                            </div>
                            <Form onSubmit={handleSubmit}>
                                <h1>Enter your URL</h1>
                                <Form.Control className="input" type="text" size="lg" name="name" placeholder="Your link goes here" onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "Your link goes here"} onChange={urlInput} />
                            </Form>
                            <Button className="mt-5 generate-btn fw-bold" size="lg" onClick={generateQrCode}>Generate</Button>
                        </div>
                    </Col>

                    <Col md={6} sm={12} className="qr-container">
                        <div className="qr-div">
                            <h3>Your QR Code will appear here</h3>
                            {imageUrl ? (<img className="qr-img" src={imageUrl} alt="qr-img" />) : null}
                            <br></br>
                            <a href={imageUrl} download><Button className="download-btn fw-bold" size="lg"><AiOutlineDownload className="icon" /> Download QR</Button></a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default QRgenerator