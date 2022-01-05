import React, { useState } from 'react'
import QRCode from 'qrcode'
import './QRgenerator.css'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'

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
                    <Form onSubmit={handleSubmit}>
                        <Form.Control type="text" name="name" onChange={urlInput} />
                    </Form>
                    <Button className="mt-3" variant="dark" size="lg" onClick={generateQrCode}>Generate</Button>
                </Col>

                <Col>
                    {imageUrl ? (<img className="qr-img" src={imageUrl} alt="qr-img" />) : null}
                    <div>
                        <a href={imageUrl} download><Button className="mt-3" variant="dark" size="lg">Download QR</Button></a>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default QRgenerator